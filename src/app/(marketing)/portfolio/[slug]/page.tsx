import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug, getRelatedProjects } from "@/lib/portfolio-data";
import CaseStudyDetail from "@/components/portfolio/CaseStudyDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Case Study Not Found | Quantimite",
    };
  }

  return {
    title: `${project.title} — Case Study | Quantimite`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} | Quantimite Case Study`,
      description: project.tagline,
      images: [{ url: project.coverImage }],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(slug, 2);

  return <CaseStudyDetail project={project} relatedProjects={relatedProjects} />;
}
