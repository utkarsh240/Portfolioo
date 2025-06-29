/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // GSAP-inspired color palette
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#8BC34A', // GSAP Lime Green
          600: '#9CCC65', // Lighter Green for Hover
          700: '#7CB342', // Darker Green
          800: '#689F38',
          900: '#558B2F',
        },
        // Alternative Electric Blue option
        electric: {
          50: '#e0f7ff',
          100: '#b3e5fc',
          200: '#80d8ff',
          300: '#4dd0e1',
          400: '#26c6da',
          500: '#00C2E0', // Electric Blue
          600: '#00acc1',
          700: '#0097a7',
          800: '#00838f',
          900: '#006064',
        },
        // Dark theme colors
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#2C2C2C', // Card/Section Background
          900: '#1A1A1A', // Deep Charcoal Background
        },
        // Text colors
        text: {
          primary: '#F0F0F0',    // Main Text (Off-White)
          secondary: '#A0A0A0',  // Subtle Text (Medium Grey)
        },
        // Accent colors
        accent: {
          glow: 'rgba(139, 195, 74, 0.3)', // Glow Effect
          error: '#FF6347', // Error/Warning Red
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'typewriter': 'typewriter 3s steps(40) 1s 1 normal both',
        'blink': 'blink 1s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { 
            boxShadow: '0 0 5px rgba(139, 195, 74, 0.3)',
            textShadow: '0 0 5px rgba(139, 195, 74, 0.3)'
          },
          '100%': { 
            boxShadow: '0 0 20px rgba(139, 195, 74, 0.6)',
            textShadow: '0 0 20px rgba(139, 195, 74, 0.6)'
          },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
        'sans': ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        'wide': '0.05em',
        'wider': '0.1em',
        'widest': '0.2em',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} 