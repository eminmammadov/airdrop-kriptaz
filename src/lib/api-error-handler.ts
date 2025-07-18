/**
 * API Error Handler
 * Centralized error handling for API routes
 */

import { NextResponse } from 'next/server';

export interface ApiError {
  message: string;
  code?: string;
  statusCode: number;
  details?: unknown;
}

export class CustomApiError extends Error implements ApiError {
  statusCode: number;
  code?: string;
  details?: unknown;

  constructor(message: string, statusCode: number = 500, code?: string, details?: unknown) {
    super(message);
    this.name = 'CustomApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export class ApiErrorHandler {
  /**
   * Handle and format API errors
   */
  static handleError(error: unknown, context?: string): NextResponse {
    console.error(`API Error${context ? ` in ${context}` : ''}:`, error);

    // Handle known error types
    if (error instanceof CustomApiError) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          code: error.code,
          ...(process.env.NODE_ENV === 'development' && { details: error.details })
        },
        { status: error.statusCode }
      );
    }

    // Handle Prisma errors
    if (this.isPrismaError(error)) {
      return this.handlePrismaError(error as Record<string, unknown>);
    }

    // Handle validation errors
    if (this.isValidationError(error)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error
        },
        { status: 400 }
      );
    }

    // Handle network/timeout errors
    if (this.isNetworkError(error)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Network error occurred',
          code: 'NETWORK_ERROR'
        },
        { status: 503 }
      );
    }

    // Default error response
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        code: 'INTERNAL_ERROR',
        ...(process.env.NODE_ENV === 'development' && { 
          details: error instanceof Error ? error.message : String(error) 
        })
      },
      { status: 500 }
    );
  }

  /**
   * Handle Prisma-specific errors
   */
  private static handlePrismaError(error: Record<string, unknown>): NextResponse {
    const code = error.code as string;
    const meta = error.meta as Record<string, unknown>;

    switch (code) {
      case 'P2002':
        return NextResponse.json(
          {
            success: false,
            error: 'A record with this data already exists',
            code: 'DUPLICATE_RECORD',
            field: (meta?.target as string[])?.[0]
          },
          { status: 409 }
        );

      case 'P2025':
        return NextResponse.json(
          {
            success: false,
            error: 'Record not found',
            code: 'NOT_FOUND'
          },
          { status: 404 }
        );

      case 'P2003':
        return NextResponse.json(
          {
            success: false,
            error: 'Foreign key constraint failed',
            code: 'CONSTRAINT_FAILED'
          },
          { status: 400 }
        );

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Database operation failed',
            code: 'DATABASE_ERROR'
          },
          { status: 500 }
        );
    }
  }

  /**
   * Check if error is a Prisma error
   */
  private static isPrismaError(error: unknown): boolean {
    const errorObj = error as Record<string, unknown>;
    return Boolean(errorObj?.code && typeof errorObj.code === 'string' && errorObj.code.startsWith('P'));
  }

  /**
   * Check if error is a validation error
   */
  private static isValidationError(error: unknown): boolean {
    const errorObj = error as Record<string, unknown>;
    return Boolean(errorObj?.name === 'ValidationError' ||
           (errorObj?.issues && Array.isArray(errorObj.issues)));
  }

  /**
   * Check if error is a network error
   */
  private static isNetworkError(error: unknown): boolean {
    const errorObj = error as Record<string, unknown>;
    return errorObj?.code === 'ECONNREFUSED' ||
           errorObj?.code === 'ETIMEDOUT' ||
           errorObj?.name === 'TimeoutError' ||
           (typeof errorObj?.message === 'string' && errorObj.message.includes('network')) ||
           (typeof errorObj?.message === 'string' && errorObj.message.includes('timeout'));
  }
}

/**
 * Create a custom API error
 */
export function createApiError(
  message: string,
  statusCode: number = 500,
  code?: string,
  details?: unknown
): CustomApiError {
  return new CustomApiError(message, statusCode, code, details);
}
