import { getTranslations } from 'next-intl/server';
import QuoteForm from '@/components/forms/QuoteForm';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'devis_page' });
  return { title: t('title') };
}

interface Props { params: { locale: string } }

export default async function DevisPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'devis_page' });

  return (
    <div className="pt-16 min-h-screen">
      <section className="py-16 bg-forest-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display text-5xl sm:text-6xl font-semibold text-forest-800 mb-4">{t('title')}</h1>
          <p className="text-forest-500 text-xl">{t('subtitle')}</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <QuoteForm locale={locale} />
        </div>
      </section>
    </div>
  );
}
