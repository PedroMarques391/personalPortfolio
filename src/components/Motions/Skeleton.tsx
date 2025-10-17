"use client";

import { motion } from "motion/react";

interface ISkeletonProps {
  index: number;
}

function Skeleton({ index }: ISkeletonProps) {
  return (
    <motion.div
      className="bg-zinc-900 rounded-xl h-[500px] animate-pulse"
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
