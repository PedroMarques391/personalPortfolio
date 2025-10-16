"use client";

import { motion } from "motion/react";

interface ISkeletonProps {
  index: number;
}

function Skeleton({ index }: ISkeletonProps) {
  return (
    <motion.div
      className="bg-zinc-900 rounded-xl h-72 animate-pulse"
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ delay: index * 0.05 }}
    />
  );
}

export default Skeleton;
