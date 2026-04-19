/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Geist"', '"DM Sans"', 'sans-serif'],
        mono: ['"Geist Mono"', '"DM Mono"', 'monospace'],
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scan': {
          '0%, 100%': { top: '8%' },
          '50%': { top: '84%' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        'slide-up': 'slide-up 0.4s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in': 'fade-in 0.5s ease forwards',
        'scan': 'scan 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 0.75s linear infinite',
      }
    },
  },
  plugins: [],
}
