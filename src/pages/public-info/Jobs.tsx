
import React from 'react';
import SEO from '@/components/SEO';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, MapPin, Clock, CalendarDays } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import type { TranslationKey } from '@/i18n/translations';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Jobs = () => {
  const { t, language } = useLanguage();
  const dateLocale = language === 'ro' ? 'ro-RO' : 'en-US';

  const jobListings: { titleKey: TranslationKey; deptKey: TranslationKey; deadline: string; statusActive: boolean }[] = [
    { titleKey: 'jobs.j1.title', deptKey: 'jobs.j1.dept', deadline: '2024-04-15', statusActive: true },
    { titleKey: 'jobs.j2.title', deptKey: 'jobs.j2.dept', deadline: '2024-04-10', statusActive: true },
    { titleKey: 'jobs.j3.title', deptKey: 'jobs.j3.dept', deadline: '2024-03-28', statusActive: false },
  ];

  const processSteps: TranslationKey[] = [
    'jobs.process.i1',
    'jobs.process.i2',
    'jobs.process.i3',
    'jobs.process.i4',
  ];

  return (
    <Layout>
      <SEO
        title="Cariere și concursuri — DSP Ilfov"
        description="Posturi vacante, concursuri și oportunități de angajare în cadrul Direcției de Sănătate Publică Ilfov."
        path="/public-info/jobs"
      />
      {/* Hero */}
      <section className="pt-[108px] md:pt-[116px] bg-gov-navy">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> {t('common.backHome')}
              </Link>
            </motion.div>
            <motion.div className="flex items-center gap-2 mb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
              <div className="w-8 h-[2px] bg-gov-gold" />
              <span className="text-gov-gold text-sm font-semibold uppercase tracking-widest">{t('press.tag')}</span>
            </motion.div>
            <motion.h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
              {t('jobs.title')}
            </motion.h1>
            <motion.p className="text-white/60 text-lg" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
              {t('jobs.subtitle')}
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
                <h2 className="gov-section-title text-2xl md:text-3xl">{t('jobs.availableTitle')}</h2>
                <span className="gov-gold-bar" />
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t('jobs.availableText')}
                </p>
              </motion.div>

              {/* Job Listings */}
              <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {jobListings.map((job, i) => (
                  <motion.div key={i} className="gov-card" variants={cardItem}>
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm ${job.statusActive ? 'bg-green-100 text-green-800' : 'bg-muted text-muted-foreground'}`}>
                            {job.statusActive ? t('jobs.status.active') : t('jobs.status.expired')}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-lg text-foreground mb-1">{t(job.titleKey)}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{t(job.deptKey)}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {t('jobs.fullTime')}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {t('jobs.location')}</span>
                          <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /> {t('jobs.deadline')}: {new Date(job.deadline).toLocaleDateString(dateLocale)}</span>
                        </div>
                      </div>
                      {job.statusActive && (
                        <Link to="/contact">
                          <Button size="sm" className="gov-btn-primary rounded-sm text-xs">{t('jobs.apply')}</Button>
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Info */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} custom={2} variants={fadeUp}>
                <h3 className="font-display font-bold text-lg mb-4 text-gov-navy">{t('jobs.processTitle')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {processSteps.map((key, i) => (
                    <motion.div key={i} className="gov-card flex items-start gap-3" variants={fadeUp} custom={i}>
                      <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-gov-navy text-white rounded-sm text-sm font-bold">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium pt-1">{t(key)}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div className="space-y-6" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="gov-card">
                <div className="w-12 h-12 flex items-center justify-center bg-gov-light text-gov-navy rounded-sm mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{t('jobs.submitTitle')}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {t('jobs.submitText')}
                </p>
                <Link to="/contact">
                  <Button className="gov-btn-primary rounded-sm w-full">{t('common.contactUs')}</Button>
                </Link>
              </div>

              <div className="gov-card">
                <h3 className="font-display font-bold text-lg mb-3">{t('jobs.scheduleTitle')}</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>{t('common.scheduleHours')}</p>
                  <p>{t('common.scheduleHoursFri')}</p>
                </div>
              </div>

              <div className="gov-card">
                <h3 className="font-display font-bold text-lg mb-3">{t('common.otherSections')}</h3>
                <nav className="space-y-2">
                  <Link to="/public-info/press" className="block text-sm text-muted-foreground hover:text-gov-navy transition-colors">→ {t('jobs.link.press')}</Link>
                  <Link to="/services" className="block text-sm text-muted-foreground hover:text-gov-navy transition-colors">→ {t('press.link.services')}</Link>
                  <Link to="/news" className="block text-sm text-muted-foreground hover:text-gov-navy transition-colors">→ {t('press.link.news')}</Link>
                </nav>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Jobs;
