'use client';

import React, { useState } from 'react';
import { generateSocialSharingUrls } from '@/lib/seo/utils';
import { siteConfig } from '@/config/site';

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
  hashtags?: string[];
  className?: string;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'buttons' | 'icons' | 'dropdown';
}

/**
 * Social Share Component
 * Multi-platform social media sharing with analytics tracking
 */
export function SocialShare({
  url = typeof window !== 'undefined' ? window.location.href : siteConfig.url,
  title = siteConfig.name,
  description = siteConfig.description,
  hashtags = [],

  className = '',
  showLabels = true,
  size = 'md',
  variant = 'buttons',
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  
  const sharingUrls = generateSocialSharingUrls(url, title, description);
  
  const platforms = [
    {
      name: 'Twitter',
      icon: '𝕏',
      url: `${sharingUrls.twitter}${hashtags.length > 0 ? `&hashtags=${hashtags.join(',')}` : ''}`,
      color: 'bg-black hover:bg-gray-800',
      textColor: 'text-white',
    },
    {
      name: 'Facebook',
      icon: '📘',
      url: sharingUrls.facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white',
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: sharingUrls.linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      textColor: 'text-white',
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      url: sharingUrls.whatsapp,
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-white',
    },
    {
      name: 'Telegram',
      icon: '✈️',
      url: sharingUrls.telegram,
      color: 'bg-blue-500 hover:bg-blue-600',
      textColor: 'text-white',
    },
    {
      name: 'Email',
      icon: '📧',
      url: sharingUrls.email,
      color: 'bg-gray-600 hover:bg-gray-700',
      textColor: 'text-white',
    },
  ];

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  const iconSizeClasses = {
    sm: 'w-6 h-6 text-sm',
    md: 'w-8 h-8 text-base',
    lg: 'w-10 h-10 text-lg',
  };

  const handleShare = async (platform: string, shareUrl: string) => {
    // Analytics tracking
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
      gtag?.('event', 'share', {
        method: platform.toLowerCase(),
        content_type: 'page',
        item_id: url,
      });
    }

    // Open sharing URL
    if (platform === 'Email') {
      window.location.href = shareUrl;
    } else {
      window.open(
        shareUrl,
        `share-${platform.toLowerCase()}`,
        'width=600,height=400,scrollbars=yes,resizable=yes'
      );
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      
      // Analytics tracking
      if (typeof window !== 'undefined' && 'gtag' in window) {
        const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
        gtag?.('event', 'share', {
          method: 'copy_link',
          content_type: 'page',
          item_id: url,
        });
      }
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  if (variant === 'dropdown') {
    return (
      <div className={`relative inline-block ${className}`}>
        <details className="group">
          <summary className={`cursor-pointer list-none ${sizeClasses[size]} bg-gray-100 hover:bg-gray-200 rounded-lg border flex items-center gap-2`}>
            <span>📤</span>
            {showLabels && <span>Share</span>}
            <span className="group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
            {platforms.map((platform) => (
              <button
                key={platform.name}
                onClick={() => handleShare(platform.name, platform.url)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 first:rounded-t-lg last:rounded-b-lg"
              >
                <span>{platform.icon}</span>
                <span>{platform.name}</span>
              </button>
            ))}
            <hr className="my-1" />
            <button
              onClick={handleCopyLink}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 rounded-b-lg"
            >
              <span>{copied ? '✅' : '🔗'}</span>
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </details>
      </div>
    );
  }

  if (variant === 'icons') {
    return (
      <div className={`flex gap-2 ${className}`}>
        {platforms.map((platform) => (
          <button
            key={platform.name}
            onClick={() => handleShare(platform.name, platform.url)}
            className={`${iconSizeClasses[size]} ${platform.color} ${platform.textColor} rounded-full flex items-center justify-center transition-colors`}
            title={`Share on ${platform.name}`}
            aria-label={`Share on ${platform.name}`}
          >
            {platform.icon}
          </button>
        ))}
        <button
          onClick={handleCopyLink}
          className={`${iconSizeClasses[size]} bg-gray-600 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-colors`}
          title={copied ? 'Copied!' : 'Copy Link'}
          aria-label={copied ? 'Copied!' : 'Copy Link'}
        >
          {copied ? '✅' : '🔗'}
        </button>
      </div>
    );
  }

  // Default: buttons variant
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {platforms.map((platform) => (
        <button
          key={platform.name}
          onClick={() => handleShare(platform.name, platform.url)}
          className={`${sizeClasses[size]} ${platform.color} ${platform.textColor} rounded-lg transition-colors flex items-center gap-2`}
        >
          <span>{platform.icon}</span>
          {showLabels && <span>{platform.name}</span>}
        </button>
      ))}
      <button
        onClick={handleCopyLink}
        className={`${sizeClasses[size]} bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2`}
      >
        <span>{copied ? '✅' : '🔗'}</span>
        {showLabels && <span>{copied ? 'Copied!' : 'Copy Link'}</span>}
      </button>
    </div>
  );
}

/**
 * Social Share Button for specific platform
 */
interface SocialShareButtonProps {
  platform: 'twitter' | 'facebook' | 'linkedin' | 'whatsapp' | 'telegram' | 'email';
  url?: string;
  title?: string;
  description?: string;
  hashtags?: string[];
  className?: string;
  children?: React.ReactNode;
}

export function SocialShareButton({
  platform,
  url = typeof window !== 'undefined' ? window.location.href : siteConfig.url,
  title = siteConfig.name,
  description = siteConfig.description,
  hashtags = [],
  className = '',
  children,
}: SocialShareButtonProps) {
  const sharingUrls = generateSocialSharingUrls(url, title, description);
  
  const platformConfig = {
    twitter: { url: `${sharingUrls.twitter}${hashtags.length > 0 ? `&hashtags=${hashtags.join(',')}` : ''}`, icon: '𝕏' },
    facebook: { url: sharingUrls.facebook, icon: '📘' },
    linkedin: { url: sharingUrls.linkedin, icon: '💼' },
    whatsapp: { url: sharingUrls.whatsapp, icon: '💬' },
    telegram: { url: sharingUrls.telegram, icon: '✈️' },
    email: { url: sharingUrls.email, icon: '📧' },
  };

  const config = platformConfig[platform];

  const handleClick = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
      gtag?.('event', 'share', {
        method: platform,
        content_type: 'page',
        item_id: url,
      });
    }

    if (platform === 'email') {
      window.location.href = config.url;
    } else {
      window.open(
        config.url,
        `share-${platform}`,
        'width=600,height=400,scrollbars=yes,resizable=yes'
      );
    }
  };

  return (
    <button
      onClick={handleClick}
      className={className}
      aria-label={`Share on ${platform}`}
    >
      {children || config.icon}
    </button>
  );
}

export default SocialShare;
