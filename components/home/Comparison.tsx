'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

export default function Comparison() {
  const t = useTranslations('comparison');

  const tradItems = t.raw('tradItems') as string[];
  const steamItems = t.raw('steamItems') as string[];

  return (
    <section className="py-20 bg-white">
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {/* Traditional */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-7"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                <X className="w-4 h-4 text-red-500" />
              </div>
              <span className="font-semibold text-gray-600 text-sm">{t('traditional')}</span>
            </div>
            <ul className="space-y-3">
              {tradItems.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <X className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-gray-500 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Steam */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-forest-100 border-2 border-forest-400 rounded-2xl p-7 relative overflow-hidden"
          >
            <div className="absolute top-3 right-3 bg-forest-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
              Recommandé
            </div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-full bg-forest-500 flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-forest-700 text-sm">{t('steam')}</span>
            </div>
            <ul className="space-y-3">
              {steamItems.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-forest-500 shrink-0" />
                  <span className="text-forest-700 text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
