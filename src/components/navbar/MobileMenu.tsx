
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MobileMenuItem from './MobileMenuItem';
import MobileMenuDropdown from './MobileMenuDropdown';

interface NavLink {
  name: string;
  path: string;
  children?: { name: string; path: string }[];
}

interface MobileMenuProps {
  navLinks: NavLink[];
  isOpen: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ navLinks, isOpen }) => {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-md animate-slide-in-right">
      <nav className="flex flex-col p-4">
        {navLinks.map((link) => {
          // If link has children, display as dropdown
          if (link.children) {
            return (
              <MobileMenuDropdown
                key={link.path}
                name={link.name}
                path={link.path}
                children={link.children}
                isActive={location.pathname.startsWith(link.path)}
              />
            );
          }
          
          // Regular link
          return (
            <MobileMenuItem
              key={link.path}
              to={link.path}
              name={link.name}
              isActive={location.pathname === link.path}
            />
          );
        })}
        <Button
          variant="default"
          className="mt-3 bg-gradient-to-r from-health-600 to-health-700 hover:from-health-700 hover:to-health-600 text-white animate-fade-in transition-all duration-300 transform hover:scale-[1.02]"
        >
          PROGRAMARE ONLINE
        </Button>
      </nav>
    </div>
  );
};

export default MobileMenu;
