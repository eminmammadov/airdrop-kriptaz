/**
 * Connect User Use Case
 * Application layer business logic for user connection
 */

import { User } from '@/domain/entities/User';
import { WalletAddress } from '@/domain/value-objects/WalletAddress';
import { UserRepository } from '@/domain/repositories/UserRepository';

export interface ConnectUserRequest {
  walletAddress: string;
}

export interface ConnectUserResponse {
  user: User;
  isNewUser: boolean;
  message: string;
}

export class ConnectUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: ConnectUserRequest): Promise<ConnectUserResponse> {
    // Create value object
    const walletAddress = WalletAddress.create(request.walletAddress);

    // Check if user exists
    const existingUser = await this.userRepository.findByWalletAddress(walletAddress);

    if (existingUser) {
      // Existing user - connect
      existingUser.connect();
      const updatedUser = await this.userRepository.update(existingUser);

      return {
        user: updatedUser,
        isNewUser: false,
        message: 'User logged in successfully'
      };
    } else {
      // New user - create and connect
      const newUser = User.create(request.walletAddress);
      const savedUser = await this.userRepository.save(newUser);

      return {
        user: savedUser,
        isNewUser: true,
        message: 'New user registered successfully'
      };
    }
  }
}
