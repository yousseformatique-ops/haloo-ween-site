'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Leaf, Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

interface FooterProps { locale: string; }

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');

  const serviceLinks = [
    { label: t('serviceLinks.0'), href: `/${locale}/services#move` },
    { label: t('serviceLinks.1'), href: `/${locale}/services#residential` },
    { label: t('serviceLinks.2'), href: `/${locale}/services#senior` },
  ];

  const pageLinks = [
    { label: t('pageLinks.0'), href: `/${locale}/methode` },
    { label: t('pageLinks.1'), href: `/${locale}/tarifs` },
    { label: t('pageLinks.2'), href: `/${locale}/promotions` },
    { label: t('pageLinks.3'), href: `/${locale}/contact` },
  ];

  return (
    <footer className="bg-forest-800 text-forest-200">
      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href={`/${locale}`} className="flex items-center gap-2.5 mb-4 group">
            <div className="w-9 h-9 rounded-full bg-forest-500 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-semibold text-white">Haloo-Ween</span>
          </Link>
          <p className="text-sm text-forest-300 leading-relaxed max-w-xs">
            {t('tagline')}
          </p>
          <div className="flex gap-3 mt-5">
            {[Instagram, Facebook, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-full bg-forest-700 flex items-center justify-center hover:bg-forest-500 transition-colors"
                aria-label="Social"
              >
                <Icon className="w-3.5 h-3.5 text-forest-200" />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xs font-semibold text-forest-400 uppercase tracking-widest mb-4">
            {t('services')}
          </h3>
          <ul className="space-y-2.5">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-forest-300 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xs font-semibold text-forest-400 uppercase tracking-widest mb-4">
            {t('links')}
          </h3>
          <ul className="space-y-2.5">
            {pageLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-forest-300 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-semibold text-forest-400 uppercase tracking-widest mb-4">
            {t('contact')}
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2.5 text-sm text-forest-300">
              <Phone className="w-4 h-4 text-forest-400 shrink-0" />
              <span>{t('phone')}</span>
            </li>
            <li className="flex items-center gap-2.5 text-sm text-forest-300">
              <Mail className="w-4 h-4 text-forest-400 shrink-0" />
              <span>{t('email')}</span>
            </li>
            <li className="flex items-center gap-2.5 text-sm text-forest-300">
              <MapPin className="w-4 h-4 text-forest-400 shrink-0" />
              <span>{t('address')}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-forest-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-forest-400">
            © {new Date().getFullYear()} Haloo-Ween. {t('rights')}
          </p>
          <div className="flex gap-4">
            <Link href={`/${locale}/contact`} className="text-xs text-forest-400 hover:text-forest-200 transition-colors">
              {locale === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy'}
            </Link>
            <Link href={`/${locale}/contact`} className="text-xs text-forest-400 hover:text-forest-200 transition-colors">
              {locale === 'fr' ? 'Conditions d\'utilisation' : 'Terms of Use'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
