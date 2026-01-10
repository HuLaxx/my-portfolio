'use client';

import clsx from "clsx";
import { useSeason } from "./SeasonContext";

const seasons = [
  { id: "spring", label: "Spring", color: "#be185d" },
  { id: "summer", label: "Summer", color: "#f59e0b" },
  { id: "autumn", label: "Autumn", color: "#a16207" },
  { id: "winter", label: "Winter", color: "#1e3a8a" },
];

export const ThemeToggle = () => {
  const { season, setSeason } = useSeason();

  return (
    <div
      className={`
        inline-grid grid-cols-2
        items-center
        gap-x-4 gap-y-2
        rounded-full
        border border-[var(--border)]
        bg-[var(--panel)]/70
        px-4 py-3
        max-w-[380px]
        backdrop-blur-md
        shadow-[0_10px_30px_rgba(0,0,0,0.18)]
        xl:flex xl:flex-nowrap xl:max-w-none xl:px-1.5 xl:py-1 xl:gap-2
      `}
    >
      {seasons.map((t) => (
        <button
          key={t.id}
          onClick={() => setSeason(t.id)}
          style={{ "--theme-glow": t.color }}
          className={clsx(
            `
            rounded-full
            px-3 py-1.5
            text-[10px]
            font-semibold uppercase tracking-[0.12em]
            transition-all duration-300
            text-center
            xl:flex-none
            hover:scale-105 hover:shadow-[0_0_15px_var(--theme-glow)] hover:text-[var(--theme-glow)]
            `,
            season === t.id
              ? "bg-[var(--accent)] text-[var(--background)] shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:!text-[var(--background)]"
              : "text-gray-400"
          )}
          aria-pressed={season === t.id}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};
