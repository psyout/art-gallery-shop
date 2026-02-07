import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
	title: 'FrameYourself – Art Prints & Gallery',
	description: 'Curated art prints and framed pieces for your home. Landscape, abstract, and portrait prints delivered to your door.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<meta
					httpEquiv='X-UA-Compatible'
					content='IE=edge'
				/>
				<meta
					name='referrer'
					content='no-referrer'
				/>
				<meta
					name='robots'
					content='noindex, nofollow, noarchive, nosnippet, noimageindex'
				/>
				<meta
					name='googlebot'
					content='noindex, nofollow, noarchive, nosnippet, noimageindex'
				/>
			</head>
			<body className='antialiased'>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
