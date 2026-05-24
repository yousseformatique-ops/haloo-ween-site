'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const items = t.raw('items') as Array<{ name: string; location: string; text: string; service: string }>;

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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="bg-white rounded-2xl border border-forest-100 p-7 hover:shadow-md hover:shadow-forest-800/5 transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array(5).fill(0).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-forest-600 text-sm leading-relaxed mb-6 italic">
                &ldquo;{item.text}&rdquo;
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-forest-800 text-sm">{item.name}</div>
                  <div className="text-forest-400 text-xs">{item.location}</div>
                </div>
                <span className="text-[10px] font-medium text-forest-500 bg-forest-50 border border-forest-100 px-2.5 py-1 rounded-full">
                  {item.service}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
