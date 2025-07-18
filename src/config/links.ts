/**
 * Centralized Links Configuration
 * All external URLs, social media links, and resources in one place
 */

// Application URLs - Environment-based configuration
export const APP_LINKS = {
  // Primary URLs come from environment variables
  current: process.env.NEXT_PUBLIC_SITE_URL || 'https://airdrop-kriptaz.vercel.app',

  // Fallback URLs for different environments
  production: 'https://airdrop-kriptaz.vercel.app',
  staging: 'https://airdrop-kriptaz-staging.vercel.app',
  local: 'http://localhost:3000',

  // API base URL (for internal API calls)
  api: process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://airdrop-kriptaz.vercel.app',
} as const;

// Social Media Links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/kriptazChain',
  facebook: 'https://facebook.com/kriptazChain',
  facebookGroup: 'https://www.facebook.com/groups/kriptoazerbaijan',
  linkedin: 'https://linkedin.com/company/kriptazblockchain',
  instagram: 'https://instagram.com/kriptaz',
  github: 'https://github.com/kriptazChain',
  telegram: 'https://t.me/kriptoazerbaycancommunity',
  youtube: 'https://www.youtube.com/@kriptazChain',
} as const;

// Documentation & Resources
export const RESOURCE_LINKS = {
  docs: 'https://docs.kriptaz.com/',
  faucet: 'https://drip.tools/',
  whitepaper: 'https://docs.kriptaz.com/whitepaper',
  roadmap: 'https://docs.kriptaz.com/roadmap',
  tokenomics: 'https://docs.kriptaz.com/tokenomics',
} as const;

// API Endpoints
export const API_LINKS = {
  kuru: {
    base: 'https://api.kuru.io',
    markets: 'https://api.kuru.io/api/v2/markets',
    marketByAddress: 'https://api.kuru.io/api/v2/markets/address',
  },
  coingecko: {
    base: 'https://api.coingecko.com/api/v3',
    simplePrice: 'https://api.coingecko.com/api/v3/simple/price',
  },
  alchemy: {
    monadTestnet: 'https://monad-testnet.g.alchemy.com/v2',
  },
} as const;

// Blockchain Explorers
export const EXPLORER_LINKS = {
  monadTestnet: 'https://testnet.monadexplorer.com',
  ethereum: 'https://etherscan.io',
  arbitrum: 'https://arbiscan.io',
  polygon: 'https://polygonscan.com',
  base: 'https://basescan.org',
  optimism: 'https://optimistic.etherscan.io',
  sepolia: 'https://sepolia.etherscan.io',
  mumbai: 'https://mumbai.polygonscan.com',
} as const;

// External Services
export const EXTERNAL_SERVICES = {
  reownDashboard: 'https://dashboard.reown.com',
  vercel: 'https://vercel.com',
  github: {
    repo: 'https://github.com/eminmammadov/airdrop-kriptaz',
    issues: 'https://github.com/eminmammadov/airdrop-kriptaz/issues',
    releases: 'https://github.com/eminmammadov/airdrop-kriptaz/releases',
  },
} as const;

// Contact Information
export const CONTACT_LINKS = {
  email: 'contact@kriptaz.com',
  support: 'support@kriptaz.com',
  business: 'business@kriptaz.com',
} as const;

// Social Sharing Templates
export const SHARING_TEMPLATES = {
  twitter: {
    kamonad: "woke up bullish on @monad! kaMonad by @kriptazChain",
    airdrop: "Join the Kriptaz airdrop and earn free tokens through liquidity staking! 🚀💰",
    hashtags: ['KriptazAirdrop', 'DeFi', 'LiquidityStaking', 'FreeTokens', 'Blockchain'],
  },
  facebook: {
    airdrop: 'Earn free tokens through liquidity staking by participating in the Kriptaz airdrop campaign.',
  },
  linkedin: {
    title: 'Kriptaz Airdrop and Liquidity Staking',
    summary: 'Join the blockchain revolution and earn free tokens through our innovative liquidity staking program.',
  },
} as const;

// Utility Functions
export const generateSocialShareUrl = (platform: keyof typeof SOCIAL_LINKS, text?: string, url?: string) => {
  const encodedText = encodeURIComponent(text || '');
  const encodedUrl = encodeURIComponent(url || APP_LINKS.current);
  
  switch (platform) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case 'telegram':
      return `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
    default:
      return SOCIAL_LINKS[platform];
  }
};

export const generateExplorerUrl = (chainId: number, type: 'tx' | 'address', hash: string) => {
  const explorers: Record<number, string> = {
    10143: EXPLORER_LINKS.monadTestnet,
    1: EXPLORER_LINKS.ethereum,
    42161: EXPLORER_LINKS.arbitrum,
    137: EXPLORER_LINKS.polygon,
    8453: EXPLORER_LINKS.base,
    10: EXPLORER_LINKS.optimism,
    11155111: EXPLORER_LINKS.sepolia,
    80001: EXPLORER_LINKS.mumbai,
  };
  
  const baseUrl = explorers[chainId] || EXPLORER_LINKS.ethereum;
  return `${baseUrl}/${type}/${hash}`;
};

// Validation
export const validateLinks = () => {
  const allLinks = {
    ...SOCIAL_LINKS,
    ...RESOURCE_LINKS,
    ...API_LINKS.kuru,
    ...API_LINKS.coingecko,
    ...EXPLORER_LINKS,
    ...APP_LINKS,
    ...EXTERNAL_SERVICES,
  };
  
  Object.entries(allLinks).forEach(([key, url]) => {
    if (typeof url === 'string' && !url.startsWith('http') && !url.startsWith('mailto:')) {
      console.warn(`Invalid URL for ${key}: ${url}`);
    }
  });
};

// Initialize validation in development
if (process.env.NODE_ENV === 'development') {
  validateLinks();
}
