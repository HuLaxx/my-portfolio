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
                        colors: ['#ff69b4', '#ffc0cb', '#ff1493', '#ffb7c5'],
                        opacity: 0.15
                    };
                case 'summer':
                    return {
                        bg: '#fff8e7',
                        colors: ['#ffbe00', '#ffd700', '#ff8c00', '#ffa500'],
                        opacity: 0.18
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

            time += 0.003;

            // Create multiple animated gradient blobs
            for (let i = 0; i < 4; i++) {
                const x = w * (0.2 + i * 0.25) + Math.sin(time + i) * 100;
                const y = h * (0.3 + Math.sin(time * 0.5 + i * 2) * 0.2) - scrollOffset * (0.5 + i * 0.1);
                const radius = Math.min(w, h) * (0.35 + Math.sin(time * 0.7 + i) * 0.15);

                const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
                gradient.addColorStop(0, colors[i] + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
                gradient.addColorStop(0.5, colors[i] + '10');
                gradient.addColorStop(1, colors[i] + '00');

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, w, h);
            }

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
