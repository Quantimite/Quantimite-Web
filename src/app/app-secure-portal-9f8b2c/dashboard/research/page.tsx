"use client";

import Link from "next/link";
import { FlaskConical, Plus } from "lucide-react";

export default function ResearchPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 p-8">
            <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
                <div>
                    <Link href="/app-secure-portal-9f8b2c/dashboard" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 mb-3">
                        ← Back to dashboard
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Research Hub</h1>
                    <p className="text-slate-600 mt-1">Manage technical whitepapers, case studies, and research publications.</p>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-500 transition-all inline-flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Publish Research
                </button>
            </div>

            <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Active Publications</h2>
                <div className="space-y-4">
                    {[
                        { title: "Optimizing High-Throughput Database Queries in PostgreSQL", date: "September 2026", status: "Published" },
                        { title: "Human-Wildlife Co-existence Frameworks through IoT Sensors", date: "August 2026", status: "Published" },
                    ].map((paper, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                    <FlaskConical className="w-4 h-4 text-indigo-500" /> {paper.title}
                                </h3>
                                <p className="text-xs text-slate-500 mt-0.5">Released: {paper.date}</p>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {paper.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}