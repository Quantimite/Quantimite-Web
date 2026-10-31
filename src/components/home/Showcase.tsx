"use client";

import { useEffect, useRef } from "react";

const projects = [
  {
    id: "1",
    title: "Mathota Ceramic POS",
    category: "Full-Stack Enterprise",
    clientName: "Mathota Industries",
    gradient: "from-purple-600 to-indigo-600",
    uiElements: {
      nav: "PRODUCTS • INVENTORY",
      heading: "Ceramic & Bathware Stock Control",
      subtext: "Multi-branch point-of-sale system built for speed.",
    },
    codeSnippet: "<article>\n  <header>Mathota POS v1.0</header>\n  <code>POST /api/v1/pos/sync</code>\n  <p>Branch: Stock synchronized</p>\n</article>",
  },
  {
    id: "2",
    title: "WanaJeevi Platform",
    category: "Wildlife Conservation",
    clientName: "EcoGuardians SL",
    gradient: "from-indigo-500 to-blue-500",
    uiElements: {
      nav: "MAP • INCIDENTS • REPORTS",
      heading: "Human-Wildlife Co-existence Hub",
      subtext: "Real-time tracking and emergency alert telemetry.",
    },
    codeSnippet: "<article>\n  <header>WanaJeevi Radar</header>\n  <code>GET /api/v1/alerts/live</code>\n  <p>Telemetry: 50km Radius</p>\n</article>",
  },
  {
    id: "3",
    title: "GitLore Workspace",
    category: "Developer Tooling",
    clientName: "404 Found HQ",
    gradient: "from-blue-400 to-cyan-500",
    uiElements: {
      nav: "GRAPH • COMMITS • BRANCHES",
      heading: "Repository Visual Workspace Maps",
      subtext: "Translating commit histories into clear visual maps.",
    },
    codeSnippet: "<article>\n  <header>GitLore Engine</header>\n  <code>parseAST(commitHash)</code>\n  <p>Tree: Depth 3 compiled</p>\n</article>",
  },
  {
    id: "4",
    title: "Quantimite Portal",
    category: "Digital Consultancy",
    clientName: "Quantimite Corp",
    gradient: "from-purple-500 to-pink-500",
    uiElements: {
      nav: "SERVICES • CASE STUDIES",
      heading: "We Engineer Your Next Move",
      subtext: "Enterprise software architecture and digital growth.",
    },
    codeSnippet: "<article>\n  <header>Quantimite Core</header>\n  <code>docker run -d cloud-run</code>\n  <p>Status: 99.99% Uptime</p>\n</article>",
  },
];

export default function Showcase() {
  return (
    <section className="py-24 bg-white text-gray-900 relative overflow-hidden">

      {/* Global CSS for Synchronized Infinite Marquee Tracks */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-sync {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
      `}</style>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Selected work
            </h2>
          </div>
          <a
            href="/portfolio"
            className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-1 group"
          >
            See all case studies
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>

      {/* Conveyor Belt & Scanner Container */}
      <div className="relative w-full overflow-hidden py-10">

        {/* Glowing Blue Vertical Scanner Line locked precisely at the center */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-blue-500 via-indigo-400 to-blue-600 z-40 shadow-[0_0_40px_rgba(59,130,246,0.9)] pointer-events-none flex items-center justify-center">
          <div className="absolute w-4 h-4 rounded-full bg-blue-500 animate-ping" />
        </div>

        {/* LEFT TRACK (Clean White Background HTML Code View) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none flex items-center bg-white"
          style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
        >
          <div className="animate-marquee-sync flex gap-8 pl-12">
            {[...projects, ...projects].map((project, index) => (
              <div key={`code-${index}`} className="inline-flex flex-col flex-shrink-0 w-[420px]">
                {/* Clean Light-Mode HTML Code Text Display */}
                <div className="w-full h-[260px] p-6 flex flex-col justify-between font-mono text-gray-700 select-none">
                  <div className="flex justify-between items-center text-[10px] text-blue-600 border-b border-gray-200 pb-3">
                    <span className="uppercase tracking-wider font-semibold">&lt;article&gt; Tokenized View</span>
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[9px]">
                      -85% tokens
                    </span>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-[11px] leading-relaxed text-gray-800 font-mono overflow-hidden shadow-sm">
                    <pre className="whitespace-pre-wrap">{project.codeSnippet}</pre>
                  </div>

                  <div className="text-[10px] text-gray-400 pt-2 border-t border-gray-200 flex justify-between">
                    <span>Read by AI Agent</span>
                    <span className="text-blue-600 font-semibold">Parsed</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-col opacity-40">
                  <h3 className="text-base font-semibold text-gray-900">{project.title}</h3>
                  <p className="text-sm text-gray-500">{project.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT TRACK (Full UI Cards Only) */}
        <div
          className="w-full overflow-hidden flex items-center bg-white"
          style={{ clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }}
        >
          <div className="animate-marquee-sync flex gap-8 pl-12">
            {[...projects, ...projects].map((project, index) => (
              <div key={`card-${index}`} className="inline-flex flex-col flex-shrink-0 w-[420px]">
                {/* Full UI Gradient Card */}
                <div className={`w-full h-[260px] rounded-3xl bg-gradient-to-br ${project.gradient} p-6 flex flex-col justify-between text-white shadow-2xl border border-white/20`}>
                  <div className="flex justify-between items-center text-[10px] tracking-widest text-white/80 font-mono border-b border-white/20 pb-3">
                    <span>{project.uiElements.nav}</span>
                    <span className="opacity-80">{project.clientName}</span>
                  </div>

                  <div className="py-2">
                    <h4 className="text-lg font-bold text-white">{project.uiElements.heading}</h4>
                    <p className="text-xs text-white/80 mt-1 leading-relaxed">{project.uiElements.subtext}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/20">
                    <span className="text-[10px] bg-black/20 text-white px-2.5 py-1 rounded-md font-mono">
                      {project.category}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </div>
                </div>

                <div className="mt-4 flex flex-col">
                  <h3 className="text-base font-semibold text-gray-900">{project.title}</h3>
                  <p className="text-sm text-gray-500">{project.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}