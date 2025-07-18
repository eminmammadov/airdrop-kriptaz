/**
 * KA Token Price API v1
 * Professional API endpoint for KA token price data
 */

import { NextResponse } from 'next/server';
import { KuruApiService } from '@/infrastructure/api/kuru.service';
import { PriceCacheService } from '@/infrastructure/cache/price-cache.service';
import { PriceData, ApiResponse } from '@/shared/types/api';
import { PRICE_CONFIG, CACHE_CONFIG } from '@/shared/constants/api';

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
          'Cache-Control': 'public, max-age=20, must-revalidate',
          'Content-Type': 'application/json',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-RateLimit-Limit': '100',
          'X-RateLimit-Window': '60',
          'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production'
            ? 'https://airdrop-kriptaz.vercel.app'
            : '*'
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
 * CORS preflight handler with security restrictions
 */
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      // Restrict CORS to specific domains in production
      'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production'
        ? 'https://airdrop-kriptaz.vercel.app'
        : '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '3600', // Reduced from 24h to 1h
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY'
    }
  });
}

/**
 * Unsupported HTTP methods for price endpoint
 * Price data is read-only and comes from external sources
 */
export async function POST(): Promise<NextResponse> {
  return NextResponse.json(
    {
      success: false,
      error: 'Price creation not supported',
      message: 'Price data is fetched from external market APIs and cannot be manually created',
      allowedMethods: ['GET', 'OPTIONS']
    },
    {
      status: 405,
      headers: {
        'Allow': 'GET, OPTIONS'
      }
    }
  );
}

export async function PUT(): Promise<NextResponse> {
  return NextResponse.json(
    {
      success: false,
      error: 'Price modification not supported',
      message: 'Price data is determined by market conditions and cannot be manually updated',
      allowedMethods: ['GET', 'OPTIONS']
    },
    {
      status: 405,
      headers: {
        'Allow': 'GET, OPTIONS'
      }
    }
  );
}

export async function DELETE(): Promise<NextResponse> {
  return NextResponse.json(
    {
      success: false,
      error: 'Price deletion not supported',
      message: 'Price data is essential market information and cannot be deleted',
      allowedMethods: ['GET', 'OPTIONS']
    },
    {
      status: 405,
      headers: {
        'Allow': 'GET, OPTIONS'
      }
    }
  );
}
