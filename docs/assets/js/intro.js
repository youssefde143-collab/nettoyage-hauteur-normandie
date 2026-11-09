/* ============================================================
   Intro « nettoyage de vitre » — page d'accueil uniquement.

   Principe : la page d'accueil est entièrement chargée et rendue dès le
   départ. Par-dessus, un calque fixe simule une vitre humide — un flou
   d'arrière-plan (backdrop-filter) plus un canevas portant marques d'eau
   et gouttelettes. Une raclette descend la vitre par passes horizontales
   de droite à gauche ; à chaque passe, la portion balayée est EFFACÉE du
   canevas (destination-out) et retirée du calque de flou (clip-path). Ce
   n'est donc pas une vidéo ni un fondu : c'est bien la page réelle que
   l'on découvre derrière la lame.

   Garde-fous :
     — le calque n'existe que si `html.vt-on` a été posé par le script en
       tête de document (session neuve, mouvement non réduit) ;
     — une animation CSS de secours le fait disparaître après 4,2 s, même
       si ce fichier ne se charge pas ;
     — toute interaction (molette, touche, clic, défilement) interrompt.
   ============================================================ */
(() => {
  "use strict";
  const root = document.documentElement;
  if (!root.classList.contains("vt-on")) return;

  const vt = document.getElementById("intro-vitre");
  if (!vt) { root.classList.remove("vt-on"); return; }

  const blur = vt.querySelector(".vt__blur");
  const cG   = vt.querySelector(".vt__glass");
  const cF   = vt.querySelector(".vt__fx");
  const tool = vt.querySelector(".vt__tool");
  const svg  = tool.querySelector("svg");

  let over = false;
  const over_ = (fast) => {
    if (over) return;
    over = true;
    vt.classList.add("vt--out");
    if (fast) vt.classList.add("vt--cut");
    setTimeout(() => {
      vt.remove();
      root.classList.remove("vt-on");
      document.dispatchEvent(new CustomEvent("vitre:fin"));
    }, fast ? 170 : 300);
  };

  /* Un écran déjà défilé, un onglet masqué, une fenêtre minuscule :
     dans tous ces cas l'intro n'a pas lieu d'être. */
  if (window.scrollY > 40 || document.hidden) { over_(true); return; }

  const W = vt.clientWidth, H = vt.clientHeight;
  if (!W || !H || W < 280 || H < 320) { over_(true); return; }

  /* ---------- Géométrie des passes ---------- */
  const N = H < 600 ? 3 : H < 1000 ? 4 : 5;     // nombre de bandes
  const SH = H / N;                              // hauteur d'une bande
  /* La lame fait exactement la hauteur d'une bande : l'outil, la zone
     effacée et la limite du flou restent ainsi rigoureusement alignés. */
  const L  = SH;
  const X_R = W + L * 0.6;                       // hors champ à droite
  const X_L = -L * 0.34;                         // hors champ à gauche

  /* Repères du gabarit de la raclette (voir src/squeegee.mjs) */
  const SVG_H = L * 340 / 300, SVG_W = L * 150 / 300;
  const EDGE  = L * 2 / 300;                     // arête de lame dans le gabarit
  const MID   = L * 170 / 300;                   // milieu de lame
  svg.style.width = SVG_W + "px";
  svg.style.height = SVG_H + "px";

  /* ---------- Chronologie ---------- */
  const petit = W < 600;
  const SWEEP = petit ? 320 : 430, RET = petit ? 100 : 120, EXIT = 220;
  const seg = [];
  for (let i = 0; i < N; i++) {
    seg.push({ k: "s", i, d: SWEEP });
    if (i < N - 1) seg.push({ k: "r", i, d: RET });
  }
  seg.push({ k: "x", i: N - 1, d: EXIT });
  const TOTAL = seg.reduce((a, s) => a + s.d, 0);

  const smooth = (t) => t * t * (3 - 2 * t);
  const lerp = (a, b, t) => a + (b - a) * t;

  /* ---------- Canevas ---------- */
  /* Budget de pixels plutôt que densité fixe : sur un grand écran Retina,
     deux canevas en pleine résolution coûteraient plus de 100 Mo. */
  const dens = (budget) => Math.max(1, Math.min(devicePixelRatio || 1, 2, Math.sqrt(budget / (W * H))));
  const DPR = dens(3e6), DPRF = dens(2.2e6);
  cG.width = Math.round(W * DPR);  cG.height = Math.round(H * DPR);
  cF.width = Math.round(W * DPRF); cF.height = Math.round(H * DPRF);
  const g = cG.getContext("2d");
  const f = cF.getContext("2d", { alpha: true });
  if (!g || !f) { over_(true); return; }
  g.scale(DPR, DPR);
  f.scale(DPRF, DPRF);

  const rnd = (a, b) => a + Math.random() * (b - a);

  /* --- La vitre : voile froid, traces d'eau séchées, gouttelettes ---
     Volontairement discrète : une vitre à reprendre, pas une vitre sale.

     Les grands dégradés flous sont peints au tiers de la résolution puis
     agrandis : seules les gouttelettes, qui portent des éclats nets, sont
     dessinées à pleine échelle. Le rendu est identique à l'œil et la tâche
     passe de ~230 ms à quelques dizaines de millisecondes — aucun à-coup
     au chargement. */
  function paintGlass() {
    g.clearRect(0, 0, W, H);

    const sw = Math.max(80, Math.round(W / 3)), sh = Math.max(80, Math.round(H / 3));
    const o = document.createElement("canvas");
    o.width = sw; o.height = sh;
    const c = o.getContext("2d");
    const kx = sw / W, ky = sh / H;

    c.fillStyle = "rgba(172,203,230,.13)";
    c.fillRect(0, 0, sw, sh);

    /* Reflet diagonal du ciel */
    const sheen = c.createLinearGradient(0, sh, sw, 0);
    sheen.addColorStop(0, "rgba(255,255,255,0)");
    sheen.addColorStop(.46, "rgba(255,255,255,.075)");
    sheen.addColorStop(.58, "rgba(255,255,255,.035)");
    sheen.addColorStop(1, "rgba(255,255,255,0)");
    c.fillStyle = sheen;
    c.fillRect(0, 0, sw, sh);

    /* Auréoles d'eau */
    const marks = Math.round(W * H / 58000);
    for (let i = 0; i < marks; i++) {
      const x = rnd(0, sw), y = rnd(0, sh), r = rnd(50, Math.min(220, W * .22)) * kx;
      const rg = c.createRadialGradient(x, y, r * .12, x, y, r);
      rg.addColorStop(0, "rgba(255,255,255,.062)");
      rg.addColorStop(.62, "rgba(214,234,250,.028)");
      rg.addColorStop(1, "rgba(255,255,255,0)");
      c.fillStyle = rg;
      c.beginPath(); c.arc(x, y, r, 0, 6.2832); c.fill();
    }

    /* Coulures séchées, presque verticales */
    c.lineCap = "round";
    for (let i = 0; i < Math.round(W / 46); i++) {
      const x = rnd(0, sw), y = rnd(0, sh * .7), h = rnd(sh * .08, sh * .34);
      const lg = c.createLinearGradient(x, y, x + rnd(-14, 14) * kx, y + h);
      lg.addColorStop(0, "rgba(255,255,255,0)");
      lg.addColorStop(.4, "rgba(232,244,255,.05)");
      lg.addColorStop(1, "rgba(255,255,255,0)");
      c.strokeStyle = lg;
      c.lineWidth = rnd(1.2, 3.4) * kx;
      c.beginPath(); c.moveTo(x, y);
      c.quadraticCurveTo(x + rnd(-9, 9) * kx, y + h * .5, x + rnd(-16, 16) * kx, y + h);
      c.stroke();
    }

    g.drawImage(o, 0, 0, W, H);

    /* Gouttelettes : corps translucide, éclat en haut à gauche,
       liseré sombre en bas à droite — le volume vient de là. */
    const drops = Math.round(W * H / 10500);
    for (let i = 0; i < drops; i++) {
      const x = rnd(0, W), y = rnd(0, H), r = Math.pow(Math.random(), 2.1) * 7.4 + 1.4;
      const rg = g.createRadialGradient(x - r * .3, y - r * .36, r * .1, x, y, r);
      rg.addColorStop(0, "rgba(255,255,255,.4)");
      rg.addColorStop(.45, "rgba(198,226,248,.2)");
      rg.addColorStop(1, "rgba(150,190,222,.1)");
      g.fillStyle = rg;
      g.beginPath(); g.arc(x, y, r, 0, 6.2832); g.fill();

      g.fillStyle = "rgba(255,255,255,.62)";
      g.beginPath(); g.arc(x - r * .33, y - r * .38, Math.max(.5, r * .2), 0, 6.2832); g.fill();

      if (r > 3.4) {
        g.strokeStyle = "rgba(6,14,26,.14)";
        g.lineWidth = Math.max(.6, r * .14);
        g.beginPath(); g.arc(x, y, r * .94, .5, 2.4); g.stroke();
      }
      if (r > 5.4) {                             // les grosses gouttes traînent
        const tl = g.createLinearGradient(x, y, x, y + r * 2.2);
        tl.addColorStop(0, "rgba(206,230,250,.11)");
        tl.addColorStop(1, "rgba(206,230,250,0)");
        g.fillStyle = tl;
        g.beginPath();
        g.moveTo(x - r * .72, y); g.quadraticCurveTo(x, y + r * 2.4, x + r * .72, y);
        g.fill();
      }
    }
  }
  paintGlass();

  /* --- Bourrelet d'eau poussé par la lame ---
     Les billes sont fixées une fois pour toutes puis translatées avec la
     lame : sans cela, elles scintilleraient d'une image à l'autre. */
  const beads = [];
  for (let i = 0; i < N; i++) {
    const row = [];
    const n = Math.max(7, Math.round(SH / 26));
    for (let j = 0; j < n; j++) {
      row.push({
        dy: (j + rnd(.15, .85)) / n * SH,
        dx: -rnd(1.5, 16),
        r: Math.pow(Math.random(), 1.5) * 6 + 1.6,
      });
    }
    beads.push(row);
  }

  /* --- Gouttes qui s'échappent --- */
  const parts = [];
  const spawn = (x, yTop) => {
    if (parts.length > 30) return;
    parts.push({
      x: x - rnd(0, 6), y: yTop + rnd(0, SH),
      vx: -rnd(.3, 1.3), vy: rnd(.15, 1),
      r: rnd(1.1, 3.1), a: 1, da: rnd(.018, .042),
    });
  };

  /* ---------- Boucle ---------- */
  let t0 = null, si = 0, sStart = 0, prevX = X_R, raf = 0;

  function frame(now) {
    if (over) return;
    if (t0 === null) t0 = now;
    const el = now - t0;

    /* Avance dans la chronologie */
    while (si < seg.length - 1 && el >= sStart + seg[si].d) {
      /* La passe qui se termine doit être nettoyée jusqu'au bout. */
      if (seg[si].k === "s") { erase(seg[si].i, X_L, prevX); prevX = X_L; }
      sStart += seg[si].d; si++;
      if (seg[si].k === "s") prevX = X_R;
    }
    const s = seg[si];
    const t = Math.min(1, (el - sStart) / s.d);
    const i = s.i;

    let x, y, lifted = false, op = 1;
    if (s.k === "s") {
      x = lerp(X_R, X_L, smooth(t));
      y = (i + .5) * SH;
      erase(i, x, prevX);
      prevX = x;
    } else if (s.k === "r") {
      x = lerp(X_L, X_R, smooth(t));
      y = lerp((i + .5) * SH, (i + 1.5) * SH, smooth(t));
      lifted = true;
    } else {
      x = X_L - L * .22 * t;
      y = (i + .5) * SH;
      op = 1 - t;
    }

    /* Flou d'arrière-plan : on ne garde que la zone non nettoyée.
       Deux rectangles réunis en un seul polygone — la bande en cours
       jusqu'à la lame, puis tout ce qui reste en dessous. */
    const bx = Math.max(0, Math.min(W, s.k === "s" ? x : (s.k === "r" ? W : 0)));
    const top = s.k === "s" ? i * SH : (i + 1) * SH;
    const bot = s.k === "s" ? (i + 1) * SH : (i + 1) * SH;
    if (top >= H - .5) blur.style.opacity = "0";
    else blur.style.clipPath =
      `polygon(0px ${top}px, ${bx}px ${top}px, ${bx}px ${bot}px, ${W}px ${bot}px, ${W}px ${H}px, 0px ${H}px)`;

    fx(s.k === "s", i, x, t);

    tool.style.transform = `translate3d(${x - EDGE}px, ${y - MID}px, 0)` +
      (lifted ? " rotate(-3.5deg) scale(.965)" : "");
    tool.style.opacity = lifted ? ".6" : String(op);

    if (el >= TOTAL) { over_(false); return; }
    raf = requestAnimationFrame(frame);
  }

  /* Efface la tranche balayée : plein effacement derrière la lame, plus un
     dégradé de 16 px devant pour que le film s'amincisse au lieu de se
     couper net. Le rectangle plein de l'image suivante achève le travail. */
  function erase(i, x, px) {
    if (px <= x) return;
    const top = i * SH - .6, h = SH + 1.2;
    g.save();
    g.globalCompositeOperation = "destination-out";
    g.fillStyle = "#000";
    g.fillRect(x, top, px - x, h);
    const lg = g.createLinearGradient(x - 16, 0, x, 0);
    lg.addColorStop(0, "rgba(0,0,0,0)");
    lg.addColorStop(1, "rgba(0,0,0,.6)");
    g.fillStyle = lg;
    g.fillRect(x - 16, top, 16, h);
    g.restore();
  }

  /* Effets vifs : bourrelet devant la lame, film résiduel derrière,
     gouttes qui s'échappent. Tout est redessiné à chaque image dans une
     bande limitée — jamais le canevas entier. */
  let lastI = -1;
  function fx(active, i, x, t) {
    const top = i * SH;
    /* Au changement de bande, on repart d'un canevas vierge : sinon une
       bille ou une éclaboussure de la passe précédente resterait affichée
       au-dessus de la zone déjà nettoyée. */
    if (i !== lastI || !active) { f.clearRect(0, 0, W, H); lastI = i; }
    else f.clearRect(0, Math.max(0, top - 50), W, SH + 160);
    if (!active) return;

    /* Film résiduel juste derrière la lame */
    const trail = f.createLinearGradient(x, 0, x + 46, 0);
    trail.addColorStop(0, "rgba(238,249,255,.34)");
    trail.addColorStop(.3, "rgba(212,237,255,.14)");
    trail.addColorStop(1, "rgba(212,237,255,0)");
    f.fillStyle = trail;
    f.fillRect(x, top, 46, SH);
    f.fillStyle = "rgba(255,255,255,.4)";
    f.fillRect(x, top, 1.6, SH);

    /* Halo d'eau accumulée devant la lame */
    const ahead = f.createLinearGradient(x - 30, 0, x, 0);
    ahead.addColorStop(0, "rgba(186,220,248,0)");
    ahead.addColorStop(.6, "rgba(198,228,250,.16)");
    ahead.addColorStop(1, "rgba(214,238,255,.42)");
    f.fillStyle = ahead;
    f.fillRect(Math.max(-30, x - 30), top, Math.min(30, x + 30), SH);

    /* Billes du bourrelet */
    for (const b of beads[i]) {
      const bxp = x + b.dx, byp = top + b.dy;
      if (bxp < -8) continue;
      const rg = f.createRadialGradient(bxp - b.r * .3, byp - b.r * .35, b.r * .1, bxp, byp, b.r);
      rg.addColorStop(0, "rgba(255,255,255,.8)");
      rg.addColorStop(.5, "rgba(211,234,252,.5)");
      rg.addColorStop(1, "rgba(166,205,236,.12)");
      f.fillStyle = rg;
      f.beginPath(); f.arc(bxp, byp, b.r, 0, 6.2832); f.fill();
    }

    /* Éclaboussures */
    if (t > .04 && t < .97 && Math.random() < .8) spawn(x, top);
    for (let k = parts.length - 1; k >= 0; k--) {
      const p = parts[k];
      p.x += p.vx; p.y += p.vy; p.vy += .05; p.a -= p.da;
      if (p.a <= 0 || p.y > top + SH + 120 || p.x < -10) { parts.splice(k, 1); continue; }
      f.fillStyle = `rgba(226,242,255,${(p.a * .72).toFixed(3)})`;
      f.beginPath(); f.arc(p.x, p.y, p.r, 0, 6.2832); f.fill();
    }
  }

  /* ---------- Interruptions ---------- */
  const bail = () => { cancelAnimationFrame(raf); over_(true); };
  const opt = { passive: true, capture: true };
  ["wheel", "touchstart", "pointerdown", "keydown"].forEach(e => addEventListener(e, bail, opt));
  addEventListener("scroll", () => { if (window.scrollY > 10) bail(); }, opt);
  addEventListener("resize", bail, opt);
  document.addEventListener("visibilitychange", () => { if (document.hidden) bail(); });

  /* ---------- Départ ----------
     On laisse une image au navigateur pour peindre le héros derrière la
     vitre, sans jamais attendre plus de 450 ms. */
  const go = () => requestAnimationFrame(() => { raf = requestAnimationFrame(frame); });
  const hero = document.querySelector(".hero__media img");
  if (hero && !hero.complete) {
    let fired = false;
    const once = () => { if (!fired) { fired = true; go(); } };
    hero.addEventListener("load", once, { once: true });
    hero.addEventListener("error", once, { once: true });
    setTimeout(once, 450);
  } else go();
})();
