'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Logo } from '../logo/Logo';
import { Navigation } from '../navigation/Navigation';
import { Resources } from '../resources/Resources';
import { ConnectButton } from '../connect-button/ConnectButton';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking outside or on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const mobileMenu = document.querySelector('[data-mobile-menu]');
      const hamburgerButton = document.querySelector('[data-hamburger-button]');

      if (isMobileMenuOpen &&
          mobileMenu &&
          !mobileMenu.contains(target) &&
          hamburgerButton &&
          !hamburgerButton.contains(target)) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);
  return (
    <header className="sticky top-0 z-50 w-full bg-black backdrop-blur-md">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Testnet */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Logo />
            <div>
              <Image
                src="/images/testnet-image.png"
                alt="Testnet"
                width={60}
                height={24}
                className="h-4 w-auto"
              />
            </div>
          </div>

          {/* Center - Navigation and Resources (Desktop only) */}
          <div className="hidden md:flex items-center space-x-2 flex-1 justify-center">
            <Navigation />
            <Resources />
          </div>

          {/* Right side - Connect Button and Mobile/Tablet Menu */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Connect Button - Always visible */}
            <div className="w-[120px] flex justify-end">
              <ConnectButton />
            </div>

            {/* Mobile/Tablet menu button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative w-8 h-8 flex flex-col justify-center items-center text-gray-300 hover:text-white focus:outline-none focus:text-white cursor-pointer"
                aria-label="Toggle menu"
                data-hamburger-button
              >
                <span className={`block h-0.5 w-7 bg-current transition-all duration-300 ease-in-out absolute ${
                  isMobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'
                }`}></span>
                <span className={`block h-0.5 w-7 bg-current transition-all duration-300 ease-in-out absolute ${
                  isMobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'
                }`}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet menu overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden" style={{ top: '64px' }}>
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
          </div>
        )}

        {/* Mobile/Tablet menu */}
        <div
          className={`fixed right-0 z-50 w-full bg-black md:hidden transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ top: '64px', height: 'calc(100vh - 64px)' }}
          data-mobile-menu
        >
          <div className="flex flex-col h-full overflow-hidden">
            {/* Mobile menu content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div>
                <h3 className="text-white text-lg font-medium mb-4">Navigation</h3>
                <Navigation mobile />
              </div>

              <div>
                <h3 className="text-white text-lg font-medium mb-4">Social Media</h3>
                <div className="grid grid-cols-3 gap-4">
                  <a href="https://twitter.com/kriptazChain" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-4 text-gray-300 hover:text-black hover:bg-white rounded-md transition-all duration-200">
                    <svg className="h-6 w-6 mb-2" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    <span className="text-xs">Twitter</span>
                  </a>
                  <a href="https://linkedin.com/company/kriptazblockchain" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-4 text-gray-300 hover:text-black hover:bg-white rounded-md transition-all duration-200">
                    <svg className="h-6 w-6 mb-2" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    <span className="text-xs">LinkedIn</span>
                  </a>
                  <a href="https://instagram.com/kriptaz" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-4 text-gray-300 hover:text-black hover:bg-white rounded-md transition-all duration-200">
                    <svg className="h-6 w-6 mb-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.014 5.367 18.635.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.897-.875-1.387-2.026-1.387-3.323s.49-2.448 1.297-3.323c.875-.897 2.026-1.387 3.323-1.387s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387z"/></svg>
                    <span className="text-xs">Instagram</span>
                  </a>
                  <a href="https://www.facebook.com/groups/kriptoazerbaijan" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-4 text-gray-300 hover:text-black hover:bg-white rounded-md transition-all duration-200">
                    <svg className="h-6 w-6 mb-2" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    <span className="text-xs">Facebook</span>
                  </a>
                  <a href="https://t.me/kriptoazerbaycancommunity" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-4 text-gray-300 hover:text-black hover:bg-white rounded-md transition-all duration-200">
                    <svg className="h-6 w-6 mb-2" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                    <span className="text-xs">Telegram</span>
                  </a>
                  <a href="https://www.youtube.com/@kriptazChain" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-4 text-gray-300 hover:text-black hover:bg-white rounded-md transition-all duration-200">
                    <svg className="h-6 w-6 mb-2" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    <span className="text-xs">Youtube</span>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-white text-lg font-medium mb-4">Resources</h3>
                <div className="space-y-3">
                  <a href="https://docs.kriptaz.com/" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 text-gray-300 hover:text-black hover:bg-white rounded-md transition-all duration-200">
                    <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <span>Documents</span>
                  </a>
                  <a href="https://drip.tools/" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 text-gray-300 hover:text-black hover:bg-white rounded-md transition-all duration-200">
                    <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                    <span>Faucet</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
