'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSeason } from './SeasonContext';

export const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const { season } = useSeason();

    const isLightMode = ['spring', 'summer'].includes(season);
    // Dynamic border opacity for light/dark modes
    const ringBase = isLightMode ? 'border-[var(--accent-dark)]' : 'border-[var(--accent)]';

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
        <div className="fixed bottom-6 left-8 z-50 flex items-center">
            <audio ref={audioRef} src="/audio/Timeless.m4a" loop />

            <motion.button
                layout
                onClick={togglePlay}
                initial={{ width: "2rem" }}
                animate={{ width: isPlaying ? "auto" : "2rem" }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`relative h-8 rounded-full backdrop-blur-2xl border overflow-hidden flex items-center group z-20 ${isPlaying
                    ? 'bg-gradient-to-r from-[var(--accent-dark)]/90 to-black/90 border-[var(--accent-dark)]/30 shadow-[0_0_20px_var(--accent-soft)] pr-1'
                    : 'bg-black/40 border-white/10 text-white hover:bg-black/60'
                    }`}
            >
                {/* Icon Container (Fixed Left) */}
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 relative z-10">
                    {isPlaying ? (
                        <div className="flex items-center gap-[1.5px] h-2.5">
                            {[1, 2, 3, 4].map(i => (
                                <motion.div
                                    key={i}
                                    className="w-[1px] bg-white rounded-full origin-bottom"
                                    animate={{ height: [2, 8, 4, 10, 5] }}
                                    transition={{
                                        duration: 0.6,
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                        delay: i * 0.1,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="opacity-90 group-hover:opacity-100 transition-opacity ml-0.5">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                        </svg>
                    )}
                </div>

                {/* Text Container (Revealed) */}
                <AnimatePresence>
                    {isPlaying && (
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                            className="flex flex-col justify-center items-start leading-none whitespace-nowrap overflow-hidden pl-0 -ml-1"
                        >
                            <span className="text-[10.5px] font-serif italic font-bold bg-gradient-to-r from-white to-[var(--accent)] bg-clip-text text-transparent tracking-tight">
                                Timeless
                            </span>
                            <span className="text-[7px] font-medium bg-gradient-to-r from-[var(--accent)] to-white bg-clip-text text-transparent uppercase tracking-wide mt-[1px]">
                                The Weeknd
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};
