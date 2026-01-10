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

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <>
            <audio ref={audioRef} src="/audio/Timeless.m4a" preload="auto" />

            {/* Compact Player - Bottom Left */}
            <motion.div
                className="fixed bottom-6 left-6 z-40"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
            >
                <motion.div
                    layout
                    className={`flex items-center overflow-hidden backdrop-blur-2xl border shadow-lg rounded-full ${isLight
                            ? 'bg-white/80 border-black/10'
                            : 'bg-black/70 border-white/10'
                        }`}
                >
                    {/* Main Play Button (always visible) */}
                    <button
                        onClick={() => {
                            if (!isExpanded) {
                                setIsExpanded(true);
                            } else {
                                togglePlay();
                            }
                        }}
                        className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${isPlaying
                                ? 'bg-[var(--accent)] text-black'
                                : isLight
                                    ? 'text-gray-600 hover:bg-black/5'
                                    : 'text-white/70 hover:bg-white/10'
                            }`}
                    >
                        {isPlaying ? (
                            // Sound bars when playing
                            <div className="flex items-end gap-[2px] h-4">
                                {[1, 2, 3].map((bar) => (
                                    <motion.div
                                        key={bar}
                                        className="w-[2px] rounded-full bg-current"
                                        animate={{ height: ['30%', '100%', '50%', '80%', '30%'] }}
                                        transition={{
                                            duration: 0.8,
                                            repeat: Infinity,
                                            delay: bar * 0.1,
                                        }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                            </svg>
                        )}
                    </button>

                    {/* Expanded Controls */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 'auto', opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center gap-2 pr-3 overflow-hidden"
                            >
                                {/* Play/Pause */}
                                <button
                                    onClick={togglePlay}
                                    className={`w-7 h-7 flex items-center justify-center rounded-full transition-colors ${isLight
                                            ? 'text-gray-600 hover:bg-black/10'
                                            : 'text-white/70 hover:bg-white/10'
                                        }`}
                                >
                                    {isPlaying ? (
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                            <rect x="6" y="4" width="4" height="16" rx="1" />
                                            <rect x="14" y="4" width="4" height="16" rx="1" />
                                        </svg>
                                    ) : (
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                            <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                    )}
                                </button>

                                {/* Mute */}
                                <button
                                    onClick={toggleMute}
                                    className={`w-7 h-7 flex items-center justify-center rounded-full transition-colors ${isMuted
                                            ? 'text-red-400'
                                            : isLight
                                                ? 'text-gray-400 hover:text-gray-600'
                                                : 'text-white/40 hover:text-white/70'
                                        }`}
                                >
                                    {isMuted ? (
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <line x1="4" y1="4" x2="20" y2="20" />
                                        </svg>
                                    ) : (
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        </svg>
                                    )}
                                </button>

                                {/* Close */}
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className={`w-5 h-5 flex items-center justify-center rounded-full ${isLight ? 'text-gray-300 hover:text-gray-500' : 'text-white/20 hover:text-white/40'
                                        }`}
                                >
                                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <polyline points="15 18 9 12 15 6" />
                                    </svg>
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </>
    );
};
