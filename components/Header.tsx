'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CartIcon from './CartIcon';
import Logo from './Logo';

export default function Header() {
	const router = useRouter();

	const handleProductsClick = () => {
		const targetId = 'products';
		if (typeof window !== 'undefined' && window.location.pathname === '/') {
			document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
			return;
		}
		router.push('/');
		setTimeout(() => {
			document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
		}, 200);
	};

	return (
		<header className='bg-soft-taupe-500 shadow-md fixed top-0 left-0 right-0 z-[100]'>
			<div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
				<Link
					href='/'
					className='flex items-center transition-opacity hover:opacity-80'>
					<Logo className='h-8 sm:h-10 w-auto' />
				</Link>
				<nav className='flex items-center gap-6'>
					<button
						type='button'
						onClick={handleProductsClick}
						className='hover:text-warm-clay-600 text-warm-clay-900 transition-colors uppercase font-bold'>
						Prints
					</button>
					<div className='text-warm-clay-900 hover:text-warm-clay-600 transition-colors'>
						<CartIcon />
					</div>
				</nav>
			</div>
		</header>
	);
}
