'use client';

import { useEffect, useRef } from 'react';
import { useSeason } from './SeasonContext';

export const AnimatedGradient = () => {
    const canvasRef = useRef(null);
    const { season } = useSeason();
    const scrollY = useRef(0);
    const rafId = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let time = 0;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Track scroll
        const handleScroll = () => {
            scrollY.current = window.scrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Get colors based on season
        const getSeasonColors = (s) => {
            switch (s) {
                case 'spring':
                    return {
                        bg: '#fff0f5',
                        colors: ['#db2777', '#ec4899', '#be185d', '#f472b6'], // Darker, more saturated pinks
                        opacity: 0.95
                    };
                case 'summer':
                    return {
                        bg: '#fff8e7',
                        colors: ['#ffbe00', '#ffd700', '#ff8c00', '#ffa500'],
                        opacity: 0.48
                    };
                case 'autumn':
                    return {
                        bg: '#1a0f05',
                        colors: ['#d4a574', '#8b6914', '#fbbf24', '#b8860b'],
                        opacity: 0.25
                    };
                case 'winter':
                    return {
                        bg: '#020415',
                        colors: ['#1e3cb4', '#4169e1', '#7dd3fc', '#0ea5e9'],
                        opacity: 0.28
                    };
                default:
                    return {
                        bg: '#fff8e7',
                        colors: ['#ffbe00', '#ffd700', '#ff8c00', '#ffa500'],
                        opacity: 0.18
                    };
            }
        };

        // Animation loop
        const animate = () => {
            const { bg, colors, opacity } = getSeasonColors(season);
            const w = canvas.width;
            const h = canvas.height;
            const scrollOffset = scrollY.current * 0.3;

            // Clear with background color
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, w, h);

            time += 0.002; // Slower for smoother animation

            // Use multiply blend for light themes (summer/spring) for better visibility
            const isLightTheme = season === 'summer' || season === 'spring';
            ctx.globalCompositeOperation = isLightTheme ? 'multiply' : 'screen';
            ctx.filter = 'blur(40px)'; // Reduced from 60px for less overwhelming effect

            // Create many smaller gradient blobs that are well-distributed (11 circles - 75% of previous)
            for (let i = 0; i < 11; i++) {
                // Use different prime numbers and offsets for pseudo-random but deterministic spread
                // Add slow-changing offsets for dynamic positioning
                const xSeed = ((i * 37) % 100 / 100) + Math.sin(time * 0.3 + i * 0.5) * 0.1;
                const ySeed = ((i * 53) % 100 / 100) + Math.cos(time * 0.25 + i * 0.7) * 0.1;

                const x = w * (0.05 + xSeed * 0.9) + Math.sin(time * 0.7 + i * 0.8) * 60;
                const y = h * (0.05 + ySeed * 0.9 + Math.sin(time * 0.5 + i * 1.1) * 0.1) - scrollOffset * (0.3 + i * 0.03);
                const radius = Math.min(w, h) * (0.12 + Math.sin(time * 0.6 + i * 0.6) * 0.04); // Smaller radius

                const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
                const colorIndex = i % colors.length;
                const alpha = Math.floor(opacity * 255).toString(16).padStart(2, '0');

                gradient.addColorStop(0, colors[colorIndex] + alpha);
                gradient.addColorStop(0.5, colors[colorIndex] + '30');
                gradient.addColorStop(1, colors[colorIndex] + '00');

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, w, h);
            }

            // Reset blending and filter
            ctx.globalCompositeOperation = 'source-over';
            ctx.filter = 'none';

            rafId.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('scroll', handleScroll);
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, [season]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
};
