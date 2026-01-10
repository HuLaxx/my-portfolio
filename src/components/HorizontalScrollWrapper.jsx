"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const HorizontalScrollWrapper = ({ children }) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Map vertical scroll progress (0 to 1) to horizontal translation (0% to -75%)
    // -75% assumes 4 full-screen sections (total width 400vw).
    // 100% / 4 = 25% per section.
    // Viewing 1st (0%), moving to 4th (starts at 75%).
    // So we translate -75% to bring the 4th section into view.
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[500vh]"> {/* Scroll distance control */}
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                <motion.div
                    style={{ x }}
                    className="flex h-screen w-[400vw]" // 4 sections * 100vw
                >
                    {children}
                </motion.div>
            </div>
        </section>
    );
};
