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
  const targets = $$(".rv, .rv-l, .rv-line, .reveal-img, .proc li");
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

  /* ---------- FAQ : accordéon avec hauteur animée ---------- */
  $$(".faq details").forEach(d => {
    const panel = $(".faq__a", d);
    if (!panel || reduced) return;
    const summary = $("summary", d);
    summary.addEventListener("click", (e) => {
      e.preventDefault();
      if (d.open) {
        panel.style.height = panel.scrollHeight + "px";
        requestAnimationFrame(() => {
          panel.style.transition = "height .4s cubic-bezier(.16,1,.3,1)";
          panel.style.height = "0px";
        });
        panel.addEventListener("transitionend", function end() {
          d.open = false; panel.style.transition = panel.style.height = "";
          panel.removeEventListener("transitionend", end);
        }, { once: true });
      } else {
        d.open = true;
        const h = panel.scrollHeight;
        panel.style.height = "0px";
        requestAnimationFrame(() => {
          panel.style.transition = "height .45s cubic-bezier(.16,1,.3,1)";
          panel.style.height = h + "px";
        });
        panel.addEventListener("transitionend", function end() {
          panel.style.transition = panel.style.height = "";
          panel.removeEventListener("transitionend", end);
        }, { once: true });
      }
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
    if (!stored) { ck.removeAttribute("hidden"); requestAnimationFrame(() => ck.classList.add("is-on")); }
    ck.addEventListener("click", (e) => {
      const b = e.target.closest("[data-cookie]"); if (!b) return;
      try { localStorage.setItem("choix-cookies", b.dataset.cookie); } catch (_) {}
      ck.classList.remove("is-on"); ck.setAttribute("hidden", "");
    });
  }

  /* ---------- Formulaire de devis ---------- */
  const form = $("#form-devis");
  if (form) {
    const status = $("#form-status");
    const msg = {
      required: "Ce champ est obligatoire.",
      email: "Veuillez saisir une adresse e-mail valide.",
      tel: "Veuillez saisir un numéro de téléphone valide (10 chiffres minimum).",
      consent: "Merci de confirmer votre accord pour que nous puissions traiter votre demande.",
      tooBig: "Chaque fichier doit peser moins de 8 Mo.",
      tooMany: "Vous pouvez joindre 5 fichiers au maximum.",
    };
    const setErr = (field, text) => {
      const wrap = field.closest(".field") || field.closest(".check")?.parentElement;
      if (!wrap) return;
      wrap.classList.toggle("has-err", Boolean(text));
      const slot = $(".field__err", wrap);
      if (slot) slot.textContent = text || "";
      field.setAttribute("aria-invalid", text ? "true" : "false");
    };
    const check = (f) => {
      let e = "";
      const v = (f.value || "").trim();
      if (f.required && (f.type === "checkbox" ? !f.checked : !v)) e = f.type === "checkbox" ? msg.consent : msg.required;
      else if (v && f.type === "email" && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v)) e = msg.email;
      else if (v && f.type === "tel" && (v.replace(/\D/g, "").length < 10)) e = msg.tel;
      else if (f.type === "file" && f.files.length) {
        if (f.files.length > 5) e = msg.tooMany;
        else if ([...f.files].some(x => x.size > 8 * 1024 * 1024)) e = msg.tooBig;
      }
      setErr(f, e);
      return !e;
    };
    const fields = $$("input, select, textarea", form).filter(f => f.type !== "hidden");
    fields.forEach(f => {
      f.addEventListener("blur", () => check(f));
      f.addEventListener("input", () => { if ((f.closest(".field") || {}).classList?.contains("has-err")) check(f); });
      f.addEventListener("change", () => check(f));
    });

    // Retour visuel du dépôt de fichiers
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

    const show = (kind, title, text) => {
      status.className = `form__status is-on form__status--${kind}`;
      status.innerHTML = `<b>${title}</b>${text}`;
      status.setAttribute("role", "status");
      status.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const bad = fields.filter(f => !check(f));
      if (bad.length) {
        show("ko", "Votre demande n'a pas pu être envoyée",
          `${bad.length} champ${bad.length > 1 ? "s" : ""} ${bad.length > 1 ? "sont" : "est"} à corriger. Les champs concernés sont signalés ci-dessus.`);
        bad[0].focus();
        return;
      }
      // Lu au moment de l'envoi : le point de terminaison peut être injecté à l'exécution.
      const endpoint = form.dataset.endpoint || "";
      // Maquette de présentation : on annonce clairement la démonstration.
      if (form.dataset.demo === "1") {
        show("ok", "Formulaire validé — maquette de démonstration",
          "Tous les champs sont corrects. Sur cette maquette, la demande n'est pas transmise : " +
          "le site en ligne l'enverra directement à l'entreprise.");
        return;
      }
      // Aucun point de terminaison configuré : on le dit, sans simuler un succès.
      if (!endpoint) {
        show("ko", "Envoi non configuré",
          "Le formulaire est validé mais aucun service de réception n'est encore raccordé. " +
          "La configuration requise est décrite dans le fichier INTEGRATION.md livré avec le site " +
          "(point de terminaison, destinataire et protection anti-spam).");
        return;
      }
      const submit = $('button[type=submit]', form);
      submit.setAttribute("aria-busy", "true");
      const label = submit.textContent;
      submit.textContent = "Envoi en cours…";
      try {
        const res = await fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error("HTTP " + res.status);
        form.reset();
        if (fileLbl) fileLbl.textContent = "Déposer vos photographies ici";
        show("ok", "Votre demande a bien été envoyée",
          "Nous revenons vers vous pour étudier la configuration de votre bâtiment et la méthode d'intervention la plus adaptée.");
      } catch (err) {
        show("ko", "L'envoi a échoué",
          "Une erreur technique est survenue. Vous pouvez réessayer dans un instant ou nous contacter directement par téléphone ou par e-mail.");
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
