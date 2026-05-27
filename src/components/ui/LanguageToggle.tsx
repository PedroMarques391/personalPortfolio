"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { AnimatePresence, motion } from "motion/react";
import { useLocale } from "next-intl";
import { useState } from "react";
import { TbWorld } from "react-icons/tb";

export function LanguageToggle(): React.JSX.Element {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  function handleLocaleChange(nextLocale: (typeof routing.locales)[number]) {
    const query = Object.fromEntries(
      new URLSearchParams(window.location.search),
    );
    router.replace({ pathname, query }, { locale: nextLocale });
  }

  return (
    <li
      role="group"
      aria-label="Seletor de idioma"
      className="relative inline-flex items-center list-none"
    >
      <div
        className="absolute inset-0 rounded-2xl blur-xl opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(249,115,22,0.55) 0%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <div
        className="
          relative flex items-center gap-0.5 p-1
          rounded-2xl
          border border-white/[0.07]
          backdrop-blur-sm
          shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.2)]
        "
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 50%, rgba(0,0,0,0.06) 100%)",
        }}
      >
        <div
          className="pl-2 pr-1 flex items-center text-white/40"
          aria-hidden="true"
        >
          <TbWorld size={13} />
        </div>

        {routing.locales.map((loc) => {
          const isActive = loc === locale;
          const isHovered = hovered === loc;

          return (
            <div key={loc} className="relative">
              {isActive && (
                <motion.div
                  layoutId="lang-active-pill"
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(249,115,22,0.9) 0%, rgba(234,88,12,0.95) 60%, rgba(194,65,12,1) 100%)",
                    boxShadow:
                      "0 0 6px rgba(249,115,22,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 32,
                    mass: 0.9,
                  }}
                  aria-hidden="true"
                />
              )}

              <AnimatePresence>
                {isHovered && !isActive && (
                  <motion.div
                    key="hover-shimmer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                    }}
                    aria-hidden="true"
                  />
                )}
              </AnimatePresence>

              <motion.button
                onClick={() =>
                  handleLocaleChange(loc as (typeof routing.locales)[number])
                }
                onMouseEnter={() => setHovered(loc)}
                onMouseLeave={() => setHovered(null)}
                whileTap={{ scale: 0.93 }}
                aria-pressed={isActive}
                aria-label={`Mudar idioma para ${loc.toUpperCase()}`}
                className="
                  relative z-10
                  min-w-[36px] h-7 px-2.5
                  flex items-center justify-center leading-none
                  rounded-xl
                  text-[11px] font-semibold tracking-widest
                  select-none cursor-pointer
                  transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70
                "
                style={{
                  color: isActive
                    ? "rgba(255,255,255,1)"
                    : isHovered
                      ? "rgba(255,255,255,0.75)"
                      : "rgba(255,255,255,0.38)",
                  textShadow: isActive
                    ? "0 1px 6px rgba(255,180,100,0.6)"
                    : "none",
                }}
              >
                {loc.toUpperCase()}
              </motion.button>
            </div>
          );
        })}

        <div
          className="absolute inset-x-0 top-0 h-px rounded-t-2xl pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
          }}
          aria-hidden="true"
        />
      </div>
    </li>
  );
}
