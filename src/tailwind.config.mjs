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
                destructive: "#DF3131",
                "destructive-foreground": "#FFFFFF",
                "accent-teal": "#7FFF00",
                "accent-purple": "#7FFF00",
                "dark-background": "#121212",
                "light-foreground": "#FFFFFF",
                "glass-overlay": "rgba(255, 255, 255, 0.1)",
                "soft-shadow": "rgba(0, 0, 0, 0.2)",
                background: "#121212",
                secondary: "#FFFFFF",
                foreground: "#000000",
                "secondary-foreground": "#000000",
                "primary-foreground": "#FFFFFF",
                primary: "#121212",
                lavendergradientstart: "#7FFF00",
                gridline: "#7FFF00",
                lavendergradientend: "#FFFFFF",
                softyellowaccent: "#F5F5F5",
                destructiveforeground: "#FFFFFF"
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
