/* LADYLKO — Product Page Translations */
const productTranslations = {
  fr: {
    "ph-pill":     "Le short Ladylko",
    "ph-title":    "Conçu pour votre quotidien.\nPas pour le tiroir.",
    "ph-sub":      "Un vêtement technique qui combine chaleur thérapeutique et protection absorbante. Discret. Durable. Efficace.",
    "ph-cta":      "Être notifiée au lancement",
    "how-pill":    "Comment ça marche",
    "how-title":   "Trois composants.\nUne seule solution.",
    "step1-title": "Le textile",
    "step1-desc":  "87% polyamide, 13% élasthanne. Taille haute 12 cm. Confort toute la journée, maintien précis.",
    "step2-title": "Le module chauffant",
    "step2-desc":  "Module MEC Addheat certifié intégré dans la ceinture. Deux poches thermiques (avant et dos). Température jusqu'à 45°C avec capteur de sécurité.",
    "step3-title": "La protection absorbante",
    "step3-desc":  "Serviette lavable vendue en set de 3. Fixation par pression nickel-free. Réutilisable, zéro déchet.",
    "spec-pill":   "Caractéristiques",
    "spec-title":  "Ce que vous portez.\nCe qui compte.",
    "sl1": "Température", "sl2": "Autonomie", "sl3": "Batterie", "sl4": "Matière", "sl5": "Tailles disponibles", "sl6": "Couleur",
    "safe-pill":  "Sécurité",
    "safe-title": "Conçu pour être porté en confiance.",
    "safe-body":  "Module chauffant certifié, capteur thermique, isolation 1,5 mm entre l'élément et la peau. Conforme CE, OEKO-TEX, REACH.",
    "pcta-title": "Lancement décembre 2026.\nSoyez prête.",
    "pcta-btn":   "Rejoindre la liste d'attente",
  },
  en: {
    "ph-pill":     "The Ladylko Short",
    "ph-title":    "Built for your daily life.\nNot for a drawer.",
    "ph-sub":      "A technical garment combining therapeutic heat and integrated absorbent protection. Discreet. Sustainable. Effective.",
    "ph-cta":      "Get notified at launch",
    "how-pill":    "How it works",
    "how-title":   "Three components.\nOne solution.",
    "step1-title": "The textile",
    "step1-desc":  "87% polyamide, 13% elastane. 12 cm high waistband. All-day comfort with precise support.",
    "step2-title": "The heating module",
    "step2-desc":  "Certified MEC Addheat module integrated into the waistband. Two thermal pockets (front and back). Temperature jusqu'à 45°C with safety sensor.",
    "step3-title": "The absorbent protection",
    "step3-desc":  "Washable pad sold as a set of 3. Nickel-free snap attachment. Reusable, zero waste.",
    "spec-pill":   "Specifications",
    "spec-title":  "What you wear.\nWhat matters.",
    "sl1": "Temperature", "sl2": "Battery life", "sl3": "Battery", "sl4": "Material", "sl5": "Available sizes", "sl6": "Color",
    "safe-pill":  "Safety",
    "safe-title": "Built to be worn with confidence.",
    "safe-body":  "Certified heating module, thermal sensor, 1.5 mm isolation between element and skin. CE, OEKO-TEX, REACH compliant.",
    "pcta-title": "Launching December 2026.\nBe ready.",
    "pcta-btn":   "Join the waitlist",
  }
};

function applyProductTranslations(lang) {
  const t = productTranslations[lang];
  if (!t) return;
  Object.keys(t).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = t[id].includes('\n') ? t[id].replace(/\n/g, '<br>') : t[id];
  });
}

document.addEventListener('DOMContentLoaded', () => applyProductTranslations(localStorage.getItem('ladylko_lang') || 'fr'));
document.addEventListener('langchange', (e) => applyProductTranslations(e.detail.lang));
