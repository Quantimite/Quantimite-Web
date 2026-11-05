"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function TalentPoolCTA() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-plum p-8 sm:p-14 text-white shadow-xl shadow-plum/20">
          {/* Ambient Lighting */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-violet/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-azure/25 blur-3xl"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-violet" />
                <span>GENERAL TALENT NETWORK</span>
              </div>

              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Don&apos;t see your dream role?
              </h2>

              <p className="mt-3 text-sm sm:text-base text-white/80 font-light leading-relaxed">
                We are always expanding our engineering pods and design studios. If you believe your skills can accelerate our mission, tell us about what you build.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-white/70">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-violet" />
                  Reviewed directly by founding partners
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-azure" />
                  Kept active in talent pool for 12 months
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <Link
                href="/careers/general"
                className="btn-fill flex items-center gap-2 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-wider"
              >
                <span>Join General Talent Pool</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
