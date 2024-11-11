import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f4edeb",
      },
      fontFamily: {
        fontPrincipal: ["Montserrat, sans-serif"]
      },
      letterSpacing: {
        tightest: '-1px',
      },
    },
  },
  plugins: [],
};
export default config;
