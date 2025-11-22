'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const SeasonContext = createContext();

// Auto-detect season based on current month
const getAutoSeason = () => {
    const month = new Date().getMonth(); // 0-11
    if (month >= 2 && month <= 4) return 'spring'; // Mar-May
    if (month >= 5 && month <= 7) return 'summer'; // Jun-Aug
    if (month >= 8 && month <= 10) return 'autumn'; // Sep-Nov
    return 'winter'; // Dec-Feb
};

// Normalize function (no longer needed to map spring to rainy, but kept for safety)
const normalizeseason = (season) => {
    return season;
};

export const SeasonProvider = ({ children }) => {
    const [season, setSeasonState] = useState('summer');
    const [isLoaded, setIsLoaded] = useState(false);

    // Load saved season or auto-detect on mount
    useEffect(() => {
        const savedSeason = localStorage.getItem('preferred-season');
        const initialSeason = savedSeason || getAutoSeason();
        setSeasonState(normalizeseason(initialSeason));
        setIsLoaded(true);
    }, []);

    // Update DOM and localStorage when season changes
    useEffect(() => {
        if (!isLoaded) return;

        const root = document.documentElement;
        const body = document.body;

        // Smooth transitions
        root.style.transition = 'background-color 1s ease, color 1s ease';
        body.style.transition = 'font-family 0.5s ease';

        root.setAttribute('data-theme', season);
        localStorage.setItem('preferred-season', season);
    }, [season, isLoaded]);

    const setSeason = (newSeason) => {
        setSeasonState(normalizeseason(newSeason));
    };

    return (
        <SeasonContext.Provider value={{ season, setSeason, isLoaded }}>
            {children}
        </SeasonContext.Provider>
    );
};

export const useSeason = () => useContext(SeasonContext);
