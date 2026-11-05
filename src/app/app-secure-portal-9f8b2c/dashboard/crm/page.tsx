"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Search,
    Calendar,
    DollarSign,
    ArrowUpRight,
    Clock,
    CheckCircle2,
    AlertCircle,
    Building,
    User
} from "lucide-react";

// Mock data representing incoming client project briefs, budgets, and consultation bookings
const INITIAL_INQUIRIES = [
    {
        id: "CRM-1092",
        clientName: "Alex Morgan",
        company: "Apex Global Tech",
        email: "alex@apexglobal.io",
        service: "Full-Stack Software Architecture",
        budget: "$15,000 - $25,000",
        timeline: "2-3 Months",
        status: "New",
        date: "2026-11-03",
        notes: "Looking for microservices migration and high-concurrency API design.",
    },
    {
        id: "CRM-1091",
        clientName: "Sarah Jenkins",
        company: "Lumina Retail Solutions",
        email: "s.jenkins@luminaretail.com",
        service: "Digital Growth & Performance Marketing",
        budget: "$5,000 / mo",
        timeline: "Ongoing",
        status: "Contacted",
        date: "2026-11-02",
        notes: "Requested a comprehensive SEO audit and high-conversion landing page revamp.",
    },
    {
        id: "CRM-1090",
        clientName: "Dr. Harsha Vithana",
        company: "MedCare Diagnostics",
        email: "harsha@medcare.lk",
        service: "Custom Portal Development",
        budget: "$10,000 - $15,000",
        timeline: "6 Weeks",
        status: "Proposal Sent",
        date: "2026-10-29",
        notes: "Secure patient records portal with HIPAA-compliant encryption standards.",
    },
    {
        id: "CRM-1089",
        clientName: "Marcus Vance",
        company: "Vance Media Group",
        email: "marcus@vancemedia.com",
        service: "Motion Graphics & Brand Identity",
        budget: "$3,500",
        timeline: "3 Weeks",
        status: "Closed / Won",
        date: "2026-10-25",
        notes: "Animated WebGL visual assets and corporate identity deck finalized.",
    },
];

export default function CrmPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [inquiries] = useState(INITIAL_INQUIRIES);

    const filteredInquiries = inquiries.filter((item) => {
        const matchesSearch =
            item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.service.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === "All" || item.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "New":
                return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"><Clock className="w-3 h-3" /> New</span>;
            case "Contacted":
                return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200"><AlertCircle className="w-3 h-3" /> Contacted</span>;
            case "Proposal Sent":
                return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200"><Calendar className="w-3 h-3" /> Proposal Sent</span>;
            case "Closed / Won":
                return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"><CheckCircle2 className="w-3 h-3" /> Closed / Won</span>;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 p-8">
            {/* Header Area */}
            <div className="max-w-7xl mx-auto mb-8">
                <Link
                    href="/app-secure-portal-9f8b2c/dashboard"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 mb-3"
                >
                    ← Back to dashboard
                </Link>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">CRM & Inquiries</h1>
                        <p className="text-slate-600 mt-1">
                            Inbound project briefs, budgets, timelines, and consultation bookings.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all">
                            Export Leads (CSV)
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                {/* Controls Bar (Search & Status Filter Tabs) */}
                <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-50/50">

                    {/* Search Input */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by client name, company, or service..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Status Filter Buttons */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                        {["All", "New", "Contacted", "Proposal Sent", "Closed / Won"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${statusFilter === status
                                        ? "bg-indigo-600 text-white shadow-sm"
                                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <th className="py-3.5 px-6">Client & Company</th>
                                <th className="py-3.5 px-6">Service Requested</th>
                                <th className="py-3.5 px-6">Budget & Timeline</th>
                                <th className="py-3.5 px-6">Status</th>
                                <th className="py-3.5 px-6">Date</th>
                                <th className="py-3.5 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-sm">
                            {filteredInquiries.length > 0 ? (
                                filteredInquiries.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="py-4 px-6">
                                            <div className="font-semibold text-slate-900 flex items-center gap-2">
                                                <User className="w-4 h-4 text-indigo-500" />
                                                {item.clientName}
                                            </div>
                                            <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                                                <Building className="w-3 h-3" /> {item.company} • {item.email}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="font-medium text-slate-800">{item.service}</span>
                                            <p className="text-xs text-slate-500 truncate max-w-xs mt-0.5">{item.notes}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="font-medium text-slate-900 flex items-center gap-1">
                                                <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> {item.budget}
                                            </div>
                                            <div className="text-xs text-slate-500 mt-0.5">Timeline: {item.timeline}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            {getStatusBadge(item.status)}
                                        </td>
                                        <td className="py-4 px-6 text-xs text-slate-500 font-medium">
                                            {item.date}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button
                                                onClick={() => alert(`Opening details for ${item.clientName} (${item.id})`)}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                            >
                                                View Brief <ArrowUpRight className="w-3.5 h-3.5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-slate-500">
                                        No matching inquiries found. Try adjusting your search or filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer info */}
                <div className="p-4 border-t border-slate-200 bg-slate-50/50 text-xs text-slate-500 flex items-center justify-between">
                    <span>Showing <strong>{filteredInquiries.length}</strong> of <strong>{inquiries.length}</strong> total inquiries</span>
                    <span>Connected to Supabase Leads Store</span>
                </div>

            </div>
        </div>
    );
}