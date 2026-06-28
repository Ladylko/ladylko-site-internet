/**
 * Stockage partagé des soumissions de formulaires — Ladylko.
 *
 * Les données sont enregistrées directement sur la plateforme Vercel via
 * Vercel KV (base Redis managée). Aucun service tiers : tout reste chez vous.
 *
 * Configuration : créez un store « KV » dans votre projet Vercel
 * (Storage → Create Database → KV). Vercel injecte automatiquement les
 * variables d'environnement KV_REST_API_URL et KV_REST_API_TOKEN.
 */

import { kv } from '@vercel/kv';

// Clés Redis utilisées pour chaque type de formulaire.
export const KEYS = {
  waitlist: 'ladylko:waitlist',
  contact: 'ladylko:contact',
  newsletter: 'ladylko:newsletter',
};

// Sets de déduplication par email (waitlist + newsletter).
const EMAIL_SET = {
  waitlist: 'ladylko:waitlist:emails',
  newsletter: 'ladylko:newsletter:emails',
};

/** Indique si le stockage Vercel KV est configuré. */
export function isStoreConfigured() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

/**
 * Enregistre une soumission.
 * @returns {Promise<{stored: boolean, duplicate: boolean}>}
 */
export async function saveSubmission(type, entry) {
  const listKey = KEYS[type];
  if (!listKey) throw new Error(`Type de formulaire inconnu : ${type}`);

  // Déduplication par email lorsque pertinent.
  const setKey = EMAIL_SET[type];
  if (setKey && entry.email) {
    const isNew = await kv.sadd(setKey, entry.email.toLowerCase());
    if (isNew === 0) {
      return { stored: false, duplicate: true };
    }
  }

  // La soumission la plus récente est en tête de liste.
  await kv.lpush(listKey, JSON.stringify(entry));
  return { stored: true, duplicate: false };
}

/** Récupère toutes les soumissions d'un type (plus récentes en premier). */
export async function listSubmissions(type) {
  const listKey = KEYS[type];
  if (!listKey) throw new Error(`Type de formulaire inconnu : ${type}`);
  const raw = await kv.lrange(listKey, 0, -1);
  return raw.map((item) => {
    if (typeof item === 'string') {
      try {
        return JSON.parse(item);
      } catch {
        return { raw: item };
      }
    }
    return item;
  });
}
