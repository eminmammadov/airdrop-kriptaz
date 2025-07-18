'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaChartBar, FaXTwitter, FaLinkedin, FaInstagram, FaFacebook, FaTelegram, FaYoutube, FaFileExport, FaDroplet } from 'react-icons/fa6';
import { SOCIAL_LINKS, RESOURCE_LINKS } from '@/config/links';

const socialMediaLinks = [
  { name: 'Twitter', href: SOCIAL_LINKS.twitter, icon: FaXTwitter },
  { name: 'LinkedIn', href: SOCIAL_LINKS.linkedin, icon: FaLinkedin },
  { name: 'Instagram', href: SOCIAL_LINKS.instagram, icon: FaInstagram },
  { name: 'Facebook', href: SOCIAL_LINKS.facebookGroup, icon: FaFacebook },
  { name: 'Telegram', href: SOCIAL_LINKS.telegram, icon: FaTelegram },
  { name: 'Youtube', href: SOCIAL_LINKS.youtube, icon: FaYoutube },
];

const resourceLinks = [
  { name: 'Documents', href: RESOURCE_LINKS.docs, icon: FaFileExport },
  { name: 'Faucet', href: RESOURCE_LINKS.faucet, icon: FaDroplet },
];

export function Resources() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex-shrink-0" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center bg-bg backdrop-blur-sm border border-gray-700/50 rounded-md px-3 py-1.5 text-gray-300 hover:text-black hover:bg-white transition-all duration-200 cursor-pointer h-[38px] w-[42px]"
        aria-label="Resources"
      >
        <FaChartBar className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-36 bg-bg backdrop-blur-sm border border-gray-700/50 rounded-md shadow-lg z-50">
          <div className="p-3">
            {/* Social Media Grid */}
            <div className="mb-3">
              <h3 className="text-white text-xs font-medium mb-2">Social Media</h3>
              <div className="grid grid-cols-3 gap-1">
                {socialMediaLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 text-gray-300 hover:text-black hover:bg-white rounded-md transition-all duration-200"
                      title={social.name}
                    >
                      <IconComponent className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Resource Links */}
            <div className="border-t border-gray-700/50 pt-3">
              <h3 className="text-white text-xs font-medium mb-2">Resources</h3>
              <div className="space-y-0.5">
                {resourceLinks.map((resource) => {
                  const IconComponent = resource.icon;
                  return (
                    <a
                      key={resource.name}
                      href={resource.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-1.5 text-gray-300 hover:text-black hover:bg-white rounded-md transition-all duration-200 text-sm font-medium"
                    >
                      <IconComponent className="h-4 w-4 mr-2" />
                      <span>{resource.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
