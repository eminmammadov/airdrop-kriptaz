/**
 * User Management API Endpoint v1
 * GET /api/v1/users/[address] - Get user by wallet address
 * PUT /api/v1/users/[address] - Update user by wallet address
 */

import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/infrastructure/repositories/PrismaUserRepository';
import { UpdateUserInput } from '@/shared/types/user';
import { ApiErrorHandler } from '@/lib/api-error-handler';
import { SECURITY_HEADERS } from '@/config/api';

interface RouteParams {
  params: Promise<{
    address: string;
  }>;
}

/**
 * GET /api/v1/users/[address]
 * Retrieve user by wallet address
 */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { address } = await params;

    // Validate address parameter
    if (!address) {
      return NextResponse.json(
        {
          success: false,
          error: 'Wallet address parameter is required',
          version: 'v1'
        },
        { status: 400 }
      );
    }

    // Find user by address
    const result = await UserService.findUserByAddress(address);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          version: 'v1'
        },
        { status: result.error === 'User not found' ? 404 : 400 }
      );
    }

    // Return user data with security headers
    return NextResponse.json(
      {
        success: true,
        data: result.data,
        version: 'v1'
      },
      {
        status: 200,
        headers: {
          ...SECURITY_HEADERS.COMMON,
          ...SECURITY_HEADERS.CORS(),
          'X-API-Version': 'v1'
        }
      }
    );

  } catch (error) {
    return ApiErrorHandler.handleError(error, 'GET /api/v1/users/[address]');
  }
}

/**
 * PUT /api/v1/users/[address]
 * Update user status (admin only - limited fields)
 * Only allows updating: isActive
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { address } = await params;
    const body = await request.json();

    // Validate address parameter
    if (!address) {
      return NextResponse.json(
        {
          success: false,
          error: 'Wallet address parameter is required',
          version: 'v1'
        },
        { status: 400 }
      );
    }

    // Validate and filter allowed fields only
    const allowedFields = ['isActive'];
    const filteredData: Partial<UpdateUserInput> = {};
    
    for (const [key, value] of Object.entries(body)) {
      if (allowedFields.includes(key)) {
        if (key === 'isActive') {
          if (typeof value === 'boolean') {
            filteredData.isActive = value;
          } else {
            return NextResponse.json(
              {
                success: false,
                error: `Field 'isActive' must be a boolean value`,
                version: 'v1'
              },
              { status: 400 }
            );
          }
        }
      } else {
        return NextResponse.json(
          {
            success: false,
            error: `Field '${key}' is not allowed for updates. Only 'isActive' can be updated.`,
            allowedFields,
            version: 'v1'
          },
          { status: 400 }
        );
      }
    }

    if (Object.keys(filteredData).length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No valid fields provided for update',
          allowedFields,
          version: 'v1'
        },
        { status: 400 }
      );
    }

    // Update user with filtered data
    const result = await UserService.updateUser(address, filteredData);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          version: 'v1'
        },
        { status: 400 }
      );
    }

    // Return updated user data with security headers
    return NextResponse.json(
      {
        success: true,
        data: result.data,
        message: `User status updated successfully`,
        version: 'v1'
      },
      {
        status: 200,
        headers: {
          ...SECURITY_HEADERS.COMMON,
          ...SECURITY_HEADERS.CORS(),
          'X-API-Version': 'v1'
        }
      }
    );

  } catch (error) {
    return ApiErrorHandler.handleError(error, 'PUT /api/v1/users/[address]');
  }
}

/**
 * POST /api/v1/users/[address]
 * Not supported - user creation should use dedicated endpoint
 */
export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: 'User creation not supported on this endpoint',
      message: 'Use POST /api/v1/users/create for user registration/login',
      correctEndpoint: '/api/v1/users/create',
      version: 'v1'
    },
    { 
      status: 405,
      headers: {
        'Allow': 'GET, PUT',
        ...SECURITY_HEADERS.COMMON,
        'X-API-Version': 'v1'
      }
    }
  );
}

/**
 * DELETE /api/v1/users/[address]
 * User deletion is permanently disabled for security and data integrity
 * Alternative: Use PUT to set isActive: false
 */
export async function DELETE() {
  return NextResponse.json(
    {
      success: false,
      error: 'User deletion is permanently disabled for security and data integrity',
      reason: 'User data contains critical wallet connection history',
      alternative: 'Use PUT /api/v1/users/[address] with {"isActive": false} to deactivate user',
      code: 'DELETE_FORBIDDEN',
      version: 'v1'
    },
    { 
      status: 403,
      headers: {
        'Allow': 'GET, PUT',
        ...SECURITY_HEADERS.COMMON,
        'X-API-Version': 'v1'
      }
    }
  );
}
