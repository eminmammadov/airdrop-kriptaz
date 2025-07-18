/**
 * User Statistics API Endpoint v1
 * GET /api/v1/users/stats
 */

import { NextResponse } from 'next/server';
import { UserService } from '@/infrastructure/repositories/PrismaUserRepository';
import { SECURITY_HEADERS } from '@/config/api';

/**
 * GET /api/v1/users/stats
 * Get user statistics
 */
export async function GET() {
  try {
    // Get user statistics
    const result = await UserService.getUserStats();

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          version: 'v1'
        },
        { status: 500 }
      );
    }

    // Return statistics with security headers
    return NextResponse.json(
      {
        success: true,
        data: result.data,
        version: 'v1',
        timestamp: Date.now()
      },
      {
        status: 200,
        headers: {
          ...SECURITY_HEADERS.COMMON,
          ...SECURITY_HEADERS.CORS(),
          ...SECURITY_HEADERS.CACHE(60), // Cache for 1 minute
          'X-API-Version': 'v1'
        }
      }
    );

  } catch (error) {
    console.error('GET /api/v1/users/stats error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        version: 'v1'
      },
      { status: 500 }
    );
  }
}

// Stats endpoint only supports GET method
// Other methods are automatically handled by Next.js with 405 Method Not Allowed
