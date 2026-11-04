"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  Share2,
  Copy,
  Check,
  BookOpen,
  FileText,
  Lock,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { Publication } from "@/types/research";
import DownloadGateModal from "./DownloadGateModal";
import { ScrollTextHeading, ScrollTextFade } from "@/components/ui/ScrollText";

interface Props {
  publication: Publication;
}

export default function WhitepaperDetail({ publication }: Props) {
  const [copiedBibtex, setCopiedBibtex] = useState(false);
  const [showGateModal, setShowGateModal] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(!publication.isGated);

  const handleCopyBibtex = () => {
    if (!publication.citationBibtex) return;
    navigator.clipboard.writeText(publication.citationBibtex);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  const handleDownloadClick = () => {
    if (!isUnlocked && publication.isGated) {
      setShowGateModal(true);
    } else if (publication.pdfUrl) {
      window.open(publication.pdfUrl, "_blank");
    }
  };

  const handleUnlockSuccess = () => {
    setIsUnlocked(true);
    setShowGateModal(false);
    if (publication.pdfUrl) {
      window.open(publication.pdfUrl, "_blank");
    }
  };

  return (
    <>
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Navigation Breadcrumb */}
        <Link
          href="/research"
          className="inline-flex items-center gap-2 text-xs font-bold text-plum/60 transition hover:text-violet mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Research & Whitepapers</span>
        </Link>

        {/* Paper Header */}
        <div className="border-b border-plum/10 pb-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-violet/10 px-3 py-1 text-xs font-bold text-violet">
              {publication.topic}
            </span>
            {publication.doi && (
              <span className="rounded-full border border-plum/10 bg-white/70 px-3 py-1 font-mono text-xs text-plum/60">
                DOI: {publication.doi}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-plum/50">
              <Calendar className="h-3.5 w-3.5" />
              {publication.date}
            </span>
            <span className="flex items-center gap-1 text-xs text-plum/50">
              <Clock className="h-3.5 w-3.5" />
              {publication.readTime}
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-plum sm:text-4xl lg:text-5xl leading-tight">
            {publication.title}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-plum/75 sm:text-lg">
            {publication.summary}
          </p>

          {/* Authors */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {publication.authors.map((author, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-2xl border border-dashed border-plum/20 bg-plum/[0.02] px-4 py-2"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet/10 font-mono text-xs font-bold text-violet">
                  λ
                </div>
                <div>
                  <div className="text-xs font-bold text-plum">{author.name}</div>
                  <div className="text-[11px] text-plum/60">
                    {author.role} • {author.affiliation}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={handleDownloadClick}
              className="btn-fill flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-bold shadow-md"
            >
              {!isUnlocked && publication.isGated ? (
                <>
                  <Lock className="h-4 w-4" />
                  <span>Download Whitepaper ({publication.fileSize})</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  <span>Download PDF Document ({publication.fileSize})</span>
                </>
              )}
            </button>

            {publication.citationBibtex && (
              <button
                onClick={handleCopyBibtex}
                className="btn-outline flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold text-plum"
              >
                {copiedBibtex ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>BibTeX Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy BibTeX Citation</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Abstract Section */}
        <section className="mt-10">
          <ScrollTextFade as="h2" className="text-sm font-bold uppercase tracking-wider text-plum/50">
            Executive Abstract
          </ScrollTextFade>
          <ScrollTextFade as="div" delay={0.1} className="mt-3 rounded-2xl border border-plum/10 bg-plum/[0.02] p-6 text-sm leading-relaxed text-plum/80 sm:text-base">
            <p>{publication.abstract}</p>
          </ScrollTextFade>
        </section>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          {publication.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-plum/10 bg-white px-3 py-1 text-xs font-medium text-plum/70"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* BibTeX Citation Block */}
        {publication.citationBibtex && (
          <section className="mt-10">
            <div className="flex items-center justify-between">
              <ScrollTextFade as="h2" className="text-sm font-bold uppercase tracking-wider text-plum/50">
                BibTeX Citation
              </ScrollTextFade>
              <button
                onClick={handleCopyBibtex}
                className="text-xs font-bold text-violet hover:underline flex items-center gap-1"
              >
                {copiedBibtex ? "Copied to clipboard!" : "Copy code"}
              </button>
            </div>
            <pre className="mt-3 overflow-x-auto rounded-2xl border border-plum/10 bg-plum p-5 font-mono text-xs text-white/90">
              <code>{publication.citationBibtex}</code>
            </pre>
          </section>
        )}

        {/* Bottom CTA with bidirectional scroll in and out */}
        <div className="mt-16 rounded-3xl border border-plum/15 bg-gradient-to-r from-plum/5 via-violet/5 to-plum/5 p-8 text-center">
          <ScrollTextHeading as="h3" className="text-xl font-bold text-plum">
            Interested in citing or expanding this research?
          </ScrollTextHeading>
          <ScrollTextFade as="p" delay={0.1} className="mx-auto mt-2 max-w-lg text-xs sm:text-sm text-plum/70">
            Our authors and laboratory fellows welcome collaborative inquiries, dataset requests,
            and peer review exchanges.
          </ScrollTextFade>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/research#collaborate"
              className="btn-fill rounded-xl px-5 py-2.5 text-xs font-bold"
            >
              Submit Research Collaboration
            </Link>
            <Link
              href="/contact"
              className="btn-outline rounded-xl px-5 py-2.5 text-xs font-bold text-plum"
            >
              Contact Research Team
            </Link>
          </div>
        </div>
      </div>

      {/* Email Gating Modal */}
      {showGateModal && (
        <DownloadGateModal
          publication={publication}
          onClose={() => setShowGateModal(false)}
          onSuccess={handleUnlockSuccess}
        />
      )}
    </>
  );
}
