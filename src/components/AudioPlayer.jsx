'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.3;
        }
    }, []);

    return (
        <div className="fixed bottom-6 left-5 z-50 flex items-center gap-2">
            <audio ref={audioRef} src="/audio/Timeless.m4a" loop />

            <motion.button
                layout
                onClick={togglePlay}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-2xl transition-all duration-500 border overflow-visible group ${isPlaying
                    ? 'bg-gradient-to-br from-white/40 via-[var(--accent-soft)] to-black/40 border-[var(--accent)]/30 shadow-[0_0_30px_var(--accent-soft)] ring-1 ring-[var(--accent)]/20'
                    : 'bg-black/40 border-white/10 text-white hover:bg-black/60'
                    }`}
            >
                {/* Crystal Pulse Ripple (Wavy/Organic) */}
                {isPlaying && (
                    <>
                        <motion.div
                            initial={{ opacity: 0, scale: 1, borderRadius: "50%" }}
                            animate={{
                                opacity: [0, 0.4, 0],
                                scale: 2.5,
                                borderRadius: ["50%", "40% 60% 60% 40% / 60% 30% 70% 40%", "50%"]
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 border border-white/20 z-0"
                            style={{ filter: "blur(2px)" }}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 1, borderRadius: "50%" }}
                            animate={{
                                opacity: [0, 0.3, 0],
                                scale: 2,
                                borderRadius: ["50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "50%"]
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute inset-0 border border-white/10 z-0"
                            style={{ filter: "blur(1px)" }}
                        />
                    </>
                )}

                {/* Visualizer / Spotify Icon Toggle */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    {isPlaying ? (
                        // White Glass Waveform
                        <div className="flex items-center gap-[2px] h-3">
                            {[1, 2, 3, 4].map(i => (
                                <motion.div
                                    key={i}
                                    className="w-[2px] bg-white/90 rounded-full origin-bottom shadow-[0_0_5px_rgba(255,255,255,0.5)]"
                                    animate={{ height: [4, 12, 6, 14, 8] }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                        delay: i * 0.15,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        // Spotify Icon when paused
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="opacity-90 group-hover:opacity-100 transition-opacity">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                        </svg>
                    )}
                </div>
            </motion.button>

            {/* Premium Text Stack (Restored Now Playing) */}
            <AnimatePresence>
                {(isPlaying) && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="hidden md:flex flex-col justify-center select-none"
                    >
                        {/* Restored Label */}
                        <span className="text-[9px] font-black uppercase tracking-widest text-[var(--accent)] mb-0.5 opacity-80">
                            Now Playing
                        </span>
                        {/* Title */}
                        <span className="text-[13px] font-bold leading-none text-[var(--foreground)] drop-shadow-sm">
                            Timeless
                        </span>
                        {/* Artist */}
                        <span className="text-[10px] font-medium leading-tight text-[var(--muted)] opacity-80">
                            The Weeknd
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
