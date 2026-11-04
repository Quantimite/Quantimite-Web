"use client";

import { motion } from "framer-motion";
import { ArrowDown, Atom, Sparkles, BookOpen, GitFork, Users } from "lucide-react";
import Button from "@/components/ui/Button";
import { ScrollTextFade } from "@/components/ui/ScrollText";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ResearchHero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background ambient mesh grid */}
      <div className="bg-grid-pattern pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-violet/15 via-azure/10 to-transparent blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-plum/10 bg-white/80 px-4 py-1.5 shadow-xs backdrop-blur-md"
          >
            <Atom className="h-4 w-4 animate-spin-slow text-violet" />
            <span className="text-xs font-bold tracking-wide uppercase text-plum/80">
              Quantimite Applied Research & Innovation Labs
            </span>
          </motion.div>

          {/* Heading with scroll-in-and-out animation */}
          <motion.h1
            initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold tracking-tight text-plum sm:text-6xl lg:text-7xl"
          >
            Advancing the frontiers of{" "}
            <span className="text-brand">applied computing.</span>
          </motion.h1>

          {/* Subtitle with scroll in and out */}
          <motion.p
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-plum/70 sm:text-lg"
          >
            We bridge theoretical breakthroughs with resilient enterprise software.
            Our research roadmap focuses on deterministic AI agent architectures, post-quantum
            cryptography, WebAssembly runtimes, and privacy-preserving mathematical attribution.
          </motion.p>

          {/* Quick jump navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3.5"
          >
            <button
              onClick={() => scrollTo("focus-areas")}
              className="btn-fill rounded-full px-6 py-3 text-sm font-semibold shadow-md"
            >
              Explore Focus Areas
            </button>
            <button
              onClick={() => scrollTo("publications")}
              className="btn-outline rounded-full px-6 py-3 text-sm font-semibold text-plum"
            >
              Publications & Papers
            </button>
            <button
              onClick={() => scrollTo("researchers")}
              className="btn-outline inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm font-semibold text-violet"
            >
              <span>Fellowship Slots</span>
              <ArrowDown className="h-4 w-4" />
            </button>
          </motion.div>
        </div>

        {/* High-Impact Research Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
        >
          {[
            {
              label: "Research Pillars",
              value: "4 Core",
              icon: BookOpen,
              subtext: "AI, Security, Web, Analytics",
            },
            {
              label: "Open Source R&D Tooling",
              value: "3 Repos",
              icon: GitFork,
              subtext: "Active GitHub repositories",
            },
            {
              label: "Fellowship & Visiting Chairs",
              value: "4 Open",
              icon: Users,
              subtext: "Reserved for incoming scholars",
            },
            {
              label: "Algorithmic Speedup Target",
              value: "8.4x",
              icon: Sparkles,
              subtext: "Edge compute optimization",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-card group rounded-2xl p-5 text-center sm:p-6"
              >
                <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-xl bg-violet/10 text-violet transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-2xl font-black tracking-tight text-plum sm:text-3xl">
                  {item.value}
                </div>
                <p className="mt-1 text-xs font-bold text-plum/80 sm:text-sm">
                  {item.label}
                </p>
                <p className="mt-1 text-[11px] text-plum/50">{item.subtext}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
