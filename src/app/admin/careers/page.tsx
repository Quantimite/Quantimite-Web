"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Briefcase,
  ShieldCheck,
  Bell,
  ExternalLink,
  ShieldAlert,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { ApplicationSubmission, JobPosting, AuditLogEntry } from "@/types/careers";
import { CareersStore } from "@/lib/careers/store";
import AdminStatsHeader from "@/components/admin/careers/AdminStatsHeader";
import ApplicantKanbanBoard from "@/components/admin/careers/ApplicantKanbanBoard";
import ApplicantDetailDrawer from "@/components/admin/careers/ApplicantDetailDrawer";
import JobManagementTable from "@/components/admin/careers/JobManagementTable";
import AuditLogModal from "@/components/admin/careers/AuditLogModal";

export default function AdminCareersPage() {
  const [activeTab, setActiveTab] = useState<"ats" | "jobs" | "subscribers">("ats");
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [applications, setApplications] = useState<ApplicationSubmission[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationSubmission | null>(null);
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  const refreshData = () => {
    setJobs([...CareersStore.getAllJobs()]);
    setApplications([...CareersStore.getAllApplications()]);
    setAuditLogs([...CareersStore.getAuditLogs()]);

    if (selectedApplication) {
      const refreshed = CareersStore.getApplicationById(selectedApplication.id);
      setSelectedApplication(refreshed || null);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const subscribers = CareersStore.getSubscribers();

  return (
    <div className="min-h-screen bg-[#f8f7fc] text-ink py-8 px-4 sm:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Top Admin Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-plum/10 pb-6">
          <div className="flex items-center gap-3">
            <Link
              href="/careers"
              className="grid h-9 w-9 place-items-center rounded-full border border-plum/10 bg-white text-plum hover:bg-mist transition"
              title="Return to Public Careers Site"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-violet">
                  QUANTIMITE ATS // ADMIN PORTAL
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold">
                  <ShieldCheck className="h-3 w-3" />
                  Role: Lead Recruiter
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-plum mt-0.5">
                Careers & Talent Operations
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAuditModalOpen(true)}
              className="btn-outline flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-plum"
            >
              <ShieldAlert className="h-4 w-4 text-violet" />
              <span>Audit Trail ({auditLogs.length})</span>
            </button>

            <Link
              href="/careers"
              target="_blank"
              className="btn-fill flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold"
            >
              <span>Live Public Careers</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* 1. Dashboard Metrics Summary */}
        <AdminStatsHeader jobs={jobs} applications={applications} />

        {/* 2. Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-plum/10 pb-1">
          <button
            onClick={() => setActiveTab("ats")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-t-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "ats"
                ? "bg-white text-violet border-t-2 border-violet shadow-xs"
                : "text-plum/60 hover:text-plum hover:bg-white/50"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Applicant Pipeline ({applications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("jobs")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-t-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "jobs"
                ? "bg-white text-violet border-t-2 border-violet shadow-xs"
                : "text-plum/60 hover:text-plum hover:bg-white/50"
            }`}
          >
            <Briefcase className="h-4 w-4" />
            <span>Manage Job Postings ({jobs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("subscribers")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-t-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "subscribers"
                ? "bg-white text-violet border-t-2 border-violet shadow-xs"
                : "text-plum/60 hover:text-plum hover:bg-white/50"
            }`}
          >
            <Bell className="h-4 w-4" />
            <span>Alert Subscribers ({subscribers.length})</span>
          </button>
        </div>

        {/* 3. Tab Content */}
        {activeTab === "ats" && (
          <ApplicantKanbanBoard
            applications={applications}
            jobs={jobs}
            onSelectApplication={(app) => setSelectedApplication(app)}
            onUpdate={refreshData}
          />
        )}

        {activeTab === "jobs" && (
          <JobManagementTable jobs={jobs} onUpdate={refreshData} />
        )}

        {activeTab === "subscribers" && (
          <div className="rounded-2xl border border-plum/10 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-plum">Job Alert Subscribers</h3>
            <p className="text-xs text-plum/60">
              Candidates who registered for instant email notifications when new roles match their preferences.
            </p>

            {subscribers.length === 0 ? (
              <div className="py-12 text-center text-xs text-plum/40 border border-dashed border-plum/10 rounded-xl">
                No external subscribers registered yet.
              </div>
            ) : (
              <div className="divide-y divide-plum/5 border border-plum/10 rounded-xl overflow-hidden">
                {subscribers.map((s) => (
                  <div key={s.id} className="p-4 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-plum">{s.email}</span>
                      <span className="text-[11px] text-plum/50 block">
                        Prefers: {s.department} • {s.jobType}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-plum/40">
                      Subscribed: {new Date(s.subscribedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. Applicant Detail Drawer */}
        <ApplicantDetailDrawer
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onUpdate={refreshData}
        />

        {/* 5. Audit Log Modal */}
        <AuditLogModal
          logs={auditLogs}
          isOpen={auditModalOpen}
          onClose={() => setAuditModalOpen(false)}
        />
      </div>
    </div>
  );
}
