import { getTranslations } from 'next-intl/server';
import { Thermometer, Droplets, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'methode_page' });
  return { title: t('title') };
}

interface Props { params: { locale: string } }

export default async function MethodePage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'methode_page' });
  const steps = t.raw('process.steps') as Array<{ title: string; desc: string }>;

  const highlights = [
    { icon: Thermometer, iconBg: 'bg-orange-50', iconColor: 'text-orange-500', titleKey: 'why.title', descKey: 'why.desc' },
    { icon: Droplets,    iconBg: 'bg-blue-50',   iconColor: 'text-blue-500',   titleKey: 'dry.title', descKey: 'dry.desc' },
    { icon: ShieldCheck, iconBg: 'bg-forest-50',  iconColor: 'text-forest-500', titleKey: 'safe.title',descKey: 'safe.desc' },
  ] as const;

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-16 bg-forest-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display text-5xl sm:text-6xl font-semibold text-forest-800 mb-4">{t('title')}</h1>
          <p className="text-forest-500 text-xl mb-3">{t('subtitle')}</p>
          <p className="text-forest-600 leading-relaxed">{t('intro')}</p>
        </div>
      </section>

      {/* Science highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((h) => {
              const Icon = h.icon;
              return (
                <div key={h.titleKey} className="bg-forest-50 rounded-2xl p-7 border border-forest-100">
                  <div className={`w-12 h-12 rounded-xl ${h.iconBg} ${h.iconColor} flex items-center justify-center mb-5`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-forest-800 mb-3">{t(h.titleKey)}</h3>
                  <p className="text-forest-500 text-sm leading-relaxed">{t(h.descKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Step by step */}
      <section className="py-16 bg-forest-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white text-center mb-12">
            {t('process.title')}
          </h2>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-forest-600" />
            <div className="space-y-8">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-6 pl-14 relative">
                  <div className="absolute left-0 w-10 h-10 rounded-full bg-forest-500 border-4 border-forest-800 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                    <p className="text-forest-300 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
