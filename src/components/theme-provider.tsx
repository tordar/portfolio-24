"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Theme = 'light' | 'dark' | 'sky'

interface ThemeContextType {
    theme: Theme
    setTheme: (theme: Theme) => void
    updateSkyTheme: (time: number) => void
    skyBackgroundColor: string
    skyPrimaryColor?: string  // Add a primary color for favicon
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark')
    const [skyBackgroundColor, setSkyBackgroundColor] = useState('')
    const [skyPrimaryColor, setSkyPrimaryColor] = useState('')
    const [textColor, setTextColor] = useState('')

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') as Theme
        if (storedTheme) {
            setTheme(storedTheme)
        } else {
            setTheme('dark')
        }
    }, [])

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark', 'sky')
        document.documentElement.classList.add(theme)
        localStorage.setItem('theme', theme)

        if (theme === 'sky') {
            document.documentElement.style.setProperty('--muted-bg-color', skyBackgroundColor)
            document.documentElement.style.setProperty('--sky-text-color', textColor)
            document.documentElement.style.setProperty('--muted-foreground', textColor)
        } else {
            document.documentElement.style.removeProperty('--muted-bg-color')
            document.documentElement.style.removeProperty('--sky-text-color')
            document.documentElement.style.removeProperty('--muted-foreground')
            
        }
    }, [theme, skyBackgroundColor, textColor])

    const updateSkyTheme = (time: number) => {
        const hour = Math.floor(time / 60);
        const minute = time % 60;

        // Primary colors for each hour
        const hourlyColors = [
            '#E8E8F5', '#E0E0F0', '#D8D8EB', '#D0D0E6', '#C8C8E1', '#FFE5DC',
            '#FFE8D1', '#FFEBD6', '#E6F3FF', '#E0F0FF', '#E6F5FF', '#F0F8FF',
            '#F8FFFF', '#F0F8FF', '#F0F8FF', '#E6F0FF', '#FFEBD6', '#FFE8D1',
            '#FFE5DC', '#FFE2D7', '#E8D8ED', '#E0D0E8', '#D8C8E3', '#E0D8F0'
        ];

        // Gradient complementary colors for each hour - lighter versions with good contrast
        const hourlyGradientColors = [
            '#D0D0F0', '#CFCFF2', '#D4D4FC', '#D9D9F6', '#DEDEF0', '#FFD0C0',
            '#FFE0C0', '#FFE8D0', '#D0E6FF', '#C0E0FF', '#D0E6FF', '#E0F0FF',
            '#F0FFFF', '#E0F0FF', '#E0F0FF', '#D0E0FF', '#FFE8D0', '#FFE0C0',
            '#FFD0C0', '#FFC0C0', '#D0C0E0', '#C0B0D0', '#B0A0C0', '#A090D0'
        ];

        const interpolateColor = (color1: string, color2: string, factor: number): string => {
            const r1 = parseInt(color1.slice(1, 3), 16);
            const g1 = parseInt(color1.slice(3, 5), 16);
            const b1 = parseInt(color1.slice(5, 7), 16);

            const r2 = parseInt(color2.slice(1, 3), 16);
            const g2 = parseInt(color2.slice(3, 5), 16);
            const b2 = parseInt(color2.slice(5, 7), 16);

            const r = Math.round(r1 + factor * (r2 - r1));
            const g = Math.round(g1 + factor * (g2 - g1));
            const b = Math.round(b1 + factor * (b2 - b1));

            return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        };

        const setTextColorForContrast = (): string => {
            return '#000000';
        };

        const currentColor = hourlyColors[hour];
        const nextColor = hourlyColors[(hour + 1) % 24];
        const currentGradientColor = hourlyGradientColors[hour];
        const nextGradientColor = hourlyGradientColors[(hour + 1) % 24];
        const interpolationFactor = minute / 60;

        const bgColor = interpolateColor(currentColor, nextColor, interpolationFactor);
        const gradientColor = interpolateColor(currentGradientColor, nextGradientColor, interpolationFactor);
        
        // Generate a mid-point color for more dynamic gradients (optional)
        const midColor = interpolateColor(bgColor, gradientColor, 0.3);
        
        // Enhanced gradient directions with more angles for variety
        const gradientDirections = [
            'to right', '135deg', 'to bottom', '225deg', 
            'to left', '315deg', 'to top', '45deg'
        ];
        
        // Change gradient direction every 3 hours for variety
        const directionIndex = Math.floor(hour / 3) % gradientDirections.length;
        const gradientDirection = gradientDirections[directionIndex];
        
        // Set a more intense gradient with three color stops
        const gradientBg = `linear-gradient(${gradientDirection}, ${bgColor}, ${midColor} 50%, ${gradientColor})`;
        setSkyBackgroundColor(gradientBg);
        setSkyPrimaryColor(bgColor); // Store the primary color for the favicon
        setTextColor(setTextColorForContrast());
    };
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme, updateSkyTheme, skyBackgroundColor, skyPrimaryColor }}>
            <div className={`min-h-screen transition-colors duration-100 ${theme}`}
                 style={theme === 'sky' ? {backgroundImage: skyBackgroundColor, color: textColor} : {}}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}