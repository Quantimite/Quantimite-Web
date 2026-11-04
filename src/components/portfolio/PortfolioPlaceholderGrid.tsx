"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  PlusCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileCode2,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { ProjectCaseStudy, ProjectCategory } from "@/types/portfolio";
import { PROJECT_CATEGORIES } from "@/lib/portfolio-data";

interface Props {
  projects: ProjectCaseStudy[];
}

export default function PortfolioPlaceholderGrid({ projects }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;

      if (!searchQuery.trim()) return matchesCategory;

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(q) ||
        project.tagline.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q) ||
        project.concept.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="project-slots" className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      {/* Header with Title and Search Controls */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-violet">
            <Clock className="h-3.5 w-3.5" />
            <span>Active Deliverables & Upcoming Releases</span>
          </div>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-plum sm:text-4xl lg:text-5xl">
            Project Showcase & Reserved Slots
          </h2>
          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-plum/70 sm:text-base">
            Our latest production case studies are currently in deployment or under confidentiality
            review. Below are reserved showcase slots prepared for upcoming technical reveals.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-plum/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search category or slot..."
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

      {/* Filter Chips */}
      <div className="mt-8 flex flex-wrap items-center gap-2 pb-2">
        <span className="mr-2 inline-flex items-center gap-1.5 text-xs font-semibold text-plum/50">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Category Filter:
        </span>
        {PROJECT_CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`filter-chip ${isActive ? "filter-chip-active" : ""}`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Results Count & Status Banner */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-plum/60">
        <span>
          Showing <strong className="text-plum">{filteredProjects.length}</strong> reserved{" "}
          {filteredProjects.length === 1 ? "project slot" : "project slots"}
        </span>
        {(selectedCategory !== "All" || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="text-violet hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Blank Spaces & Wireframe Boxes Grid */}
      <motion.div
        layout
        className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.article
              layout
              key={project.slug}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border-2 border-dashed border-plum/15 bg-white/70 p-6 backdrop-blur-md transition-all duration-300 hover:border-violet/50 hover:bg-white/95 hover:shadow-xl hover:shadow-violet/10 sm:p-7"
            >
              {/* Media Space Placeholder Box */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-dashed border-plum/20 bg-plum/5">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet/10 text-violet transition-transform group-hover:scale-110">
                    <FileCode2 className="h-6 w-6" />
                  </div>
                  <span className="mt-3 text-xs font-bold uppercase tracking-wider text-plum/70">
                    [ Media & Screenshot Space ]
                  </span>
                  <span className="mt-1 text-[11px] text-plum/45">
                    16:9 Image, video loop, or interactive demo
                  </span>
                </div>

                {/* Category Pill on top of Placeholder */}
                <div className="absolute left-3.5 top-3.5">
                  <span className="rounded-full bg-plum/85 px-3 py-1 text-xs font-bold text-white shadow-xs backdrop-blur-md">
                    {project.category}
                  </span>
                </div>

                <div className="absolute right-3.5 top-3.5">
                  <span className="inline-flex items-center gap-1 rounded-full border border-plum/10 bg-white/90 px-2.5 py-1 text-[11px] font-bold text-plum/70 shadow-2xs backdrop-blur-md">
                    <Sparkles className="h-3 w-3 text-violet" />
                    Slot #{idx + 1}
                  </span>
                </div>
              </div>

              {/* Card Body with Placeholder Structure */}
              <div className="flex flex-1 flex-col pt-5">
                <div className="flex items-center justify-between text-xs font-semibold text-plum/50">
                  <span>{project.client}</span>
                  <span className="inline-flex items-center gap-1 text-violet font-bold">
                    <ShieldCheck className="h-3 w-3" />
                    {project.duration}
                  </span>
                </div>

                <h3 className="mt-2 text-xl font-extrabold tracking-tight text-plum transition-colors group-hover:text-violet">
                  <Link href={`/portfolio/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-plum/65">
                  {project.tagline}
                </p>

                {/* Placeholder Tech Stack Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.techUsed.map((tech) => (
                    <span
                      key={tech.name}
                      className="rounded-lg border border-plum/10 bg-mist px-2.5 py-1 text-xs font-medium text-plum/70"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>

                {/* Metric Placeholder Box */}
                <div className="mt-5 rounded-xl border border-dashed border-plum/15 bg-plum/[0.02] p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-plum/60">
                      {project.results.metrics[0]?.label || "Target Metric"}
                    </span>
                    <span className="font-black text-brand">
                      {project.results.metrics[0]?.value || "Pending"}
                    </span>
                  </div>
                </div>

                {/* Card Action: View Slot Detail Template */}
                <div className="mt-auto pt-6">
                  <div className="flex items-center justify-between border-t border-plum/10 pt-4">
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-violet transition-colors group-hover:text-plum"
                    >
                      <span>Preview case study slot</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <span className="rounded-full bg-violet/10 px-2.5 py-0.5 text-[11px] font-bold text-violet">
                      Ready to Add
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Add Custom Project Card Guidance */}
      <div className="mt-14 rounded-3xl border border-plum/10 bg-white/80 p-8 shadow-xs backdrop-blur-md sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-white shadow-md">
              <PlusCircle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-plum">
                Have a new project ready to add?
              </h3>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-plum/70">
                You can add real projects anytime by populating{" "}
                <code className="rounded-md bg-mist px-2 py-0.5 font-mono text-xs font-bold text-plum">
                  src/lib/portfolio-data.ts
                </code>
                . Each slot automatically inherits rich galleries, metrics, and live demo links.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Button href="/contact">Inquire with our engineers</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
