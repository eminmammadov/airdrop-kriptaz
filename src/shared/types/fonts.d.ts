/**
 * Font-related TypeScript declarations for enhanced type safety
 */

declare module '*.woff' {
  const src: string;
  export default src;
}

declare module '*.woff2' {
  const src: string;
  export default src;
}

/**
 * Extended PerformanceResourceTiming interface for font metrics
 */
interface FontPerformanceResourceTiming extends PerformanceResourceTiming {
  transferSize: number;
  encodedBodySize: number;
  decodedBodySize: number;
}

/**
 * CSS Module declarations for font-related styles
 */
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

/**
 * Tailwind CSS font family keys
 */
export type TailwindFontFamily = 
  | 'kriptaz'
  | 'sans'
  | 'serif'
  | 'mono';

/**
 * Tailwind CSS font weight keys
 */
export type TailwindFontWeight = 
  | 'thin'
  | 'extralight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'demibold'
  | 'bold'
  | 'extrabold'
  | 'black';

/**
 * CSS font-display values
 */
export type FontDisplay = 
  | 'auto'
  | 'block'
  | 'swap'
  | 'fallback'
  | 'optional';

/**
 * Font loading states
 */
export type FontLoadingState = 
  | 'loading'
  | 'loaded'
  | 'error'
  | 'timeout';

/**
 * Font preload strategies
 */
export type FontPreloadStrategy = 
  | 'critical'
  | 'important'
  | 'normal'
  | 'lazy';

/**
 * Component props for font-related components
 */
export interface FontComponentProps {
  family?: TailwindFontFamily;
  weight?: TailwindFontWeight;
  className?: string;
  children: React.ReactNode;
}

/**
 * Font loading hook return type
 */
export interface FontLoadingHookReturn {
  isLoaded: boolean;
  isLoading: boolean;
  error: Error | null;
  loadingState: FontLoadingState;
}

/**
 * Font metrics for performance monitoring
 */
export interface FontMetrics {
  loadTime: number;
  renderTime: number;
  fileSize: number;
  format: 'woff' | 'woff2';
}

/**
 * Font configuration for Next.js
 */
export interface NextFontConfig {
  src: string | Array<{
    path: string;
    weight?: string;
    style?: string;
  }>;
  variable?: string;
  display?: FontDisplay;
  preload?: boolean;
  fallback?: string[];
  adjustFontFallback?: boolean;
}

/**
 * Global font configuration
 */
export interface GlobalFontConfig {
  primary: TailwindFontFamily;
  secondary?: TailwindFontFamily;
  mono?: TailwindFontFamily;
  preloadWeights: number[];
  fallbackFonts: string[];
}
