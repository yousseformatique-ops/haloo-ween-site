'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Tag, ArrowRight } from 'lucide-react';
import { getActivePromotions, seasonColors } from '@/lib/promotions';

interface PromoBannerProps { locale: 'fr' | 'en'; }

export default function PromoBanner({ locale }: PromoBannerProps) {
  const t = useTranslations('promoBanner');
  const promos = getActivePromotions();
  const firstPromo = promos[0];

  if (!firstPromo) return null;

  const colors = seasonColors[firstPromo.season];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={`py-6 ${colors.bg} border-y ${colors.border}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center`}>
              <Tag className={`w-4 h-4 ${colors.text}`} />
            </div>
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${colors.text} block`}>
                {t('label')} — {firstPromo.badge[locale]}
              </span>
              <span className={`text-sm font-medium ${colors.text}`}>
                {firstPromo.title[locale]}
                {firstPromo.discount && (
                  <span className="ml-2 bg-white/70 px-2 py-0.5 rounded-full text-xs font-bold">
                    -{firstPromo.discount}
                  </span>
                )}
              </span>
            </div>
          </div>
          <Link
            href={`/${locale}${firstPromo.ctaHref}`}
            className={`shrink-0 flex items-center gap-1.5 text-sm font-semibold ${colors.text} bg-white/70 hover:bg-white px-4 py-2 rounded-lg border ${colors.border} transition-colors`}
          >
            {t('reserve')}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
