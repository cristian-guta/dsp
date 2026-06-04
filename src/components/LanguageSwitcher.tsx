import React from 'react';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/i18n/LanguageContext';

interface LanguageSwitcherProps {
  variant?: 'topbar' | 'inline';
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'topbar', className }) => {
  const { language, setLanguage } = useLanguage();

  const baseBtn =
    variant === 'topbar'
      ? 'px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider transition-colors rounded-sm'
      : 'px-2.5 py-1 text-xs font-semibold uppercase tracking-wider transition-colors rounded-sm';

  const activeCls =
    variant === 'topbar'
      ? 'bg-gov-gold text-gov-navy'
      : 'bg-gov-navy text-white';

  const inactiveCls =
    variant === 'topbar'
      ? 'text-white/70 hover:text-white'
      : 'text-muted-foreground hover:text-gov-navy';

  return (
    <div
      className={cn('flex items-center gap-1', className)}
      role="group"
      aria-label="Selector limbă / Language switcher"
    >
      <Globe
        className={cn('w-3 h-3 mr-1', variant === 'topbar' ? 'text-white/70' : 'text-muted-foreground')}
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={() => setLanguage('ro')}
        aria-pressed={language === 'ro'}
        aria-label="Română"
        className={cn(baseBtn, language === 'ro' ? activeCls : inactiveCls)}
      >
        RO
      </button>
      <span
        className={cn(
          'select-none',
          variant === 'topbar' ? 'text-white/30 text-[10px]' : 'text-muted-foreground/40 text-xs'
        )}
      >
        |
      </span>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        aria-label="English"
        className={cn(baseBtn, language === 'en' ? activeCls : inactiveCls)}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
