"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Compass,
  Code2,
  BookOpen,
  Laptop,
  CheckCircle2,
  Sparkles,
  Zap,
  Coffee,
  Workflow,
} from "lucide-react";

export default function StudioPhilosophy() {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-plum/10 relative">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet">
            <Sparkles className="h-3.5 w-3.5" />
            <span>CULTURE & OPERATING DNA</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-5xl font-black tracking-tight text-plum">
            Built for people who care about craft.
          </h2>
          <p className="mt-3 text-base text-plum/70 font-light leading-relaxed">
            We don’t measure engineering in seat hours or tickets closed. We measure it in product durability, system resilience, and personal velocity.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: High Agency (Span 2 cols on md) */}
          <div className="md:col-span-2 rounded-3xl border border-plum/10 bg-mist/40 p-8 sm:p-10 shadow-xs hover:border-violet/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet/10 text-violet">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-2xl font-extrabold text-plum">
                High Agency & Pod Autonomy
              </h3>
              <p className="mt-3 text-sm sm:text-base text-plum/75 leading-relaxed max-w-xl">
                You own your systems end-to-end. Our pods make architectural decisions directly with clients and founders. There are no layers of middle management approving pull requests.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2 text-xs font-semibold text-plum/70">
              <span className="rounded-full bg-white px-3.5 py-1.5 border border-plum/10">Zero Micromanagement</span>
              <span className="rounded-full bg-white px-3.5 py-1.5 border border-plum/10">Direct Client Impact</span>
              <span className="rounded-full bg-white px-3.5 py-1.5 border border-plum/10">Automated CI/CD Gates</span>
            </div>
          </div>

          {/* Card 2: Zero Hazing Hiring */}
          <div className="rounded-3xl border border-plum/10 bg-mist/40 p-8 sm:p-10 shadow-xs hover:border-azure/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-azure/10 text-azure">
                <Workflow className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-2xl font-extrabold text-plum">
                Zero Whiteboard Hazing
              </h3>
              <p className="mt-3 text-sm text-plum/75 leading-relaxed">
                When positions open, we never ask you to reverse a binary tree on a whiteboard. We review real code, discuss real production trade-offs, and pay for take-home exercises.
              </p>
            </div>
            <div className="mt-6 text-xs text-azure font-bold">
              Transparent 4-stage process
            </div>
          </div>

          {/* Card 3: $2,000 Growth Stipend */}
          <div className="rounded-3xl border border-plum/10 bg-mist/40 p-8 sm:p-10 shadow-xs hover:border-emerald-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-2xl font-extrabold text-plum">
                $2,000 Annual Learning Budget
              </h3>
              <p className="mt-3 text-sm text-plum/75 leading-relaxed">
                Every team member receives an annual growth fund for technical books, global conferences, certifications, and AI experimentation credits.
              </p>
            </div>
            <div className="mt-6 text-xs text-emerald-700 font-bold">
              No approval friction
            </div>
          </div>

          {/* Card 4: Top Hardware & Remote Setup (Span 2 cols on md) */}
          <div className="md:col-span-2 rounded-3xl border border-plum/10 bg-mist/40 p-8 sm:p-10 shadow-xs hover:border-violet/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white shadow-xs">
                <Laptop className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-2xl font-extrabold text-plum">
                Apple Silicon Hardware & Remote Flexibility
              </h3>
              <p className="mt-3 text-sm sm:text-base text-plum/75 leading-relaxed max-w-xl">
                Work from our modern Colombo studio, or work asynchronously across EMEA & APAC. We supply max-spec Apple MacBook Pros, 4K displays, and a $1,500 remote workstation setup stipend.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2 text-xs font-semibold text-plum/70">
              <span className="rounded-full bg-white px-3.5 py-1.5 border border-plum/10">MacBook Pro M4 Max</span>
              <span className="rounded-full bg-white px-3.5 py-1.5 border border-plum/10">Flexible Async Hours</span>
              <span className="rounded-full bg-white px-3.5 py-1.5 border border-plum/10">Annual Studio Retreats</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
