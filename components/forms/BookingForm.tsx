'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DayPicker } from 'react-day-picker';
import { addDays, isSunday, isSaturday, format } from 'date-fns';
import { fr, enCA } from 'date-fns/locale';
import { CheckCircle, Loader2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import 'react-day-picker/dist/style.css';

interface BookingFormProps { locale: string; }

const timeSlots = ['9:00', '11:00', '13:00', '15:00'];

const schema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  phone:   z.string().min(10),
  address: z.string().min(5),
  service: z.string().min(1),
  notes:   z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function BookingForm({ locale }: BookingFormProps) {
  const t = useTranslations('rendezVous_page');
  const serviceOptions = t.raw('serviceOptions') as string[];

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState('');
  const [submitting, setSubmitting]     = useState(false);
  const [success, setSuccess]           = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const today    = new Date();
  const maxDate  = addDays(today, 30);
  const disabled = [
    { before: addDays(today, 1) },
    { after: maxDate },
    (date: Date) => isSunday(date) || isSaturday(date),
  ];

  async function onSubmit(data: FormData) {
    if (!selectedDate || !selectedTime) return;
    setSubmitting(true);
    try {
      await fetch('/api/rendez-vous', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          date: format(selectedDate, 'PPP', { locale: locale === 'fr' ? fr : enCA }),
          time: selectedTime,
          locale,
        }),
      });
    } finally {
      setSubmitting(false);
      setSuccess(true);
    }
  }

  const inputClass = 'w-full border border-forest-200 rounded-xl px-4 py-3 text-forest-800 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 bg-white placeholder:text-forest-300';

  if (success) {
    return (
      <div className="text-center py-16">
        <CheckCircle className="w-16 h-16 text-forest-500 mx-auto mb-6" />
        <h2 className="font-display text-3xl font-semibold text-forest-800 mb-3">{t('success.title')}</h2>
        <p className="text-forest-500 mb-8">{t('success.subtitle')}</p>
        <a href={`/${locale}`} className="inline-flex items-center gap-2 bg-forest-500 text-white font-medium px-6 py-3 rounded-xl hover:bg-forest-600 transition-colors">
          {t('success.cta')}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Date picker */}
      <div>
        <h3 className="font-semibold text-forest-800 mb-4">{t('selectDate')}</h3>
        <div className="bg-white border border-forest-100 rounded-2xl p-4 inline-block">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={disabled as any}
            locale={locale === 'fr' ? fr : enCA}
            modifiersClassNames={{ selected: 'rdp-day_selected', today: 'rdp-day_today' }}
          />
        </div>
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div>
          <h3 className="font-semibold text-forest-800 mb-4">{t('selectTime')}</h3>
          <div className="flex flex-wrap gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedTime(slot)}
                className={cn(
                  'flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 text-sm font-medium transition-all',
                  selectedTime === slot
                    ? 'border-forest-500 bg-forest-500 text-white'
                    : 'border-forest-100 bg-white text-forest-700 hover:border-forest-300'
                )}
              >
                <Clock className="w-4 h-4" />
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Contact info */}
      {selectedDate && selectedTime && (
        <div>
          <h3 className="font-semibold text-forest-800 mb-4">{t('yourInfo')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input {...register('name')} placeholder={t('name')} className={inputClass} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <input {...register('email')} type="email" placeholder={t('email')} className={inputClass} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <input {...register('phone')} placeholder={t('phone')} className={inputClass} />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <input {...register('address')} placeholder={t('address')} className={inputClass} />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <select {...register('service')} className={inputClass}>
                <option value="">{t('service')}</option>
                {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <textarea {...register('notes')} placeholder={t('notes')} rows={2} className={inputClass} />
            </div>
          </div>

          {/* Summary */}
          <div className="mt-6 bg-forest-50 border border-forest-100 rounded-xl px-5 py-4 text-sm text-forest-600">
            <span className="font-medium text-forest-800">
              {format(selectedDate, 'PPP', { locale: locale === 'fr' ? fr : enCA })} — {selectedTime}
            </span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 flex items-center gap-2 bg-forest-500 hover:bg-forest-600 disabled:opacity-70 text-white font-medium px-8 py-3.5 rounded-xl transition-colors w-full justify-center"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {t('submit')}
          </button>
        </div>
      )}
    </form>
  );
}
