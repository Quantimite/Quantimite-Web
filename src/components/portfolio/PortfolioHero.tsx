"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Code2, Sparkles, Layers, TrendingUp } from "lucide-react";
import Button from "@/components/ui/Button";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { label: "Production Platforms", value: "48+", icon: Layers },
  { label: "Global Transaction Vol.", value: "$180M+", icon: TrendingUp },
  { label: "P99 Response Latency", value: "<18ms", icon: Code2 },
  { label: "Client NPS Score", value: "98%", icon: Sparkles },
];

export default function PortfolioHero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [0.85, 0.25]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const scrollToGrid = () => {
    const el = document.getElementById("project-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24"
    >
      {/* Scroll Progress Line */}
      <motion.div
        className="scroll-progress-line"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Video Background Layer with Ambient Feathering */}
      <div className="video-hero-container absolute inset-0 -z-10">
        <div className="video-ambient-glow" />
        <motion.div
          style={{ scale: videoScale, opacity: videoOpacity }}
          className="h-full w-full"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="video-feather-mask h-full w-full object-cover object-center"
          >
            <source src="/assets/videos/services-hero.mp4" type="video/mp4" />
          </video>
        </motion.div>
        {/* Soft gradient veil ensuring perfect text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbfaff]/80 via-[#fbfaff]/60 to-[#fbfaff]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          style={{ y: textY }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-plum/10 bg-white/80 px-4 py-1.5 shadow-xs backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet" />
            </span>
            <span className="text-xs font-bold tracking-wide uppercase text-plum/80">
              Quantimite Case Studies & Engineering Portfolio
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="mt-6 text-4xl font-extrabold tracking-tight text-plum sm:text-6xl lg:text-7xl"
          >
            Proof in production.{" "}
            <span className="text-brand">Engineered for scale.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-plum/70 sm:text-lg"
          >
            Explore real-world software platforms, SaaS architectures, mobile ecosystems,
            and digital growth systems engineered by Quantimite. Built with precision,
            verified by metrics.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <Button href="/contact">Start your project</Button>
            <button
              onClick={scrollToGrid}
              className="btn-outline inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-plum transition"
            >
              Explore Case Studies
              <ArrowDown className="h-4 w-4 animate-bounce text-violet" />
            </button>
          </motion.div>
        </motion.div>

        {/* Floating Performance Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
        >
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="glass-card group rounded-2xl p-5 text-center sm:p-6"
              >
                <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-xl bg-violet/10 text-violet transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-2xl font-black tracking-tight text-plum sm:text-3xl">
                  {stat.value}
                </div>
                <p className="mt-1 text-xs font-semibold text-plum/60 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
