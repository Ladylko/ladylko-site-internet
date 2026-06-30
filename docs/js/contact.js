/* LADYLKO — Contact JS */
const contactTranslations = {
  fr: {
    "ct-pill": "Contact",
    "ct-title": "Une question ?\nÉcrivez-nous.",
    "ct-desc": "Presse, partenariats, questions produit ou simplement envie d'en savoir plus. Nous répondons dans les 48 heures.",
    "ct-form-title": "Envoyer un message",
    "ct-form-sub": "Nous répondons dans les 48 heures ouvrées.",
    "ct-label-name": "Prénom & nom",
    "ct-label-email": "E-mail",
    "ct-label-subject": "Sujet",
    "ct-label-msg": "Message",
    "subj1": "Produit", "subj2": "Presse", "subj3": "Partenariat", "subj4": "Autre",
    "ct-submit-text": "Envoyer le message",
    "ct-legal": "Vos données ne seront jamais partagées. Conformément au RGPD, vous pouvez demander leur suppression à tout moment.",
    "ct-success-title": "Message envoyé !",
    "ct-success-desc": "Nous vous répondrons dans les 48h. Merci.",
  },
  en: {
    "ct-pill": "Contact",
    "ct-title": "A question?\nWrite to us.",
    "ct-desc": "Press, partnerships, product questions or just want to know more. We reply within 48 hours.",
    "ct-form-title": "Send a message",
    "ct-form-sub": "We reply within 48 business hours.",
    "ct-label-name": "First & last name",
    "ct-label-email": "Email",
    "ct-label-subject": "Subject",
    "ct-label-msg": "Message",
    "subj1": "Product", "subj2": "Press", "subj3": "Partnership", "subj4": "Other",
    "ct-submit-text": "Send message",
    "ct-legal": "Your data will never be shared. In line with GDPR, you can request deletion at any time.",
    "ct-success-title": "Message sent!",
    "ct-success-desc": "We'll reply within 48 hours. Thank you.",
  }
};

function applyContactTranslations(lang) {
  const t = contactTranslations[lang];
  if (!t) return;
  Object.keys(t).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = t[id].includes('\n') ? t[id].replace(/\n/g, '<br>') : t[id];
  });
  const ctName = document.getElementById('ct-name');
  const ctMsg  = document.getElementById('ct-message');
  if (ctName) ctName.placeholder = lang === 'fr' ? 'Camille Dupont' : 'Sarah Smith';
  if (ctMsg)  ctMsg.placeholder  = lang === 'fr' ? 'Votre message...' : 'Your message...';
}

function initContact() {
  // Sujet toggle
  const subjects = document.querySelectorAll('.ct-subject-btn');
  subjects.forEach(btn => {
    btn.addEventListener('click', () => {
      subjects.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // Form submit
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = document.getElementById('ct-name');
    const email   = document.getElementById('ct-email');
    const message = document.getElementById('ct-message');
    let valid = true;

    [name, email, message].forEach(inp => inp.classList.remove('error'));

    if (!name.value.trim())   { name.classList.add('error');    name.focus();    valid = false; }
    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      email.classList.add('error');
      if (valid) email.focus();
      valid = false;
    }
    if (!message.value.trim()) { message.classList.add('error'); if (valid) message.focus(); valid = false; }
    if (!valid) return;

    const btn = document.getElementById('ct-submit');
    btn.disabled = true;
    document.getElementById('ct-submit-text').textContent = '...';

    setTimeout(() => {
      document.getElementById('ct-form-card').style.display = 'none';
      document.getElementById('ct-success').style.display   = 'block';
    }, 800);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyContactTranslations(localStorage.getItem('ladylko_lang') || 'fr');
  initContact();
});
document.addEventListener('langchange', (e) => applyContactTranslations(e.detail.lang));
