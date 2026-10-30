export default function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="qg" x1="6" y1="8" x2="58" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A818F5" /><stop offset="1" stopColor="#2F8BFA" />
        </linearGradient>
      </defs>
      <circle cx="27" cy="33" r="18" stroke="url(#qg)" strokeWidth="6" />
      <path d="M32 40 55 12M41 12h14v14" stroke="url(#qg)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
