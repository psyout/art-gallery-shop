import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import Header from '@/components/Header';

type Order = {
	orderNumber?: string;
	createdAt: string;
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
	total: number;
	cartItems: Array<{
		id: string | number;
		name: string;
		price: number;
		quantity: number;
		image: string;
		description: string;
	}>;
};

const supportEmail = 'hello@canvasandframe.co';

const formatMoney = (value: number) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(value);

async function getLatestOrder() {
	const ordersFile = path.join(process.cwd(), 'data', 'orders.json');
	try {
		const contents = await fs.readFile(ordersFile, 'utf8');
		const orders = JSON.parse(contents) as Order[];
		return orders.at(-1) ?? null;
	} catch (error) {
		const nodeError = error as NodeJS.ErrnoException;
		if (nodeError.code === 'ENOENT') return null;
		throw error;
	}
}

export default async function OrderConfirmationPage() {
	const order = await getLatestOrder();

	if (!order) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-sand via-warm-clay-50 to-terracotta-50'>
				<Header />
				<div className='max-w-7xl mx-auto px-6 py-16 pt-28'>
					<div className='max-w-2xl mx-auto bg-terracotta-100/60 backdrop-blur-sm rounded-lg ui-border p-4 shadow-lg'>
						<h1 className='text-3xl font-bold text-warm-clay-800 mb-3'>Order not found</h1>
						<p className='text-warm-clay-800 mb-6'>We could not find a recent order. Please return to the shop.</p>
						<Link
							href='/'
							className='bg-soft-taupe-400 hover:bg-soft-taupe-500 text-warm-clay-900 font-semibold py-3 px-6 rounded transition-colors inline-block shadow-md'>
							Continue shopping
						</Link>
					</div>
				</div>
			</div>
		);
	}

	const orderNumber = order.orderNumber ?? order.createdAt.replace(/\D/g, '').slice(-6);
	const orderDate = new Date(order.createdAt).toLocaleDateString('en-CA', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
	const shippingLabel = order.shippingMethod === 'express' ? 'Express Shipping' : 'Regular Shipping';
	const billingAddressLines = [
		`${order.customer.firstName} ${order.customer.lastName}`,
		order.customer.address,
		order.customer.addressLine2,
		`${order.customer.city} ${order.customer.province} ${order.customer.zipCode}`,
		order.customer.country,
		order.customer.email,
	].filter(Boolean);
	const shippingAddressSource = order.shipToDifferentAddress && order.shippingAddress ? order.shippingAddress : order.customer;
	const shippingAddressLines = [
		`${order.customer.firstName} ${order.customer.lastName}`,
		shippingAddressSource.address,
		shippingAddressSource.addressLine2,
		`${shippingAddressSource.city} ${shippingAddressSource.province} ${shippingAddressSource.zipCode}`,
	].filter(Boolean);

	return (
		<div className='min-h-screen bg-gradient-to-br from-sand via-warm-clay-50 to-terracotta-50'>
			<Header />
			<div className='max-w-7xl mx-auto px-6 py-12 pt-28'>
				<div className='max-w-4xl mx-auto bg-olive-branch/30 backdrop-blur-sm rounded-lg ui-border shadow-lg p-6'>
					<h1 className='text-3xl font-bold text-warm-clay-800 mb-2 mt-2'>Thank you. Your order has been received.</h1>
					<p className='text-warm-clay-800 mb-6'>
						Payment can be completed by credit card at checkout or by Interac e-Transfer. You will receive payment instructions by email if applicable.
					</p>

					<div className='grid grid-cols-1 md:grid-cols-4 gap-4 text-md mb-8'>
						<div className='bg-sand rounded-lg ui-border p-4'>
							<div className='text-warm-clay-600'>Order number</div>
							<div className='text-warm-clay-800 font-semibold'>{orderNumber}</div>
						</div>
						<div className='bg-sand rounded-lg ui-border p-4'>
							<div className='text-warm-clay-600'>Date</div>
							<div className='text-warm-clay-800 font-semibold'>{orderDate}</div>
						</div>
						<div className='bg-sand rounded-lg ui-border p-4'>
							<div className='text-warm-clay-600'>Total</div>
							<div className='text-warm-clay-800 font-semibold'>{formatMoney(order.total)}</div>
						</div>
						<div className='bg-sand rounded-lg ui-border p-4'>
							<div className='text-warm-clay-600'>Payment method</div>
							<div className='text-warm-clay-800 font-semibold'>Credit card / Interac e-Transfer</div>
						</div>
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8'>
						<div className='bg-sand rounded-lg ui-border p-4'>
							<h3 className='text-lg font-semibold text-warm-clay-800 mb-3'>Order details</h3>
							<div className='space-y-3 text-md'>
								{order.cartItems.map((item) => (
									<div
										key={String(item.id)}
										className='flex justify-between text-warm-clay-700'>
										<span>
											{item.name} × {item.quantity}
										</span>
										<span className='text-warm-clay-800 font-semibold'>{formatMoney(item.price * item.quantity)}</span>
									</div>
								))}
							</div>
							<div className='ui-border-t mt-4 pt-4 space-y-2 text-md'>
								<div className='flex justify-between text-warm-clay-700'>
									<span>Subtotal</span>
									<span className='text-warm-clay-800 font-semibold'>{formatMoney(order.subtotal)}</span>
								</div>
								<div className='flex justify-between text-warm-clay-700'>
									<span>Shipping</span>
									<span className='text-warm-clay-800 font-semibold'>
										{formatMoney(order.shippingCost)} via {shippingLabel}
									</span>
								</div>
								<div className='flex justify-between text-warm-clay-800 font-semibold'>
									<span>Total</span>
									<span>{formatMoney(order.total)}</span>
								</div>
							</div>
						</div>
						<div className='space-y-4'>
							<div className='bg-sand rounded-lg ui-border p-4'>
								<h3 className='text-lg font-semibold text-warm-clay-800 mb-3'>Billing address</h3>
								<div className='text-md text-warm-clay-700 space-y-1'>
									{billingAddressLines.map((line) => (
										<div key={line}>{line}</div>
									))}
								</div>
							</div>
							<div className='bg-sand rounded-lg ui-border p-4'>
								<h3 className='text-lg font-semibold text-warm-clay-800 mb-3'>Shipping address</h3>
								<div className='text-md text-warm-clay-700 space-y-1'>
									{shippingAddressLines.map((line) => (
										<div key={line}>{line}</div>
									))}
								</div>
							</div>
						</div>
					</div>

					<div className='text-xs text-warm-clay-700 p-[6px]'>
						<p>Your personal data will be used to process your order and for purposes described in our privacy policy.</p>
						<p>For display purposes. Not for resale.</p>
						<p>
							Questions? Contact us at <span className='font-semibold'>{supportEmail}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
