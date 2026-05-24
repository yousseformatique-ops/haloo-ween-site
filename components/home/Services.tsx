'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Truck, Home, HeartHandshake, ArrowRight } from 'lucide-react';

interface ServicesProps { locale: string; }

const serviceData = [
  {
    key: 'move',
    icon: Truck,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    borderHover: 'hover:border-blue-200',
    id: 'move',
  },
  {
    key: 'residential',
    icon: Home,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    borderHover: 'hover:border-violet-200',
    id: 'residential',
  },
  {
    key: 'senior',
    icon: HeartHandshake,
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    borderHover: 'hover:border-rose-200',
    id: 'senior',
  },
];

export default function Services({ locale }: ServicesProps) {
  const t = useTranslations('services');

  return (
    <section className="py-20 bg-[#F7FAF8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-forest-800 mb-3">
            {t('title')}
          </h2>
          <p className="text-forest-500 text-lg">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceData.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className={`bg-white rounded-2xl border border-forest-100 ${s.borderHover} p-7 flex flex-col hover:shadow-lg hover:shadow-forest-800/5 transition-all group`}
              >
                <div className={`w-12 h-12 rounded-xl ${s.iconBg} ${s.iconColor} flex items-center justify-center mb-5`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-forest-800 mb-2">
                  {t(`${s.key}.title`)}
                </h3>
                <p className="text-forest-500 text-sm leading-relaxed flex-1 mb-5">
                  {t(`${s.key}.desc`)}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-forest-600 font-semibold text-sm bg-forest-50 px-3 py-1.5 rounded-lg">
                    {t(`${s.key}.price`)}
                  </span>
                  <Link
                    href={`/${locale}/services#${s.id}`}
                    className="text-forest-500 hover:text-forest-700 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    {t('learnMore')}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
