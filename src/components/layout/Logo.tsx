export default function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/assets/brand/logo-icon.png" alt="" aria-hidden="true" className={className} />;
}
