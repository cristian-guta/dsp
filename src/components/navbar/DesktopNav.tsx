
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from '@/components/ui/button';
import NavLink from './NavLink';
import NavDropdown from './NavDropdown';
import { cn } from '@/lib/utils';

interface NavLink {
  name: string;
  path: string;
  children?: { name: string; path: string }[];
}

interface DesktopNavProps {
  navLinks: NavLink[];
  isLoaded: boolean;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ navLinks, isLoaded }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();

  return (
    <div className={cn(
      "hidden md:flex items-center space-x-1 transition-all duration-700",
      isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <NavigationMenu>
        <NavigationMenuList>
          {navLinks.map((link) => {
            // If link has children, create a dropdown
            if (link.children) {
              return (
                <NavDropdown
                  key={link.path}
                  name={link.name}
                  path={link.path}
                  children={link.children}
                  isActive={location.pathname.startsWith(link.path)}
                  onMouseEnter={() => setHoveredItem(link.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  isHovered={hoveredItem === link.name}
                />
              );
            }
            
            // Regular link without dropdown
            return (
              <NavLink
                key={link.path}
                to={link.path}
                name={link.name}
                isActive={location.pathname === link.path}
                onMouseEnter={() => setHoveredItem(link.name)}
                onMouseLeave={() => setHoveredItem(null)}
                isHovered={hoveredItem === link.name}
              />
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
      
      <Button
        variant="default"
        className="ml-2 bg-gradient-to-r from-health-600 to-health-700 hover:from-health-700 hover:to-health-600 text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
      >
        PROGRAMARE ONLINE
      </Button>
    </div>
  );
};

export default DesktopNav;
