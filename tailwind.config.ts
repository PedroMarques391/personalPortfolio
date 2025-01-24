import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-light': '#1c1c1c',
        'gray-dark': '#a0a0a0',
        'gray-soft': '#d1d1d1',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
        mono: ['var(--font-fira-code)', 'monospace'],
        serif: ['Merriweather', 'serif'],
      }
    },
  },
  plugins: [],
} satisfies Config;

