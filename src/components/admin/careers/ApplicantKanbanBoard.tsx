"use client";

import React, { useState, useMemo } from "react";
import {
  LayoutGrid,
  List,
  Search,
  Filter,
  Download,
  Star,
  Clock,
  ArrowRight,
  MoreVertical,
  CheckCircle2,
  Tag,
} from "lucide-react";
import { ApplicationSubmission, ApplicationStatus, JobPosting } from "@/types/careers";
import { CareersStore } from "@/lib/careers/store";

interface Props {
  applications: ApplicationSubmission[];
  jobs: JobPosting[];
  onSelectApplication: (app: ApplicationSubmission) => void;
  onUpdate: () => void;
}

const COLUMNS: { status: ApplicationStatus; title: string; color: string }[] = [
  { status: "New", title: "New Applications", color: "border-amber-500/30 bg-amber-50/30" },
  { status: "Reviewed", title: "Technical Review", color: "border-violet/30 bg-violet/5" },
  { status: "Interview", title: "Interview Stage", color: "border-azure/30 bg-azure/5" },
  { status: "Hired", title: "Offer / Hired", color: "border-emerald-500/30 bg-emerald-50/30" },
  { status: "Rejected", title: "Archived / Rejected", color: "border-plum/20 bg-plum/5" },
];

export default function ApplicantKanbanBoard({
  applications,
  jobs,
  onSelectApplication,
  onUpdate,
}: Props) {
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [selectedJobFilter, setSelectedJobFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedAppId, setDraggedAppId] = useState<string | null>(null);

  // Filter applications
  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      if (selectedJobFilter !== "All" && app.jobId !== selectedJobFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = app.fullName.toLowerCase().includes(q);
        const matchEmail = app.email.toLowerCase().includes(q);
        const matchRole = app.jobTitle.toLowerCase().includes(q);
        const matchTags = app.tags.some((t) => t.toLowerCase().includes(q));
        return matchName || matchEmail || matchRole || matchTags;
      }
      return true;
    });
  }, [applications, selectedJobFilter, searchQuery]);

  // Drag and drop handlers
  const handleDragStart = (id: string) => {
    setDraggedAppId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnColumn = (targetStatus: ApplicationStatus) => {
    if (!draggedAppId) return;
    CareersStore.updateApplicationStatus(
      draggedAppId,
      targetStatus,
      "Lead Recruiter",
      `Drag-and-drop moved candidate to ${targetStatus}`
    );
    setDraggedAppId(null);
    onUpdate();
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = [
      "Reference ID",
      "Full Name",
      "Email",
      "Phone",
      "Job Title",
      "Status",
      "Rating",
      "Tags",
      "Submitted Date",
    ];

    const rows = filteredApps.map((a) => [
      a.id,
      `"${a.fullName}"`,
      a.email,
      `"${a.phone}"`,
      `"${a.jobTitle}"`,
      a.status,
      a.rating || 0,
      `"${a.tags.join(", ")}"`,
      a.submittedAt,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `quantimite-candidates-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Control Bar: Filters, View Toggle, Export */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-plum/10 shadow-xs">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search */}
          <div className="relative min-w-[220px]">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-plum/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate or tag..."
              className="w-full rounded-full border border-plum/15 bg-white py-1.5 pl-9 pr-4 text-xs text-plum outline-none focus:border-violet"
            />
          </div>

          {/* Job Filter */}
          <select
            value={selectedJobFilter}
            onChange={(e) => setSelectedJobFilter(e.target.value)}
            className="rounded-full border border-plum/15 bg-white px-3 py-1.5 text-xs font-semibold text-plum outline-none focus:border-violet cursor-pointer"
          >
            <option value="All">All Job Postings</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title}
              </option>
            ))}
          </select>
        </div>

        {/* View Toggle & Export */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="btn-outline flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-plum"
            title="Export candidates to CSV"
          >
            <Download className="h-3.5 w-3.5 text-violet" />
            <span>Export CSV</span>
          </button>

          <div className="flex items-center rounded-full border border-plum/15 bg-mist p-0.5">
            <button
              onClick={() => setViewMode("kanban")}
              className={`p-1.5 rounded-full transition cursor-pointer ${
                viewMode === "kanban" ? "bg-white text-violet shadow-xs" : "text-plum/50 hover:text-plum"
              }`}
              title="Kanban Board View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-full transition cursor-pointer ${
                viewMode === "table" ? "bg-white text-violet shadow-xs" : "text-plum/50 hover:text-plum"
              }`}
              title="Table View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 1. KANBAN BOARD VIEW */}
      {viewMode === "kanban" ? (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start overflow-x-auto pb-6">
          {COLUMNS.map((col) => {
            const colApps = filteredApps.filter((a) => a.status === col.status);

            return (
              <div
                key={col.status}
                onDragOver={handleDragOver}
                onDrop={() => handleDropOnColumn(col.status)}
                className={`rounded-2xl border ${col.color} p-3.5 min-h-[480px] flex flex-col transition-colors`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 border-b border-plum/10">
                  <span className="text-xs font-bold text-plum">{col.title}</span>
                  <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-plum/70 shadow-2xs">
                    {colApps.length}
                  </span>
                </div>

                {/* Candidate Cards */}
                <div className="mt-3 space-y-3 flex-1">
                  {colApps.map((app) => (
                    <div
                      key={app.id}
                      draggable
                      onDragStart={() => handleDragStart(app.id)}
                      onClick={() => onSelectApplication(app)}
                      className="group rounded-xl border border-plum/10 bg-white p-3.5 shadow-2xs hover:border-violet/40 hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold text-violet">
                          {app.id}
                        </span>
                        {app.rating ? (
                          <div className="flex items-center gap-0.5 text-amber-400">
                            <Star className="h-3 w-3 fill-amber-400" />
                            <span className="text-[10px] font-bold text-plum">{app.rating}</span>
                          </div>
                        ) : null}
                      </div>

                      <h4 className="mt-1.5 text-sm font-bold text-plum group-hover:text-violet transition-colors">
                        {app.fullName}
                      </h4>

                      <p className="text-[11px] text-plum/60 truncate mt-0.5">
                        {app.jobTitle}
                      </p>

                      {/* Tags */}
                      {app.tags.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1">
                          {app.tags.slice(0, 2).map((t) => (
                            <span
                              key={t}
                              className="rounded bg-mist px-1.5 py-0.5 text-[9px] font-semibold text-plum/70"
                            >
                              {t}
                            </span>
                          ))}
                          {app.tags.length > 2 && (
                            <span className="text-[9px] text-plum/40">+{app.tags.length - 2}</span>
                          )}
                        </div>
                      )}

                      <div className="mt-3 pt-2 border-t border-plum/5 flex items-center justify-between text-[10px] text-plum/50">
                        <span>{new Date(app.submittedAt).toLocaleDateString()}</span>
                        <span className="group-hover:text-violet font-semibold flex items-center gap-0.5">
                          Profile <ArrowRight className="h-2.5 w-2.5" />
                        </span>
                      </div>
                    </div>
                  ))}

                  {colApps.length === 0 && (
                    <div className="h-28 rounded-xl border border-dashed border-plum/10 flex items-center justify-center text-center p-3 text-[11px] text-plum/40">
                      Drop candidate here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* 2. TABLE VIEW */
        <div className="rounded-2xl border border-plum/10 bg-white overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-plum/10 bg-mist/60 text-plum/60 font-mono text-[10px] uppercase">
                  <th className="py-3 px-4">Ref ID</th>
                  <th className="py-3 px-4">Candidate</th>
                  <th className="py-3 px-4">Role Applied</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-plum/5">
                {filteredApps.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => onSelectApplication(app)}
                    className="hover:bg-mist/30 transition cursor-pointer"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-violet">
                      {app.id}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-plum block">{app.fullName}</span>
                      <span className="text-[11px] text-plum/50">{app.email}</span>
                    </td>
                    <td className="py-3 px-4 text-plum font-medium">
                      {app.jobTitle}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          app.status === "Interview"
                            ? "bg-azure/10 text-azure"
                            : app.status === "Hired"
                            ? "bg-emerald-100 text-emerald-800"
                            : app.status === "Reviewed"
                            ? "bg-violet/10 text-violet"
                            : app.status === "Rejected"
                            ? "bg-plum/10 text-plum/60"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {app.rating ? (
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="h-3 w-3 fill-amber-400" />
                          <span>{app.rating}</span>
                        </div>
                      ) : (
                        <span className="text-plum/30">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-plum/70">
                      {app.currentLocation}
                    </td>
                    <td className="py-3 px-4 text-plum/60 font-mono text-[11px]">
                      {new Date(app.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="btn-outline px-3 py-1 rounded-full text-[11px]">
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
