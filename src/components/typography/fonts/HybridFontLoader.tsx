'use client';

import React, { useEffect, useState } from 'react';
import { initializeFallbackSystem, GOOGLE_FONTS_FALLBACK } from '@/lib/fonts/fallback';
import { initializeFontOptimization } from '@/lib/fonts/fontOptimization';

/**
 * Hybrid Font Loader Component
 * Manages the loading of both custom Kriptaz fonts and Google Fonts fallback
 */
export function HybridFontLoader({
  children,
  showLoadingState = false,
  showStatusIndicator = false
}: {
  children: React.ReactNode;
  showLoadingState?: boolean;
  showStatusIndicator?: boolean;
}) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [fallbackLoaded, setFallbackLoaded] = useState(false);

  useEffect(() => {
    const initializeHybridSystem = async () => {
      try {
        // Initialize font optimization system
        initializeFontOptimization({
          preloadCritical: true,
          enableCaching: true,
          monitorPerformance: process.env.NODE_ENV === 'development',
          fallbackTimeout: 3000,
        });

        // Initialize fallback system
        const fallbackManager = initializeFallbackSystem();
        
        // Listen for fallback activation
        fallbackManager.addListener((fontType) => {
          if (fontType === 'fallback') {
            setFallbackLoaded(true);
          }
        });

        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize hybrid font system:', error);
        setIsInitialized(true); // Continue with system fonts
      }
    };

    initializeHybridSystem();
  }, []);

  // Preload Google Fonts link in head
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const preloadGoogleFonts = () => {
      // Preload Google Fonts CSS
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.href = GOOGLE_FONTS_FALLBACK.primary.googleFontsUrl;
      preloadLink.as = 'style';
      preloadLink.onload = () => {
        // Convert preload to stylesheet after loading
        preloadLink.rel = 'stylesheet';
      };
      
      document.head.appendChild(preloadLink);
    };

    // Preload Google Fonts after a short delay to prioritize custom fonts
    const timeoutId = setTimeout(preloadGoogleFonts, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!isInitialized && showLoadingState) {
    // Show minimal loading state only when explicitly requested
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm font-medium align-middle">Loading fonts...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
      {/* Development indicator - only show when explicitly requested */}
      {process.env.NODE_ENV === 'development' && showStatusIndicator && (
        <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 rounded text-xs">
          <div>Hybrid Font System: ✅ Active</div>
          <div>Fallback Loaded: {fallbackLoaded ? '✅' : '⏳'}</div>
        </div>
      )}
    </>
  );
}

/**
 * Font Preloader Component
 * Handles strategic preloading of font resources
 */
export function FontPreloader() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const preloadCriticalFonts = () => {
      const criticalFonts = [
        '/fonts/kriptaz/Kriptaz-Regular-400.woff2',
        '/fonts/kriptaz/Kriptaz-Bold-700.woff2',
        '/fonts/kriptaz/Kriptaz-Medium-500.woff2',
      ];

      criticalFonts.forEach((fontPath) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = fontPath;
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };

    // Preload immediately
    preloadCriticalFonts();
  }, []);

  return null;
}

/**
 * Font Loading Strategy Component
 * Implements progressive font loading strategy
 */
export function FontLoadingStrategy({ children }: { children: React.ReactNode }) {
  const [loadingPhase, setLoadingPhase] = useState<'critical' | 'important' | 'complete'>('critical');

  useEffect(() => {
    const loadFontsProgressively = async () => {
      try {
        // Phase 1: Critical fonts (immediate)
        setLoadingPhase('critical');
        
        // Phase 2: Important fonts (after 100ms)
        setTimeout(() => {
          setLoadingPhase('important');
        }, 100);
        
        // Phase 3: All fonts loaded (after 500ms)
        setTimeout(() => {
          setLoadingPhase('complete');
        }, 500);
        
      } catch (error) {
        console.error('Font loading strategy failed:', error);
        setLoadingPhase('complete');
      }
    };

    loadFontsProgressively();
  }, []);

  return (
    <div data-font-phase={loadingPhase}>
      {children}
    </div>
  );
}

/**
 * Font Error Boundary
 * Catches font-related errors and provides fallback
 */
interface FontErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class FontErrorBoundary extends React.Component<
  { children: React.ReactNode },
  FontErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): FontErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Font system error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Font System Error
            </h1>
            <p className="text-gray-600 mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
              The font system encountered an error. Using system fonts as fallback.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
