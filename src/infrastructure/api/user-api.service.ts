/**
 * User API Client Service
 * Frontend service for user API interactions
 */

import { CreateUserInput, UserResponse, UserServiceResponse, UserStats } from '@/shared/types/user';

export class UserApiService {
  private static readonly BASE_URL = '/api/v1/users';

  /**
   * Handle user login (create if new, login if existing)
   */
  static async handleUserLogin(walletAddress: string): Promise<UserServiceResponse<UserResponse>> {
    try {
      const response = await fetch(`${this.BASE_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress } as CreateUserInput),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to create or update user'
        };
      }

      return data;
    } catch (error) {
      console.error('UserApiService.createOrUpdateUser error:', error);
      return {
        success: false,
        error: 'Network error: Failed to connect to user service'
      };
    }
  }

  /**
   * Get user by wallet address
   */
  static async getUserByAddress(walletAddress: string): Promise<UserServiceResponse<UserResponse>> {
    try {
      const response = await fetch(`${this.BASE_URL}/${walletAddress}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to get user'
        };
      }

      return data;
    } catch (error) {
      console.error('UserApiService.getUserByAddress error:', error);
      return {
        success: false,
        error: 'Network error: Failed to connect to user service'
      };
    }
  }

  /**
   * Get user statistics
   */
  static async getUserStats(): Promise<UserServiceResponse<UserStats>> {
    try {
      const response = await fetch(`${this.BASE_URL}/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to get user statistics'
        };
      }

      return data;
    } catch (error) {
      console.error('UserApiService.getUserStats error:', error);
      return {
        success: false,
        error: 'Network error: Failed to connect to user service'
      };
    }
  }

  /**
   * Handle user disconnect
   */
  static async handleUserDisconnect(walletAddress: string): Promise<UserServiceResponse<UserResponse>> {
    try {
      const response = await fetch(`${this.BASE_URL}/disconnect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to disconnect user'
        };
      }

      return data;
    } catch (error) {
      console.error('UserApiService.handleUserDisconnect error:', error);
      return {
        success: false,
        error: 'Network error: Failed to connect to user service'
      };
    }
  }

  /**
   * Update user connection timestamp
   */
  static async updateUserConnection(walletAddress: string): Promise<UserServiceResponse<UserResponse>> {
    try {
      const response = await fetch(`${this.BASE_URL}/${walletAddress}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lastConnectedAt: new Date(),
          isActive: true
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to update user connection'
        };
      }

      return data;
    } catch (error) {
      console.error('UserApiService.updateUserConnection error:', error);
      return {
        success: false,
        error: 'Network error: Failed to connect to user service'
      };
    }
  }
}
