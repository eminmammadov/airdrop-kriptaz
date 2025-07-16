/**
 * Font Fallback System
 * 
 * Provides graceful degradation from custom Kriptaz fonts to Google Fonts
 * when custom fonts fail to load or are unavailable.
 */

import { FontFamily } from './types';

/**
 * Google Fonts fallback configuration
 */
export const GOOGLE_FONTS_FALLBACK = {
  primary: {
    name: 'Inter',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    styles: ['normal', 'italic'],
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100..900;1,100..900&display=swap',
  },
  mono: {
    name: 'JetBrains Mono',
    weights: [100, 200, 300, 400, 500, 600, 700, 800],
    styles: ['normal', 'italic'],
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap',
  },
} as const;

/**
 * Fallback font family configuration with Google Fonts
 */
export const fallbackFontFamily: FontFamily = {
  name: 'Inter',
  displayName: 'Inter (Fallback)',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  variants: [
    {
      weight: 100,
      style: 'normal',
      files: { woff: '', woff2: '' }, // Google Fonts handles this
    },
    {
      weight: 200,
      style: 'normal',
      files: { woff: '', woff2: '' },
    },
    {
      weight: 300,
      style: 'normal',
      files: { woff: '', woff2: '' },
    },
    {
      weight: 400,
      style: 'normal',
      files: { woff: '', woff2: '' },
    },
    {
      weight: 500,
      style: 'normal',
      files: { woff: '', woff2: '' },
    },
    {
      weight: 600,
      style: 'normal',
      files: { woff: '', woff2: '' },
    },
    {
      weight: 700,
      style: 'normal',
      files: { woff: '', woff2: '' },
    },
  ],
};

/**
 * Font loading strategy with fallback
 */
export interface FontLoadingStrategy {
  primary: FontFamily;
  fallback: FontFamily;
  timeout: number;
  retryAttempts: number;
}

/**
 * Default font loading strategy
 */
export const DEFAULT_FONT_STRATEGY: FontLoadingStrategy = {
  primary: {
    name: 'Kriptaz',
    displayName: 'Kriptaz',
    fallback: ['Inter', 'system-ui', 'sans-serif'],
    variants: [], // Will be populated from kriptaz.ts
  },
  fallback: fallbackFontFamily,
  timeout: 3000,
  retryAttempts: 2,
};

/**
 * Font fallback manager
 */
export class FontFallbackManager {
  private strategy: FontLoadingStrategy;
  private currentFont: 'primary' | 'fallback' = 'primary';
  private fallbackLoaded = false;
  private listeners: Array<(font: 'primary' | 'fallback') => void> = [];

  constructor(strategy: FontLoadingStrategy = DEFAULT_FONT_STRATEGY) {
    this.strategy = strategy;
    this.initializeFallback();
  }

  /**
   * Initialize fallback system
   */
  private async initializeFallback() {
    if (typeof window === 'undefined') return;

    try {
      // Try to load primary font
      await this.loadPrimaryFont();
    } catch (error) {
      console.warn('Primary font loading failed, switching to fallback:', error);
      await this.switchToFallback();
    }
  }

  /**
   * Load primary (Kriptaz) font
   */
  private async loadPrimaryFont(): Promise<void> {
    if (!('fonts' in document)) {
      throw new Error('Font Loading API not supported');
    }

    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Font loading timeout')), this.strategy.timeout);
    });

    const fontLoad = new Promise<void>((resolve, reject) => {
      const fontFace = new FontFace(
        this.strategy.primary.name,
        'url(/fonts/kriptaz/Kriptaz-Regular-400.woff2)'
      );

      fontFace.load()
        .then(() => {
          document.fonts.add(fontFace);
          resolve();
        })
        .catch(reject);
    });

    await Promise.race([fontLoad, timeout]);
  }

  /**
   * Switch to Google Fonts fallback
   */
  private async switchToFallback(): Promise<void> {
    if (this.fallbackLoaded) return;

    try {
      await this.loadGoogleFonts();
      this.currentFont = 'fallback';
      this.fallbackLoaded = true;
      this.notifyListeners('fallback');
    } catch (error) {
      console.error('Fallback font loading also failed:', error);
      // Use system fonts as final fallback
      this.currentFont = 'fallback';
      this.notifyListeners('fallback');
    }
  }

  /**
   * Load Google Fonts
   */
  private async loadGoogleFonts(): Promise<void> {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = GOOGLE_FONTS_FALLBACK.primary.googleFontsUrl;
      
      link.onload = () => resolve();
      link.onerror = () => reject(new Error('Google Fonts loading failed'));
      
      document.head.appendChild(link);
    });
  }

  /**
   * Get current font family CSS
   */
  getCurrentFontFamily(): string {
    if (this.currentFont === 'primary') {
      return `'${this.strategy.primary.name}', ${this.strategy.primary.fallback.join(', ')}`;
    } else {
      return `'${this.strategy.fallback.name}', ${this.strategy.fallback.fallback.join(', ')}`;
    }
  }

  /**
   * Get current font status
   */
  getCurrentFont(): 'primary' | 'fallback' {
    return this.currentFont;
  }

  /**
   * Check if fallback is loaded
   */
  isFallbackLoaded(): boolean {
    return this.fallbackLoaded;
  }

  /**
   * Add listener for font changes
   */
  addListener(callback: (font: 'primary' | 'fallback') => void): void {
    this.listeners.push(callback);
  }

  /**
   * Remove listener
   */
  removeListener(callback: (font: 'primary' | 'fallback') => void): void {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  /**
   * Notify all listeners
   */
  private notifyListeners(font: 'primary' | 'fallback'): void {
    this.listeners.forEach(callback => callback(font));
  }

  /**
   * Force switch to fallback (for testing)
   */
  async forceFallback(): Promise<void> {
    await this.switchToFallback();
  }

  /**
   * Reset to primary font (for testing)
   */
  resetToPrimary(): void {
    this.currentFont = 'primary';
    this.notifyListeners('primary');
  }
}

/**
 * Global fallback manager instance
 */
let globalFallbackManager: FontFallbackManager | null = null;

/**
 * Get or create global fallback manager
 */
export function getFallbackManager(): FontFallbackManager {
  if (!globalFallbackManager) {
    globalFallbackManager = new FontFallbackManager();
  }
  return globalFallbackManager;
}

/**
 * Initialize fallback system
 */
export function initializeFallbackSystem(strategy?: FontLoadingStrategy): FontFallbackManager {
  globalFallbackManager = new FontFallbackManager(strategy);
  return globalFallbackManager;
}
