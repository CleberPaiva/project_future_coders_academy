/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#edf1ff',
          100: '#dbe4ff',
          200: '#c1d0ff',
          300: '#9ab2ff',
          400: '#7a8eff',
          500: '#4361ee', // Main primary color
          600: '#3a4ecc',
          700: '#2d3ca3',
          800: '#222e7f',
          900: '#1b2466',
        },
        secondary: {
          50: '#f4edff',
          100: '#e9daff',
          200: '#d4b8ff',
          300: '#bb8bff',
          400: '#a05fff',
          500: '#7209b7', // Main secondary color
          600: '#6107a3',
          700: '#4d0684',
          800: '#3c0565',
          900: '#2e0451',
        },
        accent: {
          50: '#ffe5f2',
          100: '#ffcce6',
          200: '#ff99cd',
          300: '#ff66b4',
          400: '#ff339b',
          500: '#f72585', // Main accent color
          600: '#d51e70',
          700: '#a8185a',
          800: '#7f1344',
          900: '#5c0e32',
        },
        success: {
          500: '#22c55e',
        },
        warning: {
          500: '#f59e0b',
        },
        error: {
          500: '#ef4444',
        },
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};