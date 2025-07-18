'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { SEOConfig, PageSEOProps } from '@/shared/types/seo';
import { siteConfig, defaultSEO } from '@/config/site';
import { validateSEOConfig } from '@/lib/seo/utils';

interface SEOContextType {
  seoConfig: SEOConfig;
  updateSEO: (config: Partial<SEOConfig>) => void;
  resetSEO: () => void;
  validateCurrentSEO: () => { isValid: boolean; errors: string[]; warnings: string[] };
  isLoading: boolean;
}

const SEOContext = createContext<SEOContextType | null>(null);

interface SEOProviderProps {
  children: React.ReactNode;
  initialConfig?: Partial<SEOConfig>;
}

/**
 * SEO Provider Component
 * Provides SEO context and state management throughout the application
 */
export function SEOProvider({ children, initialConfig = {} }: SEOProviderProps) {
  const [seoConfig, setSeoConfig] = useState<SEOConfig>({
    ...defaultSEO,
    ...initialConfig,
  });
  const [isLoading, setIsLoading] = useState(false);

  const updateSEO = (config: Partial<SEOConfig>) => {
    setIsLoading(true);
    setSeoConfig(prev => ({
      ...prev,
      ...config,
      openGraph: {
        ...prev.openGraph,
        ...config.openGraph,
      },
      twitter: {
        ...prev.twitter,
        ...config.twitter,
      },
      robots: {
        ...prev.robots,
        ...config.robots,
      },
    }));
    setIsLoading(false);
  };

  const resetSEO = () => {
    setSeoConfig({ ...defaultSEO, ...initialConfig });
  };

  const validateCurrentSEO = () => {
    return validateSEOConfig(seoConfig);
  };

  // Update document title when SEO config changes
  useEffect(() => {
    if (typeof window !== 'undefined' && seoConfig.title) {
      document.title = seoConfig.title;
    }
  }, [seoConfig.title]);

  // Update meta description when SEO config changes
  useEffect(() => {
    if (typeof window !== 'undefined' && seoConfig.description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', seoConfig.description);
      }
    }
  }, [seoConfig.description]);

  const contextValue: SEOContextType = {
    seoConfig,
    updateSEO,
    resetSEO,
    validateCurrentSEO,
    isLoading,
  };

  return (
    <SEOContext.Provider value={contextValue}>
      {children}
    </SEOContext.Provider>
  );
}

/**
 * Hook to use SEO context
 */
export function useSEO() {
  const context = useContext(SEOContext);
  if (!context) {
    throw new Error('useSEO must be used within SEOProvider');
  }
  return context;
}

/**
 * Hook for page-specific SEO
 */
export function usePageSEO(pageProps: PageSEOProps, basePath?: string) {
  const { updateSEO } = useSEO();

  useEffect(() => {
    
    updateSEO({
      title: pageProps.title,
      description: pageProps.description,
      keywords: pageProps.keywords,
      canonical: pageProps.canonical,
      robots: {
        index: !pageProps.noindex,
        follow: !pageProps.nofollow,
      },
      openGraph: {
        title: pageProps.title,
        description: pageProps.description,
        type: pageProps.ogType,
        images: pageProps.ogImage ? [{
          url: pageProps.ogImage,
          width: 1200,
          height: 630,
          alt: pageProps.title || siteConfig.name,
        }] : undefined,
      },
      twitter: {
        card: pageProps.twitterCard,
        title: pageProps.title,
        description: pageProps.description,
        images: pageProps.ogImage ? [{
          url: pageProps.ogImage,
          alt: pageProps.title || siteConfig.name,
        }] : undefined,
      },
      structuredData: pageProps.structuredData,
    });
  }, [pageProps, basePath, updateSEO]);
}

/**
 * SEO Debug Component (Development Only)
 */
export function SEODebugger() {
  const { seoConfig, validateCurrentSEO } = useSEO();
  const [showDebugger, setShowDebugger] = useState(false);
  const [validation, setValidation] = useState<ReturnType<typeof validateCurrentSEO> | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setValidation(validateCurrentSEO());
    }
  }, [seoConfig, validateCurrentSEO]);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setShowDebugger(!showDebugger)}
        className="fixed bottom-4 right-20 bg-purple-600 text-white p-2 rounded-full text-xs z-50"
        title="SEO Debugger"
      >
        🔍 SEO
      </button>

      {showDebugger && (
        <div className="fixed bottom-16 right-4 w-96 max-h-96 overflow-auto bg-white border rounded-lg shadow-lg z-50 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">SEO Debug Info</h3>
            <button
              onClick={() => setShowDebugger(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {validation && (
            <div className="mb-4">
              <div className={`p-2 rounded ${validation.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                Status: {validation.isValid ? '✅ Valid' : '❌ Invalid'}
              </div>
              
              {validation.errors.length > 0 && (
                <div className="mt-2">
                  <strong>Errors:</strong>
                  <ul className="list-disc list-inside text-red-600 text-sm">
                    {validation.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {validation.warnings.length > 0 && (
                <div className="mt-2">
                  <strong>Warnings:</strong>
                  <ul className="list-disc list-inside text-yellow-600 text-sm">
                    {validation.warnings.map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="space-y-2 text-sm">
            <div>
              <strong>Title:</strong> {seoConfig.title}
              <span className="text-gray-500 ml-2">({seoConfig.title?.length || 0} chars)</span>
            </div>
            <div>
              <strong>Description:</strong> {seoConfig.description}
              <span className="text-gray-500 ml-2">({seoConfig.description?.length || 0} chars)</span>
            </div>
            <div>
              <strong>Keywords:</strong> {seoConfig.keywords?.join(', ') || 'None'}
            </div>
            <div>
              <strong>Canonical:</strong> {seoConfig.canonical || 'None'}
            </div>
            <div>
              <strong>OG Type:</strong> {seoConfig.openGraph?.type || 'website'}
            </div>
            <div>
              <strong>Twitter Card:</strong> {seoConfig.twitter?.card || 'summary_large_image'}
            </div>
          </div>

          <details className="mt-4">
            <summary className="cursor-pointer font-medium">Full Config</summary>
            <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
              {JSON.stringify(seoConfig, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </>
  );
}

/**
 * SEO Analytics Component
 */
export function SEOAnalytics() {
  const { seoConfig } = useSEO();

  useEffect(() => {
    // Track SEO events
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
      gtag?.('event', 'page_view', {
        page_title: seoConfig.title,
        page_location: window.location.href,
        content_group1: seoConfig.openGraph?.type || 'website',
      });
    }
  }, [seoConfig]);

  return null;
}

export default SEOProvider;
