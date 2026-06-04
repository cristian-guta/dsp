
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  isLoaded: boolean;
}

const Logo: React.FC<LogoProps> = ({ isLoaded }) => {
  return (
    <Link to="/" className="flex items-center group">
      <img 
        src={`${import.meta.env.BASE_URL}47168de5-13a9-4172-9c55-6076babd6cfd.png`} 
        alt="DSP Ilfov Logo" 
        className="h-12 mr-3 transition-transform duration-300 group-hover:scale-110" 
      />
      <span className={cn(
        "text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-health-700 to-health-500 hidden md:inline-block transition-all duration-700",
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        "group-hover:text-health-600 uppercase tracking-wide group-hover:scale-105 origin-left"
      )}>
        DIRECȚIA DE SĂNĂTATE PUBLICĂ ILFOV
      </span>
    </Link>
  );
};

export default Logo;
