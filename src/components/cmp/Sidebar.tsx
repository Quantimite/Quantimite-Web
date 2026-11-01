"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import Logo from "@/components/layout/Logo";
import { logout } from "@/app/app-secure-portal-9f8b2c/actions";
import { ICONS } from "./icons";

type Item = { slug: string; label: string; group: string };

export default function Sidebar({ slug, items, user, role }: { slug: string; items: Item[]; user: string; role: string }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  const href = (s: string) => (s === "overview" ? `/${slug}/dashboard` : `/${slug}/dashboard/${s}`);
  const groups = items.reduce<Record<string, Item[]>>((a, i) => { (a[i.group] ||= []).push(i); return a; }, {});

  const nav = (
    <div className="flex h-full flex-col bg-ink text-white">
      {/* Brand Header (Fixed top) */}
      <div className="flex items-center gap-2.5 px-5 py-5 shrink-0">
        <Logo className="h-8 w-auto" />
        <div><p className="text-base font-extrabold leading-none text-white">Quantimite</p><p className="mt-1 text-xs font-medium text-white/50">Content platform</p></div>
      </div>

      {/* Scrollable Navigation Links (Hidden scrollbar class added: scrollbar-none or [&::-webkit-scrollbar]:hidden) */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {Object.entries(groups).map(([g, list]) => (
          <div key={g}>
            <p className="px-3 pb-2 text-xs font-semibold text-white/40">{g}</p>
            <ul className="space-y-1">
              {list.map((m) => {
                const Icon = ICONS[m.slug], active = path === href(m.slug);
                return (
                  <li key={m.slug}>
                    <Link href={href(m.slug)} aria-current={active ? "page" : undefined}
                      className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${active ? "bg-white/10 text-white" : "text-white/65 hover:bg-white/5 hover:text-white"}`}>
                      {active && <span className="absolute inset-y-2 left-0 w-1 rounded-full bg-brand" />}
                      <Icon className="h-[18px] w-[18px]" />{m.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Pinned Bottom Footer (Profile & Sign out - never scrolls, no scrollbar overlap) */}
      <div className="border-t border-white/10 p-4 shrink-0 bg-ink">
        <div className="mb-3 flex items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white">{user[0]?.toUpperCase()}</div>
          <div className="min-w-0"><p className="truncate text-sm font-semibold text-white">{user}</p><p className="text-xs text-white/50 capitalize">{role.replace('_', ' ')}</p></div>
        </div>
        <form action={logout}>
          <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-3 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/10">
            <LogOut className="h-4 w-4" />Sign out
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 bg-ink lg:block">{nav}</aside>
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-plum/10 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
        <span className="font-extrabold text-plum">Quantimite CMP</span>
        <button aria-label="Open menu" onClick={() => setOpen(true)} className="grid h-10 w-10 place-items-center rounded-full border border-plum/10 text-plum"><Menu className="h-5 w-5" /></button>
      </header>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button aria-label="Close menu" className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-ink shadow-2xl">
            <button aria-label="Close" onClick={() => setOpen(false)} className="absolute right-3 top-5 text-white/70"><X className="h-5 w-5" /></button>
            {nav}
          </aside>
        </div>
      )}
    </>
  );
}