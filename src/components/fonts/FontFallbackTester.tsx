'use client';

import React, { useState } from 'react';
import { useFontFallback, useGracefulFontDegradation, useFontLoading } from '@/hooks/useFonts';
import { Heading } from './Typography';

/**
 * Font Fallback Tester Component
 * Provides interactive testing for font fallback mechanisms
 */
export function FontFallbackTester() {
  const { 
    currentFont, 
    isFallbackLoaded, 
    fontFamily, 
    forceFallback, 
    resetToPrimary 
  } = useFontFallback();
  
  const { 
    fontFamily: gracefulFontFamily, 
    isUsingFallback, 
    error 
  } = useGracefulFontDegradation();
  
  const { isLoaded, isLoading } = useFontLoading('Kriptaz');
  
  const [testText, setTestText] = useState('The quick brown fox jumps over the lazy dog');

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border border-blue-200">
      <Heading level={3} weight="bold" className="text-gray-800">
        Font Fallback System Tester
      </Heading>

      {/* Status Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <Heading level={4} weight="demibold" className="mb-3 text-gray-800">
            Current Status
          </Heading>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="font-medium">Primary Font Loaded:</span>
              <span className={isLoaded ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                {isLoaded ? '✅ Yes' : '❌ No'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Loading:</span>
              <span className={isLoading ? 'text-yellow-600 font-semibold' : 'text-green-600 font-semibold'}>
                {isLoading ? '⏳ Yes' : '✅ Complete'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Current Font:</span>
              <span className={currentFont === 'primary' ? 'text-blue-600 font-semibold' : 'text-orange-600 font-semibold'}>
                {currentFont === 'primary' ? '🎨 Kriptaz' : '🔄 Fallback'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Fallback Loaded:</span>
              <span className={isFallbackLoaded ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                {isFallbackLoaded ? '✅ Yes' : '❌ No'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Using Graceful Fallback:</span>
              <span className={isUsingFallback ? 'text-orange-600 font-semibold' : 'text-green-600 font-semibold'}>
                {isUsingFallback ? '✅ Yes' : '❌ No'}
              </span>
            </div>
            {error && (
              <div className="p-2 bg-red-50 border border-red-200 rounded text-red-700 text-xs">
                <strong>Error:</strong> {error.message}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <Heading level={4} weight="demibold" className="mb-3 text-gray-800">
            Font Family Info
          </Heading>
          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <span className="font-medium text-gray-800">Current:</span>
              <code className="ml-2 bg-gray-100 px-2 py-1 rounded text-xs text-gray-800 border">
                {fontFamily}
              </code>
            </div>
            <div>
              <span className="font-medium text-gray-800">Graceful:</span>
              <code className="ml-2 bg-gray-100 px-2 py-1 rounded text-xs text-gray-800 border">
                {gracefulFontFamily}
              </code>
            </div>
          </div>
        </div>
      </div>
      
      {/* Control Panel */}
      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <Heading level={4} weight="demibold" className="mb-4 text-gray-800">
          Test Controls
        </Heading>
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={forceFallback}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium shadow-sm"
          >
            🔄 Force Fallback
          </button>
          <button
            onClick={resetToPrimary}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            🎨 Reset to Primary
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium shadow-sm"
          >
            🔄 Reload Page
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-800">
            Test Text:
          </label>
          <input
            type="text"
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-white"
            placeholder="Enter text to test font rendering..."
          />
        </div>
      </div>
      
      {/* Font Rendering Tests */}
      <div className="space-y-6">
        <Heading level={4} weight="demibold" className="text-gray-800">
          Font Rendering Tests
        </Heading>

        {/* Primary Font Test */}
        <div className="p-5 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded">
              🎨 Primary Font (Kriptaz)
            </span>
          </div>
          <div
            className="font-kriptaz text-2xl mb-4 text-gray-800 p-3 bg-gray-50 rounded border"
            style={{ fontFamily: "'Kriptaz', system-ui, sans-serif" }}
          >
            {testText}
          </div>
          <div className="text-sm text-gray-700">
            <span className="font-medium text-gray-800">Font weights:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="font-kriptaz font-thin px-2 py-1 bg-gray-100 rounded text-gray-800">Thin</span>
              <span className="font-kriptaz font-light px-2 py-1 bg-gray-100 rounded text-gray-800">Light</span>
              <span className="font-kriptaz font-normal px-2 py-1 bg-gray-100 rounded text-gray-800">Normal</span>
              <span className="font-kriptaz font-medium px-2 py-1 bg-gray-100 rounded text-gray-800">Medium</span>
              <span className="font-kriptaz font-demibold px-2 py-1 bg-gray-100 rounded text-gray-800">DemiBold</span>
              <span className="font-kriptaz font-bold px-2 py-1 bg-gray-100 rounded text-gray-800">Bold</span>
            </div>
          </div>
        </div>
        
        {/* Fallback Font Test */}
        <div className="p-5 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-sm font-semibold text-orange-700 bg-orange-100 px-2 py-1 rounded">
              🔄 Fallback Font (Inter via Google Fonts)
            </span>
          </div>
          <div
            className="text-2xl mb-4 text-gray-800 p-3 bg-gray-50 rounded border"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {testText}
          </div>
          <div className="text-sm text-gray-700">
            <span className="font-medium text-gray-800">Font weights:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="font-thin px-2 py-1 bg-gray-100 rounded text-gray-800" style={{ fontFamily: "'Inter', system-ui" }}>Thin</span>
              <span className="font-light px-2 py-1 bg-gray-100 rounded text-gray-800" style={{ fontFamily: "'Inter', system-ui" }}>Light</span>
              <span className="font-normal px-2 py-1 bg-gray-100 rounded text-gray-800" style={{ fontFamily: "'Inter', system-ui" }}>Normal</span>
              <span className="font-medium px-2 py-1 bg-gray-100 rounded text-gray-800" style={{ fontFamily: "'Inter', system-ui" }}>Medium</span>
              <span className="font-semibold px-2 py-1 bg-gray-100 rounded text-gray-800" style={{ fontFamily: "'Inter', system-ui" }}>SemiBold</span>
              <span className="font-bold px-2 py-1 bg-gray-100 rounded text-gray-800" style={{ fontFamily: "'Inter', system-ui" }}>Bold</span>
            </div>
          </div>
        </div>

        {/* System Font Test */}
        <div className="p-5 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">
              🖥️ System Font (Final Fallback)
            </span>
          </div>
          <div
            className="text-2xl mb-4 text-gray-800 p-3 bg-gray-50 rounded border"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            {testText}
          </div>
          <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded border border-yellow-200">
            <strong>Note:</strong> This is the final fallback when all custom fonts fail to load.
            It uses the operating system&apos;s default fonts for maximum compatibility.
          </div>
        </div>
        
        {/* Current Active Font */}
        <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-sm font-semibold text-blue-800 bg-blue-100 px-2 py-1 rounded">
              ⚡ Currently Active Font ({currentFont})
            </span>
          </div>
          <div
            className="text-2xl mb-4 text-gray-800 p-3 bg-white rounded border"
            style={{ fontFamily: gracefulFontFamily }}
          >
            {testText}
          </div>
          <div className="text-sm text-blue-700 bg-blue-100 p-3 rounded border border-blue-200">
            <strong>Graceful Degradation:</strong> This text uses the graceful degradation system and will automatically
            switch between primary and fallback fonts based on loading status.
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="p-5 bg-white rounded-lg border border-gray-200 shadow-sm">
        <Heading level={4} weight="demibold" className="mb-4 text-gray-800">
          Performance Notes
        </Heading>
        <div className="text-sm text-gray-700 space-y-3">
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-bold">•</span>
            <span>Primary fonts are preloaded for critical weights (400, 500, 700)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Fallback fonts load from Google Fonts CDN when needed</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">•</span>
            <span>System fonts provide instant fallback with no network requests</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-orange-600 font-bold">•</span>
            <span>Font-display: swap prevents invisible text during font load</span>
          </div>
        </div>
      </div>
    </div>
  );
}
