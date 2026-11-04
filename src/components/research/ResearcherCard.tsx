"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  UserCheck,
  Sparkles,
  Award,
  ExternalLink,
  BookOpen,
  Mail,
  GraduationCap,
  FileText,
  CheckCircle2,
  Share2,
  Clock,
  ArrowRight,
  Shield,
  Layers,
} from "lucide-react";
import { ResearcherSlot } from "@/types/research";

export interface PopulatedResearcherData {
  name?: string;
  avatarUrl?: string;
  initials?: string;
  bio?: string;
  scholarUrl?: string;
  orcidId?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  email?: string;
  recentPapers?: { title: string; year: number; doi?: string }[];
}

interface ResearcherCardProps {
  slot: ResearcherSlot;
  index: number;
  populatedData?: PopulatedResearcherData;
}

export default function ResearcherCard({
  slot,
  index,
  populatedData,
}: ResearcherCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isPopulated = Boolean(populatedData?.name);

  // Status badge styling helper
  const getStatusBadge = (status: ResearcherSlot["status"]) => {
    switch (status) {
      case "Recruiting / Open":
        return {
          bg: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
          dot: "bg-emerald-500 animate-pulse",
          label: "Recruiting / Open",
        };
      case "Nomination Pending":
        return {
          bg: "bg-amber-500/10 text-amber-700 border-amber-500/20",
          dot: "bg-amber-500",
          label: "Nomination Pending",
        };
      case "Reserved Fellow Slot":
      default:
        return {
          bg: "bg-azure/10 text-azure border-azure/20",
          dot: "bg-azure",
          label: "Reserved Fellow Slot",
        };
    }
  };

  const statusInfo = getStatusBadge(slot.status);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 32, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border transition-all duration-300 ${
        isPopulated
          ? "border-plum/10 bg-white p-6 shadow-sm hover:-translate-y-1 hover:border-violet/30 hover:shadow-xl sm:p-7"
          : "border-2 border-dashed border-plum/20 bg-white/70 p-6 backdrop-blur-md hover:-translate-y-1 hover:border-violet/50 hover:bg-white/95 hover:shadow-xl hover:shadow-violet/10 sm:p-7"
      }`}
    >
      <div>
        {/* ======================================================== */}
        {/* WIREFRAME AVATAR BOX & RESERVED SLOT HEADER               */}
        {/* ======================================================== */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-dashed border-plum/25 bg-gradient-to-br from-mist via-white to-mist/60 shadow-inner">
          {/* Subtle background technical grid pattern */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-grid-pattern opacity-60"
          />

          {/* Technical crosshairs on the four wireframe corners */}
          <span className="pointer-events-none absolute left-2 top-2 font-mono text-[10px] text-plum/30 select-none">
            +
          </span>
          <span className="pointer-events-none absolute right-2 top-2 font-mono text-[10px] text-plum/30 select-none">
            +
          </span>
          <span className="pointer-events-none absolute bottom-2 left-2 font-mono text-[10px] text-plum/30 select-none">
            +
          </span>
          <span className="pointer-events-none absolute bottom-2 right-2 font-mono text-[10px] text-plum/30 select-none">
            +
          </span>

          {/* Wireframe Silhouette & Slot Indicators */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none">
            {isPopulated && populatedData?.avatarUrl ? (
              // Populated Avatar Image
              <div className="relative h-28 w-28 overflow-hidden rounded-2xl border-2 border-white shadow-lg">
                <img
                  src={populatedData.avatarUrl}
                  alt={populatedData.name || "Researcher"}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              // Wireframe Placeholder Box Silhouette
              <div className="relative flex flex-col items-center justify-center">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-dashed border-plum/25 bg-white/60 text-plum/40 shadow-sm backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 group-hover:border-violet group-hover:text-violet">
                  <GraduationCap className="h-9 w-9 stroke-[1.4]" />
                  {/* Concentric subtle wireframe radar ring */}
                  <div className="absolute -inset-2 rounded-3xl border border-dashed border-plum/10 opacity-70 group-hover:border-violet/30" />
                </div>

                <div className="mt-3.5 flex flex-col items-center">
                  <span className="font-mono text-[11px] font-bold tracking-wider text-plum/80 uppercase">
                    [ Wireframe Avatar Box ]
                  </span>
                  <span className="mt-0.5 text-[10px] text-plum/45">
                    Slot #{String(index + 1).padStart(2, "0")} • 400×400px Photo / 3D Asset
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Top-Left Slot Badge */}
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center gap-1 rounded-full border border-plum/10 bg-white/90 px-2.5 py-1 text-[11px] font-bold text-plum/80 shadow-2xs backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-violet" />
              Fellowship Slot #{index + 1}
            </span>
          </div>

          {/* Top-Right Status Badge */}
          <div className="absolute right-3 top-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md shadow-2xs ${statusInfo.bg}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${statusInfo.dot}`} />
              {statusInfo.label}
            </span>
          </div>

          {/* Bottom Department Banner */}
          <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-center">
            <span className="rounded-lg border border-plum/10 bg-white/85 px-3 py-1 font-mono text-[10px] font-semibold text-plum/70 shadow-2xs backdrop-blur-md">
              {slot.department}
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RESEARCHER IDENTITY & ROLE SLOTS                         */}
        {/* ======================================================== */}
        <div className="mt-6">
          <div className="flex items-center gap-2">
            <span className="inline-block rounded-md bg-plum/5 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wide text-plum/60 uppercase">
              {slot.domain}
            </span>
          </div>

          <h3 className="mt-2.5 text-xl font-bold tracking-tight text-plum transition-colors group-hover:text-violet">
            {slot.role}
          </h3>

          {/* Name / Reserved Slot Identifier */}
          <div className="mt-1 flex items-center gap-1.5">
            <UserCheck className="h-4 w-4 text-violet/70" />
            <p className="text-sm font-semibold text-plum/80">
              {isPopulated
                ? populatedData?.name
                : "[ Reserved Scholar Slot — Candidate TBD ]"}
            </p>
          </div>

          {/* Research Scope & Description */}
          <p className="mt-3 text-xs leading-relaxed text-plum/70">
            {slot.description}
          </p>

          {/* ======================================================== */}
          {/* EXPECTED QUALIFICATIONS / RESEARCH FOCUS PILLARS         */}
          {/* ======================================================== */}
          <div className="mt-4">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-plum/50">
              Target Specialization & Prerequisites:
            </span>
            <ul className="mt-2 space-y-1.5">
              {slot.expectedQualifications.map((qualification, qIdx) => (
                <li
                  key={qIdx}
                  className="flex items-start gap-2 text-xs text-plum/75"
                >
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet" />
                  <span>{qualification}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ======================================================== */}
          {/* RESERVED SLOTS FOR FUTURE ADDITION                       */}
          {/* (Publications, Citations, Lab Assets)                    */}
          {/* ======================================================== */}
          <div className="mt-5 space-y-2">
            {/* Slot: Publications & Papers */}
            <div className="rounded-xl border border-dashed border-plum/20 bg-mist/60 p-3 text-[11px]">
              <div className="flex items-center justify-between text-plum/70">
                <span className="flex items-center gap-1.5 font-semibold">
                  <FileText className="h-3.5 w-3.5 text-violet" />
                  [ Slot: Publications & Preprints ]
                </span>
                <span className="font-mono text-[10px] text-plum/40">
                  Ready for DOI links
                </span>
              </div>
              <p className="mt-1 text-[11px] text-plum/55">
                Reserved space for peer-reviewed papers, ArXiv submissions, and conference proceedings.
              </p>
            </div>

            {/* Slot: Academic & Open Source Profiles */}
            <div className="rounded-xl border border-dashed border-plum/20 bg-white/80 p-3 text-[11px]">
              <div className="flex items-center justify-between text-plum/70">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Share2 className="h-3.5 w-3.5 text-azure" />
                  [ Slot: Academic & Code Profiles ]
                </span>
                <span className="font-mono text-[10px] text-plum/40">
                  ORCID • Scholar • GitHub
                </span>
              </div>
              {/* Wireframe Social Link Badges */}
              <div className="mt-2 flex items-center gap-2 text-plum/40">
                <span className="inline-flex items-center gap-1 rounded-md border border-dashed border-plum/20 px-2 py-0.5 text-[10px]">
                  ORCID iD
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-dashed border-plum/20 px-2 py-0.5 text-[10px]">
                  Google Scholar
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-dashed border-plum/20 px-2 py-0.5 text-[10px]">
                  GitHub Repos
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* BOTTOM ACTION SLOTS                                      */}
      {/* ======================================================== */}
      <div className="mt-6 border-t border-plum/10 pt-4">
        <div className="flex items-center justify-between gap-3">
          <Link
            href={`/contact?subject=${encodeURIComponent(
              `Research Fellowship Inquiry - ${slot.role}`
            )}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-plum/5 px-4 py-2 text-xs font-bold text-plum transition-all hover:bg-violet hover:text-white"
          >
            <span>Nominate / Inquire</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <span className="font-mono text-[10px] font-medium text-plum/45">
            Ref: {slot.id}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
