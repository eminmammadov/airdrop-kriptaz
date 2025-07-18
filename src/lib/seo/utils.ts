import { Metadata } from 'next';
import { SEOConfig, PageSEOProps, BreadcrumbItem, FAQItem } from '@/shared/types/seo';
import { siteConfig, defaultSEO } from '@/config/site';

/**
 * Generate Next.js Metadata from SEO configuration
 */
export function generateMetadata(config: Partial<SEOConfig> = {}): Metadata {
  const mergedConfig = {
    ...defaultSEO,
    ...config,
    openGraph: {
      ...defaultSEO.openGraph,
      ...config.openGraph,
    },
    twitter: {
      ...defaultSEO.twitter,
      ...config.twitter,
    },
  };

  const metadata: Metadata = {
    title: mergedConfig.title,
    description: mergedConfig.description,
    keywords: mergedConfig.keywords,
    authors: [{ name: siteConfig.creator.name }],
    creator: siteConfig.creator.name,
    publisher: siteConfig.name,
    robots: {
      index: mergedConfig.robots?.index ?? true,
      follow: mergedConfig.robots?.follow ?? true,
      noarchive: mergedConfig.robots?.noarchive ?? false,
      nosnippet: mergedConfig.robots?.nosnippet ?? false,
      noimageindex: mergedConfig.robots?.noimageindex ?? false,
      nocache: mergedConfig.robots?.nocache ?? false,
    },
    openGraph: {
      type: (mergedConfig.openGraph?.type || 'website') as 'website' | 'article' | 'profile' | 'book',
      siteName: mergedConfig.openGraph?.siteName || siteConfig.name,
      title: mergedConfig.openGraph?.title || mergedConfig.title,
      description: mergedConfig.openGraph?.description || mergedConfig.description,
      url: mergedConfig.openGraph?.url || mergedConfig.canonical,
      images: mergedConfig.openGraph?.images || [],
      locale: mergedConfig.openGraph?.locale || 'en_US',
      alternateLocale: mergedConfig.openGraph?.alternateLocale || [],
    },
    twitter: {
      card: mergedConfig.twitter?.card || 'summary_large_image',
      site: mergedConfig.twitter?.site,
      creator: mergedConfig.twitter?.creator,
      title: mergedConfig.twitter?.title || mergedConfig.title,
      description: mergedConfig.twitter?.description || mergedConfig.description,
      images: mergedConfig.twitter?.images || [],
    },
    alternates: {
      canonical: mergedConfig.canonical,
      ...mergedConfig.alternates,
    },
  };

  return metadata;
}

/**
 * Generate page-specific metadata
 */
export function generatePageMetadata(
  pageProps: PageSEOProps,
  basePath: string = ''
): Metadata {
  const fullUrl = `${siteConfig.url}${basePath}`;
  
  const seoConfig: Partial<SEOConfig> = {
    title: pageProps.title,
    description: pageProps.description,
    keywords: pageProps.keywords,
    canonical: pageProps.canonical || fullUrl,
    robots: {
      index: !pageProps.noindex,
      follow: !pageProps.nofollow,
    },
    openGraph: {
      title: pageProps.title,
      description: pageProps.description,
      type: pageProps.ogType || 'website',
      url: fullUrl,
      images: pageProps.ogImage ? [
        {
          url: pageProps.ogImage,
          width: 1200,
          height: 630,
          alt: pageProps.title || siteConfig.name,
        }
      ] : [
        {
          url: `${siteConfig.url}${siteConfig.ogImage}`,
          width: 1200,
          height: 630,
          alt: pageProps.title || siteConfig.name,
        }
      ],
    },
    twitter: {
      card: pageProps.twitterCard || 'summary_large_image',
      title: pageProps.title,
      description: pageProps.description,
      images: pageProps.ogImage ? [
        {
          url: pageProps.ogImage,
          alt: pageProps.title || siteConfig.name,
        }
      ] : [
        {
          url: `${siteConfig.url}${siteConfig.ogImage}`,
          alt: pageProps.title || siteConfig.name,
        }
      ],
    },
  };

  return generateMetadata(seoConfig);
}

/**
 * Generate structured data JSON-LD
 */
export function generateStructuredData(data: object): string {
  return JSON.stringify(data, null, 0);
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQStructuredData(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate article structured data
 */
export function generateArticleStructuredData({
  title,
  description,
  author,
  datePublished,
  dateModified,
  url,
  image,
}: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.png`,
      },
    },
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    image: image ? {
      '@type': 'ImageObject',
      url: image,
    } : undefined,
  };
}

/**
 * Validate and sanitize meta description
 */
export function sanitizeMetaDescription(description: string, maxLength: number = 160): string {
  if (!description) return '';
  
  // Remove HTML tags
  const cleanDescription = description.replace(/<[^>]*>/g, '');
  
  // Trim and limit length
  if (cleanDescription.length <= maxLength) {
    return cleanDescription.trim();
  }
  
  // Truncate at word boundary
  const truncated = cleanDescription.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 
    ? truncated.substring(0, lastSpace).trim() + '...'
    : truncated.trim() + '...';
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${cleanPath}`;
}

/**
 * Generate social sharing URLs
 */
export function generateSocialSharingUrls(url: string, title: string, description?: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=${siteConfig.creator.twitter?.replace('@', '') || ''}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };
}

/**
 * Extract keywords from content
 */
export function extractKeywords(content: string, maxKeywords: number = 10): string[] {
  if (!content) return [];

  // Remove HTML tags and special characters
  const cleanContent = content
    .replace(/<[^>]*>/g, ' ')
    .replace(/[^\w\s]/g, ' ')
    .toLowerCase();

  // Split into words and filter
  const words = cleanContent
    .split(/\s+/)
    .filter(word => word.length > 3)
    .filter(word => !commonStopWords.includes(word));

  // Count word frequency
  const wordCount = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Sort by frequency and return top keywords
  return Object.entries(wordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxKeywords)
    .map(([word]) => word);
}

/**
 * Common stop words to filter out
 */
const commonStopWords = [
  'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
  'by', 'from', 'up', 'about', 'into', 'through', 'during', 'before',
  'after', 'above', 'below', 'between', 'among', 'this', 'that', 'these',
  'those', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have',
  'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
  'may', 'might', 'must', 'can', 'shall', 'a', 'an', 'as', 'if', 'when',
  'where', 'why', 'how', 'what', 'which', 'who', 'whom', 'whose', 'all',
  'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
  'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very',
];

/**
 * Validate SEO configuration
 */
export function validateSEOConfig(config: Partial<SEOConfig>): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Title validation
  if (!config.title) {
    errors.push('Title is required');
  } else if (config.title.length > 60) {
    warnings.push('Title is longer than 60 characters');
  } else if (config.title.length < 30) {
    warnings.push('Title is shorter than 30 characters');
  }

  // Description validation
  if (!config.description) {
    errors.push('Description is required');
  } else if (config.description.length > 160) {
    warnings.push('Description is longer than 160 characters');
  } else if (config.description.length < 120) {
    warnings.push('Description is shorter than 120 characters');
  }

  // Keywords validation
  if (config.keywords && config.keywords.length > 10) {
    warnings.push('Too many keywords (recommended: 5-10)');
  }

  // Open Graph validation
  if (config.openGraph?.images && config.openGraph.images.length > 0) {
    config.openGraph.images.forEach((image, index) => {
      if (!image.alt) {
        warnings.push(`Open Graph image ${index + 1} missing alt text`);
      }
      if (image.width && image.height) {
        if (image.width < 1200 || image.height < 630) {
          warnings.push(`Open Graph image ${index + 1} smaller than recommended size (1200x630)`);
        }
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
