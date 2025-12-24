'use client';

import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const { theme, toggleTheme, mounted } = useTheme();

    // Show nothing until mounted to prevent hydration mismatch
    if (!mounted) {
        return (
            <button
                className="p-2 rounded-lg glass-button-secondary"
                aria-label="Toggle theme"
            >
                <div className="w-5 h-5" />
            </button>
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg glass-button-secondary hover:bg-white/10 transition-all duration-300"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            <div className="relative w-5 h-5">
                {/* Sun Icon */}
                <Sun
                    className={`w-5 h-5 absolute transition-all duration-300 ${theme === 'dark'
                            ? 'opacity-100 rotate-0 scale-100'
                            : 'opacity-0 -rotate-90 scale-50'
                        }`}
                />
                {/* Moon Icon */}
                <Moon
                    className={`w-5 h-5 absolute transition-all duration-300 ${theme === 'light'
                            ? 'opacity-100 rotate-0 scale-100'
                            : 'opacity-0 rotate-90 scale-50'
                        }`}
                />
            </div>
        </button>
    );
}
