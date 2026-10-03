/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        obsidian: {
          950: '#08061a',
          900: '#0d0a26',
          800: '#130f30',
          700: '#1a153d',
          600: '#221c4e',
        },
        cyan: {
          400: '#22d3ee',
          DEFAULT: '#00d8ff',
          glow: '#00d8ff',
        },
        neon: {
          blue: '#3b82f6',
          violet: '#8b5cf6',
        },
      },
      backgroundImage: {
        'obsidian-gradient': 'linear-gradient(135deg, #08061a 0%, #0d0a26 50%, #130f30 100%)',
      },
      boxShadow: {
        'cyan-glow': '0 0 20px rgba(0,216,255,0.12), 0 0 60px rgba(0,216,255,0.04)',
        'cyan-sm': '0 0 10px rgba(0,216,255,0.15)',
        'card': '0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
}
