"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0d071a] text-white pt-16 pb-8 relative overflow-hidden border-t border-white/10">

      {/* TOP SECTION: Main Navigation & Details */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 px-6 lg:px-12 relative z-10 pb-12">

        {/* BRAND COLUMN */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center p-2 shadow-lg shadow-purple-500/20">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white stroke-current stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8l4 4-4 4M8 12h8" />
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">Quantimite</span>
            </div>

            <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-sm">
              We engineer your next move. High-impact software architecture, UI/UX design, and digital growth strategies for ambitious brands.
            </p>

            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-gray-900 font-semibold text-xs tracking-wide shadow-md hover:bg-gray-100 transition-all"
              >
                Start a project
              </Link>
            </div>
          </div>

          <div className="space-y-2 text-xs text-gray-400">
            <p className="flex items-center gap-1">
              Built with <span className="text-purple-400">♥</span> by <span className="text-white font-medium">Quantimite Core</span>
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Systems Operational
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[10px] font-mono">
                v2.4 • 2026 Edition
              </span>
            </div>
          </div>
        </div>

        {/* LINK COLUMNS */}
        <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
          <div>
            <h4 className="font-semibold text-white mb-4 tracking-wider uppercase text-[11px] text-purple-300">
              Menu
            </h4>
            <ul className="space-y-2.5 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Showcase</Link></li>
              <li><Link href="/research" className="hover:text-white transition-colors">Research</Link></li>
              <li><Link href="/insights" className="hover:text-white transition-colors">Insights</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 tracking-wider uppercase text-[11px] text-purple-300">
              Essentials
            </h4>
            <ul className="space-y-2.5 text-gray-400">
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Notice</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Usage Guidelines</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 tracking-wider uppercase text-[11px] text-purple-300">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-gray-400 font-mono text-[11px]">
              <li><a href="https://github.com/404-Found-hq" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors">Mathota POS ↗</a></li>
              <li><a href="/portfolio" className="hover:text-purple-400 transition-colors">WanaJeevi ↗</a></li>
              <li><a href="/portfolio" className="hover:text-purple-400 transition-colors">GitLore ↗</a></li>
              <li><a href="https://idis-graphicx.web.app" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors">IDIS Graphix ↗</a></li>
            </ul>
          </div>
        </div>

        {/* CALLOUT COLUMN */}
        <div className="lg:col-span-3 flex flex-col justify-between space-y-4 border-l border-white/10 lg:pl-8">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Engineering without limits
            </h3>
            <p className="mt-2 text-xs text-gray-400 leading-relaxed">
              Ready to transform your ideas into high-performance software products?
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href="/contact"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs shadow-lg transition-colors"
            >
              Book a Consultation →
            </Link>

            <div className="pt-3 border-t border-white/10 text-[10px] text-gray-400 flex flex-col gap-1.5">
              <span className="uppercase text-[9px] text-purple-300 tracking-wider">Partner Studios</span>
              <a href="https://idis-graphicx.web.app" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition-colors flex items-center justify-between">
                IDIS Graphix <span>↗</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* FULL-WIDTH GIANT TEXT SECTION */}
      <div className="w-full overflow-hidden flex items-center justify-center select-none pt-6 pb-4 leading-none">
        <h1 className="w-full text-center text-[15.5vw] font-black tracking-tighter text-white/15 uppercase leading-none pointer-events-none font-sans">
          Quantimite
        </h1>
      </div>

      {/* BOTTOM COPYRIGHT NOTICE */}
      <div className="w-full text-center text-xs text-gray-500 font-medium pt-2 pb-2 border-t border-white/5">
        © 2026 Quantimite. All rights reserved.
      </div>

    </footer>
  );
}