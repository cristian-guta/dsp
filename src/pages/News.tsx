
import React from 'react';
import SEO from '@/components/SEO';
import Layout from '@/components/Layout';
import NewsCard from '@/components/NewsCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import type { TranslationKey } from '@/i18n/translations';

const News = () => {
  const { t } = useLanguage();

  const newsData: { id: number; titleKey: TranslationKey; excerptKey: TranslationKey; dateKey: TranslationKey; image: string; url: string }[] = [
    { id: 1, titleKey: 'news.item1.title', excerptKey: 'news.item1.excerpt', dateKey: 'news.item1.date', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3', url: '/news/1' },
    { id: 2, titleKey: 'news.item2.title', excerptKey: 'news.item2.excerpt', dateKey: 'news.item2.date', image: '/uploads/dd14b20e-d430-4f6c-bdc2-e548e872d215.jpg', url: '/news/2' },
    { id: 3, titleKey: 'news.item3.title', excerptKey: 'news.item3.excerpt', dateKey: 'news.item3.date', image: '/uploads/f7a28b21-28cb-4c10-bed4-0c705b1d537c.jpg', url: '/news/3' },
    { id: 4, titleKey: 'news.item4.title', excerptKey: 'news.item4.excerpt', dateKey: 'news.item4.date', image: '/uploads/73f6aed3-9f58-4310-8ed2-e8af14eb4005.png', url: '/news/4' },
    { id: 5, titleKey: 'news.item5.title', excerptKey: 'news.item5.excerpt', dateKey: 'news.item5.date', image: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3', url: '/news/5' },
    { id: 6, titleKey: 'news.item6.title', excerptKey: 'news.item6.excerpt', dateKey: 'news.item6.date', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3', url: '/news/6' },
  ];

  const categories: TranslationKey[] = ['news.cat.all', 'news.cat.announcements', 'news.cat.campaigns', 'news.cat.events', 'news.cat.info', 'news.cat.reports', 'news.cat.recommendations', 'news.cat.services'];

  return (
    <Layout>
      <SEO
        title="Știri și anunțuri — DSP Ilfov"
        description="Comunicate, anunțuri și noutăți publicate de Direcția de Sănătate Publică Ilfov: campanii, evenimente, recomandări și informări pentru cetățeni."
        path="/news"
      />
      {/* Hero */}
      <section className="pt-[108px] md:pt-[116px] bg-gov-navy">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-gov-gold" />
              <span className="text-gov-gold text-sm font-semibold uppercase tracking-widest">{t('news.tag')}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">{t('news.title')}</h1>
            <p className="text-white/60 text-lg mb-8">
              {t('news.subtitle')}
            </p>
            
            <div className="relative max-w-lg">
              <Input placeholder={t('news.searchPlaceholder')} className="pl-10 h-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-sm" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Filters */}
      <section className="py-4 border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((catKey, idx) => (
              <Button 
                key={catKey}
                variant={idx === 0 ? 'default' : 'outline'}
                size="sm"
                className={idx === 0
                  ? 'bg-gov-navy hover:bg-gov-navy-light text-white text-xs uppercase tracking-wide rounded-sm' 
                  : 'border-border text-muted-foreground hover:bg-gov-light hover:text-gov-navy text-xs uppercase tracking-wide rounded-sm'
                }
              >
                {t(catKey)}
              </Button>
            ))}
          </div>
        </div>
      </section>
      
      {/* News Grid */}
      <section className="py-12 bg-gov-light">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsData.map((news, index) => (
              <NewsCard key={news.id} title={t(news.titleKey)} excerpt={t(news.excerptKey)} date={t(news.dateKey)} image={news.image} url={news.url} featured={index === 0} />
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((page) => (
                <Button key={page} variant={page === 1 ? 'default' : 'outline'} size="sm"
                  className={page === 1 
                    ? 'bg-gov-navy hover:bg-gov-navy-light w-9 h-9 rounded-sm' 
                    : 'border-border text-muted-foreground hover:bg-white w-9 h-9 rounded-sm'
                  }
                >
                  {page}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default News;
