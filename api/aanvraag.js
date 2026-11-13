// Vercel serverless function: ontvangt het aanvraagformulier en mailt het door.
//
// Instellen in Vercel (Project → Settings → Environment Variables):
//   RESEND_API_KEY   API-sleutel van https://resend.com (verplicht)
//   LEAD_TO_EMAIL    ontvanger, standaard info@greenmatter.nl
//   LEAD_FROM_EMAIL  afzender op een in Resend geverifieerd domein,
//                    bijv. "Sportpark van de Toekomst <aanvraag@hetsportparkvandetoekomst.nl>"
//
// Zonder RESEND_API_KEY antwoordt de functie met 503; de website opent dan
// automatisch het mailprogramma met de aanvraag erin.

const MAX_LENGTH = 4000;

function clean(value, max = 300) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body ?? {};

  if (typeof body === 'string') {
    try {
      body = JSON.parse(body || '{}');
    } catch {
      return res.status(400).json({ error: 'Ongeldige aanvraag.' });
    }
  }

  // Honeypot: bots vullen dit veld in. Doe alsof het gelukt is.
  if (clean(body.website)) {
    return res.status(200).json({ ok: true });
  }

  const lead = {
    name: clean(body.name),
    email: clean(body.email),
    phone: clean(body.phone, 60),
    organisation: clean(body.organisation),
    role: clean(body.role, 40),
    phase: clean(body.phase, 40),
    message: clean(body.message, MAX_LENGTH),
    language: clean(body.language, 5),
    page: clean(body.page, 500),
    solutions: Array.isArray(body.solutions)
      ? body.solutions.map((item) => clean(item, 120)).filter(Boolean).slice(0, 30)
      : [],
  };

  if (!lead.name || !lead.organisation || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return res.status(400).json({ error: 'Naam, organisatie en een geldig e-mailadres zijn verplicht.' });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return res.status(503).json({ error: 'Formulierdienst is niet ingesteld.' });
  }

  const rows = [
    ['Naam', lead.name],
    ['Organisatie', lead.organisation],
    ['E-mail', lead.email],
    ['Telefoon', lead.phone || '-'],
    ['Rol', lead.role],
    ['Projectfase', lead.phase],
    ['Gekozen oplossingen', lead.solutions.join(', ') || '-'],
    ['Toelichting', lead.message || '-'],
    ['Taal', lead.language],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');
  const html = `<h2>Nieuwe aanvraag via hetsportparkvandetoekomst.nl</h2><table>${rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" valign="top">${label}</th><td>${escapeHtml(value).replace(/\n/g, '<br>')}</td></tr>`,
    )
    .join('')}</table>`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL || 'Sportpark van de Toekomst <onboarding@resend.dev>',
      to: [process.env.LEAD_TO_EMAIL || 'info@greenmatter.nl'],
      reply_to: lead.email,
      subject: `Aanvraag Sportpark van de Toekomst – ${lead.organisation}`,
      text,
      html,
    }),
  });

  if (!response.ok) {
    return res.status(502).json({ error: 'Versturen mislukt.' });
  }

  return res.status(200).json({ ok: true });
}
