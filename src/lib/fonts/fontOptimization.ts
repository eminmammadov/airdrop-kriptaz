/**
 * Font Optimization Utilities
 * 
 * This module provides utilities for optimizing font loading performance,
 * including preloading strategies, caching, and performance monitoring.
 */

export interface FontOptimizationConfig {
  preloadCritical: boolean;
  enableCaching: boolean;
  monitorPerformance: boolean;
  fallbackTimeout: number;
}

export interface FontLoadingStrategy {
  critical: string[];
  important: string[];
  lazy: string[];
}

/**
 * Default font optimization configuration
 */
export const DEFAULT_FONT_CONFIG: FontOptimizationConfig = {
  preloadCritical: true,
  enableCaching: true,
  monitorPerformance: process.env.NODE_ENV === 'development',
  fallbackTimeout: 3000,
};

/**
 * Kriptaz font loading strategy
 */
export const KRIPTAZ_LOADING_STRATEGY: FontLoadingStrategy = {
  critical: [
    '/fonts/kriptaz/Kriptaz-Regular-400.woff2',
    '/fonts/kriptaz/Kriptaz-Bold-700.woff2',
  ],
  important: [
    '/fonts/kriptaz/Kriptaz-Medium-500.woff2',
    '/fonts/kriptaz/Kriptaz-DemiBold-600.woff2',
  ],
  lazy: [
    '/fonts/kriptaz/Kriptaz-Thin-100.woff2',
    '/fonts/kriptaz/Kriptaz-ExtraLight-200.woff2',
    '/fonts/kriptaz/Kriptaz-Light-300.woff2',
    '/fonts/kriptaz/Kriptaz-Thin-It-100.woff2',
    '/fonts/kriptaz/Kriptaz-ExtraLight-It-200.woff2',
    '/fonts/kriptaz/Kriptaz-Light-It-300.woff2',
    '/fonts/kriptaz/Kriptaz-Medium-It-500.woff2',
    '/fonts/kriptaz/Kriptaz-DemiBold-It-600.woff2',
    '/fonts/kriptaz/Kriptaz-Bold-It-700.woff2',
  ],
};

/**
 * Font Performance Monitor
 */
export class FontPerformanceTracker {
  private metrics: Map<string, FontMetrics> = new Map();
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    if (typeof window === 'undefined') return;

    // Monitor resource loading
    if ('PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name.includes('/fonts/')) {
            // Type assertion for PerformanceResourceTiming
            const resourceEntry = entry as PerformanceResourceTiming;
            this.recordFontMetric(entry.name, {
              loadTime: entry.duration,
              transferSize: resourceEntry.transferSize || 0,
              timestamp: entry.startTime,
            });
          }
        });
      });

      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.push(resourceObserver);
    }
  }

  recordFontMetric(fontPath: string, metrics: Partial<FontMetrics>) {
    const existing = this.metrics.get(fontPath) || {};
    this.metrics.set(fontPath, { ...existing, ...metrics } as FontMetrics);
  }

  getMetrics(fontPath?: string): FontMetrics | Map<string, FontMetrics> {
    if (fontPath) {
      return this.metrics.get(fontPath) || {};
    }
    return this.metrics;
  }

  clearMetrics() {
    this.metrics.clear();
  }

  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

interface FontMetrics {
  loadTime?: number;
  transferSize?: number;
  timestamp?: number;
  renderTime?: number;
}

/**
 * Font Preloader
 */
export class FontPreloader {
  private preloadedFonts = new Set<string>();
  private loadingPromises = new Map<string, Promise<void>>();

  async preloadFont(fontPath: string, options: {
    as?: string;
    type?: string;
    crossOrigin?: string;
  } = {}): Promise<void> {
    if (this.preloadedFonts.has(fontPath)) {
      return Promise.resolve();
    }

    if (this.loadingPromises.has(fontPath)) {
      const existingPromise = this.loadingPromises.get(fontPath);
      if (existingPromise) {
        return existingPromise;
      }
    }

    const promise = this.createPreloadLink(fontPath, options);
    this.loadingPromises.set(fontPath, promise);

    try {
      await promise;
      this.preloadedFonts.add(fontPath);
    } catch (error) {
      console.warn(`Failed to preload font: ${fontPath}`, error);
    } finally {
      this.loadingPromises.delete(fontPath);
    }
  }

  private createPreloadLink(fontPath: string, options: {
    as?: string;
    type?: string;
    crossOrigin?: string;
  }): Promise<void> {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = fontPath;
      link.as = options.as || 'font';
      link.type = options.type || 'font/woff2';
      
      if (options.crossOrigin) {
        link.crossOrigin = options.crossOrigin;
      }

      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to preload ${fontPath}`));

      document.head.appendChild(link);
    });
  }

  async preloadFonts(fontPaths: string[], options?: {
    as?: string;
    type?: string;
    crossOrigin?: string;
  }): Promise<void> {
    const promises = fontPaths.map(path => this.preloadFont(path, options));
    await Promise.allSettled(promises);
  }

  isPreloaded(fontPath: string): boolean {
    return this.preloadedFonts.has(fontPath);
  }

  getPreloadedFonts(): string[] {
    return Array.from(this.preloadedFonts);
  }
}

/**
 * Font Loading Optimizer
 */
export class FontLoadingOptimizer {
  private preloader = new FontPreloader();
  private performanceTracker = new FontPerformanceTracker();
  private config: FontOptimizationConfig;

  constructor(config: Partial<FontOptimizationConfig> = {}) {
    this.config = { ...DEFAULT_FONT_CONFIG, ...config };
    this.initialize();
  }

  private async initialize() {
    if (this.config.preloadCritical) {
      await this.preloadCriticalFonts();
    }

    // Preload important fonts after critical ones
    setTimeout(() => {
      this.preloadImportantFonts();
    }, 100);

    // Lazy load remaining fonts
    this.setupLazyLoading();
  }

  private async preloadCriticalFonts() {
    await this.preloader.preloadFonts(KRIPTAZ_LOADING_STRATEGY.critical, {
      crossOrigin: 'anonymous',
    });
  }

  private async preloadImportantFonts() {
    await this.preloader.preloadFonts(KRIPTAZ_LOADING_STRATEGY.important, {
      crossOrigin: 'anonymous',
    });
  }

  private setupLazyLoading() {
    if (typeof window === 'undefined') return;

    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.preloader.preloadFonts(KRIPTAZ_LOADING_STRATEGY.lazy, {
            crossOrigin: 'anonymous',
          });
          observer.disconnect();
        }
      });
    });

    // Start lazy loading when user scrolls or interacts
    const triggerLazyLoad = () => {
      this.preloader.preloadFonts(KRIPTAZ_LOADING_STRATEGY.lazy, {
        crossOrigin: 'anonymous',
      });
      document.removeEventListener('scroll', triggerLazyLoad);
      document.removeEventListener('touchstart', triggerLazyLoad);
    };

    document.addEventListener('scroll', triggerLazyLoad, { once: true });
    document.addEventListener('touchstart', triggerLazyLoad, { once: true });
  }

  getPerformanceMetrics() {
    return this.performanceTracker.getMetrics();
  }

  destroy() {
    this.performanceTracker.destroy();
  }
}

/**
 * Global font optimizer instance
 */
let globalOptimizer: FontLoadingOptimizer | null = null;

/**
 * Initialize font optimization
 */
export function initializeFontOptimization(config?: Partial<FontOptimizationConfig>) {
  if (typeof window === 'undefined') return;
  
  if (!globalOptimizer) {
    globalOptimizer = new FontLoadingOptimizer(config);
  }
  
  return globalOptimizer;
}

/**
 * Get the global font optimizer instance
 */
export function getFontOptimizer(): FontLoadingOptimizer | null {
  return globalOptimizer;
}
