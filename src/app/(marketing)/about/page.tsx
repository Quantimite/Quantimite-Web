import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import ValuesSection from "@/components/about/ValuesSection";
import TeamSection from "@/components/about/TeamSection";
import TimelineSection from "@/components/about/TimelineSection";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Us | Quantimite — We Engineer Your Next Move",
  description:
    "Discover Quantimite's story, mission, core beliefs, 4-phase engineering approach, and meet our passionate team of software builders and product designers.",
};

export default function AboutPage() {
  return (
    <article className="min-h-screen">
      {/* 1. Company Story & Mission */}
      <AboutHero />

      {/* 2. What We Believe (Three Values) */}
      <ValuesSection />

      {/* 3. Team Members Grid (Photos, Roles, Bios, Social Links) */}
      <TeamSection />

      {/* 4. Company Milestone Timeline Component */}
      <TimelineSection />

      {/* 5. Final CTA (Contact or Join the Team) */}
      <AboutCTA />
    </article>
  );
}
