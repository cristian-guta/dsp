import { Accessibility, Plus, Minus, RotateCcw, Eye, Link2, Type, PauseCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useLanguage } from '@/i18n/LanguageContext';

const AccessibilityWidget = () => {
  const { t } = useLanguage();
  const {
    fontScale,
    highContrast,
    underlineLinks,
    dyslexiaFont,
    pauseAnimations,
    increaseFontScale,
    decreaseFontScale,
    toggleHighContrast,
    toggleUnderlineLinks,
    toggleDyslexiaFont,
    togglePauseAnimations,
    reset,
  } = useAccessibility();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          size="icon"
          aria-label={t('a11y.openMenu')}
          className="fixed bottom-5 right-5 z-50 h-12 w-12 rounded-full bg-gov-navy text-white shadow-lg hover:bg-gov-navy-light focus-visible:ring-2 focus-visible:ring-gov-gold print:hidden"
        >
          <Accessibility className="h-6 w-6" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="end"
        sideOffset={12}
        className="w-72 z-50 print:hidden"
      >
        <div className="space-y-4">
          <h2 className="font-display text-base font-semibold text-gov-navy">
            {t('a11y.title')}
          </h2>

          <Separator />

          {/* Font size */}
          <div className="space-y-2">
            <span className="flex items-center gap-2 text-sm font-medium">
              <Type className="h-4 w-4" aria-hidden="true" />
              {t('a11y.fontSize')}
            </span>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label={t('a11y.decrease')}
                onClick={decreaseFontScale}
                disabled={fontScale === 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="min-w-[3ch] text-center text-sm tabular-nums" aria-live="polite">
                {100 + fontScale * 12}%
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label={t('a11y.increase')}
                onClick={increaseFontScale}
                disabled={fontScale === 3}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Toggles */}
          <div className="space-y-1">
            <ToggleRow
              icon={<Eye className="h-4 w-4" aria-hidden="true" />}
              label={t('a11y.highContrast')}
              pressed={highContrast}
              onClick={toggleHighContrast}
            />
            <ToggleRow
              icon={<Link2 className="h-4 w-4" aria-hidden="true" />}
              label={t('a11y.underlineLinks')}
              pressed={underlineLinks}
              onClick={toggleUnderlineLinks}
            />
            <ToggleRow
              icon={<Type className="h-4 w-4" aria-hidden="true" />}
              label={t('a11y.dyslexiaFont')}
              pressed={dyslexiaFont}
              onClick={toggleDyslexiaFont}
            />
            <ToggleRow
              icon={<PauseCircle className="h-4 w-4" aria-hidden="true" />}
              label={t('a11y.pauseAnimations')}
              pressed={pauseAnimations}
              onClick={togglePauseAnimations}
            />
          </div>

          <Separator />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-muted-foreground"
            onClick={reset}
          >
            <RotateCcw className="h-4 w-4" />
            {t('a11y.reset')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

interface ToggleRowProps {
  icon: React.ReactNode;
  label: string;
  pressed: boolean;
  onClick: () => void;
}

const ToggleRow: React.FC<ToggleRowProps> = ({ icon, label, pressed, onClick }) => (
  <button
    type="button"
    role="switch"
    aria-checked={pressed}
    onClick={onClick}
    className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gov-gold"
  >
    <span className="flex items-center gap-2">
      {icon}
      {label}
    </span>
    <span
      className="relative inline-block h-5 w-9 shrink-0 overflow-hidden rounded-full transition-colors duration-200"
      style={{ backgroundColor: pressed ? 'hsl(var(--gov-navy))' : 'hsl(var(--muted-foreground) / 0.3)' }}
    >
      <span
        className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all duration-200"
        style={{ left: pressed ? '18px' : '2px' }}
      />
    </span>
  </button>
);

export default AccessibilityWidget;