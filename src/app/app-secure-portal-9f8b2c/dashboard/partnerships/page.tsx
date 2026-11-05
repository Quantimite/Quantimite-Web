"use client";

import Link from "next/link";
import { Handshake, Users, Award, ExternalLink } from "lucide-react";

export default function PartnershipsPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 p-8">
            <div className="max-w-7xl mx-auto mb-8">
                <Link href="/app-secure-portal-9f8b2c/dashboard" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 mb-3">
                    ← Back to dashboard
                </Link>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Partnerships & Affiliates</h1>
                <p className="text-slate-600 mt-1">Manage institutional alliances, corporate sponsors, and partner networks.</p>
            </div>

            <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-slate-900">Active Strategic Partners</h2>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-500 transition-all">
                        Add Partner
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { name: "NSBM Green University", role: "Academic & Tech Innovation Partner", status: "Active" },
                        { name: "Barista Sri Lanka", role: "Event Collaboration & Sponsor", status: "Active" },
                        { name: "TechXdoz", role: "Engineering & Software Partner", status: "Active" },
                    ].map((partner, idx) => (
                        <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                    <Handshake className="w-4 h-4 text-indigo-600" /> {partner.name}
                                </h3>
                                <p className="text-xs text-slate-500 mt-1">{partner.role}</p>
                            </div>
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {partner.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}