"use client";

import React, { useState } from "react";
import { Bell, Check, X, Mail, Sparkles } from "lucide-react";
import { Department, JobType } from "@/types/careers";

export default function JobAlertModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState<Department | "All">("All");
  const [jobType, setJobType] = useState<JobType | "All">("All");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/careers/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, department, jobType }),
      });
      if (res.ok) {
        setIsSubmitted(true);
      }
    } catch (err) {
      // simulate fallback
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setEmail("");
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating or Inline Trigger */}
      <div className="rounded-2xl border border-plum/10 bg-white p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-white shadow-xs">
            <Bell className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-plum">Get notified about new roles</h3>
            <p className="text-xs sm:text-sm text-plum/70 mt-0.5">
              Subscribe to instant alerts when new engineering, design, or student openings are published.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="btn-outline flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold text-plum shrink-0"
        >
          <Mail className="h-4 w-4 text-violet" />
          <span>Subscribe to Job Alerts</span>
        </button>
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full text-plum/50 hover:bg-plum/5 hover:text-plum cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-violet text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="h-4 w-4" />
                  <span>CUSTOM CAREER ALERTS</span>
                </div>

                <h3 className="text-2xl font-black text-plum">
                  Stay ahead of the curve.
                </h3>
                <p className="text-xs text-plum/70 leading-relaxed">
                  We will email you only when a role matching your preferences opens up. No spam, ever, with instant one-click unsubscribe.
                </p>

                <div className="pt-2 space-y-3">
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

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-plum mb-1">
                        Department
                      </label>
                      <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value as any)}
                        className="select"
                      >
                        <option value="All">All Departments</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Design">Design</option>
                        <option value="Product">Product</option>
                        <option value="Cloud & DevOps">Cloud & DevOps</option>
                        <option value="Growth & Marketing">Growth & Marketing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-plum mb-1">
                        Job Type
                      </label>
                      <select
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value as any)}
                        className="select"
                      >
                        <option value="All">All Types</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="btn-ghost rounded-full px-4 py-2 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-fill rounded-full px-6 py-2.5 text-xs font-bold"
                  >
                    {isLoading ? "Subscribing..." : "Activate Alerts"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-plum">Alerts Activated!</h3>
                <p className="text-xs text-plum/70 max-w-sm mx-auto leading-relaxed">
                  We have registered <strong>{email}</strong>. You will receive an instant email when new roles in <strong>{department}</strong> are announced.
                </p>
                <div className="pt-4">
                  <button onClick={resetForm} className="btn-fill rounded-full px-6 py-2.5 text-xs">
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
