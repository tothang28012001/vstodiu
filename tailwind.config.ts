import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Neutral graphite shell. The colour in this site comes from
        // screenshots, models and one per-game accent — never from chrome.
        ink: {
          950: '#08090B',
          900: '#0B0D10',
          850: '#101317',
          800: '#15181D',
          750: '#1C2027',
        },
        line: {
          DEFAULT: 'rgba(255,255,255,0.075)',
          strong: 'rgba(255,255,255,0.14)',
        },
        fg: {
          hi: '#E9EBEE',
          DEFAULT: '#C2C7CE',
          lo: '#8A9199',
          dim: '#5D646D',
        },
        // Pipeline status colours. Muted on purpose — a status chip is
        // information, not decoration.
        status: {
          released: '#48B98A',
          production: '#D9A05B',
          design: '#6E9AD4',
          concept: '#7C838D',
          shelved: '#6B5F72',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        label: ['10px', { lineHeight: '1', letterSpacing: '0.16em' }],
        micro: ['11px', { lineHeight: '1.4', letterSpacing: '0.04em' }],
      },
      letterSpacing: {
        display: '-0.03em',
        label: '0.16em',
      },
      borderRadius: {
        none: '0',
        xs: '2px',
        sm: '3px',
        DEFAULT: '5px',
        md: '6px',
        lg: '8px',
      },
      maxWidth: {
        shell: '1320px',
        prose: '68ch',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
