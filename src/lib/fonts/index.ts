/**
 * Font Management System
 * 
 * This module provides a comprehensive font management system for the Kriptaz application.
 * It includes type definitions, utility functions, and configurations for custom fonts.
 */

// Export types
export type {
  FontWeight,
  FontStyle,
  FontFormat,
  FontVariant,
  FontFamily,
  FontLoadingOptions,
  FontUtilityConfig,
} from './types';

// Export constants
export { FONT_WEIGHTS, FONT_CSS_VARS } from './types';

// Export Kriptaz font configuration
export { 
  kriptazFont, 
  getKriptazVariantsByWeight, 
  getKriptazVariant 
} from './kriptaz';

// Export utility functions
export {
  generateFontFaceCSS,
  generateFontFamilyVariable,
  generateFontPreloadLinks,
  getFontFamilyCSS,
  validateFontVariant,
  getAvailableFontWeights,
  getAvailableFontStyles,
  generateTailwindFontConfig,
} from './utils';

// Export font registry for easy access
export const FONT_REGISTRY = {
  kriptaz: () => import('./kriptaz').then(m => m.kriptazFont),
} as const;

/**
 * Get all available font families
 */
export async function getAllFontFamilies() {
  const families = await Promise.all(
    Object.values(FONT_REGISTRY).map(loader => loader())
  );
  return families;
}

/**
 * Font loading hook for React components
 */
export function useFontLoader() {
  // This can be extended with actual font loading logic
  // For now, it's a placeholder for future implementation
  return {
    isLoaded: true,
    error: null,
  };
}
