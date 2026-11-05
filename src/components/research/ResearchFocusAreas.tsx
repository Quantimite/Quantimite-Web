"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, ShieldCheck, Globe, BarChart3, CheckCircle2, ArrowRight } from "lucide-react";
import { ResearchFocusArea } from "@/types/research";
import { ScrollTextHeading, ScrollTextFade } from "@/components/ui/ScrollText";

interface Props {
  focusAreas: ResearchFocusArea[];
}

const ICON_MAP = {
  Cpu: Cpu,
  ShieldCheck: ShieldCheck,
  Globe: Globe,
  BarChart3: BarChart3,
};

export default function ResearchFocusAreas({ focusAreas }: Props) {
  const [activeAreaId, setActiveAreaId] = useState(focusAreas[0]?.id || "");

  const activeArea =
    focusAreas.find((a) => a.id === activeAreaId) || focusAreas[0];

  return (
    <section id="focus-areas" className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <div className="text-center">
        <ScrollTextFade
          as="span"
          delay={0.05}
          className="text-xs font-bold uppercase tracking-wider text-violet block"
        >
          Scientific Domain Investigation
        </ScrollTextFade>

        <ScrollTextHeading
          as="h2"
          delay={0.1}
          className="mt-2 text-3xl font-extrabold tracking-tight text-plum sm:text-5xl"
        >
          Core Research Focus Areas
        </ScrollTextHeading>

        <ScrollTextFade
          as="p"
          delay={0.2}
          className="mx-auto mt-3 max-w-2xl text-sm text-plum/70 sm:text-base"
        >
          Our specialized laboratory clusters operate at the intersection of theoretical
          computer science, distributed network security, and intelligent machine interfaces.
        </ScrollTextFade>
      </div>

      {/* Interactive Tabs */}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {focusAreas.map((area) => {
          const Icon =
            ICON_MAP[area.iconName as keyof typeof ICON_MAP] || Cpu;
          const isActive = area.id === activeArea.id;

          return (
            <button
              key={area.id}
              onClick={() => setActiveAreaId(area.id)}
              className={`flex items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-bold transition ${
                isActive
                  ? "bg-plum text-white shadow-lg shadow-plum/20"
                  : "border border-plum/10 bg-white/80 text-plum/70 hover:border-violet/40 hover:text-plum"
              }`}
            >
              <Icon
                className={`h-4 w-4 ${
                  isActive ? "text-violet" : "text-plum/50"
                }`}
              />
              <span>{area.topic}</span>
            </button>
          );
        })}
      </div>

      {/* Active Domain Spotlight Display */}
      {activeArea && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeArea.id}
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
            transition={{ duration: 0.5 }}
            className="mt-10 overflow-hidden rounded-3xl border border-plum/15 bg-white/80 p-8 shadow-xl backdrop-blur-md sm:p-12 lg:p-14"
          >
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
              {/* Left Column: Vision & Pillars */}
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-violet/20 bg-violet/5 px-3 py-1 text-xs font-bold text-violet">
                  Focus Domain {activeArea.topic}
                </span>

                <h3 className="mt-4 text-2xl font-black tracking-tight text-plum sm:text-4xl">
                  {activeArea.title}
                </h3>

                <p className="mt-2 text-sm font-semibold text-azure sm:text-base">
                  {activeArea.tagline}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-plum/70 sm:text-base">
                  {activeArea.summary}
                </p>

                {/* Key Research Pillars */}
                <div className="mt-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-plum/50">
                    Investigative Pillars & Milestones
                  </h4>
                  <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {activeArea.keyPillars.map((pillar, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 rounded-xl border border-plum/10 bg-plum/[0.02] p-3 text-xs text-plum/80"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet" />
                        <span>{pillar}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Lab Benchmarks & Performance Targets */}
              <div className="flex flex-col justify-between gap-6 rounded-2xl border border-plum/10 bg-plum/[0.02] p-6 lg:col-span-5 sm:p-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-plum/50">
                    Experimental Targets & Benchmarks
                  </h4>

                  <div className="mt-4 divide-y divide-plum/10">
                    {activeArea.metrics.map((metric, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                      >
                        <span className="text-xs font-semibold text-plum/70">
                          {metric.label}
                        </span>
                        <span className="font-mono text-base font-black text-brand">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-plum/10 pt-6">
                  <a
                    href="#publications"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-plum px-4 py-3 text-xs font-bold text-white transition hover:bg-plum/90"
                  >
                    <span>View Related Publications</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
}
