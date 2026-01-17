'use client';

import { useState, useEffect, Suspense } from "react";
import { Loader } from "@/components/Loader";
import { AnimatePresence } from "framer-motion";

export function LoaderWrapper({ children }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 5000); // Extended to 5s for smoother transition sequence








        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && <Loader key="loader" />}
            </AnimatePresence>

            <div
                className={`transition-opacity duration-[2000ms] ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                style={{ transitionDelay: isLoading ? '0ms' : '200ms' }}
            >
                <Suspense fallback={null}>
                    {children}
                </Suspense>
            </div>
        </>
    );
}
