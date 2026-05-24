import Hero from '@/components/home/Hero';
import TrustStrip from '@/components/home/TrustStrip';
import Services from '@/components/home/Services';
import Comparison from '@/components/home/Comparison';
import HowItWorks from '@/components/home/HowItWorks';
import PromoBanner from '@/components/home/PromoBanner';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import FooterCTA from '@/components/home/FooterCTA';

interface PageProps { params: { locale: string } }

export default function HomePage({ params: { locale } }: PageProps) {
  return (
    <>
      <Hero locale={locale} />
      <TrustStrip />
      <Services locale={locale} />
      <Comparison />
      <HowItWorks />
      <PromoBanner locale={locale as 'fr' | 'en'} />
      <Testimonials />
      <FAQ />
      <FooterCTA locale={locale} />
    </>
  );
}
