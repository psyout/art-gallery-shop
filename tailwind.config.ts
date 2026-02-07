import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			fontSize: {
				base: ['1rem', { lineHeight: '1.4' }],
				lg: ['1.125rem', { lineHeight: '1.4' }],
				xl: ['1.25rem', { lineHeight: '1.4' }],
				'2xl': ['1.5rem', { lineHeight: '1.4' }],
				'3xl': ['1.75rem', { lineHeight: '1.4' }],
			},
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				'warm-clay': {
					DEFAULT: '#B5846C',
					50: '#FAF5F2',
					100: '#F2E8E2',
					200: '#E5D1C5',
					300: '#D4B5A3',
					400: '#C49A85',
					500: '#B5846C',
					600: '#9A6B54',
					700: '#7A5443',
					800: '#5A3E32',
					900: '#3A2821',
				},
				sand: {
					DEFAULT: '#E8DFD4',
					50: '#FDFCFA',
					100: '#FAF6F1',
					200: '#F2EBE2',
					300: '#E8DFD4',
					400: '#D9CCBC',
					500: '#C9B9A4',
					600: '#A89680',
				},
				'olive-branch': {
					DEFAULT: '#8B9A6D',
					50: '#F4F5F1',
					100: '#E4E8DB',
					200: '#D0D8BE',
					300: '#B5C296',
					400: '#9AAC7E',
					500: '#8B9A6D',
					600: '#6F7B57',
					700: '#535C41',
				},
				terracotta: {
					DEFAULT: '#C4785C',
					50: '#FBF5F2',
					100: '#F5E6DF',
					200: '#EBCDC0',
					300: '#DEB09A',
					400: '#D19478',
					500: '#C4785C',
					600: '#A6614A',
					700: '#834C3A',
				},
				'soft-taupe': {
					DEFAULT: '#B8A99A',
					50: '#F9F7F5',
					100: '#F0EBE6',
					200: '#E2DAD1',
					300: '#D0C4B8',
					400: '#C4B6A9',
					500: '#B8A99A',
					600: '#9A8A7A',
				},
			},
			keyframes: {
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
			},
			animation: {
				'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
			},
			scale: {
				'103': '1.03',
			},
		},
	},
	plugins: [],
};
export default config;
