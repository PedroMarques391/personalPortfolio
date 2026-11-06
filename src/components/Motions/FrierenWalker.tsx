"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";

const QUOTE_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7"] as const;

const FrierenWalker = (): React.JSX.Element => {
  const t = useTranslations("pages.contact");
  const shouldReduceMotion = useReducedMotion();

  const trackRef = useRef<HTMLDivElement>(null);
  const walkerRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const trackBoundsRef = useRef<{ left: number; width: number } | null>(null);

  const currentX = useRef(0);
  const targetX = useRef(0);
  const facing = useRef<1 | -1>(1);
  const rafId = useRef<number | null>(null);
  const isWalkingRef = useRef(false);
  const lastMouseTimeRef = useRef<number>(Date.now());

  const [activeQuoteIndex, setActiveQuoteIndex] = useState<number | null>(null);
  const [castBurst, setCastBurst] = useState(false);
  const quoteTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateTrackBounds = useCallback(() => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    trackBoundsRef.current = { left: rect.left, width: rect.width };
  }, []);

  const stepAnimation = useCallback(() => {
    const diff = targetX.current - currentX.current;
    const absDiff = Math.abs(diff);

    if (absDiff > 1.2) {
      const maxSpeed = 2.4;
      const step = Math.sign(diff) * Math.min(absDiff * 0.09, maxSpeed);
      currentX.current += step;

      const nextFacing: 1 | -1 = diff >= 0 ? 1 : -1;
      if (facing.current !== nextFacing) {
        facing.current = nextFacing;
        if (spriteRef.current) {
          spriteRef.current.style.transform = `scaleX(${nextFacing})`;
        }
      }

      if (!isWalkingRef.current) {
        isWalkingRef.current = true;
        if (spriteRef.current) {
          spriteRef.current.dataset.walking = "true";
        }
      }

      if (walkerRef.current) {
        walkerRef.current.style.transform = `translate3d(${currentX.current.toFixed(1)}px, 0, 0)`;
      }

      rafId.current = requestAnimationFrame(stepAnimation);
    } else {
      currentX.current = targetX.current;
      if (walkerRef.current) {
        walkerRef.current.style.transform = `translate3d(${currentX.current.toFixed(1)}px, 0, 0)`;
      }
      if (isWalkingRef.current) {
        isWalkingRef.current = false;
        if (spriteRef.current) {
          spriteRef.current.dataset.walking = "false";
        }
      }
      rafId.current = null;
    }
  }, []);

  const startWalkingLoop = useCallback(() => {
    if (shouldReduceMotion) return;
    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(stepAnimation);
    }
  }, [shouldReduceMotion, stepAnimation]);

  useEffect(() => {
    updateTrackBounds();
    window.addEventListener("resize", updateTrackBounds, { passive: true });
    return () => window.removeEventListener("resize", updateTrackBounds);
  }, [updateTrackBounds]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!trackBoundsRef.current) {
        updateTrackBounds();
      }
      const bounds = trackBoundsRef.current;
      if (!bounds || bounds.width === 0) return;

      lastMouseTimeRef.current = Date.now();
      const center = bounds.left + bounds.width / 2;
      const maxRadius = Math.max(bounds.width / 2 - 42, 40);
      const rawOffset = e.clientX - center;
      const clampedOffset = Math.max(
        -maxRadius,
        Math.min(maxRadius, rawOffset),
      );

      targetX.current = clampedOffset;
      startWalkingLoop();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const patrolInterval = setInterval(() => {
      if (Date.now() - lastMouseTimeRef.current < 4500) return;
      const bounds = trackBoundsRef.current;
      const maxRadius = bounds ? Math.max(bounds.width / 2 - 48, 40) : 120;
      const randomSpot = (Math.random() - 0.5) * 1.6 * maxRadius;
      targetX.current = randomSpot;
      startWalkingLoop();
    }, 5000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(patrolInterval);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [shouldReduceMotion, startWalkingLoop, updateTrackBounds]);

  useEffect(() => {
    return () => {
      if (quoteTimeoutRef.current) {
        clearTimeout(quoteTimeoutRef.current);
      }
    };
  }, []);

  const handleFrierenClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setActiveQuoteIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % QUOTE_KEYS.length;
    });

    setCastBurst(true);
    setTimeout(() => setCastBurst(false), 550);

    if (quoteTimeoutRef.current) {
      clearTimeout(quoteTimeoutRef.current);
    }
    quoteTimeoutRef.current = setTimeout(() => {
      setActiveQuoteIndex(null);
    }, 4800);
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    trackBoundsRef.current = { left: rect.left, width: rect.width };
    const center = rect.left + rect.width / 2;
    const maxRadius = Math.max(rect.width / 2 - 42, 40);
    const rawOffset = e.clientX - center;
    targetX.current = Math.max(-maxRadius, Math.min(maxRadius, rawOffset));
    lastMouseTimeRef.current = Date.now();
    startWalkingLoop();
  };

  const isTalking = activeQuoteIndex !== null;
  const currentQuoteKey =
    activeQuoteIndex !== null ? QUOTE_KEYS[activeQuoteIndex] : null;

  return (
    <div
      ref={trackRef}
      onClick={handleTrackClick}
      className="relative w-[90%] max-w-xl mx-auto mt-32 mb-2 flex flex-col items-center select-none"
    >
      <div
        ref={walkerRef}
        className="relative z-20 flex flex-col items-center will-change-transform"
      >
        <AnimatePresence mode="wait">
          {currentQuoteKey && (
            <motion.div
              key={currentQuoteKey}
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 8, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.94 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute bottom-[92px] w-max max-w-[260px] sm:max-w-[310px] px-3.5 py-2 rounded-xl bg-[#161616]/95 border border-orange-500/40 text-gray-soft text-xs leading-relaxed text-center shadow-[0_8px_24px_rgba(0,0,0,0.65)] pointer-events-none"
            >
              <span className="block font-medium text-white/95">
                &ldquo;{t(`frierenQuotes.${currentQuoteKey}`)}&rdquo;
              </span>
              <span
                aria-hidden="true"
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-[#161616] border-r border-b border-orange-500/40"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={handleFrierenClick}
          aria-label={t("frierenAriaLabel")}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-2xl cursor-pointer"
        >
          <div
            ref={spriteRef}
            data-walking="false"
            className="frieren-sprite relative w-20 h-[90px] flex items-end justify-center transition-transform duration-150"
          >
            <span
              aria-hidden="true"
              className="absolute bottom-0.5 w-10 h-1.5 rounded-full bg-orange-500/25 blur-[2px]"
            />

            <div
              className={`frieren-character relative w-full h-full ${
                castBurst ? "scale-105" : ""
              } transition-transform duration-150`}
            >
              <Image
                src="/assets/frieren-idle.webp"
                alt="Frieren"
                width={160}
                height={180}
                priority
                draggable={false}
                className={`w-full h-full object-contain select-none pointer-events-none transition-opacity duration-150 ${
                  isTalking ? "opacity-0" : "opacity-100"
                }`}
              />

              <Image
                src="/assets/frieren-smug.webp"
                alt=""
                aria-hidden="true"
                width={160}
                height={180}
                priority
                draggable={false}
                className={`absolute inset-0 w-full h-full object-contain select-none pointer-events-none transition-opacity duration-150 ${
                  isTalking ? "opacity-100" : "opacity-0"
                }`}
              />

              {castBurst && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-[26%] right-[6%] w-5 h-5 rounded-full border-2 border-orange-400 bg-orange-500/30 animate-ping"
                />
              )}
            </div>
          </div>
        </button>
      </div>

      <div
        aria-hidden="true"
        className="relative w-full h-[2px] -mt-1 bg-gradient-to-r from-transparent via-orange-500/60 to-transparent rounded-full"
      >
        <div className="absolute inset-x-16 -top-[2px] h-[6px] bg-gradient-to-r from-transparent via-orange-500/25 to-transparent blur-sm" />
        <span className="absolute left-1/4 -top-0.5 w-1.5 h-1.5 rounded-full bg-orange-400/60" />
        <span className="absolute right-1/4 -top-0.5 w-1.5 h-1.5 rounded-full bg-orange-400/60" />
      </div>

      <style jsx>{`
        .frieren-character {
          transform-origin: 50% 95%;
          animation: frieren-idle-breathe 3s ease-in-out infinite;
          will-change: transform;
        }

        .frieren-sprite[data-walking="true"] .frieren-character {
          animation: frieren-walk-waddle 0.42s ease-in-out infinite;
        }

        @keyframes frieren-idle-breathe {
          0%,
          100% {
            transform: translateY(0px) scaleY(1);
          }
          50% {
            transform: translateY(-2px) scaleY(1.015);
          }
        }

        @keyframes frieren-walk-waddle {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-4px) rotate(-3.5deg);
          }
          50% {
            transform: translateY(0px) rotate(0deg);
          }
          75% {
            transform: translateY(-4px) rotate(3.5deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .frieren-character {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default memo(FrierenWalker);
