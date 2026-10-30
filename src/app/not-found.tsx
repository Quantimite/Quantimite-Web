"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="h-screen w-full bg-[#f8f9fc] text-slate-900 flex flex-col justify-between font-sans relative overflow-hidden select-none">

            {/* BACKGROUND DECORATIVE GLOWS & GRID */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-3xl opacity-60" />
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />
            </div>

            {/* HEADER BAR */}
            <header className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative z-10 shrink-0">
                {/* Brand Logo Text Only */}
                <Link href="/" className="flex items-center group">
                    <span className="text-2xl font-bold tracking-tight text-slate-900 group-hover:opacity-80 transition-opacity">
                        Quantimite
                    </span>
                </Link>

                {/* Right Nav */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/contact"
                        className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        Contact Us
                    </Link>
                    <Link
                        href="/"
                        className="px-5 py-2 rounded-full border border-purple-200 bg-white/80 backdrop-blur-sm text-sm font-semibold text-slate-800 shadow-sm hover:border-purple-400 hover:shadow transition-all"
                    >
                        Back to Safety
                    </Link>
                </div>
            </header>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 max-w-4xl mx-auto w-full px-6 flex flex-col items-center justify-center text-center relative z-10 min-h-0">

                {/* CENTER MASCOT ARTWORK */}
                <div className="relative w-full max-w-xs sm:max-w-sm h-48 sm:h-64 my-1 flex items-center justify-center">
                    <Image
                        src="/assets/brand/404-mascot.png"
                        alt="Quantimite 404 Mascot"
                        fill
                        priority
                        className="object-contain drop-shadow-xl"
                    />
                </div>

                {/* TEXT & ACTION BUTTON */}
                <div className="max-w-lg mx-auto space-y-2 mt-1 shrink-0">
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                        Uh-oh! We’ve lost the connection.
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                        It looks like your next move led to an unexplored route.<br className="hidden sm:inline" />
                        Let us guide you back to the network.
                    </p>

                    <div className="pt-3">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            Take me home
                        </Link>
                    </div>
                </div>

            </main>

            {/* FOOTER */}
            <footer className="w-full text-center py-3 text-xs text-slate-400 relative z-10 shrink-0">
                © 2026 Quantimite Inc. All rights reserved.
            </footer>

        </div>
    );
}