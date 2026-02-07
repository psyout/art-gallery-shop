import Image from 'next/image';
import { Brush, Layers, Package } from 'lucide-react';
import AboutAccordion from './AboutAccordion';

export default function About() {
	const accordionItems = [
		{
			title: 'Curated for Your Space.',
			body: 'We select each print for quality, presence, and versatility. From landscapes to abstracts, every piece is chosen to work in real homes and spaces.',
		},
		{
			title: 'Museum-Quality Prints.',
			body: 'Giclée and archival prints on acid-free paper. We work with trusted printers so your art lasts — no fading, no compromise.',
		},
		{
			title: 'Framing That Fits.',
			body: 'Choose from a range of frame options to match your style. Each order is packed with care and delivered ready to hang.',
		},
	];

	const highlights = [
		{
			title: 'Premium',
			highlight: 'materials.',
			body: 'Giclée prints on museum-quality cotton rag and archival paper. Rich textures that bring every piece to life.',
			icon: Brush,
			colorClass: 'text-white',
		},
		{
			title: 'Quality',
			highlight: 'finishes.',
			body: "Matte, satin, or gloss coatings to suit your space. UV-resistant inks that won't fade. Built to last.",
			icon: Layers,
			colorClass: 'text-white',
		},
		{
			title: 'Secure',
			highlight: 'packaging.',
			body: 'Every print is flat-packed with corner protection and moisture barriers. Arrives gallery-ready.',
			icon: Package,
			colorClass: 'text-white',
		},
	];

	return (
		<section>
			<div className='relative w-full py-32 overflow-hidden bg-warm-clay-50/50'>
				<div className='relative z-10 mx-auto max-w-7xl px-6'>
					<h2 className='text-4xl md:text-5xl font-bold text-warm-clay-800 mb-12 tracking-tight'>Art for every wall.</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{highlights.map((item, index) => {
							const Icon = item.icon;
							return (
								<div
									key={index}
									className='bg-sand rounded-xl p-10 flex flex-col min-h-[320px] hover:shadow-2xl hover:scale-103 transition-all duration-300 overflow-hidden shadow-sm group'>
									<div className='h-12 w-12 rounded-full bg-terracotta flex items-center justify-center mb-6'>
										<Icon className={`w-8 h-8 ${item.colorClass}`} />
									</div>
									<h3 className='text-2xl font-bold text-warm-clay-800 leading-tight mb-4'>
										{item.title} <span className={item.colorClass}>{item.highlight}</span>
									</h3>
									<p className='text-[#86868b] text-lg font-medium leading-relaxed flex-1'>{item.body}</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			<div className='w-full bg-[#f5f5f7]/50 overflow-hidden'>
				<div className='grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[600px]'>
					<div className='order-1 lg:order-1 flex lg:justify-end items-center'>
						<div className='w-full lg:max-w-[640px] px-6 lg:pr-16 py-20 lg:py-32'>
							<h2 className='text-3xl lg:text-5xl font-bold text-warm-clay-800 mb-12 tracking-tight'>Curated for Your Space.</h2>
							<AboutAccordion
								items={accordionItems}
								defaultOpenIndex={0}
							/>
						</div>
					</div>
					<div className='order-2 lg:order-2 relative min-h-[400px] lg:min-h-full w-full overflow-hidden'>
						<Image
							src='https://picsum.photos/seed/gallery-about/800/600'
							alt='FrameYourself gallery'
							fill
							sizes='(min-width: 1024px) 50vw, 100vw'
							className='object-cover'
							unoptimized
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
