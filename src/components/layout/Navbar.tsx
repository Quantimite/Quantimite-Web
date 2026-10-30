import Link from "next/link";
import Logo from "./Logo";
import Button from "@/components/ui/Button";

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
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}><Button href={l.href} variant="nav">{l.label}</Button></li>
          ))}
        </ul>
        <Button href="/contact" size="sm">Start a project</Button>
      </nav>
    </header>
  );
}
