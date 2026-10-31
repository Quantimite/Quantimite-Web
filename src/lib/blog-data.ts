import { BlogPost, BlogCategory } from "@/types/blog";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Software",
  "Design",
  "Marketing",
  "Startup Tips",
];

// Empty posts array — ready for real insights content
export const BLOG_POSTS: BlogPost[] = [];

export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getFeaturedPost(): BlogPost | null {
  const featured = BLOG_POSTS.find((p) => p.featured);
  return featured || (BLOG_POSTS.length > 0 ? BLOG_POSTS[0] : null);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string, category: BlogCategory, limit = 3): BlogPost[] {
  return BLOG_POSTS
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      if (a.category === category && b.category !== category) return -1;
      if (b.category === category && a.category !== category) return 1;
      return 0;
    })
    .slice(0, limit);
}

export function getAllTags(): string[] {
  const tagsSet = new Set<string>();
  BLOG_POSTS.forEach((p) => p.tags.forEach((t) => tagsSet.add(t)));
  return Array.from(tagsSet);
}
