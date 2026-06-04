
import React from 'react';
import SEO from '@/components/SEO';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import NewsCard from '@/components/NewsCard';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Calendar, Activity, Users, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';

const Index = () => {
  const { t } = useLanguage();
  const recentNews = [
  {
    id: 1,
    title: 'Campanie de vaccinare gratuită împotriva gripei sezoniere',
    excerpt: 'Ministerul Sănătății și Direcțiile de Sănătate Publică anunță începerea campaniei de vaccinare gratuită împotriva gripei sezoniere pentru persoanele cu risc ridicat.',
    date: '15 octombrie 2023',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
    url: '/news/1'
  },
  {
    id: 2,
    title: 'Măsuri de prevenție în sezonul rece',
    excerpt: 'Recomandări pentru prevenirea îmbolnăvirilor specifice sezonului rece și protejarea sănătății în perioada temperaturilor scăzute.',
    date: '10 octombrie 2023',
    image: `${import.meta.env.BASE_URL}aae7e0a3-ea07-494a-86ea-ad96dd7825bc.jpg`,
    url: '/news/2'
  },
  {
    id: 3,
    title: 'Servicii noi de asistență medicală comunitară',
    excerpt: 'DSP Ilfov implementează noi servicii de asistență medicală comunitară în zonele rurale, pentru îmbunătățirea accesului la servicii medicale de bază.',
    date: '28 septembrie 2023',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
    url: '/news/3'
  }];


  const services = [
  { icon: <FileText className="h-5 w-5" />, title: t('home.svc.permits.title'), description: t('home.svc.permits.desc') },
  { icon: <Calendar className="h-5 w-5" />, title: t('home.svc.vaccination.title'), description: t('home.svc.vaccination.desc') },
  { icon: <Activity className="h-5 w-5" />, title: t('home.svc.monitoring.title'), description: t('home.svc.monitoring.desc') },
  { icon: <Users className="h-5 w-5" />, title: t('home.svc.promotion.title'), description: t('home.svc.promotion.desc') }];


  return (
    <Layout>
      <SEO
        title="Direcția de Sănătate Publică Ilfov — Site Oficial"
        description="Site-ul oficial al DSP Ilfov: servicii de sănătate publică, avize, autorizații sanitare, programe de vaccinare și informații pentru cetățenii din județul Ilfov."
        path="/"
      />
      <Hero />
      
      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="gov-section-title">{t('home.stats.title')}</h2>
            <span className="gov-gold-bar mx-auto" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('home.stats.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
            { number: '45+', text: t('home.stats.specialists') },
            { number: '50k+', text: t('home.stats.served') },
            { number: '2000+', text: t('home.stats.permits') },
            { number: '15+', text: t('home.stats.programs') }].
            map((stat, i) =>
            <div key={i} className="text-center py-8 border border-border rounded-sm">
                <div className="text-3xl md:text-4xl font-display font-bold mb-1 text-primary-foreground shadow-none bg-accent">{stat.number}</div>
                <div className="text-muted-foreground text-sm font-medium">{stat.text}</div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Services */}
      <section className="py-16 bg-gov-light border-y border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="gov-section-title">{t('home.services.title')}</h2>
            <span className="gov-gold-bar mx-auto" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('home.services.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) =>
            <ServiceCard key={i} icon={service.icon} title={service.title} description={service.description} onClick={() => {}} />
            )}
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/services">
              <Button variant="outline" className="gov-btn-outline rounded-sm">
                {t('home.services.viewAll')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* News */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="gov-section-title">{t('home.news.title')}</h2>
              <span className="gov-gold-bar" />
            </div>
            <Link to="/news">
              <Button variant="ghost" className="text-gov-navy hover:text-gov-navy hover:bg-gov-light font-semibold text-sm uppercase tracking-wide">
                {t('home.news.viewAll')} <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentNews.map((news, i) =>
            <NewsCard key={news.id} title={news.title} excerpt={news.excerpt} date={news.date} image={news.image} url={news.url} featured={i === 0} />
            )}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-gov-navy">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              {t('home.cta.title')}
            </h2>
            <p className="text-white/60 text-lg mb-8">
              {t('home.cta.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-gov-gold text-gov-navy hover:bg-gov-gold-dark font-semibold uppercase text-sm tracking-wide rounded-sm">
                  <Phone className="mr-2 h-4 w-4" /> {t('home.cta.contact')}
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-white/20 font-semibold uppercase text-sm tracking-wide rounded-sm text-primary-foreground bg-secondary-foreground">
                  {t('home.cta.form')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>);

};

export default Index;