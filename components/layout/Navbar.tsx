'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps { locale: string; }

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const otherLocale = locale === 'fr' ? 'en' : 'fr';
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const links = [
    { href: `/${locale}/methode`,    label: t('methode') },
    { href: `/${locale}/services`,   label: t('services') },
    { href: `/${locale}/tarifs`,     label: t('tarifs') },
    { href: `/${locale}/promotions`, label: t('promotions') },
    { href: `/${locale}/contact`,    label: t('contact') },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-forest-100'
          : 'bg-white/80 backdrop-blur-sm'
      )}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-forest-500 flex items-center justify-center shadow-sm group-hover:bg-forest-600 transition-colors">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="font-display text-lg font-semibold text-forest-800 tracking-tight">
            Haloo-Ween
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-forest-500 after:transition-all hover:after:w-full',
                pathname.startsWith(link.href)
                  ? 'text-forest-600 after:w-full'
                  : 'text-forest-700 hover:text-forest-600'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + Lang switcher */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href={switchPath}
            className="text-xs font-medium text-forest-500 hover:text-forest-700 border border-forest-200 rounded-full px-3 py-1 transition-colors hover:border-forest-400"
          >
            {otherLocale.toUpperCase()}
          </Link>
          <Link
            href={`/${locale}/devis`}
            className="bg-forest-500 hover:bg-forest-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm hover:shadow"
          >
            {t('devis')}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg text-forest-700 hover:bg-forest-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-forest-100 shadow-lg">
          <div className="px-4 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  pathname.startsWith(link.href)
                    ? 'bg-forest-100 text-forest-700'
                    : 'text-forest-700 hover:bg-forest-50'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-forest-100">
              <Link
                href={`/${locale}/devis`}
                onClick={() => setMenuOpen(false)}
                className="flex-1 bg-forest-500 text-white text-sm font-medium px-4 py-2.5 rounded-lg text-center"
              >
                {t('devis')}
              </Link>
              <Link
                href={switchPath}
                className="border border-forest-200 text-forest-500 text-sm font-medium px-4 py-2.5 rounded-lg"
              >
                {otherLocale.toUpperCase()}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
