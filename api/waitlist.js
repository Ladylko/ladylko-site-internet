/** POST /api/waitlist — inscription à la liste d'attente. */
import { saveSubmission, isStoreConfigured } from './_store.js';
import { isValidEmail, clean, readJsonBody } from './_util.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  if (!isStoreConfigured()) {
    return res.status(503).json({
      error: "Stockage non configuré. Créez un store Vercel KV pour activer l'enregistrement.",
    });
  }

  const body = await readJsonBody(req);
  const firstName = clean(body.firstName, 120);
  const email = clean(body.email, 254);
  const pain = clean(body.pain, 40);

  if (!firstName) return res.status(400).json({ error: 'Prénom requis' });
  if (!isValidEmail(email)) return res.status(400).json({ error: 'Email invalide' });

  const entry = {
    firstName,
    email,
    pain,
    lang: clean(body.lang, 5),
    date: new Date().toISOString(),
  };

  try {
    const { duplicate } = await saveSubmission('waitlist', entry);
    return res.status(200).json({ ok: true, duplicate });
  } catch (err) {
    console.error('waitlist save error', err);
    return res.status(500).json({ error: "Erreur lors de l'enregistrement" });
  }
}
