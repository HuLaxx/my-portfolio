'use client';

export const ScrollBlurMask = () => {
    return (
        <>
            {/* Top Blur Zone (20% height) */}
            <div
                className="fixed top-0 left-0 right-0 h-[20vh] z-[30] pointer-events-none backdrop-blur-[6px]"
                style={{
                    maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)'
                }}
            />

            {/* Bottom Blur Zone (10% height) */}
            <div
                className="fixed bottom-0 left-0 right-0 h-[10vh] z-[30] pointer-events-none backdrop-blur-[6px]"
                style={{
                    maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)'
                }}
            />
        </>
    );
};
