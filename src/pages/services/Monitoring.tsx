
import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import SEO from '@/components/SEO';
import { Activity } from 'lucide-react';

const Monitoring = () => (
  <>
    <SEO
      title="Monitorizare epidemiologică — DSP Ilfov"
      description="Monitorizarea factorilor de risc și a stării de sănătate în județul Ilfov: activități de supraveghere, raportare și prevenție desfășurate de DSP Ilfov."
      path="/services/monitoring"
    />
  <ServicePageTemplate
    badgeKey="svc.mon.badge"
    titleKey="svc.mon.title"
    descriptionKey="svc.mon.desc"
    icon={<Activity className="h-6 w-6" />}
    fullDescriptionKey="svc.mon.full"
    sections={[
      {
        titleKey: 'svc.mon.s1.title',
        itemKeys: [
          'svc.mon.s1.i1',
          'svc.mon.s1.i2',
          'svc.mon.s1.i3',
          'svc.mon.s1.i4',
          'svc.mon.s1.i5',
        ],
      },
      {
        titleKey: 'svc.mon.s2.title',
        itemKeys: [
          'svc.mon.s2.i1',
          'svc.mon.s2.i2',
          'svc.mon.s2.i3',
          'svc.mon.s2.i4',
        ],
      },
    ]}
    processKeys={['svc.mon.p1', 'svc.mon.p2', 'svc.mon.p3', 'svc.mon.p4']}
    contactTextKey="svc.mon.contact"
  />
  </>
);

export default Monitoring;
