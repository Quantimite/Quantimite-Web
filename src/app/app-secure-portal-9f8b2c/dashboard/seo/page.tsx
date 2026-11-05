"use client";

import Link from "next/link";
import { Globe, CheckCircle, TrendingUp } from "lucide-react";

export default function SeoAuditsPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 p-8">
            <div className="max-w-7xl mx-auto mb-8">
                <Link href="/app-secure-portal-9f8b2c/dashboard" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 mb-3">
                    ← Back to dashboard
                </Link>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">SEO Audit Desk</h1>
                <p className="text-slate-600 mt-1">Requests from the SEO Health Audit tool, with domain and contact data.</p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-sm font-medium text-slate-500">Domain Authority</div>
                    <div className="text-3xl font-bold text-slate-900 mt-2">48 / 100</div>
                    <span className="text-xs text-emerald-600 font-medium inline-flex items-center gap-1 mt-2">
                        <TrendingUp className="w-3.5 h-3.5" /> +3 points this month
                    </span>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-sm font-medium text-slate-500">Indexed Pages</div>
                    <div className="text-3xl font-bold text-slate-900 mt-2">34 Active</div>
                    <span className="text-xs text-indigo-600 font-medium inline-flex items-center gap-1 mt-2">
                        <CheckCircle className="w-3.5 h-3.5" /> 100% crawl success
                    </span>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-sm font-medium text-slate-500">Core Web Vitals</div>
                    <div className="text-3xl font-bold text-emerald-600 mt-2">Passed</div>
                    <span className="text-xs text-slate-500 mt-2 block">LCP: 1.2s | CLS: 0.01</span>
                </div>
            </div>
        </div>
    );
}