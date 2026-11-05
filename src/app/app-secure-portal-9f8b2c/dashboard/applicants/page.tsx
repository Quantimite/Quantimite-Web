"use client";

import Link from "next/link";
import { Users, FileText, CheckCircle2, XCircle } from "lucide-react";

export default function ApplicantsPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 p-8">
            <div className="max-w-7xl mx-auto mb-8">
                <Link href="/app-secure-portal-9f8b2c/dashboard" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 mb-3">
                    ← Back to dashboard
                </Link>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Applicant Tracking System</h1>
                <p className="text-slate-600 mt-1">Review candidate resumes, interview stages, and hiring pipelines.</p>
            </div>

            <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Candidate Submissions</h2>
                <div className="space-y-4">
                    {[
                        { name: "Kasun Perera", role: "Full-Stack Software Engineer (Intern)", applied: "Yesterday", status: "Under Review" },
                        { name: "Nimesha Silva", role: "UI/UX Lead Designer", applied: "3 days ago", status: "Interview Scheduled" },
                    ].map((app, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                    <Users className="w-4 h-4 text-indigo-500" /> {app.name}
                                </h3>
                                <p className="text-xs text-slate-500 mt-0.5">Applied for: {app.role} • {app.applied}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                                    {app.status}
                                </span>
                                <button className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
                                    View CV
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}