'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSeason } from './SeasonContext';

export const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const audioRef = useRef(null);
    const { season } = useSeason();

    const isLight = season === 'summer' || season === 'spring';

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.3;
            audioRef.current.loop = true;
        }
    }, []);

    const togglePlay = (e) => {
        e?.stopPropagation();
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = (e) => {
        e?.stopPropagation();
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    // Minimalist sound bars
    const SoundBars = () => (
        <div className="flex items-center gap-[2px] h-3">
            {[1, 2, 3].map((bar) => (
                <motion.div
                    key={bar}
                    className="w-[2px] bg-current rounded-full"
                    animate={{ height: ['20%', '100%', '50%'] }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: bar * 0.1,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );

    return (
        <>
            <audio ref={audioRef} src="/audio/Timeless.m4a" preload="auto" />

            {/* 
               Ghost Capsule Container 
               - Fixed Bottom Left
               - Z-Index 40 (Above background, below critical UI)
               - Very subtle default opacity (Ghost Mode)
            */}
            <motion.div
                className="fixed bottom-6 left-6 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <motion.div
                    layout
                    onMouseEnter={() => setIsExpanded(true)}
                    onMouseLeave={() => setIsExpanded(false)}
                    onClick={() => !isExpanded && setIsExpanded(true)}
                    className={`flex items-center backdrop-blur-md rounded-full border transition-all duration-500 cursor-pointer ${isExpanded ? 'px-4 pr-5' : 'px-0 w-10 justify-center'
                        } ${isLight
                            ? 'bg-white/40 border-black/5 hover:bg-white/60'
                            : 'bg-black/30 border-white/5 hover:bg-black/50'
                        }`}
                    style={{
                        height: '40px',
                        boxShadow: isExpanded ? '0 8px 32px rgba(0,0,0,0.1)' : 'none'
                    }}
                >
                    {/* Icon / Play Button */}
                    <button
                        onClick={togglePlay}
                        className={`flex items-center justify-center rounded-full transition-colors flex-shrink-0 ${isExpanded ? 'w-8 h-8 mr-2' : 'w-10 h-10'
                            }`}
                        aria-label={isPlaying ? "Pause music" : "Play music"}
                    >
                        {isPlaying ? (
                            isExpanded ? (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                            ) : (
                                <SoundBars />
                            )
                        ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-70">
                                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                            </svg>
                        )}
                    </button>

                    {/* Expanded Controls (Ghost Reveal) */}
                    <AnimatePresence mode="popLayout">
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ duration: 0.3, ease: "circOut" }}
                                className="flex items-center gap-3 overflow-hidden whitespace-nowrap"
                            >
                                {/* Track Info */}
                                <div className="flex flex-col justify-center leading-none select-none">
                                    <span className="text-[10px] font-bold tracking-widest uppercase opacity-80">Timeless</span>
                                </div>

                                {/* Divider */}
                                <div className="w-px h-3 bg-current opacity-20" />

                                {/* Mute Toggle */}
                                <button
                                    onClick={toggleMute}
                                    className="opacity-60 hover:opacity-100 transition-opacity p-1"
                                >
                                    {isMuted ? (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23" /><path d="M9 9v6a3 3 0 0 0 5.12 2.12M15 9.34V4h6v9" /></svg>
                                    ) : (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /></svg>
                                    )}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </>
    );
};
