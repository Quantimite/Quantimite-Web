"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Terminal,
  ShieldCheck,
  BellRing,
  CheckCircle2,
} from "lucide-react";

interface PodInfo {
  id: string;
  code: string;
  title: string;
  status: "Full Capacity" | "Cohort in Progress";
  openings: number;
  description: string;
  technologies: string[];
  idealProfile: string;
  icon: React.ElementType;
  accentColor: string;
}

const PODS: PodInfo[] = [
  {
    id: "core-web",
    code: "POD-01 // RUNTIME",
    title: "Core Web & Runtime Systems",
    status: "Full Capacity",
    openings: 0,
    description:
      "Architects edge-rendered Next.js platforms, distributed micro-frontends, ultra-fast streaming SSR, and resilient client-side state engines.",
    technologies: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Cloudflare Workers"],
    idealProfile:
      "Deep understanding of browser rendering pipelines, Web Vitals optimization, and strict type soundness.",
    icon: Code2,
    accentColor: "from-violet/10 to-violet/5 border-violet/20",
  },
  {
    id: "ai-systems",
    code: "POD-02 // INTELLIGENCE",
    title: "AI & Distributed Systems Architecture",
    status: "Full Capacity",
    openings: 0,
    description:
      "Powers real-time LLM agent orchestrations, Gemini Live multimodal streaming, vector retrieval systems, and asynchronous edge task runners.",
    technologies: ["Python", "Go", "Gemini API", "Vector DBs (pgvector)", "WebSockets"],
    idealProfile:
      "Pragmatic systems engineers who know how to optimize latency bottlenecks and guardrail production AI agents.",
    icon: Cpu,
    accentColor: "from-azure/10 to-azure/5 border-azure/20",
  },
  {
    id: "creative-3d",
    code: "POD-03 // SPATIAL",
    title: "Tactile Interfaces & Spatial 3D",
    status: "Full Capacity",
    openings: 0,
    description:
      "Blends WebGL, Three.js shaders, reactive physics, and tactile micro-interactions into immersive, accessible user experiences.",
    technologies: ["Three.js", "React Three Fiber", "GLSL Shaders", "Framer Motion", "Figma Tokens"],
    idealProfile:
      "Engineers with exceptional visual taste who treat 60fps web performance and micro-delight as non-negotiable.",
    icon: Sparkles,
    accentColor: "from-purple-500/10 to-purple-500/5 border-purple-500/20",
  },
  {
    id: "platform-dx",
    code: "POD-04 // PLATFORM",
    title: "Platform Infrastructure & Cloud DX",
    status: "Full Capacity",
    openings: 0,
    description:
      "Maintains zero-downtime CI/CD pipelines, container orchestration, distributed caching, database indexing, and developer tooling.",
    technologies: ["PostgreSQL", "Docker", "Terraform", "GitHub Actions", "Redis"],
    idealProfile:
      "Engineers who love reproducible environments, automated test gates, and sub-100ms P99 backend latency.",
    icon: Terminal,
    accentColor: "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20",
  },
];

interface Props {
  onSelectDepartment?: (dept: string) => void;
}

export default function StudioPodsSection({ onSelectDepartment }: Props) {
  const handleNotifyPod = (title: string) => {
    if (onSelectDepartment) {
      onSelectDepartment(title);
    }
    const el = document.getElementById("role-alerts");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-white/70 border-t border-b border-plum/10 relative">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet">
              <Layers className="h-3.5 w-3.5" />
              <span>STUDIO DISCIPLINES & POD STATUS</span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-5xl font-black tracking-tight text-plum">
              How we organize. What we look for.
            </h2>
            <p className="mt-3 text-base text-plum/70 font-light leading-relaxed">
              We do not hire into generic developer queues. Our team is partitioned into small, cross-functional pods where every contributor has direct ownership. Here is a look inside our active disciplines and their current staffing status.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-mist px-4 py-2.5 rounded-2xl border border-plum/10 text-xs font-medium text-plum/75">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span>All 4 Pods Operating at 100% Staffing</span>
          </div>
        </div>

        {/* Pod Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {PODS.map((pod, idx) => {
            const Icon = pod.icon;
            return (
              <motion.div
                key={pod.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative rounded-3xl border bg-white p-7 sm:p-9 shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${pod.accentColor}`}
              >
                <div>
                  {/* Top Bar: Code & Status */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs font-bold text-plum/60 tracking-wider">
                      {pod.code}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200/80 px-3 py-1 text-[11px] font-bold text-amber-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      {pod.status} ({pod.openings} Openings)
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="mt-5 flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-plum/5 text-plum">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-extrabold text-plum">{pod.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm text-plum/75 leading-relaxed">
                    {pod.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {pod.technologies.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg bg-plum/[0.04] px-2.5 py-1 text-xs font-semibold text-plum/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Ideal Candidate Profile */}
                  <div className="mt-5 rounded-2xl bg-mist/60 border border-plum/5 p-4 text-xs">
                    <span className="font-bold text-plum block mb-1">
                      Target Profile When Roles Open:
                    </span>
                    <span className="text-plum/70 leading-relaxed">
                      {pod.idealProfile}
                    </span>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-6 pt-5 border-t border-plum/10 flex items-center justify-between">
                  <span className="text-xs text-plum/50">Next planned pod review: Q3 2026</span>
                  <button
                    onClick={() => handleNotifyPod(pod.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-violet hover:text-azure transition-colors cursor-pointer"
                  >
                    <BellRing className="h-3.5 w-3.5" />
                    <span>Get alerts for this pod</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
