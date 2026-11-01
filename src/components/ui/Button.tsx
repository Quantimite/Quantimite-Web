"use client";
import Link from "next/link";
import type { ComponentProps, PointerEvent } from "react";

type Props = ComponentProps<typeof Link> & { variant?: "fill" | "outline" | "nav"; size?: "md" | "sm" };

// Tracks the cursor over the button so the gradient stroke / sheen follows it.
export default function Button({ variant = "fill", size = "md", className = "", onPointerMove, ...props }: Props) {
  const move = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget, r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--a", `${60 + (x / r.width) * 60}deg`);
    onPointerMove?.(e);
  };
  const nav = variant === "nav";
  const pad = nav ? "px-4 py-2 text-sm font-medium" : size === "sm" ? "px-5 py-2.5 text-sm font-semibold" : "px-7 py-3.5 font-semibold";
  return (
    <Link
      {...props}
      onPointerMove={move}
      className={`${nav ? "btn-outline btn-nav" : `btn-${variant}`} inline-flex items-center justify-center rounded-full ${pad} ${className}`}
    />
  );
}
