'use client';

import React from 'react';
import { Twitter, FileText } from 'lucide-react';

export function FooterLinks() {
  return (
    <div className="flex items-center space-x-6">
      <a
        href="https://docs.kriptaz.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
      >
        <FileText className="h-4 w-4" />
        <span className="text-sm font-medium">Docs</span>
      </a>

      <a
        href="https://twitter.com/kriptazChain"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
      >
        <Twitter className="h-4 w-4" />
      </a>
    </div>
  );
}
