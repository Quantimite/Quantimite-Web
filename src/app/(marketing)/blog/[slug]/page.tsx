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

  const canonical = post.seo.canonicalUrl || `https://quantimite.com/blog/${post.slug}`;

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
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category, 3);

  return (
    <main className="min-h-screen">
      {/* Google Jobs / Article Structured Data Schema */}
      <ArticleJsonLd post={post} />

      {/* Article Header (Breadcrumb, Meta, Title, Author, Social Share) */}
      <ArticleHeader post={post} />

      {/* Rich Markdown Article Content */}
      <ArticleContent post={post} />

      {/* Related Posts Section */}
      <RelatedPosts posts={relatedPosts} />

      {/* Newsletter Signup Section */}
      <NewsletterSignup />
    </main>
  );
}
