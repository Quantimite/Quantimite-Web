"use client";

import { useState } from "react";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { Clock } from "lucide-react";

interface ArticleHeaderProps {
  post: BlogPost;
}

export default function ArticleHeader({ post }: ArticleHeaderProps) {
  const [copied, setCopied] = useState(false);

  const articleUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://quantimite.com/insights/${post.slug}`;

  const copyToClipboard = async () => {
    try {
      if (typeof window !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(articleUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    post.title
  )}&url=${encodeURIComponent(articleUrl)}&via=quantimite`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    articleUrl
  )}`;

  return (
    <header className="relative pt-10 pb-8 sm:pt-14 sm:pb-12">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-4xl px-6">
        <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold text-plum/60">
          <li>
            <Link href="/" className="hover:text-plum transition-colors">
              Home
            </Link>
          </li>
          <span className="text-plum/30">/</span>
          <li>
            <Link href="/insights" className="hover:text-plum transition-colors">
              Insights
            </Link>
          </li>
          <span className="text-plum/30">/</span>
          <li>
            <span className="text-violet font-bold">{post.category}</span>
          </li>
        </ol>
      </nav>

      <div className="mx-auto max-w-4xl px-6 pt-6">
        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="rounded-full bg-violet/10 px-3.5 py-1 font-bold text-violet">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 font-medium text-plum/60">
            <Clock className="h-3.5 w-3.5 text-violet" />
            {post.readTime}
          </span>
          <span className="text-plum/40">&bull;</span>
          <span className="font-medium text-plum/60">{post.publishedAt}</span>
          {post.difficulty && (
            <>
              <span className="text-plum/40">&bull;</span>
              <span className="rounded-full bg-plum/5 px-2.5 py-0.5 font-mono text-[11px] font-bold text-plum/70">
                {post.difficulty}
              </span>
            </>
          )}
        </div>

        {/* Title in default bold sans */}
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-plum sm:text-5xl sm:leading-[1.15]">
          {post.title}
        </h1>

        {/* Excerpt / Lead */}
        <p className="mt-6 text-lg leading-relaxed text-plum/75 sm:text-xl font-normal">
          {post.excerpt}
        </p>

        {/* Author Bio Card & Share Buttons Bar */}
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-y border-plum/10 py-6">
          {/* Author info */}
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand font-bold text-white shadow-md">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-plum">{post.author.name}</span>
              </div>
              <p className="text-xs font-medium text-plum/60">{post.author.role}</p>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-plum/60 mr-1">Share:</span>

            {/* Twitter / X */}
            <a
              href={twitterShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-glass-pill inline-flex h-9 w-9 items-center justify-center rounded-full text-plum/70 hover:text-violet transition-all"
              title="Share on X / Twitter"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href={linkedinShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-glass-pill inline-flex h-9 w-9 items-center justify-center rounded-full text-plum/70 hover:text-azure transition-all"
              title="Share on LinkedIn"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.84 6.2a1.62 1.62 0 0 0-1.62 1.62c0 .9.72 1.63 1.62 1.63s1.63-.73 1.63-1.63c0-.9-.73-1.62-1.63-1.62z" />
              </svg>
            </a>

            {/* Copy Link Button */}
            <button
              type="button"
              onClick={copyToClipboard}
              className="apple-glass-pill inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-xs font-semibold text-plum/70 cursor-pointer"
              title="Copy article link"
            >
              {copied ? (
                <span className="text-emerald-600 font-bold">Copied!</span>
              ) : (
                <span>Copy Link</span>
              )}
            </button>
          </div>
        </div>

        {/* Real-World Object Imagery Banner in Default Rounded Container */}
        {post.coverImage && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-plum/10 bg-white/90 shadow-xl backdrop-blur-md">
            <div className="relative aspect-16/9 w-full overflow-hidden bg-plum/5">
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
