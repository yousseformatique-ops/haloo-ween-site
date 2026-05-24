'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

interface HeroProps { locale: string; }

export default function Hero({ locale }: HeroProps) {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-forest-100 via-[#E8F8F2] to-forest-50 pt-16">
      {/* Background decorative leaf SVG */}
      <div className="absolute right-0 top-0 w-[50vw] max-w-2xl opacity-10 pointer-events-none select-none" aria-hidden>
        <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M380 10 C300 80, 50 100, 20 490" stroke="#0F6E56" strokeWidth="2" fill="none"/>
          <path d="M380 10 C380 10, 320 200, 200 250 C80 300, 20 490, 20 490 C20 490, 200 400, 280 300 C360 200, 380 10, 380 10Z" fill="#0F6E56"/>
          <path d="M380 10 L200 250" stroke="#5DCAA5" strokeWidth="1.5" opacity="0.6"/>
          {[...Array(8)].map((_, i) => (
            <path key={i}
              d={`M200 250 L${200 + Math.cos(i * 0.8) * (80 - i * 8)} ${250 + Math.sin(i * 0.8 + 0.3) * (60 - i * 5)}`}
              stroke="#5DCAA5" strokeWidth="1" opacity="0.4"
            />
          ))}
        </svg>
      </div>

      {/* Steam particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {[
          { w: 14, h: 14, left: '20%', bottom: '30%', delay: '0s' },
          { w: 10, h: 10, left: '22%', bottom: '35%', delay: '1.1s' },
          { w: 8,  h: 8,  left: '18%', bottom: '28%', delay: '2.2s' },
          { w: 12, h: 12, left: '75%', bottom: '20%', delay: '0.5s' },
          { w: 9,  h: 9,  left: '78%', bottom: '25%', delay: '1.7s' },
        ].map((p, i) => (
          <span
            key={i}
            className="steam-particle"
            style={{ width: p.w, height: p.h, left: p.left, bottom: p.bottom, animationDelay: p.delay }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 relative">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-forest-200 text-forest-600 text-xs font-medium px-4 py-2 rounded-full mb-8 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-forest-400 animate-pulse" />
            {t('badge')}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-forest-800 leading-[1.1] mb-4"
          >
            {t('title')}
            <br />
            <span className="text-forest-500 italic">{t('titleAccent')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-forest-600 text-lg leading-relaxed mb-10 max-w-xl"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href={`/${locale}/devis`}
              className="inline-flex items-center justify-center gap-2 bg-forest-500 hover:bg-forest-600 text-white font-medium px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-forest-500/25 hover:shadow-forest-500/40 hover:-translate-y-0.5"
            >
              {t('ctaPrimary')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/${locale}/methode`}
              className="inline-flex items-center justify-center gap-2 bg-white/70 hover:bg-white backdrop-blur-sm text-forest-700 font-medium px-6 py-3.5 rounded-xl border border-forest-200 transition-all hover:-translate-y-0.5"
            >
              <Play className="w-4 h-4 fill-forest-500 text-forest-500" />
              {t('ctaSecondary')}
            </Link>
          </motion.div>
        </div>

        {/* Floating stat card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl shadow-forest-800/10 p-6 w-56 border border-forest-100 animate-float"
        >
          <div className="text-4xl font-display font-bold text-forest-500 mb-1">375°F</div>
          <div className="text-sm text-forest-600 font-medium mb-4">Vapeur sèche</div>
          <div className="space-y-2">
            {['Insectes', 'Larves', 'Œufs'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-forest-100 flex items-center justify-center">
                  <span className="text-forest-500 text-[10px]">✓</span>
                </div>
                <span className="text-xs text-forest-700">{item} éliminés</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10">
          <path d="M0 40 C360 0, 1080 0, 1440 40 L1440 40 L0 40Z" fill="#F7FAF8"/>
        </svg>
      </div>
    </section>
  );
}
