"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, CheckCircle2, Newspaper, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { ScrollTextHeading, ScrollTextFade } from "@/components/ui/ScrollText";

export default function ResearchNewsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubscribed(true);
    }, 600);
  };

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16">
      <div className="relative overflow-hidden rounded-3xl border border-plum/15 bg-gradient-to-br from-plum via-[#231535] to-plum p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
        {/* Ambient background glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-azure/20 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <ScrollTextFade
            as="div"
            delay={0.05}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white/90 backdrop-blur-md"
          >
            <Newspaper className="h-3.5 w-3.5 text-violet" />
            Quantimite Frontier Gazette
          </ScrollTextFade>

          <ScrollTextHeading
            as="h2"
            delay={0.12}
            className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            Stay on the frontier of applied computing.
          </ScrollTextHeading>

          <ScrollTextFade
            as="p"
            delay={0.22}
            className="mt-4 text-sm sm:text-base leading-relaxed text-white/70"
          >
            A curated monthly dispatch delivering rigorous deep dives into autonomous agent
            runtimes, post-quantum cryptographic primitives, WASM performance benchmarks, and whitepaper releases.
          </ScrollTextFade>

          <AnimatePresence mode="wait">
            {subscribed ? (
              <motion.div
                key="subscribed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 backdrop-blur-md"
              >
                <div className="flex items-center justify-center gap-2 text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm font-bold">You are subscribed to the Frontier Gazette!</span>
                </div>
                <p className="mt-2 text-xs text-white/70">
                  We sent a confirmation link to <strong className="text-white font-medium">{email}</strong>. Welcome to our research circle.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
              >
                <div className="relative flex-1 max-w-md">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your academic or corporate email"
                    className="w-full rounded-2xl border border-white/20 bg-white/10 py-3.5 pl-11 pr-4 text-xs sm:text-sm text-white placeholder-white/40 backdrop-blur-md focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/30"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-fill inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Subscribing...</span>
                  ) : (
                    <>
                      <span>Join Dispatch</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Privacy badge */}
          <div className="mt-6 flex items-center justify-center gap-6 text-[11px] text-white/50">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              Zero spam, peer-reviewed engineering
            </span>
            <span>•</span>
            <span>Monthly frequency</span>
            <span>•</span>
            <span>Unsubscribe anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
