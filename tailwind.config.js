/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./frontend/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        // 77 Cargo Brand Colors
        'cargo-red': {
          DEFAULT: '#C41E3A',
          50: '#F9E6EA',
          100: '#F2CCD4',
          200: '#E599A9',
          300: '#D8667E',
          400: '#CB3353',
          500: '#C41E3A',
          600: '#9D182E',
          700: '#761223',
          800: '#4F0C17',
          900: '#28060C',
        },
        'cargo-dark': {
          DEFAULT: '#1A1A1A',
          50: '#E6E6E6',
          100: '#CCCCCC',
          200: '#999999',
          300: '#666666',
          400: '#333333',
          500: '#1A1A1A',
          600: '#141414',
          700: '#0F0F0F',
          800: '#0A0A0A',
          900: '#050505',
        },
        'cargo-gray': {
          DEFAULT: '#4A4A4A',
          50: '#F5F5F5',
          100: '#E8E8E8',
          200: '#D1D1D1',
          300: '#B3B3B3',
          400: '#7A7A7A',
          500: '#4A4A4A',
          600: '#3D3D3D',
          700: '#2E2E2E',
          800: '#1F1F1F',
          900: '#141414',
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'body': ['Source Sans 3', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(135deg, rgba(26,26,26,0.95) 0%, rgba(74,74,74,0.85) 100%)",
        'card-gradient': "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)",
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}

