"use client";

import { motion, type Variants } from "framer-motion";
import Button from "@/components/ui/Button";
import BlogAnimatedBackground from "./BlogAnimatedBackground";
import {
  Sparkles,
  ArrowDown,
  Terminal,
  Palette,
  TrendingUp,
  Rocket,
  Compass,
  CheckCircle2,
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const bentoFeatures = [
  {
    icon: Terminal,
    title: "Software & Architecture",
    description: "Next.js 15, React 19, distributed microservices, and edge computing patterns.",
    tag: "Core Systems",
    color: "from-violet-500/10 to-indigo-500/10 border-violet-500/20 text-violet",
  },
  {
    icon: Palette,
    title: "Liquid Interface Craft",
    description: "Physics-based micro-interactions, Apple-grade glassmorphism, and design systems.",
    tag: "UI / UX Design",
    color: "from-fuchsia-500/10 to-pink-500/10 border-fuchsia-500/20 text-fuchsia-600",
  },
  {
    icon: TrendingUp,
    title: "Technical Growth & SEO",
    description: "Sub-100ms Core Web Vitals, JSON-LD knowledge graphs, and programmatic search.",
    tag: "Engineering SEO",
    color: "from-blue-500/10 to-azure/10 border-blue-500/20 text-azure",
  },
  {
    icon: Rocket,
    title: "Startup Velocity",
    description: "Battle-tested 90-day iteration models to navigate from MVP to product-market fit.",
    tag: "Venture Playbooks",
    color: "from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-600",
  },
];

export default function BlogHero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
      {/* Dynamic Animated Ambient Background */}
      <BlogAnimatedBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Eyebrow Pill */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-plum/10 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-plum shadow-xs backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
              <span>Quantimite Intelligence // Editorial &amp; Insights</span>
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="mt-6 text-4xl font-extrabold tracking-tight text-plum sm:text-6xl sm:leading-[1.1] lg:text-[4.2rem]"
          >
            Architecting systems, craft &amp; strategy for{" "}
            <span className="text-brand">the next digital frontier</span>.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg leading-relaxed text-plum/75 sm:text-xl"
          >
            Unfiltered engineering deep dives, tactile interface design patterns, and high-velocity
            growth playbooks curated directly by our core software engineers and product designers.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              type="button"
              onClick={() => scrollTo("articles")}
              className="btn-fill inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white shadow-lg cursor-pointer"
            >
              <Compass className="h-4 w-4" />
              <span>Explore All Insights</span>
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </button>

            <button
              type="button"
              onClick={() => scrollTo("newsletter")}
              className="btn-outline inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-plum cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-violet" />
              <span>Join Fortnightly Dispatch</span>
            </button>
          </motion.div>

          {/* Editorial Pipeline Status Indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex items-center justify-center gap-6 text-xs font-semibold text-plum/60"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              Peer-Reviewed Architecture
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              Zero Marketing Fluff
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              Open Source Code Patterns
            </span>
          </motion.div>
        </motion.div>

        {/* Modern Bento Category Pillar Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {bentoFeatures.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-plum/10 bg-white/70 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-violet/30 hover:bg-white/90 hover:shadow-xl"
              >
                {/* Luminous hover accent */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-gradient-to-br from-violet/10 to-azure/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                />

                <div className="flex items-center justify-between">
                  <div
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-gradient-to-br ${item.color} shadow-xs`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-plum/5 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-plum/60">
                    {item.tag}
                  </span>
                </div>

                <h3 className="mt-5 text-base font-bold text-plum transition-colors group-hover:text-violet">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-plum/70">
                  {item.description}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
