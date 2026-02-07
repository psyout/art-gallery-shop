'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types/product';

type BuyNowButtonProps = {
	product: Product;
	quantity?: number;
	disabled?: boolean;
};

export default function BuyNowButton({ product, quantity = 1, disabled }: BuyNowButtonProps) {
	const router = useRouter();
	const { addToCart } = useCart();

	const handleBuyNow = () => {
		addToCart(product, quantity);
		router.push('/checkout');
	};

	return (
		<button
			onClick={handleBuyNow}
			disabled={disabled}
			className='w-full bg-warm-clay-700 hover:bg-warm-clay-800 disabled:bg-soft-taupe-200 text-sand font-semibold py-4 px-6 rounded transition-colors text-lg shadow-lg'>
			{disabled ? 'Sold out' : 'Buy Now'}
		</button>
	);
}
