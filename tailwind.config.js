/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pearl: {
          DEFAULT: '#FAF0E4',
          light: '#FFF9F2',
          dark: '#F3E5D8',
          parchment: '#FAF0E4',
        },
        silk: {
          DEFAULT: '#FFFFFF',
          soft: '#FDFBF7',
          warm: '#F8F1E7',
        },
        burgundy: {
          DEFAULT: '#4A0E17',
          dark: '#2C050B',
          primary: '#4A0E17',
          secondary: '#7A1F2D',
          hover: '#61121E',
          light: '#8B2939',
          velvet: '#3B0A11',
          rose: '#9E2A3B',
        },
        gold: {
          DEFAULT: '#D4AF37',
          primary: '#D4AF37',
          border: '#E5C158',
          muted: '#C5A059',
          light: '#F5E08E',
          shimmer: '#FFF3B0',
          dark: '#AA7C11',
          zari: '#D4AF37',
        },
        charcoal: {
          DEFAULT: '#1F1617',
          dark: '#120C0D',
        },
        slateBurgundy: {
          DEFAULT: '#5C4A48',
          light: '#7A6462',
        }
      },
      fontFamily: {
        arabic: ['Amiri', 'Scheherazade New', 'serif'],
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.4)',
        'gold-inner': 'inset 0 0 15px rgba(212, 175, 55, 0.15)',
        'burgundy-glow': '0 10px 30px -10px rgba(74, 14, 23, 0.45)',
        'card-royal': '0 15px 35px -5px rgba(74, 14, 23, 0.12), 0 0 15px rgba(212, 175, 55, 0.15)',
        'parchment-deep': '0 20px 45px -10px rgba(74, 14, 23, 0.15), 0 0 0 1px rgba(212, 175, 55, 0.35)',
      },
      backgroundImage: {
        'royal-parchment': 'radial-gradient(ellipse at top, #FFF9F2 0%, #FAF0E4 50%, #F3E5D8 100%)',
        'gold-gradient': 'linear-gradient(135deg, #AA7C11 0%, #D4AF37 35%, #FFF3B0 50%, #D4AF37 65%, #996C08 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #D4AF37 0%, #FFF3B0 50%, #D4AF37 100%)',
        'burgundy-gradient': 'linear-gradient(135deg, #3B0A11 0%, #4A0E17 50%, #7A1F2D 100%)',
        'haldi-gradient': 'linear-gradient(135deg, #FFFDF8 0%, #FEF8EC 100%)',
        'barat-gradient': 'linear-gradient(135deg, #FAF4EB 0%, #F5EAE0 100%)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        swingLatkan: {
          '0%, 100%': { transform: 'rotate(2.5deg)' },
          '50%': { transform: 'rotate(-2.5deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.88', transform: 'scale(1.03)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 4s ease-in-out infinite',
        swingLatkan: 'swingLatkan 4s ease-in-out infinite',
        pulseSubtle: 'pulseSubtle 2.8s ease-in-out infinite',
        floatSlow: 'floatSlow 4.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
