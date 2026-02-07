type OrderEmailInput = {
	orderNumber: string;
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
	discountAmount?: number;
	total: number;
	cartItems: Array<{
		id: string | number;
		name: string;
		price: number;
		quantity: number;
	}>;
};

const supportEmail = 'hello@canvasandframe.co';

const formatMoney = (value: number) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(value);

const formatDate = (value: string) => new Date(value).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });

type OrderEmailPayload = { subject: string; text: string; html: string };
type OrderEmailResult = { customer: OrderEmailPayload; admin: OrderEmailPayload };

export function buildOrderEmails(input: OrderEmailInput): OrderEmailResult {
	const orderDate = formatDate(input.createdAt);
	const orderName = `${input.customer.firstName} ${input.customer.lastName}`.trim();
	const shippingLabel = input.shippingMethod === 'express' ? 'Express Shipping' : 'Regular Shipping';
	const billingLines = [
		orderName,
		input.customer.address,
		input.customer.addressLine2,
		`${input.customer.city} ${input.customer.province} ${input.customer.zipCode}`.trim(),
		input.customer.country,
		input.customer.email,
	].filter(Boolean);
	const shippingSource = input.shipToDifferentAddress && input.shippingAddress ? input.shippingAddress : input.customer;
	const shippingLines = [
		orderName,
		shippingSource.address,
		shippingSource.addressLine2,
		`${shippingSource.city} ${shippingSource.province} ${shippingSource.zipCode}`.trim(),
		input.customer.country,
	].filter(Boolean);
	const adminNotes = input.customer.orderNotes?.trim();

	const itemsText = input.cartItems.map((item) => `- ${item.name} x${item.quantity} (${formatMoney(item.price * item.quantity)})`).join('\n');
	const itemsHtml = input.cartItems
		.map(
			(item) => `
        <tr>
          <td style="padding: 6px 0;">${item.name}</td>
          <td style="padding: 6px 0;">x${item.quantity}</td>
          <td style="padding: 6px 0; text-align: right;">${formatMoney(item.price * item.quantity)}</td>
        </tr>`,
		)
		.join('');

	const customerText = [
		'FrameYourself',
		'',
		'Thank you for your order',
		`Hi ${input.customer.firstName},`,
		'',
		'We have received your order. Payment can be completed by credit card at checkout or by Interac e-Transfer (instructions sent separately if applicable).',
		'',
		'Order summary',
		`Order #${input.orderNumber} (${orderDate})`,
		'',
		'Products',
		itemsText,
		'',
		`Subtotal: ${formatMoney(input.subtotal)}`,
		`Shipping: ${shippingLabel} ${formatMoney(input.shippingCost)}`,
		`Total: ${formatMoney(input.total)}`,
		'',
		'Billing address',
		...billingLines,
		'',
		'Shipping address',
		...shippingLines,
		'',
		`Thanks again! If you need any help, please contact us at ${supportEmail}.`,
	].join('\n');

	const customerHtml = `
    <div style="font-family: Arial, sans-serif; color: #0b3f3c; line-height: 1.5;">
      <h2 style="margin: 0 0 8px;">FrameYourself</h2>
      <h3 style="margin: 0 0 16px;">Thank you for your order</h3>
      <p>Hi ${input.customer.firstName},</p>
      <p>We have received your order. Payment can be completed by credit card at checkout or by Interac e-Transfer (instructions sent separately if applicable).</p>
      <h4 style="margin: 24px 0 8px;">Order summary</h4>
      <p><strong>Order #${input.orderNumber}</strong> (${orderDate})</p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 6px 0; border-bottom: 1px solid #cdd9d7;">Product</th>
            <th style="text-align: left; padding: 6px 0; border-bottom: 1px solid #cdd9d7;">Quantity</th>
            <th style="text-align: right; padding: 6px 0; border-bottom: 1px solid #cdd9d7;">Price</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>
      <p><strong>Subtotal:</strong> ${formatMoney(input.subtotal)}</p>
      <p><strong>Shipping:</strong> ${shippingLabel} ${formatMoney(input.shippingCost)}</p>
      <p><strong>Total:</strong> ${formatMoney(input.total)}</p>
      <h4 style="margin: 24px 0 8px;">Billing address</h4>
      <p>${billingLines.join('<br />')}</p>
      <h4 style="margin: 16px 0 8px;">Shipping address</h4>
      <p>${shippingLines.join('<br />')}</p>
      <p style="margin-top: 24px;">Thanks again! If you need any help, please contact us at ${supportEmail}.</p>
    </div>
  `;

	const adminText = [
		'New order received',
		`Order #${input.orderNumber} (${orderDate})`,
		'',
		'Customer',
		...billingLines,
		'',
		'Shipping address',
		...shippingLines,
		'',
		'Products',
		itemsText,
		'',
		`Subtotal: ${formatMoney(input.subtotal)}`,
		`Shipping: ${shippingLabel} ${formatMoney(input.shippingCost)}`,
		`Total: ${formatMoney(input.total)}`,
		adminNotes ? '' : null,
		adminNotes ? 'Order notes' : null,
		adminNotes ? adminNotes : null,
	]
		.filter(Boolean)
		.join('\n');

	const adminHtml = `
    <div style="font-family: Arial, sans-serif; color: #0b3f3c; line-height: 1.5;">
      <h2 style="margin: 0 0 8px;">New order received</h2>
      <p><strong>Order #${input.orderNumber}</strong> (${orderDate})</p>
      <h4 style="margin: 24px 0 8px;">Customer</h4>
      <p>${billingLines.join('<br />')}</p>
      <h4 style="margin: 16px 0 8px;">Shipping address</h4>
      <p>${shippingLines.join('<br />')}</p>
      <h4 style="margin: 24px 0 8px;">Products</h4>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 6px 0; border-bottom: 1px solid #cdd9d7;">Product</th>
            <th style="text-align: left; padding: 6px 0; border-bottom: 1px solid #cdd9d7;">Quantity</th>
            <th style="text-align: right; padding: 6px 0; border-bottom: 1px solid #cdd9d7;">Price</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>
      <p><strong>Subtotal:</strong> ${formatMoney(input.subtotal)}</p>
      <p><strong>Shipping:</strong> ${shippingLabel} ${formatMoney(input.shippingCost)}</p>
      <p><strong>Total:</strong> ${formatMoney(input.total)}</p>
      ${adminNotes ? `<h4 style="margin: 24px 0 8px;">Order notes</h4><p>${adminNotes}</p>` : ''}
    </div>
  `;

	return {
		customer: {
			subject: `Order #${input.orderNumber} - FrameYourself`,
			text: customerText,
			html: customerHtml,
		},
		admin: {
			subject: `New order #${input.orderNumber}`,
			text: adminText,
			html: adminHtml,
		},
	};
}
