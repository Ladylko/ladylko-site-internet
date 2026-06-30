/* ============================================
   LADYLKO — Index Page Translations
   ============================================ */

const indexTranslations = {
  fr: {
    "hero-pill":     "Bientôt disponible",
    "hero-title":    "Vos règles,\nsans vous arrêter.",
    "hero-sub":      "Un short cycliste qui diffuse une chaleur douce là où vous en avez besoin, quand vous en avez besoin.",
    "hero-cta":      "Rejoindre la liste d'attente",
    "hero-cta2":     "Découvrir le produit",
    "proof1":        "des femmes souffrent de douleurs menstruelles",
    "proof2":        "par an, le même problème sans vraie solution",
    "proof3":        "chaleur thérapeutique certifiée, contrôlée",
    "prob-pill":     "Le problème",
    "prob-title":    "La bouillotte reste à la maison.\nVous, non.",
    "prob-body":     "Les solutions chauffantes existantes vous obligent à rester immobile. Les patchs ne tiennent pas. Les médicaments ne sont pas une solution à long terme.",
    "prob-body2":    "Ladylko intègre la chaleur directement dans le vêtement — invisible, silencieux, efficace.",
    "prob-cta":      "Voir comment ça marche",
    "pt-pill":       "Le short Ladylko",
    "pt-title":      "Un seul vêtement.\nDeux problèmes résolus.",
    "ft1-title":     "Chaleur thérapeutique",
    "ft1-desc":      "38 à 45°C sur l'abdomen et le bas du dos. Précis, contrôlé, sécurisé.",
    "ft2-title":     "Protection absorbante",
    "ft2-desc":      "Serviette lavable intégrée. Rechargeable. Zéro déchet.",
    "ft3-title":     "8h d'autonomie",
    "ft3-desc":      "Batterie externe slim, discrète. Se recharge comme votre téléphone.",
    "pt-cta":        "Découvrir le produit",
    "gal-pill":      "En images",
    "gal-title":     "Le short Ladylko, en détail.",
    "gal-sub":       "Matières, coupe et protections lavables — chaque détail pensé pour votre confort.",
    "uni-pill":      "Notre univers",
    "uni-title":     "Pensé pour vos moments à vous.",
    "uni-sub":       "La douceur d'un cocon, la chaleur quand il faut, le confort contre la peau — au quotidien.",
    "uni-cap1":      "Confort",
    "uni-cap2":      "Douceur",
    "uni-cap3":      "Sérénité",
    "uni-cap4":      "Légèreté",
    "wl-title":      "Soyez parmi les premières.",
    "wl-sub":        "Lancement prévu décembre 2026 sur Ulule. Les inscrits en premier bénéficient d'un tarif exclusif.",
    "wl-cta":        "Rejoindre la liste",
  },
  en: {
    "hero-pill":     "Coming soon",
    "hero-title":    "Your period,\nwithout stopping you.",
    "hero-sub":      "A cycling short that delivers gentle heat exactly where you need it, when you need it.",
    "hero-cta":      "Join the waitlist",
    "hero-cta2":     "Discover the product",
    "proof1":        "of women suffer from menstrual pain",
    "proof2":        "per year, the same problem with no real solution",
    "proof3":        "certified therapeutic heat, precisely controlled",
    "prob-pill":     "The problem",
    "prob-title":    "The hot water bottle stays home.\nYou don't.",
    "prob-body":     "Existing heat solutions force you to stay still. Patches fall off when you move. Painkillers aren't a long-term solution.",
    "prob-body2":    "Ladylko integrates heat directly into the garment — invisible, silent, effective.",
    "prob-cta":      "See how it works",
    "pt-pill":       "The Ladylko Short",
    "pt-title":      "One garment.\nTwo problems solved.",
    "ft1-title":     "Therapeutic heat",
    "ft1-desc":      "up to 45°C on the abdomen and lower back. Precise, controlled, safe.",
    "ft2-title":     "Absorbent protection",
    "ft2-desc":      "Integrated reusable pad. Washable. Zero waste.",
    "ft3-title":     "8h battery life",
    "ft3-desc":      "Slim external battery, discreet. Charges like your phone.",
    "pt-cta":        "Discover the product",
    "gal-pill":      "In pictures",
    "gal-title":     "The Ladylko short, in detail.",
    "gal-sub":       "Fabrics, fit and washable pads — every detail designed for your comfort.",
    "uni-pill":      "Our world",
    "uni-title":     "Made for your own moments.",
    "uni-sub":       "The softness of a cocoon, warmth when you need it, comfort against the skin — every day.",
    "uni-cap1":      "Comfort",
    "uni-cap2":      "Softness",
    "uni-cap3":      "Serenity",
    "uni-cap4":      "Lightness",
    "wl-title":      "Be among the first.",
    "wl-sub":        "Launching December 2026 on Ulule. Early subscribers get exclusive pricing.",
    "wl-cta":        "Join the list",
  }
};

function applyIndexTranslations(lang) {
  const t = indexTranslations[lang];
  if (!t) return;

  Object.keys(t).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    // Handle newlines
    if (t[id].includes('\n')) {
      el.innerHTML = t[id].replace(/\n/g, '<br>');
    } else {
      el.textContent = t[id];
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('ladylko_lang') || 'fr';
  applyIndexTranslations(lang);
});

document.addEventListener('langchange', (e) => {
  applyIndexTranslations(e.detail.lang);
});
