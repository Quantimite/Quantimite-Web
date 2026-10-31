"use client";

import Link from "next/link";
import Logo from "./Logo";
import Button from "@/components/ui/Button";
import { useChat } from "@/context/ChatContext";

export const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/research", label: "Research" },
  { href: "/blog", label: "Insights" },
  { href: "/careers", label: "Careers" },
];

export default function Navbar() {
  const { openChat } = useChat();

  return (
    <header className="sticky top-0 z-50 border-b border-plum/5 bg-white/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="text-xl font-extrabold tracking-tight text-plum">Quantimite</span>
        </Link>
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Button href={l.href} variant="nav">
                {l.label}
              </Button>
            </li>
          ))}
        </ul>
        <Button
          type="button"
          onClick={openChat}
          size="sm"
          className="inline-flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          Let's Chat
        </Button>
      </nav>
    </header>
  );
}
