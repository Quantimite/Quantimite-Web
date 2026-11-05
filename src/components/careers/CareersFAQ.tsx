"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    question: "What is your remote work policy?",
    answer:
      "We are 100% remote-first with optional hybrid hubs in Colombo and London. Our core working hours align around a 4-hour overlap across EMEA and APAC, with deep emphasis on asynchronous documentation and clear sprint goals.",
  },
  {
    question: "What equipment and workspace setup do you provide?",
    answer:
      "All full-time engineers and designers receive a top-spec Apple MacBook Pro (M4 Max / M4 Pro), a $1,500 home office workstation stipend for ergonomic chairs, desks, or 4K monitors, plus an ongoing $75/month high-speed internet reimbursement.",
  },
  {
    question: "What does the technical interview look like?",
    answer:
      "We do not believe in memorizing LeetCode tricks or artificial algorithm puzzles. Our technical rounds focus on real-world system design, pairing on an actual TypeScript/React component or API, and discussing past trade-offs you made in production.",
  },
  {
    question: "Do you offer visa sponsorship or relocation assistance?",
    answer:
      "For senior engineering leadership and specialized roles, we can support relocation to our UK or APAC operational entities. For remote roles, we employ talent globally via Employer of Record (EOR) services to guarantee local legal compliance and benefits.",
  },
  {
    question: "What if I don't see an open role matching my exact skills?",
    answer:
      "We always keep slots open for exceptional talent! You can submit an Open Application through our General Talent Pool. Our founding engineers review talent pool submissions weekly and reach out when new pods are formed.",
  },
  {
    question: "How quickly will I hear back after submitting an application?",
    answer:
      "We guarantee an initial human response within 24 to 48 hours of your submission. You will never be left in an automated black hole, and every candidate interviewed receives detailed, respectful feedback.",
  },
];

export default function CareersFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#fbfaff]">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-violet">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>COMMONLY ASKED QUESTIONS</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-5xl font-black tracking-tight text-plum">
            Frequently asked questions.
          </h2>
          <p className="mt-3 text-sm text-plum/70 font-light">
            Everything you need to know about working, interviewing, and growing at Quantimite.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-plum/10 bg-white transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left cursor-pointer transition hover:bg-mist/40"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-plum pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-plum/10 bg-plum/5 text-plum transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-violet/10 text-violet border-violet/20" : ""
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="border-t border-plum/5 px-5 sm:px-6 pb-6 pt-3 text-sm sm:text-base text-plum/70 font-light leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
