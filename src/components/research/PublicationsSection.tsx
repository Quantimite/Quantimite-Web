"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Download,
  Calendar,
  Clock,
  BookOpen,
  X,
  ChevronDown,
  ChevronUp,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Publication, ResearchTopic } from "@/types/research";
import { RESEARCH_TOPICS } from "@/lib/research-data";
import DownloadGateModal from "./DownloadGateModal";
import { ScrollTextHeading, ScrollTextFade } from "@/components/ui/ScrollText";

interface Props {
  publications: Publication[];
}

const YEARS = ["All", "2026", "2025", "2024"] as const;

export default function PublicationsSection({ publications }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<ResearchTopic | "All">("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  // Email gating modal state
  const [gatedPublication, setGatedPublication] = useState<Publication | null>(null);
  const [unlockedSlugs, setUnlockedSlugs] = useState<Set<string>>(new Set());

  const filteredPublications = useMemo(() => {
    return publications.filter((pub) => {
      const matchesTopic =
        selectedTopic === "All" || pub.topic === selectedTopic;
      const matchesYear =
        selectedYear === "All" || pub.year.toString() === selectedYear;

      if (!searchQuery.trim()) return matchesTopic && matchesYear;

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        pub.title.toLowerCase().includes(q) ||
        pub.summary.toLowerCase().includes(q) ||
        pub.abstract.toLowerCase().includes(q) ||
        pub.tags.some((t) => t.toLowerCase().includes(q)) ||
        (pub.doi && pub.doi.toLowerCase().includes(q));

      return matchesTopic && matchesYear && matchesSearch;
    });
  }, [publications, selectedTopic, selectedYear, searchQuery]);

  const handleDownload = (pub: Publication) => {
    // If not gated or already unlocked, trigger download
    if (!pub.isGated || unlockedSlugs.has(pub.slug)) {
      if (pub.pdfUrl) {
        const link = document.createElement("a");
        link.href = pub.pdfUrl;
        link.setAttribute("download", `${pub.slug}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      return;
    }

    setGatedPublication(pub);
  };

  const handleGateSuccess = (pub: Publication) => {
    setUnlockedSlugs((prev) => new Set([...prev, pub.slug]));
  };

  return (
    <section id="publications" className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      {/* Section Header with Scroll in-and-out */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <ScrollTextFade
            as="span"
            delay={0.05}
            className="text-xs font-bold uppercase tracking-wider text-violet block"
          >
            Academic Works & Technical Reports
          </ScrollTextFade>

          <ScrollTextHeading
            as="h2"
            delay={0.1}
            className="mt-2 text-3xl font-extrabold tracking-tight text-plum sm:text-5xl"
          >
            Publications & Whitepapers
          </ScrollTextHeading>

          <ScrollTextFade
            as="p"
            delay={0.2}
            className="mt-2 text-sm text-plum/70 sm:text-base max-w-2xl"
          >
            Explore our open-access papers, benchmark studies, and enterprise implementation whitepapers.
          </ScrollTextFade>
        </div>

        {/* Live Search */}
        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-plum/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers, DOI, or keywords..."
            className="w-full rounded-full border border-plum/15 bg-white/90 py-2.5 pl-10 pr-9 text-sm text-plum shadow-xs outline-none transition placeholder:text-plum/40 focus:border-violet focus:ring-2 focus:ring-violet/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-plum/40 hover:text-plum"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mt-8 flex flex-col gap-4 border-b border-plum/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Topic Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-plum/50 mr-2">Topic:</span>
          <button
            onClick={() => setSelectedTopic("All")}
            className={`filter-chip ${
              selectedTopic === "All" ? "filter-chip-active" : ""
            }`}
          >
            All Topics
          </button>
          {RESEARCH_TOPICS.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`filter-chip ${
                selectedTopic === topic ? "filter-chip-active" : ""
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Year Filters */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-plum/50 mr-1">Year:</span>
          {YEARS.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                selectedYear === year
                  ? "bg-plum text-white shadow-xs"
                  : "border border-plum/10 bg-white/70 text-plum/70 hover:bg-white hover:text-plum"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="mt-4 flex items-center justify-between text-xs font-medium text-plum/60">
        <span>
          Showing <strong className="text-plum">{filteredPublications.length}</strong>{" "}
          {filteredPublications.length === 1 ? "publication" : "publications"}
        </span>
        {(selectedTopic !== "All" || selectedYear !== "All" || searchQuery) && (
          <button
            onClick={() => {
              setSelectedTopic("All");
              setSelectedYear("All");
              setSearchQuery("");
            }}
            className="text-violet hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Publication Cards List */}
      <div className="mt-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredPublications.map((pub) => {
            const isExpanded = expandedSlug === pub.slug;
            const isUnlocked = unlockedSlugs.has(pub.slug);

            return (
              <motion.article
                layout
                key={pub.slug}
                initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.55 }}
                className="glass-card overflow-hidden rounded-3xl p-6 sm:p-8"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    {/* Metadata Header */}
                    <div className="flex flex-wrap items-center gap-2.5 text-xs">
                      <span className="rounded-full bg-brand px-3 py-1 font-bold text-white">
                        {pub.topic}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-plum/50">
                        <Calendar className="h-3.5 w-3.5" />
                        {pub.date}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-plum/50">
                        <Clock className="h-3.5 w-3.5" />
                        {pub.readTime}
                      </span>
                      {pub.doi && (
                        <span className="rounded-md bg-plum/5 px-2 py-0.5 font-mono text-[11px] text-plum/60">
                          DOI: {pub.doi}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="mt-3 text-xl font-extrabold tracking-tight text-plum sm:text-2xl">
                      <Link
                        href={`/research/${pub.slug}`}
                        className="transition hover:text-violet"
                      >
                        {pub.title}
                      </Link>
                    </h3>

                    {/* Summary */}
                    <p className="mt-2 text-sm leading-relaxed text-plum/70 sm:text-base">
                      {pub.summary}
                    </p>

                    {/* Authors */}
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <span className="text-xs font-semibold text-plum/50">
                        Authors:
                      </span>
                      {pub.authors.map((author, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 rounded-lg border border-dashed border-plum/20 bg-plum/[0.02] px-2.5 py-1 text-xs font-semibold text-plum/80"
                        >
                          {author.name}
                          <span className="text-[10px] text-plum/40 font-normal">
                            ({author.role})
                          </span>
                        </span>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {pub.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-plum/[0.03] px-2 py-0.5 text-[11px] font-medium text-plum/60"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="flex flex-row flex-wrap items-center gap-2.5 lg:flex-col lg:items-end">
                    <button
                      onClick={() => handleDownload(pub)}
                      className="btn-fill flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold shadow-xs"
                    >
                      {!isUnlocked && pub.isGated ? (
                        <>
                          <Lock className="h-3.5 w-3.5" />
                          <span>Download Whitepaper ({pub.fileSize})</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-3.5 w-3.5" />
                          <span>Download PDF ({pub.fileSize})</span>
                        </>
                      )}
                    </button>

                    <Link
                      href={`/research/${pub.slug}`}
                      className="btn-outline flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold text-plum hover:text-violet"
                    >
                      <span>Read Paper Detail</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>

                    <button
                      onClick={() =>
                        setExpandedSlug(isExpanded ? null : pub.slug)
                      }
                      className="flex items-center gap-1 text-xs font-semibold text-plum/60 hover:text-plum mt-1"
                    >
                      <span>{isExpanded ? "Hide Abstract" : "Quick Abstract"}</span>
                      {isExpanded ? (
                        <ChevronUp className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Abstract Section */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 border-t border-plum/10 pt-4"
                  >
                    <h4 className="text-xs font-bold uppercase tracking-wider text-plum/50">
                      Abstract
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-plum/80 sm:text-sm">
                      {pub.abstract}
                    </p>
                  </motion.div>
                )}
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Download Gate Modal */}
      {gatedPublication && (
        <DownloadGateModal
          publication={gatedPublication}
          onClose={() => setGatedPublication(null)}
          onSuccess={() => handleGateSuccess(gatedPublication)}
        />
      )}
    </section>
  );
}
