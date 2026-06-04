import React from 'react';
import SEO from '@/components/SEO';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, icons } from 'lucide-react';
import { motion } from 'framer-motion';
import { departments, getChildDepartments } from '@/data/departments';
import { useLanguage } from '@/i18n/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const leadership = departments.find(d => d.id === 'conducere')!;
const LeaderIcon = icons[leadership.icon as keyof typeof icons];
const childDepts = getChildDepartments('conducere');

const Organigrama: React.FC = () => {
  const { t } = useLanguage();
  return (
    <Layout>
      <SEO
        title="Organigrama — DSP Ilfov"
        description="Structura organizatorică a Direcției de Sănătate Publică Ilfov: departamente, servicii și conducere."
        path="/public-info/organigrama"
      />
      {/* Hero */}
      <section className="pt-[108px] md:pt-[116px] bg-gov-navy">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> {t('org.back')}
              </Link>
            </motion.div>

            <motion.div className="flex items-center gap-2 mb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
              <div className="w-8 h-[2px] bg-gov-gold" />
              <span className="text-gov-gold text-sm font-semibold uppercase tracking-widest">{t('org.tag')}</span>
            </motion.div>

            <motion.h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
              {t('org.title')}
            </motion.h1>

            <motion.p className="text-white/60 text-lg" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
              {t('org.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Org Chart */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          {/* Leadership Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="mb-12"
          >
            <Link to={`/public-info/organigrama/conducere`} className="block group">
              <div className="gov-card bg-gov-navy text-white p-6 md:p-8 text-center relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.01]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-sm bg-gov-gold/20 flex items-center justify-center">
                    {LeaderIcon && <LeaderIcon className="w-7 h-7 text-gov-gold" />}
                  </div>
                  <h2 className="text-xl md:text-2xl font-display font-bold mb-2">{leadership.name}</h2>
                  <p className="text-white/60 text-sm max-w-lg mx-auto">{leadership.description}</p>
                  <span className="inline-flex items-center gap-1 mt-4 text-gov-gold text-sm font-semibold group-hover:gap-2 transition-all">
                    {t('org.details')} <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Connector Line */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{ transformOrigin: 'top' }}
          >
            <div className="w-px h-12 bg-border" />
          </motion.div>

          {/* Department Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {childDepts.map((dept) => {
              const DeptIcon = icons[dept.icon as keyof typeof icons];
              return (
              <motion.div key={dept.id} variants={cardVariant}>
                <Link to={`/public-info/organigrama/${dept.id}`} className="block group h-full">
                  <div className="gov-card h-full p-5 flex flex-col transition-all duration-300 group-hover:shadow-md group-hover:border-gov-gold/30 group-hover:-translate-y-0.5">
                    <div className={`w-10 h-10 rounded-sm ${dept.iconBg} flex items-center justify-center mb-3`}>
                      {DeptIcon && <DeptIcon className={`w-5 h-5 ${dept.iconFg}`} />}
                    </div>
                    <h3 className="font-display font-bold text-base mb-2 text-foreground group-hover:text-gov-navy transition-colors">
                      {dept.shortName}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                      {dept.description}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-4 text-gov-navy text-xs font-semibold group-hover:gap-2 transition-all">
                      {t('org.viewDetails')} <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Organigrama;
