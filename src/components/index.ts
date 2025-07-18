/**
 * Components Barrel Export
 * Central export point for all components with organized structure
 */

// Selective exports for better tree-shaking and performance
// Use specific imports when possible: import { ComponentName } from '@/components/category'

// Common Components (Reusable UI primitives)
export * from './common';

// Layout Components (Structural components)
export * from './layout';

// Feature Components (Business logic components)
export * from './features';

// Provider Components (Context providers & wrappers)
export * from './providers';

// Typography Components (Font & text components) - Core components only
export {
  AdaptiveTypography,
  Typography,
  HybridFontLoader,
  FontPreloader
} from './typography';

// Organized exports by category for better tree-shaking
export {
  // Common
  ConnectButton,
  Logo,
} from './common';

export {
  // Layout
  LayoutWrapper,
  Header,
  Footer,
  Navigation,
  FooterLinks,
  KamonadShare,
  KaPrice,
} from './layout';

export {
  // Features
  UserStats,
} from './features';

export {
  // Providers
  SEOHead,
  SEOProvider,
  SocialShare,
} from './providers';

// Typography components already exported above
