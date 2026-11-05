"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Cpu,
  Code2,
  Sparkles,
  GitPullRequest,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Send,
  Bell,
  Laptop,
  Layers,
  GraduationCap,
  ChevronDown,
  ExternalLink,
  Flame,
  Radio,
  Sliders,
} from "lucide-react";

// POD DEFINITIONS
interface PodData {
  id: string;
  code: string;
  title: string;
  status: string;
  capacity: string;
  headcount: string;
  tech: string[];
  workload: string;
  nextCycle: string;
}

const PODS: PodData[] = [
  {
    id: "web-runtime",
    code: "POD-01",
    title: "Core Web & Runtime Systems",
    status: "100% ALLOCATED",
    capacity: "4 / 4 Engineers",
    headcount: "Full Strength",
    tech: ["Next.js 15 App Router", "React 19", "TypeScript 5.8", "Cloudflare Workers", "Tailwind CSS"],
    workload: "High-throughput streaming SSR, edge caching, sub-50ms P99 TTFB, and resilient client state machines.",
    nextCycle: "Targeting Q1 2027 Expansion",
  },
  {
    id: "ai-systems",
    code: "POD-02",
    title: "AI & Distributed Systems Mesh",
    status: "100% ALLOCATED",
    capacity: "3 / 3 Engineers",
    headcount: "Full Strength",
    tech: ["Gemini 2.5 Pro/Flash", "Python 3.12", "Go", "pgvector / Qdrant", "WebSockets"],
    workload: "Real-time LLM agent runners, bidirectional audio/video streams, vector embeddings, and inference caching.",
    nextCycle: "Targeting Q4 2026 Evaluation",
  },
  {
    id: "spatial-3d",
    code: "POD-03",
    title: "Tactile Interfaces & Spatial 3D",
    status: "100% ALLOCATED",
    capacity: "3 / 3 Engineers",
    headcount: "Full Strength",
    tech: ["Three.js", "React Three Fiber", "GLSL Shaders", "Framer Motion", "Figma Tokens"],
    workload: "60fps shader art, fluid GPU physics, tactile micro-interactions, and high-fidelity design systems.",
    nextCycle: "Standby for 2027",
  },
  {
    id: "platform-dx",
    code: "POD-04",
    title: "Platform Infrastructure & Cloud DX",
    status: "100% ALLOCATED",
    capacity: "3 / 3 Engineers",
    headcount: "Full Strength",
    tech: ["PostgreSQL 17", "Redis", "Docker", "Terraform", "GitHub Actions"],
    workload: "Zero-downtime blue/green edge pipelines, database schema migrations, and automated end-to-end telemetry.",
    nextCycle: "Reviewing Q2 2027",
  },
];

export default function BentoCareers() {
  // Active pod tab in the topology tile
  const [activePodIndex, setActivePodIndex] = useState(0);
  const activePod = PODS[activePodIndex];

  // Talent Vault Form State
  const [track, setTrack] = useState<"web" | "ai" | "spatial" | "intern">("web");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [pitch, setPitch] = useState("");
  const [studentUni, setStudentUni] = useState("");
  const [studentGrad, setStudentGrad] = useState("2026");

  const [vaultSubmitting, setVaultSubmitting] = useState(false);
  const [vaultError, setVaultError] = useState("");
  const [vaultRefId, setVaultRefId] = useState<string | null>(null);
  const [vaultCopied, setVaultCopied] = useState(false);

  // Radar Subscription State
  const [radarEmail, setRadarEmail] = useState("");
  const [radarDept, setRadarDept] = useState("All");
  const [radarStatus, setRadarStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [radarMsg, setRadarMsg] = useState("");

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleVaultCopy = () => {
    if (vaultRefId) {
      navigator.clipboard.writeText(vaultRefId);
      setVaultCopied(true);
      setTimeout(() => setVaultCopied(false), 2000);
    }
  };

  const handleVaultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVaultError("");

    if (!fullName.trim() || !email.trim() || !phone.trim() || !location.trim()) {
      setVaultError("Please fill in Name, Email, Phone, and Location.");
      return;
    }

    setVaultSubmitting(true);

    try {
      const isIntern = track === "intern";
      const payload = {
        jobId: isIntern ? "internship-fellowship-radar" : `pod-vault-${track}`,
        jobSlug: isIntern ? "internship-fellowship-radar" : `pod-vault-${track}`,
        jobTitle: isIntern
          ? "Student & Intern Fellowship (Speculative Radar)"
          : `Speculative Profile: ${track.toUpperCase()}`,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        currentLocation: location.trim(),
        linkedInUrl: linkedIn.trim() || undefined,
        portfolioUrls: portfolio.trim() ? [portfolio.trim()] : [],
        coverLetterText: pitch.trim(),
        privacyConsent: true,
        talentPoolConsent: true,
        internshipDetails: isIntern
          ? {
              university: studentUni.trim() || "University",
              degree: "Software Engineering / CS",
              graduationYear: studentGrad,
            }
          : undefined,
      };

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setVaultRefId(data.referenceId || "QM-APP-TALENT");
    } catch (err: unknown) {
      setVaultError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setVaultSubmitting(false);
    }
  };

  const handleRadarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!radarEmail || !radarEmail.includes("@")) {
      setRadarStatus("error");
      setRadarMsg("Please enter a valid email address.");
      return;
    }

    setRadarStatus("loading");
    setRadarMsg("");

    try {
      const res = await fetch("/api/careers/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: radarEmail, department: radarDept, jobType: "All" }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Radar registration failed.");
      }

      setRadarStatus("success");
      setRadarMsg("Subscribed. You'll receive advance notice 48h before any opening goes live.");
    } catch (err: unknown) {
      setRadarStatus("error");
      setRadarMsg(err instanceof Error ? err.message : "Error subscribing.");
    }
  };

  return (
    <div className="relative py-12 sm:py-20">
      {/* Background Micro Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#2a13400a_1px,transparent_1px),linear-gradient(to_bottom,#2a13400a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_15%,#000_70%,transparent_100%)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* =========================================================
            HEADER & TELEMETRY STRIP (BRUTALIST / EDITORIAL STUDIO HUD)
        ========================================================= */}
        <div className="mb-10 sm:mb-14 border-b border-plum/10 pb-8 sm:pb-12">
          {/* Monospace System Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-plum/60 tracking-wider">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-amber-500 animate-ping" />
              <span className="font-bold text-plum">QUANTIMITE // ORG / WORKFORCE_TELEMETRY</span>
              <span className="hidden sm:inline text-plum/30">|</span>
              <span className="hidden sm:inline text-plum/50">BUILD 2026.11</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-bold text-amber-900">
                LOCKED: 0 VACANCIES
              </span>
              <Link
                href="/careers/track"
                className="hover:text-violet transition-colors flex items-center gap-1 font-sans text-xs font-semibold"
              >
                Track Past Submissions <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Large Title & Subtitle */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-plum leading-[1.04]">
                All pods filled. <br />
                <span className="text-brand">Zero open seats.</span>
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm sm:text-base text-plum/70 font-light leading-relaxed">
                We operate as high-density, low-turnover engineering pods.
                We do not have active openings for full-time jobs or student internships today.
                Explore our active pod topology, inspect our code-pairing fellowship, or index your profile in our internal Talent Vault below.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================
            BENTO GRID (ASYMMETRIC, TACTILE, BESPOKE CELLS)
        ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {/* -------------------------------------------------------
              BENTO CELL 1 (8 COLS): STUDIO POD TOPOLOGY & LIVE RACK
          ------------------------------------------------------- */}
          <div className="md:col-span-12 lg:col-span-8 rounded-3xl border border-plum/15 bg-[#140a26] text-white p-6 sm:p-9 shadow-xl relative overflow-hidden flex flex-col justify-between">
            {/* Ambient terminal glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-violet/20 blur-[80px]"
            />

            <div>
              {/* Terminal Title Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 font-mono text-xs text-white/60">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="font-bold text-white tracking-wider">ACTIVE_POD_TOPOLOGY</span>
                  <span className="text-white/30">::</span>
                  <span>4 CLUSTERS ONLINE</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                  <span>CAPACITY: 100% ALLOCATED</span>
                </div>
              </div>

              {/* Pod Selector Switcher */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PODS.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setActivePodIndex(idx)}
                    className={`rounded-xl p-2.5 text-left font-mono text-xs transition-all border cursor-pointer ${
                      activePodIndex === idx
                        ? "bg-white/15 border-violet text-white shadow-xs"
                        : "bg-white/5 border-white/5 text-white/50 hover:bg-white/10 hover:text-white/80"
                    }`}
                  >
                    <div className="text-[10px] text-white/40">{p.code}</div>
                    <div className="font-bold truncate mt-0.5">{p.title.split("&")[0]}</div>
                  </button>
                ))}
              </div>

              {/* Pod Active Detail Card */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 backdrop-blur-md">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-azure">{activePod.code}</span>
                    <h3 className="text-lg sm:text-xl font-black text-white">{activePod.title}</h3>
                  </div>
                  <span className="font-mono text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                    {activePod.capacity}
                  </span>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                  {activePod.workload}
                </p>

                {/* Tech Stack Matrix */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-2">
                    Runtime Stack & Tooling:
                  </div>
                  <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                    {activePod.tech.map((item) => (
                      <span
                        key={item}
                        className="rounded-md bg-white/10 px-2.5 py-1 text-white/90 border border-white/10 text-[11px]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status Ticker */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-white/50">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-violet" />
                <span>Next Pod Review: {activePod.nextCycle}</span>
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById("talent-vault-tile");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-violet hover:text-azure transition-colors font-bold cursor-pointer inline-flex items-center gap-1"
              >
                <span>Index profile for {activePod.code}</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* -------------------------------------------------------
              BENTO CELL 2 (4 COLS): THE DELIBERATE ANTI-CHURN RULE
          ------------------------------------------------------- */}
          <div className="md:col-span-12 lg:col-span-4 rounded-3xl border border-plum/10 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between relative overflow-hidden">
            {/* Inset highlight */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet to-azure" />

            <div>
              <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-violet">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>ANTI-OVERHIRING STANDARD</span>
              </div>

              <h3 className="mt-3 text-2xl font-black text-plum">
                Why we never run "phantom" job ads.
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-plum/70 font-light leading-relaxed">
                Many venture-backed agencies run continuous job openings just to collect candidate resumes or project artificial growth.
              </p>

              <div className="mt-6 space-y-3 font-mono text-xs">
                <div className="rounded-xl border border-plum/10 bg-mist p-3">
                  <div className="text-plum/50 text-[10px]">ORGANIZATIONAL RULE 01</div>
                  <div className="font-bold text-plum mt-0.5">Zero Hiring Without Funded Pods</div>
                  <div className="text-plum/60 text-[11px] font-sans mt-0.5">We only open seats when a multi-quarter client architecture is locked.</div>
                </div>

                <div className="rounded-xl border border-plum/10 bg-mist p-3">
                  <div className="text-plum/50 text-[10px]">ORGANIZATIONAL RULE 02</div>
                  <div className="font-bold text-plum mt-0.5">96.4% Retention & Anti-Churn</div>
                  <div className="text-plum/60 text-[11px] font-sans mt-0.5">Engineers stay because they own their code and don’t endure corporate hazing.</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-plum/10 flex items-center justify-between text-xs text-plum/60">
              <span>Status: Fully Staffed</span>
              <span className="font-bold text-plum">3-5 Engineers / Pod</span>
            </div>
          </div>

          {/* -------------------------------------------------------
              BENTO CELL 3 (7 COLS): INTERNSHIP FELLOWSHIP — THE CODE PR ARTIFACT
          ------------------------------------------------------- */}
          <div className="md:col-span-12 lg:col-span-7 rounded-3xl border border-plum/15 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 border-b border-plum/10 pb-4">
                <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold text-azure uppercase tracking-wider">
                  <GraduationCap className="h-4 w-4" />
                  <span>STUDENT FELLOWSHIP // PAUSED FOR COHORT 04</span>
                </div>
                <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-800">
                  COHORT ACTIVE · NO SEATS
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-black text-plum">
                No coffee runs. Real pull requests.
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-plum/70 font-light leading-relaxed">
                Why are our internships closed? Because we strictly limit each fellowship to <strong>3 to 4 students per cycle</strong>. Every student is paired 1-on-1 with a Senior or Principal Engineer who conducts real architectural code reviews on production systems.
              </p>

              {/* Simulated Code Review Artifact */}
              <div className="mt-5 rounded-2xl border border-plum/15 bg-[#120a1f] text-white p-4 font-mono text-xs overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3 text-[11px] text-white/50">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-400" />
                    <span className="h-2 w-2 rounded-full bg-yellow-400" />
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    <span className="ml-2 text-white/70 font-bold">PR #319: feat(edge): dynamic lru cache invalidation</span>
                  </div>
                  <span className="text-emerald-400">● MERGED</span>
                </div>

                <div className="space-y-2 text-[11px] leading-relaxed">
                  <div className="text-white/60">
                    <span className="text-violet">author:</span> @ranil-intern (Cohort 04)
                  </div>
                  <div className="text-white/60">
                    <span className="text-azure">reviewer:</span> @sahan (Principal Engineer)
                  </div>
                  <div className="rounded-lg bg-white/[0.06] p-2.5 text-white/80 border-l-2 border-emerald-400 mt-2 font-sans text-xs">
                    <span className="font-mono text-[10px] text-emerald-400 font-bold block mb-0.5">MENTOR FEEDBACK:</span>
                    "Great profiling on the buffer allocation. Moving this computation to Cloudflare KV reduced our P99 latency from 140ms to 28ms. Pushed to canary."
                  </div>
                </div>
              </div>
            </div>

            {/* Fellowship Pillars Grid */}
            <div className="mt-6 pt-4 border-t border-plum/10 grid grid-cols-3 gap-3 text-center font-mono">
              <div className="rounded-xl bg-mist p-2.5">
                <div className="text-sm font-black text-plum">1:1</div>
                <div className="text-[10px] text-plum/60 mt-0.5 font-sans">Senior Mentor</div>
              </div>
              <div className="rounded-xl bg-mist p-2.5">
                <div className="text-sm font-black text-plum">Paid</div>
                <div className="text-[10px] text-plum/60 mt-0.5 font-sans">Monthly Stipend</div>
              </div>
              <div className="rounded-xl bg-mist p-2.5">
                <div className="text-sm font-black text-plum">M4 Max</div>
                <div className="text-[10px] text-plum/60 mt-0.5 font-sans">Supplied Hardware</div>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------
              BENTO CELL 4 (5 COLS): HARDWARE & ZERO HAZING SPEC
          ------------------------------------------------------- */}
          <div className="md:col-span-12 lg:col-span-5 rounded-3xl border border-plum/10 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold text-violet uppercase tracking-wider">
                <Laptop className="h-4 w-4" />
                <span>DEVELOPER ENVIRONMENT SPEC</span>
              </div>

              <h3 className="mt-3 text-2xl font-black text-plum">
                The Quantimite Manifest.
              </h3>

              <div className="mt-5 space-y-3 font-mono text-xs">
                <div className="flex items-start gap-3 rounded-xl border border-plum/10 p-3 bg-white">
                  <div className="h-6 w-6 rounded-lg bg-violet/10 text-violet flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ⌘
                  </div>
                  <div>
                    <div className="font-bold text-plum">Top-Spec Hardware</div>
                    <div className="text-plum/60 text-[11px] font-sans mt-0.5">
                      MacBook Pro M4 Max, 4K Studio Displays, and a $1,500 remote desk budget.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-plum/10 p-3 bg-white">
                  <div className="h-6 w-6 rounded-lg bg-azure/10 text-azure flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    $
                  </div>
                  <div>
                    <div className="font-bold text-plum">$2,000 Annual Learning Budget</div>
                    <div className="text-plum/60 text-[11px] font-sans mt-0.5">
                      Books, conferences (Next.js Conf, React Summit), and LLM API credits.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-plum/10 p-3 bg-white">
                  <div className="h-6 w-6 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="font-bold text-plum">Zero Whiteboard Hazing</div>
                    <div className="text-plum/60 text-[11px] font-sans mt-0.5">
                      No reversing binary trees. We review real GitHub PRs and pay for take-home projects.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-plum/10 text-xs font-mono text-plum/50 flex items-center justify-between">
              <span>Async-First Protocol</span>
              <span>Colombo HQ + Remote EMEA/APAC</span>
            </div>
          </div>

          {/* -------------------------------------------------------
              BENTO CELL 5 (12 COLS): INTERACTIVE TALENT VAULT TERMINAL
          ------------------------------------------------------- */}
          <div
            id="talent-vault-tile"
            className="md:col-span-12 rounded-3xl border border-plum/20 bg-gradient-to-b from-white via-mist/30 to-white p-6 sm:p-10 shadow-md relative overflow-hidden"
          >
            {/* Top Bar */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-violet uppercase tracking-wider">
                <Terminal className="h-3.5 w-3.5" />
                <span>EXPRESS TALENT VAULT // SPECULATIVE INDEX</span>
              </div>
              <h3 className="mt-2 text-3xl sm:text-4xl font-black text-plum tracking-tight">
                Index your profile for future pod expansion.
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-plum/70 font-light leading-relaxed">
                When a pod adds capacity or our next student cohort opens, we scan our internal Talent Vault <strong>before posting publicly</strong>. Direct submission, direct lead review.
              </p>
            </div>

            {/* Form or Success State */}
            <div className="mt-8">
              {vaultRefId ? (
                /* Success State */
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/50 p-6 sm:p-8 text-center max-w-xl mx-auto">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h4 className="mt-4 text-xl font-black text-plum">
                    Profile Indexed in Quantimite Vault
                  </h4>
                  <p className="mt-1 text-xs text-plum/70">
                    Your profile has been saved. Our founding engineering partners review new submissions weekly.
                  </p>

                  <div className="mt-5 inline-flex items-center gap-3 rounded-xl border border-plum/10 bg-white px-4 py-2 font-mono text-xs text-plum shadow-2xs">
                    <span className="text-plum/50 font-sans">Tracking Reference:</span>
                    <span className="font-bold text-violet">{vaultRefId}</span>
                    <button
                      type="button"
                      onClick={handleVaultCopy}
                      className="p-1 hover:text-violet transition-colors cursor-pointer"
                      title="Copy reference code"
                    >
                      {vaultCopied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <Link
                      href={`/careers/track?ref=${vaultRefId}`}
                      className="btn-fill text-xs font-bold rounded-full px-5 py-2.5"
                    >
                      Track Application Status
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setVaultRefId(null);
                        setFullName("");
                        setEmail("");
                        setPhone("");
                      }}
                      className="btn-outline text-xs font-semibold rounded-full px-5 py-2.5 text-plum cursor-pointer"
                    >
                      Submit Another
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Form */
                <form onSubmit={handleVaultSubmit} className="space-y-5">
                  {/* Track Tabs */}
                  <div>
                    <label className="block font-mono text-[11px] font-bold text-plum/70 uppercase mb-2">
                      1. Select Target Discipline or Student Track
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                      {[
                        { id: "web", label: "Core Web & Edge" },
                        { id: "ai", label: "AI & Distributed Systems" },
                        { id: "spatial", label: "Tactile 3D & Interfaces" },
                        { id: "intern", label: "Student Fellowship" },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTrack(t.id as any)}
                          className={`rounded-xl p-3 text-left border transition-all cursor-pointer ${
                            track === t.id
                              ? "bg-violet/10 border-violet text-violet font-bold shadow-2xs ring-1 ring-violet"
                              : "bg-white border-plum/10 text-plum/70 hover:border-plum/20"
                          }`}
                        >
                          <div className="text-[10px] text-plum/40 uppercase">TRACK</div>
                          <div className="mt-0.5 truncate">{t.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Core Details Grid */}
                  <div>
                    <label className="block font-mono text-[11px] font-bold text-plum/70 uppercase mb-2">
                      2. Candidate Coordinates
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Full Name *"
                          className="w-full rounded-xl border border-plum/15 bg-white px-3.5 py-2.5 text-xs text-plum focus:border-violet outline-hidden"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email Address *"
                          className="w-full rounded-xl border border-plum/15 bg-white px-3.5 py-2.5 text-xs text-plum focus:border-violet outline-hidden"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Phone (e.g. +94 77...) *"
                          className="w-full rounded-xl border border-plum/15 bg-white px-3.5 py-2.5 text-xs text-plum focus:border-violet outline-hidden"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          required
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Location (Colombo / Remote) *"
                          className="w-full rounded-xl border border-plum/15 bg-white px-3.5 py-2.5 text-xs text-plum focus:border-violet outline-hidden"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Links & Student Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="url"
                      value={portfolio}
                      onChange={(e) => setPortfolio(e.target.value)}
                      placeholder="GitHub or Portfolio URL (e.g. https://github.com/username)"
                      className="w-full rounded-xl border border-plum/15 bg-white px-3.5 py-2.5 text-xs text-plum focus:border-violet outline-hidden"
                    />
                    <input
                      type="url"
                      value={linkedIn}
                      onChange={(e) => setLinkedIn(e.target.value)}
                      placeholder="LinkedIn Profile URL (Optional)"
                      className="w-full rounded-xl border border-plum/15 bg-white px-3.5 py-2.5 text-xs text-plum focus:border-violet outline-hidden"
                    />
                  </div>

                  {track === "intern" && (
                    <div className="rounded-xl border border-azure/20 bg-azure/5 p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                      <div>
                        <input
                          type="text"
                          value={studentUni}
                          onChange={(e) => setStudentUni(e.target.value)}
                          placeholder="University / Institute (e.g. UoM / SLIIT / IIT)"
                          className="w-full rounded-lg border border-plum/15 bg-white px-3 py-2 text-xs text-plum outline-hidden"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-plum/60 shrink-0">Graduation Year:</span>
                        <select
                          value={studentGrad}
                          onChange={(e) => setStudentGrad(e.target.value)}
                          className="w-full rounded-lg border border-plum/15 bg-white px-3 py-2 text-xs text-plum outline-hidden"
                        >
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                          <option value="2028">2028</option>
                          <option value="Graduated">Already Graduated</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Pitch / Technical Work */}
                  <div>
                    <textarea
                      rows={2}
                      value={pitch}
                      onChange={(e) => setPitch(e.target.value)}
                      placeholder="What is an interesting technical problem or production system you’ve built or debugged?"
                      className="w-full rounded-xl border border-plum/15 bg-white px-3.5 py-2.5 text-xs text-plum focus:border-violet outline-hidden resize-none"
                    />
                  </div>

                  {vaultError && (
                    <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                      <span>{vaultError}</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-plum/50">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      <span>Encrypted direct dispatch to founding partners.</span>
                    </div>

                    <button
                      type="submit"
                      disabled={vaultSubmitting}
                      className="btn-fill rounded-full px-7 py-3 text-xs font-bold cursor-pointer disabled:opacity-50 flex items-center gap-2"
                    >
                      {vaultSubmitting ? (
                        <span>Encrypting & Indexing...</span>
                      ) : (
                        <>
                          <span>Submit to Talent Vault</span>
                          <Send className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* -------------------------------------------------------
              BENTO CELL 6 (5 COLS): RADAR EARLY NOTIFICATION SIGNAL
          ------------------------------------------------------- */}
          <div className="md:col-span-12 lg:col-span-5 rounded-3xl border border-plum/10 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold text-violet uppercase tracking-wider">
                <Radio className="h-4 w-4 text-violet animate-pulse" />
                <span>OPENING RADAR // 48H ADVANCE SIGNAL</span>
              </div>

              <h3 className="mt-3 text-2xl font-black text-plum">
                Get alerted before roles go public.
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-plum/70 font-light leading-relaxed">
                When a new engineering pod seat opens or our fellowship window unlocks, we transmit an alert to this frequency <strong>48 hours before</strong> LinkedIn or Twitter postings.
              </p>

              {radarStatus === "success" ? (
                <div className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 font-mono text-xs text-emerald-800">
                  <div className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Signal Locked
                  </div>
                  <div className="mt-1 text-[11px] text-emerald-700 font-sans">{radarMsg}</div>
                </div>
              ) : (
                <form onSubmit={handleRadarSubmit} className="mt-6 space-y-3 font-mono text-xs">
                  <div className="flex gap-2">
                    <select
                      value={radarDept}
                      onChange={(e) => setRadarDept(e.target.value)}
                      className="rounded-xl border border-plum/15 bg-white px-3 py-2 text-xs text-plum outline-hidden font-sans"
                    >
                      <option value="All">All Pods</option>
                      <option value="Engineering">Web & Edge</option>
                      <option value="AI Systems">AI Distributed</option>
                      <option value="Internship">Student Fellowship</option>
                    </select>

                    <input
                      type="email"
                      required
                      value={radarEmail}
                      onChange={(e) => setRadarEmail(e.target.value)}
                      placeholder="engineer@domain.com"
                      className="grow rounded-xl border border-plum/15 bg-white px-3 py-2 text-xs text-plum focus:border-violet outline-hidden font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={radarStatus === "loading"}
                    className="w-full btn-outline rounded-xl py-2.5 text-xs font-bold text-plum hover:text-violet transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{radarStatus === "loading" ? "Locking Signal..." : "Subscribe to Radar"}</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>

                  {radarStatus === "error" && (
                    <div className="text-[11px] text-red-600 font-sans">{radarMsg}</div>
                  )}
                </form>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-plum/10 text-[11px] font-mono text-plum/50 flex items-center justify-between">
              <span>Zero Marketing Spam</span>
              <span>1-Click Unsubscribe</span>
            </div>
          </div>

          {/* -------------------------------------------------------
              BENTO CELL 7 (7 COLS): DIRECT TRANSPARENT FAQ BENTO
          ------------------------------------------------------- */}
          <div className="md:col-span-12 lg:col-span-7 rounded-3xl border border-plum/10 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold text-plum/60 uppercase tracking-wider">
                <Sliders className="h-4 w-4 text-violet" />
                <span>CLARITY & POLICY FAQ</span>
              </div>

              <h3 className="mt-2 text-2xl font-black text-plum">
                Direct answers. No HR fluff.
              </h3>

              <div className="mt-5 space-y-2.5">
                {[
                  {
                    q: "Are there really 0 jobs or internships available?",
                    a: "Yes. All our production pods are at 100% headcount and our current student fellowship is underway. We will never post fake openings to manipulate metrics.",
                  },
                  {
                    q: "When will the next student fellowship cycle unlock?",
                    a: "Our current cohort finishes late 2026. The next fellowship intake is planned for early 2027. Students indexed in our Talent Vault get first review.",
                  },
                  {
                    q: "Do you pay student interns?",
                    a: "Always. We provide a competitive monthly stipend, top-spec Apple hardware, and full production commit privileges.",
                  },
                  {
                    q: "How can I check an existing application?",
                    a: "Use our Application Status Tracker with your reference ID (e.g. QM-APP-xxxxx) to see the review state in real-time.",
                    link: "/careers/track",
                  },
                ].map((item, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-plum/10 bg-mist/40 overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-3.5 text-left text-xs font-bold text-plum hover:text-violet transition-colors cursor-pointer"
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 transition-transform ${
                            isOpen ? "rotate-180 text-violet" : "text-plum/40"
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-3.5 pb-3.5 text-xs text-plum/70 font-light border-t border-plum/5 pt-2 leading-relaxed">
                          <p>{item.a}</p>
                          {item.link && (
                            <Link
                              href={item.link}
                              className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-violet hover:underline mt-2"
                            >
                              Open Tracker <ArrowRight className="h-3 w-3" />
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-plum/10 text-xs text-plum/50 font-mono">
              Direct Engineering Oversight · Zero Third-Party Recruiters
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
