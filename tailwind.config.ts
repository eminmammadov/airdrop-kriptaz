import type { Config } from 'tailwindcss';
import { kriptazFont, generateTailwindFontConfig } from './src/lib/fonts';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
