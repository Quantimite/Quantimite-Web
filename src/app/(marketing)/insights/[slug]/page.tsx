import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog-data";
import ArticleHeader from "@/components/blog/ArticleHeader";
import ArticleContent from "@/components/blog/ArticleContent";
import RelatedPosts from "@/components/blog/RelatedPosts";
import NewsletterSignup from "@/components/blog/NewsletterSignup";
import ArticleJsonLd from "@/components/blog/ArticleJsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Quantimite Insights",
      description: "The requested article could not be found.",
    };
  }

  const canonical = post.seo.canonicalUrl || `https://quantimite.com/insights/${post.slug}`;

  return {
    title: `${post.seo.metaTitle || post.title} | Quantimite Insights`,
    description: post.seo.metaDescription || post.excerpt,
    keywords: post.seo.keywords,
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: canonical,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonical,
      siteName: "Quantimite",
      type: "article",
      publishedTime: post.publishedDateISO,
      authors: [post.author.name],
      tags: post.tags,
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              width: 1200,
              height: 675,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function InsightsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category, 3);

  return (
    <main className="min-h-screen">
      {/* Search Engine Structured Data */}
      <ArticleJsonLd post={post} />

      {/* Article Header with Default Global Styles */}
      <ArticleHeader post={post} />

      {/* Article Markdown Content */}
      <ArticleContent post={post} />

      {/* Related Posts Section */}
      <RelatedPosts posts={relatedPosts} />

      {/* Default Newsletter Signup Section */}
      <NewsletterSignup />
    </main>
  );
}
