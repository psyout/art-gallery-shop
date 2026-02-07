import ProductGrid from '@/components/ProductGrid';
import Hero from '@/components/Hero';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import About from '@/components/About';
import Contact from '@/components/Contact';

export default function Home() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-sand via-terracotta-50 to-warm-clay-100'>
			<Header />
			<Hero />
			<main>
				<ProductGrid />
			</main>
			<About />
			<Contact />
			<Footer />
		</div>
	);
}
