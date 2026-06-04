
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const ContactForm: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success(t('form.success'), { description: t('form.successDesc') });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-sm font-semibold">{t('form.name')}</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder={t('form.namePlaceholder')} required className="h-11 rounded-sm" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-semibold">{t('form.email')}</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t('form.emailPlaceholder')} required className="h-11 rounded-sm" />
        </div>
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="subject" className="text-sm font-semibold">{t('form.subject')}</Label>
        <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder={t('form.subjectPlaceholder')} required className="h-11 rounded-sm" />
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="message" className="text-sm font-semibold">{t('form.message')}</Label>
        <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder={t('form.messagePlaceholder')} required className="min-h-28 resize-none rounded-sm" rows={5} />
      </div>
      
      <Button type="submit" className="gov-btn-primary rounded-sm w-full md:w-auto" disabled={isSubmitting}>
        {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('form.submitting')}</>) : t('form.submit')}
      </Button>
    </form>
  );
};

export default ContactForm;
