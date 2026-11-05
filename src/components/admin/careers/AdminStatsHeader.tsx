"use client";

import React from "react";
import { Users, Briefcase, Clock, CheckCircle2, UserCheck, TrendingUp } from "lucide-react";
import { ApplicationSubmission, JobPosting } from "@/types/careers";

interface Props {
  jobs: JobPosting[];
  applications: ApplicationSubmission[];
}

export default function AdminStatsHeader({ jobs, applications }: Props) {
  const publishedJobs = jobs.filter((j) => j.status === "Published").length;
  const newApps = applications.filter((a) => a.status === "New").length;
  const inReview = applications.filter((a) => a.status === "Reviewed").length;
  const inInterview = applications.filter((a) => a.status === "Interview").length;
  const hired = applications.filter((a) => a.status === "Hired").length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      <div className="rounded-2xl border border-plum/10 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between text-plum/60 text-xs font-semibold">
          <span>Active Roles</span>
          <Briefcase className="h-4 w-4 text-violet" />
        </div>
        <p className="mt-2 text-2xl font-black text-plum">{publishedJobs}</p>
        <span className="text-[11px] text-plum/50 font-medium">Out of {jobs.length} total</span>
      </div>

      <div className="rounded-2xl border border-plum/10 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between text-plum/60 text-xs font-semibold">
          <span>Total Applicants</span>
          <Users className="h-4 w-4 text-azure" />
        </div>
        <p className="mt-2 text-2xl font-black text-plum">{applications.length}</p>
        <span className="text-[11px] text-emerald-600 font-semibold">+4 this week</span>
      </div>

      <div className="rounded-2xl border border-plum/10 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between text-plum/60 text-xs font-semibold">
          <span>New Unreviewed</span>
          <Clock className="h-4 w-4 text-amber-500" />
        </div>
        <p className="mt-2 text-2xl font-black text-amber-600">{newApps}</p>
        <span className="text-[11px] text-plum/50 font-medium">Awaiting initial review</span>
      </div>

      <div className="rounded-2xl border border-plum/10 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between text-plum/60 text-xs font-semibold">
          <span>In Review</span>
          <UserCheck className="h-4 w-4 text-violet" />
        </div>
        <p className="mt-2 text-2xl font-black text-violet">{inReview}</p>
        <span className="text-[11px] text-plum/50 font-medium">Deep-dive assessment</span>
      </div>

      <div className="rounded-2xl border border-plum/10 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between text-plum/60 text-xs font-semibold">
          <span>Interview Stage</span>
          <TrendingUp className="h-4 w-4 text-azure" />
        </div>
        <p className="mt-2 text-2xl font-black text-azure">{inInterview}</p>
        <span className="text-[11px] text-plum/50 font-medium">System design rounds</span>
      </div>

      <div className="rounded-2xl border border-plum/10 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between text-plum/60 text-xs font-semibold">
          <span>Hired / Offered</span>
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        </div>
        <p className="mt-2 text-2xl font-black text-emerald-600">{hired}</p>
        <span className="text-[11px] text-plum/50 font-medium">100% acceptance rate</span>
      </div>
    </div>
  );
}
