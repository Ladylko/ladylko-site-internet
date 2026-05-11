# Publication Ladylko — Option A

Site statique hébergé en gratuit + Shopify pour le commerce uniquement.

---

## PARTIE 1 — Mettre le site en ligne (Netlify, gratuit)

### A. Créer le compte Netlify
1. Va sur https://app.netlify.com/signup
2. Inscris-toi avec ton compte GitHub ou ton email

### B. Déployer le site (méthode glisser-déposer, la plus simple)
1. Une fois connecté, va sur https://app.netlify.com/drop
2. Ouvre le Finder, sélectionne le dossier `ladylko 12/` complet
3. **Glisse-le** dans la zone de dépôt Netlify
4. Attends 30 secondes — ton site est en ligne sur une URL du type `https://nom-aleatoire-xyz.netlify.app`

### C. Renommer l'URL temporaire (optionnel)
1. Dans Netlify → ton site → **Site configuration** → **Change site name**
2. Mets `ladylko` → l'URL devient `https://ladylko.netlify.app`

### D. Brancher le domaine `ladylko.com`
1. Dans Netlify → ton site → **Domain management** → **Add custom domain**
2. Entre `ladylko.com` → Netlify te donne 4 serveurs DNS du type :
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```
3. Va chez ton registrar (OVH, GoDaddy, Gandi, Namecheap…) où tu as acheté `ladylko.com`
4. Trouve la section **DNS / Serveurs DNS / Nameservers**
5. Remplace les nameservers actuels par les 4 fournis par Netlify
6. **Patiente 1 à 24 h** : le DNS se propage. Pendant ce temps, ton site est déjà accessible via `ladylko.netlify.app`
7. Le HTTPS est généré automatiquement par Netlify (Let's Encrypt) une fois le DNS propagé

### E. Mises à jour futures
À chaque modification du site :
- **Méthode simple** : retourne sur https://app.netlify.com/drop et glisse à nouveau le dossier complet → écrase l'ancienne version
- **Méthode pro** (recommandée à terme) : connecter un dépôt GitHub → chaque commit redéploie automatiquement

---

## PARTIE 2 — Activer la vente avec Shopify (Buy Button)

### A. Créer le produit dans Shopify
1. Connecte-toi à ton **admin Shopify** (https://admin.shopify.com)
2. Va dans **Products → Add product**
3. Remplis :
   - **Title** : `Short cycliste chauffant Ladylko`
   - **Description** : reprends ce qui est sur la page produit (chaleur 38–45 °C, 8h d'autonomie, absorbant intégré, certifié CE / OEKO-TEX / REACH)
   - **Media** : ajoute les photos (`product-lifestyle.jpg`, `product-3d-preview.jpg`, etc.)
   - **Pricing** : ton prix de vente
   - **Inventory** : coche **Track quantity** et entre 0 si tu n'as pas encore de stock — Shopify affichera "Sold out" tant que c'est à 0
   - **Variants** : ajoute les tailles (XS, S, M, L, XL)
   - **Status** : `Active`
4. **Save**

### B. Activer Shopify Buy Button
1. Toujours dans l'admin Shopify : **Settings → Apps and sales channels**
2. Cherche **Buy Button** dans la liste — si pas installé, clique **Shopify App Store** et installe-le (gratuit avec Shopify Lite/Starter)
3. Une fois installé, va dans **Sales channels → Buy Button → Create a Buy Button**
4. Choisis **Product Buy Button** → sélectionne `Short cycliste chauffant Ladylko`

### C. Configurer le bouton (style cohérent avec le site)
1. **Layout** : `Classic layout` (juste le bouton et le prix)
2. **Button style** :
   - Background color : `#6B2737` (Bordeaux Velours, ton primaire)
   - Text color : `#FFFFFF`
   - Border radius : `999px` (bouton arrondi pour matcher le design)
   - Font : `Inter`
3. **Action** : `Add to cart and open cart`
4. **Cart popup** : laisse le défaut de Shopify
5. Clique **Next → Generate code**

### D. Coller le snippet sur ta page produit
1. Shopify te donne un code à copier (deux blocs : un `<div id="product-component-...">` et un `<script>`)
2. Ouvre `pages/product.html` dans ton éditeur (ou via Netlify)
3. Cherche le bloc :
   ```html
   <!-- SHOPIFY_BUY_BUTTON_START -->

   <!-- PASTE_SNIPPET -->

   <!-- SHOPIFY_BUY_BUTTON_END -->
   ```
4. Remplace `<!-- PASTE_SNIPPET -->` par tout le code copié de Shopify
5. **Sauvegarde** et **redéploie** sur Netlify (glisse le dossier à nouveau)

### E. Tester
1. Ouvre `https://ladylko.com/pages/product.html`
2. Le bouton "Add to cart" Shopify doit apparaître à côté de "Rejoindre la liste d'attente"
3. Clique → un panneau de panier s'ouvre → checkout Shopify

---

## PARTIE 3 — Recommandations

### Pendant la phase pré-lancement (mai 2026 → décembre 2026)
- Garde **les deux CTA** côte à côte sur la page produit :
  - "Rejoindre la liste d'attente" (waitlist email — collecte les leads pour Ulule)
  - "Pré-commander" via Shopify (si tu actives la pré-commande)
- OU mets le Buy Button en **"Coming soon"** : dans Shopify, mets le stock à 0 → le bouton affiche automatiquement "Sold out". Tu peux le repasser à dispo le jour du lancement.

### Suivi des commandes
Toutes les commandes arrivent automatiquement dans :
- **Shopify Admin → Orders**
- Tu reçois un email à chaque vente
- Stats temps réel : **Analytics → Reports**

### Domaine et email
- L'email `mateo.ledeme@ladylko.com` doit être configuré chez ton registrar (OVH, Gandi…) ou via un service (Google Workspace, Zoho, Proton)
- Cela ne dépend PAS de Netlify ni de Shopify

### Coût total mensuel (estimation)
| Service | Coût |
|---------|------|
| Hébergement site (Netlify) | 0 € |
| Domaine `ladylko.com` | déjà payé (~12 €/an) |
| Shopify Lite ou Starter | ~9 €/mois |
| Email pro (optionnel) | 0 à 6 €/mois selon le service |
| **TOTAL** | **~9 €/mois** jusqu'au lancement |

---

## Aide en cas de blocage
- **Netlify** : https://docs.netlify.com/domains-https/custom-domains/
- **Shopify Buy Button** : https://help.shopify.com/en/manual/online-sales-channels/buy-button
