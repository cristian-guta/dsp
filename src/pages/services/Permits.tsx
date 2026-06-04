import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import SEO from '@/components/SEO';
import { FileText } from 'lucide-react';

const Permits = () => (
  <>
    <SEO
      title="Avize și autorizații sanitare — DSP Ilfov"
      description="Emiterea avizelor și autorizațiilor sanitare de către DSP Ilfov: cerințe, documente necesare și pașii procedurali pentru obținerea acestora."
      path="/services/permits"
    />
    <ServicePageTemplate
      badgeKey="svc.permits.badge"
      titleKey="svc.permits.title"
      descriptionKey="svc.permits.desc"
      icon={<FileText className="h-6 w-6" />}
      fullDescriptionKey="svc.permits.full"
      sections={[
        {
          titleKey: 'svc.permits.s1.title',
          itemKeys: [
            'svc.permits.s1.i1',
            'svc.permits.s1.i2',
            'svc.permits.s1.i3',
            'svc.permits.s1.i4',
            'svc.permits.s1.i5',
          ],
        },
        {
          titleKey: 'svc.permits.s2.title',
          itemKeys: [
            'svc.permits.s2.i1',
            'svc.permits.s2.i2',
            'svc.permits.s2.i3',
            'svc.permits.s2.i4',
            'svc.permits.s2.i5',
            'svc.permits.s2.i6',
          ],
        },
      ]}
      processKeys={['svc.permits.p1', 'svc.permits.p2', 'svc.permits.p3', 'svc.permits.p4']}
      contactTextKey="svc.permits.contact"
    />
  </>
);

export default Permits;
