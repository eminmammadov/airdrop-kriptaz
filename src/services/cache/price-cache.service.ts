/**
 * Price Cache Service
 * Handles caching of price data to improve performance
 */

import { PriceData } from '@/types/api';
import { CACHE_CONFIG } from '@/constants/api';

interface CacheEntry {
  data: PriceData;
  timestamp: number;
  ttl: number;
}

export class PriceCacheService {
  private static cache = new Map<string, CacheEntry>();

  /**
   * Set cache entry with TTL
   */
  static set(key: string, data: PriceData, ttl: number = CACHE_CONFIG.PRICE_TTL): void {
    this.cache.set(key, {
      data: { ...data, cached: false },
      timestamp: Date.now(),
      ttl
    });
  }

  /**
   * Get cache entry if valid
   */
  static get(key: string): PriceData | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    const now = Date.now();
    const isExpired = (now - entry.timestamp) > entry.ttl;

    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return {
      ...entry.data,
      cached: true
    };
  }

  /**
   * Check if cache entry is valid
   */
  static isValid(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Clear specific cache entry
   */
  static clear(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cache entries
   */
  static clearAll(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  static getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}
