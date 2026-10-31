"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import BlogAnimatedBackground from "./BlogAnimatedBackground";
import AlivePetCharacter from "./AlivePetCharacter";
import { Sparkles, ArrowDown, BookOpen, Layers, Zap, TrendingUp, Code2 } from "lucide-react";

export default function BlogHero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24">
      {/* 1. Good Interactive Animated Background */}
      <BlogAnimatedBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Hero Content */}
          <div className="text-center lg:col-span-7 lg:text-left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-plum/10 bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-plum uppercase backdrop-blur-md shadow-xs">
              <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
              <span>Quantimite Insights Hub</span>
            </div>

            {/* Heading */}
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-plum sm:text-6xl sm:leading-[1.1] xl:text-[4rem]">
              Engineering, design &amp; strategy for{" "}
              <span className="text-brand">tomorrow&apos;s builders</span>.
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-plum/75 sm:text-xl">
              Unfiltered architectural deep dives, liquid interface craft, and startup growth playbooks
              curated by our core engineering team. Zero marketing fluff.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <button
                type="button"
                onClick={() => scrollToSection("articles")}
                className="btn-fill inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white shadow-lg cursor-pointer"
              >
                <span>Explore Insights</span>
                <ArrowDown className="h-4 w-4 animate-bounce" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("newsletter")}
                className="btn-outline inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold text-plum cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-violet" />
                <span>Join Newsletter</span>
              </button>
            </div>

            {/* Core Disciplines Badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-plum/10 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-plum/80 shadow-2xs backdrop-blur-sm">
                <Code2 className="h-3.5 w-3.5 text-violet" />
                Software &amp; Micro-frontends
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-plum/10 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-plum/80 shadow-2xs backdrop-blur-sm">
                <Layers className="h-3.5 w-3.5 text-azure" />
                Liquid Glass UI/UX
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-plum/10 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-plum/80 shadow-2xs backdrop-blur-sm">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                Technical SEO &amp; Growth
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-plum/10 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-plum/80 shadow-2xs backdrop-blur-sm">
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                Startup Velocity
              </span>
            </div>
          </div>

          {/* Right Column: Alive Pet Character Reacting to Cursor & Scroll */}
          <AlivePetCharacter />
        </div>
      </div>
    </section>
  );
}
