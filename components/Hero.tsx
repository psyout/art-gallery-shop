import HeroClient from './HeroClient';

const slides = [
	{
		backgroundImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1920&h=1080&fit=crop',
		description: 'Curated art prints and framed pieces for your home. Landscape, abstract, and portrait — each piece chosen for quality and presence.',
	},
	{
		backgroundImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop',
		description: 'Art for every wall. Thoughtful framing options, secure checkout, and careful packaging so your print arrives ready to hang.',
	},
];

export default function Hero() {
	return <HeroClient slides={slides} />;
}
