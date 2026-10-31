"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BlogPost, BlogCategory } from "@/types/blog";
import { BLOG_CATEGORIES } from "@/lib/blog-data";
import { Search, Clock, ArrowRight, Tag, X, Sparkles } from "lucide-react";

interface ArticleListProps {
  posts: BlogPost[];
  allTags: string[];
}

// Placeholder templates to keep boxes and structure visually present when empty
const PLACEHOLDER_BOXES: {
  category: BlogCategory;
  gradient: string;
  tag: string;
}[] = [
  {
    category: "Software",
    gradient: "from-violet-600 via-indigo-600 to-azure-500",
    tag: "Next.js",
  },
  {
    category: "Design",
    gradient: "from-fuchsia-600 via-violet-600 to-indigo-600",
    tag: "UI/UX",
  },
  {
    category: "Marketing",
    gradient: "from-blue-600 via-cyan-600 to-teal-500",
    tag: "Growth",
  },
  {
    category: "Startup Tips",
    gradient: "from-amber-500 via-orange-600 to-rose-600",
    tag: "MVP",
  },
];

export default function ArticleList({ posts, allTags }: ArticleListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: posts.length };
    BLOG_CATEGORIES.forEach((cat) => {
      counts[cat] = posts.filter((p) => p.category === cat).length;
    });
    return counts;
  }, [posts]);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Category filter
      if (selectedCategory !== "All" && post.category !== selectedCategory) {
        return false;
      }
      // Tag filter
      if (selectedTag && !post.tags.includes(selectedTag)) {
        return false;
      }
      // Search query
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

  // Filter placeholder boxes if in empty mode
  const filteredPlaceholders = useMemo(() => {
    if (selectedCategory === "All") return PLACEHOLDER_BOXES;
    return PLACEHOLDER_BOXES.filter((b) => b.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      {/* Search and Category Control Bar */}
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === "All"
                  ? "bg-brand text-white shadow-md shadow-violet/25"
                  : "bg-white/80 text-plum/70 border border-plum/10 hover:border-plum/20 hover:text-plum"
              }`}
            >
              All Articles {hasRealPosts && `(${categoryCounts["All"]})`}
            </button>
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-brand text-white shadow-md shadow-violet/25"
                    : "bg-white/80 text-plum/70 border border-plum/10 hover:border-plum/20 hover:text-plum"
                }`}
              >
                {cat} {hasRealPosts && `(${categoryCounts[cat] || 0})`}
              </button>
            ))}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-80">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-plum/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search insights by topic, title or author..."
              className="apple-glass-input w-full rounded-full py-2.5 pl-10 pr-9 text-sm text-plum placeholder:text-plum/40 outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-plum/40 hover:text-plum cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Popular Tags Quick-Pills (rendered if tags exist) */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="flex items-center gap-1 font-semibold text-plum/60">
              <Tag className="h-3 w-3" /> Popular tags:
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
                      : "bg-white/70 text-plum/70 border border-plum/10 hover:bg-plum/5 hover:text-plum"
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
                className="ml-auto inline-flex items-center gap-1 font-semibold text-violet hover:underline cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results Count & Active Status */}
      <div className="mt-8 flex items-center justify-between border-b border-plum/10 pb-4">
        <p className="text-sm font-semibold text-plum/70">
          {hasRealPosts ? (
            <>
              Showing <span className="text-plum font-bold">{filteredPosts.length}</span>{" "}
              {filteredPosts.length === 1 ? "article" : "articles"}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {selectedTag && ` tagged with #${selectedTag}`}
            </>
          ) : (
            <>
              Insights Grid &bull; Ready for new articles in{" "}
              <span className="text-plum font-bold">{selectedCategory}</span>
            </>
          )}
        </p>
      </div>

      {/* Articles Grid: When Real Posts are Present */}
      {hasRealPosts ? (
        filteredPosts.length > 0 ? (
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-plum/10 bg-white/80 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-violet/30 hover:shadow-xl"
              >
                <div>
                  {/* Visual Accent Banner */}
                  <div
                    className={`h-2.5 w-full rounded-full bg-gradient-to-r ${post.coverGradient} mb-5`}
                  />

                  {/* Category & Read Time */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="rounded-full bg-violet/10 px-3 py-1 font-semibold text-violet">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-plum/60">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Article Title */}
                  <h3 className="mt-4 text-xl font-bold tracking-tight text-plum transition-colors group-hover:text-violet">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-plum/75">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
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

                {/* Author & Footer Link */}
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
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-violet transition-colors hover:text-azure"
                  >
                    Read
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="my-16 rounded-3xl border border-dashed border-plum/20 bg-white/60 p-12 text-center backdrop-blur-md">
            <h3 className="text-xl font-bold text-plum">No matching insights found</h3>
            <p className="mt-2 text-sm text-plum/70">
              Try adjusting your search keywords, clearing selected tags, or switching categories.
            </p>
            <button
              type="button"
              onClick={clearAllFilters}
              className="btn-fill mt-6 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )
      ) : (
        /* Empty Mock Data Mode: Kept Boxes & Layout Ready for Real Content */
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPlaceholders.map((box, index) => (
            <div
              key={index}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-plum/10 bg-white/80 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-violet/30 hover:shadow-lg"
            >
              <div>
                {/* Visual Accent Banner */}
                <div
                  className={`h-2.5 w-full rounded-full bg-gradient-to-r ${box.gradient} mb-5`}
                />

                {/* Category & Status */}
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-full bg-violet/10 px-3 py-1 font-semibold text-violet">
                    {box.category}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-plum/50">
                    <Clock className="h-3 w-3" />
                    Slot Available
                  </span>
                </div>

                {/* Upcoming Title */}
                <h3 className="mt-4 text-xl font-bold tracking-tight text-plum">
                  Upcoming {box.category} Insight
                </h3>

                {/* Excerpt Placeholder */}
                <p className="mt-3 text-sm leading-relaxed text-plum/60">
                  Article slot reserved for new editorial content. Publishing directly from the Quantimite engineering &amp; design team.
                </p>

                {/* Placeholder Tag */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <span className="rounded-md bg-plum/5 px-2 py-0.5 text-[11px] font-medium text-plum/50">
                    #{box.tag}
                  </span>
                  <span className="rounded-md bg-plum/5 px-2 py-0.5 text-[11px] font-medium text-plum/50">
                    #DeepDive
                  </span>
                </div>
              </div>

              {/* Author & Footer Placeholder */}
              <div className="mt-6 flex items-center justify-between border-t border-plum/10 pt-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-plum/10 text-xs font-bold text-plum">
                    Q
                  </div>
                  <div>
                    <p className="text-xs font-bold text-plum">Quantimite</p>
                    <p className="text-[10px] text-plum/50">Editorial Board</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-plum/40">
                  Ready for Content
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
