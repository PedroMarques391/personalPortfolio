"use client";
import { motion } from "motion/react";
import React from "react";

interface IMarqueeProps {
  children: React.ReactNode;
}

const MarqueeEffect = ({ children }: IMarqueeProps): React.JSX.Element => {
  return (
    <div className="relative overflow-hidden text-white h-10 w-full flex items-center">
      <motion.div
        className="flex gap-x-4 whitespace-nowrap w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 28,
            ease: "linear",
          },
        }}
      >
        <div className="flex gap-x-4 items-center">{children}</div>
        <div className="flex gap-x-4 items-center" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default MarqueeEffect;
