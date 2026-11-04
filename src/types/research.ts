export type ResearchTopic =
  | "AI in Business"
  | "Cybersecurity"
  | "Mobile and Web Technologies"
  | "Marketing Analytics";

export interface ResearchFocusArea {
  id: string;
  topic: ResearchTopic;
  title: string;
  tagline: string;
  summary: string;
  keyPillars: string[];
  metrics: { label: string; value: string }[];
  featuredProjectSlug?: string;
  iconName: string;
}

export interface Publication {
  slug: string;
  title: string;
  summary: string;
  abstract: string;
  topic: ResearchTopic;
  year: number;
  date: string;
  readTime: string;
  doi?: string;
  tags: string[];
  isPlaceholder?: boolean;
  authors: {
    name: string;
    role: string;
    affiliation: string;
  }[];
  pdfUrl?: string;
  fileSize: string;
  isGated: boolean;
  citationBibtex?: string;
}

export interface RDPrototype {
  id: string;
  title: string;
  status: "Active Alpha" | "Production Ready" | "Beta Testing" | "Open Source" | "In Development";
  tagline: string;
  description: string;
  topic: ResearchTopic;
  githubUrl: string;
  liveDemoUrl?: string;
  stars?: string;
  techStack: string[];
  keyFeatures: string[];
  isPlaceholder?: boolean;
}

export interface ResearcherSlot {
  id: string;
  role: string;
  domain: string;
  status: "Recruiting / Open" | "Nomination Pending" | "Reserved Fellow Slot";
  department: string;
  description: string;
  expectedQualifications: string[];
  isPlaceholder: true;
}
