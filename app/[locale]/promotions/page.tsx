import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Tag, ArrowRight, Calendar } from 'lucide-react';
import { promotions, seasonColors } from '@/lib/promotions';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'promotions_page' });
  return { title: t('title') };
}

interface Props { params: { locale: 'fr' | 'en' } }

export default async function PromotionsPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'promotions_page' });
  const activePromos = promotions.filter((p) => p.active);

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-16 bg-forest-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display text-5xl sm:text-6xl font-semibold text-forest-800 mb-4">{t('title')}</h1>
          <p className="text-forest-500 text-xl">{t('subtitle')}</p>
        </div>
      </section>

      {/* Promotions list */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {activePromos.length === 0 ? (
            <p className="text-center text-forest-400 py-20">{t('noPromo')}</p>
          ) : (
            <div className="space-y-6">
              {activePromos.map((promo) => {
                const colors = seasonColors[promo.season];
                return (
                  <div
                    key={promo.id}
                    className={`rounded-2xl border ${colors.border} ${colors.bg} p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl border ${colors.border} bg-white flex items-center justify-center shrink-0`}>
                        <Tag className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <div>
                        <div className={`text-xs font-bold uppercase tracking-widest ${colors.text} mb-1`}>
                          {promo.badge[locale]}
                          {promo.discount && (
                            <span className="ml-2 bg-white/80 px-2 py-0.5 rounded-full font-bold">-{promo.discount}</span>
                          )}
                        </div>
                        <h3 className={`font-display text-2xl font-semibold ${colors.text} mb-2`}>
                          {promo.title[locale]}
                        </h3>
                        <p className={`text-sm leading-relaxed ${colors.text} opacity-80 max-w-lg`}>
                          {promo.description[locale]}
                        </p>
                        {promo.expiryDate && (
                          <div className={`flex items-center gap-1.5 mt-3 text-xs ${colors.text} opacity-70`}>
                            <Calendar className="w-3.5 h-3.5" />
                            {t('expires')} : {new Date(promo.expiryDate).toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </div>
                        )}
                      </div>
                    </div>
                    <Link
                      href={`/${locale}${promo.ctaHref}`}
                      className={`shrink-0 flex items-center gap-1.5 bg-white text-forest-600 hover:bg-forest-50 font-medium text-sm px-5 py-2.5 rounded-xl border border-forest-200 transition-colors`}
                    >
                      {promo.cta[locale]}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
