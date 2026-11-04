"use client";

import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface ScrollTextHeadingProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
  className?: string;
  delay?: number;
  wordStagger?: number;
  once?: boolean;
  amount?: number | "some" | "all";
}

/**
 * Splits heading text into words and animates each word in and out
 * as the user scrolls up and down.
 */
export function ScrollTextHeading({
  children,
  as: Component = "h2",
  className = "",
  delay = 0,
  wordStagger = 0.035,
  once = false,
  amount = 0.2,
}: ScrollTextHeadingProps) {
  const words = typeof children === "string" ? children.split(" ") : [children];

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: wordStagger,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 28,
      filter: "blur(6px)",
      transition: {
        duration: 0.45,
        ease: EASE,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.65,
        ease: EASE,
      },
    },
  };

  const MotionComponent = motion[Component as keyof typeof motion] as any;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={containerVariants}
      className={className}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.28em] last:mr-0 align-top">
          <motion.span variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </MotionComponent>
  );
}

export interface ScrollTextFadeProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "label";
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "none";
  once?: boolean;
  amount?: number | "some" | "all";
}

/**
 * Smoothly animates text paragraphs, badges, or descriptions in and out
 * when scrolling into or out of the viewport.
 */
export function ScrollTextFade({
  children,
  as: Component = "p",
  className = "",
  delay = 0,
  duration = 0.6,
  direction = "up",
  once = false,
  amount = 0.2,
}: ScrollTextFadeProps) {
  const yOffset = direction === "up" ? 24 : direction === "down" ? -24 : 0;

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      filter: "blur(4px)",
      transition: {
        duration: duration * 0.7,
        ease: EASE,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration,
        delay,
        ease: EASE,
      },
    },
  };

  const MotionComponent = motion[Component as keyof typeof motion] as any;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

export interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  amount?: number | "some" | "all";
}

/**
 * Container that staggers children elements in and out on scroll.
 */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  stagger = 0.08,
  once = false,
  amount = 0.15,
}: ScrollRevealProps) {
  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      transition: {
        staggerChildren: 0.04,
        staggerDirection: -1,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const scrollRevealItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(4px)",
    transition: {
      duration: 0.45,
      ease: EASE,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: EASE,
    },
  },
};
