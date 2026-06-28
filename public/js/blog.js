/* LADYLKO — Blog JS */
const blogTranslations = {
  fr: {
    "blog-pill":    "Articles",
    "blog-title":   "Ce que vous\nméritez de savoir.",
    "blog-sub":     "Douleurs menstruelles, thermothérapie, conseils — des contenus sourcés, sans bruit.",
    "bc1-cat":      "Douleurs menstruelles",
    "bc1-title":    "La chaleur contre les règles douloureuses : ce que dit la science",
    "bc1-excerpt":  "La thermothérapie est recommandée par les gynécologues depuis des décennies. Mais pourquoi est-elle si efficace ? Ce que disent les études.",
    "bc1-date":     "Avril 2026", "bc1-read": "Lire l'article",
    "bc2-cat":      "Bien-être",
    "bc2-title":    "50% des femmes souffrent. Pourquoi le marché ne répond pas vraiment.",
    "bc2-excerpt":  "Patchs, bouillottes, médicaments : un état des lieux honnête des solutions qui existent, et de ce qu'elles ne font pas.",
    "bc2-date":     "Mars 2026", "bc2-read": "Lire",
    "bc3-cat":      "Témoignages",
    "bc3-title":    "« Je ne voulais plus choisir entre soulagement et vie normale. »",
    "bc3-excerpt":  "Trois femmes partagent leur quotidien avec des douleurs menstruelles fortes, et comment elles les gèrent aujourd'hui.",
    "bc3-date":     "Février 2026", "bc3-read": "Lire",
    "nl-title":     "Recevez nos articles.",
    "nl-sub":       "Une fois par semaine. Rien de superflu.",
    "nl-btn":       "S'abonner",
  },
  en: {
    "blog-pill":    "Articles",
    "blog-title":   "What you\ndeserve to know.",
    "blog-sub":     "Menstrual pain, heat therapy, tips — sourced content, no noise.",
    "bc1-cat":      "Menstrual pain",
    "bc1-title":    "Heat against painful periods: what science says",
    "bc1-excerpt":  "Heat therapy has been recommended by gynaecologists for decades. But why is it so effective? What the studies show.",
    "bc1-date":     "April 2026", "bc1-read": "Read article",
    "bc2-cat":      "Wellness",
    "bc2-title":    "50% of women suffer. Why the market still doesn't answer.",
    "bc2-excerpt":  "Patches, hot water bottles, medication: an honest overview of existing solutions, and what they don't do.",
    "bc2-date":     "March 2026", "bc2-read": "Read",
    "bc3-cat":      "Stories",
    "bc3-title":    "\"I didn't want to choose between relief and normal life.\"",
    "bc3-excerpt":  "Three women share their daily life with severe menstrual pain, and how they manage it today.",
    "bc3-date":     "February 2026", "bc3-read": "Read",
    "nl-title":     "Get our articles.",
    "nl-sub":       "Once a week. Nothing superfluous.",
    "nl-btn":       "Subscribe",
  }
};

function applyBlogTranslations(lang) {
  const t = blogTranslations[lang];
  if (!t) return;
  Object.keys(t).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = t[id].includes('\n') ? t[id].replace(/\n/g, '<br>') : t[id];
  });

  const nlEmail = document.getElementById('nl-email');
  if (nlEmail) nlEmail.placeholder = lang === 'fr' ? 'votre@email.com' : 'your@email.com';
}

function initBlog() {
  const form = document.getElementById('nl-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('nl-email');
    const email = input.value.trim();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      input.classList.add('error');
      input.focus();
      return;
    }
    input.classList.remove('error');
    const btn = document.getElementById('nl-btn');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = '...';

    // Enregistrement sur la plateforme (Vercel — /api/newsletter)
    fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, lang: localStorage.getItem('ladylko_lang') || 'fr' })
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Erreur réseau');
        }
        btn.textContent = '✓';
      })
      .catch((err) => {
        console.error('Newsletter submit error:', err);
        btn.disabled = false;
        btn.textContent = originalText;
        input.classList.add('error');
      });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyBlogTranslations(localStorage.getItem('ladylko_lang') || 'fr');
  initBlog();
});
document.addEventListener('langchange', (e) => applyBlogTranslations(e.detail.lang));
