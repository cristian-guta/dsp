
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface DropdownItem {
  name: string;
  path: string;
}

interface NavDropdownProps {
  name: string;
  path: string;
  children: DropdownItem[];
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isHovered: boolean;
}

const NavDropdown: React.FC<NavDropdownProps> = ({
  name,
  path,
  children,
  isActive,
}) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger 
        className={cn(
          'px-4 py-2 text-[13px] font-semibold uppercase tracking-wide transition-colors duration-200 bg-transparent',
          isActive
            ? 'text-gov-navy'
            : 'text-muted-foreground hover:text-gov-navy'
        )}
      >
        {name}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-0 p-2 w-[260px] bg-white shadow-lg border border-border rounded-sm">
          {children.map((child) => (
            <li key={child.path}>
              <NavigationMenuLink asChild>
                <Link
                  to={child.path}
                  className="block px-4 py-3 text-sm text-foreground hover:bg-gov-light hover:text-gov-navy transition-colors border-l-2 border-transparent hover:border-gov-gold"
                >
                  {child.name}
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default NavDropdown;
