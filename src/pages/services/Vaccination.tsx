
import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import SEO from '@/components/SEO';
import { Calendar } from 'lucide-react';

const Vaccination = () => (
  <>
    <SEO
      title="Programe de vaccinare — DSP Ilfov"
      description="Programele naționale de vaccinare coordonate de DSP Ilfov: calendar, grupe eligibile, documente necesare și pașii de programare."
      path="/services/vaccination"
    />
  <ServicePageTemplate
    badgeKey="svc.vacc.badge"
    titleKey="svc.vacc.title"
    descriptionKey="svc.vacc.desc"
    icon={<Calendar className="h-6 w-6" />}
    fullDescriptionKey="svc.vacc.full"
    sections={[
      {
        titleKey: 'svc.vacc.s1.title',
        itemKeys: [
          'svc.vacc.s1.i1',
          'svc.vacc.s1.i2',
          'svc.vacc.s1.i3',
          'svc.vacc.s1.i4',
          'svc.vacc.s1.i5',
        ],
      },
      {
        titleKey: 'svc.vacc.s2.title',
        itemKeys: [
          'svc.vacc.s2.i1',
          'svc.vacc.s2.i2',
          'svc.vacc.s2.i3',
          'svc.vacc.s2.i4',
          'svc.vacc.s2.i5',
        ],
      },
    ]}
    processKeys={['svc.vacc.p1', 'svc.vacc.p2', 'svc.vacc.p3', 'svc.vacc.p4']}
    contactTextKey="svc.vacc.contact"
  />
  </>
);

export default Vaccination;
