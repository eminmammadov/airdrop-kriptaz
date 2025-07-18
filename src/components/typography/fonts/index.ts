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

// Note: LayoutWrapper moved to @/components/layout/LayoutWrapper

// Note: Font utilities, hooks, and fallback utilities are available directly from their modules:
// - Font utilities: @/lib/fonts
// - Font hooks: @/hooks/useFonts
// - Fallback utilities: @/lib/fonts/fallback
// This reduces bundle size and improves tree-shaking
