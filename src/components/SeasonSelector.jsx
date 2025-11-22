'use client';

import { useSeason } from './SeasonContext';

export const SeasonSelector = () => {
    const { season, setSeason } = useSeason();

    const seasons = [
        { name: 'spring', color: '#ff69b4', glow: 'shadow-[0_0_20px_rgba(255,105,180,0.5)]' },
        { name: 'summer', color: '#ffaa00', glow: 'shadow-[0_0_20px_rgba(255,170,0,0.5)]' },
        { name: 'autumn', color: '#ff6600', glow: 'shadow-[0_0_20px_rgba(255,102,0,0.5)]' },
        { name: 'winter', color: '#aaddff', glow: 'shadow-[0_0_20px_rgba(170,221,255,0.5)]' },
    ];

    return (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 bg-black/50 backdrop-blur-md px-8 py-4 rounded-full border border-white/20">
            {seasons.map((s) => (
                <button
                    key={s.name}
                    onClick={() => setSeason(s.name)}
                    className={`text-xs font-display tracking-[0.3em] uppercase transition-all duration-500 ${season === s.name
                            ? `font-bold scale-125 ${s.glow}`
                            : 'opacity-60 hover:opacity-100 hover:scale-110'
                        }`}
                    style={{
                        color: s.color,
                        textShadow: season === s.name ? `0 0 10px ${s.color}` : 'none'
                    }}
                >
                    {s.name}
                </button>
            ))}
        </div>
    );
};
