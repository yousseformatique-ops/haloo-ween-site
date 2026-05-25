import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de Haloo-Ween, une entreprise de désinsectisation écologique à la vapeur sèche 375°F à Montréal.

SERVICES ET TARIFS:
- Pré-déménagement: à partir de 350$. On assainit le logement avant l'emménagement.
- Résidentiel (punaises, coquerelles, fourmis): à partir de 300$. Studio/3½: 300$, 4½/5½: 400$, Maison: 550$+.
- Résidences pour aînés / CHSLD: contrats annuels sur devis personnalisé.

MÉTHODE:
- Vapeur sèche 375°F (190°C) — tue insectes adultes ET œufs
- 0 produit chimique, 0 résidu toxique
- 2 visites incluses (traitement + visite de contrôle)
- Réintégration immédiate après traitement (pas d'évacuation)
- 100% sécuritaire pour enfants, aînés et animaux

ZONE DE SERVICE: Montréal, Laval, Longueuil, Rive-Sud, Rive-Nord.

CONTACT: formulaire de devis sur le site ou par email contact@haloo-ween.ca

INSTRUCTIONS:
- Réponds dans la langue de l'utilisateur (français ou anglais)
- Sois chaleureux, professionnel et concis (max 3-4 phrases par réponse)
- Guide les clients vers /devis pour un devis ou /rendez-vous pour prendre RDV
- Ne donne jamais de prix définitifs — toujours dire "à partir de" ou recommander le devis en ligne`;

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'API key manquante' }, { status: 500 });
  }

  try {
    const { messages } = await req.json();

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages,
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';

    return NextResponse.json({ text });
  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
