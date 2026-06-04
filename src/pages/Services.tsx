
import React, { useState } from 'react';
import SEO from '@/components/SEO';
import Layout from '@/components/Layout';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, Activity, Users, Shield, FileCheck, ClipboardList, HandHeart } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import type { TranslationKey } from '@/i18n/translations';

interface ServiceItem {
  id: number;
  icon: React.ReactNode;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  fullKey: TranslationKey;
  href?: string;
  requirementKeys: TranslationKey[];
  documentKeys: TranslationKey[];
  processKeys: TranslationKey[];
}

const Services = () => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const services: ServiceItem[] = [
    { id: 1, icon: <FileText className="h-5 w-5" />, titleKey: 'services.item.permits.title', descKey: 'services.item.permits.desc', fullKey: 'services.item.permits.full', href: '/services/permits',
      requirementKeys: ['svc.permits.s1.i1', 'svc.permits.s1.i2', 'svc.permits.s1.i3', 'svc.permits.s1.i4'],
      documentKeys: ['svc.permits.s2.i1', 'svc.permits.s2.i2', 'svc.permits.s2.i3', 'svc.permits.s2.i4'],
      processKeys: ['svc.permits.p1', 'svc.permits.p2', 'svc.permits.p3', 'svc.permits.p4'] },
    { id: 2, icon: <Calendar className="h-5 w-5" />, titleKey: 'services.item.vaccination.title', descKey: 'services.item.vaccination.desc', fullKey: 'services.item.vaccination.full', href: '/services/vaccination',
      requirementKeys: ['svc.vacc.s1.i1', 'svc.vacc.s1.i2', 'svc.vacc.s1.i3'],
      documentKeys: ['svc.vacc.s2.i1', 'svc.vacc.s2.i2', 'svc.vacc.s2.i3'],
      processKeys: ['svc.vacc.p1', 'svc.vacc.p2', 'svc.vacc.p3', 'svc.vacc.p4'] },
    { id: 3, icon: <Activity className="h-5 w-5" />, titleKey: 'services.item.monitoring.title', descKey: 'services.item.monitoring.desc', fullKey: 'services.item.monitoring.full', href: '/services/monitoring',
      requirementKeys: ['svc.mon.s2.i1', 'svc.mon.s2.i2', 'svc.mon.s2.i3'],
      documentKeys: ['svc.mon.s1.i1', 'svc.mon.s1.i2', 'svc.mon.s1.i3'],
      processKeys: ['svc.mon.p1', 'svc.mon.p2', 'svc.mon.p3', 'svc.mon.p4'] },
    { id: 4, icon: <Users className="h-5 w-5" />, titleKey: 'services.item.promotion.title', descKey: 'services.item.promotion.desc', fullKey: 'services.item.promotion.full', href: '/services/promotion',
      requirementKeys: ['svc.prom.s2.i1', 'svc.prom.s2.i2', 'svc.prom.s2.i3'],
      documentKeys: ['svc.prom.s1.i1', 'svc.prom.s1.i2', 'svc.prom.s1.i3'],
      processKeys: ['svc.prom.p1', 'svc.prom.p2', 'svc.prom.p3', 'svc.prom.p4'] },
    { id: 5, icon: <Shield className="h-5 w-5" />, titleKey: 'services.item.inspection.title', descKey: 'services.item.inspection.desc', fullKey: 'services.item.inspection.full',
      requirementKeys: ['svc.permits.s1.i1', 'svc.permits.s1.i3'],
      documentKeys: ['svc.permits.s2.i1', 'svc.permits.s2.i5'],
      processKeys: ['svc.permits.p2', 'svc.permits.p3', 'svc.permits.p4'] },
    { id: 6, icon: <FileCheck className="h-5 w-5" />, titleKey: 'services.item.certificates.title', descKey: 'services.item.certificates.desc', fullKey: 'services.item.certificates.full',
      requirementKeys: ['svc.vacc.s2.i3', 'svc.vacc.s2.i4'],
      documentKeys: ['svc.vacc.s2.i1', 'svc.vacc.s2.i2'],
      processKeys: ['svc.vacc.p1', 'svc.vacc.p2', 'svc.vacc.p3'] },
    { id: 7, icon: <ClipboardList className="h-5 w-5" />, titleKey: 'services.item.statistics.title', descKey: 'services.item.statistics.desc', fullKey: 'services.item.statistics.full',
      requirementKeys: ['svc.mon.s1.i1', 'svc.mon.s1.i2'],
      documentKeys: ['svc.mon.s2.i1', 'svc.mon.s2.i2'],
      processKeys: ['svc.mon.p1', 'svc.mon.p2', 'svc.mon.p3'] },
    { id: 8, icon: <HandHeart className="h-5 w-5" />, titleKey: 'services.item.community.title', descKey: 'services.item.community.desc', fullKey: 'services.item.community.full',
      requirementKeys: ['svc.prom.s2.i1', 'svc.prom.s2.i2'],
      documentKeys: ['svc.vacc.s2.i1', 'svc.vacc.s2.i3'],
      processKeys: ['svc.prom.p1', 'svc.prom.p2', 'svc.prom.p3', 'svc.prom.p4'] },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Servicii DSP Ilfov",
    "itemListElement": [
      { "@type": "Service", "name": "Avize și autorizații sanitare", "url": "https://localhost:8080/services/permits", "provider": { "@type": "GovernmentOrganization", "name": "DSP Ilfov" } },
      { "@type": "Service", "name": "Vaccinare", "url": "https://localhost:8080/services/vaccination", "provider": { "@type": "GovernmentOrganization", "name": "DSP Ilfov" } },
      { "@type": "Service", "name": "Monitorizare", "url": "https://localhost:8080/services/monitoring", "provider": { "@type": "GovernmentOrganization", "name": "DSP Ilfov" } },
      { "@type": "Service", "name": "Promovarea sănătății", "url": "https://localhost:8080/services/promotion", "provider": { "@type": "GovernmentOrganization", "name": "DSP Ilfov" } }
    ]
  };

  return (
    <Layout>
      <SEO
        title="Servicii publice de sănătate — DSP Ilfov"
        description="Serviciile oferite de DSP Ilfov: avize și autorizații sanitare, vaccinare, monitorizare epidemiologică și programe de promovare a sănătății."
        path="/services"
        jsonLd={serviceSchema}
      />
      {/* Hero */}
      <section className="pt-[108px] md:pt-[116px] bg-gov-navy">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-gov-gold" />
              <span className="text-gov-gold text-sm font-semibold uppercase tracking-widest">{t('services.tag')}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">{t('services.title')}</h1>
            <p className="text-white/60 text-lg">
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Grid */}
      <section className="py-12 bg-gov-light">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} icon={service.icon} title={t(service.titleKey)} description={t(service.descKey)} href={service.href} onClick={service.href ? undefined : () => setSelectedService(service)} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Service Detail Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="sm:max-w-2xl rounded-sm">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center text-xl font-display">
                  <div className="mr-3 w-8 h-8 flex items-center justify-center bg-gov-light text-gov-navy rounded-sm">
                    {selectedService.icon}
                  </div>
                  {t(selectedService.titleKey)}
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground mt-2">
                  {t(selectedService.fullKey)}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wide mb-3 text-gov-navy">{t('services.requirements')}</h4>
                    <ul className="space-y-2">
                      {selectedService.requirementKeys.map((key, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center bg-gov-light text-gov-navy rounded-sm text-xs font-bold">{i + 1}</span>
                          {t(key)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wide mb-3 text-gov-navy">{t('services.documents')}</h4>
                    <ul className="space-y-2">
                      {selectedService.documentKeys.map((key, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center bg-gov-light text-gov-navy rounded-sm text-xs font-bold">{i + 1}</span>
                          {t(key)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wide mb-3 text-gov-navy">{t('services.process')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.processKeys.map((key, i) => (
                      <span key={i} className="py-1.5 px-3 bg-gov-light text-gov-navy rounded-sm text-xs font-medium">
                        {i + 1}. {t(key)}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2 flex justify-center">
                  <Button className="gov-btn-primary rounded-sm">{t('services.requestService')}</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* CTA */}
      <section className="py-12 bg-white border-t border-border">
        <div className="max-w-2xl mx-auto px-4 md:px-8 text-center">
          <h2 className="gov-section-title">{t('services.needHelp')}</h2>
          <span className="gov-gold-bar mx-auto" />
          <p className="text-muted-foreground mb-8">
            {t('services.helpDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact">
              <Button className="gov-btn-primary rounded-sm">{t('services.requestInfo')}</Button>
            </Link>
            <Link to="/contact">
              <Button className="gov-btn-outline rounded-sm">{t('services.scheduleMeeting')}</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
