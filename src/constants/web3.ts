/**
 * Web3 & Reown AppKit Constants
 * Centralized configuration for Web3 integration
 */

// Reown AppKit Configuration
export const REOWN_CONFIG = {
  PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID || '',
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Airdrop Kriptaz',
  APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'KA Token airdrop platform',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  APP_ICON: process.env.NEXT_PUBLIC_APP_ICON || 'https://avatars.githubusercontent.com/u/179229932'
} as const;

// Network Configuration
export const NETWORK_CONFIG = {
  DEFAULT_NETWORK: process.env.NEXT_PUBLIC_DEFAULT_NETWORK || 'mainnet',
  SUPPORTED_NETWORKS: (process.env.NEXT_PUBLIC_SUPPORTED_NETWORKS || 'mainnet,arbitrum,polygon').split(',')
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  EMAIL_LOGIN: process.env.NEXT_PUBLIC_ENABLE_EMAIL_LOGIN === 'true',
  SOCIAL_LOGIN: process.env.NEXT_PUBLIC_ENABLE_SOCIAL_LOGIN === 'true'
} as const;

// Validation
export const validateWeb3Config = (): void => {
  if (!REOWN_CONFIG.PROJECT_ID) {
    throw new Error(
      'NEXT_PUBLIC_PROJECT_ID is required. Please get your project ID from https://dashboard.reown.com'
    );
  }
  
  if (!REOWN_CONFIG.APP_URL.startsWith('http')) {
    throw new Error('NEXT_PUBLIC_APP_URL must be a valid URL');
  }
};

// Supported Wallet Types
export const WALLET_TYPES = {
  METAMASK: 'metamask',
  WALLET_CONNECT: 'walletconnect',
  COINBASE: 'coinbase',
  INJECTED: 'injected'
} as const;

// Chain IDs
export const CHAIN_IDS = {
  MONAD_TESTNET: 10143,
  ETHEREUM: 1,
  ARBITRUM: 42161,
  POLYGON: 137,
  BASE: 8453,
  OPTIMISM: 10
} as const;
