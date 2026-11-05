"use client";

import Link from "next/link";
import { Folder, Plus, ExternalLink } from "lucide-react";

export default function PortfolioPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 p-8">
            <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
                <div>
                    <Link href="/app-secure-portal-9f8b2c/dashboard" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 mb-3">
                        ← Back to dashboard
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Portfolio & Case Studies</h1>
                    <p className="text-slate-600 mt-1">Showcase engineering projects, client success stories, and live web apps.</p>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-500 transition-all inline-flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Project
                </button>
            </div>

            <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Published Portfolio Items</h2>
                <div className="space-y-4">
                    {[
                        { title: "Quantimite Web Platform", category: "Full-Stack Architecture & WebGL", url: "https://quantimite.com" },
                        { title: "Meridian Talent Platform", category: "ASP.NET Core & React Microservices", url: "#" },
                        { title: "WanaJeevi Eco Platform", category: "Environmental Conservation Web App", url: "#" },
                    ].map((item, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                    <Folder className="w-4 h-4 text-indigo-500" /> {item.title}
                                </h3>
                                <p className="text-xs text-slate-500 mt-0.5">{item.category}</p>
                            </div>
                            <a href={item.url} target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5">
                                Visit <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}