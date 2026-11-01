"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BlogPost } from "@/types/blog";
import {
  ModernArrowRight,
  ChronoDialIcon,
  ArchitectureIcon,
  BlueprintChipIcon,
} from "./BlogIcons";
import Button from "@/components/ui/Button";

interface FeaturedArticleProps {
  post: BlogPost | null;
}

export default function FeaturedArticle({ post }: FeaturedArticleProps) {
  // If no post has been added yet, render the modern editorial placeholder showcase
  if (!post) {
    return (
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="apple-glass-panel relative overflow-hidden rounded-3xl p-8 sm:p-12 transition-all duration-300 hover:border-violet/40 hover:shadow-2xl"
        >
          {/* Luminous background light */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gradient-to-br from-violet/15 via-azure/10 to-transparent blur-3xl"
          />

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Metadata & Editorial Information */}
            <div className="flex flex-col justify-between lg:col-span-7">
              <div>
                {/* Eyebrow */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    Featured Spotlight
                  </span>
                  <span className="rounded-full bg-violet/10 px-3 py-1 text-xs font-semibold text-violet">
                    Upcoming Publication
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-plum/60">
                    <ChronoDialIcon size={14} className="text-violet" />
                    In Editorial Peer-Review
                  </span>
                </div>

                {/* Title */}
                <h2 className="mt-6 text-2xl font-bold tracking-tight text-plum sm:text-4xl sm:leading-tight">
                  Featured Technical Deep-Dive
                </h2>

                {/* Excerpt */}
                <p className="mt-4 text-base leading-relaxed text-plum/75 sm:text-lg">
                  Our core engineering team and systems architects are completing our newest flagship
                  analysis. As soon as real insight content is added, it will automatically occupy this prime
                  editorial showcase.
                </p>

                {/* Topic Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Software Architecture", "Performance", "UI/UX Craft", "Zero-Fluff"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-plum/5 px-3 py-1 text-xs font-semibold text-plum/70"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author & Status Footer */}
              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-plum/10 pt-6">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand font-bold text-white shadow-md">
                    Q
                  </div>
                  <div>
                    <p className="text-sm font-bold text-plum">Quantimite Editorial Board</p>
                    <p className="text-xs text-plum/60">Core Systems &amp; Design Guild</p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-plum/10 bg-plum/5 px-5 py-2.5 text-xs font-bold text-plum/70">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Slot Ready For Content
                </div>
              </div>
            </div>

            {/* Right Column: High-Tech 3D Visual Card */}
            <div className="relative flex aspect-16/10 w-full items-center justify-center overflow-hidden rounded-2xl border border-white/40 bg-gradient-to-br from-plum via-[#211136] to-plum p-8 shadow-2xl lg:col-span-5 group">
              <div
                aria-hidden
                className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_40%,rgba(168,24,245,0.35),transparent_70%)]"
              />

              <div className="relative z-10 w-full rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl text-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/15 pb-3 text-xs font-mono uppercase tracking-widest text-white/80">
                  <span className="flex items-center gap-2">
                    <ArchitectureIcon size={18} />
                    <span>Technical Architecture</span>
                  </span>
                  <span className="text-emerald-400 font-bold">2026 Blueprint</span>
                </div>

                <div className="mt-4 text-lg font-bold leading-snug text-white">
                  Next-Gen Edge Systems &amp; Scalable React Platforms
                </div>

                <div className="mt-4 space-y-2 text-xs text-white/75 font-mono">
                  <div className="flex items-center justify-between">
                    <span>Performance Target:</span>
                    <span className="text-white font-bold">99+ Lighthouse</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Edge Execution:</span>
                    <span className="text-white font-bold">&lt; 35ms TTFB</span>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 rounded-lg bg-black/30 p-2.5 text-xs text-white/70">
                  <BlueprintChipIcon size={14} className="text-emerald-400" />
                  <span>Awaiting new article data in blog-data.ts</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  // When a real post is present
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="apple-glass-panel relative overflow-hidden rounded-3xl p-8 sm:p-12 transition-all duration-300 hover:border-violet/40 hover:shadow-2xl"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gradient-to-br from-violet/20 via-azure/15 to-transparent blur-3xl"
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  Featured Spotlight
                </span>
                <span className="rounded-full bg-violet/10 px-3 py-1 text-xs font-semibold text-violet">
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-plum/60">
                  <ChronoDialIcon size={14} className="text-violet" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="mt-6 text-2xl font-bold tracking-tight text-plum hover:text-violet sm:text-4xl sm:leading-tight">
                <Link href={`/insights/${post.slug}`} className="transition-colors">
                  {post.title}
                </Link>
              </h2>

              <p className="mt-4 text-base leading-relaxed text-plum/75 sm:text-lg">
                {post.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-plum/5 px-3 py-1 text-xs font-medium text-plum/70 transition-colors hover:bg-plum/10"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-plum/10 pt-6">
              <div className="flex items-center gap-3.5">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-11 w-11 rounded-2xl object-cover ring-2 ring-violet/20"
                />
                <div>
                  <p className="text-sm font-bold text-plum">{post.author.name}</p>
                  <p className="text-xs text-plum/60">
                    {post.author.role} • {post.publishedAt}
                  </p>
                </div>
              </div>

              <Button href={`/insights/${post.slug}`} size="sm" className="group">
                <span>Read Full Article</span>
                <ModernArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          <div className="relative flex aspect-16/10 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br md:col-span-5 lg:col-span-5 p-8 shadow-inner shadow-black/10 group">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${post.coverGradient} opacity-95 transition-transform duration-500 group-hover:scale-105`}
            />

            <div className="relative z-10 w-full rounded-2xl border border-white/30 bg-white/20 p-6 backdrop-blur-xl text-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/20 pb-3 text-xs font-mono uppercase tracking-widest text-white/90">
                <span className="flex items-center gap-1.5">
                  <ArchitectureIcon size={18} /> Technical Blueprint
                </span>
                <span className="font-bold text-emerald-300">Verified</span>
              </div>

              <div className="mt-4 text-lg font-bold leading-snug text-white">
                {post.title}
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-white/80">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Production-grade engineering case study</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
