"use client";

import React from "react";
import { CheckCircle2, Clock, Send, MessageSquare, Code, Gift } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Send,
    title: "Application & Code",
    timeline: "24 – 48 Hours",
    description:
      "Submit your resume and sample repos. We review every application carefully and guarantee a human response within 48 hours.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Technical Conversation",
    timeline: "3 – 5 Days",
    description:
      "A 45-minute casual video chat with an engineering or design lead discussing real-world systems, past projects, and culture alignment.",
  },
  {
    number: "03",
    icon: Code,
    title: "Collaborative Pairing",
    timeline: "1 Week",
    description:
      "A 90-minute pairing exercise solving a realistic, practical architecture problem together. No trick algorithm riddles or inverted binary trees.",
  },
  {
    number: "04",
    icon: Gift,
    title: "Transparent Offer",
    timeline: "24 Hours",
    description:
      "Clear offer outlining compensation, equity, equipment setup, and a structured 30-day onboarding path.",
  },
];

export default function HowWeHire() {
  return (
    <section className="py-20 sm:py-28 bg-[#fbfaff]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-violet">
            <Clock className="h-3.5 w-3.5" />
            <span>TRANSPARENT PROCESS</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-5xl font-black tracking-tight text-plum">
            How we hire.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-plum/70 font-light leading-relaxed">
            We value your time. Our hiring process is fast, communicative, and focused on real-world engineering rather than abstract whiteboard puzzles.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative flex flex-col justify-between rounded-3xl border border-plum/10 bg-white/90 p-7 shadow-xs backdrop-blur-md transition-all hover:border-violet/30 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-violet">
                      STEP {step.number}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-plum/5 px-2.5 py-0.5 text-[11px] font-semibold text-plum/70">
                      <Clock className="h-3 w-3 text-violet" />
                      {step.timeline}
                    </span>
                  </div>

                  <div className="mt-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-white shadow-xs">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 text-xl font-extrabold text-plum">
                    {step.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-plum/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-plum/10 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Respectful feedback guaranteed</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
