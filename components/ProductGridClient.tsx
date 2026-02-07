'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '@/types/product';
import { Loader2 } from 'lucide-react';

type ProductGridClientProps = {
	initialItems: Product[];
};

export default function ProductGridClient({ initialItems }: ProductGridClientProps) {
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [visibleCount, setVisibleCount] = useState(2);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [isMobile, setIsMobile] = useState(true);
	const [animatedIds, setAnimatedIds] = useState<Set<string>>(new Set());
	const loadMoreRef = useRef<HTMLDivElement | null>(null);
	const items = initialItems;

	useEffect(() => {
		const checkMobile = () => {
			const mobile = window.innerWidth < 640;
			setIsMobile(mobile);
			if (!mobile && visibleCount === 2) {
				setVisibleCount(6);
			}
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, [visibleCount]);

	const categories = useMemo(() => ['All', ...Array.from(new Set(items.map((product) => product.category)))], [items]);

	const filteredProducts = useMemo(() => {
		if (selectedCategory === 'All') return items;
		return items.filter((product) => product.category === selectedCategory);
	}, [selectedCategory, items]);

	useEffect(() => {
		const initialBatchSize = isMobile ? 2 : 6;
		const newIds = filteredProducts
			.slice(0, visibleCount)
			.map((p) => p.id)
			.filter((id, index) => index >= initialBatchSize && !animatedIds.has(id));
		if (newIds.length > 0) {
			setAnimatedIds((prev) => {
				const next = new Set(prev);
				newIds.forEach((id) => next.add(id));
				return next;
			});
		}
	}, [visibleCount, isMobile, filteredProducts, animatedIds]);

	useEffect(() => {
		setVisibleCount(isMobile ? 2 : 6);
	}, [selectedCategory, isMobile]);

	useEffect(() => {
		if (!loadMoreRef.current || isLoadingMore) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting && visibleCount < filteredProducts.length) {
					setIsLoadingMore(true);
					setTimeout(() => {
						setVisibleCount((count) => Math.min(count + (isMobile ? 2 : 6), filteredProducts.length));
						setIsLoadingMore(false);
					}, 800);
				}
			},
			{ rootMargin: '100px 0px' },
		);
		observer.observe(loadMoreRef.current);
		return () => observer.disconnect();
	}, [filteredProducts.length, visibleCount, isLoadingMore, isMobile]);

	const visibleProducts = filteredProducts.slice(0, visibleCount);

	return (
		<div
			id='products'
			className='relative left-1/2 right-1/2 w-screen -mx-[50vw] bg-gradient-to-b from-warm-clay-50 to-sand pt-4 lg:pt-20 pb-36 scroll-mt-10'>
			<div className='relative mx-auto max-w-7xl px-6'>
				<div className='mb-5 mt-20'>
					<div className='text-center'>
						<h2 className='text-4xl font-bold text-warm-clay-800 mb-4'>Our Prints</h2>
						<p className='text-warm-clay-700 text-base sm:text-lg max-w-lg mx-auto'>
							Curated art prints and framed pieces for your home. Each piece is available in a range of sizes and framing options.
						</p>
					</div>

					<div className='mt-6 flex flex-wrap gap-4 justify-start lg:justify-center'>
						<label
							className='sr-only'
							htmlFor='category-select'>
							Filter by category
						</label>
						<div className='w-full lg:hidden flex items-center gap-3'>
							<p className='text-md font-semibold text-warm-clay-800 whitespace-nowrap'>Categories:</p>
							<select
								id='category-select'
								value={selectedCategory}
								onChange={(e) => setSelectedCategory(e.target.value)}
								className='flex-1 rounded-lg ui-border bg-white px-4 py-3 text-warm-clay-800 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-warm-clay/40'>
								{categories.map((category) => (
									<option
										key={category}
										value={category}>
										{category}
									</option>
								))}
							</select>
						</div>
						<div className='hidden lg:flex flex-wrap justify-center gap-4'>
							{categories.map((category) => (
								<button
									key={category}
									onClick={() => setSelectedCategory(category)}
									className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 shadow-sm ${
										selectedCategory === category ? 'bg-soft-taupe-500 text-warm-clay-900 shadow-lg' : 'bg-sand-200 text-warm-clay-800 hover:bg-soft-taupe-300'
									}`}>
									{category}
								</button>
							))}
						</div>
					</div>
				</div>

				<div>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
						{visibleProducts.length > 0 ? (
							visibleProducts.map((product) => (
								<div
									key={product.id}
									className={animatedIds.has(product.id) ? 'animate-fade-in-up' : ''}>
									<ProductCard product={product} />
								</div>
							))
						) : (
							<div className='col-span-2 text-center py-12'>
								<p className='text-warm-clay-700 text-lg'>No prints found in this category.</p>
							</div>
						)}
					</div>
					<div className='mt-12 flex flex-col items-center justify-center gap-4 min-h-[100px]'>
						{visibleCount < filteredProducts.length && (
							<>
								<div
									ref={loadMoreRef}
									className='flex items-center justify-center p-4'>
									<Loader2 className={`w-8 h-8 text-warm-clay ${isLoadingMore ? 'animate-spin opacity-100' : 'opacity-0'}`} />
								</div>
								{isLoadingMore && <p className='text-sm text-warm-clay-600/60 font-medium animate-pulse'>Loading more...</p>}
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
