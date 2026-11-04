import type { Metadata } from "next";
import PortfolioHeroCarousel from "@/components/portfolio/PortfolioHeroCarousel";
import PortfolioPlaceholderGrid from "@/components/portfolio/PortfolioPlaceholderGrid";
import PortfolioCTA from "@/components/portfolio/PortfolioCTA";
import { getAllProjects } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Portfolio & Project Showcase | Quantimite — Engineering at Scale",
  description:
    "Explore Quantimite's engineering showcase, upcoming project slots, and technical capabilities across Web, Mobile, SaaS, Design Systems, and Digital Growth.",
  keywords: [
    "Quantimite Portfolio",
    "Engineering Showcase",
    "SaaS Architecture",
    "Mobile App Development",
    "Design Systems",
    "Digital Growth",
    "Next.js Development",
  ],
  openGraph: {
    title: "Portfolio & Project Showcase | Quantimite",
    description:
      "Explore Quantimite's engineering showcase, upcoming project slots, and technical capabilities across Web, Mobile, SaaS, Design Systems, and Digital Growth.",
    url: "https://quantimite.com/portfolio",
    siteName: "Quantimite",
    type: "website",
  },
};

export default function PortfolioPage() {
  const projects = getAllProjects();

  return (
    <div className="bg-[#fbfaff]">
      {/* Hero Carousel with generated videos and crossfade transitions */}
      <PortfolioHeroCarousel />

      {/* Project Grid with wireframe placeholder boxes, blank spaces for later addition, filters & search */}
      <PortfolioPlaceholderGrid projects={projects} />

      {/* CTA: Have a similar project? */}
      <PortfolioCTA />
    </div>
  );
}
