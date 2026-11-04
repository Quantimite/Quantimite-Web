import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllPublications,
  getPublicationBySlug,
} from "@/lib/research-data";
import WhitepaperDetail from "@/components/research/WhitepaperDetail";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const publications = getAllPublications();
  return publications.map((pub) => ({
    slug: pub.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const publication = getPublicationBySlug(slug);

  if (!publication) {
    return {
      title: "Publication Not Found | Quantimite Research Labs",
    };
  }

  return {
    title: `${publication.title} | Quantimite Research Labs`,
    description: publication.summary,
    openGraph: {
      title: publication.title,
      description: publication.summary,
      type: "article",
    },
  };
}

export default async function PublicationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const publication = getPublicationBySlug(slug);

  if (!publication) {
    notFound();
  }

  return (
    <main className="min-h-screen pb-20">
      <WhitepaperDetail publication={publication} />
    </main>
  );
}
