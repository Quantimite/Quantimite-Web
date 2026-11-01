import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ChatProvider } from "@/context/ChatContext";
import ChatWidget from "@/components/chat/ChatWidget";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Quantimite | We Engineer Your Next Move.",
  description: "Software engineering, product design, and digital growth for ambitious businesses.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ChatProvider>
          {children}
          <ChatWidget />
        </ChatProvider>
      </body>
    </html>
  );
}