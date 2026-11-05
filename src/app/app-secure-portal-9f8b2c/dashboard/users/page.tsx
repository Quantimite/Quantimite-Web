"use client";

import Link from "next/link";
import { Shield, Plus } from "lucide-react";

export default function UsersPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 p-8">
            <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
                <div>
                    <Link href="/app-secure-portal-9f8b2c/dashboard" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 mb-3">
                        ← Back to dashboard
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Users & Permissions</h1>
                    <p className="text-slate-600 mt-1">Manage portal access credentials and administrative roles.</p>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-500 transition-all inline-flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Admin
                </button>
            </div>

            <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Authorized Personnel</h2>
                <div className="space-y-4">
                    {[
                        { name: "dinuja_admin", email: "admin@quantimite.com", role: "Super Admin", status: "Active" },
                    ].map((admin, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-indigo-600" /> {admin.name}
                                </h3>
                                <p className="text-xs text-slate-500 mt-0.5">{admin.email} • Role: <strong>{admin.role}</strong></p>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {admin.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}