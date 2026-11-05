"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  hasTrackLink?: boolean;
}

const FAQS: FAQItem[] = [
  {
    q: "Are there really zero open jobs or internships right now?",
    a: "Yes, currently all of our engineering pods and student internship seats are 100% staffed. At Quantimite, we grow deliberately and maintain high retention rather than aggressive mass hiring. We never keep 'phantom' job ads running when a role isn't actively ready to hire.",
  },
  {
    q: "When will the next student internship fellowship open?",
    a: "Because each intern receives dedicated 1:1 mentorship from a Senior or Principal Engineer, we only run small cohorts. Our current cohort is actively building in production. We expect the next application cycle to open for Fall 2026 / Spring 2027. Submitting your profile in our Talent Vault gives you priority notification.",
  },
  {
    q: "Does an actual engineer review speculative applications in the Talent Vault?",
    a: "Yes. Speculative applications are not filtered by automated keyword scrapers. Our founding engineering partners review portfolios and code links directly. When a new project pod is funded or an existing pod expands, we reach out to relevant talent vault profiles first.",
  },
  {
    q: "Are Quantimite student internships paid?",
    a: "100% yes. We firmly believe all engineering contributions deserve fair compensation. Interns receive a competitive monthly stipend, high-spec Apple Silicon hardware for the duration of the term, and access to our learning resources.",
  },
  {
    q: "Do you support remote work or only on-site in Colombo?",
    a: "We support both. We maintain a collaborative studio hub in Colombo, Sri Lanka, and also support hybrid and remote contributors who can work asynchronously across APAC and EMEA operational hours.",
  },
  {
    q: "How can I check the status of a past application or submission?",
    a: "Whenever you submit a profile to our Talent Vault or applied for a past opening, a unique reference ID (e.g. QM-APP-xxxxx) was generated. You can check the live review status anytime on our application tracking page.",
    hasTrackLink: true,
  },
];

export default function CareersFAQV2() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#fbfaff] border-b border-plum/10">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>TRANSPARENCY & CLARITY</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-5xl font-black tracking-tight text-plum">
            Frequently Asked Questions.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-plum/70 font-light max-w-lg mx-auto">
            Everything you need to know about our deliberate hiring philosophy, student fellowships, and talent radar.
          </p>
        </div>

        <div className="mt-12 space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-plum/10 bg-white transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between p-6 text-left font-bold text-plum hover:text-violet transition-colors cursor-pointer"
                >
                  <span className="text-base sm:text-lg pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-plum/40 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-violet" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-plum/75 leading-relaxed border-t border-plum/5">
                    <p>{faq.a}</p>
                    {faq.hasTrackLink && (
                      <div className="mt-3">
                        <Link
                          href="/careers/track"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-violet hover:text-azure transition-colors"
                        >
                          <span>Visit Application Status Tracker</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
