
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import type { TranslationKey } from '@/i18n/translations';

interface ServiceSection {
  titleKey: TranslationKey;
  itemKeys: TranslationKey[];
}

interface ServicePageTemplateProps {
  badgeKey: TranslationKey;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  icon: React.ReactNode;
  fullDescriptionKey: TranslationKey;
  sections: ServiceSection[];
  processKeys: TranslationKey[];
  contactTextKey?: TranslationKey;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const listItem: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
};

const ServicePageTemplate: React.FC<ServicePageTemplateProps> = ({
  badgeKey, titleKey, descriptionKey, icon, fullDescriptionKey, sections, processKeys, contactTextKey
}) => {
  const { t } = useLanguage();
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-[108px] md:pt-[116px] bg-gov-navy">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <Link to="/services" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> {t('svc.backToServices')}
              </Link>
            </motion.div>
            <motion.div className="flex items-center gap-2 mb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
              <div className="w-8 h-[2px] bg-gov-gold" />
              <span className="text-gov-gold text-sm font-semibold uppercase tracking-widest">{t(badgeKey)}</span>
            </motion.div>
            <motion.h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
              {t(titleKey)}
            </motion.h1>
            <motion.p className="text-white/60 text-lg" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
              {t(descriptionKey)}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} custom={0} variants={fadeUp}>
                <h2 className="gov-section-title text-2xl md:text-3xl">{t('svc.about')}</h2>
                <span className="gov-gold-bar" />
                <p className="text-muted-foreground leading-relaxed">{t(fullDescriptionKey)}</p>
              </motion.div>

              {sections.map((section, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} custom={i + 1} variants={fadeUp}>
                  <h3 className="font-display font-bold text-lg mb-4 text-gov-navy">{t(section.titleKey)}</h3>
                  <motion.ul className="space-y-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    {section.itemKeys.map((itemKey, j) => (
                      <motion.li key={j} className="flex items-start gap-3 text-sm text-muted-foreground" variants={listItem}>
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-gov-gold-dark mt-0.5" />
                        {t(itemKey)}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              ))}

              {/* Process */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                <motion.h3 className="font-display font-bold text-lg mb-4 text-gov-navy" variants={fadeUp} custom={0}>
                  {t('svc.processSteps')}
                </motion.h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {processKeys.map((stepKey, i) => (
                    <motion.div key={i} className="gov-card flex items-start gap-3" variants={fadeUp} custom={i}>
                      <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-gov-navy text-white rounded-sm text-sm font-bold">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium pt-1">{t(stepKey)}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div className="space-y-6" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="gov-card">
                <div className="w-12 h-12 flex items-center justify-center bg-gov-light text-gov-navy rounded-sm mb-4">
                  {icon}
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{t('svc.helpTitle')}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {contactTextKey ? t(contactTextKey) : t('svc.helpDefault')}
                </p>
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
                <h3 className="font-display font-bold text-lg mb-3">{t('svc.otherServices')}</h3>
                <nav className="space-y-2">
                  <Link to="/services/permits" className="block text-sm text-muted-foreground hover:text-gov-navy transition-colors">→ {t('nav.permits')}</Link>
                  <Link to="/services/vaccination" className="block text-sm text-muted-foreground hover:text-gov-navy transition-colors">→ {t('nav.vaccination')}</Link>
                  <Link to="/services/monitoring" className="block text-sm text-muted-foreground hover:text-gov-navy transition-colors">→ {t('nav.monitoring')}</Link>
                  <Link to="/services/promotion" className="block text-sm text-muted-foreground hover:text-gov-navy transition-colors">→ {t('nav.promotion')}</Link>
                </nav>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicePageTemplate;
