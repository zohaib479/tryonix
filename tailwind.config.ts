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
        background: "var(--bg)",
        foreground: "var(--fg)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        cyber: {
          cyan: "var(--primary)",
          purple: "var(--secondary)",
          pink: "var(--accent)",
          blue: "#050a30",
          dark: "#0a0a0a",
        },
      },
      animation: {
        "glow-pulse": "glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glitch": "glitch 1s infinite linear alternate-reverse",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "1", textShadow: "0 0 20px #00f3ff" },
          "50%": { opacity: "0.7", textShadow: "0 0 10px #00f3ff" },
        },
        "glitch": {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(transparent 0%, rgba(0, 243, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, transparent 0%, rgba(0, 243, 255, 0.05) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
export default config;
