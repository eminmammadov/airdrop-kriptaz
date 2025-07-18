'use client';

import { usePathname } from 'next/navigation';
import { FontOptimizationProvider } from '@/components/typography/fonts/FontPerformanceMonitor';
import { HybridFontLoader, FontLoadingStrategy, FontErrorBoundary } from '@/components/typography/fonts/HybridFontLoader';

/**
 * Layout Wrapper Component
 * Provides conditional rendering logic based on current route
 */
export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Determine if we're on a test page
  const isTestPage = pathname?.startsWith('/fonts-test') || 
                     pathname?.startsWith('/api-test') || 
                     pathname?.startsWith('/ui-test');
  
  return (
    <FontErrorBoundary>
      <FontOptimizationProvider>
        <FontLoadingStrategy>
          <HybridFontLoader 
            showLoadingState={isTestPage}
            showStatusIndicator={isTestPage}
          >
            {children}
          </HybridFontLoader>
        </FontLoadingStrategy>
      </FontOptimizationProvider>
    </FontErrorBoundary>
  );
}
