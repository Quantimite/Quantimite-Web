"use client";
import Link from "next/link";
import type { ComponentProps, PointerEvent, ReactNode } from "react";

type BaseProps = {
  variant?: "fill" | "outline" | "nav";
  size?: "md" | "sm";
  className?: string;
  children?: ReactNode;
};

type LinkProps = BaseProps & Omit<ComponentProps<typeof Link>, keyof BaseProps> & { href: string };
type ButtonProps = BaseProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: undefined };

type Props = LinkProps | ButtonProps;

// Tracks the cursor over the button so the gradient stroke / sheen follows it.
export default function Button({ variant = "fill", size = "md", className = "", onPointerMove, ...props }: Props) {
  const move = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget, r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--a", `${60 + (x / r.width) * 60}deg`);
    if (onPointerMove) {
      onPointerMove(e as any);
    }
  };
  const nav = variant === "nav";
  const pad = nav ? "px-4 py-2 text-sm font-medium" : size === "sm" ? "px-5 py-2.5 text-sm font-semibold" : "px-7 py-3.5 font-semibold";
  const classes = `${nav ? "btn-outline btn-nav" : `btn-${variant}`} inline-flex items-center justify-center rounded-full ${pad} cursor-pointer ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link
        {...(props as ComponentProps<typeof Link>)}
        onPointerMove={move}
        className={classes}
      />
    );
  }

  return (
    <button
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      onPointerMove={move}
      className={classes}
    />
  );
}
