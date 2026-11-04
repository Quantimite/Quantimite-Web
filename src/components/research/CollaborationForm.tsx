"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Building2,
  Send,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  FileText,
  Mail,
  User,
  ExternalLink,
} from "lucide-react";
import { ScrollTextHeading, ScrollTextFade } from "@/components/ui/ScrollText";

type PartnerType = "university" | "enterprise" | "fellow";

export default function CollaborationForm() {
  const [partnerType, setPartnerType] = useState<PartnerType>("university");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [institution, setInstitution] = useState("");
  const [focusArea, setFocusArea] = useState("AI in Business");
  const [proposal, setProposal] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section id="collaborate" className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
      {/* Decorative backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 right-0 -z-10 h-96 w-96 rounded-full bg-azure/10 blur-3xl"
      />

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        {/* Left column: Context & Invitation with scroll in-and-out */}
        <div className="lg:col-span-5">
          <ScrollTextFade
            as="div"
            delay={0.05}
            className="inline-flex items-center gap-2 rounded-full border border-azure/20 bg-azure/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-azure"
          >
            <GraduationCap className="h-3.5 w-3.5" />
            University & Industry Partnerships
          </ScrollTextFade>

          <ScrollTextHeading
            as="h2"
            delay={0.1}
            className="mt-4 text-3xl font-extrabold tracking-tight text-plum sm:text-5xl"
          >
            Collaborate with our labs.
          </ScrollTextHeading>

          <ScrollTextFade
            as="p"
            delay={0.2}
            className="mt-4 text-base leading-relaxed text-plum/70"
          >
            We partner with academic laboratories, university research groups, and forward-looking
            enterprises to co-author peer-reviewed papers, share high-throughput compute sandboxes,
            and spin off joint open-source architectures.
          </ScrollTextFade>

          <div className="mt-8 space-y-4">
            {[
              {
                icon: GraduationCap,
                color: "text-violet bg-violet/10",
                title: "University Lab Grants & Compute",
                desc: "Subsidized GPU access, research fellowships, and co-advisorship on graduate theses.",
              },
              {
                icon: Building2,
                color: "text-azure bg-azure/10",
                title: "Enterprise Joint R&D Sandboxes",
                desc: "Custom evaluation benchmarks, zero-knowledge verification proofs, and tailored model distillation.",
              },
              {
                icon: Sparkles,
                color: "text-magenta bg-magenta/10",
                title: "Visiting Fellow Residency",
                desc: "Quarterly sabbaticals and independent fellow stipends for exceptional contributors.",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.15 + idx * 0.08 }}
                  className="flex items-start gap-3.5 rounded-2xl border border-plum/10 bg-white/60 p-4 backdrop-blur-xs"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-plum">{item.title}</h4>
                    <p className="mt-0.5 text-xs text-plum/70">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right column: Interactive Submission Card */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 35, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-3xl border border-plum/15 bg-white/90 p-8 shadow-xl backdrop-blur-md"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="submitted"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-plum">
                    Proposal Received
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-plum/70">
                    Thank you for your interest in collaborating with Quantimite Labs. Our research
                    steering committee reviews proposals bi-weekly and will get back to{" "}
                    <strong className="text-plum font-semibold">{email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setEmail("");
                      setInstitution("");
                      setProposal("");
                    }}
                    className="btn-outline mt-8 rounded-full px-6 py-2.5 text-xs font-bold text-plum"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-5"
                >
                  <div>
                    <h3 className="text-xl font-bold text-plum">
                      Initiate Research Collaboration
                    </h3>
                    <p className="mt-1 text-xs text-plum/60">
                      Share your proposal scope or grant inquiry directly with our research board.
                    </p>
                  </div>

                  {/* Partner Type Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-plum/60 mb-2">
                      Collaboration Type
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPartnerType("university")}
                        className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-bold transition ${
                          partnerType === "university"
                            ? "border-violet bg-violet/10 text-violet shadow-xs"
                            : "border-plum/10 bg-plum/[0.02] text-plum/70 hover:bg-plum/[0.05]"
                        }`}
                      >
                        <GraduationCap className="h-4 w-4" />
                        <span>University</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPartnerType("enterprise")}
                        className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-bold transition ${
                          partnerType === "enterprise"
                            ? "border-azure bg-azure/10 text-azure shadow-xs"
                            : "border-plum/10 bg-plum/[0.02] text-plum/70 hover:bg-plum/[0.05]"
                        }`}
                      >
                        <Building2 className="h-4 w-4" />
                        <span>Enterprise</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPartnerType("fellow")}
                        className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-bold transition ${
                          partnerType === "fellow"
                            ? "border-magenta bg-magenta/10 text-magenta shadow-xs"
                            : "border-plum/10 bg-plum/[0.02] text-plum/70 hover:bg-plum/[0.05]"
                        }`}
                      >
                        <Sparkles className="h-4 w-4" />
                        <span>Independent</span>
                      </button>
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-plum/80 mb-1.5">
                        Principal Contact Name *
                      </label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-plum/40" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Dr. Jordan Ellis"
                          className="w-full rounded-xl border border-plum/15 bg-white py-2.5 pl-10 pr-3.5 text-xs text-plum placeholder-plum/35 focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/15"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-plum/80 mb-1.5">
                        Institutional Email *
                      </label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-plum/40" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="jordan.ellis@mit.edu"
                          className="w-full rounded-xl border border-plum/15 bg-white py-2.5 pl-10 pr-3.5 text-xs text-plum placeholder-plum/35 focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/15"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Institution and Focus Area */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-plum/80 mb-1.5">
                        Organization / University Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        placeholder="e.g. Stanford AI Lab or Acme Labs"
                        className="w-full rounded-xl border border-plum/15 bg-white px-3.5 py-2.5 text-xs text-plum placeholder-plum/35 focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/15"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-plum/80 mb-1.5">
                        Target Focus Area *
                      </label>
                      <select
                        value={focusArea}
                        onChange={(e) => setFocusArea(e.target.value)}
                        className="w-full rounded-xl border border-plum/15 bg-white px-3.5 py-2.5 text-xs text-plum focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/15"
                      >
                        <option value="AI in Business">AI in Business & Agentic Systems</option>
                        <option value="Cybersecurity">Post-Quantum & Zero-Trust Security</option>
                        <option value="Mobile and Web Technologies">WebAssembly & Edge Runtimes</option>
                        <option value="Marketing Analytics">Privacy-Preserving Causal Analytics</option>
                        <option value="Other">Cross-Disciplinary Proposal</option>
                      </select>
                    </div>
                  </div>

                  {/* Proposal Abstract */}
                  <div>
                    <label className="block text-xs font-semibold text-plum/80 mb-1.5">
                      Proposal Abstract / Scope of Inquiry *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={proposal}
                      onChange={(e) => setProposal(e.target.value)}
                      placeholder="Briefly describe your research hypothesis, intended dataset or compute requirements, and proposed collaboration goals..."
                      className="w-full rounded-xl border border-plum/15 bg-white p-3.5 text-xs text-plum placeholder-plum/35 focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/15"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-fill flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold shadow-md transition disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Dispatching Proposal...</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Submit Collaboration Proposal</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-plum/50">
                    All proposals are covered under reciprocal academic non-disclosure agreements.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
