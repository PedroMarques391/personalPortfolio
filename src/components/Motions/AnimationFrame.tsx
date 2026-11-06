"use client";

import React, { memo, useEffect, useRef, useState } from "react";

const AnimationFrame = (): React.JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tilterRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const [isInView, setIsInView] = useState(true);

  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const isHovered = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (!entry.isIntersecting && rafId.current) {
          cancelAnimationFrame(rafId.current);
          rafId.current = null;
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const updateTilt = () => {
    const ease = 0.08;
    currentX.current += (targetX.current - currentX.current) * ease;
    currentY.current += (targetY.current - currentY.current) * ease;

    if (tilterRef.current) {
      tilterRef.current.style.transform = `rotateX(${-currentY.current * 24}deg) rotateY(${currentX.current * 24}deg)`;
    }

    const deltaX = Math.abs(targetX.current - currentX.current);
    const deltaY = Math.abs(targetY.current - currentY.current);

    if (isHovered.current || deltaX > 0.002 || deltaY > 0.002) {
      rafId.current = requestAnimationFrame(updateTilt);
    } else {
      rafId.current = null;
    }
  };

  const handlePointerEnter = () => {
    if (!containerRef.current) return;
    rectRef.current = containerRef.current.getBoundingClientRect();
    isHovered.current = true;
    if (!rafId.current) {
      rafId.current = requestAnimationFrame(updateTilt);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect =
      rectRef.current ?? containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return;

    targetX.current = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    targetY.current = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    if (!rafId.current) {
      rafId.current = requestAnimationFrame(updateTilt);
    }
  };

  const handlePointerLeave = () => {
    isHovered.current = false;
    rectRef.current = null;
    targetX.current = 0;
    targetY.current = 0;
  };

  return (
    <div className="flex flex-col items-center justify-center select-none py-6">
      <div
        ref={containerRef}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="tesseract-stage"
        aria-hidden="true"
      >
        <div
          ref={tilterRef}
          className="tesseract-tilter"
          style={{
            animationPlayState: isInView ? "running" : "paused",
          }}
        >
          <div
            className="tesseract-floater"
            style={{
              animationPlayState: isInView ? "running" : "paused",
            }}
          >
            <div
              className="orbital-ring ring-1"
              style={{
                animationPlayState: isInView ? "running" : "paused",
              }}
            />
            <div
              className="orbital-ring ring-2"
              style={{
                animationPlayState: isInView ? "running" : "paused",
              }}
            />

            <div
              className="cube outer-cube"
              style={{
                animationPlayState: isInView ? "running" : "paused",
              }}
            >
              <div className="side front" />
              <div className="side right" />
              <div className="side back" />
              <div className="side left" />
              <div className="side top" />
              <div className="side bottom" />
            </div>

            <div
              className="cube inner-cube"
              style={{
                animationPlayState: isInView ? "running" : "paused",
              }}
            >
              <div className="inner-side i-front" />
              <div className="inner-side i-right" />
              <div className="inner-side i-back" />
              <div className="inner-side i-left" />
              <div className="inner-side i-top" />
              <div className="inner-side i-bottom" />
            </div>

            <div
              className="core-node"
              style={{
                animationPlayState: isInView ? "running" : "paused",
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .tesseract-stage {
          perspective: 1100px;
          width: 320px;
          height: 320px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: grab;
        }

        .tesseract-stage:active {
          cursor: grabbing;
        }

        .tesseract-tilter {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .tesseract-floater {
          position: relative;
          width: 170px;
          height: 170px;
          display: flex;
          justify-content: center;
          align-items: center;
          transform-style: preserve-3d;
          animation: tesseract-float 6s ease-in-out infinite;
          will-change: transform;
        }

        .orbital-ring {
          position: absolute;
          border-radius: 9999px;
          transform-style: preserve-3d;
          pointer-events: none;
          will-change: transform;
        }

        .ring-1 {
          width: 260px;
          height: 260px;
          border: 1px dashed rgba(249, 115, 22, 0.45);
          box-shadow: 0 0 20px rgba(249, 115, 22, 0.08);
          animation: tesseract-spin-ring-1 22s linear infinite;
        }

        .ring-2 {
          width: 220px;
          height: 220px;
          border: 1px solid rgba(249, 115, 22, 0.2);
          animation: tesseract-spin-ring-2 18s linear infinite reverse;
        }

        .cube {
          position: absolute;
          transform-style: preserve-3d;
          pointer-events: none;
          will-change: transform;
        }

        .outer-cube {
          width: 150px;
          height: 150px;
          animation: tesseract-spin-outer 26s linear infinite;
        }

        .inner-cube {
          width: 72px;
          height: 72px;
          animation: tesseract-spin-inner 13s linear infinite reverse;
        }

        .side {
          position: absolute;
          width: 150px;
          height: 150px;
          border: 1.5px solid rgba(249, 115, 22, 0.48);
          background-color: rgba(22, 22, 22, 0.58);
          box-shadow: inset 0 0 15px rgba(249, 115, 22, 0.06);
        }

        .front {
          transform: rotateY(0deg) translateZ(75px);
        }
        .right {
          transform: rotateY(90deg) translateZ(75px);
          background-color: rgba(249, 115, 22, 0.08);
        }
        .back {
          transform: rotateY(180deg) translateZ(75px);
        }
        .left {
          transform: rotateY(-90deg) translateZ(75px);
          background-color: rgba(249, 115, 22, 0.06);
        }
        .top {
          transform: rotateX(90deg) translateZ(75px);
          background-color: rgba(249, 115, 22, 0.12);
        }
        .bottom {
          transform: rotateX(-90deg) translateZ(75px);
          background-color: rgba(14, 14, 14, 0.7);
        }

        .inner-side {
          position: absolute;
          width: 72px;
          height: 72px;
          border: 1.5px solid rgba(251, 191, 36, 0.85);
          background-color: rgba(249, 115, 22, 0.38);
          box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.18);
        }

        .i-front {
          transform: rotateY(0deg) translateZ(36px);
        }
        .i-right {
          transform: rotateY(90deg) translateZ(36px);
        }
        .i-back {
          transform: rotateY(180deg) translateZ(36px);
        }
        .i-left {
          transform: rotateY(-90deg) translateZ(36px);
        }
        .i-top {
          transform: rotateX(90deg) translateZ(36px);
        }
        .i-bottom {
          transform: rotateX(-90deg) translateZ(36px);
        }

        .core-node {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background-color: #f97316;
          box-shadow: 0 0 16px rgba(249, 115, 22, 0.9);
          animation: core-pulse 2.8s ease-in-out infinite;
        }

        @keyframes tesseract-float {
          0%,
          100% {
            transform: translateY(-9px);
          }
          50% {
            transform: translateY(9px);
          }
        }

        @keyframes tesseract-spin-outer {
          0% {
            transform: rotateX(0deg) rotateY(0deg);
          }
          100% {
            transform: rotateX(360deg) rotateY(360deg);
          }
        }

        @keyframes tesseract-spin-inner {
          0% {
            transform: rotateX(0deg) rotateY(0deg);
          }
          100% {
            transform: rotateX(360deg) rotateY(-720deg);
          }
        }

        @keyframes tesseract-spin-ring-1 {
          0% {
            transform: rotateX(68deg) rotateZ(0deg);
          }
          100% {
            transform: rotateX(68deg) rotateZ(360deg);
          }
        }

        @keyframes tesseract-spin-ring-2 {
          0% {
            transform: rotateY(65deg) rotateX(35deg) rotateZ(0deg);
          }
          100% {
            transform: rotateY(65deg) rotateX(35deg) rotateZ(360deg);
          }
        }

        @keyframes core-pulse {
          0%,
          100% {
            transform: scale(0.85);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.25);
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tesseract-floater,
          .outer-cube,
          .inner-cube,
          .orbital-ring,
          .core-node {
            animation: none !important;
          }
          .outer-cube {
            transform: rotateX(-20deg) rotateY(35deg);
          }
          .inner-cube {
            transform: rotateX(20deg) rotateY(-35deg);
          }
          .ring-1 {
            transform: rotateX(68deg);
          }
          .ring-2 {
            transform: rotateY(65deg) rotateX(35deg);
          }
        }
      `}</style>
    </div>
  );
};

export default memo(AnimationFrame);
