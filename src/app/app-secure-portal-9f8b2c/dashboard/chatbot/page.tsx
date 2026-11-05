"use client";

import Link from "next/link";
import { MessageSquare, Bot, User, Clock } from "lucide-react";

export default function ChatbotLogsPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 p-8">
      <div className="max-w-7xl mx-auto mb-8">
        <Link href="/app-secure-portal-9f8b2c/dashboard" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 mb-3">
          ← Back to dashboard
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Chatbot Logs & Analytics</h1>
        <p className="text-slate-600 mt-1">Review AI assistant interactions, user queries, and unresolved questions.</p>
      </div>

      <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-200 bg-slate-50/50 font-semibold text-slate-800">
          Recent Visitor Conversations
        </div>
        <div className="divide-y divide-slate-200">
          {[
            { user: "Visitor #4921", query: "What are your software engineering hourly rates?", time: "10 mins ago", status: "Resolved by AI" },
            { user: "Visitor #4920", query: "Can I book a consultation with the development team?", time: "45 mins ago", status: "Handed to CRM" },
          ].map((log, i) => (
            <div key={i} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{log.user}</div>
                  <p className="text-sm text-slate-600 mt-0.5">&ldquo;{log.query}&rdquo;</p>
                  <span className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" /> {log.time}
                  </span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}