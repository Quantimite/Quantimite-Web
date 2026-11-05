"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Calendar,
  Clock,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Quote,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  FileCode2,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "@/components/common/BrandIcons";
import { ProjectCaseStudy } from "@/types/portfolio";
import Button from "@/components/ui/Button";
import { ScrollTextHeading, ScrollTextFade } from "@/components/ui/ScrollText";

interface Props {
  project: ProjectCaseStudy;
  relatedProjects: ProjectCaseStudy[];
}

export default function CaseStudyDetail({ project, relatedProjects }: Props) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setActiveImageIndex(index);
  const closeLightbox = () => setActiveImageIndex(null);

  const prevImage = () => {
    if (activeImageIndex === null || !project.gallery?.length) return;
    setActiveImageIndex(
      activeImageIndex === 0 ? project.gallery.length - 1 : activeImageIndex - 1
    );
  };

  const nextImage = () => {
    if (activeImageIndex === null || !project.gallery?.length) return;
    setActiveImageIndex(
      activeImageIndex === project.gallery.length - 1 ? 0 : activeImageIndex + 1
    );
  };

  return (
    <article className="min-h-screen pb-24">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="mx-auto max-w-7xl px-6 pt-8 pb-4">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-bold text-plum/60 transition hover:text-violet"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Project Slots</span>
        </Link>
      </div>

      {/* Case Study Header */}
      <header className="mx-auto max-w-7xl px-6 pt-4 pb-12">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-brand px-3.5 py-1 text-xs font-bold text-white shadow-xs">
            {project.category}
          </span>
          <span className="rounded-full border border-plum/15 bg-white/70 px-3 py-1 font-mono text-xs font-medium text-plum/70">
            {project.client}
          </span>
          {project.isPlaceholder && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet/20 bg-violet/10 px-3 py-1 text-xs font-bold text-violet">
              <Sparkles className="h-3 w-3" />
              Reserved Showcase Slot
            </span>
          )}
        </div>

        <h1 className="mt-4 text-3xl font-black tracking-tight text-plum sm:text-5xl lg:text-6xl">
          {project.title}
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-plum/75 sm:text-xl">
          {project.tagline}
        </p>

        {project.isPlaceholder && (
          <div className="mt-6 rounded-2xl border border-dashed border-violet/30 bg-violet/[0.03] p-4 text-xs text-plum/70 sm:text-sm">
            <strong className="text-violet font-bold">Notice:</strong> This is an architectural showcase slot reserved for upcoming production deployments. Below is the full technical layout specification.
          </div>
        )}
      </header>

      {/* Meta Specs Bar */}
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="glass-card grid grid-cols-2 gap-4 rounded-3xl p-6 sm:grid-cols-4 sm:p-8">
          <div>
            <p className="text-xs font-medium text-plum/50">Concept & Scope</p>
            <p className="text-sm font-bold text-plum">{project.concept}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-plum/50">Year</p>
            <p className="text-sm font-bold text-plum">{project.year}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-plum/50">Engagement</p>
            <p className="text-sm font-bold text-plum">{project.duration}</p>
          </div>
          <div className="flex items-center justify-end gap-2.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold text-plum"
              >
                <GithubIcon className="h-4 w-4" />
                <span>Code</span>
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fill inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Live Demo</span>
              </a>
            )}
            {!project.githubUrl && !project.liveDemoUrl && (
              <span className="rounded-full bg-plum/5 px-3 py-1.5 text-xs font-semibold text-plum/50">
                In Production
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Hero Showcase Visual */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border-2 border-dashed border-plum/20 bg-plum/5 shadow-xl"
        >
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              priority
              sizes="(min-width: 1280px) 1200px, 95vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brand text-white shadow-lg">
                <FileCode2 className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-plum">
                [ High-Resolution Showcase Visual Space ]
              </h3>
              <p className="mt-1 max-w-md text-xs text-plum/60">
                This space will display product screens, live interface captures, or architecture diagrams upon release.
              </p>
            </div>
          )}
        </motion.div>
      </section>

      {/* Deep-Dive Grid: Challenge & Solution */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Challenge */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 sm:p-10"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-red-500/10 text-red-500">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <ScrollTextHeading as="h2" className="text-2xl font-extrabold text-plum">
                The Challenge
              </ScrollTextHeading>
            </div>
            <ScrollTextFade as="p" delay={0.1} className="mt-4 text-base leading-relaxed text-plum/80">
              {project.challenge.summary}
            </ScrollTextFade>
            <ul className="mt-6 space-y-3">
              {project.challenge.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-plum/70">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-400" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-3xl p-8 sm:p-10"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet/10 text-violet">
                <Lightbulb className="h-5 w-5" />
              </div>
              <ScrollTextHeading as="h2" className="text-2xl font-extrabold text-plum">
                The Solution
              </ScrollTextHeading>
            </div>
            <ScrollTextFade as="p" delay={0.1} className="mt-4 text-base leading-relaxed text-plum/80">
              {project.solution.summary}
            </ScrollTextFade>
            <ul className="mt-6 space-y-3">
              {project.solution.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-plum/80">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            {project.solution.architectureHighlights && (
              <div className="mt-6 rounded-2xl bg-plum/5 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-plum/60">
                  Key Architectural Patterns
                </p>
                <div className="mt-2 space-y-1.5">
                  {project.solution.architectureHighlights.map((hl, i) => (
                    <p key={i} className="text-xs font-medium text-plum/80">
                      • {hl}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Tech Used Section */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-plum/10 bg-white/80 p-8 shadow-xs backdrop-blur-md sm:p-10"
        >
          <ScrollTextHeading as="h2" className="text-xl font-extrabold text-plum sm:text-2xl">
            Technologies & Frameworks Utilized
          </ScrollTextHeading>
          <ScrollTextFade as="p" delay={0.1} className="mt-1 text-sm text-plum/60">
            Planned technologies configured for this project slot.
          </ScrollTextFade>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {project.techUsed.map((tech) => (
              <div
                key={tech.name}
                className="group flex items-center gap-2 rounded-xl border border-plum/10 bg-white px-4 py-2.5 text-sm font-semibold text-plum shadow-2xs transition hover:border-violet hover:shadow-xs"
              >
                <span className="h-2 w-2 rounded-full bg-violet" />
                <span>{tech.name}</span>
                <span className="text-xs font-normal text-plum/45">
                  ({tech.category})
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Results & Business Impact */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 35, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[2.5rem] bg-plum p-8 text-white shadow-xl sm:p-12 lg:p-16"
        >
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-violet">
              <TrendingUp className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-violet">
              Impact & Measurable Value
            </span>
          </div>

          <ScrollTextHeading as="h2" className="mt-3 text-2xl font-black text-white sm:text-4xl">
            Target Metrics & Production Benchmarks
          </ScrollTextHeading>
          <ScrollTextFade as="p" delay={0.1} className="mt-3 max-w-2xl text-base text-white/75">
            {project.results.summary}
          </ScrollTextFade>

          {/* Hard Metrics Grid */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {project.results.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
              >
                <div className="text-3xl font-black text-white sm:text-4xl">
                  {metric.value}
                </div>
                <div className="mt-1 text-xs font-semibold text-white/90 sm:text-sm">
                  {metric.label}
                </div>
                {metric.change && (
                  <div className="mt-2 text-xs font-bold text-violet">
                    {metric.change}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Screenshots & Interactive Gallery Space */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <ScrollTextFade as="span" className="text-xs font-bold uppercase tracking-wider text-violet block">
              Visual Highlights
            </ScrollTextFade>
            <ScrollTextHeading as="h2" delay={0.1} className="mt-1 text-2xl font-extrabold text-plum sm:text-3xl">
              Screenshots & Architecture Previews
            </ScrollTextHeading>
          </div>
        </div>

        {project.gallery && project.gallery.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((item, index) => (
              <div
                key={index}
                onClick={() => openLightbox(index)}
                className="glass-card group cursor-pointer overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-plum/5">
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-plum/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-white text-plum shadow-lg">
                      <Maximize2 className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-plum">{item.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-plum/65">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border-2 border-dashed border-plum/15 bg-white/70 p-10 text-center">
            <FileCode2 className="mx-auto h-10 w-10 text-plum/30" />
            <h3 className="mt-3 text-lg font-bold text-plum">
              [ Image Gallery Reserved Space ]
            </h3>
            <p className="mt-1 text-xs text-plum/60">
              Interactive high-resolution screenshot galleries and modal previews will populate here automatically.
            </p>
          </div>
        )}
      </section>

      {/* Lightbox Modal (if gallery present) */}
      <AnimatePresence>
        {activeImageIndex !== null && project.gallery && project.gallery[activeImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-plum/90 p-4 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-white/20 text-white transition hover:bg-white/40"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-6 grid h-12 w-12 place-items-center rounded-full bg-white/20 text-white transition hover:bg-white/40"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-6 grid h-12 w-12 place-items-center rounded-full bg-white/20 text-white transition hover:bg-white/40"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div
              className="relative max-h-[85vh] max-w-5xl overflow-hidden rounded-2xl bg-plum"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] w-[90vw] max-w-5xl">
                <Image
                  src={project.gallery[activeImageIndex].url}
                  alt={project.gallery[activeImageIndex].title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="bg-plum/90 p-4 text-white">
                <h4 className="font-bold">
                  {project.gallery[activeImageIndex].title}
                </h4>
                <p className="text-xs text-white/70">
                  {project.gallery[activeImageIndex].caption}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Related Project Slots */}
      {relatedProjects.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pt-10">
          <div className="border-t border-plum/10 pt-12">
            <ScrollTextHeading as="h2" className="text-2xl font-extrabold text-plum">
              Other Reserved Project Slots
            </ScrollTextHeading>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/portfolio/${rel.slug}`}
                  className="group flex items-center justify-between rounded-2xl border-2 border-dashed border-plum/15 bg-white/70 p-5 transition hover:border-violet/40 hover:bg-white"
                >
                  <div>
                    <span className="text-xs font-semibold text-violet">
                      {rel.category}
                    </span>
                    <h3 className="font-bold text-plum transition group-hover:text-violet">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-plum/60">{rel.duration}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-plum/30 transition group-hover:translate-x-1 group-hover:text-violet" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="mx-auto mt-20 max-w-7xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 35, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-plum/10 bg-white/80 p-8 shadow-xs backdrop-blur-md sm:p-12"
        >
          <ScrollTextHeading as="h2" className="text-2xl font-extrabold text-plum sm:text-3xl">
            Have a project to deploy with us?
          </ScrollTextHeading>
          <ScrollTextFade as="p" delay={0.1} className="mx-auto mt-2 max-w-xl text-sm text-plum/70 sm:text-base">
            Let&apos;s build your system and feature your success story right here in our production portfolio.
          </ScrollTextFade>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button href="/contact">Schedule Technical Discovery</Button>
            <Link
              href="/portfolio"
              className="btn-outline inline-flex items-center rounded-full px-6 py-3.5 text-sm font-semibold text-plum"
            >
              Browse all project slots
            </Link>
          </div>
        </motion.div>
      </section>
    </article>
  );
}
