"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  Clock,
  ArrowLeft,
  AlertCircle,
  ShieldCheck,
  Send,
  Calendar,
  Gift,
} from "lucide-react";
import { ApplicationStatus } from "@/types/careers";

interface TrackedApp {
  id: string;
  jobTitle: string;
  fullName: string;
  status: ApplicationStatus;
  submittedAt: string;
  timeline: { status: ApplicationStatus; timestamp: string }[];
}

export default function TrackApplicationPage() {
  const [refId, setRefId] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [application, setApplication] = useState<TrackedApp | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refId.trim() || !email.trim()) return;

    setIsLoading(true);
    setError("");
    setApplication(null);

    try {
      const res = await fetch(
        `/api/careers/track?ref=${encodeURIComponent(
          refId.trim()
        )}&email=${encodeURIComponent(email.trim())}`
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to find application.");
      }

      setApplication(data.application);
    } catch (err: any) {
      setError(err.message || "No application found matching credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const STAGES: { key: ApplicationStatus; label: string; desc: string }[] = [
    { key: "New", label: "Application Received", desc: "Submitted to Quantimite talent queue" },
    { key: "Reviewed", label: "Technical Review", desc: "Engineering pod reviewing code & portfolio" },
    { key: "Interview", label: "Interview Round", desc: "Technical discussion & system pairing" },
    { key: "Hired", label: "Offer / Completed", desc: "Formal decision communicated" },
  ];

  const getStageIndex = (status: ApplicationStatus) => {
    if (status === "Rejected") return 3;
    const idx = STAGES.findIndex((s) => s.key === status);
    return idx === -1 ? 0 : idx;
  };

  return (
    <div className="min-h-screen bg-[#fbfaff] text-ink py-12 sm:py-20 px-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-xs font-semibold text-plum/60 hover:text-plum transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Careers</span>
          </Link>
        </div>

        {/* Tracker Box */}
        <div className="rounded-3xl border border-plum/10 bg-white p-8 sm:p-12 shadow-sm">
          <div className="text-center max-w-md mx-auto">
            <span className="badge badge-primary font-bold">
              LIVE CANDIDATE PORTAL
            </span>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black text-plum">
              Track Your Application.
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-plum/70 font-light">
              Enter your Reference ID (e.g. <code>QM-APP-91823</code>) and the email address you used to apply.
            </p>
          </div>

          <form onSubmit={handleTrack} className="mt-8 space-y-4 max-w-md mx-auto">
            <div>
              <label className="block text-xs font-bold text-plum mb-1">
                Application Reference ID *
              </label>
              <input
                type="text"
                required
                value={refId}
                onChange={(e) => setRefId(e.target.value)}
                placeholder="QM-APP-XXXXX"
                className="input font-mono uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-plum mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="input"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-danger/20 bg-danger/10 p-3 text-xs font-semibold text-danger flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-fill w-full rounded-full py-3 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              {isLoading ? "Searching Records..." : "Check Status"}
            </button>
          </form>

          {/* Result Status Display */}
          {application && (
            <div className="mt-12 pt-8 border-t border-plum/10 space-y-8 animate-in fade-in duration-300">
              <div className="rounded-2xl bg-mist p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="block font-mono text-[10px] text-plum/50 uppercase">
                    APPLICATION FOR
                  </span>
                  <h3 className="text-base font-extrabold text-plum">
                    {application.jobTitle}
                  </h3>
                  <p className="text-xs text-plum/60 mt-0.5">
                    Submitted by {application.fullName} on {new Date(application.submittedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="shrink-0">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold ${
                      application.status === "Interview"
                        ? "bg-azure/10 text-azure border border-azure/20"
                        : application.status === "Hired"
                        ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20"
                        : application.status === "Rejected"
                        ? "bg-plum/10 text-plum/70"
                        : "bg-violet/10 text-violet border border-violet/20"
                    }`}
                  >
                    <Clock className="h-3 w-3" />
                    <span>Stage: {application.status}</span>
                  </span>
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-plum/60">
                  Application Progress
                </h4>

                <div className="space-y-4">
                  {STAGES.map((stage, idx) => {
                    const currentIdx = getStageIndex(application.status);
                    const isPassed = currentIdx >= idx;
                    const isCurrent = currentIdx === idx;

                    return (
                      <div key={stage.key} className="flex items-start gap-4">
                        <div
                          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${
                            isPassed
                              ? "bg-emerald-500 text-white shadow-xs"
                              : "bg-plum/10 text-plum/40"
                          }`}
                        >
                          {isPassed ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                        </div>

                        <div className="flex-1 pt-0.5">
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-bold ${isCurrent ? "text-plum" : "text-plum/80"}`}>
                              {stage.label}
                            </span>
                            {isCurrent && (
                              <span className="font-mono text-[10px] font-bold text-violet uppercase">
                                Current Active Stage
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-plum/60 mt-0.5">{stage.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Help & Contact Notice */}
              <div className="rounded-xl border border-plum/10 bg-white p-4 text-xs text-plum/70 flex items-center justify-between">
                <span>Have a question or update for the team?</span>
                <a
                  href="mailto:cdananjana04@gmail.com"
                  className="font-bold text-violet hover:underline"
                >
                  Contact Recruiting Pod
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
