/**
 * Kriptaz Brand Colors
 * Centralized color palette for the entire application
 */

export const COLORS = {
  // Forest tones
  forest: {
    black: '#181C0D',
  },
  
  // Stone tones
  stone: {
    gray: '#D4D0C9',
  },
  
  // Desert tones
  desert: {
    sand: '#CFB97D',
  },
  
  // Brand colors
  brand: {
    green: '#36D136',
    middleGreen: '#039503',
    darkGreen: '#004022',
  },
  
  // UI colors
  ui: {
    gray: '#F4F4F4',
    line: '#1a1a1a',
    border: '#2a2627',
    bg: '#1d1c1d',
  },
  
  // Accent colors
  accent: {
    cyan: '#00CBF7',
    red: '#FE3D02',
    orange: '#FEAA01',
    magenta: '#FF5A86',
    yellow: '#FFE600',
    yellowGreen: '#C0F003',
  },
} as const;

// Color utility functions
export const getColorValue = (colorPath: string): string => {
  const keys = colorPath.split('.');
  let value: any = COLORS;
  
  for (const key of keys) {
    value = value[key];
    if (!value) return '#000000'; // fallback
  }
  
  return value;
};

// Gradient combinations
export const GRADIENTS = {
  primary: `linear-gradient(90deg, ${COLORS.accent.yellow}, ${COLORS.accent.yellowGreen})`,
  success: `linear-gradient(90deg, ${COLORS.brand.green}, ${COLORS.brand.middleGreen})`,
  warning: `linear-gradient(90deg, ${COLORS.accent.orange}, ${COLORS.accent.yellow})`,
  error: `linear-gradient(90deg, ${COLORS.accent.red}, ${COLORS.accent.magenta})`,
  info: `linear-gradient(90deg, ${COLORS.accent.cyan}, ${COLORS.brand.green})`,
} as const;

// Theme variants
export const THEME_VARIANTS = {
  light: {
    background: COLORS.ui.gray,
    text: COLORS.forest.black,
    border: COLORS.ui.border,
  },
  dark: {
    background: COLORS.forest.black,
    text: COLORS.stone.gray,
    border: COLORS.ui.border,
  },
} as const;

// Component color schemes
export const COMPONENT_COLORS = {
  button: {
    primary: {
      bg: COLORS.accent.yellow,
      text: COLORS.forest.black,
      hover: COLORS.accent.yellowGreen,
    },
    secondary: {
      bg: COLORS.ui.bg,
      text: COLORS.stone.gray,
      hover: COLORS.ui.border,
    },
    success: {
      bg: COLORS.brand.green,
      text: COLORS.forest.black,
      hover: COLORS.brand.middleGreen,
    },
  },
  input: {
    bg: COLORS.ui.bg,
    border: COLORS.ui.border,
    text: COLORS.stone.gray,
    focus: COLORS.accent.cyan,
  },
  card: {
    bg: COLORS.ui.bg,
    border: COLORS.ui.border,
    shadow: `${COLORS.forest.black}20`,
  },
} as const;
