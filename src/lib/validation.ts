/**
 * Input Validation Utilities
 * Centralized validation functions for API inputs
 */

export interface ValidationResult<T = unknown> {
  isValid: boolean;
  error?: string;
  sanitizedValue?: T;
}

export class ValidationUtils {
  /**
   * Validate Ethereum wallet address
   */
  static validateWalletAddress(address: string): ValidationResult {
    if (!address) {
      return {
        isValid: false,
        error: 'Wallet address is required'
      };
    }

    if (typeof address !== 'string') {
      return {
        isValid: false,
        error: 'Wallet address must be a string'
      };
    }

    // Remove whitespace and convert to lowercase
    const sanitized = address.trim().toLowerCase();

    // Check if it's a valid Ethereum address format
    const ethAddressRegex = /^0x[a-f0-9]{40}$/;
    if (!ethAddressRegex.test(sanitized)) {
      return {
        isValid: false,
        error: 'Invalid Ethereum wallet address format. Must be 42 characters starting with 0x'
      };
    }

    return {
      isValid: true,
      sanitizedValue: sanitized
    };
  }

  /**
   * Validate user update input
   */
  static validateUserUpdateInput(input: unknown): ValidationResult<Record<string, unknown>> {
    if (!input || typeof input !== 'object') {
      return {
        isValid: false,
        error: 'Update data must be an object'
      };
    }

    const allowedFields = ['lastConnectedAt', 'connectionCount', 'isActive'];
    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(input)) {
      if (!allowedFields.includes(key)) {
        return {
          isValid: false,
          error: `Field '${key}' is not allowed for updates`
        };
      }

      // Validate specific fields
      switch (key) {
        case 'lastConnectedAt':
          if (value !== null && !(value instanceof Date) && !this.isValidDateString(value)) {
            return {
              isValid: false,
              error: 'lastConnectedAt must be a valid date'
            };
          }
          sanitized[key] = value instanceof Date ? value : new Date(value as string);
          break;

        case 'connectionCount':
          if (typeof value !== 'number' || value < 0 || !Number.isInteger(value)) {
            return {
              isValid: false,
              error: 'connectionCount must be a non-negative integer'
            };
          }
          sanitized[key] = value;
          break;

        case 'isActive':
          if (typeof value !== 'boolean') {
            return {
              isValid: false,
              error: 'isActive must be a boolean'
            };
          }
          sanitized[key] = value;
          break;
      }
    }

    return {
      isValid: true,
      sanitizedValue: sanitized
    };
  }

  /**
   * Validate pagination parameters
   */
  static validatePaginationParams(query: Record<string, unknown>): ValidationResult<{ page: number; limit: number }> {
    const sanitized: { page: number; limit: number } = { page: 1, limit: 10 };

    // Validate page
    if (query.page !== undefined) {
      const page = parseInt(String(query.page));
      if (isNaN(page) || page < 1) {
        return {
          isValid: false,
          error: 'Page must be a positive integer'
        };
      }
      sanitized.page = page;
    }

    // Validate limit
    if (query.limit !== undefined) {
      const limit = parseInt(String(query.limit));
      if (isNaN(limit) || limit < 1 || limit > 100) {
        return {
          isValid: false,
          error: 'Limit must be between 1 and 100'
        };
      }
      sanitized.limit = limit;
    }

    return {
      isValid: true,
      sanitizedValue: sanitized
    };
  }

  /**
   * Sanitize string input
   */
  static sanitizeString(input: string, maxLength: number = 255): ValidationResult {
    if (typeof input !== 'string') {
      return {
        isValid: false,
        error: 'Input must be a string'
      };
    }

    const sanitized = input.trim();

    if (sanitized.length === 0) {
      return {
        isValid: false,
        error: 'Input cannot be empty'
      };
    }

    if (sanitized.length > maxLength) {
      return {
        isValid: false,
        error: `Input cannot exceed ${maxLength} characters`
      };
    }

    return {
      isValid: true,
      sanitizedValue: sanitized
    };
  }

  /**
   * Check if string is a valid date
   */
  private static isValidDateString(value: unknown): boolean {
    if (typeof value !== 'string') return false;
    const date = new Date(value);
    return !isNaN(date.getTime());
  }

  /**
   * Validate request body size
   */
  static validateRequestSize(body: unknown, maxSizeKB: number = 10): ValidationResult<unknown> {
    const bodySize = JSON.stringify(body).length;
    const maxSizeBytes = maxSizeKB * 1024;

    if (bodySize > maxSizeBytes) {
      return {
        isValid: false,
        error: `Request body too large. Maximum size is ${maxSizeKB}KB`
      };
    }

    return {
      isValid: true,
      sanitizedValue: body
    };
  }
}
