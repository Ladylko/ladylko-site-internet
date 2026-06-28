/**
 * GET /api/submissions?type=waitlist|contact|newsletter|all
 *
 * Endpoint d'administration : renvoie les soumissions enregistrées.
 * PROTÉGÉ — données personnelles sensibles (emails, niveaux de douleur).
 * Requiert l'en-tête  Authorization: Bearer <ADMIN_TOKEN>
 * où ADMIN_TOKEN est une variable d'environnement définie dans Vercel.
 */
import { listSubmissions, isStoreConfigured } from './_store.js';

function authorized(req) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false;
  const header = req.headers.authorization || '';
  const bearer = header.startsWith('Bearer ') ? header.slice(7) : '';
  const provided = bearer || req.headers['x-admin-token'] || '';
  return provided === token;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  if (!process.env.ADMIN_TOKEN) {
    return res.status(503).json({
      error: "Accès admin non configuré. Définissez la variable d'environnement ADMIN_TOKEN dans Vercel.",
    });
  }

  if (!authorized(req)) {
    res.setHeader('WWW-Authenticate', 'Bearer');
    return res.status(401).json({ error: 'Non autorisé' });
  }

  if (!isStoreConfigured()) {
    return res.status(503).json({ error: 'Stockage non configuré (Vercel KV).' });
  }

  const type = (req.query.type || 'all').toString();

  try {
    if (type === 'all') {
      const [waitlist, contact, newsletter] = await Promise.all([
        listSubmissions('waitlist'),
        listSubmissions('contact'),
        listSubmissions('newsletter'),
      ]);
      return res.status(200).json({
        counts: {
          waitlist: waitlist.length,
          contact: contact.length,
          newsletter: newsletter.length,
        },
        waitlist,
        contact,
        newsletter,
      });
    }

    if (!['waitlist', 'contact', 'newsletter'].includes(type)) {
      return res.status(400).json({ error: 'Type invalide' });
    }

    const items = await listSubmissions(type);
    return res.status(200).json({ type, count: items.length, items });
  } catch (err) {
    console.error('submissions read error', err);
    return res.status(500).json({ error: 'Erreur lors de la lecture' });
  }
}
