/**
 * Centralized API Configuration
 * All API-related configurations in one place
 */

// Environment validation
const requiredEnvVars = {
  ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV || 'development'
};

// Validate required environment variables
for (const [key, value] of Object.entries(requiredEnvVars)) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

// ================================
// API VERSIONING CONFIGURATION
// ================================
export const API_CONFIG = {
  VERSION: process.env.API_VERSION || 'v1',
  BASE_PATH: '/api',
  VERSIONED_PATH: '/api/v1'
} as const;

// ================================
// SECURITY CONFIGURATION
// ================================
export const SECURITY_CONFIG = {
  CORS: {
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(',') || ['*'],
    ALLOWED_METHODS: ['GET', 'POST', 'PUT', 'OPTIONS'],
    ALLOWED_HEADERS: ['Content-Type', 'Authorization'],
    MAX_AGE: 3600
  },
  RATE_LIMITING: {
    WINDOW_MS: 60 * 1000, // 1 minute
    MAX_REQUESTS: 100,
    PRICE_API_MAX: 60,
    STREAM_API_MAX: 10
  },
  SSE: {
    MAX_CONNECTIONS: parseInt(process.env.MAX_SSE_CONNECTIONS || '50'),
    CONNECTION_TIMEOUT: parseInt(process.env.SSE_CONNECTION_TIMEOUT || '300000'),
    UPDATE_INTERVAL: parseInt(process.env.PRICE_UPDATE_INTERVAL || '10000')
  }
} as const;

// ================================
// PRICE API CONFIGURATION
// ================================
export const PRICE_CONFIG = {
  CACHE_TTL: parseInt(process.env.PRICE_CACHE_TTL || '20000'),
  FALLBACK_PRICE: 0.000996,
  UPDATE_INTERVAL: parseInt(process.env.PRICE_UPDATE_INTERVAL || '10000'),
  SOURCES: {
    KURU: 'KURU API',
    ALCHEMY: 'Alchemy Monad API',
    FALLBACK: 'Fallback Price'
  }
} as const;

// ================================
// EXTERNAL API CONFIGURATION
// ================================
export const EXTERNAL_APIS = {
  ALCHEMY: {
    API_KEY: process.env.ALCHEMY_API_KEY || '',
    BASE_URL: 'https://monad-testnet.g.alchemy.com/v2',
    TIMEOUT: 10000
  },
  KURU: {
    BASE_URL: 'https://api.kuru.exchange',
    TIMEOUT: 5000
  },
  COINGECKO: {
    BASE_URL: 'https://api.coingecko.com/api/v3',
    TIMEOUT: 5000
  }
} as const;

// ================================
// DATABASE CONFIGURATION
// ================================
export const DATABASE_CONFIG = {
  URL: process.env.DATABASE_URL || '',
  CONNECTION_TIMEOUT: parseInt(process.env.DB_CONNECTION_TIMEOUT || '10000'),
  MAX_POOL_SIZE: parseInt(process.env.DB_MAX_POOL_SIZE || '10'),
  MIN_POOL_SIZE: parseInt(process.env.DB_MIN_POOL_SIZE || '2')
} as const;

// ================================
// HTTP RESPONSE TEMPLATES
// ================================
export const HTTP_RESPONSES = {
  METHOD_NOT_ALLOWED: (allowedMethods: string[]) => ({
    success: false,
    error: 'Method not allowed',
    allowedMethods,
    code: 'METHOD_NOT_ALLOWED'
  }),
  RATE_LIMITED: (retryAfter: number) => ({
    success: false,
    error: 'Rate limit exceeded',
    retryAfter,
    code: 'RATE_LIMITED'
  }),
  INTERNAL_ERROR: {
    success: false,
    error: 'Internal server error',
    code: 'INTERNAL_ERROR'
  }
} as const;

// ================================
// SECURITY HEADERS
// ================================
export const SECURITY_HEADERS = {
  COMMON: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  },
  CORS: (origin?: string) => ({
    'Access-Control-Allow-Origin': origin || (
      process.env.NODE_ENV === 'production' 
        ? 'https://airdrop-kriptaz.vercel.app' 
        : '*'
    ),
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '3600'
  }),
  CACHE: (maxAge: number) => ({
    'Cache-Control': `public, max-age=${maxAge}, must-revalidate`
  }),
  NO_CACHE: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  }
} as const;
