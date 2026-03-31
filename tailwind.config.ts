import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        ink: "#0f0f0f",
        muted: "#6b6b6b",
        border: "#b1abab",
        accent: "#0066ff",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "eq-1": "equalize 0.8s ease-in-out infinite",
        "eq-2": "equalize 0.8s ease-in-out infinite 0.2s",
        "eq-3": "equalize 0.8s ease-in-out infinite 0.4s",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        equalize: {
          "0%, 100%": { height: "4px" },
          "50%": { height: "12px" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
