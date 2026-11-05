"use client";

import React, { useState } from "react";
import { Bell, CheckCircle2, Sparkles, AlertCircle, ArrowRight } from "lucide-react";

export default function RoleRadarSubscribe({ defaultDepartment = "All" }: { defaultDepartment?: string }) {
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState(defaultDepartment);
  const [jobType, setJobType] = useState("All");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/careers/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, department, jobType }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Subscription failed. Please try again.");
      }

      setStatus("success");
      setMessage("You're subscribed! We'll alert you 48 hours before any matching openings go live.");
    } catch (err: unknown) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <section id="role-alerts" className="py-16 sm:py-24 bg-white border-b border-plum/10 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-violet/10 blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div className="rounded-3xl border border-plum/10 bg-gradient-to-br from-mist via-white to-mist/60 p-8 sm:p-12 shadow-sm text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet/20 bg-violet/10 px-3.5 py-1 text-xs font-bold text-violet">
            <Bell className="h-3.5 w-3.5" />
            <span>ROLE OPENING RADAR</span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-plum">
            Be the first to know when seats unlock.
          </h2>

          <p className="mt-3 text-sm sm:text-base text-plum/70 font-light max-w-lg mx-auto leading-relaxed">
            Our talent subscribers receive priority notification <strong>48 hours before</strong> new full-time positions or student internship cohorts are made public. Zero spam, unsubscribe anytime.
          </p>

          {status === "success" ? (
            <div className="mt-8 rounded-2xl bg-emerald-50 border border-emerald-200 p-6 max-w-md mx-auto">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
              <h3 className="mt-2 text-base font-bold text-emerald-900">Subscription Active</h3>
              <p className="mt-1 text-xs text-emerald-700">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-8 max-w-xl mx-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <div>
                  <label className="block text-xs font-semibold text-plum/70 mb-1">
                    Interest Area
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full rounded-2xl border border-plum/15 bg-white px-3.5 py-2.5 text-xs text-plum focus:border-violet outline-hidden"
                  >
                    <option value="All">All Disciplines</option>
                    <option value="Engineering">Engineering (Web & Edge)</option>
                    <option value="AI & Intelligence">AI & Distributed Systems</option>
                    <option value="Design">Product Design & 3D</option>
                    <option value="Operations">Operations & Cloud DX</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-plum/70 mb-1">
                    Opportunity Type
                  </label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full rounded-2xl border border-plum/15 bg-white px-3.5 py-2.5 text-xs text-plum focus:border-violet outline-hidden"
                  >
                    <option value="All">Any Opportunity</option>
                    <option value="Full-time">Full-time Roles Only</option>
                    <option value="Internship">Student & Intern Fellowships Only</option>
                    <option value="Contract">Specialist Contracts</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="grow rounded-full border border-plum/15 bg-white px-5 py-3 text-sm text-plum placeholder:text-plum/40 focus:border-violet outline-hidden"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-fill flex items-center justify-center gap-2 rounded-full px-7 py-3 text-xs font-bold shrink-0 cursor-pointer disabled:opacity-50"
                >
                  {status === "loading" ? "Subscribing..." : "Notify Me"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {status === "error" && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-red-600 pt-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{message}</span>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
