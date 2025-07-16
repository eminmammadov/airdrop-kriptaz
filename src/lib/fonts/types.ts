/**
 * Font weight definitions for Kriptaz font family
 */
export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700;

/**
 * Font style definitions
 */
export type FontStyle = 'normal' | 'italic';

/**
 * Font format definitions
 */
export type FontFormat = 'woff' | 'woff2';

/**
 * Font variant configuration
 */
export interface FontVariant {
  weight: FontWeight;
  style: FontStyle;
  files: {
    woff: string;
    woff2: string;
  };
}

/**
 * Font family configuration
 */
export interface FontFamily {
  name: string;
  displayName: string;
  fallback: string[];
  variants: FontVariant[];
}

/**
 * Font loading options
 */
export interface FontLoadingOptions {
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
  preload?: boolean;
  subset?: string;
}

/**
 * Font utility class configuration
 */
export interface FontUtilityConfig {
  family: FontFamily;
  options: FontLoadingOptions;
}

/**
 * Predefined font weight names for better developer experience
 */
export const FONT_WEIGHTS = {
  thin: 100,
  extralight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  demibold: 600,
  bold: 700,
} as const;

/**
 * CSS custom property names for fonts
 */
export const FONT_CSS_VARS = {
  kriptaz: '--font-kriptaz',
} as const;
