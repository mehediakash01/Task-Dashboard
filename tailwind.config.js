/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#b9dffd',
          300: '#7cc4fb',
          400: '#36a4f6',
          500: '#0c87e8',
          600: '#0069c6',
          700: '#0053a0',
          800: '#044784',
          900: '#093c6d',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e8edf5',
          800: '#1a2035',
          900: '#111827',
          950: '#0a0f1e',
        }
      },
      boxShadow: {
        'glow': '0 0 20px rgba(12, 135, 232, 0.3)',
        'glow-sm': '0 0 10px rgba(12, 135, 232, 0.2)',
        'card': '0 4px 24px rgba(0,0,0,0.06)',
        'card-dark': '0 4px 24px rgba(0,0,0,0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}