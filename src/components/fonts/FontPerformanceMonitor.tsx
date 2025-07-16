'use client';

import React, { useEffect, useState } from 'react';
import { useFontMetrics, useFontLoading } from '@/hooks/useFonts';

interface FontPerformanceData {
  loadTime: number;
  renderTime: number;
  isLoaded: boolean;
  error: Error | null;
  timestamp: number;
}

/**
 * Font Performance Monitor Component
 * Tracks and displays font loading performance metrics
 */
export function FontPerformanceMonitor({ 
  enabled = process.env.NODE_ENV === 'development',
  fontFamily = 'Kriptaz' 
}: {
  enabled?: boolean;
  fontFamily?: string;
}) {
  const [performanceData, setPerformanceData] = useState<FontPerformanceData | null>(null);
  const { isLoaded, error } = useFontLoading(fontFamily);
  const metrics = useFontMetrics(fontFamily);

  useEffect(() => {
    if (!enabled) return;

    const startTime = performance.now();

    const updatePerformanceData = () => {
      const renderTime = performance.now();
      
      setPerformanceData({
        loadTime: metrics?.loadTime || 0,
        renderTime: renderTime - startTime,
        isLoaded,
        error,
        timestamp: Date.now(),
      });
    };

    // Update performance data when font loading state changes
    updatePerformanceData();
  }, [enabled, isLoaded, error, metrics]);

  // Don't render in production unless explicitly enabled
  if (!enabled) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50">
      <div className="font-bold mb-2">Font Performance Monitor</div>
      {performanceData && (
        <div className="space-y-1">
          <div>Font: {fontFamily}</div>
          <div>Status: {isLoaded ? '✅ Loaded' : '⏳ Loading'}</div>
          <div>Load Time: {performanceData.loadTime.toFixed(2)}ms</div>
          <div>Render Time: {performanceData.renderTime.toFixed(2)}ms</div>
          {error && <div className="text-red-400">Error: {error.message}</div>}
          <div className="text-gray-400">
            Updated: {new Date(performanceData.timestamp).toLocaleTimeString()}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Font Loading Indicator Component
 * Shows a loading state while fonts are being loaded
 */
export function FontLoadingIndicator({ 
  children,
  fallback = <div>Loading fonts...</div>,
  fontFamily = 'Kriptaz'
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  fontFamily?: string;
}) {
  const { isLoading } = useFontLoading(fontFamily);

  if (isLoading) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Font Optimization Provider
 * Provides font optimization context and utilities
 */
interface FontOptimizationContextType {
  preloadFont: (fontPath: string) => void;
  isOptimized: boolean;
}

const FontOptimizationContext = React.createContext<FontOptimizationContextType | null>(null);

export function FontOptimizationProvider({ children }: { children: React.ReactNode }) {
  const [preloadedFonts, setPreloadedFonts] = useState<Set<string>>(new Set());

  const preloadFont = (fontPath: string) => {
    if (preloadedFonts.has(fontPath)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = fontPath;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    
    document.head.appendChild(link);
    setPreloadedFonts(prev => new Set([...prev, fontPath]));
  };

  const contextValue: FontOptimizationContextType = {
    preloadFont,
    isOptimized: true,
  };

  return (
    <FontOptimizationContext.Provider value={contextValue}>
      {children}
    </FontOptimizationContext.Provider>
  );
}

/**
 * Hook to use font optimization context
 */
export function useFontOptimization() {
  const context = React.useContext(FontOptimizationContext);
  if (!context) {
    throw new Error('useFontOptimization must be used within FontOptimizationProvider');
  }
  return context;
}
