"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Edit2,
  Copy,
  Trash2,
  CheckCircle2,
  Lock,
  Globe,
  X,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { JobPosting, Department, JobType, WorkMode, JobStatus } from "@/types/careers";
import { CareersStore } from "@/lib/careers/store";

interface Props {
  jobs: JobPosting[];
  onUpdate: () => void;
}

export default function JobManagementTable({ jobs, onUpdate }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [department, setDepartment] = useState<Department>("Engineering");
  const [type, setType] = useState<JobType>("Full-time");
  const [location, setLocation] = useState("Remote (Global)");
  const [workMode, setWorkMode] = useState<WorkMode>("Remote");
  const [salaryRange, setSalaryRange] = useState("$90,000 – $130,000 USD");
  const [shortSummary, setShortSummary] = useState("");
  const [responsibilitiesText, setResponsibilitiesText] = useState("");
  const [requirementsText, setRequirementsText] = useState("");
  const [status, setStatus] = useState<JobStatus>("Published");

  const openCreateModal = () => {
    setEditingJob(null);
    setTitle("");
    setSlug("");
    setDepartment("Engineering");
    setType("Full-time");
    setLocation("Remote (Global)");
    setWorkMode("Remote");
    setSalaryRange("$90,000 – $130,000 USD");
    setShortSummary("");
    setResponsibilitiesText("Build high-performance web systems.\nCollaborate on architecture teardowns.");
    setRequirementsText("3+ years experience with TypeScript.\nStrong understanding of modern web standards.");
    setStatus("Published");
    setModalOpen(true);
  };

  const openEditModal = (job: JobPosting) => {
    setEditingJob(job);
    setTitle(job.title);
    setSlug(job.slug);
    setDepartment(job.department);
    setType(job.type);
    setLocation(job.location);
    setWorkMode(job.workMode);
    setSalaryRange(job.salaryRange || "");
    setShortSummary(job.shortSummary);
    setResponsibilitiesText(job.responsibilities.join("\n"));
    setRequirementsText(job.requirements.join("\n"));
    setStatus(job.status);
    setModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingJob) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
      );
    }
  };

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) return;

    const respArray = responsibilitiesText
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    const reqArray = requirementsText
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (editingJob) {
      CareersStore.updateJob(editingJob.id, {
        title,
        slug,
        department,
        type,
        location,
        workMode,
        salaryRange,
        shortSummary,
        responsibilities: respArray,
        requirements: reqArray,
        status,
      });
    } else {
      const newJob: JobPosting = {
        id: "job-" + Math.random().toString(36).substring(2, 8),
        title,
        slug,
        department,
        type,
        location,
        workMode,
        salaryRange,
        shortSummary,
        description: `<p>${shortSummary}</p>`,
        responsibilities: respArray,
        requirements: reqArray,
        niceToHave: [],
        benefits: [
          "100% remote flexibility and home workstation stipend.",
          "$2,000 learning & conference allowance.",
          "Unlimited paid time off.",
        ],
        hiringProcess: [
          { step: "01", title: "Review", description: "Review of background and projects.", expectedTimeline: "48h" },
          { step: "02", title: "Conversation", description: "Technical discussion.", expectedTimeline: "3 days" },
          { step: "03", title: "Offer", description: "Offer rollout.", expectedTimeline: "24h" },
        ],
        datePosted: new Date().toISOString().slice(0, 10),
        validThrough: "2026-08-31",
        status,
        applicationCount: 0,
      };
      CareersStore.createJob(newJob);
    }

    setModalOpen(false);
    onUpdate();
  };

  const handleDuplicateJob = (job: JobPosting) => {
    const dup: JobPosting = {
      ...job,
      id: "job-" + Math.random().toString(36).substring(2, 8),
      slug: `${job.slug}-copy`,
      title: `${job.title} (Copy)`,
      status: "Draft",
      applicationCount: 0,
    };
    CareersStore.createJob(dup);
    onUpdate();
  };

  const handleToggleStatus = (job: JobPosting) => {
    const nextStatus = job.status === "Published" ? "Closed" : "Published";
    CareersStore.updateJob(job.id, { status: nextStatus });
    onUpdate();
  };

  const handleDeleteJob = (id: string) => {
    if (confirm("Are you sure you want to remove this job posting?")) {
      CareersStore.deleteJob(id);
      onUpdate();
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-plum/10 shadow-xs">
        <div>
          <h3 className="text-base font-bold text-plum">Job Postings Management</h3>
          <p className="text-xs text-plum/60">Create, edit, duplicate, and toggle public visibility of roles.</p>
        </div>

        <button
          onClick={openCreateModal}
          className="btn-fill flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Job</span>
        </button>
      </div>

      {/* Jobs Table */}
      <div className="rounded-2xl border border-plum/10 bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-plum/10 bg-mist/60 text-plum/60 font-mono text-[10px] uppercase">
                <th className="py-3 px-4">Role Title & Slug</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Type & Mode</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Apps</th>
                <th className="py-3 px-4">Closing</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-plum/5">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-mist/30 transition">
                  <td className="py-3 px-4">
                    <span className="font-bold text-plum block">{job.title}</span>
                    <span className="font-mono text-[11px] text-plum/50">/careers/{job.slug}</span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-plum">
                    {job.department}
                  </td>
                  <td className="py-3 px-4 text-plum/70">
                    {job.type} • {job.workMode}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        job.status === "Published"
                          ? "bg-emerald-100 text-emerald-800"
                          : job.status === "Closed"
                          ? "bg-plum/10 text-plum/60"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-violet">
                    {job.applicationCount || 0}
                  </td>
                  <td className="py-3 px-4 text-plum/60 font-mono text-[11px]">
                    {job.validThrough}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <Link
                        href={`/careers/${job.slug}`}
                        target="_blank"
                        className="p-1 text-plum/50 hover:text-violet"
                        title="View Live Page"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        onClick={() => handleToggleStatus(job)}
                        className="p-1 text-plum/50 hover:text-plum cursor-pointer"
                        title={job.status === "Published" ? "Close Role" : "Publish Role"}
                      >
                        {job.status === "Published" ? (
                          <Lock className="h-3.5 w-3.5" />
                        ) : (
                          <Globe className="h-3.5 w-3.5 text-emerald-600" />
                        )}
                      </button>
                      <button
                        onClick={() => openEditModal(job)}
                        className="p-1 text-plum/50 hover:text-plum cursor-pointer"
                        title="Edit Job"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDuplicateJob(job)}
                        className="p-1 text-plum/50 hover:text-azure cursor-pointer"
                        title="Duplicate Job"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-1 text-plum/50 hover:text-danger cursor-pointer"
                        title="Delete Job"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Job Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-plum/10 pb-3">
              <h3 className="text-lg font-bold text-plum">
                {editingJob ? "Edit Job Posting" : "Create New Job Posting"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-plum/50 hover:text-plum">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-plum mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Senior Backend Engineer"
                    className="input text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-plum mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="senior-backend-engineer"
                    className="input text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-plum mb-1">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value as any)}
                    className="select text-xs"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Product">Product</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="Growth & Marketing">Growth & Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-plum mb-1">Job Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="select text-xs"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-plum mb-1">Work Mode</label>
                  <select
                    value={workMode}
                    onChange={(e) => setWorkMode(e.target.value as any)}
                    className="select text-xs"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Onsite">Onsite</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-plum mb-1">Location Details</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Remote (Global / APAC)"
                    className="input text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-plum mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={salaryRange}
                    onChange={(e) => setSalaryRange(e.target.value)}
                    placeholder="e.g. $90,000 – $130,000 USD"
                    className="input text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-plum mb-1">Short Summary *</label>
                <textarea
                  required
                  value={shortSummary}
                  onChange={(e) => setShortSummary(e.target.value)}
                  placeholder="One or two sentences highlighting this role..."
                  className="textarea text-xs"
                  rows={2}
                />
              </div>

              <div>
                <label className="block font-bold text-plum mb-1">Responsibilities (One per line)</label>
                <textarea
                  value={responsibilitiesText}
                  onChange={(e) => setResponsibilitiesText(e.target.value)}
                  className="textarea text-xs font-mono"
                  rows={3}
                />
              </div>

              <div>
                <label className="block font-bold text-plum mb-1">Requirements (Must-have, One per line)</label>
                <textarea
                  value={requirementsText}
                  onChange={(e) => setRequirementsText(e.target.value)}
                  className="textarea text-xs font-mono"
                  rows={3}
                />
              </div>

              <div>
                <label className="block font-bold text-plum mb-1">Publish Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="select text-xs"
                >
                  <option value="Published">Published (Public)</option>
                  <option value="Draft">Draft (Internal Only)</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-plum/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-ghost rounded-full px-4 py-2 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-fill rounded-full px-6 py-2 text-xs font-bold"
                >
                  Save Job Posting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
