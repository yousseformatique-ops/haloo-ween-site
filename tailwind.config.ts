import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  '#F0FAF5',
          100: '#E1F5EE',
          200: '#C3EBD9',
          300: '#8DD5B7',
          400: '#5DCAA5',
          500: '#0F6E56',
          600: '#0A5A45',
          700: '#085041',
          800: '#04342C',
          900: '#02201B',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:    ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'steam-rise': {
          '0%':   { opacity: '0', transform: 'translateY(0) scale(0.6)' },
          '40%':  { opacity: '0.8' },
          '100%': { opacity: '0', transform: 'translateY(-60px) scale(1.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
      },
      animation: {
        'steam-1':  'steam-rise 3s ease-in-out infinite',
        'steam-2':  'steam-rise 3s ease-in-out infinite 1s',
        'steam-3':  'steam-rise 3s ease-in-out infinite 2s',
        float:      'float 5s ease-in-out infinite',
        'fade-up':  'fade-up 0.6s ease-out forwards',
        'scale-in': 'scale-in 0.4s ease-out forwards',
        pulse:      'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
