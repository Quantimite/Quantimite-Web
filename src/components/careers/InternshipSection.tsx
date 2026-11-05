"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, ArrowRight, CheckCircle2, UserCheck, Calendar, Award } from "lucide-react";

export default function InternshipSection() {
  return (
    <section className="py-20 sm:py-28 bg-white border-t border-b border-plum/10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border border-plum/10 bg-gradient-to-br from-mist via-white to-mist/50 p-8 sm:p-14 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-azure/20 bg-azure/10 px-3.5 py-1 text-xs font-bold text-azure">
                <GraduationCap className="h-4 w-4" />
                <span>STUDENT & EARLY CAREER ACCELERATOR</span>
              </div>

              <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight text-plum">
                Internship & Student Programme.
              </h2>

              <p className="mt-4 text-sm sm:text-base text-plum/70 font-light leading-relaxed">
                Launch your software career with hands-on production engineering. At Quantimite, interns do not fetch coffee or build toy demos—you ship real features to production with seasoned mentors.
              </p>

              {/* Programme Pillars */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-violet/10 text-violet">
                    <UserCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-plum">1:1 Dedicated Mentor</h4>
                    <p className="text-xs text-plum/65 mt-0.5">Direct pair programming and weekly career growth check-ins.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-azure/10 text-azure">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-plum">3 to 6 Month Cohorts</h4>
                    <p className="text-xs text-plum/65 mt-0.5">Flexible schedules accommodating university semesters.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-plum">Paid Monthly Stipend</h4>
                    <p className="text-xs text-plum/65 mt-0.5">Competitive compensation plus top-spec MacBook hardware.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-plum/10 text-plum">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-plum">Direct PPO Pipeline</h4>
                    <p className="text-xs text-plum/65 mt-0.5">High performers receive pre-placement full-time offers.</p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/careers/general?type=internship"
                  className="btn-fill flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold"
                >
                  <span>Apply for Student Fellowship</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="#open-positions"
                  className="btn-outline flex items-center gap-2 rounded-full px-5 py-3 text-xs font-semibold text-plum"
                >
                  <span>Check Open Positions</span>
                </a>
              </div>
            </div>

            {/* Right Card: Eligibility Check */}
            <div className="lg:col-span-5 rounded-2xl border border-plum/10 bg-white p-7 shadow-xs">
              <h3 className="text-base font-extrabold text-plum">Who is eligible?</h3>
              <ul className="mt-4 space-y-3 text-xs text-plum/75">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-violet shrink-0 mt-0.5" />
                  <span>Enrolled in or recently graduated from a Computer Science, Software Engineering, or Design programme.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-violet shrink-0 mt-0.5" />
                  <span>Curiosity and passion for modern web technologies (TypeScript, React, Python, or systems engineering).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-violet shrink-0 mt-0.5" />
                  <span>Available for 20–40 hours per week during the 3–6 month internship term.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-violet shrink-0 mt-0.5" />
                  <span>Located in Sri Lanka, APAC, or able to work asynchronously in our operational timezones.</span>
                </li>
              </ul>

              <div className="mt-6 rounded-xl bg-mist p-4 border border-plum/5">
                <p className="text-[11px] font-medium text-plum/70 leading-relaxed">
                  💡 <strong>Pro Tip:</strong> Include a link to your GitHub or a project you built. We prioritize demonstrable curiosity over pristine GPA scores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
