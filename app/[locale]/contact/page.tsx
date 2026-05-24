import { getTranslations } from 'next-intl/server';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contact_page' });
  return { title: t('title') };
}

interface Props { params: { locale: string } }

export default async function ContactPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'contact_page' });

  const infoItems = [
    { icon: Phone,   value: t('info.phone'),   label: locale === 'fr' ? 'Téléphone' : 'Phone' },
    { icon: Mail,    value: t('info.email'),   label: 'Email' },
    { icon: MapPin,  value: t('info.address'), label: locale === 'fr' ? 'Adresse' : 'Address' },
    { icon: Clock,   value: t('info.hours'),   label: locale === 'fr' ? 'Heures' : 'Hours' },
  ];

  return (
    <div className="pt-16">
      <section className="py-16 bg-forest-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display text-5xl sm:text-6xl font-semibold text-forest-800 mb-4">{t('title')}</h1>
          <p className="text-forest-500 text-xl">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <ContactForm locale={locale} />

          {/* Info */}
          <div>
            <h2 className="font-display text-2xl font-semibold text-forest-800 mb-6">
              {locale === 'fr' ? 'Nos coordonnées' : 'Our Contact Info'}
            </h2>
            <div className="space-y-5">
              {infoItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-forest-100 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-forest-500" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-forest-400 mb-0.5">{item.label}</div>
                      <div className="text-forest-700 text-sm font-medium">{item.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 bg-forest-50 rounded-2xl border border-forest-100 p-6">
              <p className="text-sm text-forest-600 leading-relaxed">
                {locale === 'fr'
                  ? 'Pour une réponse rapide, utilisez notre formulaire de devis en ligne. Nous répondons à toutes les demandes sous 24 heures ouvrables.'
                  : 'For a quick response, use our online quote form. We respond to all requests within 24 business hours.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
