"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BlogPost } from "@/types/blog";
import { Sparkles, ArrowRight, Clock } from "lucide-react";
import {
  ModernArrowRight,
  ChronoDialIcon,
  ArchitectureIcon,
  BlueprintChipIcon,
} from "./BlogIcons";

interface FeaturedArticleProps {
  post?: BlogPost;
}

export default function FeaturedArticle({ post }: FeaturedArticleProps) {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-8">
      {/* Container with Quantimite default glassmorphism styling */}
      <div className="relative overflow-hidden rounded-3xl border border-plum/10 bg-white/70 p-6 shadow-xl backdrop-blur-xl sm:p-10 lg:p-12">
        {/* Subtle background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-violet/10 blur-3xl"
        />

        {!post ? (
          /* Empty / Default Fallback State */
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div>
                {/* Eyebrow */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-xs">
                    <Sparkles className="h-3 w-3" />
                    Featured Insight
                  </span>
                  <span className="rounded-full bg-violet/10 px-3 py-1 text-xs font-semibold text-violet">
                    Upcoming Publication
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-plum/60">
                    <ChronoDialIcon size={14} className="text-violet" />
                    In Production
                  </span>
                </div>

                {/* Title */}
                <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-plum sm:text-3xl lg:text-4xl">
                  Engineering Systems for Infinite Horizon Scale
                </h2>

                {/* Excerpt */}
                <p className="mt-4 text-base leading-relaxed text-plum/75 sm:text-lg">
                  Our core engineering team and systems architects are completing our newest flagship
                  analysis. As soon as real insight content is added, it will automatically occupy this prime
                  showcase.
                </p>

                {/* Topic Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Systems Architecture", "Distributed Systems", "Zero Downtime", "Next Gen UI"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-plum/10 bg-plum/5 px-2.5 py-1 font-mono text-xs font-medium text-plum/70"
                      >
                        #{tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Author & CTA */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-plum/10 pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand font-bold text-white shadow-md">
                    Q
                  </div>
                  <div>
                    <p className="text-sm font-bold text-plum">Quantimite Engineering</p>
                    <p className="text-xs text-plum/60">Research & Architecture Team</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-2 text-sm font-bold text-plum/40">
                  Awaiting Release
                  <ModernArrowRight size={16} />
                </span>
              </div>
            </div>

            {/* Visual Blueprint Column */}
            <div className="relative flex aspect-16/10 w-full items-center justify-center overflow-hidden rounded-2xl border border-plum/10 bg-linear-to-br from-violet-950 via-slate-900 to-black p-8 text-white shadow-inner lg:col-span-5">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:16px_16px] opacity-25"
              />

              <div className="relative z-10 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <ArchitectureIcon size={28} className="text-violet-300" />
                </div>
                <p className="mt-4 font-mono text-xs font-bold uppercase tracking-widest text-violet-300">
                  Monolithic Core Blueprint
                </p>
                <p className="mt-1 text-xs text-white/60">Production Readiness Stage 4</p>

                <div className="mt-5 flex items-center gap-2 rounded-lg bg-black/30 p-2.5 text-xs text-white/70">
                  <BlueprintChipIcon size={14} className="text-emerald-400" />
                  <span>Awaiting new article data</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Populated State with Real-World Physical Object Imagery */
          <div className="grid items-center gap-8 lg:grid-cols-12">
            {/* Left Column: Text & Content */}
            <div className="flex flex-col justify-between lg:col-span-7">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-xs">
                    <Sparkles className="h-3 w-3" />
                    Featured Spotlight
                  </span>
                  <span className="rounded-full bg-violet/10 px-3 py-1 text-xs font-semibold text-violet">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-plum/60">
                    <ChronoDialIcon size={14} className="text-violet" />
                    {post.readTime}
                  </span>
                  {post.difficulty && (
                    <span className="rounded-full bg-plum/5 px-2.5 py-0.5 font-mono text-[11px] font-bold text-plum/70">
                      {post.difficulty}
                    </span>
                  )}
                </div>

                <Link href={`/insights/${post.slug}`} className="group block">
                  <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-plum transition-colors group-hover:text-violet sm:text-3xl lg:text-4xl">
                    {post.title}
                  </h2>
                </Link>

                <p className="mt-4 text-base leading-relaxed text-plum/75 sm:text-lg">
                  {post.excerpt}
                </p>

                {/* Topic Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-plum/10 bg-plum/5 px-2.5 py-1 font-mono text-xs font-medium text-plum/70"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Author & CTA Footer */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-plum/10 pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand font-bold text-white shadow-md">
                    {post.author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-plum">{post.author.name}</p>
                    <p className="text-xs text-plum/60">{post.author.role}</p>
                  </div>
                </div>

                <Link
                  href={`/insights/${post.slug}`}
                  className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold"
                >
                  Read Full Insight
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Feature Banner with Real-World Object Imagery */}
            <div className="relative flex aspect-16/10 w-full items-center justify-center overflow-hidden rounded-2xl border border-plum/10 bg-plum/5 md:col-span-5 lg:col-span-5 shadow-inner group">
              {post.coverImage ? (
                <>
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum/85 via-plum/25 to-transparent"
                  />
                  <div className="absolute bottom-4 left-4 right-4 z-10 rounded-2xl border border-white/20 bg-white/20 p-5 backdrop-blur-xl text-white shadow-xl">
                    <div className="flex items-center justify-between border-b border-white/20 pb-2 text-xs font-mono uppercase tracking-widest text-white/90">
                      <span className="flex items-center gap-1.5">
                        <ArchitectureIcon size={16} /> Architectural Blueprint
                      </span>
                      <span className="font-bold text-emerald-300">Verified</span>
                    </div>
                    <div className="mt-2 text-base font-bold leading-snug text-white line-clamp-1">
                      {post.title}
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-[11px] text-white/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Production Architecture &middot; Real-World Case Study</span>
                    </div>
                  </div>
                </>
              ) : (
                <div
                  className={`relative flex h-full w-full items-center justify-center bg-linear-to-br ${post.coverGradient} p-8 text-white`}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:16px_16px] opacity-25"
                  />
                  <div className="relative z-10 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                      <ArchitectureIcon size={28} className="text-violet-300" />
                    </div>
                    <p className="mt-4 font-mono text-xs font-bold uppercase tracking-widest text-violet-300">
                      Featured Monolith
                    </p>
                    <p className="mt-1 text-xs text-white/60">Verified Production Architecture</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
