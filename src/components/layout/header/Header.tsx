'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '@/components/common/logo/Logo';
import { Navigation } from '../navigation/Navigation';
import { Resources } from '@/components/layout/navigation/Resources';
import { ConnectButton } from '@/components/common/buttons/ConnectButton';
import { SOCIAL_LINKS, RESOURCE_LINKS } from '@/config/links';
import {
  FaXTwitter,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaTelegram,
  FaYoutube,
  FaFileExport,
  FaDroplet
} from 'react-icons/fa6';

// Social Media Section Component
const SocialMediaSection = () => {
  const socialMediaLinks = [
    { name: 'Twitter', href: SOCIAL_LINKS.twitter, icon: FaXTwitter },
    { name: 'LinkedIn', href: SOCIAL_LINKS.linkedin, icon: FaLinkedin },
    { name: 'Instagram', href: SOCIAL_LINKS.instagram, icon: FaInstagram },
    { name: 'Facebook', href: SOCIAL_LINKS.facebookGroup, icon: FaFacebook },
    { name: 'Telegram', href: SOCIAL_LINKS.telegram, icon: FaTelegram },
    { name: 'Youtube', href: SOCIAL_LINKS.youtube, icon: FaYoutube },
  ];

  return (
    <div>
      <h3 className="text-white text-lg font-medium mb-3">Social Media</h3>
      <div className="grid grid-cols-3 gap-3">
        {socialMediaLinks.map((social) => {
          const IconComponent = social.icon;
          return (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-3 text-gray-300 hover:text-black hover:bg-white rounded-md transition-all duration-200"
            >
              <IconComponent className="h-5 w-5 mb-1" />
              <span className="text-xs">{social.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

// Resources Section Component
const ResourcesSection = () => {
  const resourceLinks = [
    { name: 'Documents', href: RESOURCE_LINKS.docs, icon: FaFileExport },
    { name: 'Faucet', href: RESOURCE_LINKS.faucet, icon: FaDroplet },
  ];

  return (
    <div className="pb-6">
      <h3 className="text-white text-lg font-medium mb-3">Resources</h3>
      <div className="space-y-2">
        {resourceLinks.map((resource) => {
          const IconComponent = resource.icon;
          return (
            <Link
              key={resource.name}
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-2.5 text-gray-300 hover:text-black hover:bg-white rounded-md transition-all duration-200"
            >
              <IconComponent className="h-4 w-4 mr-3" />
              <span>{resource.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

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
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <h3 className="text-white text-lg font-medium mb-4">Navigation</h3>
                <Navigation mobile />
              </div>

              <SocialMediaSection />

              <ResourcesSection />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
