"use client";

import { PROJECT_FILTER_OPTIONS, TProjectType } from "@/model/ProjectModel";
import { motion } from "motion/react";
import React from "react";

interface CategoryFilterPillsProps {
  activeFilter: string;
  onSelectFilter: (filter: TProjectType) => void;
  onPrefetchFilter?: (filter: TProjectType) => void;
  allLabel: string;
  layoutId?: string;
  variant?: "default" | "compact";
  className?: string;
}

const CategoryFilterPills = ({
  activeFilter,
  onSelectFilter,
  onPrefetchFilter,
  allLabel,
  layoutId = "projects-filter-pill",
  variant = "default",
  className = "",
}: CategoryFilterPillsProps): React.JSX.Element => {
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {PROJECT_FILTER_OPTIONS.map((option) => {
        const isActive = activeFilter.toLowerCase() === option.toLowerCase();

        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelectFilter(option)}
            onMouseEnter={() => onPrefetchFilter?.(option)}
            onTouchStart={() => onPrefetchFilter?.(option)}
            className={`relative uppercase tracking-wider transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
              variant === "compact"
                ? `rounded-lg px-3.5 py-1.5 text-xs font-medium ${
                    isActive
                      ? "text-white"
                      : "bg-black/30 text-gray-dark hover:text-gray-soft"
                  }`
                : `rounded-xl px-5 py-2.5 text-xs md:text-sm ${
                    isActive
                      ? "font-bold text-white"
                      : "bg-gray-light text-gray-dark hover:text-gray-soft"
                  }`
            }`}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                transition={{
                  type: "spring",
                  visualDuration: 0.26,
                  bounce: 0.16,
                }}
                aria-hidden="true"
                className={
                  variant === "compact"
                    ? "absolute inset-0 rounded-lg bg-gray-800 border border-orange-500/60"
                    : "absolute inset-0 rounded-xl bg-gray-light border border-orange-500"
                }
              />
            )}
            <span className="relative z-10">
              {option === "all" ? allLabel : option}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default React.memo(CategoryFilterPills);
