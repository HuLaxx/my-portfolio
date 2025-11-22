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

        // Add snap behavior
        lenis.on('scroll', ({ scroll }) => {
            // Detect when scroll stops and snap to nearest section
            clearTimeout(lenis.snapTimeout);
            lenis.snapTimeout = setTimeout(() => {
                const sections = document.querySelectorAll('section, footer');
                let closest = null;
                let closestDistance = Infinity;

                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    const distance = Math.abs(rect.top);

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closest = section;
                    }
                });

                if (closest && closestDistance > 5) {
                    closest.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        });

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
