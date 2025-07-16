/**
 * SEO and Social Media Types
 * Enterprise-grade type definitions for SEO optimization
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  robots?: RobotsConfig;
  openGraph?: OpenGraphConfig;
  twitter?: TwitterConfig;
  structuredData?: StructuredDataConfig;
  alternates?: AlternatesConfig;
}

export interface RobotsConfig {
  index?: boolean;
  follow?: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
  noimageindex?: boolean;
  nocache?: boolean;
}

export interface OpenGraphConfig {
  title?: string;
  description?: string;
  type?: 'website' | 'article' | 'profile' | 'book' | 'music' | 'video';
  url?: string;
  siteName?: string;
  images?: OpenGraphImage[];
  locale?: string;
  alternateLocale?: string[];
  videos?: OpenGraphVideo[];
  audio?: OpenGraphAudio[];
}

export interface OpenGraphImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
  secureUrl?: string;
}

export interface OpenGraphVideo {
  url: string;
  width?: number;
  height?: number;
  type?: string;
  secureUrl?: string;
}

export interface OpenGraphAudio {
  url: string;
  type?: string;
  secureUrl?: string;
}

export interface TwitterConfig {
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;
  creator?: string;
  title?: string;
  description?: string;
  images?: TwitterImage[];
  app?: TwitterApp;
  player?: TwitterPlayer;
}

export interface TwitterImage {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface TwitterApp {
  id: {
    iphone?: string;
    ipad?: string;
    googleplay?: string;
  };
  url?: {
    iphone?: string;
    ipad?: string;
    googleplay?: string;
  };
  name?: {
    iphone?: string;
    ipad?: string;
    googleplay?: string;
  };
}

export interface TwitterPlayer {
  url: string;
  width?: number;
  height?: number;
  stream?: string;
}

export interface StructuredDataConfig {
  '@context'?: string;
  '@type': string;
  name?: string;
  description?: string;
  url?: string;
  logo?: string;
  image?: string | string[];
  sameAs?: string[];
  contactPoint?: ContactPoint[];
  address?: PostalAddress;
  founder?: Person[];
  employee?: Person[];
  [key: string]: unknown;
}

export interface ContactPoint {
  '@type': 'ContactPoint';
  telephone?: string;
  contactType?: string;
  email?: string;
  url?: string;
  availableLanguage?: string[];
}

export interface PostalAddress {
  '@type': 'PostalAddress';
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
}

export interface Person {
  '@type': 'Person';
  name: string;
  jobTitle?: string;
  email?: string;
  url?: string;
  image?: string;
  sameAs?: string[];
}

export interface AlternatesConfig {
  canonical?: string;
  languages?: Record<string, string>;
  media?: Record<string, string>;
  types?: Record<string, string>;
}

export interface PageSEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  ogImage?: string;
  ogType?: OpenGraphConfig['type'];
  twitterCard?: TwitterConfig['card'];
  structuredData?: StructuredDataConfig;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    github?: string;
  };
  creator: {
    name: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ArticleStructuredData extends StructuredDataConfig {
  '@type': 'Article';
  headline: string;
  author: Person;
  datePublished: string;
  dateModified?: string;
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
}

export interface OrganizationStructuredData extends StructuredDataConfig {
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  description: string;
  foundingDate?: string;
  founders?: Person[];
  employees?: Person[];
  address?: PostalAddress;
  contactPoint?: ContactPoint[];
  sameAs?: string[];
}

export interface WebsiteStructuredData extends StructuredDataConfig {
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
  potentialAction?: {
    '@type': 'SearchAction';
    target: {
      '@type': 'EntryPoint';
      urlTemplate: string;
    };
    'query-input': string;
  };
}
