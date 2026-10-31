// src/app/(marketing)/services/MascotCodeImage.tsx
"use client";

import React from "react";

export default function MascotCodeImage() {
    return (
        <div className="relative w-full h-full flex items-center justify-center min-h-[350px]">
            <div className="absolute w-72 h-72 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
            <div className="relative z-10 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md max-w-sm w-full space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">quantimite-core.ts</span>
                </div>
                <pre className="text-[11px] font-mono text-blue-400 overflow-x-auto leading-relaxed">
                    <code>{`// Quantimite System Core v2.5
import { Engine } from "@quantimite/core";

const platform = new Engine({
  mode: "high-scale",
  security: "enterprise",
  zeroDebt: true
});

platform.init();`}</code>
                </pre>
            </div>
        </div>
    );
}