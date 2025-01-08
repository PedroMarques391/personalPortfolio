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
        'blue-primary': '#1962a0',
        'blue-secondary': '#144e80',
        'blue-dark': '#0f3a60',
        'blue-darker': '#0a2740',
        'blue-deep': '#051320',

        'blue-light-00': '#e0f7ff',
        'blue-light': '#7cb7e1',
        'gray-light': '#d1d1d1',
        'gray-dark': '#a0a0a0',
        'blue-soft': '#5c7a99',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;

