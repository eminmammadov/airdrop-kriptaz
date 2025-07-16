/**
 * Font Components Module
 * 
 * Centralized exports for all font-related components
 */

// Typography components
export {
  Typography,
  Heading,
  Text,
  Display,
  Code,
} from './Typography';

// Performance monitoring components
export {
  FontPerformanceMonitor,
  FontLoadingIndicator,
  FontOptimizationProvider,
  useFontOptimization,
} from './FontPerformanceMonitor';

// Fallback testing components
export {
  FontFallbackTester,
} from './FontFallbackTester';

// Adaptive typography components
export {
  AdaptiveTypography,
  AdaptiveHeading,
  AdaptiveText,
  AdaptiveDisplay,
  FontStatusIndicator,
} from './AdaptiveTypography';

// Hybrid font loading components
export {
  HybridFontLoader,
  FontPreloader,
  FontLoadingStrategy,
  FontErrorBoundary,
} from './HybridFontLoader';

// Layout wrapper component
export {
  LayoutWrapper,
} from './LayoutWrapper';

// Re-export font utilities for convenience
export {
  kriptazFont,
  FONT_WEIGHTS,
  FONT_CSS_VARS,
  generateFontFaceCSS,
  getFontFamilyCSS,
} from '@/lib/fonts';

// Re-export font hooks
export {
  useFontLoading,
  useFontMetrics,
  useFontWeights,
  useFontFallback,
  useGracefulFontDegradation,
} from '@/hooks/useFonts';

// Re-export fallback utilities
export {
  getFallbackManager,
  initializeFallbackSystem,
  GOOGLE_FONTS_FALLBACK,
} from '@/lib/fonts/fallback';
