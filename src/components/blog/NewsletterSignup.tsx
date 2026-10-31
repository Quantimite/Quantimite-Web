"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ShieldCheck,
  Send,
  Users,
  Terminal,
} from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid work email address.");
      return;
    }

    try {
      setStatus("loading");
      setMessage("");

      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're subscribed! Welcome to Quantimite Intelligence.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Unable to subscribe at the moment. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("An unexpected network error occurred. Please try again.");
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-plum/10 bg-plum p-8 sm:p-14 lg:p-16 text-white shadow-2xl"
      >
        {/* Dynamic Luminous Ambient Fields */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-violet/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-azure/25 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-azure" />
            <span>Stay Ahead of the Curve</span>
          </div>

          {/* Heading */}
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl sm:leading-tight">
            The technical intelligence dispatch{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-azure-300">
              you&apos;ll actually read
            </span>.
          </h2>

          <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
            Every fortnight, we break down production-grade architecture blueprints, Next.js performance
            optimizations, and real startup scaling lessons. Zero promotional spam.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <div className="relative flex-1 max-w-md">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Enter your work email address..."
                  required
                  disabled={status === "loading" || status === "success"}
                  className="w-full rounded-full border border-white/20 bg-white/10 py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-white/40 backdrop-blur-md transition-all focus:border-azure focus:bg-white/15 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="btn-fill inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-bold text-white transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subscribing...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4 text-white" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    <span>Subscribe Free</span>
                    <Send className="ml-2 h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* Status Messages */}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-4 py-1.5 text-xs font-semibold text-emerald-300"
              >
                <CheckCircle2 className="h-4 w-4" />
                {message}
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-rose-500/20 border border-rose-500/40 px-4 py-1.5 text-xs font-semibold text-rose-300"
              >
                <AlertCircle className="h-4 w-4" />
                {message}
              </motion.div>
            )}

            {/* Guarantees and Social Proof */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-white/60">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                No Spam &bull; 1-Click Unsubscribe
              </span>
              <span className="flex items-center gap-1.5">
                <Terminal className="h-4 w-4 text-azure" />
                Fortnightly Technical Blueprints
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-violet" />
                Read by Lead Architects &amp; Founders
              </span>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
