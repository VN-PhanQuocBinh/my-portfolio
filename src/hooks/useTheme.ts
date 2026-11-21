import { useEffect, useState } from 'react';

export type Theme = 'cobalt' | 'prussian' | 'azure';
const isTheme = (value: string | null): value is Theme => value === 'cobalt' || value === 'prussian' || value === 'azure';
function initialTheme(): Theme {
    try { const saved = localStorage.getItem('portfolio-theme'); return isTheme(saved) ? saved : 'cobalt'; }
    catch { return 'cobalt'; }
}
export function useTheme() {
    const [theme, setTheme] = useState<Theme>(initialTheme);
    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        try { localStorage.setItem('portfolio-theme', theme); } catch { /* Theme remains available for this session. */ }
    }, [theme]);
    return { theme, setTheme };
}
