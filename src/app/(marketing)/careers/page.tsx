import React, { Suspense } from "react";
import type { Metadata } from "next";
import { CareersStore } from "@/lib/careers/store";
import CareersHero from "@/components/careers/CareersHero";
import CultureBento from "@/components/careers/CultureBento";
import OpenPositions from "@/components/careers/OpenPositions";
import InternshipSection from "@/components/careers/InternshipSection";
import TalentPoolCTA from "@/components/careers/TalentPoolCTA";

export const metadata: Metadata = {
  title: "Careers & Opportunities | Quantimite — Engineering at Scale",
  description:
    "Explore engineering, design, and student fellowship opportunities at Quantimite. Built for people who care about craft, culture, learning, and growth.",
  keywords: [
    "Quantimite Careers",
    "Software Engineering Jobs",
    "Student Internship",
    "Culture Learning Growth",
    "Talent Pool",
  ],
  openGraph: {
    title: "Careers at Quantimite — Make Your Next Move",
    description:
      "Join our boutique engineering studio. Explore our culture, open positions, student programme, and general talent pool.",
    url: "https://quantimite.com/careers",
    siteName: "Quantimite",
    type: "website",
  },
};

export default function CareersPage() {
  const jobs = CareersStore.getPublishedJobs();

  return (
    <div className="min-h-screen bg-[#fbfaff] text-ink selection:bg-violet/20 selection:text-plum">
      {/* Hero Section */}
      <CareersHero totalJobsCount={jobs.length} />

      {/* 1. Why work with us (culture, learning, growth) — Bento Box Style */}
      <CultureBento />

      {/* 2. Open positions with filters (department, type, location) */}
      <Suspense fallback={<div className="py-24 text-center text-sm text-plum/50">Loading open positions...</div>}>
        <OpenPositions jobs={jobs} />
      </Suspense>

      {/* 3. Internship and student programme */}
      <InternshipSection />

      {/* 4. General application / talent pool */}
      <TalentPoolCTA />
    </div>
  );
}
