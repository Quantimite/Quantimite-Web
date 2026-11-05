"use client";

import React from "react";
import {
  Compass,
  Code2,
  BookOpen,
  Laptop,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Award,
  Zap,
  Users2,
  Terminal,
} from "lucide-react";

export default function CultureBento() {
  return (
    <section id="why-work-with-us" className="py-20 sm:py-28 bg-[#fbfaff]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet/20 bg-violet/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-violet">
            <Sparkles className="h-3.5 w-3.5" />
            <span>WHY WORK WITH US</span>
          </div>
          <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-plum leading-[1.08]">
            Culture. Learning. Growth. <br />
            <span className="text-brand">Engineered for craft.</span>
          </h2>
          <p className="mt-4 text-base text-plum/70 font-light leading-relaxed">
            At Quantimite, we don't believe in corporate hazing or seat-warming. We build in autonomous, high-caliber engineering pods with deep mentorship, world-class tooling, and transparent progression.
          </p>
        </div>

        {/* Bento Grid: 12 Columns */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {/* Bento Cell 1: Culture & High Agency (8 cols) */}
          <div className="md:col-span-12 lg:col-span-8 rounded-3xl border border-plum/10 bg-white p-7 sm:p-10 shadow-xs flex flex-col justify-between hover:border-violet/30 transition-all">
            <div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet/10 text-violet">
                  <Compass className="h-6 w-6" />
                </div>
                <span className="font-mono text-xs font-bold text-plum/50 uppercase tracking-wider">
                  01 // CULTURE
                </span>
              </div>

              <h3 className="mt-6 text-2xl sm:text-3xl font-extrabold text-plum">
                High Agency & Autonomous Pods
              </h3>
              <p className="mt-3 text-sm sm:text-base text-plum/70 font-light leading-relaxed max-w-2xl">
                We organize into small, high-density pods of 3 to 5 engineers. You own your systems end-to-end, from database schemas to client-side edge deployment, with zero micromanagement and direct client impact.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-plum/10 flex flex-wrap gap-2 text-xs font-semibold text-plum/70">
              <span className="rounded-full bg-mist px-3.5 py-1.5 border border-plum/10">Zero Red Tape</span>
              <span className="rounded-full bg-mist px-3.5 py-1.5 border border-plum/10">Direct Architecture Ownership</span>
              <span className="rounded-full bg-mist px-3.5 py-1.5 border border-plum/10">Transparent Roadmaps</span>
              <span className="rounded-full bg-mist px-3.5 py-1.5 border border-plum/10">Async Flow Time</span>
            </div>
          </div>

          {/* Bento Cell 2: Learning & Development (4 cols) */}
          <div className="md:col-span-12 lg:col-span-4 rounded-3xl border border-plum/10 bg-white p-7 sm:p-10 shadow-xs flex flex-col justify-between hover:border-azure/30 transition-all">
            <div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-azure/10 text-azure">
                  <BookOpen className="h-6 w-6" />
                </div>
                <span className="font-mono text-xs font-bold text-plum/50 uppercase tracking-wider">
                  02 // LEARNING
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-extrabold text-plum">
                $2,000 Annual Learning Budget
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-plum/70 font-light leading-relaxed">
                Every team member receives an annual growth stipend for technical books, global conference tickets (Next.js Conf, React Summit), and LLM API compute credits with zero approval friction.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-plum/10 font-mono text-xs text-azure font-bold flex items-center justify-between">
              <span>Zero-Approval Fund</span>
              <span>100% Covered</span>
            </div>
          </div>

          {/* Bento Cell 3: Growth & Mentorship (5 cols) */}
          <div className="md:col-span-12 lg:col-span-5 rounded-3xl border border-plum/10 bg-white p-7 sm:p-10 shadow-xs flex flex-col justify-between hover:border-emerald-500/30 transition-all">
            <div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <span className="font-mono text-xs font-bold text-plum/50 uppercase tracking-wider">
                  03 // GROWTH
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-extrabold text-plum">
                1:1 Senior Mentorship & Rapid Career Progression
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-plum/70 font-light leading-relaxed">
                Whether you join as a Senior Engineer or Student Fellow, you are paired with a Principal mentor who reviews code, conducts systems design teardowns, and maps your technical trajectory.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-plum/10 flex items-center justify-between text-xs text-plum/60 font-mono">
              <span>Weekly PR Teardowns</span>
              <span className="font-bold text-emerald-700">Direct PPO Pipeline</span>
            </div>
          </div>

          {/* Bento Cell 4: Hardware & Remote Lifestyle (7 cols) */}
          <div className="md:col-span-12 lg:col-span-7 rounded-3xl border border-plum/10 bg-white p-7 sm:p-10 shadow-xs flex flex-col justify-between hover:border-violet/30 transition-all">
            <div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white shadow-xs">
                  <Laptop className="h-6 w-6" />
                </div>
                <span className="font-mono text-xs font-bold text-plum/50 uppercase tracking-wider">
                  04 // ENVIRONMENT
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-extrabold text-plum">
                Apple Silicon Hardware & Remote Flexibility
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-plum/70 font-light leading-relaxed max-w-xl">
                Collaborate from our Colombo studio or work asynchronously across EMEA & APAC. We supply max-spec MacBook Pros (M4 Max), 4K displays, and a $1,500 home workstation setup budget.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-plum/10 flex flex-wrap gap-2 text-xs font-semibold text-plum/70">
              <span className="rounded-full bg-mist px-3 py-1 border border-plum/10">MacBook Pro M4 Max</span>
              <span className="rounded-full bg-mist px-3 py-1 border border-plum/10">Flexible Async Schedule</span>
              <span className="rounded-full bg-mist px-3 py-1 border border-plum/10">Annual Team Retreats</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
