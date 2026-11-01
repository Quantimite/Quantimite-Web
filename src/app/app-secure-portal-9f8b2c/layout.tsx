import type { Metadata } from "next";
export const metadata: Metadata = { title: "Quantimite CMP", robots: { index: false, follow: false } };
export default function CmpRoot({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#f6f4ff]">{children}</div>;
}
