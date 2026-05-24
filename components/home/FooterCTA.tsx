'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

interface FooterCTAProps { locale: string; }

export default function FooterCTA({ locale }: FooterCTAProps) {
  const t = useTranslations('footerCta');

  return (
    <section className="py-20 bg-forest-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-forest-800 mb-3">
            {t('title')}
          </h2>
          <p className="text-forest-600 mb-2 text-lg">{t('subtitle')}</p>
          <div className="flex items-center justify-center gap-1.5 text-forest-500 text-sm mb-8">
            <MapPin className="w-3.5 h-3.5" />
            <span>Montréal · Laval · Longueuil · Rive-Sud · Rive-Nord</span>
          </div>
          <Link
            href={`/${locale}/rendez-vous`}
            className="inline-flex items-center gap-2 bg-forest-500 hover:bg-forest-600 text-white font-medium px-8 py-4 rounded-xl transition-all shadow-lg shadow-forest-500/30 hover:-translate-y-0.5 hover:shadow-forest-500/45"
          >
            {t('cta')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
