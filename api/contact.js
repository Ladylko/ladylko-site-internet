/** POST /api/contact — message du formulaire de contact. */
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
  const name = clean(body.name, 160);
  const email = clean(body.email, 254);
  const subject = clean(body.subject, 40);
  const message = clean(body.message, 5000);

  if (!name) return res.status(400).json({ error: 'Nom requis' });
  if (!isValidEmail(email)) return res.status(400).json({ error: 'Email invalide' });
  if (!message) return res.status(400).json({ error: 'Message requis' });

  const entry = {
    name,
    email,
    subject,
    message,
    lang: clean(body.lang, 5),
    date: new Date().toISOString(),
  };

  try {
    await saveSubmission('contact', entry);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact save error', err);
    return res.status(500).json({ error: "Erreur lors de l'enregistrement" });
  }
}
