import type { Config } from 'tailwindcss';
import { kriptazFont } from './src/lib/fonts';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Kriptaz Brand Colors
        forest: {
          black: '#181C0D',
        },
        stone: {
          gray: '#D4D0C9',
        },
        desert: {
          sand: '#CFB97D',
        },
        brand: {
          green: '#36D136',
          'middle-green': '#039503',
          'dark-green': '#004022',
        },
        ui: {
          gray: '#F4F4F4',
          line: '#1a1a1a',
          border: '#2a2627',
          bg: '#1d1c1d',
        },
        accent: {
          cyan: '#00CBF7',
          red: '#FE3D02',
          orange: '#FEAA01',
          magenta: '#FF5A86',
          yellow: '#FFE600',
          'yellow-green': '#C0F003',
        },
      },
      fontFamily: {
        // Custom Kriptaz font family
        kriptaz: [kriptazFont.name, ...kriptazFont.fallback],
        // Keep system fonts as alternatives
        sans: ['system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'monospace'],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        demibold: '600',
        bold: '700',
      },
    },
  },
  plugins: [],
};

export default config;
