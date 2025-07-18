import { SiteConfig } from '@/shared/types/seo';
import { SOCIAL_LINKS, APP_LINKS, CONTACT_LINKS } from '@/config/links';

/**
 * Site Configuration
 * Central configuration for SEO, social media, and site metadata
 */
export const siteConfig: SiteConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'Kriptaz Airdrop and Liquidity Staking',
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Earn free tokens through liquidity staking by participating in the Kriptaz airdrop campaign.',
  url: APP_LINKS.current, // Environment-first approach
  ogImage: '/images/og-image.png',
  links: {
    twitter: SOCIAL_LINKS.twitter,
    facebook: SOCIAL_LINKS.facebook,
    linkedin: SOCIAL_LINKS.linkedin,
    instagram: SOCIAL_LINKS.instagram,
    github: SOCIAL_LINKS.github,
  },
  creator: {
    name: 'Kriptaz Team',
    twitter: '@kriptazChain',
    linkedin: 'kriptazblockchain',
  },
};

/**
 * Default SEO Configuration
 */
export const defaultSEO = {
  title: siteConfig.name,
  description: 'Join the Kriptaz airdrop to earn free tokens through liquidity staking. Be part of the blockchain revolution with our innovative DeFi platform.',
  keywords: [
    'kriptaz airdrop',
    'liquidity staking',
    'free tokens',
    'blockchain rewards',
    'crypto airdrop',
    'defi staking',
    'token rewards',
  ],
  canonical: siteConfig.url,
  robots: {
    index: true,
    follow: true,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    nocache: false,
  },
  openGraph: {
    type: 'website' as const,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Kriptaz Airdrop Campaign`,
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    alternateLocale: ['tr_TR'],
  },
  twitter: {
    card: 'summary_large_image' as const,
    site: siteConfig.creator.twitter,
    creator: siteConfig.creator.twitter,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        alt: `${siteConfig.name} - Kriptaz Airdrop Campaign`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

/**
 * Structured Data Templates
 */
export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo.png`,
  description: siteConfig.description,
  foundingDate: '2024',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: CONTACT_LINKS.email,
      availableLanguage: ['English', 'Turkish'],
    },
  ],
  sameAs: Object.values(siteConfig.links).filter(Boolean),
};

export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

/**
 * Page-specific SEO configurations
 */
export const pageSEOConfigs = {
  home: {
    title: `${siteConfig.name} - Free Token Rewards`,
    description: 'Earn free tokens through liquidity staking by participating in the Kriptaz airdrop campaign. Join the blockchain revolution and get rewarded.',
    keywords: [
      'kriptaz airdrop',
      'liquidity staking',
      'free tokens',
      'blockchain rewards',
      'crypto airdrop',
      'defi staking',
      'token rewards',
    ],
  },
  fontsTest: {
    title: `Font System Test - ${siteConfig.name}`,
    description: 'Comprehensive testing environment for the Kriptaz font management system. Test font weights, fallback mechanisms, and performance optimization features.',
    keywords: [
      'font testing',
      'typography testing',
      'font fallback',
      'font performance',
      'kriptaz fonts',
    ],
  },
};

/**
 * Social Media Sharing Templates
 */
export const socialSharingTemplates = {
  twitter: {
    text: 'Join the Kriptaz airdrop and earn free tokens through liquidity staking! 🚀💰',
    hashtags: ['KriptazAirdrop', 'DeFi', 'LiquidityStaking', 'FreeTokens', 'Blockchain'],
    via: siteConfig.creator.twitter?.replace('@', ''),
  },
  facebook: {
    quote: 'Earn free tokens through liquidity staking by participating in the Kriptaz airdrop campaign.',
  },
  linkedin: {
    title: 'Kriptaz Airdrop and Liquidity Staking',
    summary: 'Join the blockchain revolution and earn free tokens through our innovative liquidity staking program.',
  },
};

/**
 * Core Web Vitals Thresholds
 */
export const coreWebVitalsThresholds = {
  LCP: {
    good: 2500,
    needsImprovement: 4000,
  },
  FID: {
    good: 100,
    needsImprovement: 300,
  },
  CLS: {
    good: 0.1,
    needsImprovement: 0.25,
  },
  FCP: {
    good: 1800,
    needsImprovement: 3000,
  },
  TTFB: {
    good: 800,
    needsImprovement: 1800,
  },
};
