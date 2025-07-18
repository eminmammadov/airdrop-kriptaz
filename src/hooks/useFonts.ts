'use client';

import { useState, useEffect, useCallback } from 'react';
import type { FontLoadingHookReturn, FontLoadingState } from '@/shared/types/fonts';
import { getFallbackManager } from '@/lib/fonts/fallback';

/**
 * Custom hook for monitoring font loading status
 */
export function useFontLoading(fontFamily: string = 'Kriptaz'): FontLoadingHookReturn {
  const [loadingState, setLoadingState] = useState<FontLoadingState>('loading');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const checkFontLoaded = async () => {
      try {
        // Check if font is available using CSS Font Loading API
        if ('fonts' in document) {
          const fontFace = new FontFace(fontFamily, 'url(/fonts/kriptaz/Kriptaz-Regular-400.woff2)');
          
          // Set timeout for font loading
          timeoutId = setTimeout(() => {
            setLoadingState('timeout');
            setError(new Error(`Font ${fontFamily} loading timeout`));
          }, 5000);

          await fontFace.load();
          document.fonts.add(fontFace);
          
          clearTimeout(timeoutId);
          setLoadingState('loaded');
        } else {
          // Fallback for browsers without Font Loading API
          setLoadingState('loaded');
        }
      } catch (err) {
        clearTimeout(timeoutId);
        setLoadingState('error');
        setError(err instanceof Error ? err : new Error('Font loading failed'));
      }
    };

    checkFontLoaded();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [fontFamily]);

  return {
    isLoaded: loadingState === 'loaded',
    isLoading: loadingState === 'loading',
    error,
    loadingState,
  };
}

/**
 * Hook for getting font metrics and performance data
 */
export function useFontMetrics(fontFamily: string = 'Kriptaz') {
  const [metrics, setMetrics] = useState<{
    loadTime: number;
    isSupported: boolean;
  } | null>(null);

  useEffect(() => {
    const startTime = performance.now();

    const checkFontMetrics = async () => {
      try {
        if ('fonts' in document) {
          await document.fonts.ready;
          const endTime = performance.now();
          
          setMetrics({
            loadTime: endTime - startTime,
            isSupported: true,
          });
        } else {
          setMetrics({
            loadTime: 0,
            isSupported: false,
          });
        }
      } catch (error) {
        console.warn('Font metrics collection failed:', error);
        setMetrics({
          loadTime: 0,
          isSupported: false,
        });
      }
    };

    checkFontMetrics();
  }, [fontFamily]);

  return metrics;
}

/**
 * Hook for checking if specific font weights are available
 */
export function useFontWeights(fontFamily: string = 'Kriptaz') {
  const [availableWeights, setAvailableWeights] = useState<number[]>([]);

  useEffect(() => {
    const checkWeights = async () => {
      const weights = [100, 200, 300, 400, 500, 600, 700];
      const available: number[] = [];

      for (const weight of weights) {
        try {
          if ('fonts' in document) {
            const fontFace = new FontFace(
              fontFamily, 
              `url(/fonts/kriptaz/Kriptaz-${getWeightName(weight)}-${weight}.woff2)`,
              { weight: weight.toString() }
            );
            
            await fontFace.load();
            available.push(weight);
          }
        } catch {
          // Weight not available, skip
        }
      }

      setAvailableWeights(available);
    };

    checkWeights();
  }, [fontFamily]);

  return availableWeights;
}

/**
 * Hook for font fallback management
 */
export function useFontFallback() {
  const [currentFont, setCurrentFont] = useState<'primary' | 'fallback'>('primary');
  const [fallbackManager] = useState(() => getFallbackManager());

  useEffect(() => {
    const handleFontChange = (font: 'primary' | 'fallback') => {
      setCurrentFont(font);
    };

    fallbackManager.addListener(handleFontChange);
    setCurrentFont(fallbackManager.getCurrentFont());

    return () => {
      fallbackManager.removeListener(handleFontChange);
    };
  }, [fallbackManager]);

  const forceFallback = useCallback(async () => {
    await fallbackManager.forceFallback();
  }, [fallbackManager]);

  const resetToPrimary = useCallback(() => {
    fallbackManager.resetToPrimary();
  }, [fallbackManager]);

  return {
    currentFont,
    isFallbackLoaded: fallbackManager.isFallbackLoaded(),
    fontFamily: fallbackManager.getCurrentFontFamily(),
    forceFallback,
    resetToPrimary,
  };
}

/**
 * Hook for graceful font degradation
 */
export function useGracefulFontDegradation(fontFamily: string = 'Kriptaz') {
  const { currentFont, fontFamily: currentFontFamily } = useFontFallback();
  const { isLoaded, error } = useFontLoading(fontFamily);

  const shouldUseFallback = !isLoaded || error !== null;

  return {
    fontFamily: shouldUseFallback ? currentFontFamily : `'${fontFamily}', ${currentFontFamily}`,
    isUsingFallback: currentFont === 'fallback' || shouldUseFallback,
    error,
  };
}

/**
 * Helper function to get weight name from number
 */
function getWeightName(weight: number): string {
  const weightNames: Record<number, string> = {
    100: 'Thin',
    200: 'ExtraLight',
    300: 'Light',
    400: 'Regular',
    500: 'Medium',
    600: 'DemiBold',
    700: 'Bold',
  };

  return weightNames[weight] || 'Regular';
}
