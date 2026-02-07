import { promises as fs } from 'fs';
import path from 'path';
import type { Product } from '@/types/product';

let cachedProducts: Product[] | null = null;

export async function getProducts(): Promise<Product[]> {
	if (cachedProducts) {
		return cachedProducts;
	}
	const filePath = path.join(process.cwd(), 'data', 'products.json');
	const contents = await fs.readFile(filePath, 'utf8');
	cachedProducts = JSON.parse(contents) as Product[];
	return cachedProducts;
}
