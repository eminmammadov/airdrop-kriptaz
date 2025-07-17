/**
 * KA Token Price API v1
 * Professional API endpoint for KA token price data
 */

import { NextResponse } from 'next/server';
import { KuruApiService } from '@/services/api/kuru.service';
import { PriceCacheService } from '@/services/cache/price-cache.service';
import { PriceData, ApiResponse } from '@/types/api';
import { PRICE_CONFIG, CACHE_CONFIG } from '@/constants/api';

// Constants
const CACHE_KEY = 'ka-price';

/**
 * Professional Price Controller
 */
class PriceController {
  /**
   * Get KA token price with caching
   */
  static async getPrice(): Promise<ApiResponse<PriceData>> {
    try {
      // Check cache first
      const cachedPrice = PriceCacheService.get(CACHE_KEY);
      if (cachedPrice) {
        return {
          success: true,
          data: cachedPrice,
          timestamp: Date.now()
        };
      }

      // Fetch from KURU API
      const apiResponse = await KuruApiService.getKAPrice();

      if (apiResponse.success && apiResponse.data) {
        // Cache the result
        PriceCacheService.set(CACHE_KEY, apiResponse.data);

        return apiResponse;
      }

      // Fallback if API fails
      console.warn('KURU API failed, using fallback price');
      const fallbackData: PriceData = {
        price: PRICE_CONFIG.FALLBACK_PRICE,
        source: 'Fallback Price',
        timestamp: Date.now(),
        cached: false
      };

      return {
        success: true,
        data: fallbackData,
        timestamp: Date.now()
      };

    } catch (error) {
      console.error('Price Controller Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Date.now()
      };
    }
  }
}

/**
 * GET /api/v1/price
 * Returns KA token price data
 */
export async function GET(): Promise<NextResponse> {
  try {
    const response = await PriceController.getPrice();

    if (!response.success) {
      return NextResponse.json(
        {
          success: false,
          error: response.error || 'Price data unavailable',
          timestamp: response.timestamp
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: response.data,
        timestamp: response.timestamp,
        cache_duration: CACHE_CONFIG.PRICE_TTL / 1000 // seconds
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=20',
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        timestamp: Date.now()
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/v1/price
 * CORS preflight handler
 */
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}
