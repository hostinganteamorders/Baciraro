"use client";

import { motion } from "framer-motion";

interface YearScrubberProps {
  years: number[];
  activeYear: number;
  onYearChange: (year: number) => void;
}

export function YearScrubber({ years, activeYear, onYearChange }: YearScrubberProps) {
  return (
    <div className="relative w-full overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-1 min-w-max px-4 py-3">
        {years.map((year) => {
          const isActive = year === activeYear;
          return (
            <button
              key={year}
              onClick={() => onYearChange(year)}
              className={`relative flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                isActive
                  ? "bg-emerald-400 text-black shadow-lg shadow-emerald-500/25"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
              }`}
            >
              {year}
              {isActive && (
                <motion.span
                  layoutId="year-indicator"
                  className="absolute inset-0 rounded-full bg-emerald-400 -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
