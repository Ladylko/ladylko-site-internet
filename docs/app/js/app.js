/* ============================================================
   AdPilot — Studio marketing Ladylko
   Logique applicative (front-end, sauvegarde locale)
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Constantes ---------- */
  var PLATFORMS = {
    tiktok:    { label: "TikTok",    icon: "▶", upload: "https://www.tiktok.com/upload" },
    instagram: { label: "Instagram", icon: "◎", upload: "https://business.facebook.com/latest/composer" }
  };
  var IMPORTANCE = {
    haute:   { label: "Haute",   badge: "badge-critical", emoji: "🔴" },
    moyenne: { label: "Moyenne", badge: "badge-warning",  emoji: "🟠" },
    basse:   { label: "Basse",   badge: "badge",          emoji: "⚪️" }
  };
  var STATUS = {
    "idée":      { label: "Idée",      badge: "badge" },
    "brouillon": { label: "Brouillon", badge: "badge-info" },
    "prêt":      { label: "Prêt",      badge: "badge-prune" },
    "publié":    { label: "Publié",    badge: "badge-success" }
  };
  var DAYS = ["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"];
  var METHODS = [
    "Vidéo native (filmée au téléphone)",
    "Carrousel photo",
    "Reels / vidéo montée",
    "Story",
    "Photo unique",
    "Collaboration / duo"
  ];

  /* ---------- Stockage ---------- */
  var KEY = "adpilot_ladylko_v1";
  var DB = load();

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return seed();
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(DB)); } catch (e) {}
  }
  function uid() { return "x" + (DB._seq = (DB._seq || 0) + 1) + "_" + (new Date().getTime() % 100000); }

  function seed() {
    return {
      _seq: 4,
      inspirations: [
        {
          id: "x1", title: "Avant / après — le confort au quotidien", platform: "tiktok",
          order: 1, importance: "haute", status: "prêt",
          day: "lundi", time: "18:30", method: "Vidéo native (filmée au téléphone)",
          caption: "POV : tu enfiles ton short Ladylko et tout change ✨ #confort #ladylko",
          how: "Filmer en lumière naturelle, plan serré sur la matière, son tendance du moment.",
          tags: ["lancement","confort"], canva: "", link: "", image: ""
        },
        {
          id: "x2", title: "Témoignage client en story", platform: "instagram",
          order: 2, importance: "moyenne", status: "brouillon",
          day: "mardi", time: "12:00", method: "Story",
          caption: "Elles l'ont adopté 💜 swipe pour voir leurs avis",
          how: "Reposter un avis, ajouter un sticker question, lien vers la waitlist.",
          tags: ["preuve sociale"], canva: "", link: "", image: ""
        },
        {
          id: "x3", title: "Les coulisses de la fabrication", platform: "tiktok",
          order: 3, importance: "basse", status: "idée",
          day: "jeudi", time: "19:00", method: "Reels / vidéo montée",
          caption: "Comment on a pensé chaque détail 🧵",
          how: "Montage rapide, texte à l'écran, mettre en avant les matières.",
          tags: ["coulisses"], canva: "", link: "", image: ""
        }
      ],
      canva: [
        { id: "c1", title: "Charte graphique 2026", url: "https://www.canva.com/" },
        { id: "c2", title: "Template Story produit", url: "https://www.canva.com/" }
      ],
      connections: { tiktok: false, instagram: false, canva: false }
    };
  }

  /* ---------- Helpers DOM ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function dayIndex(d) { var i = DAYS.indexOf(d); return i < 0 ? 99 : i; }

  /* ---------- Toast ---------- */
  var toastT;
  function toast(msg) {
    var t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(function () { t.classList.remove("show"); }, 2200);
  }

  /* ---------- Modale ---------- */
  function openModal(title, bodyNode, footNodes) {
    $("#modalTitle").textContent = title;
    var body = $("#modalBody"); body.innerHTML = ""; body.appendChild(bodyNode);
    var foot = $("#modalFoot"); foot.innerHTML = "";
    (footNodes || []).forEach(function (n) { foot.appendChild(n); });
    $("#modal").classList.add("open");
  }
  function closeModal() { $("#modal").classList.remove("open"); }
  $("#modalClose").addEventListener("click", closeModal);
  $("#modal").addEventListener("click", function (e) { if (e.target === this) closeModal(); });

  function btn(label, cls, onClick) {
    var b = el("button", "btn " + (cls || ""), label);
    if (onClick) b.addEventListener("click", onClick);
    return b;
  }

  /* ============================================================
     Navigation
     ============================================================ */
  var TITLES = {
    dashboard: "Accueil", library: "Bibliothèque", planning: "Planning",
    create: "Créer un post", connections: "Connexions", brand: "Charte & Canva", help: "Guide rapide"
  };
  function go(name) {
    $$(".section").forEach(function (s) { s.classList.toggle("active", s.id === name); });
    $$("[data-nav]").forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-nav") === name); });
    $("#topTitle").textContent = TITLES[name] || "AdPilot";
    $(".main").scrollTop = 0;
    if (name === "dashboard") renderDashboard();
    if (name === "library") renderLibrary();
    if (name === "planning") renderPlanning();
    if (name === "create") renderCreate();
    if (name === "connections") renderConnections();
    if (name === "brand") renderBrand();
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-nav]");
    if (t) { e.preventDefault(); go(t.getAttribute("data-nav")); }
  });

  function updateCounts() {
    $$("[data-count='library']").forEach(function (n) { n.textContent = DB.inspirations.length; });
  }

  /* ============================================================
     ACCUEIL
     ============================================================ */
  function renderDashboard() {
    var total = DB.inspirations.length;
    var ready = DB.inspirations.filter(function (i) { return i.status === "prêt"; }).length;
    var published = DB.inspirations.filter(function (i) { return i.status === "publié"; }).length;
    var high = DB.inspirations.filter(function (i) { return i.importance === "haute" && i.status !== "publié"; }).length;

    var tiles = [
      { label: "Inspirations", value: total, delta: "Dans la bibliothèque", cls: "" },
      { label: "Prêtes à publier", value: ready, delta: "À programmer", cls: "" },
      { label: "Publiées", value: published, delta: "Bravo 🎉", cls: "up" },
      { label: "Priorité haute", value: high, delta: "À ne pas rater", cls: high ? "down" : "" }
    ];
    var tg = $("#statTiles"); tg.innerHTML = "";
    tiles.forEach(function (t) {
      tg.appendChild(el("div", "stat",
        '<div class="label">' + t.label + '</div>' +
        '<div class="value">' + t.value + '</div>' +
        '<div class="delta ' + t.cls + '">' + t.delta + '</div>'));
    });

    var up = DB.inspirations
      .filter(function (i) { return i.status !== "publié"; })
      .sort(sortByPlanning)
      .slice(0, 5);
    var box = $("#upcoming"); box.innerHTML = "";
    if (!up.length) {
      box.appendChild(el("div", "muted", "Rien de programmé. Ajoutez une inspiration pour commencer."));
    } else {
      up.forEach(function (i) {
        var row = el("div", "slot");
        row.style.marginBottom = "10px";
        row.innerHTML =
          '<div class="slot-time">' + esc(i.time || "--:--") + '</div>' +
          '<div class="slot-body">' +
            '<div class="slot-title">' + esc(i.title) + '</div>' +
            '<div class="slot-sub">' + PLATFORMS[i.platform].icon + " " + PLATFORMS[i.platform].label +
              " · " + cap(i.day || "à planifier") + '</div>' +
          '</div>' +
          '<span class="badge ' + IMPORTANCE[i.importance].badge + '">' + IMPORTANCE[i.importance].label + '</span>';
        box.appendChild(row);
      });
    }
    updateCounts();
  }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

  function sortByPlanning(a, b) {
    var d = dayIndex(a.day) - dayIndex(b.day);
    if (d !== 0) return d;
    return String(a.time || "99").localeCompare(String(b.time || "99"));
  }

  /* ============================================================
     BIBLIOTHÈQUE
     ============================================================ */
  var libState = { platform: "all", status: "all", sort: "order", q: "" };

  function renderLibrary() {
    var items = DB.inspirations.slice();
    if (libState.platform !== "all") items = items.filter(function (i) { return i.platform === libState.platform; });
    if (libState.status !== "all") items = items.filter(function (i) { return i.status === libState.status; });
    if (libState.q) {
      var q = libState.q.toLowerCase();
      items = items.filter(function (i) {
        return (i.title + " " + i.caption + " " + (i.tags || []).join(" ")).toLowerCase().indexOf(q) >= 0;
      });
    }
    if (libState.sort === "order") items.sort(function (a, b) { return (a.order || 99) - (b.order || 99); });
    else if (libState.sort === "importance") {
      var rank = { haute: 0, moyenne: 1, basse: 2 };
      items.sort(function (a, b) { return rank[a.importance] - rank[b.importance]; });
    } else items.sort(sortByPlanning);

    var grid = $("#libGrid"); grid.innerHTML = "";
    $("#libEmpty").style.display = items.length ? "none" : "block";
    grid.style.display = items.length ? "grid" : "none";

    items.forEach(function (i) {
      var c = el("div", "insp");
      c.setAttribute("data-importance", i.importance);
      var media = i.image
        ? '<img src="' + esc(i.image) + '" alt="">'
        : '<span>▦</span>';
      c.innerHTML =
        '<div class="insp-media">' + media +
          '<div class="insp-order" title="Ordre de post">' + (i.order || "·") + '</div>' +
          '<div class="insp-platform" title="' + PLATFORMS[i.platform].label + '">' + PLATFORMS[i.platform].icon + '</div>' +
        '</div>' +
        '<div class="insp-body">' +
          '<div class="insp-title">' + esc(i.title) + '</div>' +
          '<div class="insp-meta">' +
            '<span class="badge ' + STATUS[i.status].badge + '">' + STATUS[i.status].label + '</span>' +
            '<span class="badge ' + IMPORTANCE[i.importance].badge + '">' + IMPORTANCE[i.importance].emoji + " " + IMPORTANCE[i.importance].label + '</span>' +
          '</div>' +
          '<div class="insp-when">🗓 ' + cap(i.day || "à planifier") + ' · ⏰ ' + esc(i.time || "--:--") + '</div>' +
          (i.method ? '<div class="insp-when">🎬 ' + esc(i.method) + '</div>' : '') +
          ((i.tags && i.tags.length) ? '<div class="insp-meta">' + i.tags.map(function (t) { return '<span class="tag">#' + esc(t) + '</span>'; }).join("") + '</div>' : '') +
        '</div>' +
        '<div class="insp-foot">' +
          '<button class="btn btn-sm" data-edit="' + i.id + '">Ouvrir</button>' +
          '<div class="spacer"></div>' +
          '<a class="btn btn-sm" href="' + PLATFORMS[i.platform].upload + '" target="_blank" rel="noopener">Poster ↗</a>' +
        '</div>';
      grid.appendChild(c);
    });

    $$("[data-edit]", grid).forEach(function (b) {
      b.addEventListener("click", function () { editInspiration(b.getAttribute("data-edit")); });
    });
    updateCounts();
  }

  /* ---- Formulaire inspiration (création / édition) ---- */
  function inspirationForm(i) {
    i = i || {};
    var wrap = el("div");
    wrap.innerHTML =
      field("Titre de l'idée", '<input class="input" id="f_title" value="' + esc(i.title || "") + '" placeholder="Ex : Avant / après confort">') +
      '<div class="row">' +
        field("Plateforme", select("f_platform", Object.keys(PLATFORMS).map(function (k) {
          return [k, PLATFORMS[k].label]; }), i.platform || "tiktok")) +
        field("Statut", select("f_status", Object.keys(STATUS).map(function (k) {
          return [k, STATUS[k].label]; }), i.status || "idée")) +
      '</div>' +
      '<div class="row">' +
        field("Ordre de post", '<input class="input" id="f_order" type="number" min="1" value="' + esc(i.order || "") + '" placeholder="1">', "Le n° de passage dans votre file.") +
        field("Importance", select("f_importance", Object.keys(IMPORTANCE).map(function (k) {
          return [k, IMPORTANCE[k].label]; }), i.importance || "moyenne")) +
      '</div>' +
      '<div class="row">' +
        field("Jour de post", select("f_day", [["", "À planifier"]].concat(DAYS.map(function (d) { return [d, cap(d)]; })), i.day || "")) +
        field("Heure de post", '<input class="input" id="f_time" type="time" value="' + esc(i.time || "") + '">') +
      '</div>' +
      field("Comment poster (méthode)", select("f_method", [["", "—"]].concat(METHODS.map(function (m) { return [m, m]; })), i.method || "")) +
      field("Légende / texte du post", '<textarea class="textarea" id="f_caption" placeholder="La légende à publier…">' + esc(i.caption || "") + '</textarea>') +
      field("Instructions de tournage / réalisation", '<textarea class="textarea" id="f_how" placeholder="Comment filmer, le son, les plans, l\'angle…">' + esc(i.how || "") + '</textarea>') +
      '<div class="row">' +
        field("Lien image / référence", '<input class="input" id="f_image" value="' + esc(i.image || "") + '" placeholder="https://…">') +
        field("Lien Canva associé", '<input class="input" id="f_canva" value="' + esc(i.canva || "") + '" placeholder="https://canva.com/…">') +
      '</div>' +
      field("Tags (séparés par des virgules)", '<input class="input" id="f_tags" value="' + esc((i.tags || []).join(", ")) + '" placeholder="confort, lancement">');
    return wrap;
  }
  function field(label, inner, hint) {
    return '<div class="field"><label>' + label + '</label>' + inner +
      (hint ? '<div class="hint">' + hint + '</div>' : '') + '</div>';
  }
  function select(id, opts, val) {
    return '<select class="select" id="' + id + '">' + opts.map(function (o) {
      return '<option value="' + esc(o[0]) + '"' + (o[0] === val ? " selected" : "") + '>' + esc(o[1]) + '</option>';
    }).join("") + '</select>';
  }
  function readInspiration(node) {
    function v(id) { var n = $("#" + id, node); return n ? n.value.trim() : ""; }
    return {
      title: v("f_title") || "Sans titre",
      platform: v("f_platform"), status: v("f_status"),
      order: parseInt(v("f_order"), 10) || null,
      importance: v("f_importance"),
      day: v("f_day"), time: v("f_time"), method: v("f_method"),
      caption: v("f_caption"), how: v("f_how"),
      image: v("f_image"), canva: v("f_canva"),
      tags: v("f_tags").split(",").map(function (s) { return s.trim(); }).filter(Boolean)
    };
  }

  function addInspiration() {
    var form = inspirationForm({});
    openModal("Nouvelle inspiration", form, [
      btn("Annuler", "", closeModal),
      (function () { var s = el("div", "spacer"); return s; })(),
      btn("Ajouter", "btn-primary", function () {
        var data = readInspiration(form);
        data.id = uid();
        DB.inspirations.push(data); save();
        closeModal(); toast("Inspiration ajoutée ✓");
        renderLibrary(); renderDashboard();
      })
    ]);
  }
  function editInspiration(id) {
    var i = DB.inspirations.filter(function (x) { return x.id === id; })[0];
    if (!i) return;
    var form = inspirationForm(i);
    openModal("Modifier l'inspiration", form, [
      btn("Supprimer", "btn-danger", function () {
        if (confirm("Supprimer cette inspiration ?")) {
          DB.inspirations = DB.inspirations.filter(function (x) { return x.id !== id; });
          save(); closeModal(); toast("Supprimée"); renderLibrary(); renderDashboard();
        }
      }),
      el("div", "spacer"),
      btn("Annuler", "", closeModal),
      btn("Enregistrer", "btn-primary", function () {
        var data = readInspiration(form); data.id = id;
        var idx = DB.inspirations.findIndex(function (x) { return x.id === id; });
        DB.inspirations[idx] = data; save();
        closeModal(); toast("Enregistré ✓"); renderLibrary(); renderDashboard();
      })
    ]);
  }

  /* ============================================================
     PLANNING
     ============================================================ */
  var planView = "list";
  function renderPlanning() {
    if (planView === "list") {
      $("#planList").style.display = "block"; $("#planWeek").style.display = "none";
      renderPlanList();
    } else {
      $("#planList").style.display = "none"; $("#planWeek").style.display = "grid";
      renderPlanWeek();
    }
  }
  function renderPlanList() {
    var box = $("#planList"); box.className = "plist"; box.innerHTML = "";
    var byDay = {};
    DB.inspirations.forEach(function (i) {
      var d = i.day || "À planifier";
      (byDay[d] = byDay[d] || []).push(i);
    });
    var order = DAYS.concat(["À planifier"]);
    var any = false;
    order.forEach(function (d) {
      var list = byDay[d]; if (!list || !list.length) return;
      any = true;
      list.sort(function (a, b) { return String(a.time || "99").localeCompare(String(b.time || "99")); });
      var grp = el("div", "day-group");
      grp.appendChild(el("div", "pgrp-head", cap(d) + " · " + list.length + " post" + (list.length > 1 ? "s" : "")));
      list.forEach(function (i) {
        var slot = el("div", "slot");
        slot.style.marginBottom = "8px";
        slot.innerHTML =
          '<div class="slot-time">' + esc(i.time || "--:--") + '</div>' +
          '<div class="slot-body">' +
            '<div class="slot-title">' + PLATFORMS[i.platform].icon + " " + esc(i.title) + '</div>' +
            '<div class="slot-sub">' + esc(i.method || "Méthode à définir") + (i.order ? " · ordre #" + i.order : "") + '</div>' +
          '</div>' +
          '<span class="badge ' + IMPORTANCE[i.importance].badge + '">' + IMPORTANCE[i.importance].label + '</span> ' +
          '<span class="badge ' + STATUS[i.status].badge + '">' + STATUS[i.status].label + '</span>';
        slot.addEventListener("click", function () { editInspiration(i.id); });
        slot.style.cursor = "pointer";
        grp.appendChild(slot);
      });
      box.appendChild(grp);
    });
    if (!any) box.innerHTML = '<div class="empty"><div class="ico">▤</div><h3>Planning vide</h3><p>Ajoutez un jour et une heure à vos inspirations pour les voir ici.</p></div>';
  }
  function renderPlanWeek() {
    var box = $("#planWeek");
    box.className = "grid";
    box.style.gridTemplateColumns = "repeat(7, 1fr)";
    box.innerHTML = "";
    DAYS.forEach(function (d, idx) {
      var col = el("div", "day-col");
      col.innerHTML = '<div class="day-head"><span class="dnum">' + (idx + 1) + '</span><span class="dname">' + d.slice(0, 3) + '</span></div>';
      DB.inspirations.filter(function (i) { return i.day === d; })
        .sort(function (a, b) { return String(a.time || "99").localeCompare(String(b.time || "99")); })
        .forEach(function (i) {
          var s = el("div", "slot");
          s.style.flexDirection = "column";
          s.innerHTML = '<div class="slot-time">' + esc(i.time || "--:--") + '</div>' +
            '<div class="slot-title" style="font-size:12px">' + PLATFORMS[i.platform].icon + " " + esc(i.title) + '</div>';
          s.style.cursor = "pointer";
          s.addEventListener("click", function () { editInspiration(i.id); });
          col.appendChild(s);
        });
      box.appendChild(col);
    });
  }

  /* ============================================================
     CRÉER UN POST
     ============================================================ */
  function renderCreate() {
    var form = inspirationForm({ status: "brouillon" });
    var host = $("#createForm");
    host.innerHTML = '<h3 style="margin-bottom:14px">Détails du post</h3>';
    host.appendChild(form);
    var actions = el("div", "flex gap-12 mt-16");
    actions.appendChild(btn("Enregistrer dans la bibliothèque", "btn-primary", function () {
      var data = readInspiration(form); data.id = uid();
      DB.inspirations.push(data); save();
      toast("Post enregistré ✓"); go("library");
    }));
    host.appendChild(actions);

    // Aperçu live
    var prev = $("#createPreview");
    prev.innerHTML = '<h3 style="margin-bottom:14px">Aperçu &amp; envoi</h3>';
    var card = el("div");
    prev.appendChild(card);
    function refresh() {
      var d = readInspiration(form);
      card.innerHTML =
        '<div class="insp" style="max-width:280px;margin:0 auto" data-importance="' + d.importance + '">' +
          '<div class="insp-media">' + (d.image ? '<img src="' + esc(d.image) + '">' : '<span>▦</span>') +
            '<div class="insp-platform">' + PLATFORMS[d.platform].icon + '</div></div>' +
          '<div class="insp-body">' +
            '<div class="insp-title">' + esc(d.title || "Titre du post") + '</div>' +
            '<div class="muted" style="font-size:12.5px">' + esc(d.caption || "La légende apparaîtra ici…") + '</div>' +
            '<div class="insp-when">🗓 ' + cap(d.day || "à planifier") + ' · ⏰ ' + esc(d.time || "--:--") + '</div>' +
          '</div></div>' +
        '<div class="mt-16 grid" style="gap:8px">' +
          '<a class="btn btn-block btn-primary" href="' + PLATFORMS[d.platform].upload + '" target="_blank" rel="noopener">' +
            PLATFORMS[d.platform].icon + ' Ouvrir ' + PLATFORMS[d.platform].label + ' pour poster ↗</a>' +
          '<button class="btn btn-block" id="copyCap">⧉ Copier la légende</button>' +
          (d.canva ? '<a class="btn btn-block" href="' + esc(d.canva) + '" target="_blank" rel="noopener">✦ Ouvrir le visuel Canva ↗</a>' : '') +
        '</div>';
      var cc = $("#copyCap", card);
      if (cc) cc.addEventListener("click", function () {
        copy(d.caption || ""); toast("Légende copiée ✓");
      });
    }
    form.addEventListener("input", refresh);
    form.addEventListener("change", refresh);
    refresh();
  }
  function copy(text) {
    try {
      navigator.clipboard.writeText(text);
    } catch (e) {
      var ta = el("textarea"); ta.value = text; document.body.appendChild(ta);
      ta.select(); try { document.execCommand("copy"); } catch (e2) {} document.body.removeChild(ta);
    }
  }

  /* ============================================================
     CONNEXIONS
     ============================================================ */
  var CONN_META = {
    tiktok: {
      name: "TikTok", logo: "tiktok", icon: "♪",
      desc: "Envoyer vos posts comme brouillons et récupérer les liens publiés.",
      can: ["Envoyer un post vers TikTok comme brouillon", "Récupérer le lien d'une vidéo publiée", "Voir le nombre de vues / likes (compte Business)"],
      cannot: ["Lire les brouillons créés directement dans l'app TikTok (non autorisé par TikTok)"]
    },
    instagram: {
      name: "Instagram", logo: "insta", icon: "◎",
      desc: "Programmer des posts et voir les statistiques de votre compte.",
      can: ["Publier / programmer un post ou un Reel", "Voir les statistiques (vues, portée, abonnés)", "Récupérer le lien des publications"],
      cannot: ["Lire les brouillons « non publiés » de l'app (non exposés par Instagram)"]
    },
    canva: {
      name: "Canva Pro", logo: "canva", icon: "✦",
      desc: "Afficher vos modèles et ouvrir l'édition d'un simple clic.",
      can: ["Lister vos designs et modèles", "Afficher un aperçu", "Ouvrir l'édition dans Canva (lien direct, sans extension)"],
      cannot: []
    }
  };
  function renderConnections() {
    var host = $("#connList"); host.innerHTML = "";
    Object.keys(CONN_META).forEach(function (k) {
      var m = CONN_META[k];
      var connected = DB.connections[k];
      var card = el("div", "card");
      card.innerHTML =
        '<div class="conn">' +
          '<div class="conn-logo ' + m.logo + '">' + m.icon + '</div>' +
          '<div class="conn-info"><h3>' + m.name + '</h3><p>' + m.desc + '</p></div>' +
          '<span class="badge ' + (connected ? "badge-success dot" : "badge dot") + '">' + (connected ? "Connecté" : "Non connecté") + '</span>' +
          '<button class="btn ' + (connected ? "btn-danger" : "btn-primary") + '" data-conn="' + k + '">' +
            (connected ? "Déconnecter" : "Connecter") + '</button>' +
        '</div>';
      host.appendChild(card);
    });
    $$("[data-conn]", host).forEach(function (b) {
      b.addEventListener("click", function () { connectFlow(b.getAttribute("data-conn")); });
    });
  }
  function connectFlow(k) {
    var m = CONN_META[k];
    if (DB.connections[k]) {
      DB.connections[k] = false; save(); toast(m.name + " déconnecté"); renderConnections(); return;
    }
    var body = el("div");
    body.innerHTML =
      '<p class="mb-16">Voici ce qu\'AdPilot pourra faire une fois <strong>' + m.name + '</strong> relié (après branchement du back-end) :</p>' +
      '<div class="card" style="background:var(--success-bg);border-color:#bfe3d2"><div class="card-pad">' +
        '<strong style="color:var(--success)">✓ Possible</strong><ul style="margin:8px 0 0 18px;font-size:13px">' +
        m.can.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul></div></div>' +
      (m.cannot.length ? '<div class="card mt-16" style="background:var(--critical-bg);border-color:#f3c9c2"><div class="card-pad">' +
        '<strong style="color:var(--critical)">✕ Non possible</strong><ul style="margin:8px 0 0 18px;font-size:13px">' +
        m.cannot.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul></div></div>' : '') +
      '<p class="hint mt-16">Pour l\'instant, le bouton ci-dessous simule la connexion afin de tester l\'interface.</p>';
    openModal("Connecter " + m.name, body, [
      btn("Plus tard", "", closeModal),
      el("div", "spacer"),
      btn("Simuler la connexion", "btn-primary", function () {
        DB.connections[k] = true; save(); closeModal(); toast(m.name + " connecté (simulation)"); renderConnections();
      })
    ]);
  }

  /* ============================================================
     CHARTE & CANVA
     ============================================================ */
  var PALETTE = [
    ["Prune", "#4F1B64"], ["Rose", "#F1B1B4"], ["Poudré", "#F2C4CD"],
    ["Ivoire", "#FAF7F5"], ["Charbon", "#1A1A1A"]
  ];
  function renderBrand() {
    var pg = $("#paletteGrid"); pg.innerHTML = "";
    PALETTE.forEach(function (p) {
      var s = el("div", "swatch");
      s.innerHTML = '<div class="chip" style="background:' + p[1] + '"></div>' +
        '<div class="meta"><div class="name">' + p[0] + '</div><div class="hex">' + p[1] + '</div></div>';
      s.style.cursor = "pointer";
      s.title = "Copier " + p[1];
      s.addEventListener("click", function () { copy(p[1]); toast(p[1] + " copié ✓"); });
      pg.appendChild(s);
    });

    var cg = $("#canvaGrid"); cg.innerHTML = "";
    DB.canva.forEach(function (c) {
      var card = el("div", "card");
      card.innerHTML =
        '<div style="height:110px;border-radius:14px 14px 0 0;background:linear-gradient(135deg,#00c4cc,#7d2ae8);display:grid;place-items:center;color:#fff;font-size:28px">✦</div>' +
        '<div class="card-pad">' +
          '<div style="font-weight:650;font-size:13.5px">' + esc(c.title) + '</div>' +
          '<div class="flex gap-8 mt-8">' +
            '<a class="btn btn-sm" href="' + esc(c.url) + '" target="_blank" rel="noopener">Ouvrir ↗</a>' +
            '<button class="btn btn-sm" data-delc="' + c.id + '">Retirer</button>' +
          '</div>' +
        '</div>';
      cg.appendChild(card);
    });
    $$("[data-delc]", cg).forEach(function (b) {
      b.addEventListener("click", function () {
        DB.canva = DB.canva.filter(function (x) { return x.id !== b.getAttribute("data-delc"); });
        save(); renderBrand(); toast("Lien retiré");
      });
    });
  }
  function addCanva() {
    var body = el("div");
    body.innerHTML =
      field("Nom du modèle", '<input class="input" id="cv_title" placeholder="Ex : Template Reels produit">') +
      field("Lien de partage Canva", '<input class="input" id="cv_url" placeholder="https://www.canva.com/design/…">');
    openModal("Ajouter un lien Canva", body, [
      btn("Annuler", "", closeModal),
      el("div", "spacer"),
      btn("Ajouter", "btn-primary", function () {
        var title = $("#cv_title", body).value.trim() || "Modèle Canva";
        var url = $("#cv_url", body).value.trim() || "https://www.canva.com/";
        DB.canva.push({ id: uid(), title: title, url: url }); save();
        closeModal(); toast("Lien ajouté ✓"); renderBrand();
      })
    ]);
  }

  /* ============================================================
     Écouteurs
     ============================================================ */
  $("#addInspBtn").addEventListener("click", addInspiration);
  var addBtn2 = $("#addInspBtn2"); if (addBtn2) addBtn2.addEventListener("click", addInspiration);
  $("#addCanvaBtn").addEventListener("click", addCanva);

  $("#libFilterPlatform").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    $$("button", this).forEach(function (x) { x.classList.remove("active"); }); b.classList.add("active");
    libState.platform = b.getAttribute("data-f"); renderLibrary();
  });
  $("#libFilterStatus").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    $$("button", this).forEach(function (x) { x.classList.remove("active"); }); b.classList.add("active");
    libState.status = b.getAttribute("data-s"); renderLibrary();
  });
  $("#libSort").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    $$("button", this).forEach(function (x) { x.classList.remove("active"); }); b.classList.add("active");
    libState.sort = b.getAttribute("data-o"); renderLibrary();
  });
  $("#planView").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    $$("button", this).forEach(function (x) { x.classList.remove("active"); }); b.classList.add("active");
    planView = b.getAttribute("data-v"); renderPlanning();
  });
  $("#globalSearch").addEventListener("input", function () {
    libState.q = this.value;
    if (!$("#library").classList.contains("active")) go("library");
    else renderLibrary();
  });

  /* ---------- Démarrage ---------- */
  updateCounts();
  renderDashboard();
})();
