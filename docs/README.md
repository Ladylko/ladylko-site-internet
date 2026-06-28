# AdPilot — Studio marketing Ladylko

Outil interne pour piloter les publications TikTok & Instagram : bibliothèque
d'inspirations, planning, création de posts, charte graphique et liens Canva.

> ⚠️ **Usage interne uniquement.** Cet outil n'est pas lié au site vitrine
> public. Accédez-y directement par `/app/index.html`. La page est en
> `noindex` pour ne pas apparaître sur Google.

## Lancer

Même méthode que le site : ouvrir `app/index.html` avec Live Server, ou
`python -m http.server` puis aller sur `…/app/`.

## Ce qui fonctionne déjà (sans serveur)

Tout est **100 % utilisable** dès maintenant. Les données sont sauvegardées
dans le navigateur (`localStorage`, clé `adpilot_ladylko_v1`).

- **Accueil** — vue d'ensemble + raccourcis directs (poster TikTok/Insta, Canva)
- **Bibliothèque** — chaque inspiration porte : ordre de post, importance
  (haute/moyenne/basse), jour, heure, méthode (« comment poster »), légende,
  instructions de tournage, tags, statut (idée → brouillon → prêt → publié),
  lien image et lien Canva. Filtres par plateforme/statut + tri.
- **Planning** — vue liste par jour et vue semaine.
- **Créer un post** — formulaire + aperçu live + bouton « copier la légende »
  et raccourci direct vers TikTok/Instagram.
- **Connexions** — état des comptes (simulation pour tester l'UI).
- **Charte & Canva** — palette (clic = copie du code couleur), typos, liens
  Canva éditables (ajout/retrait).

## Design

- Structure façon **admin Shopify (Polaris)** : sidebar, topbar, cartes.
- Finitions **iOS** : coins ronds, toggles, segmented controls, et sur mobile
  une **barre d'onglets en bas** (style app iPhone).
- Couleurs de marque Ladylko (prune `#4F1B64`, rose `#F1B1B4`).

## Feuille de route — intégrations réelles (nécessite un back-end)

Les connexions « réelles » exigent un petit serveur sécurisé (OAuth + secrets)
et des accès développeur officiels. Points d'attention par plateforme :

| Plateforme | Possible | Impossible |
|---|---|---|
| **TikTok** (Content Posting API) | Envoyer un post comme **brouillon**, récupérer le lien d'une vidéo publiée, lire les stats (compte Business) | ❌ **Lire les brouillons** créés dans l'app TikTok (non exposé par l'API) |
| **Instagram** (Meta Graph API) | Publier/programmer un post ou Reel, lire les **statistiques** (portée, abonnés), récupérer les liens | ❌ Lire les « pré-posts »/brouillons non publiés |
| **Canva** (Connect API) | Lister les designs, afficher un aperçu, ouvrir l'édition par **lien direct** (sans extension) | — |

Étapes pour brancher le réel :
1. Créer un back-end (ex. Node/Express ou serverless) qui gère l'OAuth et
   stocke les jetons de façon sécurisée — **jamais** côté navigateur.
2. Créer les apps développeur : TikTok for Developers, Meta for Developers
   (Instagram Graph API), Canva Connect — et passer leur validation.
3. Remplacer les actions « simulées » de `js/app.js` (fonction `connectFlow`)
   par les appels au back-end.

## Structure

```
app/
├── index.html        ← application (une seule page, sections par onglet)
├── css/app.css       ← design system Shopify/iOS
├── js/app.js         ← logique + données locales
└── README.md
```
