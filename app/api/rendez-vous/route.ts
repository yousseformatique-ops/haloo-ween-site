import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, phone, address, service, notes, date, time, locale } = await req.json();

  const companyHtml = `
    <h2>Nouveau rendez-vous</h2>
    <table>
      <tr><td><strong>Nom:</strong></td><td>${name}</td></tr>
      <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
      <tr><td><strong>Téléphone:</strong></td><td>${phone}</td></tr>
      <tr><td><strong>Adresse:</strong></td><td>${address}</td></tr>
      <tr><td><strong>Service:</strong></td><td>${service}</td></tr>
      <tr><td><strong>Date:</strong></td><td>${date}</td></tr>
      <tr><td><strong>Heure:</strong></td><td>${time}</td></tr>
      ${notes ? `<tr><td><strong>Notes:</strong></td><td>${notes}</td></tr>` : ''}
    </table>
  `;

  const confirmHtml = locale === 'fr'
    ? `
      <h2>Rendez-vous confirmé — Haloo-Ween</h2>
      <p>Bonjour ${name},</p>
      <p>Votre rendez-vous du <strong>${date} à ${time}</strong> a été enregistré.</p>
      <p>Service: <strong>${service}</strong></p>
      <p>Nous vous confirmerons sous 2 heures. Pour toute question: contact@haloo-ween.ca</p>
      <p>L'équipe Haloo-Ween</p>
    `
    : `
      <h2>Appointment Confirmed — Haloo-Ween</h2>
      <p>Hello ${name},</p>
      <p>Your appointment on <strong>${date} at ${time}</strong> has been registered.</p>
      <p>Service: <strong>${service}</strong></p>
      <p>We will confirm within 2 hours. Any questions: contact@haloo-ween.ca</p>
      <p>The Haloo-Ween Team</p>
    `;

  try {
    await Promise.all([
      resend.emails.send({
        from: process.env.EMAIL_FROM || 'noreply@haloo-ween.ca',
        to:   process.env.EMAIL_TO   || 'contact@haloo-ween.ca',
        subject: `[RDV] ${date} ${time} — ${name}`,
        html: companyHtml,
      }),
      resend.emails.send({
        from: process.env.EMAIL_FROM || 'noreply@haloo-ween.ca',
        to: email,
        subject: locale === 'fr' ? `Rendez-vous Haloo-Ween — ${date} à ${time}` : `Haloo-Ween Appointment — ${date} at ${time}`,
        html: confirmHtml,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Email error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
