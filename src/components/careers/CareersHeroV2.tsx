"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowDown,
  Bell,
  Search,
  ShieldCheck,
  Clock,
  Briefcase,
  GraduationCap,
  Users,
  Compass,
} from "lucide-react";

export default function CareersHeroV2() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24">
      {/* Ambient background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-gradient-to-r from-violet/20 via-azure/15 to-violet/20 blur-[140px] opacity-75"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -right-48 w-[400px] h-[400px] rounded-full bg-azure/10 blur-[100px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Status Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-amber-500/25 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-900 shadow-xs backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-600" />
            </span>
            <span className="font-mono uppercase tracking-wider text-[11px] font-bold">
              CURRENT STATUS: ALL PODS AT FULL CAPACITY // 0 ACTIVE OPENINGS
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-plum leading-[1.08]"
          >
            We engineer with intent. <br />
            <span className="text-brand">Currently at full strength.</span>
          </motion.h1>

          {/* Subtitle / Transparency note */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-xl text-plum/75 font-light max-w-2xl mx-auto leading-relaxed"
          >
            At Quantimite, we operate in tight-knit, autonomous engineering pods rather than mass-hiring.
            We currently do <strong className="font-semibold text-plum">not have active openings for jobs or student internships</strong>.
            However, our radar never sleeps—we regularly review standout speculative portfolios and notify our talent vault before public listings go live.
          </motion.p>

          {/* Direct Actions */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => scrollToSection("talent-vault")}
              className="btn-fill flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold tracking-wide cursor-pointer shadow-lg shadow-violet/20"
            >
              <span>Submit to Talent Vault</span>
              <Sparkles className="h-4 w-4" />
            </button>

            <button
              onClick={() => scrollToSection("role-alerts")}
              className="btn-outline flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-plum cursor-pointer"
            >
              <Bell className="h-4 w-4 text-violet" />
              <span>Get Opening Alerts</span>
            </button>

            <Link
              href="/careers/track"
              className="inline-flex items-center gap-1.5 rounded-full px-5 py-3 text-xs font-semibold text-plum/70 hover:text-plum border border-plum/10 hover:border-plum/20 bg-white/60 transition-colors"
            >
              <Search className="h-3.5 w-3.5 text-azure" />
              <span>Track Past Application</span>
            </Link>
          </motion.div>

          {/* Live Studio Telemetry Strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-14 rounded-3xl border border-plum/10 bg-white/70 backdrop-blur-xl p-6 sm:p-8 shadow-sm"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-plum/10">
              <div className="pt-2 lg:pt-0">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-plum/60 uppercase tracking-wider">
                  <Briefcase className="h-3.5 w-3.5 text-violet" />
                  <span>Job Openings</span>
                </div>
                <p className="mt-2 text-3xl font-black text-plum">0 Roles</p>
                <p className="mt-1 text-xs text-amber-700 font-medium">Hiring Paused</p>
              </div>

              <div className="pt-4 lg:pt-0 lg:pl-6">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-plum/60 uppercase tracking-wider">
                  <GraduationCap className="h-3.5 w-3.5 text-azure" />
                  <span>Internships</span>
                </div>
                <p className="mt-2 text-3xl font-black text-plum">0 Seats</p>
                <p className="mt-1 text-xs text-amber-700 font-medium">Cohort in Progress</p>
              </div>

              <div className="pt-4 lg:pt-0 lg:pl-6">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-plum/60 uppercase tracking-wider">
                  <Users className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Team Retention</span>
                </div>
                <p className="mt-2 text-3xl font-black text-brand">96.4%</p>
                <p className="mt-1 text-xs text-plum/60 font-medium">Low Churn · Deep Craft</p>
              </div>

              <div className="pt-4 lg:pt-0 lg:pl-6">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-plum/60 uppercase tracking-wider">
                  <Clock className="h-3.5 w-3.5 text-violet" />
                  <span>Speculative Review</span>
                </div>
                <p className="mt-2 text-3xl font-black text-plum">&lt; 48h</p>
                <p className="mt-1 text-xs text-plum/60 font-medium">Reviewed by Engineers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
