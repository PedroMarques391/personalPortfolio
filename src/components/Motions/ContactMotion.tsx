"use client";

import { motion, useReducedMotion } from "motion/react";

export default function UseTime() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 right-0 h-[220px] overflow-hidden flex justify-center items-center"
    >
      <div
        className="w-full max-w-4xl h-full opacity-25"
        style={{
          perspective: "500px",
        }}
      >
        <div
          className="w-full h-full"
          style={{
            transform: "rotateX(62deg)",
            backgroundImage:
              "linear-gradient(to right, rgba(249,115,22,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse at 50% 50%, black 20%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 50%, black 20%, transparent 75%)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0.35, scale: 0.9 }}
        animate={
          shouldReduceMotion
            ? { opacity: 0.4, scale: 1 }
            : { opacity: [0.3, 0.55, 0.3], scale: [0.95, 1.08, 0.95] }
        }
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-6 w-72 h-28 rounded-full bg-orange-500/20 blur-3xl"
      />
    </div>
  );
}
