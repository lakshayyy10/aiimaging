/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        // Ink — the brand anchor. Cooled toward navy so cobalt sits in the
        // same temperature family rather than fighting a warm neutral.
        ink: {
          DEFAULT: '#0B1220',
          900: '#0B1220',
          800: '#111A2B',
          700: '#1A2438',
          600: '#26324A',
        },
        // Cool paper neutrals. Still the dominant surface.
        paper: {
          DEFAULT: '#FAFBFC',
          50: '#FAFBFC',
          100: '#F1F4F9',
          200: '#E4EAF2',
        },
        // Tinted surface — the one blue-washed section background.
        tint: {
          DEFAULT: '#F2F6FD',
          50: '#F7FAFE',
          100: '#F2F6FD',
        },
        line: {
          DEFAULT: '#E2E7EF',
          strong: '#C7D0DE',
          accent: '#C3D8FB',
        },
        graphite: {
          DEFAULT: '#39445A',
          600: '#566274',
          500: '#66718A', // 4.72:1 on paper — clears the AA floor for labels
        },
        // Single accent family: cobalt.
        //   700 deep   — small text on light, hover fills
        //   DEFAULT    — primary CTAs, links, active states
        //   500 bright — fills and graphics only (3.55:1, fails for small text)
        //   300        — the on-ink tier
        //   100/50     — tints and washes
        accent: {
          DEFAULT: '#2563EB',
          700: '#1D4ED8',
          600: '#2563EB',
          500: '#3B82F6',
          300: '#7FB0FF',
          100: '#DBEAFE',
          50: '#EFF4FE',
        },
        // Semantic — reserved for confidence scoring only.
        signal: {
          high: '#1F7A4D',
          med: '#A1701A',
          low: '#A33A2B',
        },
      },
      maxWidth: {
        container: '84rem', // 1344px
        prose: '38rem',
        lead: '46rem',
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        full: '9999px',
      },
      boxShadow: {
        // Two elevations only. Both restrained.
        raise: '0 1px 2px rgba(12,18,19,0.04), 0 8px 24px -12px rgba(12,18,19,0.12)',
        lift: '0 2px 4px rgba(12,18,19,0.05), 0 18px 40px -20px rgba(12,18,19,0.22)',
      },
      transitionTimingFunction: {
        entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'reveal-up': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'panel-in': {
          from: { opacity: '0', transform: 'translateY(-6px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        'reveal-up': 'reveal-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.4s ease-out both',
        'panel-in': 'panel-in 0.18s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};
