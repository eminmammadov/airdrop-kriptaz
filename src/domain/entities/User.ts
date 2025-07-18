/**
 * User Domain Entity
 * Core business logic for user management
 */

import { WalletAddress } from '../value-objects/WalletAddress';

export interface UserProps {
  id: string;
  walletAddress: WalletAddress;
  firstConnectedAt: Date;
  lastConnectedAt: Date;
  connectionCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private constructor(private props: UserProps) {}

  static create(walletAddress: string): User {
    const now = new Date();
    
    return new User({
      id: crypto.randomUUID(),
      walletAddress: WalletAddress.create(walletAddress),
      firstConnectedAt: now,
      lastConnectedAt: now,
      connectionCount: 1,
      isActive: true,
      createdAt: now,
      updatedAt: now
    });
  }

  static fromPersistence(props: UserProps): User {
    return new User(props);
  }

  // Getters
  get id(): string {
    return this.props.id;
  }

  get walletAddress(): WalletAddress {
    return this.props.walletAddress;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get connectionCount(): number {
    return this.props.connectionCount;
  }

  get lastConnectedAt(): Date {
    return this.props.lastConnectedAt;
  }

  // Business Logic
  connect(): void {
    this.props.lastConnectedAt = new Date();
    this.props.connectionCount += 1;
    this.props.isActive = true;
    this.props.updatedAt = new Date();
  }

  disconnect(): void {
    this.props.isActive = false;
    this.props.lastConnectedAt = new Date();
    this.props.updatedAt = new Date();
  }

  deactivate(): void {
    this.props.isActive = false;
    this.props.updatedAt = new Date();
  }

  // Validation
  canConnect(): boolean {
    return this.props.walletAddress.isValid();
  }

  // Serialization
  toJSON(): UserProps {
    return { ...this.props };
  }
}
