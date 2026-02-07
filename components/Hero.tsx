import HeroClient from './HeroClient';

const slides = [
	{
		backgroundImage: 'https://picsum.photos/seed/gallery-hero-1/1920/1080',
		description: 'Curated art prints and framed pieces for your home. Landscape, abstract, and portrait — each piece chosen for quality and presence.',
	},
	{
		backgroundImage: 'https://picsum.photos/seed/gallery-hero-3/1920/1080',
		description: 'Art for every wall. Thoughtful framing options, secure checkout, and careful packaging so your print arrives ready to hang.',
	},
];

export default function Hero() {
	return <HeroClient slides={slides} />;
}
