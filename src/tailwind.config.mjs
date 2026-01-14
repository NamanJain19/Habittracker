/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.05em", fontWeight: "400" }],
                sm: ["0.875rem", { lineHeight: "1.3", letterSpacing: "0.05em", fontWeight: "400" }],
                base: ["1rem", { lineHeight: "1.5", letterSpacing: "0.05em", fontWeight: "400" }],
                lg: ["1.125rem", { lineHeight: "1.5", letterSpacing: "0.05em", fontWeight: "500" }],
                xl: ["1.25rem", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "600" }],
                "2xl": ["1.5rem", { lineHeight: "1.3", letterSpacing: "0.05em", fontWeight: "700" }],
                "3xl": ["1.875rem", { lineHeight: "1.2", letterSpacing: "0.05em", fontWeight: "700" }],
                "4xl": ["2.25rem", { lineHeight: "1.1", letterSpacing: "0.05em", fontWeight: "800" }],
                "5xl": ["3rem", { lineHeight: "1.1", letterSpacing: "0.05em", fontWeight: "900" }],
                "6xl": ["3.75rem", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "900" }],
                "7xl": ["4.5rem", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "900" }],
                "8xl": ["6rem", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "900" }],
                "9xl": ["8rem", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "900" }],
            },
            fontFamily: {
                heading: ["Open Sans"],
                paragraph: ["azeret-mono"]
            },
            colors: {
                // Calm Intelligence Design System
                // Dark Mode (Primary)
                "dark-bg": "#0A0E1A",
                "dark-surface": "#131824",
                "dark-elevated": "#1A1F2E",
                "dark-text": "#E8EDF4",
                "dark-text-secondary": "#9BA3B4",
                
                // Light Mode (Optional)
                "light-bg": "#F5F7FA",
                "light-surface": "#FFFFFF",
                "light-elevated": "#FAFBFC",
                "light-text": "#1A1F2E",
                "light-text-secondary": "#5A6376",
                
                // Accent Colors
                "accent-cyan": "#4FD1C5",
                "accent-cyan-glow": "rgba(79, 209, 197, 0.3)",
                "accent-purple": "#9F7AEA",
                "accent-purple-glow": "rgba(159, 122, 234, 0.3)",
                
                // Semantic Colors
                "success": "#48BB78",
                "warning": "#ECC94B",
                "error": "#F56565",
                "info": "#4299E1",
                
                // Glass Effects
                "glass-dark": "rgba(26, 31, 46, 0.6)",
                "glass-light": "rgba(255, 255, 255, 0.6)",
                "glass-border-dark": "rgba(255, 255, 255, 0.08)",
                "glass-border-light": "rgba(0, 0, 0, 0.08)",
                
                // Legacy support (mapped to new system)
                destructive: "#F56565",
                "destructive-foreground": "#FFFFFF",
                "accent-teal": "#4FD1C5",
                "dark-background": "#0A0E1A",
                "light-foreground": "#E8EDF4",
                background: "#0A0E1A",
                foreground: "#E8EDF4",
                primary: "#4FD1C5",
                "primary-foreground": "#0A0E1A",
                secondary: "#1A1F2E",
                "secondary-foreground": "#E8EDF4",
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
