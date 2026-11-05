"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  X,
  GraduationCap,
} from "lucide-react";
import { JobPosting, Department, JobType, WorkMode } from "@/types/careers";

interface Props {
  jobs: JobPosting[];
}

const DEPARTMENTS: (Department | "All")[] = [
  "All",
  "Engineering",
  "Design",
  "Product",
  "Cloud & DevOps",
  "Growth & Marketing",
];

const JOB_TYPES: (JobType | "All")[] = [
  "All",
  "Full-time",
  "Internship",
  "Contract",
  "Part-time",
];

const WORK_MODES: (WorkMode | "All")[] = ["All", "Remote", "Hybrid", "Onsite"];

export default function OpenPositions({ jobs }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize filters from URL query parameters
  const initialDept = (searchParams.get("dept") as Department | "All") || "All";
  const initialType = (searchParams.get("type") as JobType | "All") || "All";
  const initialMode = (searchParams.get("mode") as WorkMode | "All") || "All";
  const initialQuery = searchParams.get("q") || "";

  const [selectedDept, setSelectedDept] = useState<Department | "All">(initialDept);
  const [selectedType, setSelectedType] = useState<JobType | "All">(initialType);
  const [selectedMode, setSelectedMode] = useState<WorkMode | "All">(initialMode);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<"newest" | "alpha">("newest");
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Load saved bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("qm_saved_jobs");
      if (saved) {
        setSavedJobIds(JSON.parse(saved));
      }
    } catch (e) {
      // ignore local storage errors
    }
  }, []);

  // Sync state to URL query params
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedDept !== "All") params.set("dept", selectedDept);
    if (selectedType !== "All") params.set("type", selectedType);
    if (selectedMode !== "All") params.set("mode", selectedMode);
    if (searchQuery.trim()) params.set("q", searchQuery.trim());

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    window.history.replaceState(null, "", newUrl);
  }, [selectedDept, selectedType, selectedMode, searchQuery]);

  const toggleSaveJob = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = savedJobIds.includes(id)
      ? savedJobIds.filter((item) => item !== id)
      : [...savedJobIds, id];
    setSavedJobIds(next);
    try {
      localStorage.setItem("qm_saved_jobs", JSON.stringify(next));
    } catch (err) {}
  };

  const clearAllFilters = () => {
    setSelectedDept("All");
    setSelectedType("All");
    setSelectedMode("All");
    setSearchQuery("");
    setShowSavedOnly(false);
  };

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    return jobs
      .filter((job) => {
        if (showSavedOnly && !savedJobIds.includes(job.id)) return false;
        if (selectedDept !== "All" && job.department !== selectedDept) return false;
        if (selectedType !== "All" && job.type !== selectedType) return false;
        if (selectedMode !== "All" && job.workMode !== selectedMode) return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = job.title.toLowerCase().includes(q);
          const matchDept = job.department.toLowerCase().includes(q);
          const matchSum = job.shortSummary.toLowerCase().includes(q);
          const matchLoc = job.location.toLowerCase().includes(q);
          return matchTitle || matchDept || matchSum || matchLoc;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "alpha") {
          return a.title.localeCompare(b.title);
        }
        // default newest
        return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime();
      });
  }, [jobs, selectedDept, selectedType, selectedMode, searchQuery, sortBy, showSavedOnly, savedJobIds]);

  return (
    <section id="open-positions" className="py-20 sm:py-28 bg-[#fbfaff]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-plum/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-violet">
              <Briefcase className="h-3.5 w-3.5" />
              <span>CURRENT OPPORTUNITIES</span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-5xl font-black tracking-tight text-plum">
              Open positions.
            </h2>
            <p className="mt-2 text-sm text-plum/70 font-light">
              Filter by department, work mode, or search for your specialty.
            </p>
          </div>

          {/* Bookmarked / Saved Jobs Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                showSavedOnly
                  ? "bg-violet text-white shadow-xs"
                  : "border border-plum/15 bg-white text-plum hover:bg-mist"
              }`}
            >
              <Bookmark className="h-3.5 w-3.5" />
              <span>Saved Roles ({savedJobIds.length})</span>
            </button>
          </div>
        </div>

        {/* STICKY FILTER BAR */}
        <div className="sticky top-16 z-30 mt-6 rounded-2xl border border-plum/10 bg-white/90 p-4 shadow-md backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-plum/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search job title, tech stack, keyword..."
                className="w-full rounded-full border border-plum/15 bg-white py-2 pl-10 pr-9 text-xs text-plum placeholder-plum/40 outline-none transition focus:border-violet focus:ring-2 focus:ring-violet/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-plum/40 hover:text-plum"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Department Dropdown */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value as any)}
                className="rounded-full border border-plum/15 bg-white px-3.5 py-2 text-xs font-semibold text-plum outline-none focus:border-violet cursor-pointer"
                aria-label="Filter by department"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === "All" ? "All Departments" : dept}
                  </option>
                ))}
              </select>

              {/* Type Dropdown */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="rounded-full border border-plum/15 bg-white px-3.5 py-2 text-xs font-semibold text-plum outline-none focus:border-violet cursor-pointer"
                aria-label="Filter by job type"
              >
                {JOB_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type === "All" ? "All Types" : type}
                  </option>
                ))}
              </select>

              {/* Work Mode Dropdown */}
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value as any)}
                className="rounded-full border border-plum/15 bg-white px-3.5 py-2 text-xs font-semibold text-plum outline-none focus:border-violet cursor-pointer"
                aria-label="Filter by work mode"
              >
                {WORK_MODES.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode === "All" ? "All Locations" : mode}
                  </option>
                ))}
              </select>

              {/* Sort Order */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-full border border-plum/15 bg-white px-3.5 py-2 text-xs font-semibold text-plum outline-none focus:border-violet cursor-pointer"
                aria-label="Sort jobs"
              >
                <option value="newest">Sort: Newest</option>
                <option value="alpha">Sort: A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Status / Count Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between text-xs font-semibold text-plum/60 px-1">
          <span>
            Showing <strong className="text-plum">{filteredJobs.length}</strong>{" "}
            {filteredJobs.length === 1 ? "position" : "positions"}
          </span>

          {(selectedDept !== "All" ||
            selectedType !== "All" ||
            selectedMode !== "All" ||
            searchQuery ||
            showSavedOnly) && (
            <button
              onClick={clearAllFilters}
              className="text-violet hover:underline font-bold"
            >
              Clear all filters [x]
            </button>
          )}
        </div>

        {/* JOB CARDS LIST */}
        <div className="mt-8 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredJobs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-3xl border border-dashed border-plum/20 bg-white/80 p-10 sm:p-14 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-700">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-extrabold text-plum">
                  Currently no active opportunities available for interns and jobs
                </h3>
                <p className="mt-2 text-sm text-plum/70 max-w-md mx-auto leading-relaxed">
                  All engineering pods and student internship seats are currently at full capacity. We invite you to join our general talent pool so our founding partners can reach out when a new seat unlocks.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button onClick={clearAllFilters} className="btn-outline rounded-full px-5 py-2.5 text-xs font-semibold cursor-pointer">
                    Reset filters
                  </button>
                  <Link href="/careers/general" className="btn-fill rounded-full px-6 py-2.5 text-xs font-bold">
                    Join General Talent Pool
                  </Link>
                </div>
              </motion.div>
            ) : (
              filteredJobs.map((job, idx) => {
                const isSaved = savedJobIds.includes(job.id);
                const isNew = idx < 2; // Tag newest roles

                return (
                  <motion.article
                    key={job.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    className="group relative flex flex-col md:flex-row md:items-center justify-between rounded-2xl border border-plum/10 bg-white p-6 sm:p-7 shadow-xs transition-all hover:border-violet/40 hover:shadow-md"
                  >
                    <div className="flex-1 pr-4">
                      {/* Meta Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="badge badge-primary font-bold">
                          {job.department}
                        </span>
                        <span className="badge font-semibold">
                          {job.type}
                        </span>
                        <span className="badge font-semibold flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-plum/50" />
                          {job.workMode}
                        </span>
                        {isNew && (
                          <span className="rounded-full bg-emerald-500/10 text-emerald-700 px-2.5 py-0.5 text-[11px] font-bold">
                            NEW
                          </span>
                        )}
                        {job.isInternship && (
                          <span className="rounded-full bg-azure/10 text-azure px-2.5 py-0.5 text-[11px] font-bold flex items-center gap-1">
                            <GraduationCap className="h-3 w-3" />
                            INTERNSHIP
                          </span>
                        )}
                      </div>

                      {/* Job Title */}
                      <h3 className="mt-3 text-xl sm:text-2xl font-extrabold text-plum group-hover:text-violet transition-colors">
                        <Link href={`/careers/${job.slug}`}>
                          {job.title}
                        </Link>
                      </h3>

                      {/* Short summary */}
                      <p className="mt-2 text-xs sm:text-sm text-plum/70 line-clamp-2 max-w-2xl leading-relaxed">
                        {job.shortSummary}
                      </p>

                      {/* Meta details footer */}
                      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-plum/60">
                        {job.salaryRange && (
                          <span className="font-semibold text-plum">
                            {job.salaryRange}
                          </span>
                        )}
                        <span>{job.location}</span>
                        <span>Posted {job.datePosted}</span>
                      </div>
                    </div>

                    {/* Right Action buttons */}
                    <div className="mt-5 md:mt-0 flex items-center gap-3 shrink-0">
                      <button
                        onClick={(e) => toggleSaveJob(job.id, e)}
                        className={`grid h-10 w-10 place-items-center rounded-full border transition-all cursor-pointer ${
                          isSaved
                            ? "border-violet bg-violet/10 text-violet"
                            : "border-plum/15 text-plum/50 hover:border-plum hover:text-plum"
                        }`}
                        title={isSaved ? "Remove from saved" : "Save this job"}
                        aria-label={isSaved ? "Remove from saved" : "Save this job"}
                      >
                        {isSaved ? (
                          <BookmarkCheck className="h-4 w-4" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </button>

                      <Link
                        href={`/careers/${job.slug}`}
                        className="btn-fill flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-bold"
                      >
                        <span>View Role</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </motion.article>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
