export type Season = 'spring' | 'summer' | 'fall' | 'winter' | 'year-round';

export interface Promotion {
  id: string;
  active: boolean;
  season: Season;
  badge: { fr: string; en: string };
  title: { fr: string; en: string };
  description: { fr: string; en: string };
  discount?: string;
  expiryDate?: string;
  cta: { fr: string; en: string };
  ctaHref: string;
}

export const promotions: Promotion[] = [
  {
    id: 'summer-2025',
    active: true,
    season: 'summer',
    badge: { fr: 'Offre été 2025', en: 'Summer 2025 Deal' },
    title: {
      fr: 'Pré-déménagement Juin–Août : 10 % de rabais',
      en: 'Pre-Move June–Aug: 10% Off',
    },
    description: {
      fr: "La saison des déménagements est là. Réservez votre traitement vapeur sèche avant le grand jour et économisez 10 %. Offre valide pour toute nouvelle réservation résidentielle.",
      en: 'Moving season is here. Book your dry steam treatment before the big day and save 10%. Valid for all new residential bookings.',
    },
    discount: '10%',
    expiryDate: '2025-08-31',
    cta: { fr: 'Réserver maintenant', en: 'Book Now' },
    ctaHref: '/rendez-vous',
  },
  {
    id: 'senior-annual',
    active: true,
    season: 'year-round',
    badge: { fr: 'Contrat annuel', en: 'Annual Contract' },
    title: {
      fr: 'Résidences pour aînés : protection continue',
      en: 'Senior Residences: Ongoing Protection',
    },
    description: {
      fr: "Contrats récurrents pour résidences pour aînés et CHSLD. Interventions planifiées, zéro odeur, zéro résidu toxique, zéro perturbation.",
      en: 'Recurring contracts for senior residences and care homes. Scheduled treatments, odor-free, no toxic residue, zero disruption.',
    },
    cta: { fr: 'Demander un devis', en: 'Request a Quote' },
    ctaHref: '/devis',
  },
  {
    id: 'fall-special',
    active: false,
    season: 'fall',
    badge: { fr: 'Spécial automne', en: 'Fall Special' },
    title: {
      fr: 'Automne : coquerelles et fourmis — traitement express',
      en: 'Fall: Cockroaches & Ants — Express Treatment',
    },
    description: {
      fr: "Avec le froid, les insectes cherchent la chaleur. Traitez dès maintenant avec notre vapeur sèche 375°F avant l'invasion.",
      en: "As temperatures drop, insects seek warmth. Treat now with our 375°F dry steam before they settle in.",
    },
    discount: '15%',
    expiryDate: '2025-11-30',
    cta: { fr: 'Réserver', en: 'Book' },
    ctaHref: '/rendez-vous',
  },
];

export function getActivePromotions(): Promotion[] {
  return promotions.filter((p) => p.active);
}

export const seasonColors: Record<Season, { bg: string; text: string; border: string }> = {
  summer:      { bg: 'bg-amber-50',   text: 'text-amber-700',  border: 'border-amber-200' },
  spring:      { bg: 'bg-forest-100', text: 'text-forest-700', border: 'border-forest-300' },
  fall:        { bg: 'bg-orange-50',  text: 'text-orange-700', border: 'border-orange-200' },
  winter:      { bg: 'bg-blue-50',    text: 'text-blue-700',   border: 'border-blue-200' },
  'year-round':{ bg: 'bg-forest-100', text: 'text-forest-700', border: 'border-forest-300' },
};
