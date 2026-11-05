import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CareersStore } from "@/lib/careers/store";
import JobDetailView from "@/components/careers/JobDetailView";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const jobs = CareersStore.getAllJobs();
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = CareersStore.getJobBySlug(slug);

  if (!job) {
    return { title: "Position Not Found | Quantimite Careers" };
  }

  return {
    title: `${job.title} — Careers | Quantimite`,
    description: job.shortSummary,
    openGraph: {
      title: `${job.title} at Quantimite`,
      description: job.shortSummary,
      url: `https://quantimite.com/careers/${job.slug}`,
      siteName: "Quantimite",
      type: "article",
    },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = CareersStore.getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const allPublished = CareersStore.getPublishedJobs();
  const similarJobs = allPublished
    .filter((j) => j.id !== job.id && (j.department === job.department || j.workMode === job.workMode))
    .slice(0, 3);

  // Google Jobs JobPosting JSON-LD Schema
  const isRemote = job.workMode === "Remote";
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: job.description || job.shortSummary,
    identifier: {
      "@type": "PropertyValue",
      name: "Quantimite",
      value: job.id,
    },
    datePosted: job.datePosted,
    validThrough: job.validThrough,
    employmentType:
      job.type === "Full-time"
        ? "FULL_TIME"
        : job.type === "Internship"
        ? "INTERN"
        : job.type === "Contract"
        ? "CONTRACTOR"
        : "PART_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Quantimite",
      sameAs: "https://quantimite.com",
      logo: "https://quantimite.com/assets/brand/mascot-code.png",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: "GLOBAL",
      },
    },
    ...(isRemote && {
      jobLocationType: "TELECOMMUTE",
      applicantLocationRequirements: {
        "@type": "Country",
        name: "Worldwide",
      },
    }),
    directApply: true,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JobDetailView job={job} similarJobs={similarJobs} />
    </>
  );
}
