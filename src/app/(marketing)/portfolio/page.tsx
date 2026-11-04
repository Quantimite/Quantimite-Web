import type { Metadata } from "next";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import PortfolioCTA from "@/components/portfolio/PortfolioCTA";
import { getAllProjects } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies | Quantimite — Engineering at Scale",
  description:
    "Explore Quantimite's verified portfolio and engineering case studies across Web, Mobile, SaaS, Design Systems, and Digital Growth.",
  keywords: [
    "Quantimite Portfolio",
    "Engineering Case Studies",
    "SaaS Architecture",
    "Mobile App Development",
    "Design Systems",
    "Digital Growth",
    "Next.js Development",
  ],
  openGraph: {
    title: "Portfolio & Case Studies | Quantimite",
    description:
      "Explore Quantimite's verified portfolio and engineering case studies across Web, Mobile, SaaS, Design Systems, and Digital Growth.",
    url: "https://quantimite.com/portfolio",
    siteName: "Quantimite",
    type: "website",
  },
};

export default function PortfolioPage() {
  const projects = getAllProjects();

  return (
    <div className="bg-[#fbfaff]">
      {/* Hero with background video and scroll animation */}
      <PortfolioHero />

      {/* Interactive Project Grid with Filters (Web, Mobile, SaaS, Design, Marketing) & Search */}
      <PortfolioGrid projects={projects} />

      {/* CTA: Have a similar project? */}
      <PortfolioCTA />
    </div>
  );
}
