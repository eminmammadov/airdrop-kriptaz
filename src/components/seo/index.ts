/**
 * SEO Components Module
 * 
 * Centralized exports for all SEO-related components and utilities
 */

// Main SEO components
export {
  SEOHead,
  default as SEOHeadDefault,
} from './SEOHead';

export {
  SEOProvider,
  useSEO,
  usePageSEO,
  SEODebugger,
  SEOAnalytics,
} from './SEOProvider';

export {
  SocialShare,
  SocialShareButton,
} from './SocialShare';

export {
  SEOTestPage,
} from './SEOTestPage';

// SEO utilities
export {
  generateMetadata,
  generatePageMetadata,
  generateStructuredData,
  generateBreadcrumbStructuredData,
  generateFAQStructuredData,
  generateArticleStructuredData,
  sanitizeMetaDescription,
  generateCanonicalUrl,
  generateSocialSharingUrls,
  extractKeywords,
  validateSEOConfig,
} from '@/lib/seo/utils';

// OG Image utilities
export {
  generateOGImageUrl,
  generatePlatformOGImages,
  validateOGImageDimensions,
  generateOGImageAlt,
  ogImageTemplates,
  generateResponsiveOGImages,
  generateThemeFromImage,
  generateOGImageMetadata,
  optimizeOGImageForPlatform,
} from '@/lib/seo/og-image';

// Configuration
export {
  siteConfig,
  defaultSEO,
  organizationStructuredData,
  websiteStructuredData,
  pageSEOConfigs,
  socialSharingTemplates,
  coreWebVitalsThresholds,
} from '@/config/site';

// Types
export type {
  SEOConfig,
  RobotsConfig,
  OpenGraphConfig,
  OpenGraphImage,
  OpenGraphVideo,
  OpenGraphAudio,
  TwitterConfig,
  TwitterImage,
  TwitterApp,
  TwitterPlayer,
  StructuredDataConfig,
  ContactPoint,
  PostalAddress,
  Person,
  AlternatesConfig,
  PageSEOProps,
  SiteConfig,
  BreadcrumbItem,
  FAQItem,
  ArticleStructuredData,
  OrganizationStructuredData,
  WebsiteStructuredData,
} from '@/types/seo';
