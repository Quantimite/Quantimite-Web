import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

interface FeaturedArticleProps {
  post: BlogPost | null;
}

export default function FeaturedArticle({ post }: FeaturedArticleProps) {
  // If no post is published yet, render the featured article placeholder box
  if (!post) {
    return (
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="relative overflow-hidden rounded-3xl border border-plum/10 bg-white/90 shadow-xl shadow-plum/5 backdrop-blur-md transition-all duration-300 hover:border-violet/30 hover:shadow-2xl">
          {/* Ambient background bloom */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-violet/20 via-azure/15 to-transparent blur-3xl"
          />

          <div className="grid gap-8 p-8 md:grid-cols-12 md:p-12 lg:items-center">
            {/* Left Column: Content Box */}
            <div className="flex flex-col justify-between md:col-span-7 lg:col-span-8">
              <div>
                {/* Category & Featured Badge */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-xs">
                    <Sparkles className="h-3 w-3" />
                    Featured Editorial
                  </span>
                  <span className="rounded-full bg-violet/10 px-3 py-1 text-xs font-semibold text-violet">
                    Coming Soon
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-plum/60">
                    <Clock className="h-3.5 w-3.5" />
                    In Editorial Review
                  </span>
                </div>

                {/* Title */}
                <h2 className="mt-5 text-2xl font-bold tracking-tight text-plum sm:text-3xl lg:text-4xl">
                  Featured Insight in Production
                </h2>

                {/* Excerpt */}
                <p className="mt-4 text-base leading-relaxed text-plum/75 sm:text-lg">
                  Our engineering architects and product leaders are finalizing our next in-depth publication.
                  Real insight content will be published directly into this space.
                </p>

                {/* Placeholder Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Software", "Architecture", "Design Systems", "Growth"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-plum/5 px-2.5 py-1 text-xs font-medium text-plum/70"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author & CTA Footer */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-plum/10 pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand font-bold text-white shadow-md">
                    Q
                  </div>
                  <div>
                    <p className="text-sm font-bold text-plum">Quantimite Editorial</p>
                    <p className="text-xs text-plum/60">Research & Engineering Team</p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-plum/10 bg-plum/5 px-5 py-2.5 text-xs font-bold text-plum/70">
                  Publishing Soon
                </div>
              </div>
            </div>

            {/* Right Column: Visual Feature Banner Box */}
            <div className="relative flex aspect-16/10 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-azure-500 md:col-span-5 lg:col-span-4 p-8 shadow-inner shadow-black/10 group">
              <div className="relative z-10 w-full rounded-xl border border-white/30 bg-white/15 p-6 backdrop-blur-xl text-white shadow-2xl">
                <div className="text-xs font-mono font-medium uppercase tracking-widest text-white/80">
                  Upcoming Editorial
                </div>
                <div className="mt-3 text-lg font-bold leading-snug text-white">
                  Engineering Insights & System Design
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-white/70">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Slot Ready for New Content
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 pb-12">
      <div className="relative overflow-hidden rounded-3xl border border-plum/10 bg-white/90 shadow-xl shadow-plum/5 backdrop-blur-md transition-all duration-300 hover:border-violet/30 hover:shadow-2xl">
        {/* Ambient background bloom */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-violet/20 via-azure/15 to-transparent blur-3xl"
        />

        <div className="grid gap-8 p-8 md:grid-cols-12 md:p-12 lg:items-center">
          {/* Left Column: Content */}
          <div className="flex flex-col justify-between md:col-span-7 lg:col-span-8">
            <div>
              {/* Category & Featured Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-xs">
                  <Sparkles className="h-3 w-3" />
                  Featured Editorial
                </span>
                <span className="rounded-full bg-violet/10 px-3 py-1 text-xs font-semibold text-violet">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-plum/60">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h2 className="mt-5 text-2xl font-bold tracking-tight text-plum hover:text-violet sm:text-3xl lg:text-4xl">
                <Link href={`/blog/${post.slug}`} className="transition-colors">
                  {post.title}
                </Link>
              </h2>

              {/* Excerpt */}
              <p className="mt-4 text-base leading-relaxed text-plum/75 sm:text-lg">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-plum/5 px-2.5 py-1 text-xs font-medium text-plum/70 transition-colors hover:bg-plum/10"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author & CTA Footer */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-plum/10 pt-6">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-violet/20"
                />
                <div>
                  <p className="text-sm font-bold text-plum">{post.author.name}</p>
                  <p className="text-xs text-plum/60">{post.author.role} • {post.publishedAt}</p>
                </div>
              </div>

              <Button href={`/blog/${post.slug}`} size="sm" className="group">
                Read Article
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right Column: Visual Feature Banner */}
          <div className="relative flex aspect-16/10 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br md:col-span-5 lg:col-span-4 p-8 shadow-inner shadow-black/10 group">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${post.coverGradient} opacity-90 transition-transform duration-500 group-hover:scale-105`}
            />
            {/* Visual Glass Card inside */}
            <div className="relative z-10 w-full rounded-xl border border-white/30 bg-white/15 p-6 backdrop-blur-xl text-white shadow-2xl">
              <div className="text-xs font-mono font-medium uppercase tracking-widest text-white/80">
                Architecture Blueprint
              </div>
              <div className="mt-3 text-lg font-bold leading-snug text-white">
                React 19 & Next.js Edge System Design
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-white/70">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                Zero-Cold-Start Production Engine
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
