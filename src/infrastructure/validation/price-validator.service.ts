/**
 * Smart Price Validation Service
 * Prevents API bugs while allowing natural price growth
 */

import { PRICE_CONFIG } from '@/shared/constants/api';
import { PriceData } from '@/shared/types/api';

export class PriceValidatorService {
  private static lastValidPrice: number | null = null;
  private static lastValidTimestamp: number | null = null;

  /**
   * Validate price with smart thresholds
   */
  static validatePrice(newPrice: number): {
    isValid: boolean;
    validatedPrice: number;
    reason?: string;
  } {
    // Basic range check
    if (newPrice < PRICE_CONFIG.MIN_PRICE) {
      return {
        isValid: false,
        validatedPrice: this.getFallbackPrice(),
        reason: `Price too low: ${newPrice} < ${PRICE_CONFIG.MIN_PRICE}`
      };
    }

    if (newPrice > PRICE_CONFIG.MAX_PRICE) {
      return {
        isValid: false,
        validatedPrice: this.getFallbackPrice(),
        reason: `Price too high: ${newPrice} > ${PRICE_CONFIG.MAX_PRICE}`
      };
    }

    // Smart change validation (only if we have previous price)
    if (this.lastValidPrice && this.lastValidTimestamp) {
      const changePercent = Math.abs((newPrice - this.lastValidPrice) / this.lastValidPrice) * 100;
      
      if (changePercent > PRICE_CONFIG.MAX_PRICE_CHANGE_PERCENT) {
        console.warn(`🚨 Suspicious price change: ${changePercent.toFixed(2)}% from ${this.lastValidPrice} to ${newPrice}`);
        
        // If change is too dramatic, use last valid price
        return {
          isValid: false,
          validatedPrice: this.lastValidPrice,
          reason: `Price change too dramatic: ${changePercent.toFixed(2)}%`
        };
      }
    }

    // Price is valid, update our records
    this.updateValidPrice(newPrice);
    
    return {
      isValid: true,
      validatedPrice: newPrice
    };
  }

  /**
   * Get fallback price (last valid or configured fallback)
   */
  private static getFallbackPrice(): number {
    // Use last valid price if it's recent (within 24 hours)
    if (this.lastValidPrice && this.lastValidTimestamp) {
      const hoursAgo = (Date.now() - this.lastValidTimestamp) / (1000 * 60 * 60);
      
      if (hoursAgo < PRICE_CONFIG.PRICE_STALENESS_HOURS) {
        console.warn(`📊 Using recent valid price: $${this.lastValidPrice} (${hoursAgo.toFixed(1)}h ago)`);
        return this.lastValidPrice;
      }
    }

    // Fall back to configured price
    console.warn(`📊 Using configured fallback price: $${PRICE_CONFIG.FALLBACK_PRICE}`);
    return PRICE_CONFIG.FALLBACK_PRICE;
  }

  /**
   * Update last valid price
   */
  private static updateValidPrice(price: number): void {
    this.lastValidPrice = price;
    this.lastValidTimestamp = Date.now();
    
    // Optionally store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('ka_last_valid_price', JSON.stringify({
        price,
        timestamp: this.lastValidTimestamp
      }));
    }
  }

  /**
   * Initialize from localStorage
   */
  static initialize(): void {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('ka_last_valid_price');
        if (stored) {
          const { price, timestamp } = JSON.parse(stored);
          this.lastValidPrice = price;
          this.lastValidTimestamp = timestamp;
          console.warn(`📊 Restored last valid price: $${price}`);
        }
      } catch (error) {
        console.warn('Failed to restore last valid price:', error);
      }
    }
  }

  /**
   * Validate complete price data
   */
  static validatePriceData(priceData: PriceData): PriceData & {
    validation: {
      isOriginal: boolean;
      reason?: string;
    }
  } {
    const validation = this.validatePrice(priceData.price);

    return {
      ...priceData,
      price: validation.validatedPrice,
      source: validation.isValid ? priceData.source : `${priceData.source} (Validated)`,
      // Add validation metadata
      validation: {
        isOriginal: validation.isValid,
        reason: validation.reason
      }
    };
  }
}

// Initialize on import
PriceValidatorService.initialize();
