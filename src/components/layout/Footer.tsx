import Link from "next/link";
import Logo from "./Logo";
import { links } from "./links";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 text-white">
            <Logo /><span className="text-xl font-extrabold">Quantimite</span>
          </div>
          <p className="mt-4 max-w-xs text-sm">We engineer your next move. Software, design, and digital growth.</p>
        </div>
        <ul className="space-y-2 text-sm">
          {links.map((l) => (<li key={l.href}><Link href={l.href} className="hover:text-white">{l.label}</Link></li>))}
        </ul>
        <div className="text-sm">
          <Link href="/contact" className="font-semibold text-white">Contact</Link>
          <p className="mt-2">Email and social links coming soon.</p>
          <p className="mt-4 space-x-4"><Link href="/privacy" className="hover:text-white">Privacy</Link><Link href="/terms" className="hover:text-white">Terms</Link></p>
        </div>
      </div>
      <p className="border-t border-white/10 py-5 text-center text-xs">© {new Date().getFullYear()} Quantimite. All rights reserved.</p>
    </footer>
  );
}
