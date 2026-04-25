/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        abyss: '#09090b',
        mist: '#0f172a',
        ghost: '#67e8f9',
        blood: '#ef4444',
        arcane: '#8b5cf6',
        ecto: '#22c55e',
      },
      boxShadow: {
        glow: '0 0 28px rgba(103, 232, 249, 0.25)',
        blood: '0 0 28px rgba(239, 68, 68, 0.25)',
      },
      backgroundImage: {
        fog: 'radial-gradient(circle at 15% 20%, rgba(139,92,246,0.22), transparent 28%), radial-gradient(circle at 85% 0%, rgba(239,68,68,0.16), transparent 26%), radial-gradient(circle at 48% 85%, rgba(34,197,94,0.16), transparent 28%)',
      },
      keyframes: {
        floatFog: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        floatFog: 'floatFog 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
