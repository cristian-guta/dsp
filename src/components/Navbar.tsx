
import React, { useState, useEffect } from 'react';
import euPnrrLogo from '@/assets/eu-pnrr-logo.png';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X, Phone, Mail, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import NavDropdown from './navbar/NavDropdown';

import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/i18n/LanguageContext';
import type { TranslationKey } from '@/i18n/translations';

interface NavLinkChild { nameKey: TranslationKey; path: string }
interface NavLinkItem { nameKey: TranslationKey; path: string; children?: NavLinkChild[] }

const navLinks: NavLinkItem[] = [
  { nameKey: 'nav.home', path: '/' },
  { nameKey: 'nav.news', path: '/news' },
  {
    nameKey: 'nav.services',
    path: '/services',
    children: [
      { nameKey: 'nav.permits', path: '/services/permits' },
      { nameKey: 'nav.vaccination', path: '/services/vaccination' },
      { nameKey: 'nav.monitoring', path: '/services/monitoring' },
      { nameKey: 'nav.promotion', path: '/services/promotion' },
    ],
  },
  {
    nameKey: 'nav.publicInfo',
    path: '/public-info',
    children: [
      { nameKey: 'nav.organigrama', path: '/public-info/organigrama' },
      { nameKey: 'nav.press', path: '/public-info/press' },
      { nameKey: 'nav.jobs', path: '/public-info/jobs' },
    ],
  },
  { nameKey: 'nav.contact', path: '/contact' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Government Top Bar */}
      <div className="gov-top-bar">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3" /> {t('topbar.phone')}
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Mail className="w-3 h-3" /> {t('topbar.email')}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:flex items-center gap-1.5 text-white/70">
              <Clock className="w-3 h-3" />
              <span>{t('topbar.hours')}</span>
            </span>
            <LanguageSwitcher variant="topbar" />
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className={cn('transition-all duration-300 bg-white border-b', isScrolled ? 'border-border shadow-sm' : 'border-transparent'
      )}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 md:gap-5 min-w-0">
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}47168de5-13a9-4172-9c55-6076babd6cfd.png`}
                alt="Stema DSP Ilfov"
                className="h-10 md:h-12 select-none"
              />
              <div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-gov-navy leading-tight">
                  {t('brand.line1')}
                </div>
                <div className="text-[10px] md:text-xs font-semibold text-gov-gold-dark uppercase tracking-widest text-accent">
                  {t('brand.line2')}
                </div>
              </div>
            </Link>

          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-0">
                {navLinks.map((link) => {
                  if (link.children) {
                    return (
                      <NavDropdown
                        key={link.path}
                        name={t(link.nameKey)}
                        path={link.path}
                        children={link.children.map((c) => ({ name: t(c.nameKey), path: c.path }))}
                        isActive={location.pathname.startsWith(link.path)}
                        onMouseEnter={() => {}}
                        onMouseLeave={() => {}}
                        isHovered={false} />);


                  }
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={cn(
                        'px-4 py-2 text-[13px] font-semibold uppercase tracking-wide transition-colors duration-200',
                        location.pathname === link.path ?
                        'text-gov-navy border-b-2 border-gov-gold' :
                        'text-muted-foreground hover:text-gov-navy'
                      )}>
                      
                      {t(link.nameKey)}
                    </Link>);

                })}
              </NavigationMenuList>
            </NavigationMenu>
            
            <Link
              to="/contact"
              className="ml-4 gov-btn-primary rounded-sm text-[sidebar-primary-foreground] shadow-md border-primary bg-primary-foreground text-accent">
              
              {t('nav.appointment')}
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gov-navy"
            aria-label={isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}>
            
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* EU/PNRR Identity - Mobile */}
      <div className="lg:hidden bg-gov-light border-b border-border py-2 px-4 flex justify-center">
        <div className="bg-white rounded-sm px-3 py-1.5 inline-block">
          <img
            src={euPnrrLogo}
            alt={t('hero.euAlt')}
            className="h-7 w-auto object-contain" />
          
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen &&
      <div className="lg:hidden bg-white border-b border-border shadow-lg animate-fade-in">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) =>
          <React.Fragment key={link.path}>
                <Link
              to={link.path}
              className={cn(
                'px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors rounded-sm',
                location.pathname === link.path ?
                'bg-gov-light text-gov-navy border-l-3 border-gov-gold' :
                'text-muted-foreground hover:bg-secondary hover:text-gov-navy'
              )}>
              
                  {t(link.nameKey)}
                </Link>
                {link.children?.map((child) =>
            <Link
              key={child.path}
              to={child.path}
              className="pl-8 py-2 text-sm text-muted-foreground hover:text-gov-navy transition-colors">
              
                    {t(child.nameKey)}
                  </Link>
            )}
              </React.Fragment>
          )}
            <div className="flex items-center justify-center pt-3">
              <LanguageSwitcher variant="inline" />
            </div>
            <Link to="/contact" className="gov-btn-primary text-xs rounded-sm text-center mt-2">
              {t('nav.appointment')}
            </Link>
          </nav>
        </div>
      }
    </header>);

};

export default Navbar;
