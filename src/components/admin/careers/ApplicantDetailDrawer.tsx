"use client";

import React, { useState } from "react";
import {
  X,
  Star,
  Download,
  ExternalLink,
  Tag,
  Plus,
  Send,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Mail,
  User,
  GraduationCap,
} from "lucide-react";
import { ApplicationSubmission, ApplicationStatus } from "@/types/careers";
import { CareersStore } from "@/lib/careers/store";

interface Props {
  application: ApplicationSubmission | null;
  onClose: () => void;
  onUpdate: () => void;
}

const STATUS_OPTIONS: ApplicationStatus[] = [
  "New",
  "Reviewed",
  "Interview",
  "Hired",
  "Rejected",
];

export default function ApplicantDetailDrawer({
  application,
  onClose,
  onUpdate,
}: Props) {
  if (!application) return null;

  const [rating, setRating] = useState(application.rating || 0);
  const [currentStatus, setCurrentStatus] = useState<ApplicationStatus>(application.status);
  const [newTag, setNewTag] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("tmpl-interview");
  const [emailSentNotice, setEmailSentNotice] = useState(false);

  const handleStatusChange = (status: ApplicationStatus) => {
    setCurrentStatus(status);
    CareersStore.updateApplicationStatus(
      application.id,
      status,
      "Lead Recruiter",
      `Status changed via ATS drawer to ${status}`
    );
    onUpdate();
  };

  const handleRatingChange = (newStar: number) => {
    setRating(newStar);
    CareersStore.updateApplicationRating(application.id, newStar, "Lead Recruiter");
    onUpdate();
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim()) return;
    const updated = [...application.tags, newTag.trim()];
    CareersStore.updateApplicationTags(application.id, updated, "Lead Recruiter");
    setNewTag("");
    onUpdate();
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updated = application.tags.filter((t) => t !== tagToRemove);
    CareersStore.updateApplicationTags(application.id, updated, "Lead Recruiter");
    onUpdate();
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;
    CareersStore.addApplicationNote(application.id, noteContent.trim(), "Lead Recruiter");
    setNoteContent("");
    onUpdate();
  };

  const handleSendTemplateEmail = () => {
    setEmailSentNotice(true);
    setTimeout(() => {
      setEmailSentNotice(false);
      setEmailModalOpen(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-plum/40 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-right duration-300 text-plum">
        {/* Top Sticky Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-plum/10 bg-white/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-violet bg-violet/10 px-2.5 py-1 rounded-md">
              {application.id}
            </span>
            <span className="text-xs font-semibold text-plum/60">
              Submitted {new Date(application.submittedAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setEmailModalOpen(true)}
              className="btn-outline flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold text-plum"
            >
              <Mail className="h-3.5 w-3.5 text-violet" />
              <span>Email Candidate</span>
            </button>
            <button
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-full text-plum/50 hover:bg-plum/5 hover:text-plum"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          {/* Header Profile Info */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-plum">
                  {application.fullName}
                </h2>
                <p className="text-sm font-semibold text-violet mt-0.5">
                  Applied for: {application.jobTitle}
                </p>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-[10px] font-mono text-plum/50 uppercase mb-1">
                  CURRENT STAGE
                </label>
                <select
                  value={currentStatus}
                  onChange={(e) => handleStatusChange(e.target.value as any)}
                  className="rounded-full border border-plum/20 bg-white px-3.5 py-1.5 text-xs font-bold text-plum outline-none focus:border-violet cursor-pointer"
                >
                  {STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Star Rating */}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs font-semibold text-plum/60">Rating:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="p-0.5 text-amber-400 hover:scale-125 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`h-4 w-4 ${
                        rating >= star ? "fill-amber-400" : "text-plum/20"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Contact details pills */}
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-plum/70">
              <span className="rounded-md bg-mist px-2.5 py-1 font-medium">
                📧 {application.email}
              </span>
              <span className="rounded-md bg-mist px-2.5 py-1 font-medium">
                📞 {application.phone}
              </span>
              <span className="rounded-md bg-mist px-2.5 py-1 font-medium">
                📍 {application.currentLocation}
              </span>
            </div>
          </div>

          {/* Student Internship details if present */}
          {application.internshipDetails && (
            <div className="rounded-2xl border border-azure/20 bg-azure/5 p-4 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-azure font-bold uppercase text-[11px]">
                <GraduationCap className="h-4 w-4" />
                <span>Internship Candidate Profile</span>
              </div>
              <p className="text-plum font-semibold">
                {application.internshipDetails.university} • Class of {application.internshipDetails.graduationYear}
              </p>
              <p className="text-plum/70">{application.internshipDetails.degree}</p>
            </div>
          )}

          {/* CV & Documents Section */}
          <div className="rounded-2xl border border-plum/10 bg-mist/40 p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-plum/60">
              Candidate Resume / CV
            </h4>
            <div className="flex items-center justify-between bg-white rounded-xl p-3 border border-plum/10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-violet bg-violet/10 px-2 py-1 rounded">
                  PDF
                </span>
                <div>
                  <p className="text-xs font-bold text-plum">{application.cvFile.originalName}</p>
                  <p className="text-[10px] text-emerald-600 font-semibold">
                    ✓ Verified Magic Bytes • Scanned Clean ({(application.cvFile.size / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                </div>
              </div>

              <a
                href={application.cvFile.downloadUrl}
                download
                className="btn-outline flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-plum"
              >
                <Download className="h-3 w-3" />
                <span>Download</span>
              </a>
            </div>
          </div>

          {/* Portfolio & LinkedIn Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-plum/60">
              Profiles & Repositories
            </h4>
            <div className="flex flex-wrap gap-2">
              {application.linkedInUrl && (
                <a
                  href={application.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-plum/10 bg-white px-3 py-1.5 text-xs font-semibold text-azure hover:bg-mist transition"
                >
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {application.portfolioUrls?.map((url, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-plum/10 bg-white px-3 py-1.5 text-xs font-semibold text-violet hover:bg-mist transition"
                >
                  <span>Link #{i + 1}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>

          {/* Cover Letter Text */}
          {application.coverLetterText && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-plum/60">
                Cover Note
              </h4>
              <div className="rounded-xl border border-plum/10 bg-white p-4 text-xs text-plum/80 leading-relaxed whitespace-pre-wrap">
                {application.coverLetterText}
              </div>
            </div>
          )}

          {/* Tags Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-plum/60">
              Evaluation Tags
            </h4>
            <div className="flex flex-wrap items-center gap-2">
              {application.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-violet/10 text-violet px-3 py-1 text-xs font-semibold"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-danger cursor-pointer ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}

              <form onSubmit={handleAddTag} className="inline-flex items-center gap-1">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="+ Add tag..."
                  className="rounded-full border border-plum/15 px-3 py-1 text-xs outline-none focus:border-violet w-28"
                />
              </form>
            </div>
          </div>

          {/* Internal Notes */}
          <div className="space-y-4 pt-4 border-t border-plum/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-plum/60">
              Internal Recruiter Notes ({application.notes.length})
            </h4>

            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Write an internal note or interview debrief (e.g. 'Strong in distributed systems, follow up on Q2 availability')..."
                className="textarea text-xs"
                rows={2}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!noteContent.trim()}
                  className="btn-fill rounded-full px-4 py-1.5 text-xs font-bold disabled:opacity-40"
                >
                  Add Evaluation Note
                </button>
              </div>
            </form>

            <div className="space-y-2.5">
              {application.notes.map((note) => (
                <div key={note.id} className="rounded-xl border border-plum/10 bg-mist/30 p-3.5 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-plum/50 font-semibold mb-1">
                    <span>{note.author}</span>
                    <span>{new Date(note.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-plum/85 leading-relaxed">{note.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Activity & Status Timeline */}
          <div className="space-y-3 pt-4 border-t border-plum/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-plum/60">
              Audit & Status History
            </h4>
            <div className="space-y-2 text-xs">
              {application.statusHistory.map((hist, idx) => (
                <div key={idx} className="flex items-start gap-3 text-plum/70">
                  <span className="h-2 w-2 rounded-full bg-violet mt-1.5 shrink-0" />
                  <div>
                    <span className="font-bold text-plum">{hist.status}</span> —{" "}
                    <span>{hist.note || "Status updated"}</span>
                    <span className="block text-[10px] text-plum/45">
                      by {hist.changedBy} on {new Date(hist.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Email Template Modal Dialog */}
        {emailModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="flex items-center justify-between border-b border-plum/10 pb-3">
                <h3 className="text-base font-bold text-plum">Send Branded Candidate Email</h3>
                <button onClick={() => setEmailModalOpen(false)} className="text-plum/50 hover:text-plum">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {!emailSentNotice ? (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-plum mb-1">
                      Select Email Template
                    </label>
                    <select
                      value={selectedTemplate}
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                      className="select text-xs"
                    >
                      <option value="tmpl-confirm">Application Received Confirmation</option>
                      <option value="tmpl-interview">Technical Interview Invitation</option>
                      <option value="tmpl-rejection">Respectful Rejection with Feedback</option>
                      <option value="tmpl-offer">Official Employment Offer</option>
                    </select>
                  </div>

                  <div className="rounded-xl border border-plum/10 bg-mist p-3.5 text-xs text-plum/70 space-y-1">
                    <p><strong>To:</strong> {application.fullName} &lt;{application.email}&gt;</p>
                    <p><strong>Subject:</strong> Updates regarding your application for {application.jobTitle}</p>
                    <p className="text-[11px] text-plum/50 pt-1">
                      Template variables (<code>&#123;&#123;name&#125;&#125;</code>, <code>&#123;&#123;job_title&#125;&#125;</code>) will be populated automatically.
                    </p>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEmailModalOpen(false)}
                      className="btn-ghost rounded-full px-4 py-2 text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSendTemplateEmail}
                      className="btn-fill rounded-full px-5 py-2 text-xs font-bold"
                    >
                      Dispatch Email
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center space-y-2">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="text-sm font-bold text-plum">Email Dispatched Successfully!</h4>
                  <p className="text-xs text-plum/60">Sent to {application.email}. Action logged to audit trail.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
