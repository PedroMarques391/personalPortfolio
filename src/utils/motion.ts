import type { Variants } from "motion/react";

export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  in: [0.55, 0, 1, 0.45] as const,
};

export const spring = {
  snappy: { type: "spring" as const, visualDuration: 0.25, bounce: 0.15 },
  smooth: { type: "spring" as const, visualDuration: 0.45, bounce: 0.1 },
  bouncy: { type: "spring" as const, visualDuration: 0.5, bounce: 0.3 },
};

export const duration = {
  micro: 0.15,
  ui: 0.3,
  hero: 0.75,
} as const;

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerFastContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
};

export const fadeUpBlur: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: duration.hero,
      ease: ease.out,
    },
  },
};

export const techBadgeVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.94,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: ease.out,
    },
  },
};
