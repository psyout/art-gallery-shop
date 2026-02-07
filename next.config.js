/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	output: 'standalone',
	experimental: {
		optimizePackageImports: ['lucide-react'],
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'picsum.photos',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				pathname: '/**',
			},
		],
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{
						key: 'X-Robots-Tag',
						value: 'noindex, nofollow, noarchive, nosnippet, noimageindex',
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
