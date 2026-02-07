interface LogoProps {
	className?: string;
}

export default function Logo({ className = 'h-10' }: LogoProps) {
	return <span className={`font-bold text-warm-clay-900 text-xl tracking-tight ${className}`}>FrameYourself</span>;
}
