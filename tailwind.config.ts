import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // not extending default tailwind colors because all colors used within the app will be provided by the list below
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
      danger: "var(--danger)",
      emphasis: "var(--emphasis)",
      whatever: "var(--whatever)",
    },
  },
  plugins: [],
};
export default config;
