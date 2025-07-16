'use client';

import React, { JSX } from 'react';
import { cn } from '@/lib/utils';
import { useGracefulFontDegradation } from '@/hooks/useFonts';
import type { FontComponentProps } from '@/types/fonts';

/**
 * Adaptive Typography Component
 * Automatically switches between primary and fallback fonts based on loading status
 */
interface AdaptiveTypographyProps extends FontComponentProps {
  as?: keyof React.JSX.IntrinsicElements;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  primaryFont?: string;
  showFallbackIndicator?: boolean;
}

export function AdaptiveTypography({
  as: Component = 'p',
  size = 'base',
  primaryFont = 'Kriptaz',
  weight = 'normal',
  className,
  children,
  showFallbackIndicator = false,
  ...props
}: AdaptiveTypographyProps) {
  const { fontFamily, isUsingFallback, error } = useGracefulFontDegradation(primaryFont);

  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
  };

  return (
    <div className="relative">
      <Component
        className={cn(
          `font-${weight}`,
          sizeClasses[size],
          className
        )}
        style={{ fontFamily }}
        {...props}
      >
        {children}
      </Component>
      
      {/* Fallback Indicator (Development Only) */}
      {showFallbackIndicator && process.env.NODE_ENV === 'development' && (
        <div className="absolute -top-1 -right-1">
          {isUsingFallback ? (
            <span className="inline-block w-2 h-2 bg-orange-500 rounded-full" title="Using fallback font" />
          ) : (
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full" title="Using primary font" />
          )}
        </div>
      )}
      
      {/* Error Indicator */}
      {error && process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-red-500 mt-1">
          Font Error: {error.message}
        </div>
      )}
    </div>
  );
}

/**
 * Adaptive Heading Component
 */
interface AdaptiveHeadingProps extends Omit<AdaptiveTypographyProps, 'as' | 'size'> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export function AdaptiveHeading({ level, weight = 'bold', ...props }: AdaptiveHeadingProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  
  const sizeMap = {
    1: '4xl',
    2: '3xl',
    3: '2xl',
    4: 'xl',
    5: 'lg',
    6: 'base',
  } as const;

  return (
    <AdaptiveTypography
      as={Component}
      size={sizeMap[level]}
      weight={weight}
      {...props}
    />
  );
}

/**
 * Adaptive Text Component
 */
interface AdaptiveTextProps extends Omit<AdaptiveTypographyProps, 'as'> {
  variant?: 'body' | 'caption' | 'overline';
}

export function AdaptiveText({ variant = 'body', ...props }: AdaptiveTextProps) {
  const variantStyles = {
    body: { size: 'base' as const, weight: 'normal' as const },
    caption: { size: 'sm' as const, weight: 'light' as const },
    overline: { size: 'xs' as const, weight: 'medium' as const },
  };

  const { size, weight } = variantStyles[variant];

  return (
    <AdaptiveTypography
      as="p"
      size={size}
      weight={weight}
      {...props}
    />
  );
}

/**
 * Adaptive Display Component
 */
interface AdaptiveDisplayProps extends Omit<AdaptiveTypographyProps, 'as' | 'size'> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function AdaptiveDisplay({ size = 'md', weight = 'bold', ...props }: AdaptiveDisplayProps) {
  const sizeMap = {
    sm: '4xl',
    md: '5xl',
    lg: '6xl',
    xl: '6xl',
  } as const;

  return (
    <AdaptiveTypography
      as="h1"
      size={sizeMap[size]}
      weight={weight}
      {...props}
    />
  );
}

/**
 * Font Status Indicator Component
 */
export function FontStatusIndicator({ 
  fontFamily = 'Kriptaz',
  className 
}: { 
  fontFamily?: string;
  className?: string;
}) {
  const { isUsingFallback, error } = useGracefulFontDegradation(fontFamily);

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className={cn('inline-flex items-center gap-2 text-xs', className)}>
      <div className={`w-2 h-2 rounded-full ${
        error ? 'bg-red-500' : isUsingFallback ? 'bg-orange-500' : 'bg-green-500'
      }`} />
      <span className="text-gray-600">
        {error ? 'Error' : isUsingFallback ? 'Fallback' : 'Primary'}
      </span>
    </div>
  );
}
