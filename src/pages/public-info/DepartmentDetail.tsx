import React from 'react';
import SEO from '@/components/SEO';
import { useParams, Link, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { ArrowLeft, CheckCircle2, ChevronRight, icons } from 'lucide-react';
import { motion } from 'framer-motion';
import { getDepartmentById, getChildDepartments, departments } from '@/data/departments';
import { Button } from '@/components/ui/button';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const listItem = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const DepartmentDetail: React.FC = () => {
  const { departmentId } = useParams<{ departmentId: string }>();
  const dept = getDepartmentById(departmentId || '');

  if (!dept) return <Navigate to="/public-info/organigrama" replace />;

  const DeptIcon = icons[dept.icon as keyof typeof icons];

  const siblings = departments.filter(d => d.level === dept.level && d.id !== dept.id);

  return (
    <Layout>
      <SEO
        title={`${dept.name} — Organigrama DSP Ilfov`}
        description={`Departamentul ${dept.name} din cadrul Direcției de Sănătate Publică Ilfov: rol, atribuții și informații de contact.`}
        path={`/public-info/organigrama/${dept.id}`}
      />
      {/* Hero */}
      <section className="pt-[108px] md:pt-[116px] bg-gov-navy">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <Link to="/public-info/organigrama" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Înapoi la organigramă
              </Link>
            </motion.div>

            <motion.div className="flex items-center gap-2 mb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
              <div className="w-8 h-[2px] bg-gov-gold" />
              <span className="text-gov-gold text-sm font-semibold uppercase tracking-widest">Compartiment</span>
            </motion.div>

            <motion.h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
              {dept.name}
            </motion.h1>

            <motion.p className="text-white/60 text-lg" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
              {dept.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} custom={0} variants={fadeUp}>
                <h2 className="gov-section-title text-2xl md:text-3xl">Despre acest compartiment</h2>
                <span className="gov-gold-bar" />
                <p className="text-muted-foreground leading-relaxed">{dept.fullDescription}</p>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} custom={1} variants={fadeUp}>
                <h3 className="font-display font-bold text-lg mb-4 text-gov-navy">Atribuții principale</h3>
                <motion.ul className="space-y-3" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  {dept.responsibilities.map((item, j) => (
                    <motion.li key={j} className="flex items-start gap-3 text-sm text-muted-foreground" variants={listItem}>
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-gov-gold-dark mt-0.5" />
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div className="space-y-6" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              {dept.head && (
                <div className="gov-card">
                  <div className={`w-12 h-12 flex items-center justify-center ${dept.iconBg} rounded-sm mb-4`}>
                    {DeptIcon && <DeptIcon className={`w-6 h-6 ${dept.iconFg}`} />}
                  </div>
                  <h3 className="font-display font-bold text-lg mb-1">{dept.headTitle}</h3>
                  <p className="text-muted-foreground text-sm mb-4">Coordonează activitatea compartimentului.</p>
                  <Link to="/contact">
                    <Button className="gov-btn-primary rounded-sm w-full">Contactează-ne</Button>
                  </Link>
                </div>
              )}

              <div className="gov-card">
                <h3 className="font-display font-bold text-lg mb-3">Program</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Luni – Joi: 08:30 – 17:00</p>
                  <p>Vineri: 08:30 – 14:30</p>
                </div>
              </div>

              <div className="gov-card">
                <h3 className="font-display font-bold text-lg mb-3">Alte compartimente</h3>
                <nav className="space-y-2">
                  {siblings.slice(0, 5).map((s) => (
                    <Link key={s.id} to={`/public-info/organigrama/${s.id}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-gov-navy transition-colors">
                      <ChevronRight className="w-3.5 h-3.5" /> {s.shortName}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DepartmentDetail;
