import Link from "next/link";
import Logo from "./Logo";

export const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/research", label: "Research" },
  { href: "/blog", label: "Insights" },
  { href: "/careers", label: "Careers" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-plum/5 bg-white/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="text-xl font-extrabold tracking-tight text-plum">Quantimite</span>
        </Link>
        <ul className="hidden items-center gap-8 text-sm font-medium text-plum/70 lg:flex">
          {links.map((l) => (
            <li key={l.href}><Link href={l.href} className="transition hover:text-violet">{l.label}</Link></li>
          ))}
        </ul>
        <Link href="/contact" className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet/25 transition hover:shadow-violet/40">
          Start a project
        </Link>
      </nav>
    </header>
  );
}
