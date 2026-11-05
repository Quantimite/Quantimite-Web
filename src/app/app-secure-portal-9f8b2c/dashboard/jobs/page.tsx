"use client";

import Link from "next/link";
import { Briefcase, Plus, MapPin, DollarSign } from "lucide-react";

export default function JobPostingsPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 p-8">
            <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
                <div>
                    <Link href="/app-secure-portal-9f8b2c/dashboard" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 mb-3">
                        ← Back to dashboard
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Job Postings</h1>
                    <p className="text-slate-600 mt-1">Manage open career opportunities and internship listings.</p>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-500 transition-all inline-flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Post New Role
                </button>
            </div>

            <div className="max-w-7xl mx-auto space-y-4">
                {[
                    { title: "Full-Stack Software Engineer (Intern)", type: "Remote / Hybrid", dept: "Engineering", status: "Active" },
                    { title: "UI/UX Lead Designer", type: "Full-time", dept: "Design", status: "Active" },
                ].map((job, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-slate-900 text-lg flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-indigo-600" /> {job.title}
                            </h3>
                            <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.type}</span>
                                <span>Department: <strong>{job.dept}</strong></span>
                            </div>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {job.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}