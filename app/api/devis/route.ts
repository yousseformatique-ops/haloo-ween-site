import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, address, message, clientType, pestType, spaceType, subject, locale } = body;

  const isContact = body.type === 'contact';

  const companySubject = isContact
    ? `[Contact] ${subject} — ${name}`
    : `[Devis] ${clientType} / ${pestType} / ${spaceType} — ${name}`;

  const companyHtml = isContact
    ? `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Téléphone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Sujet:</strong> ${subject}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `
    : `
      <h2>Nouvelle demande de devis</h2>
      <table>
        <tr><td><strong>Nom:</strong></td><td>${name}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
        <tr><td><strong>Téléphone:</strong></td><td>${phone}</td></tr>
        <tr><td><strong>Adresse:</strong></td><td>${address}</td></tr>
        <tr><td><strong>Type de client:</strong></td><td>${clientType}</td></tr>
        <tr><td><strong>Type de nuisible:</strong></td><td>${pestType}</td></tr>
        <tr><td><strong>Superficie:</strong></td><td>${spaceType}</td></tr>
        ${message ? `<tr><td><strong>Message:</strong></td><td>${message}</td></tr>` : ''}
      </table>
    `;

  const confirmHtml = locale === 'fr'
    ? `
      <h2>Demande reçue — Haloo-Ween</h2>
      <p>Bonjour ${name},</p>
      <p>Nous avons bien reçu votre demande de devis. Un membre de notre équipe vous contactera sous 24 heures.</p>
      <p>Pour toute question, écrivez-nous à contact@haloo-ween.ca</p>
      <p>L'équipe Haloo-Ween</p>
    `
    : `
      <h2>Request Received — Haloo-Ween</h2>
      <p>Hello ${name},</p>
      <p>We have received your quote request. A team member will contact you within 24 hours.</p>
      <p>For any questions, email us at contact@haloo-ween.ca</p>
      <p>The Haloo-Ween Team</p>
    `;

  try {
    await Promise.all([
      resend.emails.send({
        from: process.env.EMAIL_FROM || 'noreply@haloo-ween.ca',
        to:   process.env.EMAIL_TO   || 'contact@haloo-ween.ca',
        subject: companySubject,
        html: companyHtml,
      }),
      resend.emails.send({
        from: process.env.EMAIL_FROM || 'noreply@haloo-ween.ca',
        to: email,
        subject: locale === 'fr' ? 'Votre demande Haloo-Ween est reçue' : 'Your Haloo-Ween request is received',
        html: confirmHtml,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Email error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
