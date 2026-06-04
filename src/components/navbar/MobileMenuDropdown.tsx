
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropdownItem {
  name: string;
  path: string;
}

interface MobileMenuDropdownProps {
  name: string;
  path: string;
  children: DropdownItem[];
  isActive: boolean;
}

const MobileMenuDropdown: React.FC<MobileMenuDropdownProps> = ({ name, path, children, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'px-4 py-3 rounded-md font-medium transition-all duration-300 flex justify-between items-center',
          isActive
            ? 'text-health-600 bg-health-50'
            : 'text-gray-600 hover:text-health-500 hover:bg-gray-100/50'
        )}
      >
        {name}
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform duration-300",
          isOpen ? "transform rotate-180" : ""
        )} />
      </button>
      
      {isOpen && (
        <div className="ml-4 mt-1 animate-fade-in space-y-1">
          {children.map((child) => (
            <Link
              key={child.path}
              to={child.path}
              className="px-4 py-2 rounded-md font-medium transition-all duration-300 block text-gray-600 hover:text-health-500 hover:bg-health-50 hover:scale-[1.02] transform origin-left"
            >
              {child.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileMenuDropdown;
