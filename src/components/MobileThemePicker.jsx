'use client';

import { Check, Flower2, Leaf, Palette, Snowflake, Sun } from "lucide-react";
import { useSeason } from "./SeasonContext";

const mobileThemes = [
    {
        id: "spring",
        season: "Spring",
        name: "Blossom",
        description: "Soft & playful",
        Icon: Flower2,
        background: "linear-gradient(135deg, #831843 0%, #db2777 65%, #f472b6 100%)",
        glow: "#f9a8d4",
    },
    {
        id: "summer",
        season: "Summer",
        name: "Golden Hour",
        description: "Warm & bright",
        Icon: Sun,
        background: "linear-gradient(135deg, #78350f 0%, #c2410c 55%, #f59e0b 100%)",
        glow: "#fde68a",
    },
    {
        id: "autumn",
        season: "Autumn",
        name: "Ember",
        description: "Rich & earthy",
        Icon: Leaf,
        background: "linear-gradient(135deg, #292524 0%, #78350f 55%, #b45309 100%)",
        glow: "#fbbf24",
    },
    {
        id: "winter",
        season: "Winter",
        name: "Frost",
        description: "Cool & serene",
        Icon: Snowflake,
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #0369a1 100%)",
        glow: "#7dd3fc",
    },
];

export const MobileThemePicker = () => {
    const { season, setSeason } = useSeason();
    const selected = mobileThemes.find((theme) => theme.id === season);

    return (
        <section className="border-t border-[var(--border)]/20 px-4 pb-4 pt-3 sm:px-6" aria-labelledby="mobile-theme-heading">
            <div className="mb-2.5 flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)]/20 bg-[var(--accent)]/10 text-[var(--foreground)]">
                    <Palette className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
                        Make it yours
                    </p>
                    <h3 id="mobile-theme-heading" className="text-sm font-bold leading-tight text-[var(--foreground)]">
                        Choose your atmosphere
                    </h3>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {mobileThemes.map((theme) => {
                    const Icon = theme.Icon;
                    const active = season === theme.id;

                    return (
                        <button
                            key={theme.id}
                            type="button"
                            onClick={() => setSeason(theme.id)}
                            aria-pressed={active}
                            aria-label={`${theme.season}: ${theme.name} theme`}
                            className={`group relative flex min-h-[79px] min-w-0 flex-col justify-between overflow-hidden rounded-xl border p-2.5 text-left text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${active ? "border-white/90 ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--panel)]" : "border-white/15 hover:border-white/60"}`}
                            style={{ background: theme.background }}
                        >
                            <span className="pointer-events-none absolute -right-5 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
                            <span className="relative z-10 flex w-full items-start justify-between gap-2">
                                <Icon className="h-4 w-4 shrink-0" style={{ color: theme.glow }} aria-hidden="true" />
                                {active && (
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-slate-900" aria-hidden="true">
                                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                                    </span>
                                )}
                            </span>
                            <span className="relative z-10 mt-1 flex min-w-0 flex-col gap-0">
                                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/75">
                                    {theme.season}
                                </span>
                                <span className="break-words text-xs font-bold leading-tight">
                                    {theme.name}
                                </span>
                            </span>
                        </button>
                    );
                })}
            </div>

            <p className="mt-2.5 text-center text-[10px] font-medium text-[var(--muted)]" aria-live="polite">
                {selected ? `Selected: ${selected.name} · ${selected.season}` : "Select a season to change the look."}
            </p>
        </section>
    );
};
