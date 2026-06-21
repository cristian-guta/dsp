import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';

type ConsentStatus = 'accepted' | 'rejected';

const CONSENT_STORAGE_KEY = 'dsp:cookie-consent:v1';
const OPEN_POLICY_EVENT = 'dsp:open-privacy-policy';

const CookieConsentBanner: React.FC = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  const copy = useMemo(() => {
    if (language === 'ro') {
      return {
        badge: 'Cookie-uri și confidențialitate',
        title: 'Acest site folosește cookie-uri și respectă politica de confidențialitate',
        description:
          'Folosim cookie-uri esențiale pentru funcționarea site-ului și pentru a salva preferințe precum starea meniului lateral. Poți citi detaliile despre date și confidențialitate înainte de a continua.',
        accept: 'Accept toate',
        reject: 'Doar cele necesare',
        details: 'Vezi politica',
        policyTitle: 'Politica de cookies și confidențialitate',
        policyDescription:
          'Acest site utilizează cookie-uri esențiale pentru funcționarea anumitor componente, precum salvarea stării meniului lateral. Nu folosim cookie-uri de marketing fără consimțământul tău. Datele trimise prin formulare sau prin contact sunt tratate conform legislației aplicabile privind protecția datelor.',
        policyPoints: [
          'Cookie-urile esențiale sunt necesare pentru funcționarea corectă a site-ului.',
          'Preferințele tehnice pot fi salvate local în browser.',
          'Poți continua să folosești site-ul chiar dacă alegi doar cookie-urile necesare.',
          'Pentru întrebări privind datele personale, folosește datele de contact oficiale din pagină.',
        ],
        close: 'Închide',
      };
    }

    return {
      badge: 'Cookies and privacy',
      title: 'This site uses cookies and follows a privacy policy',
      description:
        'We use essential cookies to keep the site working and to save preferences such as the sidebar state. You can read how data and privacy are handled before continuing.',
      accept: 'Accept all',
      reject: 'Necessary only',
      details: 'View policy',
      policyTitle: 'Cookies and Privacy Policy',
      policyDescription:
        'This site uses essential cookies for core functionality, including saving the sidebar state. We do not use marketing cookies without your consent. Data submitted through forms or contact methods is handled according to applicable data protection rules.',
      policyPoints: [
        'Essential cookies are required for proper site operation.',
        'Technical preferences may be stored locally in your browser.',
        'You can still use the site if you choose necessary cookies only.',
        'For questions about personal data, use the official contact details listed on the site.',
      ],
      close: 'Close',
    };
  }, [language]);

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentStatus | null;
    setIsVisible(!stored);

    const openPolicy = () => setIsPolicyOpen(true);
    window.addEventListener(OPEN_POLICY_EVENT, openPolicy);

    return () => window.removeEventListener(OPEN_POLICY_EVENT, openPolicy);
  }, []);

  const saveConsent = (status: ConsentStatus) => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, status);
    setIsVisible(false);
  };

  if (!isVisible) {
    return (
      <Dialog open={isPolicyOpen} onOpenChange={setIsPolicyOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{copy.policyTitle}</DialogTitle>
            <DialogDescription>{copy.policyDescription}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm text-muted-foreground">
            {copy.policyPoints.map((item) => (
              <p key={item} className="leading-relaxed">
                {item}
              </p>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4">
        <div className={cn('mx-auto max-w-4xl rounded-xl border border-border bg-background/98 shadow-2xl backdrop-blur') }>
          <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gov-gold">
                {copy.badge}
              </div>
              <div className="space-y-1">
                <h2 className="text-base font-display font-bold text-foreground sm:text-lg">
                  {copy.title}
                </h2>
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {copy.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:justify-end">
              <Button type="button" variant="outline" className="rounded-sm" onClick={() => saveConsent('rejected')}>
                {copy.reject}
              </Button>
              <Button type="button" variant="outline" className="rounded-sm" onClick={() => setIsPolicyOpen(true)}>
                {copy.details}
              </Button>
              <Button type="button" className="gov-btn-primary rounded-sm" onClick={() => saveConsent('accepted')}>
                {copy.accept}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isPolicyOpen} onOpenChange={setIsPolicyOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{copy.policyTitle}</DialogTitle>
            <DialogDescription>{copy.policyDescription}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm text-muted-foreground">
            {copy.policyPoints.map((item) => (
              <p key={item} className="leading-relaxed">
                {item}
              </p>
            ))}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsPolicyOpen(false)}>
              {copy.close}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsentBanner;