/**
 * LADYLKO — Short cycliste 3D fidèle aux photos
 * Reconstruction précise : taille haute côtelée, deux poches avant,
 * boursouflet module chauffant, jambes cycliste, our lets
 */
(function () {

  function waitThree(cb) {
    if (window.THREE) { cb(); return; }
    const t = setInterval(() => { if (window.THREE) { clearInterval(t); cb(); } }, 50);
  }

  waitThree(init);

  /* ─────────────────────────────────────────
     UTILITAIRES GÉOMÉTRIE
  ───────────────────────────────────────── */
  function makeRoundedRect(w, h, r, segs) {
    const shape = new THREE.Shape();
    shape.moveTo(-w / 2 + r, -h / 2);
    shape.lineTo( w / 2 - r, -h / 2);
    shape.quadraticCurveTo( w / 2, -h / 2,  w / 2, -h / 2 + r);
    shape.lineTo( w / 2,  h / 2 - r);
    shape.quadraticCurveTo( w / 2,  h / 2,  w / 2 - r,  h / 2);
    shape.lineTo(-w / 2 + r,  h / 2);
    shape.quadraticCurveTo(-w / 2,  h / 2, -w / 2,  h / 2 - r);
    shape.lineTo(-w / 2, -h / 2 + r);
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
    return shape;
  }

  /* ─────────────────────────────────────────
     INIT
  ───────────────────────────────────────── */
  function init() {
    const THREE   = window.THREE;
    const canvas  = document.getElementById('s3d-canvas');
    const section = document.getElementById('short3d-section');
    if (!canvas || !section) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled  = true;
    renderer.shadowMap.type     = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0xfafafa, 1);

    /* ── Scene & Camera ── */
    const scene  = new THREE.Scene();
    scene.background = new THREE.Color(0xfafafa);
    // légère brume pour profondeur
    scene.fog = new THREE.Fog(0xfafafa, 10, 30);

    const W = canvas.offsetWidth  || window.innerWidth;
    const H = canvas.offsetHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 50);
    camera.position.set(0, 0.55, 4.5);
    camera.lookAt(0, 0.2, 0);
    renderer.setSize(W, H);

    /* ── Lumières studio ── */
    // Ambiance très douce
    scene.add(new THREE.AmbientLight(0xfff0f8, 0.55));

    // Lumière principale haut-gauche (comme une boîte à lumière studio)
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(-3, 6, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near   = 0.5;
    key.shadow.camera.far    = 20;
    key.shadow.camera.left   = -3;
    key.shadow.camera.right  =  3;
    key.shadow.camera.top    =  5;
    key.shadow.camera.bottom = -2;
    key.shadow.radius = 4;
    scene.add(key);

    // Contre-jour droit doux (warm)
    const fill = new THREE.DirectionalLight(0xffe8ee, 0.8);
    fill.position.set(4, 2, 3);
    scene.add(fill);

    // Lumière de sol (rebond)
    const bounce = new THREE.DirectionalLight(0xffd6e0, 0.4);
    bounce.position.set(0, -4, 3);
    scene.add(bounce);

    // Rim light derrière (souligne la silhouette)
    const rim = new THREE.DirectionalLight(0xffffff, 0.9);
    rim.position.set(0, 1, -6);
    scene.add(rim);

    /* ── Couleurs ── */
    const C_PRUNE      = 0x5e1a3a;   // couleur principale — bordeaux prune
    const C_PRUNE_DARK = 0x3d0f28;   // zones d'ombre
    const C_PRUNE_COTE = 0x6e2048;   // ceinture côtelée (légèrement plus clair)
    const C_SEAM       = 0x3d0f28;   // coutures
    const C_POCKET_RIM = 0x4d1530;   // contour poche
    const C_SNAP       = 0xb0a0a8;   // pressions métal

    /* ── Matériaux ── */
    const matFabric = new THREE.MeshStandardMaterial({
      color: C_PRUNE,
      roughness: 0.88,
      metalness: 0.0,
    });
    const matWaist = new THREE.MeshStandardMaterial({
      color: C_PRUNE_COTE,
      roughness: 0.82,
      metalness: 0.0,
    });
    const matDark = new THREE.MeshStandardMaterial({
      color: C_PRUNE_DARK,
      roughness: 0.92,
      metalness: 0.0,
    });
    const matPocketRim = new THREE.MeshStandardMaterial({
      color: C_POCKET_RIM,
      roughness: 0.9,
      metalness: 0.0,
    });
    const matSnap = new THREE.MeshStandardMaterial({
      color: C_SNAP,
      roughness: 0.25,
      metalness: 0.85,
    });
    const matSeam = new THREE.MeshStandardMaterial({
      color: C_SEAM,
      roughness: 0.95,
      metalness: 0.0,
    });

    /* ── Groupe principal ── */
    const G = new THREE.Group();
    G.position.y = -0.3;
    scene.add(G);

    /* ══════════════════════════════════════
       1. CEINTURE HAUTE CÔTELÉE (12 cm)
       Forme : cylindre légèrement effilé vers le haut
    ══════════════════════════════════════ */
    const WAIST_TOP_R = 0.70;
    const WAIST_BOT_R = 0.73;
    const WAIST_H     = 0.60;

    // Corps principal ceinture
    const wGeo  = new THREE.CylinderGeometry(WAIST_TOP_R, WAIST_BOT_R, WAIST_H, 64, 1, true);
    G.add(Object.assign(new THREE.Mesh(wGeo, matWaist), { castShadow: true }));
    (new THREE.Mesh(wGeo, matWaist)).position.y = 0;

    const wMesh = new THREE.Mesh(wGeo, matWaist);
    wMesh.position.y = 0.76;
    wMesh.castShadow = true;
    G.add(wMesh);

    // Rebord supérieur (tore aplati)
    const topRimGeo = new THREE.TorusGeometry(WAIST_TOP_R, 0.028, 14, 64);
    const topRim    = new THREE.Mesh(topRimGeo, matWaist);
    topRim.rotation.x = Math.PI / 2;
    topRim.position.y = 1.06;
    G.add(topRim);

    // Rebord inférieur ceinture / corps
    const botRimGeo = new THREE.TorusGeometry(WAIST_BOT_R, 0.022, 12, 64);
    const botRim    = new THREE.Mesh(botRimGeo, matDark);
    botRim.rotation.x = Math.PI / 2;
    botRim.position.y = 0.46;
    G.add(botRim);

    // Côtes de la ceinture — 10 lignes horizontales légèrement en relief
    for (let i = 0; i < 10; i++) {
      const r = WAIST_TOP_R + (WAIST_BOT_R - WAIST_TOP_R) * (i / 10);
      const ribGeo  = new THREE.TorusGeometry(r + 0.005, 0.007, 8, 64);
      const ribMesh = new THREE.Mesh(ribGeo, matDark);
      ribMesh.rotation.x = Math.PI / 2;
      ribMesh.position.y = 1.02 - i * 0.057;
      G.add(ribMesh);
    }

    /* ══════════════════════════════════════
       2. CORPS PRINCIPAL DU SHORT
       Tronc qui s'élargit vers le bas,
       plus plat à l'avant qu'au dos
    ══════════════════════════════════════ */
    const BODY_TOP_R = 0.73;
    const BODY_BOT_R = 0.80;
    const BODY_H     = 0.72;

    const bodyGeo  = new THREE.CylinderGeometry(BODY_TOP_R, BODY_BOT_R, BODY_H, 64, 3, true);
    const bodyMesh = new THREE.Mesh(bodyGeo, matFabric);
    bodyMesh.position.y = 0.08;
    bodyMesh.castShadow = true;
    G.add(bodyMesh);

    /* ══════════════════════════════════════
       3. JAMBES CYCLISTE
       Deux cylindres légèrement inclinés
       qui s'effilent vers le bas
    ══════════════════════════════════════ */
    const LEG_TOP_R = 0.355;
    const LEG_BOT_R = 0.305;
    const LEG_H     = 0.78;
    const LEG_SEP   = 0.29; // écartement du centre

    [-1, 1].forEach(side => {
      // Jambe
      const legGeo  = new THREE.CylinderGeometry(LEG_TOP_R, LEG_BOT_R, LEG_H, 40, 2, true);
      const legMesh = new THREE.Mesh(legGeo, matFabric);
      legMesh.position.set(side * LEG_SEP, -0.64, 0);
      legMesh.rotation.z = side * 0.05;
      legMesh.castShadow = true;
      G.add(legMesh);

      // Ourlet bas de jambe — rebord double couture
      const hem1 = new THREE.Mesh(
        new THREE.TorusGeometry(LEG_BOT_R, 0.018, 10, 40),
        matDark
      );
      hem1.rotation.x = Math.PI / 2;
      hem1.position.set(side * LEG_SEP, -1.04, 0);
      G.add(hem1);

      const hem2 = new THREE.Mesh(
        new THREE.TorusGeometry(LEG_BOT_R - 0.01, 0.010, 8, 40),
        matSeam
      );
      hem2.rotation.x = Math.PI / 2;
      hem2.position.set(side * LEG_SEP, -1.07, 0);
      G.add(hem2);
    });

    // Entrejambe — sphère partielle pour combler les jambes
    const crotchGeo  = new THREE.SphereGeometry(0.38, 32, 20, 0, Math.PI * 2, Math.PI * 0.45, Math.PI * 0.55);
    const crotchMesh = new THREE.Mesh(crotchGeo, matFabric);
    crotchMesh.position.y = -0.35;
    crotchMesh.castShadow = true;
    G.add(crotchMesh);

    /* ══════════════════════════════════════
       4. POCHES AVANT (visibles sur photo 1)
       Deux petites poches symétriques,
       légèrement bombées, contour cousu
    ══════════════════════════════════════ */
    function addPocket(sideX, posZ) {
      // Corps poche — bosse en relief
      const pGeo  = new THREE.SphereGeometry(0.20, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
      const pMesh = new THREE.Mesh(pGeo, matFabric);
      pMesh.scale.set(1.55, 0.55, 0.38);
      pMesh.rotation.x = Math.PI;
      pMesh.position.set(sideX, 0.18, posZ);
      pMesh.castShadow = true;
      G.add(pMesh);

      // Contour cousu (tore aplati rectangulaire simulé par 4 tubes)
      // On utilise un tore elliptique
      const rimGeo  = new THREE.TorusGeometry(0.19, 0.012, 8, 32);
      const rimMesh = new THREE.Mesh(rimGeo, matPocketRim);
      rimMesh.scale.x = 1.65;
      rimMesh.scale.y = 0.70;
      rimMesh.rotation.x = Math.PI / 2 - 0.25;
      rimMesh.position.set(sideX, 0.14, posZ + 0.04);
      G.add(rimMesh);
    }

    addPocket(-0.32, 0.62);  // poche gauche
    addPocket( 0.32, 0.62);  // poche droite

    /* ══════════════════════════════════════
       5. MODULE CHAUFFANT AVANT
       Boursouflet dans la ceinture —
       légère proéminence avec lueur orange
    ══════════════════════════════════════ */
    // Plaque chauffante avant — légère bosse dans la ceinture
    const heatFrontGeo  = new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.4);
    const heatFrontMat  = new THREE.MeshStandardMaterial({
      color: C_PRUNE,
      roughness: 0.85, metalness: 0.0,
      emissive: 0xff3300, emissiveIntensity: 0.0, // sera animé
    });
    const heatFrontMesh = new THREE.Mesh(heatFrontGeo, heatFrontMat);
    heatFrontMesh.scale.set(1.1, 0.28, 0.6);
    heatFrontMesh.rotation.x = Math.PI;
    heatFrontMesh.position.set(0, 0.62, 0.58);
    G.add(heatFrontMesh);

    // Câbles chauffants visibles (fin trait en arc)
    for (let ci = 0; ci < 3; ci++) {
      const cCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-0.55, 0.72 - ci * 0.035, 0.60),
        new THREE.Vector3(   0, 0.68 - ci * 0.035, 0.68),
        new THREE.Vector3( 0.55, 0.72 - ci * 0.035, 0.60),
      );
      const cGeo  = new THREE.TubeGeometry(cCurve, 24, 0.007, 6, false);
      const cMat  = new THREE.MeshStandardMaterial({
        color: 0xff5500, emissive: 0xff2200, emissiveIntensity: 0.4,
        roughness: 0.6, metalness: 0.2,
      });
      G.add(new THREE.Mesh(cGeo, cMat));
    }

    /* ══════════════════════════════════════
       6. MODULE CHAUFFANT DOS
       Bosse plus grande — lombaires
    ══════════════════════════════════════ */
    const heatBackGeo  = new THREE.SphereGeometry(0.52, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.4);
    const heatBackMat  = new THREE.MeshStandardMaterial({
      color: C_PRUNE,
      roughness: 0.85, metalness: 0.0,
      emissive: 0xff3300, emissiveIntensity: 0.0,
    });
    const heatBackMesh = new THREE.Mesh(heatBackGeo, heatBackMat);
    heatBackMesh.scale.set(1.15, 0.30, 0.55);
    heatBackMesh.rotation.x = Math.PI;
    heatBackMesh.position.set(0, 0.60, -0.58);
    G.add(heatBackMesh);

    // Câbles dos
    for (let ci = 0; ci < 3; ci++) {
      const cCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-0.50, 0.70 - ci * 0.04, -0.62),
        new THREE.Vector3(   0, 0.66 - ci * 0.04, -0.70),
        new THREE.Vector3( 0.50, 0.70 - ci * 0.04, -0.62),
      );
      const cGeo  = new THREE.TubeGeometry(cCurve, 24, 0.007, 6, false);
      const cMat  = new THREE.MeshStandardMaterial({
        color: 0xff5500, emissive: 0xff2200, emissiveIntensity: 0.4,
        roughness: 0.6, metalness: 0.2,
      });
      G.add(new THREE.Mesh(cGeo, cMat));
    }

    /* ══════════════════════════════════════
       7. CONNECTEUR BATTERIE — côté droit
       Petit cylindre + câble discret
    ══════════════════════════════════════ */
    const portGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.10, 12);
    const portMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.4, metalness: 0.8 });
    const portMesh = new THREE.Mesh(portGeo, portMat);
    portMesh.rotation.z = Math.PI / 2;
    portMesh.position.set(0.76, 0.78, 0.05);
    G.add(portMesh);

    /* ══════════════════════════════════════
       8. PRESSIONS ABSORBANT — 4 boutons
       Positionnés à l'intérieur visible
       de l'entrejambe (face avant)
    ══════════════════════════════════════ */
    [[-0.10, -0.20], [0.10, -0.20], [-0.10, -0.44], [0.10, -0.44]].forEach(([x, y]) => {
      const sGeo  = new THREE.CylinderGeometry(0.030, 0.030, 0.015, 16);
      const sMesh = new THREE.Mesh(sGeo, matSnap);
      sMesh.rotation.x = Math.PI / 2;
      sMesh.position.set(x, y, 0.65);
      G.add(sMesh);

      // Anneau autour
      const srGeo  = new THREE.TorusGeometry(0.034, 0.006, 8, 16);
      const srMesh = new THREE.Mesh(srGeo, matSnap);
      srMesh.rotation.x = Math.PI / 2;
      srMesh.position.set(x, y, 0.665);
      G.add(srMesh);
    });

    /* ══════════════════════════════════════
       9. COUTURE CENTRALE AVANT
       Fine ligne verticale
    ══════════════════════════════════════ */
    const seamCurve = new THREE.LineCurve3(
      new THREE.Vector3(0, 0.45, 0.71),
      new THREE.Vector3(0, -1.04, 0.60),
    );
    const seamGeo  = new THREE.TubeGeometry(seamCurve, 20, 0.008, 6, false);
    G.add(new THREE.Mesh(seamGeo, matSeam));

    /* ══════════════════════════════════════
       10. OMBRE AU SOL
    ══════════════════════════════════════ */
    const shadowGeo = new THREE.CircleGeometry(1.0, 40);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x5e1a3a, transparent: true, opacity: 0.10, depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.18;
    scene.add(shadowMesh);

    /* ══════════════════════════════════════
       UI / SCROLL
    ══════════════════════════════════════ */
    const steps = [
      { ids: [],       dotId: 'd0', stepId: 's3d-step0', targetY: 0 },
      { ids: ['tag1'], dotId: 'd1', stepId: 's3d-step1', targetY: 0 },         // face avant — chaleur
      { ids: ['tag2'], dotId: 'd2', stepId: 's3d-step2', targetY: Math.PI },   // face dos — batterie
      { ids: ['tag3'], dotId: 'd3', stepId: 's3d-step3', targetY: Math.PI * 2 * 0.75 }, // retour — absorbant
    ];

    let currentStep = -1;
    let targetRotY  = 0;
    let currentRotY = 0;
    let ticking     = false;

    function getFrac() {
      const rect  = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      return Math.max(0, Math.min(1, -rect.top / total));
    }

    function setStep(s) {
      if (s === currentStep) return;
      currentStep = s;

      steps.forEach((st, i) => {
        const el = document.getElementById(st.stepId);
        if (!el) return;
        if (i === s) {
          el.style.display = 'block';
          el.style.animation = 'none';
          void el.offsetWidth;
          el.style.animation = 'fadeUp 0.5s ease both';
        } else {
          el.style.display = 'none';
        }
        const dot = document.getElementById(st.dotId);
        if (dot) dot.classList.toggle('s3d-dot--on', i === s);
      });

      document.querySelectorAll('.s3d-tag').forEach(t => t.classList.remove('visible'));
      steps[s].ids.forEach(id => {
        const t = document.getElementById(id);
        if (t) t.classList.add('visible');
      });

      // Cacher hint après step 0
      const hint = document.getElementById('s3d-hint');
      if (hint) hint.style.opacity = s > 0 ? '0' : '';

      // Rotation cible pour cette étape
      targetRotY = steps[s].targetY;
    }

    function onScroll() {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }

    function update() {
      ticking = false;
      const f = getFrac();
      const s = f < 0.08 ? 0 : f < 0.38 ? 1 : f < 0.68 ? 2 : 3;
      setStep(s);
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    /* ── Boucle d'animation ── */
    let clock = 0;

    function animate() {
      requestAnimationFrame(animate);
      clock += 0.016;

      // Lerp rotation fluide
      currentRotY += (targetRotY - currentRotY) * 0.055;
      G.rotation.y = currentRotY;

      // Flottement doux à l'étape 0
      if (currentStep === 0) {
        G.position.y = -0.3 + Math.sin(clock * 0.7) * 0.022;
      }

      // Pulsation chaleur (avant + dos)
      const pulse = 0.5 + 0.5 * Math.sin(clock * 2.0);
      heatFrontMat.emissiveIntensity = pulse * 0.55;
      heatBackMat.emissiveIntensity  = pulse * 0.55;

      renderer.render(scene, camera);
    }

    /* ── Resize ── */
    function onResize() {
      const w = canvas.offsetWidth  || window.innerWidth;
      const h = canvas.offsetHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener('resize', onResize);
    setStep(0);
    onResize();
    animate();
  }

})();
