"use client";

import { motion, useReducedMotion } from "motion/react";
import { FaNodeJs, FaReact } from "react-icons/fa";
import { SiNextdotjs, SiTypescript } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import Tilt3DCard from "./Tilt3DCard";

const waveTransition = {
  duration: 4,
  ease: "easeInOut" as const,
  repeat: Infinity,
};

export default function MotionPath() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="relative w-full max-w-[500px] py-2 select-none"
    >
      <Tilt3DCard
        maxTilt={8}
        glareOpacity={0.03}
        perspective={950}
        className="w-full rounded-lg bg-gray-light p-4"
      >
        <div className="relative w-full overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 170"
            className="w-full h-auto"
          >
            <motion.path
              d="M 0 40 Q 50 20, 100 40 T 200 40 T 300 40 T 400 40 T 500 40 
                 M 0 85 Q 50 105, 100 85 T 200 85 T 300 85 T 400 85 T 500 85
                 M 0 130 Q 50 110, 100 130 T 200 130 T 300 130 T 400 130 T 500 130"
              fill="transparent"
              strokeWidth="3"
              stroke="#998f8f"
              strokeOpacity="0.45"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 1 }}
              transition={waveTransition}
            />
          </svg>

          {!shouldReduceMotion && (
            <motion.div
              className="absolute top-0 left-0 w-4 h-4 bg-gray-soft/40 rounded-full pointer-events-none"
              style={{
                offsetPath: `path("M 0 40 Q 50 20, 100 40 T 200 40 T 300 40 T 400 40 T 500 40,
                  M 0 85 Q 50 105, 100 85 T 200 85 T 300 85 T 400 85 T 500 85,
                  M 0 130 Q 50 110, 100 130 T 200 130 T 300 130 T 400 130 T 500 130")`,
              }}
              initial={{ offsetDistance: "0%", scale: 1.6 }}
              animate={{ offsetDistance: "100%", scale: 0.9 }}
              transition={waveTransition}
            />
          )}
        </div>

        <div
          style={{ transform: "translateZ(26px)" }}
          className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none"
        >
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 text-gray-soft rounded-full text-xs font-medium">
              <SiNextdotjs className="text-white" size={14} />
              <span>Next.js</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 text-gray-soft rounded-full text-xs font-medium">
              <FaNodeJs className="text-green-500" size={14} />
              <span>Node.js</span>
            </div>
          </div>

          <div
            style={{ transform: "translateZ(14px)" }}
            className="mx-auto flex items-center gap-2 px-4 py-1.5 bg-black/80 text-gray-soft rounded-full text-xs font-mono"
          >
            <code>{"<Pedro"}</code>
            <code className="text-orange-400">{"Marques/>"}</code>
          </div>

          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 text-gray-soft rounded-full text-xs font-medium">
              <FaReact className="text-blue-400" size={14} />
              <span>React</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 text-gray-soft rounded-full text-xs font-medium">
              <TbBrandReactNative className="text-cyan-400" size={15} />
              <span>React Native</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-800 text-gray-soft rounded-full text-xs font-medium">
              <SiTypescript className="text-blue-500" size={13} />
              <span>TypeScript</span>
            </div>
          </div>
        </div>
      </Tilt3DCard>
    </div>
  );
}
