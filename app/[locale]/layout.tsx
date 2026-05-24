import type { Metadata } from 'next';
import { Cormorant_Garamond, Outfit } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chat/ChatWidget';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'Haloo-Ween — Désinsectisation vapeur sèche Montréal', template: '%s | Haloo-Ween' },
  description: 'Désinsectisation écologique à la vapeur sèche 375°F. Montréal et Grand Montréal. Zéro pesticide, 100% sécuritaire pour enfants et animaux.',
  keywords: ['désinsectisation', 'vapeur sèche', 'punaises de lit', 'Montréal', 'écologique', 'pest control'],
  openGraph: {
    siteName: 'Haloo-Ween',
    locale: 'fr_CA',
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="font-sans bg-[#F7FAF8] text-forest-800 antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
          <ChatWidget locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
