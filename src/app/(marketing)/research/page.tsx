import { Metadata } from "next";
import {
  getAllFocusAreas,
  getAllPublications,
  getAllPrototypes,
  getAllResearcherSlots,
} from "@/lib/research-data";
import {
  ResearchHero,
  ResearchFocusAreas,
  PublicationsSection,
  RDPrototypesSection,
  ResearcherPlaceholderGrid,
  CollaborationForm,
  ResearchNewsletter,
} from "@/components/research";

export const metadata: Metadata = {
  title: "Applied Research & Innovation | Quantimite Labs",
  description:
    "Explore Quantimite's applied research across deterministic AI agent architectures, post-quantum cryptographic security, WebAssembly runtimes, and privacy-preserving mathematical attribution.",
  openGraph: {
    title: "Applied Research & Innovation | Quantimite Labs",
    description:
      "Explore Quantimite's applied research across deterministic AI agent architectures, post-quantum cryptographic security, WebAssembly runtimes, and privacy-preserving mathematical attribution.",
  },
};

export default function ResearchPage() {
  const focusAreas = getAllFocusAreas();
  const publications = getAllPublications();
  const prototypes = getAllPrototypes();
  const researcherSlots = getAllResearcherSlots();

  return (
    <main className="min-h-screen pb-20">
      {/* 1. Hero Section with scientific telemetry */}
      <ResearchHero />

      {/* 2. Research Focus Areas */}
      <ResearchFocusAreas focusAreas={focusAreas} />

      {/* 3. Publications & Whitepapers with Search, Filter & Email-Gated Downloads */}
      <PublicationsSection publications={publications} />

      {/* 4. R&D Projects & Prototypes with GitHub Links */}
      <RDPrototypesSection prototypes={prototypes} />

      {/* 5. Researchers & Contributors: Wireframe Placeholder Slots (Ready to be populated later!) */}
      <ResearcherPlaceholderGrid slots={researcherSlots} />

      {/* 6. University & Enterprise Collaboration Form */}
      <CollaborationForm />

      {/* 7. Quantimite Frontier Gazette Newsletter */}
      <ResearchNewsletter />
    </main>
  );
}
