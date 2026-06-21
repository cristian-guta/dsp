import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Calendar, Phone, Shield } from 'lucide-react';
import dspHeroImg from '@/assets/dsp-ilfov-hero-optimized.jpg';
import dspHeroNight from '@/assets/dsp-ilfov-night-optimized.jpg';
import euPnrrLogo from '@/assets/eu-pnrr-logo.png';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-[108px] md:pt-[116px]">
      {/* Main Hero */}
      <section className="relative bg-gov-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2 py-[27px] px-0">
                <div className="w-8 h-[2px] bg-gov-gold" />
                <span className="text-gov-gold text-sm font-semibold uppercase tracking-widest">
                  {t('hero.tag')}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight text-primary-foreground">
                {t('hero.title1')} <span className="text-primary-foreground py-[25px]">{t('hero.title2')}</span>
              </h1>
              
              <p className="text-white/70 text-lg max-w-lg leading-relaxed">
                {t('hero.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link to="/contact">
                  <Button size="lg" className="hover:bg-gov-gold-dark font-semibold uppercase text-sm tracking-wide border-primary-foreground rounded-md shadow-md opacity-100 text-primary bg-accent">
                    {t('nav.appointment')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="lg" className="border-white/30 font-semibold uppercase text-sm tracking-wide rounded-sm text-primary bg-accent">
                    {t('hero.ctaServices')}
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:flex flex-col gap-4">
              <div className="bg-white rounded-sm py-2 inline-block self-start px-[21px]">
                <img
                  src={euPnrrLogo}
                  alt={t('hero.euAlt')}
                  className="h-9 md:h-12 w-auto object-contain" />
              </div>
              <div className="relative overflow-hidden rounded-sm">
                <img
                  src={dspHeroImg}
                  alt={t('hero.heroAltDay')}
                  className="w-full h-[380px] object-cover absolute inset-0 hero-day-fade"
                  fetchPriority="high"
                  decoding="async"
                />
                <img
                  src={dspHeroNight}
                  alt={t('hero.heroAltNight')}
                  className="w-full h-[380px] object-cover hero-night-fade"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gov-navy/60 to-transparent opacity-65" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Quick Access Bar */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
            {[
            { icon: <FileText className="h-5 w-5" />, title: t('quick.permits.title'), desc: t('quick.permits.desc'), link: '/services' },
            { icon: <Calendar className="h-5 w-5" />, title: t('quick.vaccination.title'), desc: t('quick.vaccination.desc'), link: '/services' },
            { icon: <Shield className="h-5 w-5" />, title: t('quick.inspection.title'), desc: t('quick.inspection.desc'), link: '/services' },
            { icon: <Phone className="h-5 w-5" />, title: t('quick.consult.title'), desc: t('quick.consult.desc'), link: '/contact' }].
            map((item, i) =>
            <Link
              key={i}
              to={item.link}
              className="flex items-center gap-4 py-5 px-6 group hover:bg-gov-light transition-colors">
              
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gov-light text-gov-navy rounded-sm group-hover:bg-gov-gold group-hover:text-gov-navy transition-colors">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>);

};

export default Hero;