'use client';

import React from 'react';
import { IoShareSocial } from 'react-icons/io5';
import { SHARING_TEMPLATES, generateSocialShareUrl } from '@/config/links';

export function KamonadShare() {
  const tweetUrl = generateSocialShareUrl('twitter', SHARING_TEMPLATES.twitter.kamonad);

  return (
    <a
      href={tweetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
    >
      <IoShareSocial className="h-4 w-4" />
      <span className="text-sm font-medium">kamonad</span>
    </a>
  );
}
