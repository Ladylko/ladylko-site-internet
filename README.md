# Ladylko — Site Web

Site vitrine pré-lancement. Bilingue FR/EN. 6 pages.

> **Déploiement Vercel** : voir [`DEPLOIEMENT-VERCEL.md`](DEPLOIEMENT-VERCEL.md).
> Le site est dans `public/`, les formulaires sont enregistrés sur la plateforme
> via Vercel KV, et les données se consultent sur `/admin.html`.

## Structure du projet

```
ladylko/
├── index.html              ← Page d'accueil
├── pages/
│   ├── product.html        ← Page produit
│   ├── waitlist.html       ← Liste d'attente (formulaire)
│   ├── story.html          ← Notre histoire
│   ├── blog.html           ← Articles
│   └── contact.html        ← Contact
├── css/
│   ├── variables.css       ← Design system (couleurs, typo, spacing)
│   ├── components.css      ← Nav, footer, boutons, utilitaires
│   ├── index.css
│   ├── product.css
│   ├── waitlist.css
│   ├── story.css
│   ├── blog.css
│   └── contact.css
├── js/
│   ├── global.js           ← Nav, footer, scroll reveal, langue
│   ├── index.js
│   ├── product.js
│   ├── waitlist.js
│   ├── story.js
│   ├── blog.js
│   └── contact.js
└── assets/                 ← Mettre vos images ici
    └── (product.jpg, etc.)
```

## Lancer le site localement

### Option 1 — Extension VS Code (recommandée)
1. Installer l'extension **Live Server** (ritwickdey.LiveServer)
2. Clic droit sur `index.html` → "Open with Live Server"
3. Le site s'ouvre sur `http://127.0.0.1:5500`

### Option 2 — Ligne de commande
```bash
# Python 3
python -m http.server 5500
# puis ouvrir http://localhost:5500
```

## Ajouter vos photos produit

Remplacez les blocs `.prod-img-placeholder` par :
```html
<img src="../assets/product.jpg" alt="Short Ladylko" style="width:100%;height:100%;object-fit:cover;">
```

## Connecter la liste d'attente (Brevo / Mailchimp)

Dans `js/waitlist.js`, remplacez le bloc `setTimeout` par un appel API :

```js
// Exemple Brevo (Sendinblue)
fetch('https://api.brevo.com/v3/contacts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'api-key': 'VOTRE_CLE_API'
  },
  body: JSON.stringify({
    email: entry.email,
    attributes: { PRENOM: entry.firstName },
    listIds: [VOTRE_LISTE_ID]
  })
});
```

## Palette couleurs

| Variable       | Hex       | Usage          |
|----------------|-----------|----------------|
| `--prune`      | `#4F1B64` | Couleur primaire |
| `--rose`       | `#F1B1B4` | Accent         |
| `--poudre`     | `#F2C4CD` | Fond doux      |
| `--ivoire`     | `#FAF7F5` | Fond principal |
| `--charcoal`   | `#1A1A1A` | Texte          |

## Typographies

- **Titres** : DM Serif Display (Google Fonts)
- **Corps** : Inter (Google Fonts)

## Déploiement recommandé

- **Netlify** : glisser-déposer le dossier `ladylko/` → URL immédiate
- **Vercel** : `vercel deploy` depuis le dossier
- **GitHub Pages** : push sur branche `main`, activer Pages dans Settings
