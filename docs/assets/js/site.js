/* ============================================================
   Interactions du site — JavaScript natif, sans dépendance.
   Tout est désactivé proprement si `prefers-reduced-motion`.
   ============================================================ */
(() => {
  "use strict";
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- En-tête : fond au défilement + masquage ---------- */
  const nav = $("#entete");
  if (nav) {
    const startsDark = nav.dataset.dark === "true";
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const threshold = startsDark ? Math.min(innerHeight * 0.72, 620) : 40;
      nav.classList.toggle("is-solid", y > threshold);
      nav.classList.toggle("is-hidden", y > threshold + 180 && y > last && !$("#menu-mobile")?.classList.contains("is-open"));
      last = y;
      const bar = $("#barre-mobile");
      if (bar) bar.classList.toggle("is-on", y > 420);
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Menu mobile ---------- */
  const burger = $(".nav__burger"), mob = $("#menu-mobile");
  if (burger && mob) {
    mob.removeAttribute("hidden");
    const toggle = (open) => {
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
      mob.classList.toggle("is-open", open);
      document.body.classList.toggle("is-locked", open);
      if (open) nav.classList.add("is-solid");
      else if (nav.dataset.dark === "true" && scrollY < 200) nav.classList.remove("is-solid");
      // Croix animée
      const [a, , c] = $$("span", burger);
      a.style.transform = open ? "translateY(6px) rotate(45deg)" : "";
      c.style.transform = open ? "translateY(-6px) rotate(-45deg)" : "";
      $$("span", burger)[1].style.opacity = open ? "0" : "";
      if (open) $(".mob__links a", mob)?.focus({ preventScroll: true });
    };
    burger.addEventListener("click", () => toggle(burger.getAttribute("aria-expanded") !== "true"));
    addEventListener("keydown", (e) => { if (e.key === "Escape" && mob.classList.contains("is-open")) { toggle(false); burger.focus(); } });
    $$("a", mob).forEach(a => a.addEventListener("click", () => toggle(false)));
  }

  /* ---------- Apparitions au défilement ----------
     Trois filets de sécurité, parce qu'un contenu invisible est un défaut
     bien plus grave qu'une animation manquée :
       1. IntersectionObserver pour l'animation normale ;
       2. un balayage de repli sur défilement et redimensionnement ;
       3. une révélation inconditionnelle après 4 s.                          */
  const targets = $$(".rv, .rv-l, .rv-line, .reveal-img, .proc li, .steps li");
  const reveal = (el) => el.classList.add("in");

  if (reduced || !("IntersectionObserver" in window)) {
    targets.forEach(reveal);
  } else {
    $$("[data-stagger]").forEach(g => [...g.children].forEach((c, i) => c.style.setProperty("--i", i)));

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    targets.forEach(el => io.observe(el));

    // Repli : tout élément dont le haut est entré dans la fenêtre est révélé.
    let pending = targets.slice();
    let sweeping = 0;
    const sweep = () => {
      sweeping = 0;
      const limit = innerHeight * 0.94;
      pending = pending.filter(el => {
        if (el.classList.contains("in")) return false;
        if (el.getBoundingClientRect().top < limit) { reveal(el); io.unobserve(el); return false; }
        return true;
      });
      if (!pending.length) {
        removeEventListener("scroll", askSweep);
        removeEventListener("resize", askSweep);
      }
    };
    const askSweep = () => { if (!sweeping) sweeping = requestAnimationFrame(sweep); };
    addEventListener("scroll", askSweep, { passive: true });
    addEventListener("resize", askSweep);
    addEventListener("load", askSweep);
    askSweep();

    // Dernier filet : rien ne doit rester masqué durablement.
    setTimeout(() => targets.forEach(reveal), 4000);
  }

  /* ---------- Hero : léger déplacement de l'image suivant le pointeur ----------
     Bureau et pointeur fin uniquement, amplitude volontairement minime,
     uniquement en `transform` pour rester hors du fil de mise en page. */
  const heroMedia = $("[data-hero-media]");
  if (heroMedia && !reduced && matchMedia("(hover:hover) and (pointer:fine)").matches) {
    const hero = heroMedia.closest(".hero");
    let raf = 0, tx = 0, ty = 0;
    const apply = () => {
      raf = 0;
      heroMedia.style.setProperty("--px", tx.toFixed(2) + "%");
      heroMedia.style.setProperty("--py", ty.toFixed(2) + "%");
    };
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * -1.6;   // ±0,8 %
      ty = ((e.clientY - r.top) / r.height - 0.5) * -1.2;
      if (!raf) raf = requestAnimationFrame(apply);
    });
    hero.addEventListener("pointerleave", () => { tx = ty = 0; if (!raf) raf = requestAnimationFrame(apply); });
  }

  /* ---------- Sélecteur de méthodes : l'image de fond suit l'élément visé ----------
     Au survol et au focus clavier sur bureau ; au toucher, la liste reste
     une simple liste de liens, sans dépendre du survol. */
  const pick = $("[data-pick]");
  if (pick) {
    const stages = $$(".pick__stage");
    let current = 0;
    const activate = (i) => {
      if (i === current) return;
      current = i;
      stages.forEach((s, k) => s.classList.toggle("is-on", k === i));
    };
    $$("[data-pick-i]", pick).forEach(a => {
      const i = Number(a.dataset.pickI);
      a.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") activate(i); });
      a.addEventListener("focus", () => activate(i));
    });
  }

  /* ---------- Parallaxe discrète (transform uniquement) ---------- */
  const plx = $$(".plx");
  if (plx.length && !reduced) {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = innerHeight;
      plx.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const amp = parseFloat(el.dataset.plx || "9");
        const p = (r.top + r.height / 2 - vh / 2) / vh;        // -1 … 1
        el.style.transform = `translate3d(0,${(p * amp).toFixed(2)}%,0) scale(1.1)`;
      });
    };
    const req = () => { if (!raf) raf = requestAnimationFrame(tick); };
    addEventListener("scroll", req, { passive: true });
    addEventListener("resize", req);
    tick();
  }

  /* ---------- FAQ : accordéon, une réponse ouverte à la fois ----------
     L'état ouvert/fermé est piloté par une minuterie, jamais par
     `transitionend` : cet événement ne se déclenche pas toujours
     (valeurs identiques, onglet en arrière-plan), ce qui laisserait
     des panneaux bloqués en position ouverte. */
  const PANEL_MS = 240;
  $$(".faq").forEach(faq => {
    const items = $$("details", faq);
    const timers = new WeakMap();

    const clear = (d) => { const t = timers.get(d); if (t) { clearTimeout(t); timers.delete(d); } };

    const close = (d) => {
      if (!d.open) return;
      const panel = $(".faq__a", d);
      clear(d);
      if (reduced || !panel) { d.open = false; return; }
      panel.style.height = panel.scrollHeight + "px";
      void panel.offsetHeight;                               // force le calcul
      panel.style.transition = `height ${PANEL_MS}ms var(--e-inout)`;
      panel.style.height = "0px";
      timers.set(d, setTimeout(() => {
        d.open = false;
        panel.style.transition = panel.style.height = "";
        timers.delete(d);
      }, PANEL_MS));
    };

    const open = (d) => {
      const panel = $(".faq__a", d);
      clear(d);
      d.open = true;
      if (reduced || !panel) return;
      const h = panel.scrollHeight;
      panel.style.height = "0px";
      void panel.offsetHeight;
      panel.style.transition = `height ${PANEL_MS}ms var(--e-inout)`;
      panel.style.height = h + "px";
      timers.set(d, setTimeout(() => {
        panel.style.transition = panel.style.height = "";   // rend la hauteur automatique
        timers.delete(d);
      }, PANEL_MS));
    };

    items.forEach(d => {
      $("summary", d).addEventListener("click", (e) => {
        e.preventDefault();
        if (d.open) { close(d); return; }
        items.forEach(o => { if (o !== d) close(o); });
        open(d);
      });
    });
  });

  /* ---------- Carte de Normandie : survol et liste synchronisés ---------- */
  const map = $(".nmap");
  if (map) {
    const link = (slug, on) => {
      $$(`.nmap__dep[data-dep="${slug}"]`).forEach(p => p.classList.toggle("is-on", on));
      $$(`.deps button[data-dep="${slug}"]`).forEach(b => b.classList.toggle("is-on", on));
    };
    $$(".nmap__dep").forEach(p => {
      p.addEventListener("mouseenter", () => link(p.dataset.dep, true));
      p.addEventListener("mouseleave", () => link(p.dataset.dep, false));
      p.addEventListener("click", () => { const t = $(`#dep-info-${p.dataset.dep}`); if (t) t.scrollIntoView({ block: "center" }); });
    });
    $$(".deps button").forEach(b => {
      b.addEventListener("mouseenter", () => link(b.dataset.dep, true));
      b.addEventListener("mouseleave", () => link(b.dataset.dep, false));
      b.addEventListener("focus", () => link(b.dataset.dep, true));
      b.addEventListener("blur", () => link(b.dataset.dep, false));
      b.addEventListener("click", () => { const t = $(`#dep-info-${b.dataset.dep}`); if (t) t.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); });
    });
  }

  /* ---------- Galerie : filtres ---------- */
  const filters = $(".filters");
  if (filters) {
    const figures = $$("[data-gal] figure");
    filters.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      $$("button", filters).forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      const f = b.dataset.filter;
      let shown = 0;
      figures.forEach(fig => {
        const ok = f === "tout" || (fig.dataset.cat || "").split(" ").includes(f);
        fig.hidden = !ok;
        if (ok) shown++;
      });
      const live = $("#gal-live"); if (live) live.textContent = `${shown} visuel${shown > 1 ? "s" : ""} affiché${shown > 1 ? "s" : ""}.`;
    });
  }

  /* ---------- Bandeau cookies ---------- */
  const ck = $("#cookies");
  if (ck) {
    let stored = null;
    try { stored = localStorage.getItem("choix-cookies"); } catch (_) {}
    /* Le bandeau attend la fin de l'intro « vitre » : il n'a aucune raison
       de s'inviter par-dessus la raclette. */
    const showCk = () => { ck.removeAttribute("hidden"); requestAnimationFrame(() => ck.classList.add("is-on")); };
    if (!stored) {
      if (document.documentElement.classList.contains("vt-on")) {
        let done = false;
        const once = () => { if (!done) { done = true; showCk(); } };
        document.addEventListener("vitre:fin", once, { once: true });
        setTimeout(once, 4800);
      } else showCk();
    }
    ck.addEventListener("click", (e) => {
      const b = e.target.closest("[data-cookie]"); if (!b) return;
      try { localStorage.setItem("choix-cookies", b.dataset.cookie); } catch (_) {}
      ck.classList.remove("is-on"); ck.setAttribute("hidden", "");
    });
  }

  /* ---------- Formulaire de devis, en six étapes ---------- */
  const form = $("#form-devis");
  if (form) {
    const status = $("#form-status");
    const steps = $$(".step", form);
    const stepper = $$("[data-stepper] li");
    const bPrev = $("[data-prev]", form), bNext = $("[data-next]", form), bSend = $("[data-send]", form);
    let cur = 0;

    const msg = {
      required: "Ce champ est obligatoire.",
      email: "Veuillez saisir une adresse e-mail valide.",
      tel: "Veuillez saisir un numéro de téléphone valide (10 chiffres minimum).",
      consent: "Merci de confirmer votre accord pour que nous puissions traiter votre demande.",
      group: "Veuillez sélectionner au moins une surface.",
      tooBig: "Chaque fichier doit peser moins de 8 Mo.",
      tooMany: "Vous pouvez joindre 5 fichiers au maximum.",
    };

    const setErr = (el, slotId, text) => {
      const slot = document.getElementById(slotId);
      const wrap = el.closest(".field") || el.closest(".field, div");
      if (wrap) wrap.classList.toggle("has-err", Boolean(text));
      if (slot) slot.textContent = text || "";
      el.setAttribute("aria-invalid", text ? "true" : "false");
    };

    const checkField = (f) => {
      let e = "";
      const v = (f.value || "").trim();
      if (f.type === "checkbox" && f.required) e = f.checked ? "" : msg.consent;
      else if (f.required && !v) e = msg.required;
      else if (v && f.type === "email" && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v)) e = msg.email;
      else if (v && f.type === "tel" && v.replace(/\D/g, "").length < 10) e = msg.tel;
      else if (f.type === "file" && f.files.length) {
        if (f.files.length > 5) e = msg.tooMany;
        else if ([...f.files].some(x => x.size > 8 * 1024 * 1024)) e = msg.tooBig;
      }
      setErr(f, f.id + "-err", e);
      return !e;
    };

    // L'étape 2 n'a pas de champ requis au sens HTML : au moins une case suffit.
    const checkGroup = (step) => {
      const boxes = $$('input[name="prestations"]', step);
      if (!boxes.length) return true;
      const ok = boxes.some(b => b.checked);
      const slot = $("#prestations-err");
      if (slot) slot.textContent = ok ? "" : msg.group;
      step.querySelector(".chips")?.classList.toggle("has-err", !ok);
      return ok;
    };

    const validateStep = (i) => {
      const step = steps[i];
      const fields = $$("input, select, textarea", step).filter(f => f.type !== "hidden" && f.type !== "radio" && f.name !== "prestations");
      const bad = fields.filter(f => !checkField(f));
      const groupOk = checkGroup(step);
      if (bad.length) bad[0].focus();
      else if (!groupOk) $('input[name="prestations"]', step)?.focus();
      return !bad.length && groupOk;
    };

    const show = (i) => {
      cur = i;
      steps.forEach((s, k) => (s.hidden = k !== i));
      stepper.forEach((li, k) => {
        li.classList.toggle("is-done", k < i);
        if (k === i) li.setAttribute("aria-current", "step");
        else li.removeAttribute("aria-current");
      });
      bPrev.hidden = i === 0;
      bNext.hidden = i === steps.length - 1;
      bSend.hidden = i !== steps.length - 1;
      const top = form.getBoundingClientRect().top + scrollY - 110;
      if (scrollY > top) window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
      steps[i].querySelector("input, select, textarea")?.focus({ preventScroll: true });
    };

    // Le balisage livre les six étapes dépliées (repli sans JavaScript) :
    // le script reprend la main et active la navigation pas à pas.
    $("[data-stepper]", form)?.removeAttribute("hidden");
    bNext.hidden = false;
    show(0);

    bNext.addEventListener("click", () => { if (validateStep(cur)) show(cur + 1); });
    bPrev.addEventListener("click", () => show(cur - 1));

    // Entrée passe à l'étape suivante plutôt que d'envoyer prématurément.
    form.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.target.tagName !== "TEXTAREA" && cur < steps.length - 1) {
        e.preventDefault(); bNext.click();
      }
    });

    $$("input, select, textarea", form).forEach(f => {
      f.addEventListener("blur", () => { if (f.type !== "checkbox" && f.type !== "radio") checkField(f); });
      f.addEventListener("change", () => {
        if (f.name === "prestations") checkGroup(f.closest(".step"));
        else if (f.type !== "radio") checkField(f);
      });
    });

    const file = $('input[type=file]', form), fileLbl = $(".file b", form);
    if (file && fileLbl) {
      const base = fileLbl.textContent;
      file.addEventListener("change", () => {
        fileLbl.textContent = file.files.length
          ? `${file.files.length} fichier${file.files.length > 1 ? "s" : ""} sélectionné${file.files.length > 1 ? "s" : ""}`
          : base;
      });
      const box = file.closest(".file");
      ["dragenter", "dragover"].forEach(t => box.addEventListener(t, e => { e.preventDefault(); box.classList.add("is-over"); }));
      ["dragleave", "drop"].forEach(t => box.addEventListener(t, () => box.classList.remove("is-over")));
    }

    const report = (kind, title, text) => {
      status.className = `form__status is-on form__status--${kind}`;
      status.innerHTML = `<b>${title}</b>${text}`;
      status.setAttribute("role", "status");
      status.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    };

    /* Récapitulatif lisible, réutilisé pour le corps de l'e-mail. */
    const resume = () => {
      const d = new FormData(form);
      const L = [];
      const put = (label, key) => {
        const vals = d.getAll(key).filter(v => typeof v === "string" && v.trim());
        if (vals.length) L.push(`${label} : ${vals.join(", ")}`);
      };
      L.push("DEMANDE DE DEVIS", "");
      put("Nom", "nom"); put("Téléphone", "telephone"); put("E-mail", "email"); put("Profil", "type_client");
      L.push("");
      put("Surfaces", "prestations");
      L.push("");
      put("Adresse du chantier", "adresse"); put("Département", "departement");
      put("Quantité / surface", "quantite"); put("Hauteur", "hauteur"); put("Niveaux", "niveaux");
      put("Accessibilité", "acces"); put("Obstacles", "obstacles"); put("État des surfaces", "etat");
      L.push("");
      put("Méthode envisagée", "methode");
      put("Date souhaitée", "date"); put("Urgence", "urgence"); put("Type", "frequence");
      L.push("");
      put("Description", "description");
      put("Eau / électricité", "eau_electricite"); put("Stationnement", "stationnement");
      const nf = file && file.files.length;
      if (nf) L.push("", `${nf} fichier(s) à joindre manuellement à cet e-mail.`);
      return L.join("\n");
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      // Toutes les étapes sont revalidées : on ne peut pas envoyer un formulaire partiel.
      for (let i = 0; i < steps.length; i++) {
        if (!validateStep(i)) {
          show(i);
          report("ko", "Votre demande n'est pas complète", `Une information manque à l'étape ${i + 1}. Le champ concerné est signalé.`);
          return;
        }
      }

      const endpoint = form.dataset.endpoint || "";

      /* Sans service d'acheminement raccordé, on ouvre le logiciel de
         messagerie du visiteur, pré-rempli vers l'adresse réelle de
         l'entreprise. L'envoi reste à sa main : on ne prétend jamais
         que le message est parti. */
      if (!endpoint) {
        const to = form.dataset.mailto;
        const sujet = encodeURIComponent("Demande de devis — " + (form.nom.value || "site web"));
        /* Certains clients de messagerie tronquent les liens mailto au-delà
           d'environ 2 000 caractères : on borne le corps et on le signale,
           plutôt que de laisser disparaître la fin de la demande. */
        const LIMITE = 1800;
        let texte = resume();
        let lien = `mailto:${to}?subject=${sujet}&body=${encodeURIComponent(texte)}`;
        let tronque = false;
        while (lien.length > LIMITE && texte.length > 200) {
          texte = texte.slice(0, Math.max(200, texte.length - 150));
          tronque = true;
          lien = `mailto:${to}?subject=${sujet}&body=${encodeURIComponent(texte + "\n\n[…] Demande abrégée : précisions à ajouter dans l'e-mail.")}`;
        }
        report("ok", "Votre message est prêt",
          "Votre logiciel de messagerie s'ouvre avec la demande pré-remplie. " +
          "Il ne reste qu'à l'envoyer — et à y joindre vos photographies si vous en avez. " +
          (tronque ? "Votre description étant longue, elle a été abrégée dans l'e-mail : complétez-la avant l'envoi. " : "") +
          `Si rien ne s'ouvre, écrivez directement à <a href="mailto:${to}">${to}</a> ou appelez le ${form.dataset.tel || ""}.`);
        window.location.href = lien;
        return;
      }

      const submit = bSend;
      submit.setAttribute("aria-busy", "true");
      const label = submit.textContent;
      submit.textContent = "Envoi en cours…";
      try {
        const res = await fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error("HTTP " + res.status);
        form.reset();
        if (fileLbl) fileLbl.textContent = "Déposer vos fichiers ici";
        show(0);
        report("ok", "Votre demande a bien été envoyée",
          "Nous revenons vers vous sous 30 minutes, selon disponibilité.");
      } catch (err) {
        report("ko", "L'envoi a échoué",
          "Une erreur technique est survenue. Réessayez dans un instant, ou appelez-nous directement.");
      } finally {
        submit.removeAttribute("aria-busy");
        submit.textContent = label;
      }
    });
  }

  /* ---------- Défilement doux vers les ancres ---------- */
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (id.length < 2) return;
    const t = document.querySelector(id);
    if (!t) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    t.setAttribute("tabindex", "-1");
    t.focus({ preventScroll: true });
  });
})();
