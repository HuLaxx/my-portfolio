'use client';

import { useState, useEffect, Suspense } from "react";
import { Loader } from "@/components/Loader";
import { useSeason } from "@/components/SeasonContext";

export function LoaderWrapper({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const { season } = useSeason();

    const themeBgs = {
        spring: 'linear-gradient(to bottom, #fdf2f8, #fce7f3)', // Light Pink
        summer: 'linear-gradient(to bottom, #fffbeb, #fef3c7)', // Light Amber
        autumn: '#1f1005', // Deep Orange
        winter: '#020617', // Deep Blue
    };

    // Safety timeout: Force unlock after 4 seconds max to prevent infinite loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isLoading && <Loader onUnlock={() => setIsLoading(false)} />}

            {/* Transition Layer */}
            <div
                className={`fixed inset-0 z-[90] pointer-events-none transition-opacity duration-[2000ms] ease-in-out ${isLoading ? 'opacity-100' : 'opacity-0'}`}
                style={{ background: themeBgs[season] || themeBgs.winter }}
            />

            <div className={`transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                <Suspense fallback={null}>
                    {children}
                </Suspense>
            </div>
        </>
    );
}
