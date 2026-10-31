import { BlogPost } from "@/types/blog";

interface BlogJsonLdProps {
  posts: BlogPost[];
}

export default function BlogJsonLd({ posts }: BlogJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Quantimite Insights",
    description:
      "Deep architectural guides, interface craft, and startup growth insights curated by our core engineering team.",
    url: "https://quantimite.com/blog",
    publisher: {
      "@type": "Organization",
      name: "Quantimite",
      url: "https://quantimite.com",
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedDateISO,
      url: `https://quantimite.com/blog/${post.slug}`,
      author: {
        "@type": "Person",
        name: post.author.name,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
