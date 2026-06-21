
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import type { TranslationKey } from '@/i18n/translations';

const openPrivacyPolicy = () => {
  window.dispatchEvent(new Event('dsp:open-privacy-policy'));
};

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const navLinks: { nameKey: TranslationKey; path: string }[] = [
    { nameKey: 'footer.link.home', path: '/' },
    { nameKey: 'footer.link.news', path: '/news' },
    { nameKey: 'footer.link.services', path: '/services' },
    { nameKey: 'footer.link.contact', path: '/contact' },
  ];

  const serviceKeys: TranslationKey[] = [
    'footer.svc.permits',
    'footer.svc.certificates',
    'footer.svc.programs',
    'footer.svc.vaccination',
    'footer.svc.inspection',
  ];

  return (
    <footer className="bg-gov-navy text-white">
      {/* Gold accent line */}
      <div className="h-1 bg-gov-gold" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div>
                <div className="font-bold text-sm uppercase tracking-wide text-accent">{t('footer.brand')}</div>
                <div className="text-xs text-white/50 uppercase tracking-wider">{t('footer.institution')}</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              {t('footer.about')}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-gov-gold">{t('footer.navigation')}</h3>
            <ul className="space-y-2">
              {navLinks.map((link) =>
              <li key={link.path}>
                  <Link to={link.path} className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center">
                    <ChevronRight size={14} className="mr-1.5" />
                    {t(link.nameKey)}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-gov-gold">{t('footer.services')}</h3>
            <ul className="space-y-2">
              {serviceKeys.map((key) =>
              <li key={key}>
                  <Link to="/services" className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center">
                    <ChevronRight size={14} className="mr-1.5" />
                    {t(key)}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-gov-gold">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gov-gold mt-0.5 flex-shrink-0" />
                <span className="text-white/60 text-sm">{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gov-gold flex-shrink-0" />
                <span className="text-white/60 text-sm">021.224.45.96</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gov-gold flex-shrink-0" />
                <a href="mailto:office@dspilfov.ro" className="text-white/60 hover:text-white text-sm transition-colors">
                  office@dspilfov.ro
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} {t('footer.brand')}. {t('footer.rights')}
          </p>
          <div className="flex gap-6">
            <button type="button" onClick={openPrivacyPolicy} className="text-xs text-white/40 hover:text-white/70 transition-colors">
              {t('footer.privacy')}
            </button>
            <button type="button" onClick={openPrivacyPolicy} className="text-xs text-white/40 hover:text-white/70 transition-colors">
              {t('footer.terms')}
            </button>
            <button type="button" onClick={openPrivacyPolicy} className="text-xs text-white/40 hover:text-white/70 transition-colors">
              {t('footer.gdpr')}
            </button>
          </div>
        </div>
      </div>
    </footer>);

};

export default Footer;
