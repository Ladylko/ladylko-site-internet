# Déploiement du site Ladylko sur Vercel

Ce dépôt est prêt pour Vercel : le site marketing est servi en statique, et les
formulaires (liste d'attente, contact, newsletter) sont enregistrés **directement
sur la plateforme** via un store **Vercel KV**. Aucun service tiers.

## Structure

```
.
├── public/              ← le site (servi en statique)
│   ├── index.html
│   ├── admin.html       ← tableau de bord des données (protégé)
│   ├── pages/ css/ js/ assets/
├── api/                 ← fonctions serverless (collecte des données)
│   ├── waitlist.js      → POST /api/waitlist
│   ├── contact.js       → POST /api/contact
│   ├── newsletter.js    → POST /api/newsletter
│   ├── submissions.js   → GET  /api/submissions  (admin, protégé)
│   ├── _store.js        ← stockage Vercel KV
│   └── _util.js
├── vercel.json
└── package.json
```

## 1. Mettre le site en ligne

1. Sur https://vercel.com → **Add New… → Project**.
2. **Import** le dépôt GitHub `ladylko/ladylko-site-internet`.
3. Vercel détecte automatiquement la configuration (rien à changer) → **Deploy**.
4. Le site est en ligne sur une URL `https://<projet>.vercel.app`.

> Branche : ce travail est sur `claude/deploy-marketing-site-internal-bjb8ik`.
> Mergez-la dans `main` (ou réglez la branche de production sur cette branche)
> pour que Vercel la déploie.

## 2. Activer l'enregistrement des données (Vercel KV) — **obligatoire**

Tant que le store n'est pas créé, les formulaires renvoient une erreur 503.

1. Dans le projet Vercel → onglet **Storage** → **Create Database** → **KV**
   (Redis, fourni via le Marketplace — offre gratuite suffisante au lancement).
2. **Connectez** ce store au projet. Vercel ajoute automatiquement les variables
   d'environnement `KV_REST_API_URL` et `KV_REST_API_TOKEN`.
3. **Redéployez** (Deployments → … → Redeploy) pour que les variables soient prises en compte.

Les soumissions sont alors stockées sous les clés `ladylko:waitlist`,
`ladylko:contact`, `ladylko:newsletter`.

## 3. Consulter les données — page d'administration

1. Définissez un jeton secret : projet Vercel → **Settings → Environment Variables**
   → ajoutez `ADMIN_TOKEN` = *(une longue chaîne aléatoire de votre choix)*.
2. Redéployez.
3. Ouvrez `https://<projet>.vercel.app/admin.html`, saisissez le jeton.
4. Vous voyez les trois tableaux (liste d'attente, contact, newsletter), avec
   export **CSV** pour chaque.

> ⚠️ Les données collectées sont personnelles (emails) et certaines sensibles
> (niveaux de douleurs menstruelles = donnée de santé au sens du RGPD). La page
> admin et l'API de lecture sont protégées par `ADMIN_TOKEN` et exclues de
> l'indexation. Ne partagez pas ce jeton.

## 4. Domaine personnalisé (optionnel)

Projet Vercel → **Settings → Domains** → ajoutez `ladylko.com` et suivez les
instructions DNS.

## Tester en local (optionnel)

```bash
npm install
npx vercel dev        # nécessite un compte Vercel + un store KV lié
```

Pour un simple aperçu visuel sans les formulaires :
`python3 -m http.server -d public 5500` puis http://localhost:5500
