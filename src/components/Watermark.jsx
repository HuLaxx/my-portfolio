'use client';

import { useSeason } from './SeasonContext';
import {
    Database, Code2, Cpu, Globe, Zap, Box, Fingerprint, Command,
    Server, Activity, Layers, BrainCircuit, Terminal, Sprout,
    Briefcase, Laptop, Coffee, GraduationCap, GitBranch, ShieldCheck, PenTool
} from 'lucide-react';

/**
 * Watermark Component
 * Renders a decorative background icon that adapts to the current season/theme.
 */
export const Watermark = ({
    type = "classic",
    icon: Icon,
    className = ""
}) => {
    const { season } = useSeason();
    const isLightMode = ['spring', 'summer'].includes(season);

    if (!Icon) return null;

    // Base classes for positioning and interaction
    const basePos = "absolute pointer-events-none transition-all duration-700 ease-out";

    switch (type) {
        case "wireframe":
            // Technical, Architectural, Precise
            // Best for: Data, Backend, DevOps
            // Look: Very thin stroke, large, clean.
            return (
                <div className={`${basePos} -right-10 -bottom-10 ${className}`}>
                    <Icon
                        size={200}
                        strokeWidth={0.5}
                        className={`
                            transform group-hover:scale-110 group-hover:-translate-x-4
                            ${isLightMode ? 'text-slate-900/5' : 'text-slate-100/5'}
                        `}
                    />
                </div>
            );

        case "neon":
            // Futuristic, AI, Innovation
            // Best for: AI/ML, New Tech
            // Look: Glow effect (stronger in dark mode), rotated.
            return (
                <div
                    className={`${basePos} -right-6 -bottom-6 ${className}`}
                    style={{
                        filter: isLightMode ? 'none' : 'drop-shadow(0 0 10px var(--accent))'
                    }}
                >
                    <Icon
                        size={160}
                        strokeWidth={1.5}
                        className={`
                            transform rotate-12 group-hover:rotate-6 group-hover:scale-105
                            text-[var(--accent)]
                            ${isLightMode ? 'opacity-10' : 'opacity-20'}
                        `}
                    />
                </div>
            );

        case "engraved":
            // Premium, Corporate, Solid
            // Best for: Core SWE, Finance, Leadership
            // Look: "Stamped" into the background.
            return (
                <div className={`${basePos} -right-8 -bottom-8 ${className}`}>
                    <Icon
                        size={180}
                        strokeWidth={2} // Thicker for engraved look
                        className={`
                            transform rotate-0 group-hover:rotate-[-5deg] group-hover:scale-105
                            ${isLightMode ? 'text-slate-300/20' : 'text-slate-700/20'}
                        `}
                    />
                </div>
            );

        case "soft":
            // Friendly, Organic, Growth
            // Best for: Internships, Personal, Education
            // Look: Soft offset, very subtle.
            return (
                <div className={`${basePos} -right-4 -bottom-4 ${className}`}>
                    <Icon
                        size={150}
                        strokeWidth={1}
                        className={`
                             transform translate-y-4 group-hover:translate-y-0
                             ${isLightMode ? 'text-[var(--accent)] opacity-10' : 'text-[var(--accent)] opacity-15'}
                        `}
                    />
                </div>
            );

        case "classic":
        default:
            // clean, minimalist, default
            // Best for: Web, Frontend, General
            // Look: Angled, standard opacity.
            return (
                <div className={`${basePos} -right-5 -bottom-5 ${className}`}>
                    <Icon
                        size={140}
                        strokeWidth={1.5}
                        className={`
                            transform -rotate-12 group-hover:rotate-0 group-hover:scale-110
                            ${isLightMode ? 'text-slate-900/5' : 'text-white/5'}
                        `}
                    />
                </div>
            );
    }
};
