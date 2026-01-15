/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ["0.75rem", { lineHeight: "1.5", fontWeight: "400" }],
                sm: ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
                base: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
                lg: ["1.125rem", { lineHeight: "1.6", fontWeight: "500" }],
                xl: ["1.25rem", { lineHeight: "1.5", fontWeight: "600" }],
                "2xl": ["1.5rem", { lineHeight: "1.4", fontWeight: "600" }],
                "3xl": ["1.875rem", { lineHeight: "1.3", fontWeight: "700" }],
                "4xl": ["2.25rem", { lineHeight: "1.2", fontWeight: "700" }],
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            colors: {
                // Simple, friendly color system
                primary: {
                    DEFAULT: '#10b981', // Calm green
                    hover: '#059669',
                    light: '#d1fae5',
                    dark: '#065f46',
                },
                // Light mode colors
                light: {
                    bg: '#f8f9fa',
                    surface: '#ffffff',
                    text: '#1f2937',
                    'text-secondary': '#6b7280',
                    border: '#e5e7eb',
                    foreground: '#1f2937',
                },
                // Dark mode colors
                dark: {
                    bg: '#1a1a1a',
                    surface: '#2d2d2d',
                    text: '#f3f4f6',
                    'text-secondary': '#9ca3af',
                    border: '#404040',
                    background: '#0a0a0a',
                },
                // Accent colors
                accent: {
                    teal: '#14b8a6',
                    purple: '#a855f7',
                },
                // Semantic colors
                success: '#10b981',
                warning: '#f59e0b',
                error: '#ef4444',
                info: '#3b82f6',
            },
            borderRadius: {
                DEFAULT: '12px',
                lg: '16px',
                xl: '20px',
                '2xl': '24px',
            },
            boxShadow: {
                'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
                'soft-lg': '0 4px 16px rgba(0, 0, 0, 0.1)',
                'soft-hover': '0 4px 12px rgba(0, 0, 0, 0.12)',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'scale-in': 'scaleIn 0.2s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
