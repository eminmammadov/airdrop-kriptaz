/**
 * User Service
 * Handles all user-related database operations
 */

import { prisma } from '@/lib/prisma';
import { ValidationUtils } from '@/lib/validation';
import {
  CreateUserInput,
  UpdateUserInput,
  UserResponse,
  UserServiceResponse,
  UserStats,
  UserModel
} from '@/shared/types/user';

export class UserService {
  /**
   * Handle user login - create if new, update connection if existing
   */
  static async handleUserLogin(input: CreateUserInput): Promise<UserServiceResponse<UserResponse>> {
    try {
      const { walletAddress } = input;

      // Validate wallet address format using ValidationUtils
      const validation = ValidationUtils.validateWalletAddress(walletAddress);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.error || 'Invalid wallet address format'
        };
      }

      const sanitizedAddress = validation.sanitizedValue as string;

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { walletAddress: sanitizedAddress }
      });

      let user;

      if (existingUser) {
        // Existing user - update connection time and set active
        user = await prisma.user.update({
          where: { walletAddress: sanitizedAddress },
          data: {
            lastConnectedAt: new Date(),
            isActive: true, // Set active on login
            connectionCount: {
              increment: 1 // Track total connections
            }
          }
        });

        return {
          success: true,
          data: this.formatUserResponse(user),
          message: 'User logged in successfully'
        };
      } else {
        // New user - create with initial connection
        user = await prisma.user.create({
          data: {
            walletAddress: sanitizedAddress,
            firstConnectedAt: new Date(),
            lastConnectedAt: new Date(),
            connectionCount: 1,
            isActive: true
          }
        });

        return {
          success: true,
          data: this.formatUserResponse(user),
          message: 'New user registered successfully'
        };
      }
    } catch (error) {
      console.error('UserService.createOrUpdateUser error:', error);
      return {
        success: false,
        error: 'Failed to create or update user'
      };
    }
  }

  /**
   * Find user by wallet address
   */
  static async findUserByAddress(walletAddress: string): Promise<UserServiceResponse<UserResponse>> {
    try {
      const validation = ValidationUtils.validateWalletAddress(walletAddress);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.error || 'Invalid wallet address format'
        };
      }

      const user = await prisma.user.findUnique({
        where: { walletAddress: validation.sanitizedValue as string }
      });

      if (!user) {
        return {
          success: false,
          error: 'User not found'
        };
      }

      return {
        success: true,
        data: this.formatUserResponse(user)
      };
    } catch (error) {
      console.error('UserService.findUserByAddress error:', error);
      return {
        success: false,
        error: 'Failed to find user'
      };
    }
  }

  /**
   * Handle user disconnect - set user as inactive
   */
  static async handleUserDisconnect(walletAddress: string): Promise<UserServiceResponse<UserResponse>> {
    try {
      const validation = ValidationUtils.validateWalletAddress(walletAddress);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.error || 'Invalid wallet address format'
        };
      }

      const user = await prisma.user.update({
        where: { walletAddress: validation.sanitizedValue as string },
        data: {
          isActive: false, // Set inactive on disconnect
          lastConnectedAt: new Date() // Update last seen time
        }
      });

      return {
        success: true,
        data: this.formatUserResponse(user),
        message: 'User disconnected successfully'
      };
    } catch (error) {
      console.error('UserService.handleUserDisconnect error:', error);
      return {
        success: false,
        error: 'Failed to disconnect user'
      };
    }
  }

  /**
   * Update user information
   */
  static async updateUser(walletAddress: string, input: UpdateUserInput): Promise<UserServiceResponse<UserResponse>> {
    try {
      const validation = ValidationUtils.validateWalletAddress(walletAddress);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.error || 'Invalid wallet address format'
        };
      }

      const user = await prisma.user.update({
        where: { walletAddress: validation.sanitizedValue as string },
        data: input
      });

      return {
        success: true,
        data: this.formatUserResponse(user),
        message: 'User updated successfully'
      };
    } catch (error) {
      console.error('UserService.updateUser error:', error);
      return {
        success: false,
        error: 'Failed to update user'
      };
    }
  }

  /**
   * Get user statistics with real active user tracking
   */
  static async getUserStats(): Promise<UserServiceResponse<UserStats>> {
    try {
      // Get current date boundaries
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));

      const [totalUsers, activeUsers, newUsersToday] = await Promise.all([
        // Total registered users
        prisma.user.count(),

        // Currently active users (connected and not manually disconnected)
        prisma.user.count({
          where: {
            isActive: true // Only count users who are currently connected
          }
        }),

        // New users registered today
        prisma.user.count({
          where: {
            createdAt: {
              gte: startOfDay,
              lte: endOfDay
            }
          }
        })
      ]);

      // Get connection statistics
      const connectionStats = await prisma.user.aggregate({
        _avg: {
          connectionCount: true
        },
        _sum: {
          connectionCount: true
        }
      });

      // Calculate additional metrics
      const averageConnectionsPerUser = connectionStats._avg.connectionCount || 0;

      const stats: UserStats = {
        totalUsers,
        activeUsers, // This now reflects real active users
        newUsersToday,
        averageConnectionsPerUser: Math.round(averageConnectionsPerUser * 100) / 100 // Round to 2 decimals
      };

      return {
        success: true,
        data: stats
      };
    } catch (error) {
      console.error('UserService.getUserStats error:', error);
      return {
        success: false,
        error: 'Failed to get user statistics'
      };
    }
  }



  /**
   * Format user data for API response
   */
  private static formatUserResponse(user: UserModel): UserResponse {
    return {
      id: user.id,
      walletAddress: user.walletAddress,
      firstConnectedAt: user.firstConnectedAt,
      lastConnectedAt: user.lastConnectedAt,
      connectionCount: user.connectionCount,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}
