"use client";

import { motion, type Variants } from "framer-motion";
import Button from "@/components/ui/Button";
import BlogAnimatedBackground from "./BlogAnimatedBackground";
import {
  RadarCompassIcon,
  ModernArrowRight,
  BlueprintChipIcon,
} from "./BlogIcons";

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
    image: "/assets/blog/software-architecture.jpg",
    title: "Software & Architecture",
    description: "Next.js 15, React 19, distributed microservices, and edge computing patterns.",
    tag: "Core Systems",
    badgeColor: "bg-violet/10 text-violet border-violet/20",
  },
  {
    image: "/assets/blog/design-craft.jpg",
    title: "Liquid Interface Craft",
    description: "Physics-based micro-interactions, Apple-grade glassmorphism, and design systems.",
    tag: "UI / UX Design",
    badgeColor: "bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-500/20",
  },
  {
    image: "/assets/blog/technical-growth.jpg",
    title: "Technical Growth & SEO",
    description: "Sub-100ms Core Web Vitals, JSON-LD knowledge graphs, and programmatic search.",
    tag: "Engineering SEO",
    badgeColor: "bg-blue-500/10 text-azure border-blue-500/20",
  },
  {
    image: "/assets/blog/startup-velocity.jpg",
    title: "Startup Velocity",
    description: "Battle-tested 90-day iteration models to navigate from MVP to product-market fit.",
    tag: "Venture Playbooks",
    badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
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
            <span className="apple-glass-pill inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
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
              className="btn-fill inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-bold text-white shadow-lg cursor-pointer"
            >
              <RadarCompassIcon size={18} />
              <span>Explore All Insights</span>
              <ModernArrowRight size={16} />
            </button>

            <button
              type="button"
              onClick={() => scrollTo("newsletter")}
              className="btn-outline inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-plum cursor-pointer"
            >
              <span className="h-2 w-2 rounded-full bg-violet" />
              <span>Join Fortnightly Dispatch</span>
            </button>
          </motion.div>

          {/* Editorial Pipeline Status Indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-plum/60"
          >
            <span className="flex items-center gap-1.5">
              <BlueprintChipIcon size={16} className="text-emerald-500" />
              Peer-Reviewed Architecture
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-azure" />
              Zero Marketing Fluff
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-violet" />
              Production Code Blueprints
            </span>
          </motion.div>
        </motion.div>

        {/* 3D Glassmorphic Bento Category Pillar Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {bentoFeatures.map((item, index) => (
            <div
              key={index}
              className="apple-glass-panel group relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-violet/40 hover:shadow-2xl"
            >
              {/* Luminous background glow on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-gradient-to-br from-violet/15 to-azure/15 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
              />

              <div>
                {/* Header with 3D Rendered Icon & Category Tag */}
                <div className="flex items-center justify-between">
                  <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/60 bg-white/50 p-1 shadow-md transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover rounded-xl"
                    />
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${item.badgeColor}`}
                  >
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

              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-plum/50 group-hover:text-violet transition-colors">
                <span>View Track</span>
                <ModernArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
