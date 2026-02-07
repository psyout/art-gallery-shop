'use client';

import { useCart } from '@/context/CartContext';
import type { Product } from '@/types/product';

type AddToCartButtonProps = {
	product: Product;
	quantity?: number;
	disabled?: boolean;
};

export default function AddToCartButton({ product, quantity = 1, disabled }: AddToCartButtonProps) {
	const { addToCart } = useCart();

	return (
		<button
			onClick={() => addToCart(product, quantity)}
			disabled={disabled}
			className='w-full bg-soft-taupe-400 hover:bg-soft-taupe-500 disabled:bg-soft-taupe-200 text-warm-clay-900 font-semibold py-4 px-6 rounded transition-colors text-lg shadow-md'>
			{disabled ? 'Sold out' : 'Add to Cart'}
		</button>
	);
}
