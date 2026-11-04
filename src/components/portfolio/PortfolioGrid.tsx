"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ExternalLink,
  ArrowRight,
  SlidersHorizontal,
  X,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "@/components/common/BrandIcons";
import { ProjectCaseStudy, ProjectCategory } from "@/types/portfolio";
import { PROJECT_CATEGORIES } from "@/lib/portfolio-data";

interface Props {
  projects: ProjectCaseStudy[];
}

export default function PortfolioGrid({ projects }: Props) {
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
        project.client.toLowerCase().includes(q) ||
        project.techUsed.some((t) => t.name.toLowerCase().includes(q)) ||
        project.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="project-grid" className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      {/* Header with Title and Search Controls */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-violet">
            Featured Deliverables
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-plum sm:text-4xl">
            Selected Works & Case Studies
          </h2>
          <p className="mt-2 text-sm text-plum/70 sm:text-base">
            Filter by sector or search through technical stacks to inspect architecture and results.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-plum/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stack, client, or topic..."
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

      {/* Filter Tabs */}
      <div className="mt-8 flex flex-wrap items-center gap-2 pb-2">
        <span className="mr-2 inline-flex items-center gap-1.5 text-xs font-semibold text-plum/50">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filter:
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

      {/* Results Count Banner */}
      <div className="mt-4 flex items-center justify-between text-xs font-medium text-plum/60">
        <span>
          Showing <strong className="text-plum">{filteredProjects.length}</strong>{" "}
          {filteredProjects.length === 1 ? "project" : "projects"}
        </span>
        {(selectedCategory !== "All" || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="text-violet hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Projects Grid */}
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
              className="glass-card group flex flex-col overflow-hidden rounded-3xl"
            >
              {/* Media Thumbnail */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-plum/5">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

                {/* Badges on Thumbnail */}
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-plum/80 px-3 py-1 text-xs font-bold tracking-wide text-white backdrop-blur-md">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-violet/90 px-2.5 py-1 text-xs font-bold text-white shadow-xs backdrop-blur-md">
                      <Sparkles className="h-3 w-3" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Primary Metric Floating Callout */}
                {project.results.metrics[0] && (
                  <div className="absolute bottom-3 left-4 right-4 rounded-xl border border-white/20 bg-white/90 p-2.5 shadow-md backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-plum/70">
                        {project.results.metrics[0].label}
                      </span>
                      <span className="text-sm font-black text-brand">
                        {project.results.metrics[0].value}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex items-center justify-between text-xs font-semibold text-plum/50">
                  <span>{project.client}</span>
                  <span>{project.year}</span>
                </div>

                <h3 className="mt-2 text-xl font-extrabold tracking-tight text-plum transition-colors group-hover:text-violet">
                  <Link href={`/portfolio/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>

                <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-plum/70">
                  {project.tagline}
                </p>

                {/* Tech Pills */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.techUsed.slice(0, 4).map((tech) => (
                    <span
                      key={tech.name}
                      className="rounded-md border border-plum/10 bg-mist px-2.5 py-1 text-xs font-medium text-plum/75"
                    >
                      {tech.name}
                    </span>
                  ))}
                  {project.techUsed.length > 4 && (
                    <span className="rounded-md bg-mist px-2 py-1 text-xs font-medium text-plum/50">
                      +{project.techUsed.length - 4}
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-6">
                  <div className="flex items-center justify-between border-t border-plum/10 pt-4">
                    {/* View Details Link */}
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-violet transition-colors hover:text-plum"
                    >
                      View case study
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>

                    {/* External Quick Action Links */}
                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View GitHub Repository"
                          className="grid h-8 w-8 place-items-center rounded-full border border-plum/15 text-plum/70 transition-colors hover:border-plum hover:bg-plum hover:text-white"
                        >
                          <GithubIcon className="h-4 w-4" />
                        </a>
                      )}
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View Live Interactive Demo"
                          className="grid h-8 w-8 place-items-center rounded-full border border-plum/15 text-plum/70 transition-colors hover:border-violet hover:bg-violet hover:text-white"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="mx-auto mt-16 max-w-md rounded-3xl border border-plum/10 bg-white/80 p-8 text-center shadow-xs backdrop-blur-md">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-plum/5 text-plum/60">
            <Search className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-plum">No projects found</h3>
          <p className="mt-2 text-sm text-plum/60">
            No case studies match your query &quot;{searchQuery}&quot; under the{" "}
            {selectedCategory} filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="btn-fill mt-6 inline-flex rounded-full px-6 py-2.5 text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
