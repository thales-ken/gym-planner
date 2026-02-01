import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1392ec",
        "background-light": "#f6f7f8",
        "background-dark": "#101a22",
        background: "var(--background)",
        foreground: "var(--foreground)",
        danger: "var(--danger)",
        emphasis: "var(--emphasis)",
        whatever: "var(--whatever)",
      },
      fontFamily: {
        display: ["Lexend", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
export default config;
