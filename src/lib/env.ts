/**
 * Environment Variables Validation
 * Ensures all required environment variables are present
 */

interface EnvironmentVariables {
  DATABASE_URL: string;
  NODE_ENV: 'development' | 'production' | 'test';
  DB_CONNECTION_TIMEOUT?: number;
  DB_MAX_POOL_SIZE?: number;
  DB_MIN_POOL_SIZE?: number;
  // API Configuration
  API_VERSION?: string;
  PRICE_CACHE_TTL?: number;
  PRICE_UPDATE_INTERVAL?: number;
  // Security Configuration
  ALLOWED_ORIGINS?: string;
  MAX_SSE_CONNECTIONS?: number;
  SSE_CONNECTION_TIMEOUT?: number;
  // External APIs
  ALCHEMY_API_KEY?: string;
}

/**
 * Validate and return environment variables
 */
export function validateEnv(): EnvironmentVariables {
  const requiredVars = {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV || 'production',
    DB_CONNECTION_TIMEOUT: process.env.DB_CONNECTION_TIMEOUT ? parseInt(process.env.DB_CONNECTION_TIMEOUT) : 10000,
    DB_MAX_POOL_SIZE: process.env.DB_MAX_POOL_SIZE ? parseInt(process.env.DB_MAX_POOL_SIZE) : 10,
    DB_MIN_POOL_SIZE: process.env.DB_MIN_POOL_SIZE ? parseInt(process.env.DB_MIN_POOL_SIZE) : 2,
    // API Configuration
    API_VERSION: process.env.API_VERSION || 'v1',
    PRICE_CACHE_TTL: process.env.PRICE_CACHE_TTL ? parseInt(process.env.PRICE_CACHE_TTL) : 20000,
    PRICE_UPDATE_INTERVAL: process.env.PRICE_UPDATE_INTERVAL ? parseInt(process.env.PRICE_UPDATE_INTERVAL) : 10000,
    // Security Configuration
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
    MAX_SSE_CONNECTIONS: process.env.MAX_SSE_CONNECTIONS ? parseInt(process.env.MAX_SSE_CONNECTIONS) : 50,
    SSE_CONNECTION_TIMEOUT: process.env.SSE_CONNECTION_TIMEOUT ? parseInt(process.env.SSE_CONNECTION_TIMEOUT) : 300000,
    // External APIs
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
  };

  // Check for missing required variables
  const missingVars = Object.entries(requiredVars)
    .filter(([_key, value]) => !value) // eslint-disable-line @typescript-eslint/no-unused-vars
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
      'Please check your .env file and ensure all required variables are set.'
    );
  }

  // Validate DATABASE_URL format for MongoDB
  if (!requiredVars.DATABASE_URL?.startsWith('mongodb')) {
    throw new Error(
      'DATABASE_URL must be a valid MongoDB connection string starting with "mongodb://" or "mongodb+srv://"'
    );
  }

  return requiredVars as EnvironmentVariables;
}

/**
 * Get validated environment variables
 */
export const env = validateEnv();
