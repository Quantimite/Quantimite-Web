import type { Metadata } from "next";
import { getAllPosts, getFeaturedPost, getAllTags } from "@/lib/blog-data";
import BlogHero from "@/components/blog/BlogHero";
import FeaturedArticle from "@/components/blog/FeaturedArticle";
import ArticleList from "@/components/blog/ArticleList";
import NewsletterSignup from "@/components/blog/NewsletterSignup";
import BlogJsonLd from "@/components/blog/BlogJsonLd";
import InsightsScrollCanvas from "@/components/insights/InsightsScrollCanvas";
import InsightsScrollHUD from "@/components/insights/InsightsScrollHUD";
import InsightsTelemetry from "@/components/insights/InsightsTelemetry";

export const metadata: Metadata = {
  title: "Insights & Engineering Architecture | Quantimite — 3D Systems & Research",
  description:
    "Explore deep architectural guides, liquid interface design, and distributed systems engineering with scroll-driven 3D animations and real-world blueprints.",
  keywords: [
    "Software Architecture",
    "Next.js Development",
    "Three.js React Three Fiber",
    "UI/UX Design Systems",
    "Startup Tips",
    "Technical SEO",
    "Quantimite Insights",
  ],
  openGraph: {
    title: "Insights & Engineering Architecture | Quantimite",
    description:
      "Explore deep architectural guides, liquid interface design, and distributed systems engineering with scroll-driven 3D animations and real-world blueprints.",
    url: "https://quantimite.com/insights",
    siteName: "Quantimite",
    type: "website",
    images: [
      {
        url: "/assets/images/insights/hero-monolith.jpg",
        width: 1200,
        height: 675,
        alt: "Quantimite Insights 3D Architecture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights & Engineering Architecture | Quantimite",
    description:
      "Explore deep architectural guides, liquid interface design, and distributed systems engineering.",
    images: ["/assets/images/insights/hero-monolith.jpg"],
  },
};

export default function InsightsPage() {
  const allPosts = getAllPosts();
  const featuredPost = getFeaturedPost();
  const allTags = getAllTags();

  return (
    <main className="relative min-h-screen">
      {/* 01. Scroll-Driven 3D Canvas (Three.js & React Three Fiber) */}
      <InsightsScrollCanvas />

      {/* 02. Interactive 3D Telemetry HUD Bar */}
      <InsightsScrollHUD />

      {/* 03. Search Engine Structured Data */}
      <BlogJsonLd posts={allPosts} />

      {/* 04. Hero Section with Bento Cards */}
      <div id="hero" className="relative z-10">
        <BlogHero />
      </div>

      {/* 05. Featured Insight Spotlight with Real-World Object Imagery */}
      <div id="featured" className="relative z-10">
        <FeaturedArticle post={featuredPost} />
      </div>

      {/* 06. Interactive Filterable Article Grid */}
      <div id="articles" className="relative z-10">
        <ArticleList posts={allPosts} allTags={allTags} />
      </div>

      {/* 07. Production Telemetry & Engineering Axioms */}
      <div className="relative z-10">
        <InsightsTelemetry />
      </div>

      {/* 08. Research Dispatch Newsletter Module */}
      <div id="newsletter" className="relative z-10">
        <NewsletterSignup />
      </div>
    </main>
  );
}
