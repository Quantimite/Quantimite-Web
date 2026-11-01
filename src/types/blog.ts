export type BlogCategory = "Software" | "Design" | "Marketing" | "Startup Tips";

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
  twitter?: string;
  linkedin?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  author: BlogAuthor;
  publishedAt: string;
  publishedDateISO: string;
  readTime: string;
  featured?: boolean;
  coverGradient: string;
  coverImage?: string;
  figureCaption?: string;
  audioDuration?: string;
  folio?: string;
  editorNote?: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    canonicalUrl?: string;
  };
  content: string;
}
