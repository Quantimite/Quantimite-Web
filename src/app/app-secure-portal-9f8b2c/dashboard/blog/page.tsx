"use client";

import Link from "next/link";
import { BookOpen, Plus, Edit3, Trash2 } from "lucide-react";

export default function BlogManagementPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 p-8">
            <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
                <div>
                    <Link href="/app-secure-portal-9f8b2c/dashboard" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 mb-3">
                        ← Back to dashboard
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Blog & Insights Management</h1>
                    <p className="text-slate-600 mt-1">Publish architectural articles, edit technical guides, and manage posts.</p>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-500 transition-all inline-flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Create New Post
                </button>
            </div>

            <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Published Articles</h2>
                <div className="space-y-4">
                    {[
                        { title: "Building High-Concurrency Backends with ASP.NET Core & C#", category: "Software Architecture", date: "Oct 24, 2026" },
                        { title: "Mastering Liquid Interface Design in Next.js", category: "UI/UX Systems", date: "Oct 12, 2026" },
                    ].map((post, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-indigo-500" /> {post.title}
                                </h3>
                                <p className="text-xs text-slate-500 mt-0.5">{post.category} • Published on {post.date}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
                                    <Edit3 className="w-4 h-4" />
                                </button>
                                <button className="p-2 bg-white border border-rose-200 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}