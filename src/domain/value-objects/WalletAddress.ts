/**
 * WalletAddress Value Object
 * Immutable value object for wallet addresses
 */

export class WalletAddress {
  private constructor(private readonly value: string) {
    this.validate();
  }

  static create(address: string): WalletAddress {
    return new WalletAddress(address);
  }

  private validate(): void {
    if (!this.value) {
      throw new Error('Wallet address cannot be empty');
    }

    if (!this.value.startsWith('0x')) {
      throw new Error('Wallet address must start with 0x');
    }

    if (this.value.length !== 42) {
      throw new Error('Wallet address must be 42 characters long');
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(this.value)) {
      throw new Error('Wallet address contains invalid characters');
    }
  }

  getValue(): string {
    return this.value;
  }

  getShortened(): string {
    return `${this.value.slice(0, 6)}...${this.value.slice(-4)}`;
  }

  isValid(): boolean {
    try {
      this.validate();
      return true;
    } catch {
      return false;
    }
  }

  equals(other: WalletAddress): boolean {
    return this.value.toLowerCase() === other.value.toLowerCase();
  }

  toString(): string {
    return this.value;
  }
}
