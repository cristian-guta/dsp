
import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import SEO from '@/components/SEO';
import { Users } from 'lucide-react';

const Promotion = () => (
  <>
    <SEO
      title="Promovarea sănătății — DSP Ilfov"
      description="Campanii și programe de promovare a sănătății derulate de DSP Ilfov: educație pentru sănătate, prevenție și intervenții în comunitate."
      path="/services/promotion"
    />
  <ServicePageTemplate
    badgeKey="svc.prom.badge"
    titleKey="svc.prom.title"
    descriptionKey="svc.prom.desc"
    icon={<Users className="h-6 w-6" />}
    fullDescriptionKey="svc.prom.full"
    sections={[
      {
        titleKey: 'svc.prom.s1.title',
        itemKeys: [
          'svc.prom.s1.i1',
          'svc.prom.s1.i2',
          'svc.prom.s1.i3',
          'svc.prom.s1.i4',
          'svc.prom.s1.i5',
        ],
      },
      {
        titleKey: 'svc.prom.s2.title',
        itemKeys: [
          'svc.prom.s2.i1',
          'svc.prom.s2.i2',
          'svc.prom.s2.i3',
          'svc.prom.s2.i4',
        ],
      },
    ]}
    processKeys={['svc.prom.p1', 'svc.prom.p2', 'svc.prom.p3', 'svc.prom.p4']}
    contactTextKey="svc.prom.contact"
  />
  </>
);

export default Promotion;
