'use client';

import clsx from "clsx";
import { useSeason } from "./SeasonContext";

const seasons = [
  { id: "spring", label: "Spring" },
  { id: "summer", label: "Summer" },
  { id: "autumn", label: "Autumn" },
  { id: "winter", label: "Winter" },
];

export const ThemeToggle = () => {
  const { season, setSeason } = useSeason();

  return (
    <div
      className={`
        flex flex-wrap items-center justify-center
        gap-1 md:gap-2
        rounded-xl md:rounded-full
        border border-[var(--border)]
        bg-[var(--panel)]/70
        px-2 py-2 md:px-1.5 md:py-1
        backdrop-blur-md
        shadow-[0_10px_30px_rgba(0,0,0,0.18)]
        max-w-[260px]
        xl:max-w-none xl:flex-nowrap
      `}
    >
      {seasons.map((t) => (
        <button
          key={t.id}
          onClick={() => setSeason(t.id)}
          className={clsx(
            `
            rounded-full px-2 py-1 md:px-2.5
            text-[9px] md:text-[10px]
            font-semibold uppercase tracking-[0.12em]
            transition-all duration-300
            flex-1 xl:flex-none text-center
            `,
            season === t.id
              ? "bg-[var(--accent)] text-[var(--background)] shadow-[0_6px_18px_rgba(0,0,0,0.22)]"
              : "text-gray-400 hover:text-white"
          )}
          aria-pressed={season === t.id}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};
