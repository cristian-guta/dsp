
import React from 'react';
import SEO from '@/components/SEO';
import Layout from '@/components/Layout';
import ContactForm from '@/components/ContactForm';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import type { TranslationKey } from '@/i18n/translations';

const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://nexab2b.ro';

const Contact = () => {
  const { t } = useLanguage();
  const dspLocation = {
    lat: 44.4705982,
    lng: 26.0675926,
    address: t('footer.address'),
  };

  const contactInfo: { icon: React.ReactNode; titleKey: TranslationKey; content: string; action: { textKey: TranslationKey; url: string } | null }[] = [
    { icon: <MapPin className="h-5 w-5" />, titleKey: 'contact.info.address', content: dspLocation.address, action: { textKey: 'contact.info.viewMap', url: `https://www.google.com/maps?q=${dspLocation.lat},${dspLocation.lng}` } },
    { icon: <Phone className="h-5 w-5" />, titleKey: 'contact.info.phone', content: '021.224.45.96', action: { textKey: 'contact.info.callNow', url: 'tel:021.224.45.96' } },
    { icon: <Mail className="h-5 w-5" />, titleKey: 'contact.info.email', content: 'office@dspilfov.ro', action: { textKey: 'contact.info.sendEmail', url: 'mailto:office@dspilfov.ro' } },
    { icon: <Clock className="h-5 w-5" />, titleKey: 'contact.info.schedule', content: t('contact.scheduleContent'), action: null },
  ];

  const departments: { nameKey: TranslationKey; phone: string; email: string }[] = [
    { nameKey: 'contact.dept.secretariat', phone: '021.224.45.96', email: 'office@dspilfov.ro' },
    { nameKey: 'contact.dept.permits', phone: '021.224.45.96', email: 'avize@dspilfov.ro' },
    { nameKey: 'contact.dept.surveillance', phone: '021.224.45.96', email: 'supraveghere@dspilfov.ro' },
    { nameKey: 'contact.dept.inspection', phone: '021.224.45.96', email: 'inspectie@dspilfov.ro' },
  ];

  const faqs: { qKey: TranslationKey; aKey: TranslationKey }[] = [
    { qKey: 'contact.faq.q1', aKey: 'contact.faq.a1' },
    { qKey: 'contact.faq.q2', aKey: 'contact.faq.a2' },
    { qKey: 'contact.faq.q3', aKey: 'contact.faq.a3' },
    { qKey: 'contact.faq.q4', aKey: 'contact.faq.a4' },
  ];

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentOffice",
    "name": "Direcția de Sănătate Publică Ilfov",
    "url": siteUrl,
    "telephone": "+40-21-224-45-96",
    "email": "office@dspilfov.ro",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Str. Mihai Eminescu nr. 11",
      "addressLocality": "București",
      "addressRegion": "Ilfov",
      "addressCountry": "RO"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": dspLocation.lat, "longitude": dspLocation.lng },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday"], "opens": "08:30", "closes": "17:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "08:30", "closes": "14:30" }
    ]
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": t(f.qKey),
      "acceptedAnswer": { "@type": "Answer", "text": t(f.aKey) }
    }))
  };

  return (
    <Layout>
      <SEO
        title="Contact — DSP Ilfov"
        description="Contactați Direcția de Sănătate Publică Ilfov: adresă, telefon, email, program de lucru, departamente și formular de contact."
        path="/contact"
        jsonLd={[localBusinessLd, faqLd]}
      />
      {/* Hero */}
      <section className="pt-[108px] md:pt-[116px] bg-gov-navy">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-gov-gold" />
              <span className="text-gov-gold text-sm font-semibold uppercase tracking-widest">{t('contact.tag')}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">{t('contact.title')}</h1>
            <p className="text-white/60 text-lg">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Info */}
      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, i) => (
              <div key={i} className="gov-card text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-gov-light text-gov-navy rounded-sm mb-3">
                  {info.icon}
                </div>
                <h3 className="font-bold text-sm uppercase tracking-wide mb-1">{t(info.titleKey)}</h3>
                <p className="text-muted-foreground text-sm mb-2 whitespace-pre-line">{info.content}</p>
                {info.action && (
                  <a href={info.action.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-gov-navy hover:text-gov-gold-dark font-semibold text-xs uppercase tracking-wide">
                    {t(info.action.textKey)} <ExternalLink size={12} className="ml-1" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Map and Form */}
      <section className="py-12 bg-gov-light">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <div className="bg-white border border-border rounded-sm overflow-hidden">
                <div className="aspect-video w-full">
                  <iframe 
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1424.0131825531408!2d${dspLocation.lng}!3d${dspLocation.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b201fed3b1d6b9%3A0x9c7f8e4c6376f7b0!2s${encodeURIComponent(dspLocation.address)}!5e0!3m2!1sro!2sro!4v1720196480193!5m2!1sro!2sro`} 
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg mb-4">{t('contact.depts.title')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {departments.map((dept, i) => (
                      <div key={i} className="p-3 border border-border rounded-sm">
                        <h4 className="font-semibold text-sm mb-2">{t(dept.nameKey)}</h4>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <p className="flex items-center gap-2">
                            <Phone size={12} className="text-gov-navy" />
                            <a href={`tel:${dept.phone}`} className="hover:text-gov-navy">{dept.phone}</a>
                          </p>
                          <p className="flex items-center gap-2">
                            <Mail size={12} className="text-gov-navy" />
                            <a href={`mailto:${dept.email}`} className="hover:text-gov-navy">{dept.email}</a>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-border rounded-sm p-6 md:p-8">
              <h3 className="font-display font-bold text-xl mb-6">{t('contact.form.title')}</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="gov-section-title">{t('contact.faq.title')}</h2>
            <span className="gov-gold-bar mx-auto" />
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="gov-card">
                <h4 className="font-display font-bold mb-2">{t(faq.qKey)}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{t(faq.aKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
