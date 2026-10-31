import type { Metadata } from "next";
import { getAllPosts, getFeaturedPost, getAllTags } from "@/lib/blog-data";
import BlogHero from "@/components/blog/BlogHero";
import FeaturedArticle from "@/components/blog/FeaturedArticle";
import ArticleList from "@/components/blog/ArticleList";
import NewsletterSignup from "@/components/blog/NewsletterSignup";
import BlogJsonLd from "@/components/blog/BlogJsonLd";

export const metadata: Metadata = {
  title: "Insights & Engineering Blog | Quantimite — High-Impact Digital Architecture",
  description:
    "Explore deep architectural guides, liquid interface design, and startup growth playbooks written by senior software engineers and product designers.",
  keywords: [
    "Software Architecture",
    "Next.js Development",
    "UI/UX Design Systems",
    "Startup Tips",
    "Technical SEO",
    "Quantimite Insights",
  ],
  openGraph: {
    title: "Insights & Engineering Blog | Quantimite",
    description:
      "Explore deep architectural guides, liquid interface design, and startup growth playbooks written by senior software engineers and product designers.",
    url: "https://quantimite.com/blog",
    siteName: "Quantimite",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights & Engineering Blog | Quantimite",
    description:
      "Explore deep architectural guides, liquid interface design, and startup growth playbooks written by senior software engineers and product designers.",
  },
};

export default function BlogPage() {
  const allPosts = getAllPosts();
  const featuredPost = getFeaturedPost();
  const allTags = getAllTags();

  return (
    <main className="min-h-screen">
      {/* Search Engine Structured Data */}
      <BlogJsonLd posts={allPosts} />

      {/* Hero Section */}
      <BlogHero />

      {/* Featured Editorial Post */}
      <div id="featured">
        <FeaturedArticle post={featuredPost} />
      </div>

      {/* Filterable Article List (Categories, Live Search, Tags) */}
      <div id="articles">
        <ArticleList posts={allPosts} allTags={allTags} />
      </div>

      {/* Newsletter Signup Module */}
      <div id="newsletter">
        <NewsletterSignup />
      </div>
    </main>
  );
}
