'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  const t = useTranslations('howItWorks');
  const steps = t.raw('steps') as Array<{ num: string; title: string; desc: string }>;

  return (
    <section className="py-20 bg-forest-800 text-white overflow-hidden relative">
      {/* Decorative background circle */}
      <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-forest-700 opacity-40 pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-forest-700 opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white mb-3">
            {t('title')}
          </h2>
          <p className="text-forest-300 text-lg">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-px bg-forest-600 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative z-10 flex flex-col items-center text-center md:items-start md:text-left"
            >
              <div className="w-16 h-16 rounded-2xl bg-forest-500 flex items-center justify-center mb-5 shadow-lg shadow-forest-900/30">
                <span className="font-display text-2xl font-bold text-white">{step.num}</span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-forest-300 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
