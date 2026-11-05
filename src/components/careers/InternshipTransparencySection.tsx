"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  UserCheck,
  Calendar,
  Award,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Code2,
  FolderGit2,
} from "lucide-react";

export default function InternshipTransparencySection() {
  const scrollToTalentVault = () => {
    const el = document.getElementById("talent-vault");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="internships" className="py-20 sm:py-28 bg-[#f6f4ff]/50 border-b border-plum/10 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border border-plum/10 bg-white p-8 sm:p-14 shadow-sm relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-24 w-[350px] h-[350px] rounded-full bg-azure/10 blur-[90px]"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-900">
                <GraduationCap className="h-4 w-4 text-amber-700" />
                <span>STUDENT & INTERN FELLOWSHIP // CURRENTLY PAUSED</span>
              </div>

              {/* Title */}
              <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight text-plum">
                Why our internship seats are currently full.
              </h2>

              {/* Body */}
              <p className="mt-4 text-sm sm:text-base text-plum/75 font-light leading-relaxed">
                At Quantimite, we refuse to treat interns as low-cost labor or assign synthetic sandbox tasks.
                Every single student intern is paired <strong>1-on-1 with a Senior or Principal Engineer</strong> who
                dedicates several hours every week to direct code reviews, system design teardowns, and career guidance.
              </p>
              <p className="mt-3 text-sm sm:text-base text-plum/75 font-light leading-relaxed">
                Because of this intense mentorship commitment, we strictly cap our fellowship cohorts to 3–4 candidates.
                All seats for the current cycle are filled. When our active cohort graduates, the next window will unlock.
              </p>

              {/* Fellowship Pillars */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet/10 text-violet">
                    <UserCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-plum">Dedicated 1:1 Senior Mentor</h4>
                    <p className="text-xs text-plum/65 mt-0.5">
                      Direct pairing, PR teardowns, and weekly 1:1 career roadmapping.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-azure/10 text-azure">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-plum">Flexible 3 to 6-Month Terms</h4>
                    <p className="text-xs text-plum/65 mt-0.5">
                      Tailored schedules designed around university exams and semesters.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-plum">Paid Competitive Stipend</h4>
                    <p className="text-xs text-plum/65 mt-0.5">
                      Fair monthly compensation plus top-spec Apple hardware during your term.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-purple-500/10 text-purple-600">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-plum">Direct PPO Full-Time Route</h4>
                    <p className="text-xs text-plum/65 mt-0.5">
                      Exceptional fellows receive early pre-placement full-time offers.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <button
                  onClick={scrollToTalentVault}
                  className="btn-fill flex items-center gap-2 rounded-full px-6 py-3.5 text-xs font-bold cursor-pointer"
                >
                  <span>Join Early Intern Waitlist</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <a
                  href="#role-alerts"
                  className="btn-outline flex items-center gap-2 rounded-full px-5 py-3.5 text-xs font-semibold text-plum"
                >
                  <span>Subscribe for Next Cohort Date</span>
                </a>
              </div>
            </div>

            {/* Right Card: How to Stand Out While Waiting */}
            <div className="lg:col-span-5 rounded-3xl border border-plum/10 bg-mist/60 p-7 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-extrabold text-plum uppercase tracking-wider">
                <FolderGit2 className="h-4 w-4 text-violet" />
                <span>How to Stand Out in Advance</span>
              </div>
              <h3 className="mt-2 text-lg font-black text-plum">
                What our mentors evaluate in student portfolios:
              </h3>

              <ul className="mt-5 space-y-3.5 text-xs text-plum/75">
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-violet/10 text-violet flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    1
                  </div>
                  <div>
                    <strong className="text-plum block">Shipped, Working Software:</strong>
                    A live deployed URL and a tidy GitHub repo beats 20 unfinished tutorial repos.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-azure/10 text-azure flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    2
                  </div>
                  <div>
                    <strong className="text-plum block">Deep Curiosity & Fundamentals:</strong>
                    Understanding how JavaScript event loops or database indexes work under the hood.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    3
                  </div>
                  <div>
                    <strong className="text-plum block">Thoughtful Code Hygiene:</strong>
                    Clean commit history, meaningful variable names, and clear README documentation.
                  </div>
                </li>
              </ul>

              <div className="mt-6 rounded-2xl bg-white p-4 border border-plum/10">
                <p className="text-[11px] font-medium text-plum/80 leading-relaxed">
                  💡 <strong>Student Tip:</strong> You do not need a 4.0 GPA or an Ivy League degree to join our fellowship. Submit your GitHub or portfolio in our Talent Vault below and we will tag your profile for early cohort notifications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
