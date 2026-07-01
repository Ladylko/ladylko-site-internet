/* ============================================
   LADYLKO — Global JS
   ============================================ */

// ---- LANGUAGE SYSTEM ----
const translations = {
  fr: {
    nav_product:   "Le produit",
    nav_story:     "Notre histoire",
    nav_waitlist:  "Liste d'attente",
    nav_blog:      "Articles",
    nav_contact:   "Contact",
    footer_tagline:"La chaleur qui soulage vos règles, sans vous arrêter.",
    footer_links:  "Liens",
    footer_legal:  "Légal",
    footer_privacy:"Confidentialité",
    footer_terms:  "Conditions d'utilisation",
    footer_copy:   "© 2026 Ladylko. Tous droits réservés.",
    footer_made:   "Conçu à Paris.",

    // ── Blog ──
    blog_pill_1:   "Articles & sources",
    blog_title_1:  "Ce que vous",
    blog_title_2:  "méritez de savoir.",
    blog_sub_1:    "Douleurs menstruelles, thermothérapie, endométriose, FemTech — des contenus rédigés par nos soins, et une sélection d'articles externes vérifiés.",

    blog_a1_pill:    "Douleurs menstruelles",
    blog_a1_title:   "La chaleur contre les règles douloureuses : ce que dit la science",
    blog_a1_excerpt: "La thermothérapie est reconnue pour son efficacité sur les crampes menstruelles. Une méta-analyse de 2018 confirme une efficacité comparable à l'ibuprofène.",
    blog_a1_date:    "Avril 2026 · Ladylko",
    blog_a1_cta:     "Lire l'article",

    blog_a2_pill:    "Bien-être",
    blog_a2_title:   "50% des femmes souffrent. Pourquoi le marché ne répond pas vraiment.",
    blog_a2_excerpt: "La dysménorrhée touche environ 50% des femmes en âge de procréer. L'offre reste fragmentée et inadaptée au mouvement.",
    blog_a2_date:    "Mars 2026 · Ladylko",
    blog_a2_cta:     "Lire",

    blog_a3_pill:    "Témoignages",
    blog_a3_title:   "« Je ne voulais plus choisir entre soulagement et vie normale. »",
    blog_a3_excerpt: "9 femmes sur 10 aux règles douloureuses estiment que cela affecte leur vie quotidienne. L'impact professionnel reste largement sous-estimé.",
    blog_a3_date:    "Février 2026 · Ladylko",
    blog_a3_cta:     "Lire",

    blog_src_pill:   "Sources externes vérifiées",
    blog_src_title:  "Lectures recommandées",
    blog_src_desc:   "Médias santé, recherches scientifiques et institutions publiques. Vous y trouverez les données et témoignages qui appuient notre démarche.",
    blog_src_read:   "Lire →",
    blog_src_note:   "Liens vers les sites des éditeurs. Les titres sont indicatifs — vérifiez la dernière publication sur chaque source. Aucun partenariat commercial.",

    blog_s1_label:   "Allo Docteurs · France 5",
    blog_s1_title:   "Dr Jimmy Mohamed : comment soulager les règles douloureuses",
    blog_s1_excerpt: "Le médecin du « Mag de la Santé » détaille les solutions efficaces contre la dysménorrhée — chaleur, antalgiques, conseils du quotidien.",

    blog_s2_label:   "Ameli · Assurance Maladie",
    blog_s2_title:   "Règles douloureuses (dysménorrhée) : symptômes et conseils",
    blog_s2_excerpt: "Le dossier officiel de l'Assurance Maladie : définition, prévalence, gestes utiles, traitements et quand consulter.",

    blog_s3_label:   "Inserm · Recherche médicale",
    blog_s3_title:   "Endométriose : une maladie chronique et invalidante",
    blog_s3_excerpt: "Le dossier de l'institut national de la santé : 1 femme sur 10 concernée, mécanismes, recherche en cours et prises en charge.",

    blog_s4_label:   "Cochrane Database · Méta-analyse",
    blog_s4_title:   "Topical heat for primary dysmenorrhea — la chaleur, aussi efficace que l'ibuprofène",
    blog_s4_excerpt: "Revue systématique : la thermothérapie locale (≥39°C) atteint un niveau de soulagement comparable aux AINS sur les crampes menstruelles.",

    blog_s5_label:   "Vidal · Référence médicale",
    blog_s5_title:   "Dysménorrhée : symptômes, causes et traitements",
    blog_s5_excerpt: "La fiche médicale Vidal : antalgiques, AINS, contraception hormonale, mesures non médicamenteuses dont l'application de chaleur.",

    blog_s6_label:   "Le Monde · Société",
    blog_s6_title:   "Les douleurs menstruelles, ce tabou qui pèse sur la vie professionnelle",
    blog_s6_excerpt: "Enquête : pourquoi 1 femme sur 2 dissimule encore ses douleurs au travail, et comment les entreprises commencent à repenser leur politique.",

    blog_s7_label:   "Doctissimo · Santé femme",
    blog_s7_title:   "Règles douloureuses : 12 solutions naturelles qui marchent vraiment",
    blog_s7_excerpt: "De la bouillotte à l'alimentation anti-inflammatoire, le tour d'horizon des gestes validés pour calmer les crampes sans médicament.",

    blog_s8_label:   "Top Santé",
    blog_s8_title:   "Bouillotte chaude : pourquoi elle reste l'arme n°1 contre les crampes",
    blog_s8_excerpt: "Effet vasodilatateur, relaxation musculaire, action sur les récepteurs de la douleur — le mécanisme expliqué par les gynécologues.",

    blog_s9_label:   "Marie Claire · Témoignages",
    blog_s9_title:   "Endométriose : « J'ai mis dix ans à être prise au sérieux »",
    blog_s9_excerpt: "Plusieurs femmes racontent l'errance médicale, l'impact sur la vie pro et personnelle, et leurs stratégies pour reprendre le contrôle.",

    blog_s10_label:   "Les Échos · FemTech",
    blog_s10_title:   "FemTech : la santé féminine prend (enfin) sa revanche",
    blog_s10_excerpt: "Un secteur estimé à 60 milliards $ en 2027. Les start-up françaises qui réinventent le cycle, la fertilité et la ménopause.",

    blog_s11_label:   "OMS · Santé mondiale",
    blog_s11_title:   "Santé menstruelle : un enjeu de droits, pas seulement d'hygiène",
    blog_s11_excerpt: "L'Organisation Mondiale de la Santé rappelle que la santé menstruelle est un sujet de santé publique transversal, encore largement sous-financé.",

    blog_s12_label:   "ELLE · Bien-être",
    blog_s12_title:   "Cycle menstruel : le grand retour de la chaleur thérapeutique",
    blog_s12_excerpt: "Bouillottes connectées, ceintures chauffantes, vêtements thermo-actifs — pourquoi la chaleur revient au cœur des nouvelles routines féminines.",

    nl_title:        "Recevez nos articles.",
    nl_sub:          "Une fois par semaine. Rien de superflu.",
    nl_label:        "Adresse email",
    nl_placeholder:  "votre@email.com",
    nl_btn:          "S'abonner",
  },
  en: {
    nav_product:   "The product",
    nav_story:     "Our story",
    nav_waitlist:  "Waitlist",
    nav_blog:      "Articles",
    nav_contact:   "Contact",
    footer_tagline:"The heat that relieves your period, without stopping you.",
    footer_links:  "Links",
    footer_legal:  "Legal",
    footer_privacy:"Privacy",
    footer_terms:  "Terms of use",
    footer_copy:   "© 2026 Ladylko. All rights reserved.",
    footer_made:   "Designed in Paris.",

    // ── Blog ──
    blog_pill_1:   "Articles & sources",
    blog_title_1:  "What you",
    blog_title_2:  "deserve to know.",
    blog_sub_1:    "Menstrual pain, thermotherapy, endometriosis, FemTech — content written in-house, plus a curated selection of vetted external articles.",

    blog_a1_pill:    "Menstrual pain",
    blog_a1_title:   "Heat against painful periods: what science says",
    blog_a1_excerpt: "Thermotherapy is recognized for its effectiveness on menstrual cramps. A 2018 meta-analysis confirms efficacy comparable to ibuprofen.",
    blog_a1_date:    "April 2026 · Ladylko",
    blog_a1_cta:     "Read article",

    blog_a2_pill:    "Wellness",
    blog_a2_title:   "50% of women suffer. Why the market doesn't really answer.",
    blog_a2_excerpt: "Dysmenorrhea affects about 50% of women of reproductive age. Existing solutions remain fragmented and unsuited to active life.",
    blog_a2_date:    "March 2026 · Ladylko",
    blog_a2_cta:     "Read",

    blog_a3_pill:    "Stories",
    blog_a3_title:   "\"I didn't want to choose between relief and a normal life anymore.\"",
    blog_a3_excerpt: "9 in 10 women with painful periods say it affects their daily life. The professional impact remains largely underestimated.",
    blog_a3_date:    "February 2026 · Ladylko",
    blog_a3_cta:     "Read",

    blog_src_pill:   "Verified external sources",
    blog_src_title:  "Recommended reading",
    blog_src_desc:   "Health media, scientific research and public institutions. You'll find the data and stories that support our approach.",
    blog_src_read:   "Read →",
    blog_src_note:   "Links to publisher websites. Titles are indicative — check the latest publication on each source. No commercial partnership.",

    blog_s1_label:   "Allo Docteurs · France 5",
    blog_s1_title:   "Dr Jimmy Mohamed: how to relieve painful periods",
    blog_s1_excerpt: "The « Mag de la Santé » doctor lays out effective solutions against dysmenorrhea — heat, painkillers, daily-life tips.",

    blog_s2_label:   "Ameli · French Health Insurance",
    blog_s2_title:   "Painful periods (dysmenorrhea): symptoms and advice",
    blog_s2_excerpt: "The official health-insurance file: definition, prevalence, useful steps, treatments and when to consult.",

    blog_s3_label:   "Inserm · Medical research",
    blog_s3_title:   "Endometriosis: a chronic and disabling disease",
    blog_s3_excerpt: "The national health institute's file: 1 in 10 women affected, mechanisms, ongoing research and care pathways.",

    blog_s4_label:   "Cochrane Database · Meta-analysis",
    blog_s4_title:   "Topical heat for primary dysmenorrhea — heat as effective as ibuprofen",
    blog_s4_excerpt: "Systematic review: local thermotherapy (≥39°C) achieves relief comparable to NSAIDs on menstrual cramps.",

    blog_s5_label:   "Vidal · Medical reference",
    blog_s5_title:   "Dysmenorrhea: symptoms, causes and treatments",
    blog_s5_excerpt: "Vidal's medical fact-sheet: painkillers, NSAIDs, hormonal contraception, non-drug measures including heat application.",

    blog_s6_label:   "Le Monde · Society",
    blog_s6_title:   "Menstrual pain: the taboo that weighs on professional life",
    blog_s6_excerpt: "Investigation: why 1 in 2 women still hide their pain at work, and how companies are starting to rethink their policies.",

    blog_s7_label:   "Doctissimo · Women's health",
    blog_s7_title:   "Painful periods: 12 natural solutions that really work",
    blog_s7_excerpt: "From hot water bottles to anti-inflammatory diet, an overview of validated drug-free strategies to ease cramps.",

    blog_s8_label:   "Top Santé",
    blog_s8_title:   "Hot water bottles: why they remain the #1 weapon against cramps",
    blog_s8_excerpt: "Vasodilation, muscle relaxation, action on pain receptors — the mechanism explained by gynecologists.",

    blog_s9_label:   "Marie Claire · Stories",
    blog_s9_title:   "Endometriosis: \"It took me ten years to be taken seriously\"",
    blog_s9_excerpt: "Several women share their medical odyssey, the impact on professional and personal life, and how they regained control.",

    blog_s10_label:   "Les Échos · FemTech",
    blog_s10_title:   "FemTech: women's health finally takes its revenge",
    blog_s10_excerpt: "A sector estimated at $60 billion by 2027. The French start-ups reinventing the cycle, fertility and menopause.",

    blog_s11_label:   "WHO · Global health",
    blog_s11_title:   "Menstrual health: a rights issue, not just hygiene",
    blog_s11_excerpt: "The World Health Organization reminds us that menstrual health is a cross-cutting public-health issue, still largely under-funded.",

    blog_s12_label:   "ELLE · Wellness",
    blog_s12_title:   "Menstrual cycle: the great return of therapeutic heat",
    blog_s12_excerpt: "Connected hot water bottles, heating belts, thermo-active garments — why heat is back at the heart of new feminine routines.",

    nl_title:        "Receive our articles.",
    nl_sub:          "Once a week. Nothing superfluous.",
    nl_label:        "Email address",
    nl_placeholder:  "your@email.com",
    nl_btn:          "Subscribe",
  }
};

let currentLang = localStorage.getItem('ladylko_lang') || 'fr';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('ladylko_lang', lang);
  document.documentElement.lang = lang;

  // Update all [data-i18n] elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update placeholders [data-i18n-placeholder]
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.setAttribute('placeholder', translations[lang][key]);
    }
  });

  // Update lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Dispatch event for page-specific translations
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

// ---- NAVIGATION ----
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  // Scroll effect
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active link highlight
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link[data-page]').forEach(link => {
    if (link.dataset.page === currentPage) link.classList.add('active');
  });

  // Mobile menu
  const burger  = document.querySelector('.nav__burger');
  const mobile  = document.querySelector('.nav__mobile');
  const mobileLinks = document.querySelectorAll('.nav__mobile a');

  const closeMobile = () => {
    mobile.classList.remove('open');
    burger.classList.remove('open');
    nav.classList.remove('menu-open');
    document.body.style.overflow = '';
  };

  if (burger && mobile) {
    burger.addEventListener('click', () => {
      const isOpen = mobile.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      nav.classList.toggle('menu-open', isOpen);
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link/CTA tap (but not on the language buttons)
    mobileLinks.forEach(link => link.addEventListener('click', closeMobile));

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobile.classList.contains('open')) closeMobile();
    });
  }

  // Lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
}

// ---- SCROLL REVEAL ----
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger children if multiple
          entry.target.style.transitionDelay = `${i * 60}ms`;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ---- SMOOTH ANCHOR SCROLL ----
function initAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ---- NAV TEMPLATE ----
function renderNav() {
  const nav = document.getElementById('nav-placeholder');
  if (!nav) return;

  nav.innerHTML = `
    <nav class="nav">
      <div class="nav__inner">
        <a href="../index.html" class="nav__logo">Lady<span>lko</span></a>

        <div class="nav__links">
          <a href="../pages/product.html"  class="nav__link" data-page="product.html"  data-i18n="nav_product">Le produit</a>
          <a href="../pages/story.html"    class="nav__link" data-page="story.html"    data-i18n="nav_story">Notre histoire</a>
          <a href="../pages/blog.html"     class="nav__link" data-page="blog.html"     data-i18n="nav_blog">Articles</a>
          <a href="../pages/contact.html"  class="nav__link" data-page="contact.html"  data-i18n="nav_contact">Contact</a>
          <a href="../pages/waitlist.html" class="btn btn-primary" style="padding: 0.6rem 1.4rem; font-size:0.82rem;" data-i18n="nav_waitlist">Liste d'attente</a>
          <div class="lang-switch">
            <button class="lang-btn" data-lang="fr">FR</button>
            <span class="lang-divider">|</span>
            <button class="lang-btn" data-lang="en">EN</button>
          </div>
        </div>

        <button class="nav__burger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>

    <!-- Mobile overlay -->
    <div class="nav__mobile">
      <div class="nav__mobile-inner">
        <nav class="nav__mobile-links">
          <a href="../pages/product.html" class="nav__mlink" data-i18n="nav_product">Le produit</a>
          <a href="../pages/story.html"   class="nav__mlink" data-i18n="nav_story">Notre histoire</a>
          <a href="../pages/blog.html"    class="nav__mlink" data-i18n="nav_blog">Articles</a>
          <a href="../pages/contact.html" class="nav__mlink" data-i18n="nav_contact">Contact</a>
        </nav>
        <div class="nav__mobile-foot">
          <a href="../pages/waitlist.html" class="btn btn-primary nav__mobile-cta" data-i18n="nav_waitlist">Liste d'attente</a>
          <div class="nav__mobile-meta">
            <div class="lang-switch">
              <button class="lang-btn" data-lang="fr">FR</button>
              <span class="lang-divider">|</span>
              <button class="lang-btn" data-lang="en">EN</button>
            </div>
            <a class="nav__mobile-ig" href="https://instagram.com/ladylko.paris" target="_blank" rel="noopener">@ladylko.paris</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ---- FOOTER TEMPLATE ----
function renderFooter() {
  const footer = document.getElementById('footer-placeholder');
  if (!footer) return;

  footer.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div>
            <div class="footer__brand">Ladylko</div>
            <p class="footer__tagline" data-i18n="footer_tagline">La chaleur qui soulage vos règles, sans vous arrêter.</p>
          </div>
          <div class="footer__col">
            <div class="footer__col-title" data-i18n="footer_links">Liens</div>
            <a href="../pages/product.html"  data-i18n="nav_product">Le produit</a>
            <a href="../pages/story.html"    data-i18n="nav_story">Notre histoire</a>
            <a href="../pages/blog.html"     data-i18n="nav_blog">Articles</a>
            <a href="../pages/contact.html"  data-i18n="nav_contact">Contact</a>
            <a href="../pages/waitlist.html" data-i18n="nav_waitlist">Liste d'attente</a>
          </div>
          <div class="footer__col">
            <div class="footer__col-title" data-i18n="footer_legal">Légal</div>
            <a href="#" data-i18n="footer_privacy">Confidentialité</a>
            <a href="#" data-i18n="footer_terms">Conditions d'utilisation</a>
          </div>
          <div class="footer__col">
            <div class="footer__col-title">Contact</div>
            <a href="mailto:mateo.ledeme@ladylko.com">mateo.ledeme@ladylko.com</a>
            <a href="https://instagram.com/ladylko.paris" target="_blank" rel="noopener">@ladylko.paris</a>
          </div>
        </div>
        <div class="footer__bottom">
          <span data-i18n="footer_copy">© 2026 Ladylko. Tous droits réservés.</span>
          <span data-i18n="footer_made">Conçu à Paris.</span>
        </div>
      </div>
    </footer>
  `;
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderFooter();
  initNav();
  initReveal();
  initAnchors();
  setLanguage(currentLang);
});
