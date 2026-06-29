import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // TAM TECH Brand Colors
        brand: {
          teal: "#0D98BA",
          "teal-light": "#0D98BA/10",
          lime: "#8AC926",
          "lime-light": "#8AC926/10",
        },
        // Industrial-Clean UI
        surface: {
          white: "#FFFFFF",
          grey: "#FAFAFA",
          "grey-dark": "#F5F5F5",
        },
        // Functional colors
        text: {
          primary: "#1A1A1A",
          secondary: "#4A4A4A",
          muted: "#6B7280",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
