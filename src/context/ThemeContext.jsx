import React, { createContext, useContext, useEffect, useState } from 'react';

export const THEMES = [
  {
    id: 'dark',
    name: 'Executive Dark',
    type: 'dark',
    badge: 'Executive',
    swatch: '#0e1117',
    accent: '#38bdf8',
    icon: 'Moon',
    description: 'Titanium Slate & Glowing Azure'
  },
  {
    id: 'light',
    name: 'Executive Light',
    type: 'light',
    badge: 'Executive',
    swatch: '#f8fafc',
    accent: '#2563eb',
    icon: 'Sun',
    description: 'Crisp White & Royal Sapphire'
  },
  {
    id: 'pastel-sage',
    name: 'Pastel Sage',
    type: 'light',
    badge: 'Pastel Green',
    swatch: '#f3f6f3',
    accent: '#2d5a3e',
    icon: 'Leaf',
    description: 'Soft Sage & Eucalyptus'
  },
  {
    id: 'pastel-mint',
    name: 'Pastel Mint',
    type: 'light',
    badge: 'Pastel Green',
    swatch: '#eff8f5',
    accent: '#196451',
    icon: 'Sparkles',
    description: 'Fresh Seafoam & Jade'
  },
  {
    id: 'pastel-forest',
    name: 'Pastel Forest',
    type: 'dark',
    badge: 'Pastel Green',
    swatch: '#09110d',
    accent: '#4ade80',
    icon: 'Trees',
    description: 'Deep Pine & Glowing Mint'
  },
  {
    id: 'pastel-ocean',
    name: 'Pastel Ocean',
    type: 'dark',
    badge: 'Shade of Blue',
    swatch: '#0a111c',
    accent: '#38bdf8',
    icon: 'Waves',
    description: 'Deep Navy & Pastel Cyan'
  },
  {
    id: 'pastel-sky',
    name: 'Pastel Sky',
    type: 'light',
    badge: 'Shade of Blue',
    swatch: '#f0f6fc',
    accent: '#0284c7',
    icon: 'Droplets',
    description: 'Glacial Ice & Arctic Azure'
  },
];

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved && THEMES.some(t => t.id === saved)) {
      return saved;
    }
    // Backward compatibility for 'dark' / 'light' string
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const currentTheme = THEMES.find(t => t.id === theme) || THEMES[0];
  const darkMode = currentTheme.type === 'dark';

  useEffect(() => {
    const root = document.documentElement;

    // Remove all possible theme classes
    THEMES.forEach(t => {
      root.classList.remove(`theme-${t.id}`);
    });
    root.classList.remove('dark');

    // Add current theme class
    root.classList.add(`theme-${currentTheme.id}`);
    if (currentTheme.type === 'dark') {
      root.classList.add('dark');
    }

    localStorage.setItem('theme', currentTheme.id);
  }, [theme, currentTheme]);

  // Quick toggle cycles through the themes
  const toggleTheme = () => {
    setTheme(prev => {
      const idx = THEMES.findIndex(t => t.id === prev);
      const nextIdx = (idx + 1) % THEMES.length;
      return THEMES[nextIdx].id;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES, currentTheme, darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);


