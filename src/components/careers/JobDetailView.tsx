"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Mail,
  ShieldCheck,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { JobPosting } from "@/types/careers";

interface Props {
  job: JobPosting;
  similarJobs: JobPosting[];
}

export default function JobDetailView({ job, similarJobs }: Props) {
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const isClosed = job.status === "Closed" || new Date(job.validThrough) < new Date();

  // Share handlers
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = `${job.title} at Quantimite`;

  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    shareUrl
  )}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${shareTitle}: ${shareUrl}`
  )}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(
    shareTitle
  )}&body=${encodeURIComponent(
    `Check out this role at Quantimite: ${job.title}\n\n${shareUrl}`
  )}`;

  return (
    <div className="min-h-screen bg-[#fbfaff] text-ink pb-24">
      {/* Toast Notification for Copied Link */}
      {copied && (
        <div className="toast bg-white border border-plum/10 text-plum shadow-xl">
          <Check className="h-4 w-4 text-emerald-600" />
          <span>Job link copied to clipboard!</span>
        </div>
      )}

      {/* Breadcrumb & Navigation */}
      <div className="border-b border-plum/10 bg-white/70 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/careers#open-positions"
            className="inline-flex items-center gap-2 text-xs font-semibold text-plum/70 hover:text-plum transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to all open positions</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-full border border-plum/10 px-3 py-1.5 text-xs font-semibold text-plum/70 hover:bg-mist transition-colors cursor-pointer"
            >
              <Copy className="h-3.5 w-3.5 text-violet" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 pt-10 sm:pt-14">
        {/* Closed Job Alert Banner */}
        {isClosed && (
          <div className="mb-8 rounded-2xl border border-warning/20 bg-warning/10 p-5 flex items-start gap-3 text-sm text-plum">
            <Lock className="h-5 w-5 text-warning shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">This position has been filled or closed.</p>
              <p className="text-xs text-plum/70 mt-1">
                We are no longer accepting direct submissions for this specific opening. You are welcome to submit an{" "}
                <Link href="/careers/general" className="underline font-bold text-violet">
                  open application
                </Link>{" "}
                or explore our other active vacancies below.
              </p>
            </div>
          </div>
        )}

        {/* Role Header */}
        <div className="rounded-3xl border border-plum/10 bg-white p-8 sm:p-12 shadow-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge badge-primary font-bold">
              {job.department}
            </span>
            <span className="badge font-semibold">{job.type}</span>
            <span className="badge font-semibold flex items-center gap-1">
              <MapPin className="h-3 w-3 text-plum/50" />
              {job.workMode}
            </span>
            <span className="badge font-semibold">
              {job.location}
            </span>
          </div>

          <h1 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight text-plum">
            {job.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-plum/75 font-light leading-relaxed max-w-3xl">
            {job.shortSummary}
          </p>

          <div className="mt-8 pt-6 border-t border-plum/10 flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6 text-xs text-plum/70">
              {job.salaryRange && (
                <div>
                  <span className="block text-plum/40 font-mono text-[10px] uppercase">
                    COMPENSATION
                  </span>
                  <span className="text-sm font-bold text-plum">
                    {job.salaryRange}
                  </span>
                </div>
              )}
              <div>
                <span className="block text-plum/40 font-mono text-[10px] uppercase">
                  POSTED DATE
                </span>
                <span className="text-sm font-semibold text-plum">
                  {job.datePosted}
                </span>
              </div>
              <div>
                <span className="block text-plum/40 font-mono text-[10px] uppercase">
                  CLOSING DATE
                </span>
                <span className="text-sm font-semibold text-plum">
                  {job.validThrough}
                </span>
              </div>
            </div>

            {/* Direct CTA */}
            {!isClosed && (
              <div className="flex items-center gap-3">
                <Link
                  href={`/careers/${job.slug}/apply`}
                  className="btn-fill flex items-center gap-2 rounded-full px-7 py-3 text-xs font-bold uppercase tracking-wider"
                >
                  <span>Apply for this role</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Content Layout */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Main Specifications */}
          <div className="lg:col-span-8 space-y-12">
            {/* Responsibilities */}
            <div className="rounded-3xl border border-plum/10 bg-white p-8 sm:p-10 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-plum">
                What you will do
              </h2>
              <ul className="space-y-3 pt-2 text-sm text-plum/80 leading-relaxed">
                {job.responsibilities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="h-2 w-2 rounded-full bg-violet mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Must-Have Requirements */}
            <div className="rounded-3xl border border-plum/10 bg-white p-8 sm:p-10 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-plum">
                What we look for (Must-have)
              </h2>
              <ul className="space-y-3 pt-2 text-sm text-plum/80 leading-relaxed">
                {job.requirements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nice to have */}
            {job.niceToHave.length > 0 && (
              <div className="rounded-3xl border border-plum/10 bg-white p-8 sm:p-10 shadow-xs space-y-4">
                <h2 className="text-xl font-extrabold text-plum">
                  Bonus points (Nice-to-have)
                </h2>
                <ul className="space-y-3 pt-2 text-sm text-plum/80 leading-relaxed">
                  {job.niceToHave.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="h-2 w-2 rounded-full bg-azure mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            <div className="rounded-3xl border border-plum/10 bg-white p-8 sm:p-10 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-plum">
                Benefits & Perks
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {job.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-plum/80 bg-mist p-3.5 rounded-xl border border-plum/5">
                    <Sparkles className="h-4 w-4 text-violet shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hiring Process for this role */}
            <div className="rounded-3xl border border-plum/10 bg-white p-8 sm:p-10 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-plum">
                Hiring Process for this role
              </h2>
              <div className="space-y-4 pt-2">
                {job.hiringProcess.map((step) => (
                  <div key={step.step} className="flex items-start gap-4 p-4 rounded-xl border border-plum/10 bg-mist/30">
                    <span className="font-mono text-xs font-bold text-violet bg-violet/10 px-2.5 py-1 rounded-md">
                      {step.step}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-plum">{step.title}</h4>
                        <span className="text-[11px] font-semibold text-plum/60">{step.expectedTimeline}</span>
                      </div>
                      <p className="mt-1 text-xs text-plum/70 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Action Card */}
            <div className="sticky top-24 rounded-3xl border border-plum/10 bg-white p-6 shadow-xs space-y-6">
              {!isClosed ? (
                <div>
                  <h3 className="text-lg font-extrabold text-plum">Interested in this role?</h3>
                  <p className="text-xs text-plum/70 mt-1 leading-relaxed">
                    Our application takes less than 3 minutes. No cover letter required, though welcome.
                  </p>
                  <Link
                    href={`/careers/${job.slug}/apply`}
                    className="btn-fill flex items-center justify-center gap-2 rounded-full w-full py-3.5 text-xs font-bold uppercase tracking-wider mt-5"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <div>
                  <h3 className="text-base font-bold text-plum">Role Closed</h3>
                  <p className="text-xs text-plum/70 mt-1">
                    Submit your credentials to our general talent pool for future openings.
                  </p>
                  <Link
                    href="/careers/general"
                    className="btn-outline flex items-center justify-center gap-2 rounded-full w-full py-3 text-xs font-bold text-plum mt-4"
                  >
                    <span>Submit Open Application</span>
                  </Link>
                </div>
              )}

              {/* Share Role Links */}
              <div className="pt-6 border-t border-plum/10 space-y-3">
                <span className="block text-xs font-bold uppercase tracking-wider text-plum/60">
                  Share this opening
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    title="Copy link"
                    className="grid h-9 w-9 place-items-center rounded-full border border-plum/15 text-plum/70 hover:bg-mist hover:text-plum transition cursor-pointer"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <a
                    href={linkedinShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share on LinkedIn"
                    className="grid h-9 w-9 place-items-center rounded-full border border-plum/15 text-plum/70 hover:bg-mist hover:text-plum transition"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </a>
                  <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share on WhatsApp"
                    className="grid h-9 w-9 place-items-center rounded-full border border-plum/15 text-plum/70 hover:bg-mist hover:text-plum transition"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </a>
                  <a
                    href={emailShareUrl}
                    title="Share via Email"
                    className="grid h-9 w-9 place-items-center rounded-full border border-plum/15 text-plum/70 hover:bg-mist hover:text-plum transition"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Security & Response Guarantee Notice */}
              <div className="pt-4 border-t border-plum/10 space-y-2 text-xs text-plum/60">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>24–48h guaranteed response</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-violet shrink-0" />
                  <span>GDPR / CCPA privacy protected</span>
                </div>
              </div>
            </div>

            {/* Similar Roles Card */}
            {similarJobs.length > 0 && (
              <div className="rounded-3xl border border-plum/10 bg-white p-6 shadow-xs space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-plum/60">
                  Similar Opportunities
                </h4>
                <div className="space-y-3">
                  {similarJobs.map((sim) => (
                    <Link
                      key={sim.id}
                      href={`/careers/${sim.slug}`}
                      className="group block p-3.5 rounded-xl border border-plum/5 hover:border-violet/30 hover:bg-mist/30 transition-all"
                    >
                      <h5 className="text-sm font-bold text-plum group-hover:text-violet transition-colors">
                        {sim.title}
                      </h5>
                      <p className="text-xs text-plum/60 mt-1">
                        {sim.department} • {sim.workMode}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
