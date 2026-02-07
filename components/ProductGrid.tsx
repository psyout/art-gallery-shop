import { getProducts } from '@/lib/products';
import ProductGridClient from './ProductGridClient';

export default async function ProductGrid() {
	const items = await getProducts();
	const visibleItems = items.filter((product) => {
		const status = product.status ?? 'published';
		return status === 'published' || status === 'stock-out';
	});
	return <ProductGridClient initialItems={visibleItems} />;
}
