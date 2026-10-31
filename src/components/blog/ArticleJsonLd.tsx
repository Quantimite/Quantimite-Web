import { BlogPost } from "@/types/blog";

interface ArticleJsonLdProps {
  post: BlogPost;
}

export default function ArticleJsonLd({ post }: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedDateISO,
    dateModified: post.publishedDateISO,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.seo.canonicalUrl || `https://quantimite.com/blog/${post.slug}`,
    },
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      url: post.author.linkedin || post.author.twitter || undefined,
    },
    publisher: {
      "@type": "Organization",
      name: "Quantimite",
      url: "https://quantimite.com",
      logo: {
        "@type": "ImageObject",
        url: "https://quantimite.com/logo.png",
      },
    },
    articleSection: post.category,
    keywords: post.seo.keywords.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
