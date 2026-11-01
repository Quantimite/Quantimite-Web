"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { BlogPost, BlogCategory } from "@/types/blog";
import { BLOG_CATEGORIES } from "@/lib/blog-data";
import {
  ModernArrowRight,
  ChronoDialIcon,
  OpticalSearchIcon,
  BlueprintChipIcon,
} from "./BlogIcons";

interface ArticleListProps {
  posts: BlogPost[];
  allTags: string[];
}

const PLACEHOLDER_BOXES: {
  category: BlogCategory;
  gradient: string;
  tag: string;
  image: string;
  title: string;
  excerpt: string;
}[] = [
  {
    category: "Software",
    gradient: "from-violet-600 via-indigo-600 to-azure-500",
    tag: "Next.js 15",
    image: "/assets/blog/software-architecture.jpg",
    title: "Enterprise Architecture & Edge Invalidation",
    excerpt:
      "Deep dive into high-throughput Next.js 15, React 19 server actions, and zero-cold-start edge microservices.",
  },
  {
    category: "Design",
    gradient: "from-fuchsia-600 via-violet-600 to-pink-600",
    tag: "LiquidGlass",
    image: "/assets/blog/design-craft.jpg",
    title: "Tactile Liquid Interfaces & Spatial Design",
    excerpt:
      "Balancing GPU performance, light diffusion, and depth ergonomics in modern web design systems.",
  },
  {
    category: "Marketing",
    gradient: "from-blue-600 via-azure to-teal-500",
    tag: "CoreWebVitals",
    image: "/assets/blog/technical-growth.jpg",
    title: "Engineering-First Technical SEO & SaaS Growth",
    excerpt:
      "Structured JSON-LD schema graphs, programmatic sitemaps, and sub-100ms metrics that outperform content farms.",
  },
  {
    category: "Startup Tips",
    gradient: "from-amber-500 via-orange-600 to-rose-600",
    tag: "Velocity",
    image: "/assets/blog/startup-velocity.jpg",
    title: "The 90-Day Engineering Velocity Playbook",
    excerpt:
      "How high-growth technical founders avoid early architecture debt while shipping rapid customer feedback cycles.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ArticleList({ posts, allTags }: ArticleListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: posts.length };
    BLOG_CATEGORIES.forEach((cat) => {
      counts[cat] = posts.filter((p) => p.category === cat).length;
    });
    return counts;
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (selectedCategory !== "All" && post.category !== selectedCategory) {
        return false;
      }
      if (selectedTag && !post.tags.includes(selectedTag)) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesExcerpt = post.excerpt.toLowerCase().includes(query);
        const matchesAuthor = post.author.name.toLowerCase().includes(query);
        const matchesTag = post.tags.some((t) => t.toLowerCase().includes(query));
        return matchesTitle || matchesExcerpt || matchesAuthor || matchesTag;
      }
      return true;
    });
  }, [posts, selectedCategory, selectedTag, searchQuery]);

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSelectedTag(null);
    setSearchQuery("");
  };

  const hasRealPosts = posts.length > 0;

  const filteredPlaceholders = useMemo(() => {
    if (selectedCategory === "All") return PLACEHOLDER_BOXES;
    return PLACEHOLDER_BOXES.filter((b) => b.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      {/* Modern Filter & Search Hub */}
      <div className="apple-glass-panel relative rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className={`relative rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === "All"
                  ? "bg-brand text-white shadow-md shadow-violet/25"
                  : "apple-glass-pill"
              }`}
            >
              All Topics {hasRealPosts && `(${categoryCounts["All"]})`}
            </button>
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`relative rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-brand text-white shadow-md shadow-violet/25"
                    : "apple-glass-pill"
                }`}
              >
                {cat} {hasRealPosts && `(${categoryCounts[cat] || 0})`}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-plum/40">
              <OpticalSearchIcon size={16} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, architecture or tag..."
              className="apple-glass-input w-full rounded-full py-2.5 pl-11 pr-10 text-sm text-plum placeholder:text-plum/40 outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-plum/40 hover:text-plum cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Tags Row */}
        {allTags.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-plum/10 pt-4 text-xs">
            <span className="font-semibold text-plum/60 mr-1">
              Filter by tag:
            </span>
            {allTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(isSelected ? null : tag)}
                  className={`rounded-lg px-2.5 py-1 font-medium transition-all cursor-pointer ${
                    isSelected
                      ? "bg-plum text-white shadow-xs"
                      : "bg-plum/5 text-plum/70 hover:bg-plum/10 hover:text-plum"
                  }`}
                >
                  #{tag}
                </button>
              );
            })}

            {(selectedTag || searchQuery || selectedCategory !== "All") && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="ml-auto font-semibold text-violet hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Grid Header Info */}
      <div className="mt-10 flex items-center justify-between border-b border-plum/10 pb-4">
        <p className="text-sm font-semibold text-plum/70">
          {hasRealPosts ? (
            <>
              Showing <span className="font-bold text-plum">{filteredPosts.length}</span>{" "}
              {filteredPosts.length === 1 ? "insight" : "insights"}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {selectedTag && ` tagged with #${selectedTag}`}
            </>
          ) : (
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Editorial Grid &bull; Track:{" "}
              <strong className="text-plum">{selectedCategory}</strong>
            </span>
          )}
        </p>

        <span className="text-xs font-mono font-medium text-plum/50">
          Peer-Reviewed Engineering
        </span>
      </div>

      {/* Real Posts Grid */}
      {hasRealPosts ? (
        filteredPosts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredPosts.map((post) => (
              <motion.article
                key={post.slug}
                variants={cardVariants}
                className="apple-glass-panel group relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-2 hover:border-violet/40 hover:shadow-2xl"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-gradient-to-br from-violet/10 via-azure/10 to-transparent opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                />

                <div>
                  <div
                    className={`h-2.5 w-full rounded-full bg-gradient-to-r ${post.coverGradient} mb-5`}
                  />

                  <div className="flex items-center justify-between text-xs">
                    <span className="rounded-full bg-violet/10 px-3 py-1 font-bold text-violet">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-plum/60">
                      <ChronoDialIcon size={13} className="text-violet" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold tracking-tight text-plum transition-colors group-hover:text-violet">
                    <Link href={`/insights/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-plum/75">
                    {post.excerpt}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setSelectedTag(tag)}
                        className="rounded-md bg-plum/5 px-2 py-0.5 text-[11px] font-medium text-plum/60 hover:bg-violet/10 hover:text-violet cursor-pointer"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-plum/10 pt-4">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-8 w-8 rounded-full object-cover ring-1 ring-violet/20"
                    />
                    <div>
                      <p className="text-xs font-bold text-plum">{post.author.name}</p>
                      <p className="text-[10px] text-plum/50">{post.publishedAt}</p>
                    </div>
                  </div>

                  <Link
                    href={`/insights/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-violet transition-colors hover:text-azure"
                  >
                    <span>Read</span>
                    <ModernArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <div className="my-16 rounded-3xl border border-dashed border-plum/20 bg-white/70 p-12 text-center backdrop-blur-md">
            <h3 className="text-xl font-bold text-plum">No matching articles found</h3>
            <p className="mt-2 text-sm text-plum/70">
              Try adjusting your query, clearing filters, or switching category tabs.
            </p>
            <button
              type="button"
              onClick={clearAllFilters}
              className="btn-fill mt-6 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )
      ) : (
        /* Empty Mock Data Mode: Modern 3D Visual Bento Placeholder Cards */
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredPlaceholders.map((box, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="apple-glass-panel group relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-2 hover:border-violet/40 hover:shadow-2xl"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-gradient-to-br from-violet/10 to-azure/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
              />

              <div>
                {/* 3D Visual Thumbnail Frame */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-plum/10 bg-white/80 p-1 shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={box.image}
                      alt={box.title}
                      className="h-full w-full object-cover rounded-xl"
                    />
                  </div>

                  <div className="text-right">
                    <span className="rounded-full bg-violet/10 px-3 py-1 text-xs font-bold text-violet">
                      {box.category}
                    </span>
                    <p className="mt-1 text-[10px] font-mono text-plum/50 flex items-center justify-end gap-1">
                      <ChronoDialIcon size={11} className="text-plum/40" />
                      In Review
                    </p>
                  </div>
                </div>

                {/* Title */}
                <h3 className="mt-2 text-xl font-bold tracking-tight text-plum group-hover:text-violet transition-colors">
                  {box.title}
                </h3>

                {/* Excerpt */}
                <p className="mt-3 text-sm leading-relaxed text-plum/70">
                  {box.excerpt}
                </p>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  <span className="rounded-md bg-plum/5 px-2.5 py-1 text-[11px] font-semibold text-plum/60">
                    #{box.tag}
                  </span>
                  <span className="rounded-md bg-plum/5 px-2.5 py-1 text-[11px] font-semibold text-plum/60">
                    #Blueprint
                  </span>
                </div>
              </div>

              {/* Footer slot */}
              <div className="mt-8 flex items-center justify-between border-t border-plum/10 pt-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-plum/10 text-xs font-bold text-plum">
                    Q
                  </div>
                  <div>
                    <p className="text-xs font-bold text-plum">Quantimite Core</p>
                    <p className="text-[10px] text-plum/50">Engineering Guild</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
                  <BlueprintChipIcon size={12} className="text-emerald-500" />
                  Slot Ready
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
