/**
 * User Types and Interfaces
 */

import { User } from '@prisma/client';

// Base User type from Prisma
export type UserModel = User;

// User creation input
export interface CreateUserInput {
  walletAddress: string;
}

// User update input
export interface UpdateUserInput {
  lastConnectedAt?: Date;
  connectionCount?: number;
  isActive?: boolean;
}

// User response for API
export interface UserResponse {
  id: string;
  walletAddress: string;
  firstConnectedAt: Date;
  lastConnectedAt: Date;
  connectionCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// User service response
export interface UserServiceResponse<T = UserResponse> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// User statistics
export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  averageConnectionsPerUser: number;
}
