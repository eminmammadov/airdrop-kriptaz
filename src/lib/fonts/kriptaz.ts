import { FontFamily, FontVariant, FONT_WEIGHTS } from './types';

/**
 * Kriptaz font variants configuration
 */
const kriptazVariants: FontVariant[] = [
  {
    weight: FONT_WEIGHTS.thin,
    style: 'normal',
    files: {
      woff: '/fonts/kriptaz/Kriptaz-Thin-100.woff',
      woff2: '/fonts/kriptaz/Kriptaz-Thin-100.woff2',
    },
  },
  {
    weight: FONT_WEIGHTS.thin,
    style: 'italic',
    files: {
      woff: '/fonts/kriptaz/Kriptaz-Thin-It-100.woff',
      woff2: '/fonts/kriptaz/Kriptaz-Thin-It-100.woff2',
    },
  },
  {
    weight: FONT_WEIGHTS.extralight,
    style: 'normal',
    files: {
      woff: '/fonts/kriptaz/Kriptaz-ExtraLight-200.woff',
      woff2: '/fonts/kriptaz/Kriptaz-ExtraLight-200.woff2',
    },
  },
  {
    weight: FONT_WEIGHTS.extralight,
    style: 'italic',
    files: {
      woff: '/fonts/kriptaz/Kriptaz-ExtraLight-It-200.woff',
      woff2: '/fonts/kriptaz/Kriptaz-ExtraLight-It-200.woff2',
    },
  },
  {
    weight: FONT_WEIGHTS.light,
    style: 'normal',
    files: {
      woff: '/fonts/kriptaz/Kriptaz-Light-300.woff',
      woff2: '/fonts/kriptaz/Kriptaz-Light-300.woff2',
    },
  },
  {
    weight: FONT_WEIGHTS.light,
    style: 'italic',
    files: {
      woff: '/fonts/kriptaz/Kriptaz-Light-It-300.woff',
      woff2: '/fonts/kriptaz/Kriptaz-Light-It-300.woff2',
    },
  },
  {
    weight: FONT_WEIGHTS.regular,
    style: 'normal',
    files: {
      woff: '/fonts/kriptaz/Kriptaz-Regular-400.woff',
      woff2: '/fonts/kriptaz/Kriptaz-Regular-400.woff2',
    },
  },
  {
    weight: FONT_WEIGHTS.medium,
    style: 'normal',
    files: {
      woff: '/fonts/kriptaz/Kriptaz-Medium-500.woff',
      woff2: '/fonts/kriptaz/Kriptaz-Medium-500.woff2',
    },
  },
  {
    weight: FONT_WEIGHTS.medium,
    style: 'italic',
    files: {
      woff: '/fonts/kriptaz/Kriptaz-Medium-It-500.woff',
      woff2: '/fonts/kriptaz/Kriptaz-Medium-It-500.woff2',
    },
  },
  {
    weight: FONT_WEIGHTS.demibold,
    style: 'normal',
    files: {
      woff: '/fonts/kriptaz/Kriptaz-DemiBold-600.woff',
      woff2: '/fonts/kriptaz/Kriptaz-DemiBold-600.woff2',
    },
  },
  {
    weight: FONT_WEIGHTS.demibold,
    style: 'italic',
    files: {
      woff: '/fonts/kriptaz/Kriptaz-DemiBold-It-600.woff',
      woff2: '/fonts/kriptaz/Kriptaz-DemiBold-It-600.woff2',
    },
  },
  {
    weight: FONT_WEIGHTS.bold,
    style: 'normal',
    files: {
      woff: '/fonts/kriptaz/Kriptaz-Bold-700.woff',
      woff2: '/fonts/kriptaz/Kriptaz-Bold-700.woff2',
    },
  },
  {
    weight: FONT_WEIGHTS.bold,
    style: 'italic',
    files: {
      woff: '/fonts/kriptaz/Kriptaz-Bold-It-700.woff',
      woff2: '/fonts/kriptaz/Kriptaz-Bold-It-700.woff2',
    },
  },
];

/**
 * Kriptaz font family configuration
 */
export const kriptazFont: FontFamily = {
  name: 'Kriptaz',
  displayName: 'Kriptaz',
  fallback: ['system-ui', 'sans-serif'],
  variants: kriptazVariants,
};

/**
 * Get font variants by weight
 */
export function getKriptazVariantsByWeight(weight: number) {
  return kriptazVariants.filter(variant => variant.weight === weight);
}

/**
 * Get font variant by weight and style
 */
export function getKriptazVariant(weight: number, style: 'normal' | 'italic' = 'normal') {
  return kriptazVariants.find(variant => 
    variant.weight === weight && variant.style === style
  );
}
