import { useState } from 'react';

export type Theme = 'cobalt' | 'prussian' | 'graphite' | 'stone';
export type Mode = 'light' | 'dark';

function savePreference(key: string, value: string) {
    try {
        localStorage.setItem(key, value);
    } catch {
        // The current session still uses the selected preference.
    }
}

export function useTheme() {
    const [theme, updateTheme] = useState<Theme>(() => {
        const initial = document.documentElement.dataset.theme;
        return initial === 'prussian' || initial === 'graphite' || initial === 'stone' ? initial : 'cobalt';
    });
    const [mode, updateMode] = useState<Mode>(() =>
        document.documentElement.dataset.mode === 'dark' ? 'dark' : 'light',
    );

    function setTheme(next: Theme) {
        document.documentElement.dataset.theme = next;
        savePreference('portfolio-theme', next);
        updateTheme(next);
    }

    function toggleMode() {
        const next = document.documentElement.dataset.mode === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.mode = next;
        savePreference('portfolio-mode', next);
        updateMode(next);
    }

    return { theme, setTheme, mode, toggleMode };
}
