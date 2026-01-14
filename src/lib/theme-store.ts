import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'dark' | 'light' | 'auto';
  language: string;
  setTheme: (theme: 'dark' | 'light' | 'auto') => void;
  setLanguage: (language: string) => void;
  getEffectiveTheme: () => 'dark' | 'light';
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      language: 'en',
      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme);
      },
      setLanguage: (language) => set({ language }),
      getEffectiveTheme: () => {
        const { theme } = get();
        if (theme === 'auto') {
          return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return theme;
      },
    }),
    {
      name: 'quantumlife-theme',
    }
  )
);

function applyTheme(theme: 'dark' | 'light' | 'auto') {
  const root = document.documentElement;
  
  let effectiveTheme: 'dark' | 'light' = theme === 'auto'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    : theme;

  if (effectiveTheme === 'dark') {
    root.classList.remove('light-mode');
    root.classList.add('dark-mode');
  } else {
    root.classList.remove('dark-mode');
    root.classList.add('light-mode');
  }
}

// Initialize theme on load
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('quantumlife-theme');
  if (stored) {
    try {
      const { state } = JSON.parse(stored);
      applyTheme(state.theme || 'dark');
    } catch (e) {
      applyTheme('dark');
    }
  } else {
    applyTheme('dark');
  }

  // Listen for system theme changes when in auto mode
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const { theme } = useThemeStore.getState();
    if (theme === 'auto') {
      applyTheme('auto');
    }
  });
}
