'use client';

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "sunny",
  setTheme: () => {},
  themes: [],
});

const validThemes = [
  { id: "sunny", label: "Sunny" },
  { id: "autumn", label: "Autumn" },
  { id: "winter", label: "Winter" },
  { id: "rainy", label: "Rainy" },
];

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("autumn");

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    if (stored && validThemes.find((t) => t.id === stored)) {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSetTheme = (nextTheme) => {
    const exists = validThemes.find((t) => t.id === nextTheme);
    setTheme(exists ? exists.id : "autumn");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, themes: validThemes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
