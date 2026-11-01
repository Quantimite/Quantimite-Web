"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Compass, Cpu, Layers, Sparkles, BookOpen } from "lucide-react";

const SECTIONS = [
  { id: "hero", label: "Core" },
  { id: "featured", label: "Featured" },
  { id: "articles", label: "Papers" },
  { id: "telemetry", label: "Telemetry" },
  { id: "newsletter", label: "Dispatch" },
];

export default function InsightsScrollHUD() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const pct = Math.round((scrollY / maxScroll) * 100);
      setScrollPercent(pct);

      // Determine active section
      for (const s of [...SECTIONS].reverse()) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveSection(s.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 transform">
      <div className="flex items-center gap-2 rounded-full border border-plum/15 bg-white/85 px-4 py-2 text-xs shadow-xl shadow-plum/5 backdrop-blur-xl transition-all hover:bg-white sm:gap-3 sm:px-5">
        {/* 3D Core Active Beacon */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet" />
          </span>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-plum/70 hidden sm:inline">
            3D RUNTIME
          </span>
        </div>

        <span className="text-plum/20">|</span>

        {/* Section Jump Tabs */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {SECTIONS.map((s) => {
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollTo(s.id)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-plum text-white shadow-xs"
                    : "text-plum/60 hover:text-plum hover:bg-plum/5"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        <span className="text-plum/20">|</span>

        {/* Scroll Progress Metric */}
        <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-plum">
          <span className="text-violet">{scrollPercent}%</span>
        </div>

        {/* Quick Top Button */}
        {scrollPercent > 15 && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="grid h-6 w-6 place-items-center rounded-full bg-plum/5 text-plum hover:bg-violet hover:text-white transition-colors cursor-pointer"
          >
            <ArrowUp className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
}
