'use client';

import React from 'react';
import { Twitter } from 'lucide-react';

export function KamonadShare() {
  const tweetText = "woke up bullish on @monad_xyz! kaMonad by @kriptazChain";
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  return (
    <a
      href={tweetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
    >
      <Twitter className="h-4 w-4" />
      <span className="text-sm font-medium">kamonad</span>
    </a>
  );
}
