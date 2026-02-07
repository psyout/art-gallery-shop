export default function Footer() {
	return (
		<footer className='ui-border-t mt-1 pt-8 pb-8'>
			<div className='mx-auto max-w-7xl px-6 text-center text-warm-clay-700 text-sm'>
				<p className='flex items-center justify-center gap-2 flex-wrap'>
					<span className='flex items-center gap-2'>
						<svg
							className='w-4 h-4 flex-shrink-0'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={1.5}
								d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
							/>
						</svg>
						<span>Secure Checkout</span>
					</span>
					<span className='hidden sm:inline'>•</span>
					<span>Free Shipping on Orders Over $100</span>
					<span className='hidden sm:inline'>•</span>
					<span>Art for Your Space</span>
				</p>
				<p className='mt-2'>Copyright © 2026 FrameYourself All rights reserved.</p>
			</div>
		</footer>
	);
}
