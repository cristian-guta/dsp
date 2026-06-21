
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

type FormField = 'name' | 'email' | 'subject' | 'message';

const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿĂÂÎȘȚăâîșț'`.-]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿĂÂÎȘȚăâîșț'`.-]+)*$/;
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const SUBJECT_REGEX = /^[A-Za-z0-9À-ÖØ-öø-ÿĂÂÎȘȚăâîșț ,.!?'"()\-/:;+&]+$/;
const MESSAGE_REGEX = /^[A-Za-z0-9À-ÖØ-öø-ÿĂÂÎȘȚăâîșț \t\r\n,.!?'"()\-/:;+&@#%*_\[\]{}<>|\\=~`]+$/;

const fieldValidators: Record<FormField, RegExp> = {
  name: NAME_REGEX,
  email: EMAIL_REGEX,
  subject: SUBJECT_REGEX,
  message: MESSAGE_REGEX,
};

const sanitizeValue = (field: FormField, value: string) => {
  const trimmed = value.trim();
  return field === 'message' ? trimmed.replace(/\n{3,}/g, '\n\n') : trimmed.replace(/\s+/g, ' ');
};

const ContactForm: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FormField, string>>>({});

  const validateField = (field: FormField, value: string) => {
    const sanitized = sanitizeValue(field, value);

    if (!sanitized) {
      return 'This field is required.';
    }

    const minLength = field === 'message' ? 10 : 2;
    const maxLength = field === 'message' ? 2000 : field === 'subject' ? 120 : field === 'name' ? 80 : 254;

    if (sanitized.length < minLength) {
      return 'Value is too short.';
    }

    if (sanitized.length > maxLength) {
      return 'Value is too long.';
    }

    if (!fieldValidators[field].test(sanitized)) {
      return 'Invalid characters detected.';
    }

    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const field = name as FormField;
    const nextValue = value;
    setFormData((prev) => ({ ...prev, [field]: nextValue }));

    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: validateField(field, nextValue) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors: Partial<Record<FormField, string>> = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      subject: validateField('subject', formData.subject),
      message: validateField('message', formData.message),
    };

    const hasErrors = Object.values(nextErrors).some(Boolean);
    setFieldErrors(nextErrors);

    if (hasErrors) {
      toast.error('Please correct the highlighted fields.');
      return;
    }

    const payload = {
      name: sanitizeValue('name', formData.name),
      email: sanitizeValue('email', formData.email).toLowerCase(),
      subject: sanitizeValue('subject', formData.subject),
      message: sanitizeValue('message', formData.message),
    };

    setIsSubmitting(true);

    // This form is not persisted yet. If you later store it in SQL, keep the same allow-list validation
    // and use parameterized queries only.
    setTimeout(() => {
      void payload;
      toast.success(t('form.success'), { description: t('form.successDesc') });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFieldErrors({});
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-sm font-semibold">{t('form.name')}</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t('form.namePlaceholder')}
            required
            minLength={2}
            maxLength={80}
            pattern={NAME_REGEX.source}
            autoComplete="name"
            className="h-11 rounded-sm"
          />
          {fieldErrors.name && <p className="text-xs text-destructive">{fieldErrors.name}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-semibold">{t('form.email')}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t('form.emailPlaceholder')}
            required
            maxLength={254}
            pattern={EMAIL_REGEX.source}
            autoComplete="email"
            className="h-11 rounded-sm"
          />
          {fieldErrors.email && <p className="text-xs text-destructive">{fieldErrors.email}</p>}
        </div>
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="subject" className="text-sm font-semibold">{t('form.subject')}</Label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder={t('form.subjectPlaceholder')}
          required
          minLength={2}
          maxLength={120}
          pattern={SUBJECT_REGEX.source}
          className="h-11 rounded-sm"
        />
        {fieldErrors.subject && <p className="text-xs text-destructive">{fieldErrors.subject}</p>}
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="message" className="text-sm font-semibold">{t('form.message')}</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t('form.messagePlaceholder')}
          required
          minLength={10}
          maxLength={2000}
          className="min-h-28 resize-none rounded-sm"
          rows={5}
        />
        {fieldErrors.message && <p className="text-xs text-destructive">{fieldErrors.message}</p>}
      </div>
      
      <Button type="submit" className="gov-btn-primary rounded-sm w-full md:w-auto" disabled={isSubmitting}>
        {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('form.submitting')}</>) : t('form.submit')}
      </Button>
    </form>
  );
};

export default ContactForm;
