/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        genre: {
          blue: {
            DEFAULT: '#0284C7',
            50: '#F0F9FF',
            100: '#E0F2FE',
            200: '#BAE6FD',
            300: '#7DD3FC',
            500: '#0EA5E9',
            600: '#0284C7',
            700: '#0369A1',
            800: '#075985',
            900: '#0C4A6E',
          },
          yellow: {
            DEFAULT: '#F59E0B',
            50: '#FFFBEB',
            100: '#FEF3C7',
            200: '#FDE68A',
            300: '#FCD34D',
            400: '#FBBF24',
            500: '#F59E0B',
            600: '#D97706',
            700: '#B45309',
          },
          rose: {
            DEFAULT: '#E11D48',
            50: '#FFF1F2',
            100: '#FFE4E6',
            200: '#FECDD3',
            500: '#F43F5E',
            600: '#E11D48',
          },
          green: {
            DEFAULT: '#10B981',
            50: '#ECFDF5',
            100: '#D1FAE5',
            200: '#A7F3D0',
            500: '#10B981',
            600: '#059669',
          },
          purple: {
            DEFAULT: '#8B5CF6',
            50: '#F5F3FF',
            100: '#EDE9FE',
            500: '#8B5CF6',
            600: '#7C3AED',
          },
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(0,0,0,0.06), 0 4px 6px -2px rgba(0,0,0,0.04)',
        'card': '0 14px 28px -8px rgba(15, 23, 42, 0.08), 0 4px 10px -2px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 20px 40px -12px rgba(15, 23, 42, 0.12), 0 8px 16px -4px rgba(15, 23, 42, 0.06)',
        'pill': '0 4px 14px 0 rgba(245, 158, 11, 0.25)',
      },
      animation: {
        'float-slow': 'floatSlow 5s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 0.9 },
          '50%': { opacity: 0.6 },
        }
      }
    },
  },
  plugins: [],
}
