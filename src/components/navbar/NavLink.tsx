
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  to: string;
  name: string;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isHovered: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ 
  to, 
  name, 
  isActive, 
  onMouseEnter, 
  onMouseLeave,
  isHovered 
}) => {
  return (
    <Link
      to={to}
      className={cn(
        'px-4 py-2 rounded-md font-medium transition-all duration-300 inline-block relative',
        isActive
          ? 'text-health-600'
          : 'text-gray-600 hover:text-health-500 hover:bg-gray-100/50',
        isHovered ? 'scale-105' : ''
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {name}
      {isActive && (
        <span className="absolute -bottom-1 left-4 right-4 h-0.5 bg-health-500 rounded-full animate-pulse"></span>
      )}
    </Link>
  );
};

export default NavLink;
