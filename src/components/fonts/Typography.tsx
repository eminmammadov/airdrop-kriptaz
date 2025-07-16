'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { FontComponentProps } from '@/types/fonts';

/**
 * Base Typography component with Kriptaz font support
 */
interface TypographyProps extends FontComponentProps {
  as?: keyof React.JSX.IntrinsicElements;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
}

export function Typography({
  as: Component = 'p',
  family = 'kriptaz',
  weight = 'normal',
  size = 'base',
  className,
  children,
  ...props
}: TypographyProps) {
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
    <Component
      className={cn(
        `font-${family}`,
        `font-${weight}`,
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Heading component with predefined styles
 */
interface HeadingProps extends Omit<TypographyProps, 'as' | 'size'> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Heading({ level, weight = 'bold', ...props }: HeadingProps) {
  const Component = `h${level}` as keyof React.JSX.IntrinsicElements;
  
  const sizeMap = {
    1: '4xl',
    2: '3xl',
    3: '2xl',
    4: 'xl',
    5: 'lg',
    6: 'base',
  } as const;

  return (
    <Typography
      as={Component}
      size={sizeMap[level]}
      weight={weight}
      {...props}
    />
  );
}

/**
 * Text component for body text
 */
interface TextProps extends Omit<TypographyProps, 'as'> {
  variant?: 'body' | 'caption' | 'overline';
}

export function Text({ variant = 'body', ...props }: TextProps) {
  const variantStyles = {
    body: { size: 'base' as const, weight: 'normal' as const },
    caption: { size: 'sm' as const, weight: 'light' as const },
    overline: { size: 'xs' as const, weight: 'medium' as const },
  };

  const { size, weight } = variantStyles[variant];

  return (
    <Typography
      as="p"
      size={size}
      weight={weight}
      {...props}
    />
  );
}

/**
 * Display component for large text
 */
interface DisplayProps extends Omit<TypographyProps, 'as' | 'size'> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Display({ size = 'md', weight = 'bold', ...props }: DisplayProps) {
  const sizeMap = {
    sm: '4xl',
    md: '5xl',
    lg: '6xl',
    xl: '6xl',
  } as const;

  return (
    <Typography
      as="h1"
      size={sizeMap[size]}
      weight={weight}
      {...props}
    />
  );
}

/**
 * Code component with monospace fallback
 */
interface CodeProps extends Omit<TypographyProps, 'family'> {
  inline?: boolean;
}

export function Code({ inline = true, className, children, ...props }: CodeProps) {
  const Component = inline ? 'code' : 'pre';
  
  return (
    <Typography
      as={Component}
      family="mono"
      className={cn(
        'bg-gray-100 dark:bg-gray-800 rounded px-1',
        !inline && 'p-4 overflow-x-auto',
        className
      )}
      {...props}
    >
      {children}
    </Typography>
  );
}
