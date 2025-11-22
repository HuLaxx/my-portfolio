'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export const SmoothScroll = ({ children }) => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            // Enable snap scrolling
            syncTouch: true,
            syncTouchLerp: 0.1,
        });

        // Snap behavior removed
        // lenis.on('scroll', ({ scroll }) => { ... });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return children;
};
