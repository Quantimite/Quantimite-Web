export type ProjectCategory = "Web" | "Mobile" | "SaaS" | "Design" | "Marketing";

export interface ProjectMetric {
  label: string;
  value: string;
  change?: string;
}

export interface ProjectGalleryItem {
  url: string;
  title: string;
  caption: string;
}

export interface ProjectCaseStudy {
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  client: string;
  concept: string;
  year: string;
  duration: string;
  featured?: boolean;
  coverImage: string;
  heroVideo?: string;
  overview: string;
  challenge: {
    summary: string;
    points: string[];
  };
  solution: {
    summary: string;
    points: string[];
    architectureHighlights?: string[];
  };
  techUsed: {
    name: string;
    category: "Frontend" | "Backend" | "Cloud & DevOps" | "AI / Data" | "Design";
    icon?: string;
  }[];
  results: {
    summary: string;
    metrics: ProjectMetric[];
    testimonial?: {
      quote: string;
      author: string;
      role: string;
      company: string;
    };
  };
  gallery: ProjectGalleryItem[];
  liveDemoUrl?: string;
  githubUrl?: string;
}
