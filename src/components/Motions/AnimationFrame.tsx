"use client";

import {
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import React, { useRef } from "react";

export default function AnimationFrame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const outerCubeRef = useRef<HTMLDivElement>(null);
  const innerCubeRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(containerRef, { amount: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 20 });

  useAnimationFrame((t) => {
    if (!isInView || shouldReduceMotion) return;

    const px = smoothX.get();
    const py = smoothY.get();

    const baseRotX = Math.sin(t / 6000) * 180 + py * 35;
    const baseRotY = (t / 45) % 360 + px * 45;
    const floatY = Math.sin(t / 1200) * -14;

    if (outerCubeRef.current) {
      outerCubeRef.current.style.transform = `translateY(${floatY}px) rotateX(${baseRotX}deg) rotateY(${baseRotY}deg)`;
    }

    if (innerCubeRef.current) {
      innerCubeRef.current.style.transform = `translateY(${floatY}px) rotateX(${-baseRotX * 1.3}deg) rotateY(${-baseRotY * 1.3}deg)`;
    }

    if (ringRef.current) {
      ringRef.current.style.transform = `translateY(${floatY}px) rotateX(${65 + py * 20}deg) rotateZ(${(t / 30) % 360}deg)`;
    }
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    pointerX.set(nx);
    pointerY.set(ny);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="tesseract-stage select-none"
      aria-hidden="true"
    >
      <div className="orbital-ring" ref={ringRef} />

      <div className="cube outer-cube" ref={outerCubeRef}>
        <div className="side front" />
        <div className="side left" />
        <div className="side right" />
        <div className="side top" />
        <div className="side bottom" />
        <div className="side back" />
      </div>

      <div className="cube inner-cube" ref={innerCubeRef}>
        <div className="inner-side i-front" />
        <div className="inner-side i-left" />
        <div className="inner-side i-right" />
        <div className="inner-side i-top" />
        <div className="inner-side i-bottom" />
        <div className="inner-side i-back" />
      </div>

      <StyleSheet />
    </div>
  );
}

function StyleSheet() {
  return (
    <style>{`
      .tesseract-stage {
        perspective: 1000px;
        width: 320px;
        height: 320px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: grab;
      }

      .orbital-ring {
        position: absolute;
        width: 260px;
        height: 260px;
        border-radius: 9999px;
        border: 1px dashed rgba(249, 115, 22, 0.45);
        box-shadow: 0 0 30px rgba(249, 115, 22, 0.12);
        transform-style: preserve-3d;
        transform: rotateX(65deg);
        pointer-events: none;
      }

      .cube {
        position: absolute;
        transform-style: preserve-3d;
        pointer-events: none;
      }

      .outer-cube {
        width: 170px;
        height: 170px;
        transform: rotateX(-22deg) rotateY(35deg);
      }

      .inner-cube {
        width: 76px;
        height: 76px;
        transform: rotateX(22deg) rotateY(-35deg);
      }

      .side {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 1.5px solid rgba(249, 115, 22, 0.55);
        box-shadow: inset 0 0 24px rgba(249, 115, 22, 0.12);
        backdrop-filter: blur(2px);
      }

      .front  { transform: rotateY(0deg) translateZ(85px); background-color: rgba(28, 28, 28, 0.55); }
      .right  { transform: rotateY(90deg) translateZ(85px); background-color: rgba(249, 115, 22, 0.14); }
      .back   { transform: rotateY(180deg) translateZ(85px); background-color: rgba(28, 28, 28, 0.55); }
      .left   { transform: rotateY(-90deg) translateZ(85px); background-color: rgba(249, 115, 22, 0.12); }
      .top    { transform: rotateX(90deg) translateZ(85px); background-color: rgba(249, 115, 22, 0.22); }
      .bottom { transform: rotateX(-90deg) translateZ(85px); background-color: rgba(18, 18, 18, 0.7); }

      .inner-side {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 1.5px solid rgba(251, 191, 36, 0.85);
        background-color: rgba(249, 115, 22, 0.45);
        box-shadow: 0 0 20px rgba(249, 115, 22, 0.4), inset 0 0 12px rgba(255, 255, 255, 0.25);
      }

      .i-front  { transform: rotateY(0deg) translateZ(38px); }
      .i-right  { transform: rotateY(90deg) translateZ(38px); }
      .i-back   { transform: rotateY(180deg) translateZ(38px); }
      .i-left   { transform: rotateY(-90deg) translateZ(38px); }
      .i-top    { transform: rotateX(90deg) translateZ(38px); }
      .i-bottom { transform: rotateX(-90deg) translateZ(38px); }
    `}</style>
  );
}
