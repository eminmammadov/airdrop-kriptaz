/**
 * API Type Definitions
 * Centralized type definitions for all API-related interfaces
 */

// Base API Response
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}

// Price Data Interface
export interface PriceData {
  price: number;
  change24h?: number;
  volume24h?: number;
  source: string;
  timestamp?: number;
  cached?: boolean;
}

// KURU Market Data Interface
export interface KuruMarketData {
  baseasset: string;
  quoteasset: string;
  market: string;
  lastPrice: number;
  lastPriceMonUSD: number;
  lastTradeTime: string;
  volume24h: number;
  priceChange24h: number;
  liquidity: number;
  basetoken: {
    address: string;
    decimal: number;
    name: string;
    ticker: string;
    imageurl: string;
    is_verified: boolean;
  };
  quotetoken: {
    address: string;
    decimal: number;
    name: string;
    ticker: string;
    imageurl: string;
    is_verified: boolean;
  };
}

// KURU API Response
export interface KuruApiResponse {
  success: boolean;
  code: number;
  timestamp: number;
  data: {
    data: KuruMarketData;
  };
}

// Price API Configuration
export interface PriceApiConfig {
  cacheEnabled: boolean;
  cacheTtl: number;
  fallbackPrice: number;
  timeout: number;
}

// Error Types
export enum ApiErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  INVALID_RESPONSE = 'INVALID_RESPONSE',
  RATE_LIMIT = 'RATE_LIMIT',
  SERVER_ERROR = 'SERVER_ERROR'
}

export interface ApiError {
  type: ApiErrorType;
  message: string;
  code?: number;
  timestamp: number;
}
