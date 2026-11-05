"use client";

import React from "react";
import { CiGrid2H, CiGrid41 } from "react-icons/ci";

export type ViewMode = "grid" | "list";

interface ViewModeToggleProps {
  view: ViewMode;
  onChange: (nextView: ViewMode) => void;
  variant?: "segmented" | "single";
  ariaLabel?: string;
  gridLabel?: string;
  listLabel?: string;
}

const ViewModeToggle = ({
  view,
  onChange,
  variant = "segmented",
  ariaLabel = "Toggle view mode",
  gridLabel = "Grid",
  listLabel = "List",
}: ViewModeToggleProps): React.JSX.Element => {
  if (variant === "single") {
    const nextView: ViewMode = view === "grid" ? "list" : "grid";
    return (
      <button
        type="button"
        onClick={() => onChange(nextView)}
        className="bg-gray-light h-10 px-4 rounded-xl flex items-center justify-center transition-colors hover:text-orange-500 shadow-sm border-2 border-transparent hover:border-orange-500 duration-300"
        aria-label={ariaLabel}
        title={view === "grid" ? listLabel : gridLabel}
      >
        {view === "grid" ? <CiGrid2H size={24} /> : <CiGrid41 size={24} />}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
      <button
        type="button"
        onClick={() => onChange("grid")}
        className={`p-1.5 rounded-md transition-colors ${
          view === "grid"
            ? "bg-gray-800 text-orange-400"
            : "text-gray-dark hover:text-gray-soft"
        }`}
        title={gridLabel}
        aria-label={gridLabel}
        aria-pressed={view === "grid"}
      >
        <CiGrid41 size={19} />
      </button>
      <button
        type="button"
        onClick={() => onChange("list")}
        className={`p-1.5 rounded-md transition-colors ${
          view === "list"
            ? "bg-gray-800 text-orange-400"
            : "text-gray-dark hover:text-gray-soft"
        }`}
        title={listLabel}
        aria-label={listLabel}
        aria-pressed={view === "list"}
      >
        <CiGrid2H size={19} />
      </button>
    </div>
  );
};

export default ViewModeToggle;
