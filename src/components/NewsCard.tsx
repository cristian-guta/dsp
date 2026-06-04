
import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/i18n/LanguageContext';

interface NewsCardProps {
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  url: string;
  featured?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, excerpt, date, image, url, featured = false }) => {
  const { t } = useLanguage();
  return (
    <div className={cn(
      "gov-card group overflow-hidden p-0",
      featured && "col-span-1 md:col-span-2"
    )}>
      <div className={cn("grid gap-0", featured ? "md:grid-cols-2" : "grid-cols-1")}>
        {image && (
          <div className="overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center text-muted-foreground mb-3">
            <Calendar size={14} className="mr-2" />
            <span className="text-xs font-medium uppercase tracking-wide">{date}</span>
          </div>
          
          <h3 className={cn(
            "font-display font-bold mb-3 text-foreground group-hover:text-gov-navy transition-colors",
            featured ? "text-xl" : "text-lg"
          )}>
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">{excerpt}</p>
          
          <Link to={url} className="inline-flex items-center text-gov-navy font-semibold text-sm uppercase tracking-wide hover:text-gov-gold-dark transition-colors">
            {t('common.readMore')} <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
