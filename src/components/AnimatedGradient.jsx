'use client';

import { useEffect, useRef } from 'react';
import { useSeason } from './SeasonContext';
import { lerpColor } from '../utils/colorUtils';

export const AnimatedGradient = () => {
    const canvasRef = useRef(null);
    const { season } = useSeason();
    const scrollY = useRef(0);
    const rafId = useRef(null);

    // Store current state for smooth transitions
    const currentState = useRef({
        bg: '#fff8e7',
        colors: ['#ffbe00', '#ffd700', '#ff8c00', '#ffa500'],
        opacity: 0.48
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false }); // Optimize for no transparency if possible, but we need it for some effects? Actually we fill rect so alpha: false might be okay if we fill bg.
        // Wait, we need transparency for the canvas itself if it sits on top of something? 
        // The component returns a canvas that is fixed. It seems it acts as a background.
        // Let's stick to default context but optimize drawing.

        let time = 0;

        // Set canvas size - REDUCED RESOLUTION
        const resizeCanvas = () => {
            const scale = 0.5; // 50% resolution
            canvas.width = window.innerWidth * scale;
            canvas.height = window.innerHeight * scale;
            // We don't scale the context, we just draw smaller. 
            // CSS handles the stretching.
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Track scroll
        const handleScroll = () => {
            scrollY.current = window.scrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Get target colors based on season
        const getTargetColors = (s) => {
            switch (s) {
                case 'spring':
                    return {
                        bg: '#fff0f5',
                        colors: ['#db2777', '#ec4899', '#be185d', '#f472b6'],
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
            const target = getTargetColors(season);
            const current = currentState.current;
            const lerpSpeed = 0.02; // Slow smooth transition

            // Lerp background
            current.bg = lerpColor(current.bg, target.bg, lerpSpeed);

            // Lerp opacity
            current.opacity += (target.opacity - current.opacity) * lerpSpeed;

            // Lerp palette colors
            current.colors = current.colors.map((c, i) => {
                if (target.colors[i]) {
                    return lerpColor(c, target.colors[i], lerpSpeed);
                }
                return c;
            });

            const w = canvas.width;
            const h = canvas.height;
            const scrollOffset = scrollY.current * 0.3 * 0.5; // Adjust for scale

            // Clear with background color
            ctx.fillStyle = current.bg;
            ctx.fillRect(0, 0, w, h);

            time += 0.002;

            // Use multiply blend for light themes (summer/spring) for better visibility
            // We can transition this too? Or just switch? Switching might be abrupt.
            // Let's stick to simple logic: if target is light, use multiply.
            const isTargetLight = season === 'summer' || season === 'spring';
            ctx.globalCompositeOperation = isTargetLight ? 'multiply' : 'screen';

            // REMOVED ctx.filter = 'blur(40px)' - Handled by CSS

            for (let i = 0; i < 11; i++) {
                const xSeed = ((i * 37) % 100 / 100) + Math.sin(time * 0.3 + i * 0.5) * 0.1;
                const ySeed = ((i * 53) % 100 / 100) + Math.cos(time * 0.25 + i * 0.7) * 0.1;

                const x = w * (0.05 + xSeed * 0.9) + Math.sin(time * 0.7 + i * 0.8) * 60 * 0.5; // Scale down movement
                const y = h * (0.05 + ySeed * 0.9 + Math.sin(time * 0.5 + i * 1.1) * 0.1) - scrollOffset * (0.3 + i * 0.03);
                const radius = Math.min(w, h) * (0.12 + Math.sin(time * 0.6 + i * 0.6) * 0.04);

                const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
                const colorIndex = i % current.colors.length;
                const alpha = Math.floor(current.opacity * 255).toString(16).padStart(2, '0');

                gradient.addColorStop(0, current.colors[colorIndex] + alpha);
                gradient.addColorStop(0.5, current.colors[colorIndex] + '30');
                gradient.addColorStop(1, current.colors[colorIndex] + '00');

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, w, h);
            }

            ctx.globalCompositeOperation = 'source-over';

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
            className="fixed top-0 left-0 w-full h-full pointer-events-none blur-[40px] will-change-transform translate-z-0"
            style={{ zIndex: 0 }}
        />
    );
};

