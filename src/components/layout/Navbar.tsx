"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Logo from "./Logo";
import { links } from "./links";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  useEffect(() => setOpen(false), [pathname]); // close the mobile menu after navigating

  return (
    <header className="sticky top-0 z-50 border-b border-plum/5 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="text-xl font-extrabold tracking-tight text-plum">Quantimite</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Button
                href={l.href}
                variant="nav"
                aria-current={isActive(l.href) ? "page" : undefined}
                className={isActive(l.href) ? "is-active" : ""}
              >
                {l.label}
              </Button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block"><Button href="/contact" size="sm">Contact us</Button></div>
          <button
            type="button" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}
            className="grid h-11 w-11 place-items-center rounded-full border border-plum/10 bg-white/70 text-plum lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="absolute left-0 right-0 top-full max-h-[calc(100svh-4rem)] overflow-y-auto border-b border-plum/10 bg-white/95 px-6 pb-6 pt-3 shadow-xl backdrop-blur-xl lg:hidden">
          <ul className="space-y-1.5">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`btn-outline btn-nav block rounded-2xl px-4 py-3 text-base font-semibold ${isActive(l.href) ? "is-active" : ""}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5"><Button href="/contact" className="w-full">Contact us</Button></div>
        </div>
      )}
    </header>
  );
}
