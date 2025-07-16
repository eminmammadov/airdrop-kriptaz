/**
 * Open Graph Image Generation Utilities
 * Dynamic OG image generation for social media sharing
 */

export interface OGImageConfig {
  title: string;
  description?: string;
  logo?: string;
  background?: string;
  theme?: 'light' | 'dark';
  width?: number;
  height?: number;
}

/**
 * Generate Open Graph image URL
 */
export function generateOGImageUrl(config: OGImageConfig, baseUrl?: string): string {
  const {
    title,
    description,
    logo,
    background,
    theme = 'light',
    width = 1200,
    height = 630,
  } = config;

  const params = new URLSearchParams({
    title: title.slice(0, 100), // Limit title length
    ...(description && { description: description.slice(0, 200) }),
    ...(logo && { logo }),
    ...(background && { background }),
    theme,
    width: width.toString(),
    height: height.toString(),
  });

  const ogImagePath = `/api/og?${params.toString()}`;

  // For localhost development, return relative path
  if (baseUrl && baseUrl.includes('localhost')) {
    return ogImagePath;
  }

  // For production, return full URL
  return baseUrl ? `${baseUrl}${ogImagePath}` : ogImagePath;
}

/**
 * Generate platform-specific OG images
 */
export function generatePlatformOGImages(config: OGImageConfig) {
  return {
    // Facebook recommended: 1200x630
    facebook: generateOGImageUrl({
      ...config,
      width: 1200,
      height: 630,
    }),
    
    // Twitter large image: 1200x675
    twitter: generateOGImageUrl({
      ...config,
      width: 1200,
      height: 675,
    }),
    
    // LinkedIn: 1200x627
    linkedin: generateOGImageUrl({
      ...config,
      width: 1200,
      height: 627,
    }),
    
    // Instagram: 1080x1080 (square)
    instagram: generateOGImageUrl({
      ...config,
      width: 1080,
      height: 1080,
    }),
    
    // WhatsApp: 400x400
    whatsapp: generateOGImageUrl({
      ...config,
      width: 400,
      height: 400,
    }),
  };
}

/**
 * Validate OG image dimensions
 */
export function validateOGImageDimensions(width: number, height: number): {
  isValid: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];
  let isValid = true;

  // Minimum dimensions
  if (width < 200 || height < 200) {
    warnings.push('Image dimensions too small (minimum 200x200)');
    isValid = false;
  }

  // Maximum dimensions
  if (width > 2000 || height > 2000) {
    warnings.push('Image dimensions too large (maximum 2000x2000)');
  }

  // Aspect ratio recommendations
  const aspectRatio = width / height;
  
  if (aspectRatio < 1.5 || aspectRatio > 2.0) {
    warnings.push('Aspect ratio should be between 1.5:1 and 2:1 for optimal display');
  }

  // Platform-specific recommendations
  if (width === 1200 && height === 630) {
    // Perfect for Facebook/Twitter
  } else if (width === 1080 && height === 1080) {
    // Perfect for Instagram
  } else {
    warnings.push('Consider using standard dimensions (1200x630 for most platforms)');
  }

  return { isValid, warnings };
}

/**
 * Generate OG image alt text
 */
export function generateOGImageAlt(title: string, description?: string): string {
  const baseAlt = `${title} - Social media preview image`;
  
  if (description) {
    return `${baseAlt}. ${description.slice(0, 100)}`;
  }
  
  return baseAlt;
}

/**
 * OG Image templates for different content types
 */
export const ogImageTemplates = {
  article: (title: string, author?: string) => ({
    title,
    description: author ? `By ${author}` : undefined,
    theme: 'light' as const,
    logo: '/images/logo.png',
  }),
  
  product: (title: string, price?: string) => ({
    title,
    description: price ? `Starting at ${price}` : undefined,
    theme: 'light' as const,
    background: '/images/product-bg.png',
  }),
  
  event: (title: string, date?: string) => ({
    title,
    description: date ? `Event Date: ${date}` : undefined,
    theme: 'dark' as const,
    background: '/images/event-bg.png',
  }),
  
  default: (title: string, description?: string) => ({
    title,
    description,
    theme: 'light' as const,
    logo: '/images/logo.png',
  }),
};

/**
 * Generate responsive OG image set
 */
export function generateResponsiveOGImages(config: OGImageConfig) {
  const baseConfig = {
    ...config,
    theme: config.theme || 'light',
  };

  return {
    // Standard sizes
    standard: generateOGImageUrl({ ...baseConfig, width: 1200, height: 630 }),
    large: generateOGImageUrl({ ...baseConfig, width: 1600, height: 840 }),
    medium: generateOGImageUrl({ ...baseConfig, width: 800, height: 420 }),
    small: generateOGImageUrl({ ...baseConfig, width: 400, height: 210 }),
    
    // Platform optimized
    ...generatePlatformOGImages(baseConfig),
  };
}

/**
 * Extract dominant colors from image for theme generation
 */
export function generateThemeFromImage(): Promise<{
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}> {
  // This would typically use a color extraction library
  // For now, return default theme colors
  return Promise.resolve({
    primary: '#3b82f6',
    secondary: '#1e40af',
    accent: '#f59e0b',
    background: '#ffffff',
    text: '#1f2937',
  });
}

/**
 * Generate OG image metadata
 */
export function generateOGImageMetadata(config: OGImageConfig) {
  const imageUrl = generateOGImageUrl(config);
  const alt = generateOGImageAlt(config.title, config.description);
  
  return {
    url: imageUrl,
    width: config.width || 1200,
    height: config.height || 630,
    alt,
    type: 'image/png',
    secureUrl: imageUrl.startsWith('https://') ? imageUrl : undefined,
  };
}

/**
 * Optimize OG image for different platforms
 */
export function optimizeOGImageForPlatform(
  config: OGImageConfig,
  platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'whatsapp'
) {
  const platformConfigs = {
    facebook: { width: 1200, height: 630, theme: 'light' as const },
    twitter: { width: 1200, height: 675, theme: 'light' as const },
    linkedin: { width: 1200, height: 627, theme: 'light' as const },
    instagram: { width: 1080, height: 1080, theme: 'light' as const },
    whatsapp: { width: 400, height: 400, theme: 'light' as const },
  };

  const platformConfig = platformConfigs[platform];
  
  return {
    ...config,
    ...platformConfig,
    title: config.title.slice(0, platform === 'twitter' ? 70 : 100),
    description: config.description?.slice(0, platform === 'twitter' ? 200 : 300),
  };
}
