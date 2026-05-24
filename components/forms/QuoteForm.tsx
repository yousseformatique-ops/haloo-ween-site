'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuoteFormProps { locale: string; }

const contactSchema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  phone:   z.string().min(10),
  address: z.string().min(5),
  message: z.string().optional(),
});

type ContactData = z.infer<typeof contactSchema>;

export default function QuoteForm({ locale }: QuoteFormProps) {
  const t = useTranslations('devis_page');

  const step1Options = t.raw('step1.options') as Array<{ id: string; label: string; desc: string }>;
  const step2Options = t.raw('step2.options') as Array<{ id: string; label: string; icon: string }>;
  const step3Options = t.raw('step3.options') as Array<{ id: string; label: string; desc: string }>;

  const [step, setStep] = useState(1);
  const [clientType, setClientType]   = useState('');
  const [pestType, setPestType]       = useState('');
  const [spaceType, setSpaceType]     = useState('');
  const [submitting, setSubmitting]   = useState(false);
  const [submitted, setSubmitted]     = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactData) {
    setSubmitting(true);
    try {
      await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, clientType, pestType, spaceType, locale }),
      });
      setSubmitted(true);
      setStep(5);
    } catch {
      // still show success for UX
      setSubmitted(true);
      setStep(5);
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = 'w-full border border-forest-200 rounded-xl px-4 py-3 text-forest-800 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent bg-white placeholder:text-forest-300';
  const errorClass = 'text-red-500 text-xs mt-1';

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      {step < 5 && (
        <div className="flex items-center gap-1.5 mb-8">
          {[1,2,3,4].map((s) => (
            <div key={s} className="flex items-center gap-1.5 flex-1">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                s < step ? 'bg-forest-500 text-white' :
                s === step ? 'bg-forest-500 text-white ring-4 ring-forest-200' :
                'bg-forest-100 text-forest-400'
              )}>
                {s < step ? '✓' : s}
              </div>
              {s < 4 && <div className={cn('flex-1 h-0.5 rounded', s < step ? 'bg-forest-500' : 'bg-forest-100')} />}
            </div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* Step 1 — client type */}
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}>
            <h2 className="font-display text-3xl font-semibold text-forest-800 mb-1">{t('step1.title')}</h2>
            <p className="text-forest-400 mb-6">{t('step1.subtitle')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {step1Options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setClientType(opt.id)}
                  className={cn(
                    'p-5 rounded-xl border-2 text-left transition-all',
                    clientType === opt.id ? 'border-forest-500 bg-forest-50' : 'border-forest-100 bg-white hover:border-forest-300'
                  )}
                >
                  <div className="font-semibold text-forest-800 mb-1">{opt.label}</div>
                  <div className="text-xs text-forest-400">{opt.desc}</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => clientType && setStep(2)}
              disabled={!clientType}
              className="flex items-center gap-2 bg-forest-500 hover:bg-forest-600 disabled:bg-forest-200 text-white font-medium px-6 py-3 rounded-xl transition-colors"
            >
              {t('next')} <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Step 2 — pest type */}
        {step === 2 && (
          <motion.div key="s2" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}>
            <h2 className="font-display text-3xl font-semibold text-forest-800 mb-1">{t('step2.title')}</h2>
            <p className="text-forest-400 mb-6">{t('step2.subtitle')}</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {step2Options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setPestType(opt.id)}
                  className={cn(
                    'p-5 rounded-xl border-2 text-left transition-all flex items-center gap-3',
                    pestType === opt.id ? 'border-forest-500 bg-forest-50' : 'border-forest-100 bg-white hover:border-forest-300'
                  )}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <span className="font-semibold text-forest-800 text-sm">{opt.label}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-forest-500 hover:text-forest-700 font-medium px-4 py-3 rounded-xl border border-forest-200 hover:border-forest-300 transition-colors">
                <ArrowLeft className="w-4 h-4" /> {t('back')}
              </button>
              <button onClick={() => pestType && setStep(3)} disabled={!pestType} className="flex items-center gap-2 bg-forest-500 hover:bg-forest-600 disabled:bg-forest-200 text-white font-medium px-6 py-3 rounded-xl transition-colors">
                {t('next')} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3 — space size */}
        {step === 3 && (
          <motion.div key="s3" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}>
            <h2 className="font-display text-3xl font-semibold text-forest-800 mb-1">{t('step3.title')}</h2>
            <p className="text-forest-400 mb-6">{t('step3.subtitle')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {step3Options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSpaceType(opt.id)}
                  className={cn(
                    'p-5 rounded-xl border-2 text-left transition-all',
                    spaceType === opt.id ? 'border-forest-500 bg-forest-50' : 'border-forest-100 bg-white hover:border-forest-300'
                  )}
                >
                  <div className="font-semibold text-forest-800 mb-1">{opt.label}</div>
                  <div className="text-xs text-forest-400">{opt.desc}</div>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex items-center gap-2 text-forest-500 font-medium px-4 py-3 rounded-xl border border-forest-200 hover:border-forest-300 transition-colors">
                <ArrowLeft className="w-4 h-4" /> {t('back')}
              </button>
              <button onClick={() => spaceType && setStep(4)} disabled={!spaceType} className="flex items-center gap-2 bg-forest-500 hover:bg-forest-600 disabled:bg-forest-200 text-white font-medium px-6 py-3 rounded-xl transition-colors">
                {t('next')} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4 — contact info */}
        {step === 4 && (
          <motion.div key="s4" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}>
            <h2 className="font-display text-3xl font-semibold text-forest-800 mb-1">{t('step4.title')}</h2>
            <p className="text-forest-400 mb-6">{t('step4.subtitle')}</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input {...register('name')} placeholder={t('step4.name')} className={inputClass} />
                  {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                </div>
                <div>
                  <input {...register('email')} type="email" placeholder={t('step4.email')} className={inputClass} />
                  {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <input {...register('phone')} placeholder={t('step4.phone')} className={inputClass} />
                {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
              </div>
              <div>
                <input {...register('address')} placeholder={t('step4.address')} className={inputClass} />
                {errors.address && <p className={errorClass}>{errors.address.message}</p>}
              </div>
              <div>
                <textarea {...register('message')} placeholder={t('step4.message')} rows={3} className={inputClass} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(3)} className="flex items-center gap-2 text-forest-500 font-medium px-4 py-3 rounded-xl border border-forest-200 hover:border-forest-300 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> {t('back')}
                </button>
                <button type="submit" disabled={submitting} className="flex items-center gap-2 bg-forest-500 hover:bg-forest-600 disabled:opacity-70 text-white font-medium px-6 py-3 rounded-xl transition-colors">
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {t('step4.submit')} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Step 5 — success */}
        {step === 5 && (
          <motion.div key="s5" initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-forest-500 mx-auto mb-6" />
            <h2 className="font-display text-4xl font-semibold text-forest-800 mb-3">{t('step5.title')}</h2>
            <p className="text-forest-500 mb-8">{t('step5.subtitle')}</p>
            <a href={`/${locale}`} className="inline-flex items-center gap-2 bg-forest-500 text-white font-medium px-6 py-3 rounded-xl hover:bg-forest-600 transition-colors">
              {t('step5.cta')}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
