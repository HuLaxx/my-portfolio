'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useSeason } from './SeasonContext';
import { useState, useEffect } from 'react';

// Loader: Cinematic Entrance + Profile Zoom + Premium Glitch Reveal
export const Loader = () => {
    const { season } = useSeason();
    const [showColor, setShowColor] = useState(false);
    const [showGlitch, setShowGlitch] = useState(false);
    const [particles, setParticles] = useState([]);
    const [orbitalParticles, setOrbitalParticles] = useState([]);
    const [glitchLayers, setGlitchLayers] = useState([]);

    const themeColors = {
        spring: { bg: 'linear-gradient(to bottom, #fdf2f8, #fce7f3)', accent: '#db2777', text: '#000000', particleColors: ['#ff1493', '#ff007f', '#db2777'] },
        summer: { bg: 'linear-gradient(to bottom, #fffbeb, #fef3c7)', accent: '#d97706', text: '#000000', particleColors: ['#ff8800', '#ff4400', '#d97706'] },
        autumn: { bg: '#1f1005', accent: '#f97316', text: '#ffffff', particleColors: ['#ff0000', '#ffaa00', '#ff8800', '#8b4513', '#3e2723', '#4a0404', '#2d1b0e'] },
        winter: { bg: '#020617', accent: '#38bdf8', text: '#ffffff', particleColors: ['#88ccff', '#002244', '#38bdf8'] },
    };

    const theme = themeColors[season] || themeColors.winter;
    const monochromeTheme = { bg: '#000000', accent: '#ffffff', text: '#ffffff' };
    const activeTheme = showColor ? theme : monochromeTheme;

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowColor(true);
        }, 2500); // Extended Monochrome Phase to 2.5s as requested

        setParticles([...Array(15)].map(() => ({
            width: Math.random() * 100 + 20,
            height: Math.random() * 100 + 20,
            left: Math.random() * 100,
            top: Math.random() * 100,
            duration: 5 + Math.random() * 10,
        })));

        // Generate distributed particles (Excluding Center Frame)
        const generateParticle = () => {
            let left, top;
            do {
                left = Math.random() * 100;
                top = Math.random() * 100;
            } while (left > 30 && left < 70 && top > 25 && top < 75); // Exclude central 40x50% area

            return {
                left,
                top,
                size: 3 + Math.random() * 10, // Bigger, more random sizes
                driftX: (Math.random() - 0.5) * 150,
                driftY: (Math.random() - 0.5) * 150,
                duration: 5 + Math.random() * 10,
                delay: Math.random() * 0.5,
                isWhite: Math.random() > 0.4,
                shade: Math.random() // 0.0 to 1.0
            };
        };

        setOrbitalParticles([...Array(60)].map(generateParticle));

        setGlitchLayers([...Array(5)].map(() => ({
            clipPaths: [...Array(10)].map(() => {
                const top = Math.random() * 100;
                const height = Math.random() * 20; // Max 20% height per strip
                return `inset(${top}% 0 ${100 - top - height}% 0)`;
            }),
            durations: 0.2 + Math.random() * 0.3,
            delays: Math.random() * 0.2 // Start earlier (0.3s quicker max delay)
        })));

        return () => clearTimeout(timer);
    }, []);

    const letterVariants = {
        hidden: { opacity: 0, y: 20, rotateX: -90 },
        visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring', damping: 15, stiffness: 150 } }
    };

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5 }, pointerEvents: 'none' }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-none"
            style={{ pointerEvents: 'auto' }}
        >
            {/* Black Background (Fades out first) */}
            <motion.div
                className="absolute inset-0 bg-black z-0"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            />

            {/* Theme Background Overlay (Smooth Crossfade) */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ background: theme.bg }}
                initial={{ opacity: 0 }}
                animate={{ opacity: showColor ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* Background Particles (Subtle) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                {particles.map((p, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full blur-2xl transition-colors duration-1000"
                        style={{
                            background: activeTheme.accent,
                            width: p.width,
                            height: p.height,
                            left: `${p.left}%`,
                            top: `${p.top}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            scale: [1, 1.1, 1],
                        }}
                        exit={{ opacity: 0 }} // Fade subtle bg particles
                        transition={{
                            default: { duration: p.duration, repeat: Infinity, ease: "easeInOut" },
                            exit: { duration: 1.0, delay: 1.0 } // Linger for 1s
                        }}
                    />
                ))}
            </div>

            {/* Grid Background - Appears with Theme */}
            <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: showColor ? 0.1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            >
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={activeTheme.text} strokeWidth="0.5" className="transition-colors duration-1000" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </motion.div>

            {/* Global Particles - Full Screen Wind */}
            <AnimatePresence>
                {orbitalParticles.map((p, i) => (
                    <motion.div
                        key={i}
                        className="absolute transition-colors duration-200"
                        style={{
                            width: p.size * 3,
                            height: p.size * 3, // Equilateral Triangle Ratio
                            background: !showColor
                                ? `linear-gradient(135deg, hsl(0, 0%, ${p.shade * 100}%), hsl(0, 0%, ${p.shade * 40}%))` // Gradient Mono (Silver to Dark Grey)
                                : (activeTheme.particleColors ? activeTheme.particleColors[i % activeTheme.particleColors.length] : activeTheme.accent),
                            mixBlendMode: 'plus-lighter',
                            filter: !showColor ? 'brightness(1.0)' : 'brightness(0.35)', // Ultra-Dark Color Shards
                            clipPath: 'polygon(50% 0%, 100% 85%, 0% 100%)', // Bent/Broken Triangle
                            left: `${p.left}%`,
                            top: `${p.top}%`,
                            zIndex: 9999,
                            transition: 'filter 1s ease, background 0.2s ease' // Smooth Dimming Transition
                        }}
                        initial={{ opacity: 0 }}
                        animate={{
                            x: [0, p.driftX],
                            y: [0, p.driftY, 0],
                            rotate: [0, 360],
                            opacity: [0.2, 0.8, 0.2] // Always visible pulse
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            default: {
                                x: { duration: p.duration, repeat: Infinity, ease: "linear" },
                                y: { duration: p.duration * 0.5, repeat: Infinity, ease: "easeInOut" },
                                rotate: { duration: p.duration, repeat: Infinity, ease: "linear" },
                                opacity: { duration: 1 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: 0 }
                            },
                            exit: { duration: 0.3, delay: 0 } // Fast exit to ensure particles disappear quickly)
                        }}
                    />
                ))}
            </AnimatePresence>

            <motion.div
                className="relative z-10 flex flex-col items-center gap-8"
                exit={{ opacity: 0, transition: { duration: 0.8 } }} // FIX: Text Fades Out
            >
                {/* Profile Section */}
                <motion.div
                    initial={{ scale: 1.5, opacity: 1 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }} // Zoom out on exit
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                >
                    {/* Orbital Particles - Visible ONLY when Color is shown (Phase 2) */}


                    {/* Rotating Ring - Visible always (White -> Color) */}
                    <motion.div
                        className="absolute -inset-[3px] rounded-full border-2 border-transparent transition-colors duration-1000"
                        style={{ borderTopColor: activeTheme.accent, borderBottomColor: activeTheme.accent }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Glow - Appears with Theme */}
                    <motion.div
                        className="absolute -inset-8 rounded-full blur-2xl transition-all duration-1000"
                        style={{ background: activeTheme.accent }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: showColor ? 0.3 : 0 }}
                        transition={{ duration: 1 }}
                    />

                    {/* Glitch Rendering Effect - Scans from Top to Bottom */}
                    <motion.div
                        className="absolute inset-0 rounded-full z-20 overflow-hidden bg-black" // Solid black to hide background dots
                        initial={{ opacity: 0 }}
                        animate={{ opacity: showColor ? 0 : 1 }}
                        transition={{ duration: 0.5, delay: showColor ? 0 : 0.2 }} // Crossfade out when color shows
                        style={{ pointerEvents: showColor ? 'none' : 'auto' }}
                    >
                        {/* Base Layer - Static, faint image so it's never empty */}
                        <div className="absolute inset-0 grayscale opacity-20 contrast-125">
                            <Image src="/Portfolio_Image.jpeg" alt="Rahul Khanke" fill className="object-cover" priority />
                        </div>

                        {/* Glitch Layers - Random Strips */}
                        {glitchLayers.map((layer, i) => (
                            <motion.div
                                key={i}
                                className="absolute inset-0 grayscale contrast-125 brightness-125"
                                animate={{
                                    clipPath: layer.clipPaths,
                                    opacity: [0, 0.8, 0],
                                    x: [-2, 2, -2, 2, 0] // Horizontal jitter
                                }}
                                transition={{
                                    duration: layer.durations,
                                    repeat: Infinity,
                                    repeatType: "mirror",
                                    ease: "linear",
                                    delay: layer.delays
                                }}
                            >
                                <Image src="/Portfolio_Image.jpeg" alt="Rahul Khanke" fill className="object-cover" priority />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Profile Image - Appears with Theme */}
                    <motion.div
                        className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl transition-all duration-1000 z-30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: showColor ? 1 : 0 }}
                        transition={{ duration: 0.8, ease: 'circOut' }} // Faster, punchier reveal
                    >
                        <Image src="/Portfolio_Image.jpeg" alt="Rahul Khanke" fill className="object-cover" priority />
                    </motion.div>
                </motion.div>

                {/* Cinematic Text - 3D Reveal */}
                <motion.div
                    initial="hidden"
                    animate={showColor ? "visible" : "hidden"}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { duration: 0.1 } }
                    }}
                    className="flex flex-col md:flex-row items-center gap-2 md:gap-6 perspective-[500px]"
                    style={{
                        perspective: '500px',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    <style jsx>{`
                        @keyframes cinematicReveal {
                            0% {
                                opacity: 0;
                                transform: translateZ(-800px) rotateX(90deg) rotateY(45deg);
                                filter: blur(20px);
                            }
                            60% {
                                transform: translateZ(50px) rotateX(0deg) rotateY(0deg);
                            }
                            100% {
                                opacity: 1;
                                transform: translateZ(0) rotateX(0deg) rotateY(0deg);
                                filter: blur(0px);
                                color: rgba(255, 255, 255, 0.1);
                                -webkit-text-stroke: 2px white;
                            }
                        }

                        @keyframes glitchText {
                            0% { text-shadow: 2px 2px 0px #bc13fe, -2px -2px 0px #00f3ff; opacity: 0.8; }
                            20% { text-shadow: 2px -2px 0px #bc13fe, -2px 2px 0px #00f3ff; opacity: 1; }
                            40% { text-shadow: -2px 2px 0px #bc13fe, 2px -2px 0px #00f3ff; opacity: 0.8; }
                            60% { text-shadow: -2px -2px 0px #bc13fe, 2px 2px 0px #00f3ff; opacity: 1; }
                            80% { text-shadow: 0px 0px 10px #00f3ff; opacity: 0.9; }
                            100% { text-shadow: 0px 0px 20px #00f3ff; opacity: 1; }
                        }

                        .cinematic-char {
                            display: inline-block;
                            color: transparent;
                            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
                            transform-style: preserve-3d;
                            position: relative;
                            /* opacity handled by tailwind class */
                        }

                        .cinematic-char::before {
                            content: attr(data-char);
                            position: absolute;
                            left: 0;
                            top: 0;
                            color: ${activeTheme.text};
                            opacity: 0;
                            transform: translateZ(5px);
                            text-shadow: 0 0 20px ${activeTheme.accent};
                            transition: opacity 0.5s ease;
                        }

                        .animate-reveal {
                            animation: cinematicReveal 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                        }

                        .glitch-active::before {
                            animation: glitchText 3s infinite alternate-reverse;
                            opacity: 1;
                        }
                    `}</style>

                    {['RAHUL', 'KHANKE'].map((word, wordIndex) => (
                        <div key={wordIndex} className="flex" style={{ transformStyle: 'preserve-3d' }}>
                            {word.split('').map((char, charIndex) => {
                                // Calculate unique delay based on total index
                                const delay = wordIndex === 0
                                    ? 0 + (charIndex * 100)
                                    : 300 + (charIndex * 80);

                                return (
                                    <div
                                        key={charIndex}
                                        className={`cinematic-char text-3xl md:text-5xl font-black tracking-widest ${showColor ? 'animate-reveal' : 'opacity-0'} ${showGlitch ? 'glitch-active' : ''}`}
                                        data-char={char}
                                        style={{
                                            animationDelay: `${delay}ms`,
                                            fontFamily: 'var(--font-display)',
                                            textShadow: `0 0 10px ${activeTheme.accent}`
                                        }}
                                    >
                                        {char}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </motion.div>

                {/* Subtext - LOADING PORTFOLIO (Exact Replica of Main Text Animation) */}
                <motion.div
                    initial="hidden"
                    animate={showColor ? "visible" : "hidden"}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { duration: 0.1 } }
                    }}
                    className="flex flex-col md:flex-row items-center gap-2 md:gap-4 perspective-[500px] mt-4"
                    style={{
                        perspective: '500px',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {['LOADING', 'PORTFOLIO'].map((word, wordIndex) => (
                        <div key={wordIndex} className="flex" style={{ transformStyle: 'preserve-3d' }}>
                            {word.split('').map((char, charIndex) => {
                                // EXACT same delay logic structure, just shifted time-wise
                                const delay = 2500 + (wordIndex === 0 // Start after Monochrome phase (2.5s)
                                    ? 0 + (charIndex * 60)
                                    : 200 + (charIndex * 40));

                                return (
                                    <div
                                        key={charIndex}
                                        className={`cinematic-char text-xl md:text-2xl font-bold tracking-[0.2em] ${showColor ? 'animate-reveal' : 'opacity-0'} ${showGlitch ? 'glitch-active' : ''}`}
                                        data-char={char}
                                        style={{
                                            animationDelay: `${delay}ms`, // Syncs with Color Reveal
                                            fontFamily: 'var(--font-display)',
                                            textShadow: `0 0 10px ${activeTheme.accent}` // Exact same glow
                                        }}
                                    >
                                        {char}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </motion.div>

                {/* Loading Dots */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }} // FIX: Fade out dots
                    transition={{ delay: 0.5 }}
                    className="flex gap-1"
                >
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: activeTheme.accent }}
                            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                    ))}
                </motion.div>
            </motion.div>

            {/* Corner Lines */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }} // FIX: Fade out corners
                transition={{ delay: 0.3 }}
                className="absolute top-12 left-12 w-16 h-16 border-t-2 border-l-2 transition-colors duration-1000"
                style={{ borderColor: activeTheme.accent }}
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-12 right-12 w-16 h-16 border-b-2 border-r-2 transition-colors duration-1000"
                style={{ borderColor: activeTheme.accent }}
            />
        </motion.div>
    );
};
