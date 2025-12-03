'use client';

import { useState, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useSeason } from './SeasonContext';

export const Loader = ({ onUnlock }) => {
    const [time, setTime] = useState(null); // Start null to avoid hydration mismatch
    const [isUnlocked, setIsUnlocked] = useState(false);
    const { season, isLoaded } = useSeason();
    const [mounted, setMounted] = useState(false);
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        setMounted(true);
        // Initialize time on client
        setTime(new Date());

        // Generate particles only on client side to avoid hydration mismatch
        const newParticles = [...Array(8)].map(() => ({
            width: Math.random() * 150 + 50,
            height: Math.random() * 150 + 50,
            left: Math.random() * 100,
            top: Math.random() * 100,
            duration: 8 + Math.random() * 10,
            delay: Math.random() * 2,
        }));
        setParticles(newParticles);
    }, []);

    const themeStyles = {
        spring: {
            bg: 'linear-gradient(to bottom, #fdf2f8, #fce7f3)', // Light Pink/Cream
            accent: '#db2777', // Deep Pink
            text: '#1a050b', // Black/Dark Pink
            subtext: '#831843',
            glow: 'rgba(131, 24, 67, 0.15)', // Dark Glow
            shadow: '0 0 30px rgba(131, 24, 67, 0.1)',
        },
        summer: {
            bg: 'linear-gradient(to bottom, #fffbeb, #fef3c7)', // Light Amber/Cream
            accent: '#d97706', // Deep Amber
            text: '#271a00', // Black/Dark Amber
            subtext: '#78350f',
            glow: 'rgba(120, 53, 15, 0.15)', // Dark Glow
            shadow: '0 0 30px rgba(120, 53, 15, 0.1)',
        },
        autumn: {
            bg: '#1f1005', // Deep Orange/Brown
            accent: '#f97316',
            text: '#ffffff',
            subtext: '#fdba74',
            glow: 'rgba(249, 115, 22, 0.2)',
            shadow: '0 0 30px rgba(249, 115, 22, 0.4)',
        },
        winter: {
            bg: '#020617', // Deep Blue/Black
            accent: '#38bdf8',
            text: '#ffffff',
            subtext: '#bae6fd',
            glow: 'rgba(56, 189, 248, 0.2)',
            shadow: '0 0 30px rgba(56, 189, 248, 0.4)',
        },
    };

    // Use winter/crystal as default until mounted and context is loaded to prevent flash
    const activeTheme = (mounted && isLoaded && themeStyles[season]) ? themeStyles[season] : themeStyles.winter;

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Reduced loading time for snappiness
        const timeout = setTimeout(() => handleUnlock(), 2500);
        return () => clearTimeout(timeout);
    }, []);

    const handleUnlock = () => {
        setIsUnlocked(true);
        setTimeout(() => {
            if (onUnlock) onUnlock();
        }, 1100);
    };

    const gradientId = useId();

    const formatTime = (date) => {
        if (!date) return '';
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    };
    const formatDate = (date) => {
        if (!date) return '';
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    };

    return (
        <AnimatePresence>
            {!isUnlocked && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.02,
                        filter: "blur(6px)",
                        transition: { duration: 1.15, ease: [0.22, 1, 0.36, 1] }
                    }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000"
                    style={{ background: activeTheme.bg, color: activeTheme.text }}
                >
                    {/* 1. Background Glow */}
                    <div className="absolute inset-0 -z-20 opacity-60" style={{ background: activeTheme.glow }} />

                    {/* 2. Atmospheric Particles */}
                    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                        {particles.map((p, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full blur-xl opacity-30"
                                style={{
                                    background: activeTheme.accent,
                                    width: p.width,
                                    height: p.height,
                                    left: `${p.left}%`,
                                    top: `${p.top}%`,
                                }}
                                animate={{
                                    y: [0, -30, 0],
                                    opacity: [0.2, 0.4, 0.2],
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: p.duration,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: p.delay,
                                }}
                            />
                        ))}
                    </div>

                    {/* 3. Main Content Container */}
                    <div className="relative z-10 flex flex-col items-center justify-between h-full py-16">

                        {/* Top: Modern Digital Date & Time (No Frame) */}
                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-center gap-1"
                        >
                            <span
                                className="text-5xl md:text-7xl font-bold tracking-widest min-h-[1.2em]"
                                style={{
                                    fontFamily: 'var(--font-display)',
                                    color: activeTheme.text,
                                    textShadow: activeTheme.shadow
                                }}
                            >
                                {time ? formatTime(time) : ''}
                            </span>
                            <span className="text-sm font-medium tracking-[0.3em] uppercase opacity-70 min-h-[1.2em]" style={{ color: activeTheme.subtext }}>
                                {time ? formatDate(time) : ''}
                            </span>
                        </motion.div>

                        {/* Center: Profile & Name */}
                        <div className="flex flex-col items-center gap-10">
                            {/* Jewel Profile */}
                            <div className="relative group">
                                <div className="absolute -inset-8 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-1000" style={{ background: activeTheme.accent }} />
                                <motion.div
                                    className="absolute -inset-[3px] rounded-full border-2 border-transparent"
                                    style={{ borderTopColor: activeTheme.accent, borderBottomColor: activeTheme.accent }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl"
                                >
                                    <Image
                                        src="/Portfolio_Image.jpeg"
                                        alt="Rahul Khanke"
                                        fill
                                        className="object-cover scale-105"
                                        priority
                                    />
                                </motion.div>
                            </div>

                            {/* Name - Solid Color with Glow */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-4xl md:text-6xl font-bold tracking-tight text-center"
                                style={{
                                    color: activeTheme.text,
                                    textShadow: activeTheme.shadow
                                }}
                            >
                                Rahul Khanke
                            </motion.h1>
                        </div>

                        {/* Bottom: Text + Miniature Crystal (Side-by-Side) */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                            className="flex items-center gap-4 px-5 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
                            style={{ color: activeTheme.text }}
                        >
                            {/* CSS 3D Crystal Animation */}
                            <div className="relative w-12 h-12 flex items-center justify-center perspective-[1000px]">
                                <motion.div
                                    className="relative w-8 h-8 preserve-3d"
                                    style={{ transformStyle: 'preserve-3d' }}
                                    animate={{
                                        rotateY: [0, 360],
                                        rotateX: [0, 360],
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                >
                                    {/* Top Pyramid */}
                                    <div className="absolute inset-0 opacity-90" style={{ transform: 'rotateY(0deg) translateZ(0px) rotateX(30deg)', transformOrigin: 'bottom center', height: '50%', top: 0, background: activeTheme.accent, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                                    <div className="absolute inset-0 opacity-80" style={{ transform: 'rotateY(90deg) translateZ(0px) rotateX(30deg)', transformOrigin: 'bottom center', height: '50%', top: 0, background: activeTheme.accent, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                                    <div className="absolute inset-0 opacity-90" style={{ transform: 'rotateY(180deg) translateZ(0px) rotateX(30deg)', transformOrigin: 'bottom center', height: '50%', top: 0, background: activeTheme.accent, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                                    <div className="absolute inset-0 opacity-80" style={{ transform: 'rotateY(270deg) translateZ(0px) rotateX(30deg)', transformOrigin: 'bottom center', height: '50%', top: 0, background: activeTheme.accent, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />

                                    {/* Bottom Pyramid */}
                                    <div className="absolute inset-0 opacity-80" style={{ transform: 'rotateY(0deg) translateZ(0px) rotateX(-30deg)', transformOrigin: 'top center', height: '50%', top: '50%', background: activeTheme.accent, clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)' }} />
                                    <div className="absolute inset-0 opacity-70" style={{ transform: 'rotateY(90deg) translateZ(0px) rotateX(-30deg)', transformOrigin: 'top center', height: '50%', top: '50%', background: activeTheme.accent, clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)' }} />
                                    <div className="absolute inset-0 opacity-80" style={{ transform: 'rotateY(180deg) translateZ(0px) rotateX(-30deg)', transformOrigin: 'top center', height: '50%', top: '50%', background: activeTheme.accent, clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)' }} />
                                    <div className="absolute inset-0 opacity-70" style={{ transform: 'rotateY(270deg) translateZ(0px) rotateX(-30deg)', transformOrigin: 'top center', height: '50%', top: '50%', background: activeTheme.accent, clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)' }} />

                                    {/* Inner Glow */}
                                    <div className="absolute inset-0 blur-md opacity-50" style={{ background: activeTheme.accent, transform: 'scale(0.5)' }} />
                                </motion.div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-80" style={{ color: activeTheme.subtext }}>
                                    Building Portfolio
                                </span>
                                {/* Loading Bar */}
                                <div className="relative w-32 h-1 rounded-full overflow-hidden bg-black/10 dark:bg-white/10">
                                    <motion.div
                                        className="absolute inset-0"
                                        style={{ background: activeTheme.accent }}
                                        animate={{ x: ['-100%', '100%'] }}
                                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
