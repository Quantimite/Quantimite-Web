"use client";

import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { ChronoDialIcon } from "./BlogIcons";
import { ArrowLeft, Sparkles } from "lucide-react";

interface ArticleHeaderProps {
  post: BlogPost;
}

export default function ArticleHeader({ post }: ArticleHeaderProps) {
  return (
    <header className="mx-auto max-w-4xl px-6 pt-12 pb-8">
      {/* Back Button */}
      <Link
        href="/insights"
        className="inline-flex items-center gap-2 text-sm font-semibold text-plum/70 hover:text-plum transition-colors mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Insights
      </Link>

      {/* Metadata Badges */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-xs">
          <Sparkles className="h-3 w-3" />
          Editorial
        </span>
        <span className="rounded-full bg-violet/10 px-3 py-1 text-xs font-semibold text-violet">
          {post.category}
        </span>
        <span className="flex items-center gap-1.5 font-medium text-plum/60 text-xs">
          <ChronoDialIcon size={14} className="text-violet" />
          {post.readTime}
        </span>
        <span className="text-plum/40">&bull;</span>
        <span className="text-xs font-medium text-plum/60">
          Published {post.publishedAt}
        </span>
      </div>

      {/* Title */}
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-plum sm:text-5xl sm:leading-tight">
        {post.title}
      </h1>

      {/* Excerpt */}
      <p className="mt-6 text-lg leading-relaxed text-plum/75 sm:text-xl">
        {post.excerpt}
      </p>

      {/* Author Card */}
      <div className="mt-8 flex items-center gap-4 border-t border-plum/10 pt-6">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="h-12 w-12 rounded-full object-cover ring-2 ring-violet/20"
        />
        <div>
          <p className="text-sm font-bold text-plum">{post.author.name}</p>
          <p className="text-xs text-plum/60">{post.author.role}</p>
        </div>
      </div>
    </header>
  );
}