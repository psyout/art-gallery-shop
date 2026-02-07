import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { buildOrderEmails } from '@/lib/orderEmail';
import nodemailer from 'nodemailer';

interface OrderPayload {
	customer: {
		firstName: string;
		lastName: string;
		country: string;
		email: string;
		phone: string;
		address: string;
		addressLine2: string;
		city: string;
		province: string;
		zipCode: string;
		orderNotes: string;
	};
	shipToDifferentAddress: boolean;
	shippingAddress?: {
		address: string;
		addressLine2: string;
		city: string;
		province: string;
		zipCode: string;
	};
	shippingMethod: 'regular' | 'express';
	subtotal: number;
	shippingCost: number;
	discountAmount?: number;
	promoCode?: string;
	total: number;
	cartItems: Array<{
		id: string | number;
		name: string;
		price: number;
		quantity: number;
		image: string;
		description: string;
	}>;
}

async function readOrders(filePath: string) {
	try {
		const contents = await fs.readFile(filePath, 'utf8');
		return JSON.parse(contents) as Array<Record<string, unknown>>;
	} catch (error) {
		const nodeError = error as NodeJS.ErrnoException;
		if (nodeError.code === 'ENOENT') return [];
		throw error;
	}
}

type EmailStatus = { sent: boolean; skipped: boolean; error?: string };

function getSmtpConfig() {
	const host = process.env.ORDER_SMTP_HOST ?? process.env.SMTP_HOST;
	const port = process.env.ORDER_SMTP_PORT ? Number(process.env.ORDER_SMTP_PORT) : process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
	const user = process.env.ORDER_SMTP_USER ?? process.env.SMTP_USER;
	const pass = process.env.ORDER_SMTP_PASS ?? process.env.SMTP_PASS;
	const from = process.env.ORDER_FROM ?? process.env.SMTP_FROM;
	const replyTo = process.env.SMTP_REPLY_TO;
	const bcc = process.env.SMTP_BCC;
	const secure = process.env.ORDER_SMTP_SECURE === 'true' || (process.env.ORDER_SMTP_SECURE == null && process.env.SMTP_SECURE === 'true');
	if (!host || !port || !user || !pass || !from) return null;
	return { host, port, user, pass, from, replyTo, bcc, secure };
}

function getOrderNotificationRecipient() {
	return process.env.ORDER_NOTIFICATION_EMAIL ?? 'hello@canvasandframe.co';
}

async function sendOrderEmail(to: string, subject: string, text: string, html: string, replyTo?: string, bccOverride?: string, fromOverride?: string): Promise<EmailStatus> {
	const smtpConfig = getSmtpConfig();
	if (!smtpConfig) return { sent: false, skipped: true, error: 'SMTP not configured' };
	const from = fromOverride ?? smtpConfig.from;
	const transporter = nodemailer.createTransport({
		host: smtpConfig.host,
		port: smtpConfig.port,
		secure: smtpConfig.secure,
		auth: { user: smtpConfig.user, pass: smtpConfig.pass },
	});
	try {
		await transporter.sendMail({
			from,
			to,
			subject,
			text,
			html,
			replyTo: replyTo ?? smtpConfig.replyTo ?? smtpConfig.from,
			bcc: bccOverride ?? smtpConfig.bcc,
		});
		return { sent: true, skipped: false };
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown email error';
		return { sent: false, skipped: false, error: message };
	}
}

const formatOrderFrom = (value: string, label = 'FrameYourself') => {
	const match = value.match(/<([^>]+)>/);
	const address = match ? match[1] : value;
	return `${label} <${address}>`;
};

const getItemPrice = (price: number, quantity: number) => {
	let discount = 0;
	if (quantity >= 10) discount = 0.25;
	else if (quantity >= 8) discount = 0.15;
	else if (quantity >= 6) discount = 0.1;
	else if (quantity >= 2) discount = 0.05;
	return price * (1 - discount);
};

export async function POST(request: Request) {
	try {
		const rawPayload = (await request.json()) as OrderPayload;

		const cartItems = rawPayload.cartItems.map((item) => ({
			...item,
			id: typeof item.id === 'string' ? item.id : String(item.id),
			price: getItemPrice(item.price, item.quantity),
		}));

		const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
		const shippingCost = rawPayload.shippingMethod === 'express' ? 29.99 : 19.99;
		const total = Number((subtotal + shippingCost).toFixed(2));

		const payload: OrderPayload = {
			...rawPayload,
			cartItems,
			subtotal,
			shippingCost,
			discountAmount: 0,
			total,
		};

		const ordersDir = path.join(process.cwd(), 'data');
		const ordersFile = path.join(ordersDir, 'orders.json');
		await fs.mkdir(ordersDir, { recursive: true });
		const existingOrders = await readOrders(ordersFile);

		const timestamp = Date.now();
		const orderNumber = `${timestamp}`.slice(-6);
		const createdAt = new Date().toISOString();
		const orderRecord = {
			id: `order_${timestamp}`,
			orderNumber,
			createdAt,
			...payload,
		};

		const emailData = buildOrderEmails({
			...payload,
			orderNumber,
			createdAt,
		});

		const adminRecipient = getOrderNotificationRecipient();
		const customerEmail = payload.customer.email;
		const customerReplyTo = `${payload.customer.firstName} ${payload.customer.lastName} <${customerEmail}>`;
		const smtpConfig = getSmtpConfig();
		const orderFrom = smtpConfig ? formatOrderFrom(smtpConfig.from) : undefined;
		const emailStatus = await sendOrderEmail(customerEmail, emailData.customer.subject, emailData.customer.text, emailData.customer.html, undefined, '', orderFrom);
		const adminEmailStatus = await sendOrderEmail(adminRecipient, emailData.admin.subject, emailData.admin.text, emailData.admin.html, customerReplyTo, '', orderFrom);

		existingOrders.push({
			...orderRecord,
			emailPreview: { subject: emailData.customer.subject, text: emailData.customer.text },
			adminEmailPreview: { subject: emailData.admin.subject, text: emailData.admin.text },
			emailStatus,
			adminEmailStatus,
		});
		await fs.writeFile(ordersFile, JSON.stringify(existingOrders, null, 2), 'utf8');

		return NextResponse.json({ ok: true, orderId: orderRecord.id });
	} catch (error) {
		console.error('Failed to store order', error);
		return NextResponse.json({ ok: false, error: 'Failed to store order' }, { status: 500 });
	}
}
