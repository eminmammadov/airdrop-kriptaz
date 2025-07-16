import { FontFamily, FontVariant, FontLoadingOptions } from './types';

/**
 * Generate CSS @font-face declarations for a font family
 */
export function generateFontFaceCSS(
  family: FontFamily,
  options: FontLoadingOptions = {}
): string {
  const { display = 'swap' } = options;
  
  return family.variants
    .map(variant => generateSingleFontFaceCSS(family.name, variant, display))
    .join('\n\n');
}

/**
 * Generate CSS @font-face declaration for a single font variant
 */
function generateSingleFontFaceCSS(
  familyName: string,
  variant: FontVariant,
  display: string
): string {
  const fontStyle = variant.style === 'italic' ? 'italic' : 'normal';
  
  return `@font-face {
  font-family: '${familyName}';
  font-style: ${fontStyle};
  font-weight: ${variant.weight};
  font-display: ${display};
  src: url('${variant.files.woff2}') format('woff2'),
       url('${variant.files.woff}') format('woff');
}`;
}

/**
 * Generate CSS custom property for font family
 */
export function generateFontFamilyVariable(
  family: FontFamily,
  variableName: string
): string {
  const fallbackFonts = family.fallback.join(', ');
  return `${variableName}: '${family.name}', ${fallbackFonts};`;
}

/**
 * Generate preload links for critical font variants
 */
export function generateFontPreloadLinks(
  family: FontFamily,
  criticalWeights: number[] = [400, 700]
): string[] {
  const preloadLinks: string[] = [];
  
  family.variants.forEach(variant => {
    if (criticalWeights.includes(variant.weight) && variant.style === 'normal') {
      preloadLinks.push(
        `<link rel="preload" href="${variant.files.woff2}" as="font" type="font/woff2" crossorigin>`
      );
    }
  });
  
  return preloadLinks;
}

/**
 * Get font family CSS value with fallbacks
 */
export function getFontFamilyCSS(family: FontFamily): string {
  const fallbackFonts = family.fallback.join(', ');
  return `'${family.name}', ${fallbackFonts}`;
}

/**
 * Validate font variant exists
 */
export function validateFontVariant(
  family: FontFamily,
  weight: number,
  style: 'normal' | 'italic' = 'normal'
): boolean {
  return family.variants.some(
    variant => variant.weight === weight && variant.style === style
  );
}

/**
 * Get available font weights for a family
 */
export function getAvailableFontWeights(family: FontFamily): number[] {
  return [...new Set(family.variants.map(variant => variant.weight))].sort();
}

/**
 * Get available font styles for a specific weight
 */
export function getAvailableFontStyles(
  family: FontFamily,
  weight: number
): ('normal' | 'italic')[] {
  return family.variants
    .filter(variant => variant.weight === weight)
    .map(variant => variant.style);
}

/**
 * Generate Tailwind CSS font family configuration
 */
export function generateTailwindFontConfig(families: FontFamily[]): Record<string, string[]> {
  const config: Record<string, string[]> = {};
  
  families.forEach(family => {
    const key = family.name.toLowerCase().replace(/\s+/g, '-');
    config[key] = [family.name, ...family.fallback];
  });
  
  return config;
}
