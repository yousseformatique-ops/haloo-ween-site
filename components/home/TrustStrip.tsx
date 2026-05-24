'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function TrustStrip() {
  const t = useTranslations('trust');

  const stats = [
    { value: '375°F', label: t('temp'), color: 'text-forest-500' },
    { value: '0',     label: t('chemical'), color: 'text-forest-500' },
    { value: '2',     label: t('visits'), color: 'text-forest-500' },
    { value: '100%',  label: t('safe'), color: 'text-forest-500' },
  ];

  return (
    <section className="bg-white border-y border-forest-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-forest-100">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="px-6 py-6 text-center first:border-l-0"
            >
              <div className={`text-3xl sm:text-4xl font-display font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-forest-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
