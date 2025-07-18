/**
 * User Repository Interface
 * Domain layer contract for user persistence
 */

import { User } from '../entities/User';
import { WalletAddress } from '../value-objects/WalletAddress';

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  averageConnectionsPerUser: number;
}

export interface UserRepository {
  // Core CRUD operations
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByWalletAddress(address: WalletAddress): Promise<User | null>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;

  // Query operations
  findAll(): Promise<User[]>;
  findActiveUsers(): Promise<User[]>;
  getStats(): Promise<UserStats>;

  // Business operations
  existsByWalletAddress(address: WalletAddress): Promise<boolean>;
  countActiveUsers(): Promise<number>;
  findUsersCreatedToday(): Promise<User[]>;
}
