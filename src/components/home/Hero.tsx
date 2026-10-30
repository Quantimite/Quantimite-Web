"use client";
import Button from "@/components/ui/Button";
import { useEffect, useRef } from "react";

import MascotImage from "./MascotImage";

export default function Hero() {
  const ghost = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const on = (e: PointerEvent) => {
      const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
      ghost.current!.style.transform = `translate3d(${x * -36}px, ${y * -24}px, 0)`;
    };
    addEventListener("pointermove", on);
    return () => removeEventListener("pointermove", on);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-4 px-6 py-12 lg:grid-cols-2">
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-plum sm:text-6xl xl:text-7xl">
            We engineer your next move.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-plum/70">
            Digital products, software solutions, and growth strategies designed to help ambitious businesses move forward.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/contact">Start a project</Button>
            <Button href="/portfolio" variant="outline">View our work</Button>
          </div>
          <p className="mt-10 text-sm font-semibold text-plum/50">Software · Design · Digital growth</p>
        </div>

        <div className="relative h-[420px] sm:h-[540px] lg:h-[620px]">
          <div ref={ghost} aria-hidden className="absolute inset-0 grid place-items-center select-none will-change-transform">
            <span className="text-[22rem] font-extrabold leading-none text-brand opacity-[0.12] sm:text-[30rem]">Q</span>
          </div>
          <div className="absolute inset-0"><MascotImage /></div>
                  </div>
      </div>
    </section>
  );
}
