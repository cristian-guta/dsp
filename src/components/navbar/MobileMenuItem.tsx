
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface MobileMenuItemProps {
  to: string;
  name: string;
  isActive: boolean;
}

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({ to, name, isActive }) => {
  return (
    <Link
      to={to}
      className={cn(
        'px-4 py-3 rounded-md font-medium transition-all duration-300 block relative',
        isActive
          ? 'text-health-600 bg-health-50'
          : 'text-gray-600 hover:text-health-500 hover:bg-gray-100/50'
      )}
    >
      {name}
      {isActive && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-health-500 rounded-full"></span>
      )}
    </Link>
  );
};

export default MobileMenuItem;
