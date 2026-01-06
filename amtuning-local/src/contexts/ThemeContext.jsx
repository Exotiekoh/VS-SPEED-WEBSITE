import React, { createContext, useContext, useState, useEffect } from 'react';

import { themes } from '../data/themes';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(() => {
        // Check if theme is already set in sessionStorage (persists during session)
        const savedTheme = sessionStorage.getItem('selectedTheme');
        
        if (savedTheme) {
            const theme = themes.find(t => t.name === savedTheme);
            if (theme) return theme;
        }
        
        // Randomize theme on first visit
        const randomIndex = Math.floor(Math.random() * themes.length);
        const randomTheme = themes[0]; // Default to first theme if randomization is not desired here, but logic below does random
        // Actually, let's keep the randomization logic in initialization
        const rt = themes[Math.floor(Math.random() * themes.length)];
        sessionStorage.setItem('selectedTheme', rt.name);
        return rt;
    });

    const switchTheme = (themeName) => {
        const theme = themes.find(t => t.name === themeName);
        if (theme) {
            setCurrentTheme(theme);
            sessionStorage.setItem('selectedTheme', theme.name);
        }
    };

    const randomizeTheme = () => {
        const randomIndex = Math.floor(Math.random() * themes.length);
        const randomTheme = themes[randomIndex];
        setCurrentTheme(randomTheme);
        sessionStorage.setItem('selectedTheme', randomTheme.name);
    };

    // Apply CSS variables
    useEffect(() => {
        if (currentTheme) {
            document.documentElement.style.setProperty('--color-primary', currentTheme.primary);
            document.documentElement.style.setProperty('--color-primary-red', currentTheme.primary);
            document.documentElement.style.setProperty('--color-secondary', currentTheme.secondary);
            document.documentElement.style.setProperty('--color-gold', currentTheme.secondary);
            document.documentElement.style.setProperty('--color-accent', currentTheme.accent);
            document.documentElement.style.setProperty('--color-bg', currentTheme.background);
        }
    }, [currentTheme]);

    if (!currentTheme) {
        return null; // or loading spinner
    }

    return (
        <ThemeContext.Provider value={{ 
            currentTheme, 
            themes, 
            switchTheme, 
            randomizeTheme 
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
