'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle } from 'lucide-react';

interface ContactFormProps { locale: string; }

const schema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  phone:   z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm({ locale }: ContactFormProps) {
  const t = useTranslations('contact_page.form');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent]             = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setSubmitting(true);
    try {
      await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'contact', locale }),
      });
    } finally {
      setSubmitting(false);
      setSent(true);
    }
  }

  const inputClass = 'w-full border border-forest-200 rounded-xl px-4 py-3 text-forest-800 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 bg-white placeholder:text-forest-300';

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="w-12 h-12 text-forest-500 mb-4" />
        <p className="text-forest-700 font-medium">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input {...register('name')} placeholder={t('name')} className={inputClass} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <input {...register('email')} type="email" placeholder={t('email')} className={inputClass} />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>
      <input {...register('phone')} placeholder={t('phone')} className={inputClass} />
      <div>
        <input {...register('subject')} placeholder={t('subject')} className={inputClass} />
        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
      </div>
      <div>
        <textarea {...register('message')} placeholder={t('message')} rows={5} className={inputClass} />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="flex items-center gap-2 bg-forest-500 hover:bg-forest-600 disabled:opacity-70 text-white font-medium px-6 py-3 rounded-xl transition-colors w-full justify-center"
      >
        {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
        {t('submit')}
      </button>
    </form>
  );
}
