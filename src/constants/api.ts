/**
 * API Constants
 * Centralized configuration for all API-related constants
 */

// KURU API Configuration
export const KURU_API = {
  BASE_URL: 'https://api.kuru.io',
  ENDPOINTS: {
    MARKETS: '/api/v2/markets',
    MARKET_BY_ADDRESS: '/api/v2/markets/address'
  },
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3
} as const;

// KA Token Configuration
export const KA_TOKEN = {
  ADDRESS: '0x84ada7631b8cc96cac78de0ea868c8c7b48b2753',
  MARKET_ADDRESS: '0x1e9a083b58a560d3daf13269ea53ad69c4a1bd0e',
  SYMBOL: 'KA',
  NAME: 'Kripto Azerbaijan',
  DECIMALS: 18
} as const;

// Cache Configuration
export const CACHE_CONFIG = {
  PRICE_TTL: 20000, // 20 seconds
  DEFAULT_TTL: 60000, // 1 minute
  MAX_ENTRIES: 100
} as const;

// Price Configuration
export const PRICE_CONFIG = {
  FALLBACK_PRICE: 0.000996, // Will be updated dynamically
  MIN_PRICE: 0.000001, // Minimum reasonable price
  MAX_PRICE: 100000, // Much higher ceiling for growth
  UPDATE_INTERVAL: 20000, // 20 seconds
  // Dynamic validation thresholds
  MAX_PRICE_CHANGE_PERCENT: 500, // 500% max change per update (prevents API bugs)
  PRICE_STALENESS_HOURS: 24, // Fallback price valid for 24 hours
} as const;

// API Response Status Codes
export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
} as const;
