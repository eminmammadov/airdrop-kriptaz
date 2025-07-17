/**
 * KURU API Service
 * Handles all interactions with KURU exchange API
 */

import { PriceData, KuruMarketData, ApiResponse } from '@/types/api';
import { KURU_API, KA_TOKEN } from '@/constants/api';
import { PriceValidatorService } from '@/services/validation/price-validator.service';

export class KuruApiService {
  
  /**
   * Fetch KA token market data from KURU API
   */
  static async getKAMarketData(): Promise<ApiResponse<KuruMarketData>> {
    try {
      const marketUrl = `${KURU_API.BASE_URL}${KURU_API.ENDPOINTS.MARKET_BY_ADDRESS}/${KA_TOKEN.MARKET_ADDRESS}`;

      const response = await fetch(marketUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // Add timeout and retry logic
        signal: AbortSignal.timeout(KURU_API.TIMEOUT)
      });

      if (!response.ok) {
        throw new Error(`KURU API error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.success || !data.data?.data) {
        console.error('Invalid KURU API response structure:', data);
        throw new Error('Invalid KURU API response structure');
      }
      return {
        success: true,
        data: data.data.data,
        timestamp: Date.now()
      };

    } catch (error) {
      console.error('KURU API Service Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Date.now()
      };
    }
  }

  /**
   * Calculate KA/USD price from KURU market data
   */
  static calculateKAPrice(marketData: KuruMarketData): PriceData {
    const kaMonPrice = marketData.lastPrice; // KA/MON price
    const monUsdPrice = marketData.lastPriceMonUSD; // MON/USD price

    // Calculate KA/USD price
    const kaUsdPrice = kaMonPrice * monUsdPrice;

    return {
      price: kaUsdPrice,
      volume24h: marketData.volume24h,
      change24h: marketData.priceChange24h,
      source: 'KURU API',
      timestamp: Date.now()
    };
  }

  /**
   * Get formatted KA token price data
   */
  static async getKAPrice(): Promise<ApiResponse<PriceData>> {
    const marketResponse = await this.getKAMarketData();
    
    if (!marketResponse.success || !marketResponse.data) {
      return {
        success: false,
        error: marketResponse.error || 'Failed to fetch market data',
        timestamp: Date.now()
      };
    }

    try {
      const rawPriceData = this.calculateKAPrice(marketResponse.data);

      // Validate price with smart thresholds
      const validatedPriceData = PriceValidatorService.validatePriceData(rawPriceData);

      return {
        success: true,
        data: validatedPriceData,
        timestamp: Date.now()
      };

    } catch (error) {
      console.error('Price calculation error:', error);
      return {
        success: false,
        error: 'Failed to calculate price',
        timestamp: Date.now()
      };
    }
  }
}
