import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  currentEventTheme: string;
  setEventTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false); // Default to light theme
  const [currentEventTheme, setCurrentEventTheme] = useState('default');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    
    // Default to light theme unless explicitly set to dark
    if (saved === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    // Apply dynamic CSS variables for theming
    updateThemeVariables(currentEventTheme);
  }, [currentEventTheme]);

  const updateThemeVariables = (theme: string) => {
    const root = document.documentElement;
    
    // Light, vibrant color themes
    const themeColors = {
      default: {
        primary: '59 130 246', // blue-500
        secondary: '147 51 234', // purple-600
        accent: '99 102 241', // indigo-500
        bg: '248 250 252', // slate-50
        surface: '255 255 255', // white
      },
      technology: {
        primary: '6 182 212', // cyan-500
        secondary: '59 130 246', // blue-500
        accent: '14 165 233', // sky-500
        bg: '240 249 255', // sky-50
        surface: '255 255 255',
      },
      business: {
        primary: '16 185 129', // emerald-500
        secondary: '20 184 166', // teal-500
        accent: '34 197 94', // green-500
        bg: '240 253 244', // green-50
        surface: '255 255 255',
      },
      art: {
        primary: '236 72 153', // pink-500
        secondary: '244 63 94', // rose-500
        accent: '239 68 68', // red-500
        bg: '253 242 248', // pink-50
        surface: '255 255 255',
      },
      music: {
        primary: '168 85 247', // purple-500
        secondary: '139 92 246', // violet-500
        accent: '124 58 237', // violet-600
        bg: '250 245 255', // purple-50
        surface: '255 255 255',
      },
      dining: {
        primary: '245 158 11', // amber-500
        secondary: '249 115 22', // orange-500
        accent: '234 179 8', // yellow-500
        bg: '255 251 235', // amber-50
        surface: '255 255 255',
      },
      'food & drink': {
        primary: '249 115 22', // orange-500
        secondary: '239 68 68', // red-500
        accent: '236 72 153', // pink-500
        bg: '255 247 237', // orange-50
        surface: '255 255 255',
      },
    };

    const colors = themeColors[theme as keyof typeof themeColors] || themeColors.default;
    
    root.style.setProperty('--theme-primary', colors.primary);
    root.style.setProperty('--theme-secondary', colors.secondary);
    root.style.setProperty('--theme-accent', colors.accent);
    root.style.setProperty('--theme-bg', colors.bg);
    root.style.setProperty('--theme-surface', colors.surface);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const setEventTheme = (theme: string) => {
    setCurrentEventTheme(theme);
    updateThemeVariables(theme);
  };

  return (
    <ThemeContext.Provider value={{ 
      isDark, 
      toggleTheme, 
      currentEventTheme, 
      setEventTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}