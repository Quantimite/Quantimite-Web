import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CareersStore } from "@/lib/careers/store";
import ApplicationForm from "@/components/careers/ApplicationForm";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ ref?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = CareersStore.getJobBySlug(slug);

  if (!job) {
    return { title: "Position Not Found | Quantimite Careers" };
  }

  return {
    title: `Apply: ${job.title} | Quantimite Careers`,
    description: `Submit your application for ${job.title} at Quantimite. Fast 24-48h review guarantee.`,
  };
}

export default async function JobApplyPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { ref } = await searchParams;
  const job = CareersStore.getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#fbfaff]">
      <ApplicationForm job={job} referralCode={ref} />
    </div>
  );
}
