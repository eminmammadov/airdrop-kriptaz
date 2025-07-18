/**
 * User Creation API Endpoint v1
 * POST /api/v1/users/create
 */

import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/infrastructure/repositories/PrismaUserRepository';
import { CreateUserInput } from '@/shared/types/user';
import { ApiErrorHandler } from '@/lib/api-error-handler';
import { ValidationUtils } from '@/lib/validation';
import { SECURITY_HEADERS } from '@/config/api';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate request size
    const sizeValidation = ValidationUtils.validateRequestSize(body);
    if (!sizeValidation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: sizeValidation.error
        },
        { status: 400 }
      );
    }

    const { walletAddress }: CreateUserInput = body;

    // Validate wallet address
    const addressValidation = ValidationUtils.validateWalletAddress(walletAddress);
    if (!addressValidation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: addressValidation.error
        },
        { status: 400 }
      );
    }

    // Handle user login (create if new, login if existing)
    const result = await UserService.handleUserLogin({ walletAddress });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error
        },
        { status: 400 }
      );
    }

    // Return success response with security headers
    return NextResponse.json(
      {
        success: true,
        data: result.data,
        message: result.message,
        version: 'v1'
      },
      { 
        status: result.message?.includes('registered') ? 201 : 200,
        headers: {
          ...SECURITY_HEADERS.COMMON,
          ...SECURITY_HEADERS.CORS(),
          'X-API-Version': 'v1'
        }
      }
    );

  } catch (error) {
    return ApiErrorHandler.handleError(error, 'POST /api/v1/users/create');
  }
}

// User creation endpoint only supports POST method
// Other methods are automatically handled by Next.js with 405 Method Not Allowed
