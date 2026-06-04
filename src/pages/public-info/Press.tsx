
import React from 'react';
import SEO from '@/components/SEO';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Newspaper, Mail, Phone, ExternalLink } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import type { TranslationKey } from '@/i18n/translations';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }
  })
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const listItem = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35 } }
};

const Press = () => {
  const { t, language } = useLanguage();
  const dateLocale = language === 'ro' ? 'ro-RO' : 'en-US';

  const pressReleases: { date: string; titleKey: TranslationKey; summaryKey: TranslationKey }[] = [
    { date: '2024-03-05', titleKey: 'press.pr1.title', summaryKey: 'press.pr1.summary' },
    { date: '2024-02-20', titleKey: 'press.pr2.title', summaryKey: 'press.pr2.summary' },
    { date: '2024-02-10', titleKey: 'press.pr3.title', summaryKey: 'press.pr3.summary' },
  ];

  const requestItems: TranslationKey[] = ['press.req.i1', 'press.req.i2', 'press.req.i3', 'press.req.i4'];

  return (
    <Layout>
      <SEO
        title="Comunicate de presă — DSP Ilfov"
        description="Comunicate oficiale și anunțuri de presă ale Direcției de Sănătate Publică Ilfov."
        path="/public-info/press"
      />
      {/* Hero */}
      <section className="pt-[108px] md:pt-[116px] bg-gov-navy">
        <div className="max-w-7xl mx-auto px-4 py-12 md:px-[35px] md:py-[54px]">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors py-0">
                <ArrowLeft className="w-4 h-4" /> {t('common.backHome')}
              </Link>
            </motion.div>
            <motion.div className="flex items-center gap-2 mb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
              <div className="w-8 h-[2px] bg-gov-gold" />
              <span className="text-gov-gold text-sm font-semibold uppercase tracking-widest">{t('press.tag')}</span>
            </motion.div>
            <motion.h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 py-[12px]" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
              {t('press.title')}
            </motion.h1>
            <motion.p className="text-white/60 text-lg" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
              {t('press.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} custom={0} variants={fadeUp}>
                <h2 className="gov-section-title text-2xl md:text-3xl">{t('press.officeTitle')}</h2>
                <span className="gov-gold-bar" />
                <p className="text-muted-foreground leading-relaxed">
                  {t('press.officeText')}
                </p>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} custom={1} variants={fadeUp}>
                <h3 className="font-display font-bold text-lg mb-4 text-gov-navy">{t('press.recentTitle')}</h3>
                <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  {pressReleases.map((item, i) =>
                  <motion.div key={i} className="gov-card" variants={listItem}>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gov-light text-gov-navy rounded-sm">
                          <Newspaper className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                          <h4 className="font-display font-bold text-sm mb-1 text-foreground">{t(item.titleKey)}</h4>
                          <p className="text-muted-foreground text-sm">{t(item.summaryKey)}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} custom={2} variants={fadeUp}>
                <h3 className="font-display font-bold text-lg mb-4 text-gov-navy">{t('press.requestsTitle')}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {t('press.requestsText')}
                </p>
                <motion.ul className="space-y-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  {requestItems.map((key, j) =>
                  <motion.li key={j} className="flex items-start gap-3 text-sm text-muted-foreground" variants={listItem}>
                      <ExternalLink className="w-4 h-4 flex-shrink-0 text-gov-gold-dark mt-0.5" />
                      {t(key)}
                    </motion.li>
                  )}
                </motion.ul>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div className="space-y-6" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="gov-card">
                <div className="w-12 h-12 flex items-center justify-center bg-gov-light text-gov-navy rounded-sm mb-4">
                  <Newspaper className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{t('press.contactTitle')}</h3>
                <div className="text-sm text-muted-foreground space-y-3 mb-4">
                  <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-gov-gold-dark" /> presa@dspilfov.ro</p>
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-gov-gold-dark" /> 021.224.45.96</p>
                </div>
                <Link to="/contact">
                  <Button className="gov-btn-primary rounded-sm w-full">{t('common.contactUs')}</Button>
                </Link>
              </div>

              <div className="gov-card">
                <h3 className="font-display font-bold text-lg mb-3">{t('dept.schedule')}</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>{t('common.scheduleHours')}</p>
                  <p>{t('common.scheduleHoursFri')}</p>
                </div>
              </div>

              <div className="gov-card">
                <h3 className="font-display font-bold text-lg mb-3">{t('common.otherSections')}</h3>
                <nav className="space-y-2">
                  <Link to="/public-info/jobs" className="block text-sm text-muted-foreground hover:text-gov-navy transition-colors">→ {t('press.link.jobs')}</Link>
                  <Link to="/services" className="block text-sm text-muted-foreground hover:text-gov-navy transition-colors">→ {t('press.link.services')}</Link>
                  <Link to="/news" className="block text-sm text-muted-foreground hover:text-gov-navy transition-colors">→ {t('press.link.news')}</Link>
                </nav>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>);

};

export default Press;
