'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      {/* Desktop and Tablet Logo */}
      <div className="hidden sm:block">
        <Image
          src="/logos/kriptaz_full_white.svg"
          alt="Kriptaz"
          width={120}
          height={32}
          className="h-6 w-auto"
        />
      </div>

      {/* Mobile Logo */}
      <div className="block sm:hidden">
        <Image
          src="/logos/kriptaz_icon_white.svg"
          alt="Kriptaz"
          width={32}
          height={32}
          className="h-6 w-auto"
        />
      </div>
    </Link>
  );
}
