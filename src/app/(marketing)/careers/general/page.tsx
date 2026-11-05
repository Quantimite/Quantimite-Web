import type { Metadata } from "next";
import ApplicationForm from "@/components/careers/ApplicationForm";

export const metadata: Metadata = {
  title: "General Application & Talent Pool | Quantimite Careers",
  description:
    "Join our general engineering & design talent pool. Our founding partners review open submissions directly for upcoming studio pods.",
};

export default function GeneralApplicationPage() {
  return (
    <div className="min-h-screen bg-[#fbfaff]">
      <ApplicationForm />
    </div>
  );
}
