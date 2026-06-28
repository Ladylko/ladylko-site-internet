/* LADYLKO — Story Page Translations */
const storyTranslations = {
  fr: {
    "sh-pill":     "Notre histoire",
    "sh-title":    "Une bouillotte.\nUne idée.",
    "sh-sub":      "Ladylko est né d'un moment simple : voir quelqu'un souffrir à la maison, et réaliser que dès qu'elle sortait, aucune solution ne l'accompagnait.",
    "orig-title":  "Le constat qui a tout déclenché.",
    "orig-p1":     "Matéo a vécu de près les douleurs menstruelles de sa fiancée. Chez elle, la bouillotte soulageait. Dehors, rien.",
    "orig-p2":     "La question était simple : pourquoi n'existe-t-il pas de solution portable, discrète et réellement efficace ? Aucune réponse satisfaisante n'existait sur le marché.",
    "orig-p3":     "Avec Pablo, ils ont décidé de construire cette réponse. Pas un gadget. Pas un dispositif médical. Un vêtement pensé pour la vie active.",
    "orig-quote":  "\"Chez moi, ça va. Mais dès que je dois sortir, je subis.\"",
    "orig-cite":   "Camille, 26 ans — le profil de celles pour qui nous construisons Ladylko",
    "team-pill":   "L'équipe",
    "team-title":  "Deux fondateurs.\nUne conviction partagée.",
    "role-mateo":  "Président — Image de marque & Direction",
    "bio-mateo":   "Matéo pilote la vision de Ladylko, l'identité de marque et la stratégie globale. Il est le fil directeur du projet, de la communication à la relation investisseurs.",
    "role-pablo":  "Directeur Général — Produit & Opérations",
    "bio-pablo":   "Pablo pilote le développement produit, les fournisseurs et la chaîne de production. Il est la colonne vertébrale opérationnelle et technique de Ladylko.",
    "mission-title":"Notre mission ne change pas.",
    "mission-body":"Permettre à chaque femme de traverser ses règles sans subir — sans rester chez elle, sans médicaments par défaut, sans compromis.",
    "mission-cta": "Rejoindre le mouvement",
  },
  en: {
    "sh-pill":     "Our story",
    "sh-title":    "A hot water bottle.\nAn idea.",
    "sh-sub":      "Ladylko was born from a simple moment: watching someone suffer at home, and realising that the moment she stepped outside, nothing could help her.",
    "orig-title":  "The observation that started everything.",
    "orig-p1":     "Matéo witnessed his partner's menstrual pain firsthand. At home, the hot water bottle helped. Outside, nothing.",
    "orig-p2":     "The question was simple: why doesn't a portable, discreet and truly effective solution exist? No satisfying answer existed on the market.",
    "orig-p3":     "With Pablo, they decided to build that answer. Not a gadget. Not a medical device. A garment designed for an active life.",
    "orig-quote":  "\"At home it's fine. But the moment I have to go out, I just suffer.\"",
    "orig-cite":   "Camille, 26 — the profile of those we're building Ladylko for",
    "team-pill":   "The team",
    "team-title":  "Two founders.\nOne shared conviction.",
    "role-mateo":  "President — Brand & Direction",
    "bio-mateo":   "Matéo drives Ladylko's vision, brand identity and overall strategy. He is the guiding thread of the project, from communications to investor relations.",
    "role-pablo":  "CEO — Product & Operations",
    "bio-pablo":   "Pablo drives product development, supplier relations and the production chain. He is the operational and technical backbone of Ladylko.",
    "mission-title":"Our mission doesn't change.",
    "mission-body":"To allow every woman to go through her period without suffering — without staying home, without default medication, without compromise.",
    "mission-cta": "Join the movement",
  }
};

function applyStoryTranslations(lang) {
  const t = storyTranslations[lang];
  if (!t) return;
  Object.keys(t).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = t[id].includes('\n') ? t[id].replace(/\n/g, '<br>') : t[id];
  });
}

document.addEventListener('DOMContentLoaded', () => applyStoryTranslations(localStorage.getItem('ladylko_lang') || 'fr'));
document.addEventListener('langchange', (e) => applyStoryTranslations(e.detail.lang));
