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
                destructive: "#EF4444",
                "destructive-foreground": "#FFFFFF",
                "accent-teal": "#06B6D4",
                "accent-purple": "#8B5CF6",
                "dark-background": "#0F172A",
                "light-foreground": "#F8FAFC",
                "glass-overlay": "rgba(255, 255, 255, 0.1)",
                "soft-shadow": "rgba(0, 0, 0, 0.2)",
                background: "#0F172A",
                secondary: "#F8FAFC",
                foreground: "#1E293B",
                "secondary-foreground": "#1E293B",
                "primary-foreground": "#F8FAFC",
                primary: "#0F172A",
                lavendergradientstart: "#06B6D4",
                gridline: "#06B6D4",
                lavendergradientend: "#F8FAFC",
                softyellowaccent: "#F1F5F9",
                destructiveforeground: "#FFFFFF"
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
