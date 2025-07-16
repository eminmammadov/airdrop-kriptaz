'use client';

import React from 'react';
import { KamonadShare } from './KamonadShare';
import { KaPrice } from './KaPrice';
import { FooterLinks } from './FooterLinks';
import Link from 'next/link';
import { Droplets } from 'lucide-react';

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 bg-black/90 backdrop-blur-md border-t border-gray-800/50">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Left side - KamonadShare, Faucet, KaPrice */}
          <div className="flex items-center space-x-6">
            <KamonadShare />

            <Link
              href="https://drip.tools/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              <Droplets className="h-4 w-4" />
              <span className="text-sm font-medium">Faucet</span>
            </Link>

            <KaPrice />
          </div>

          {/* Right side - FooterLinks */}
          <div className="flex items-center">
            <FooterLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}
