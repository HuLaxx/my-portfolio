'use client';

import { useEffect, useRef, useState } from 'react';
import { useSeason } from './SeasonContext';

export const CustomCursor = () => {
    const { season } = useSeason();
    const cursorRef = useRef(null);
    const rafRef = useRef(null);
    const target = useRef({ x: -100, y: -100 });
    const current = useRef({ x: -100, y: -100 });
    const [accentColor, setAccentColor] = useState('#ffffff');

    const getSeasonColor = (s) => {
        switch (s) {
            case 'spring': return '#10b981'; // Emerald
            case 'summer': return '#f59e0b'; // Amber
            case 'autumn': return '#f97316'; // Orange
            case 'winter': return '#3b82f6'; // Blue
            default: return '#ffffff';
        }
    };

    // Sync with theme accent (falls back to hard-coded season palette)
    useEffect(() => {
        const updateColor = () => {
            const root = document.documentElement;
            const computedAccent = getComputedStyle(root).getPropertyValue('--accent')?.trim();
            setAccentColor(computedAccent || getSeasonColor(season));
        };

        updateColor();
        // Observer for theme changes if they happen via class/attribute updates
        const observer = new MutationObserver(updateColor);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'style'] });

        return () => observer.disconnect();
    }, [season]);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const moveCursor = (e) => {
            target.current.x = e.clientX;
            target.current.y = e.clientY;
        };

        const animate = () => {
            // Smoothly interpolate toward the target for a fluid feel
            current.current.x += (target.current.x - current.current.x) * 0.18;
            current.current.y += (target.current.y - current.current.y) * 0.18;
            cursor.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
            rafRef.current = requestAnimationFrame(animate);
        };

        const handleLeave = () => {
            if (cursor) cursor.style.opacity = '0';
        };

        const handleEnter = () => {
            if (cursor) cursor.style.opacity = '1';
        };

        animate();
        window.addEventListener('pointermove', moveCursor, { passive: true });
        document.addEventListener('mouseleave', handleLeave);
        document.addEventListener('mouseenter', handleEnter);

        // Hide default cursor globally
        document.body.style.cursor = 'none';
        const style = document.createElement('style');
        style.innerHTML = `* { cursor: none !important; }`;
        style.id = 'cursor-style';
        document.head.appendChild(style);

        return () => {
            window.removeEventListener('pointermove', moveCursor);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            document.body.style.cursor = 'auto';
            const existingStyle = document.getElementById('cursor-style');
            if (existingStyle) existingStyle.remove();
        };
    }, []);

    // Push accent color into CSS variables the SVG + glow can consume
    useEffect(() => {
        if (!cursorRef.current) return;
        cursorRef.current.style.setProperty('--cursor-accent', accentColor);
        cursorRef.current.style.setProperty('--cursor-glow', `${accentColor}55`);
    }, [accentColor]);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform transition-opacity duration-300"
            style={{
                transform: 'translate3d(-100px, -100px, 0)',
                marginTop: '-14px',
                marginLeft: '-14px'
            }}
        >
            <div className="relative w-10 h-10">
                <div
                    className="absolute -inset-2 rounded-full blur-xl opacity-60 transition-opacity"
                    style={{ background: 'var(--cursor-glow)' }}
                />
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                >
                    <path
                        d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                        fill="var(--cursor-accent)"
                        fillOpacity="0.8"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                        style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.5))' }}
                    />
                </svg>
            </div>
        </div>
    );
};
