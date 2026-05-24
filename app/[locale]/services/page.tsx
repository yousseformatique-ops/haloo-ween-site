import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Truck, Home, HeartHandshake, Check, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'services_page' });
  return { title: t('title'), description: t('subtitle') };
}

interface Props { params: { locale: string } }

interface ServiceCard {
  id: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  accentBorder: string;
  title: string;
  subtitle: string;
  desc: string;
  includes: string[];
  price: string;
}

export default async function ServicesPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'services_page' });

  const services: ServiceCard[] = [
    {
      id: 'move',
      icon: Truck,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      accentBorder: 'border-blue-200',
      title: t('move.title'),
      subtitle: t('move.subtitle'),
      desc: t('move.desc'),
      includes: t.raw('move.includes') as string[],
      price: t('move.price'),
    },
    {
      id: 'residential',
      icon: Home,
      iconBg: 'bg-violet-50',
      iconColor: 'text-violet-600',
      accentBorder: 'border-violet-200',
      title: t('residential.title'),
      subtitle: t('residential.subtitle'),
      desc: t('residential.desc'),
      includes: t.raw('residential.includes') as string[],
      price: t('residential.price'),
    },
    {
      id: 'senior',
      icon: HeartHandshake,
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-600',
      accentBorder: 'border-rose-200',
      title: t('senior.title'),
      subtitle: t('senior.subtitle'),
      desc: t('senior.desc'),
      includes: t.raw('senior.includes') as string[],
      price: t('senior.price'),
    },
  ];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-16 bg-forest-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display text-5xl sm:text-6xl font-semibold text-forest-800 mb-4">{t('title')}</h1>
          <p className="text-forest-500 text-xl">{t('subtitle')}</p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                id={s.id}
                className={`rounded-2xl border ${s.accentBorder} bg-white shadow-sm p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${s.iconBg} ${s.iconColor} flex items-center justify-center mb-5`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-forest-400 mb-2">{s.subtitle}</div>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-forest-800 mb-4">{s.title}</h2>
                  <p className="text-forest-500 leading-relaxed mb-6">{s.desc}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-forest-600">{s.price}</span>
                    <Link
                      href={`/${locale}/devis`}
                      className="inline-flex items-center gap-1.5 bg-forest-500 hover:bg-forest-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
                    >
                      {t('cta')} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
                <div className="bg-forest-50 rounded-xl p-6">
                  <div className="text-xs font-bold uppercase tracking-widest text-forest-400 mb-4">
                    {locale === 'fr' ? 'Ce qui est inclus' : "What's included"}
                  </div>
                  <ul className="space-y-3">
                    {s.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-forest-500 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-forest-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
