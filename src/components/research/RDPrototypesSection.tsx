"use client";

import { motion } from "framer-motion";
import { GitFork, ExternalLink, Star, Terminal, Layers, ArrowUpRight } from "lucide-react";
import { RDPrototype } from "@/types/research";
import { GithubIcon } from "@/components/common/BrandIcons";
import { ScrollTextHeading, ScrollTextFade } from "@/components/ui/ScrollText";

interface Props {
  prototypes: RDPrototype[];
}

const STATUS_CONFIG: Record<
  RDPrototype["status"],
  { badge: string; dot: string }
> = {
  "Production Ready": {
    badge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    dot: "bg-emerald-500",
  },
  "Active Alpha": {
    badge: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    dot: "bg-amber-500",
  },
  "Beta Testing": {
    badge: "bg-azure/10 text-azure border-azure/20",
    dot: "bg-azure",
  },
  "Open Source": {
    badge: "bg-violet/10 text-violet border-violet/20",
    dot: "bg-violet",
  },
  "In Development": {
    badge: "bg-plum/10 text-plum/70 border-plum/20",
    dot: "bg-plum/50",
  },
};

export default function RDPrototypesSection({ prototypes }: Props) {
  return (
    <section id="prototypes" className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
      {/* Header with scroll in-and-out text */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <ScrollTextFade
            as="div"
            delay={0.05}
            className="inline-flex items-center gap-2 rounded-full border border-violet/20 bg-violet/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet"
          >
            <Terminal className="h-3.5 w-3.5" />
            Experimental Systems & Codebases
          </ScrollTextFade>

          <ScrollTextHeading
            as="h2"
            delay={0.1}
            className="mt-3 text-3xl font-extrabold tracking-tight text-plum sm:text-5xl"
          >
            R&D Prototypes & Tools
          </ScrollTextHeading>

          <ScrollTextFade
            as="p"
            delay={0.2}
            className="mt-3 max-w-2xl text-sm text-plum/70 sm:text-base"
          >
            We release foundational toolkits, benchmark kernels, and reference cryptographic
            implementations for the global developer and research community.
          </ScrollTextFade>
        </div>

        <a
          href="https://github.com/quantimite"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-plum transition hover:border-violet/40"
        >
          <GithubIcon className="h-4 w-4" />
          <span>View GitHub Organization</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-plum/40" />
        </a>
      </div>

      {/* Prototype Cards Grid with bidirectional scroll in and out */}
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {prototypes.map((prototype, idx) => {
          const status = STATUS_CONFIG[prototype.status] || STATUS_CONFIG["In Development"];

          return (
            <motion.div
              key={prototype.id}
              initial={{ opacity: 0, y: 35, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.55, delay: (idx % 3) * 0.1 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-plum/10 bg-white/80 p-7 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-violet/30 hover:shadow-xl hover:shadow-violet/5"
            >
              {/* Subtle top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet via-azure to-magenta opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${status.badge}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                    {prototype.status}
                  </span>

                  {prototype.stars && (
                    <div className="inline-flex items-center gap-1 text-xs font-semibold text-plum/60">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span>{prototype.stars}</span>
                    </div>
                  )}
                </div>

                {/* Title & Tagline */}
                <h3 className="mt-4 font-mono text-xl font-bold tracking-tight text-plum group-hover:text-violet transition-colors">
                  {prototype.title}
                </h3>
                <p className="mt-1.5 text-xs font-medium text-azure">
                  {prototype.tagline}
                </p>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-plum/70">
                  {prototype.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {prototype.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-plum/10 bg-plum/[0.03] px-2.5 py-1 font-mono text-[11px] font-semibold text-plum/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Key Features Bullet List */}
                <div className="mt-5 space-y-2 border-t border-plum/10 pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-plum/40">
                    Key Innovations
                  </span>
                  {prototype.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-plum/70">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-violet" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center gap-3 border-t border-plum/10 pt-4">
                <a
                  href={prototype.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-plum px-3.5 py-2.5 text-xs font-bold text-white transition hover:bg-plum/90"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>GitHub Repository</span>
                </a>

                {prototype.liveDemoUrl && (
                  <a
                    href={prototype.liveDemoUrl}
                    className="inline-flex items-center justify-center rounded-xl border border-plum/15 px-3 py-2.5 text-xs font-semibold text-plum/80 transition hover:border-violet/40 hover:text-plum hover:bg-violet/5"
                    title="Request Prototype Sandbox Access"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
