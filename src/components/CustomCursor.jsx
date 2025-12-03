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
    const [isTouch, setIsTouch] = useState(false);

    const getSeasonColor = (s) => {
        switch (s) {
            case 'spring': return '#10b981'; // Emerald
            case 'summer': return '#f59e0b'; // Amber
            case 'autumn': return '#f97316'; // Orange
            case 'winter': return '#3b82f6'; // Blue
            default: return '#ffffff';
        }
    };

    // Detect Touch Device
    useEffect(() => {
        const checkTouch = () => {
            setIsTouch(window.matchMedia('(pointer: coarse)').matches);
        };
        checkTouch();
        window.addEventListener('resize', checkTouch);
        return () => window.removeEventListener('resize', checkTouch);
    }, []);

    // Sync with theme accent
    useEffect(() => {
        const updateColor = () => {
            const root = document.documentElement;
            const computedAccent = getComputedStyle(root).getPropertyValue('--accent')?.trim();
            setAccentColor(computedAccent || getSeasonColor(season));
        };

        updateColor();
        const observer = new MutationObserver(updateColor);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'style'] });

        return () => observer.disconnect();
    }, [season]);

    // Mouse Cursor Logic (Only run if NOT touch)
    useEffect(() => {
        if (isTouch) return;

        const cursor = cursorRef.current;
        if (!cursor) return;

        const moveCursor = (e) => {
            target.current.x = e.clientX;
            target.current.y = e.clientY;
        };

        const animate = () => {
            current.current.x += (target.current.x - current.current.x) * 0.18;
            current.current.y += (target.current.y - current.current.y) * 0.18;
            cursor.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
            rafRef.current = requestAnimationFrame(animate);
        };

        const handleLeave = () => { if (cursor) cursor.style.opacity = '0'; };
        const handleEnter = () => { if (cursor) cursor.style.opacity = '1'; };

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
            document.removeEventListener('mouseleave', handleLeave);
            document.removeEventListener('mouseenter', handleEnter);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            document.body.style.cursor = 'auto';
            const existingStyle = document.getElementById('cursor-style');
            if (existingStyle) existingStyle.remove();
        };
    }, [isTouch]);

    // Push accent color into CSS variables
    useEffect(() => {
        if (!cursorRef.current) return;
        cursorRef.current.style.setProperty('--cursor-accent', accentColor);
        cursorRef.current.style.setProperty('--cursor-glow', `${accentColor}55`);
    }, [accentColor]);

    if (isTouch) {
        return null;
    }

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
