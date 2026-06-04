
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, onClick, href }) => {
  const content = (
    <div className="flex flex-col h-full">
      <div className="mb-4 w-10 h-10 flex items-center justify-center bg-gov-light text-gov-navy rounded-sm group-hover:bg-gov-gold group-hover:text-gov-navy transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-display font-bold mb-2 text-foreground group-hover:text-gov-navy transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm mb-4 flex-grow leading-relaxed">
        {description}
      </p>
      <div className="flex items-center text-gov-navy font-semibold text-sm uppercase tracking-wide">
        <span>Detalii</span>
        <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link to={href} className="gov-card group cursor-pointer block">
        {content}
      </Link>
    );
  }

  return (
    <div className="gov-card group cursor-pointer" onClick={onClick}>
      {content}
    </div>
  );
};

export default ServiceCard;
