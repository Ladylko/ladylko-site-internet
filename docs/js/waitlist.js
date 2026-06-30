/* LADYLKO — Waitlist Page JS */

const waitlistTranslations = {
  fr: {
    "wl-badge":       "Lancement décembre 2026",
    "wl-title":       "Soyez\nparmi les premières.",
    "wl-desc":        "Inscrivez-vous maintenant pour recevoir un accès prioritaire et bénéficier d'un tarif exclusif lors de notre campagne Ulule.",
    "perk1-text":     "Accès prioritaire à la campagne",
    "perk2-text":     "Tarif early bird exclusif",
    "perk3-text":     "Coulisses du projet en avant-première",
    "wl-form-title":  "Rejoindre la liste d'attente",
    "wl-form-sub":    "Pas de spam. Uniquement les informations qui comptent.",
    "label-firstname":"Prénom",
    "label-email":    "Adresse e-mail",
    "label-pain":     "Décrivez vos douleurs menstruelles",
    "pain1":          "Légères",
    "pain2":          "Modérées",
    "pain3":          "Fortes",
    "pain4":          "Très fortes",
    "wl-submit-text": "Je rejoins la liste",
    "wl-legal":       "Vos données ne seront jamais partagées. Conformément au RGPD, vous pouvez vous désinscrire à tout moment.",
    "success-title":  "Vous êtes inscrite !",
    "success-desc":   "Nous vous contacterons en avant-première lors du lancement. Merci de votre confiance.",
    "success-cta":    "Découvrir le produit",
    "input-firstname-ph": "Camille",
    "input-email-ph": "camille@email.com",
  },
  en: {
    "wl-badge":       "Launching December 2026",
    "wl-title":       "Be\namong the first.",
    "wl-desc":        "Sign up now to get priority access and an exclusive early bird price during our Ulule campaign.",
    "perk1-text":     "Priority campaign access",
    "perk2-text":     "Exclusive early bird pricing",
    "perk3-text":     "Behind-the-scenes updates first",
    "wl-form-title":  "Join the waitlist",
    "wl-form-sub":    "No spam. Only the information that matters.",
    "label-firstname":"First name",
    "label-email":    "Email address",
    "label-pain":     "Describe your menstrual pain",
    "pain1":          "Mild",
    "pain2":          "Moderate",
    "pain3":          "Strong",
    "pain4":          "Very strong",
    "wl-submit-text": "Join the waitlist",
    "wl-legal":       "Your data will never be shared. In line with GDPR, you can unsubscribe at any time.",
    "success-title":  "You're in!",
    "success-desc":   "We'll contact you first when we launch. Thank you for your trust.",
    "success-cta":    "Discover the product",
    "input-firstname-ph": "Sarah",
    "input-email-ph": "sarah@email.com",
  }
};

function applyWaitlistTranslations(lang) {
  const t = waitlistTranslations[lang];
  if (!t) return;

  Object.keys(t).forEach(id => {
    if (id.endsWith('-ph')) {
      const inputId = id.replace('-ph', '');
      const input = document.getElementById(inputId);
      if (input) input.placeholder = t[id];
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = t[id].includes('\n') ? t[id].replace(/\n/g, '<br>') : t[id];
  });
}

// ---- FORM LOGIC ----
function initWaitlistForm() {
  // Pain option toggle
  const painOptions = document.querySelectorAll('.pain-option');
  let selectedPain = '';

  painOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      painOptions.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedPain = btn.dataset.value;
    });
  });

  // Form submit
  const form = document.getElementById('waitlist-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = document.getElementById('input-firstname');
    const email     = document.getElementById('input-email');
    let valid = true;

    // Validation
    [firstName, email].forEach(input => input.classList.remove('error'));

    if (!firstName.value.trim()) {
      firstName.classList.add('error');
      firstName.focus();
      valid = false;
    }

    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      email.classList.add('error');
      if (valid) email.focus();
      valid = false;
    }

    if (!valid) return;

    // Submit btn loading state
    const submitBtn  = document.getElementById('wl-submit');
    const submitText = document.getElementById('wl-submit-text');
    submitBtn.disabled = true;
    submitText.textContent = '...';

    // Simulate submission (replace with real API call: Mailchimp, Brevo, etc.)
    setTimeout(() => {
      // Store locally for now
      const entry = {
        firstName: firstName.value.trim(),
        email:     email.value.trim(),
        pain:      selectedPain,
        date:      new Date().toISOString()
      };
      console.log('Waitlist entry:', entry);
      // TODO: POST to your mailing service (Brevo, Mailchimp, etc.)

      // Show success
      document.getElementById('wl-form-card').style.display = 'none';
      document.getElementById('wl-success').style.display   = 'block';
    }, 900);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('ladylko_lang') || 'fr';
  applyWaitlistTranslations(lang);
  initWaitlistForm();
});

document.addEventListener('langchange', (e) => applyWaitlistTranslations(e.detail.lang));
