import ContactForm from './ContactForm';

export default function Contact() {
	return (
		<section className='py-20 bg-white'>
			<div className='mx-auto max-w-7xl px-6'>
				<div className='text-center mb-12'>
					<h2 className='text-4xl font-bold text-warm-clay-800 mb-4'>Get in Touch</h2>
					<p className='text-warm-clay-700 text-lg max-w-2xl mx-auto'>
						Questions about a print, framing, or shipping? We are here to help. Reach out and we will respond as soon as possible.
					</p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
					<ContactForm />

					<div className='flex flex-col md:flex-row lg:flex-col gap-6'>
						<div className='flex-1 bg-olive-branch/20 backdrop-blur-sm rounded-lg p-6 shadow-lg ui-border'>
							<h3 className='text-2xl font-bold text-warm-clay-800 mb-6'>Contact Information</h3>
							<div className='space-y-6'>
								<div className='flex items-start gap-4'>
									<div className='mt-1'>
										<svg
											className='w-6 h-6 text-warm-clay'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={1.5}
												d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
											/>
										</svg>
									</div>
									<div>
										<h4 className='font-semibold text-warm-clay-800 mb-1'>Email</h4>
										<a
											href='mailto:hello@frameyourself.cx'
											className='text-warm-clay-700 hover:text-warm-clay'>
											hello@frameyourself.cx
										</a>
									</div>
								</div>
							</div>
						</div>

						<div className='flex-1 bg-olive-branch/20 backdrop-blur-sm rounded-lg p-6 shadow-md ui-border'>
							<div className='flex items-center gap-2 mb-3'>
								<svg
									className='w-5 h-5 text-warm-clay'
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
								<h4 className='font-semibold text-warm-clay-800'>Secure Checkout</h4>
							</div>
							<p className='text-sm text-warm-clay-700'>We use secure payment processing. Your information is kept confidential and never shared with third parties.</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
