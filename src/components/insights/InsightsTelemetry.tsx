"use client";

import { useState } from "react";
import { Cpu, Database, ShieldCheck, Zap, Terminal, Copy, Check, Sparkles } from "lucide-react";

const BENCHMARKS = [
  {
    icon: Database,
    title: "100M+ Event Stream Replay",
    stat: "Zero-Downtime",
    detail: "Dual-write CDC pipelines with real-time hash watermarks.",
  },
  {
    icon: ShieldCheck,
    title: "Fault-Isolated Partitions",
    stat: "99.999% SLA",
    detail: "Strict physical circuit breakers with automated backpressure shedding.",
  },
  {
    icon: Zap,
    title: "Deterministic State Engines",
    stat: "<12ms Cold",
    detail: "Pure append-only ledgers reproducible from initial genesis.",
  },
  {
    icon: Cpu,
    title: "Mechanical Compute Sympathy",
    stat: "Sub-15ms P99",
    detail: "Hardware cache line alignment and non-blocking asynchronous kernel I/O.",
  },
];

const CODE_SAMPLE = `// Quantimite Core Deterministic State Engine
export class DeterministicLedger<TState, TEvent> {
  private state: TState;
  private sequence: bigint = 0n;

  public commit(event: StateEvent<TEvent>): TState {
    if (event.sequence !== this.sequence + 1n) {
      throw new SequenceAnomalyException(this.sequence, event.sequence);
    }
    this.state = Object.freeze(event.apply(this.state));
    this.sequence++;
    return this.state;
  }
}`;

export default function InsightsTelemetry() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_SAMPLE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="telemetry" className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24">
      <div className="relative overflow-hidden rounded-3xl border border-plum/10 bg-white/80 p-8 sm:p-12 shadow-xl shadow-plum/5 backdrop-blur-xl">
        {/* Glow ambient background */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet/10 blur-3xl"
        />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-plum/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-plum/10 bg-white/70 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-violet shadow-2xs">
              <Sparkles className="h-3 w-3" />
              <span>Production Architecture Telemetry</span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-plum sm:text-4xl">
              Engineering Axioms Built For Scale
            </h2>
            <p className="mt-2 max-w-xl text-base text-plum/70">
              The foundational performance metrics and algorithmic invariants powering modern
              Quantimite systems in production.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-plum/60">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>REAL-TIME AUDIT TELEMETRY // 2026</span>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENCHMARKS.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="group rounded-2xl border border-plum/10 bg-white/90 p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-violet/30 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet/10 text-violet">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs font-extrabold text-azure">
                    {b.stat}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold text-plum group-hover:text-violet transition-colors">
                  {b.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-plum/60">{b.detail}</p>
              </div>
            );
          })}
        </div>

        {/* Interactive Code Blueprint Box */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-plum/15 bg-ink p-6 text-white shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-white/70">
              <Terminal className="h-4 w-4 text-violet" />
              <span>DeterministicStateEngine.ts</span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80 hover:bg-white/20 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="mt-4 overflow-x-auto font-mono text-xs leading-relaxed text-mist/90">
            <code>{CODE_SAMPLE}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
