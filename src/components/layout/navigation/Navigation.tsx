'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Staking', href: '/staking' },
  { name: 'Token', href: '/token' },
];

interface NavigationProps {
  mobile?: boolean;
}

export function Navigation({ mobile = false }: NavigationProps) {
  const pathname = usePathname();

  if (mobile) {
    return (
      <nav className="space-y-3">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center p-3 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-white text-black"
                  : "text-gray-300 hover:text-black hover:bg-white"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex items-center bg-desert-sand backdrop-blur-sm rounded-md p-0.5 border border-gray-700/50 flex-shrink-0 gap-0.5">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              isActive
                ? "bg-white text-black shadow-sm"
                : "text-gray-300 hover:text-black hover:bg-white"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
