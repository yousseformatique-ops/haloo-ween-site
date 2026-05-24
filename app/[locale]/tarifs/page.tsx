import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'tarifs_page' });
  return { title: t('title') };
}

interface Props { params: { locale: string } }

export default async function TarifsPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'tarifs_page' });
  const packages = t.raw('packages') as Array<{ name: string; price: string; desc: string; features: string[]; highlight?: boolean }>;
  const addons   = t.raw('addons.items') as Array<{ name: string; price: string }>;

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-16 bg-forest-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display text-5xl sm:text-6xl font-semibold text-forest-800 mb-4">{t('title')}</h1>
          <p className="text-forest-500 text-xl mb-4">{t('subtitle')}</p>
          <p className="text-forest-400 text-sm max-w-xl mx-auto">{t('note')}</p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-2xl border p-7 flex flex-col',
                  pkg.highlight
                    ? 'border-forest-400 bg-forest-500 text-white shadow-xl shadow-forest-500/25 scale-105'
                    : 'border-forest-100 bg-white'
                )}
              >
                {pkg.highlight && (
                  <div className="bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full self-start mb-4">
                    {locale === 'fr' ? 'Le plus populaire' : 'Most Popular'}
                  </div>
                )}
                <div className={cn('text-sm font-medium mb-1', pkg.highlight ? 'text-forest-100' : 'text-forest-400')}>
                  {pkg.desc}
                </div>
                <h3 className={cn('font-display text-2xl font-semibold mb-2', pkg.highlight ? 'text-white' : 'text-forest-800')}>
                  {pkg.name}
                </h3>
                <div className={cn('text-4xl font-display font-bold mb-6', pkg.highlight ? 'text-white' : 'text-forest-500')}>
                  {pkg.price}
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <div className={cn('w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5', pkg.highlight ? 'bg-white/20' : 'bg-forest-100')}>
                        <Check className={cn('w-3 h-3', pkg.highlight ? 'text-white' : 'text-forest-500')} />
                      </div>
                      <span className={cn('text-sm', pkg.highlight ? 'text-forest-100' : 'text-forest-600')}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${locale}/devis`}
                  className={cn(
                    'flex items-center justify-center gap-1.5 py-3 rounded-xl font-medium text-sm transition-colors',
                    pkg.highlight
                      ? 'bg-white text-forest-600 hover:bg-forest-50'
                      : 'bg-forest-500 text-white hover:bg-forest-600'
                  )}
                >
                  {t('cta')} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-12 bg-forest-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold text-forest-800 text-center mb-8">
            {t('addons.title')}
          </h2>
          <div className="bg-white rounded-2xl border border-forest-100 divide-y divide-forest-100">
            {addons.map((addon, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4">
                <span className="text-forest-700 text-sm font-medium">{addon.name}</span>
                <span className="text-forest-500 text-sm font-semibold">{addon.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
