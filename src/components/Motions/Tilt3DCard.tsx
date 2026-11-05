"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import React, { useRef } from "react";

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
  perspective?: number;
  disabled?: boolean;
}

export default function Tilt3DCard({
  children,
  className = "",
  maxTilt = 7,
  glareOpacity = 0.05,
  perspective = 1000,
  disabled = false,
}: Tilt3DCardProps): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const isHovered = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(my, [0, 1], [maxTilt, -maxTilt]),
    { stiffness: 220, damping: 26, mass: 0.8 },
  );
  const rotateY = useSpring(
    useTransform(mx, [0, 1], [-maxTilt, maxTilt]),
    { stiffness: 220, damping: 26, mass: 0.8 },
  );
  const glareAlpha = useSpring(isHovered, { stiffness: 200, damping: 25 });

  const glareX = useTransform(mx, (v) => `${(v * 100).toFixed(1)}%`);
  const glareY = useTransform(my, (v) => `${(v * 100).toFixed(1)}%`);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, ${glareOpacity}), transparent 60%)`;

  const isDisabled = disabled || !!shouldReduceMotion;

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDisabled || e.pointerType === "touch" || !ref.current) return;
    rectRef.current = ref.current.getBoundingClientRect();
    isHovered.set(1);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDisabled || e.pointerType === "touch") return;
    const rect = rectRef.current ?? ref.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return;

    const x = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    const y = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);
    mx.set(x);
    my.set(y);
  };

  const handlePointerLeave = () => {
    rectRef.current = null;
    mx.set(0.5);
    my.set(0.5);
    isHovered.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        isDisabled
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: perspective,
              transformStyle: "preserve-3d",
            }
      }
      className={`relative ${className}`}
    >
      {children}
      {!isDisabled && glareOpacity > 0 && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-20"
          style={{
            background: glareBackground,
            opacity: glareAlpha,
          }}
        />
      )}
    </motion.div>
  );
}
