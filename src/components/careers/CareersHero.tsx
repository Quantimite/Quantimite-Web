"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Search, Compass, ExternalLink, ArrowRight } from "lucide-react";

export default function CareersHero({ totalJobsCount = 7 }: { totalJobsCount?: number }) {
  const scrollToPositions = () => {
    const el = document.getElementById("open-positions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
      {/* Background Volumetric Ambient Lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[450px] rounded-full bg-gradient-to-r from-violet/15 via-azure/10 to-violet/15 blur-[120px] opacity-70"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-plum/10 bg-white/80 px-4 py-1.5 text-xs font-semibold text-plum shadow-xs backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${totalJobsCount > 0 ? "bg-violet" : "bg-amber-500"} opacity-75`} />
              <span className={`relative inline-flex h-2 w-2 rounded-full ${totalJobsCount > 0 ? "bg-violet" : "bg-amber-500"}`} />
            </span>
            <span className="text-plum/80 font-mono tracking-wider uppercase">
              {totalJobsCount > 0
                ? `WE ARE HIRING // ${totalJobsCount} OPEN POSITIONS`
                : "STATUS: ALL PODS AT CAPACITY // 0 ACTIVE OPENINGS"}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-plum leading-[1.05]"
          >
            MAKE YOUR <br className="hidden sm:inline" />
            <span className="text-brand">NEXT MOVE</span>.
          </motion.h1>

          {/* Mission Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-xl text-plum/70 font-light max-w-2xl leading-relaxed"
          >
            Build meaningful products with engineers and designers who care about craft,
            resilient cloud architectures, and extreme software performance.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={scrollToPositions}
              className="btn-fill flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold tracking-wide cursor-pointer shadow-lg shadow-violet/20"
            >
              <span>{totalJobsCount > 0 ? `Explore Open Roles (${totalJobsCount})` : "Check Positions & Filters"}</span>
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </button>

            <Link
              href="/careers/general"
              className="btn-outline flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-plum"
            >
              <span>Join Talent Pool</span>
              <Sparkles className="h-4 w-4 text-violet" />
            </Link>

            <Link
              href="/careers/track"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-plum/60 hover:text-plum transition-colors"
            >
              <span>Track Application Status</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </motion.div>

          {/* Quick Metrics Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-14 pt-8 border-t border-plum/10 w-full grid grid-cols-2 sm:grid-cols-4 gap-6 text-center"
          >
            <div>
              <p className="text-2xl sm:text-3xl font-black text-plum">100%</p>
              <p className="text-xs font-semibold text-plum/60 mt-0.5">Remote & Hybrid</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-brand">24–48h</p>
              <p className="text-xs font-semibold text-plum/60 mt-0.5">Response Guarantee</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-plum">$2,000</p>
              <p className="text-xs font-semibold text-plum/60 mt-0.5">Annual Learning Stipend</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-brand">1:1</p>
              <p className="text-xs font-semibold text-plum/60 mt-0.5">Senior Mentorship</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
