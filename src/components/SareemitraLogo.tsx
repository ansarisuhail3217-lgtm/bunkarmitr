interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function SareemitraLogo({ className = '', size = 32, showText = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Circular flowing saree shape */}
        <circle cx="32" cy="32" r="28" stroke="url(#logoGrad)" strokeWidth="3" fill="none" opacity="0.3" />
        <path
          d="M32 4C18.745 4 8 14.745 8 28c0 8.5 4.5 16 11 20.5C22 51 27 52 32 52s10-1 13-3.5C51.5 44 56 36.5 56 28 56 14.745 45.255 4 32 4z"
          fill="url(#logoGrad)"
          opacity="0.15"
        />
        {/* Flowing saree drape - left */}
        <path
          d="M20 18c-2 6-3 12-1 18 1 4 4 8 8 10"
          stroke="url(#logoGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Flowing saree drape - right */}
        <path
          d="M44 18c2 6 3 12 1 18-1 4-4 8-8 10"
          stroke="url(#logoGrad2)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Two subtle silhouettes */}
        {/* Left figure */}
        <circle cx="26" cy="26" r="3.5" fill="url(#logoGrad)" opacity="0.7" />
        <path d="M22 34c0-2.2 1.8-4 4-4s4 1.8 4 4v2H22v-2z" fill="url(#logoGrad)" opacity="0.5" />
        {/* Right figure */}
        <circle cx="38" cy="26" r="3.5" fill="url(#logoGrad2)" opacity="0.7" />
        <path d="M34 34c0-2.2 1.8-4 4-4s4 1.8 4 4v2H34v-2z" fill="url(#logoGrad2)" opacity="0.5" />
        {/* Connecting arc - unity */}
        <path
          d="M24 40c4 4 12 4 16 0"
          stroke="url(#logoGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
        <defs>
          <linearGradient id="logoGrad" x1="8" y1="4" x2="56" y2="52" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E8707A" />
            <stop offset="1" stopColor="#F4A261" />
          </linearGradient>
          <linearGradient id="logoGrad2" x1="56" y1="4" x2="8" y2="52" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F4A261" />
            <stop offset="1" stopColor="#E8707A" />
          </linearGradient>
        </defs>
      </svg>
      {showText && (
        <span className="font-extrabold text-gradient-hero text-xl tracking-tight">Sareemitra</span>
      )}
    </span>
  );
}
