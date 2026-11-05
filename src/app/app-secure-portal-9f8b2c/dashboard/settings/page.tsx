"use client";

import Link from "next/link";
import { Lock, Server } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 p-8">
            <div className="max-w-7xl mx-auto mb-8">
                <Link href="/app-secure-portal-9f8b2c/dashboard" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 mb-3">
                    ← Back to dashboard
                </Link>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Portal Settings</h1>
                <p className="text-slate-600 mt-1">Configure security thresholds, session timeouts, and environment preferences.</p>
            </div>

            <div className="max-w-7xl mx-auto space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-indigo-600" /> Security & Inactivity Settings
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                            <div>
                                <div className="font-medium text-slate-900">Auto-Logout Inactivity Threshold</div>
                                <div className="text-xs text-slate-500 mt-0.5">Automatically clears session cookie after 5 minutes of inactivity.</div>
                            </div>
                            <span className="text-xs font-semibold px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-200">5 Minutes</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <Server className="w-5 h-5 text-indigo-600" /> Environment & Integration Status
                    </h2>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div className="text-sm font-medium text-slate-800">Vercel Production Deployment & Supabase DB</div>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">Connected</span>
                    </div>
                </div>
            </div>
        </div>
    );
}