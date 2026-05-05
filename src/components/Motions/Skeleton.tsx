"use client";

import { motion } from "motion/react";

interface ISkeletonProps {
  index: number;
  view?: "grid" | "list";
}

function Skeleton({ index, view = "grid" }: ISkeletonProps) {
  return (
    <motion.div
      className={`bg-zinc-900 rounded-xl animate-pulse ${view === "grid" ? "h-[500px]" : "h-[500px] md:h-64"}`}
      initial={{ scale: 0.9 }}
      animate={{
        scale: 1,
        transition: { delay: index * 0.05, ease: "easeOut" },
      }}
      exit={{
        scale: 0.1,
        transition: { delay: index * 0.05, ease: "easeIn" },
      }}
    />
  );
}

export default Skeleton;
