import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          primary: '#2e7d32',
          light: '#e8f5e9',
          dark: '#1a4d20',
          accent: '#43a047',
          mid: '#c8e6c9',
        },
        agri: {
          text: '#1b2e1c',
          muted: '#4a6741',
          border: '#c8e6c9',
          bg: '#e8f5e9',
        },
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'Inter', 'sans-serif'],
        sans: ['var(--font-dm-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-dot': 'pulse 1.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'ticker': 'ticker 30s linear infinite',
        'draw-underline': 'drawUnderline 1s ease forwards',
        'count-up': 'countUp 2s ease forwards',
        'fade-up': 'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        drawUnderline: {
          '0%': { 'stroke-dashoffset': '400' },
          '100%': { 'stroke-dashoffset': '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
