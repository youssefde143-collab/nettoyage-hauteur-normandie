import { brand, contact, site, nav, navMobile, methodes } from "./config.mjs";

export const esc = (s) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");

/* Monogramme vectoriel de substitution — remplacé automatiquement
   si `brand.logoSrc` est renseigné dans src/config.mjs. */
export const mark = (cls = "nav__mark") => brand.logoSrc
  ? `<img src="${brand.logoSrc}" alt="" class="${cls}" width="30" height="30">`
  : `<svg class="${cls}" viewBox="0 0 32 32" aria-hidden="true" fill="none">
      <rect x="1" y="1" width="30" height="30" rx="3" stroke="currentColor" stroke-opacity=".32"/>
      <path d="M8 23V9l16 14V9" stroke="currentColor" stroke-width="1.7" stroke-linecap="square"/>
      <circle cx="24" cy="23" r="2.4" fill="#1A74F0"/>
    </svg>`;

export const logo = (tag = "a", href = "/") => `
  <${tag} class="nav__logo" ${tag === "a" ? `href="${href}"` : ""}>
    ${mark()}
    <span class="nav__word"><b>${esc(brand.name)}</b><span>${esc(brand.baseline)}</span></span>
  </${tag}>`;

export const ar = () => `<svg class="btn__ar" width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M2 11 11 2M11 2H4.2M11 2v6.8" stroke="currentColor" stroke-width="1.5"/></svg>`;
export const arS = () => `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M1 6h9.5M7 2.5 10.5 6 7 9.5" stroke="currentColor" stroke-width="1.4"/></svg>`;

export const btn = (label, href, mod = "", big = false) =>
  `<a class="btn ${mod} ${big ? "btn--lg" : ""}" href="${href}">${esc(label)}${ar()}</a>`;

export const tlink = (label, href) =>
  `<a class="tlink" href="${href}">${esc(label)}${arS()}</a>`;

/* Dimensions et largeurs réelles de chaque image, relevées sur les fichiers
   (scripts/image-dims.json, régénéré par scripts/measure-images.sh).
   Garantit un srcset valide et des attributs width/height exacts : pas de
   décalage de mise en page, pas de déformation. */
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
const DIMS = JSON.parse(readFileSync(new URL("../scripts/image-dims.json", import.meta.url), "utf8"));

/* Empreinte de contenu : invalide les caches dès qu'un fichier change. */
const rev = (f) => createHash("sha1")
  .update(readFileSync(new URL("../public" + f, import.meta.url)))
  .digest("hex").slice(0, 8);
const CSS_V = rev("/assets/css/site.css") + rev("/assets/css/fonts.css");
const JS_V = rev("/assets/js/site.js");

/* Image responsive : WebP local, dimensions intrinsèques exactes,
   chargement différé par défaut. Le recadrage éventuel est assuré par le CSS
   du conteneur (object-fit / aspect-ratio), jamais par les attributs. */
export function img(name, alt, { sizes = "100vw", eager = false, cls = "" } = {}) {
  const d = DIMS[name];
  if (!d) throw new Error(`Image absente du manifeste : ${name}`);
  const base = `/assets/img/${name}`;
  const srcset = d.widths.map(x => `${base}-${x}.webp ${x}w`).join(", ");
  return `<img src="${base}-${d.w}.webp" srcset="${srcset}" sizes="${sizes}"
    width="${d.w}" height="${d.h}" alt="${esc(alt)}" class="${cls}"
    ${eager ? 'loading="eager" fetchpriority="high" decoding="sync"' : 'loading="lazy" decoding="async"'}>`;
}

const navLinks = (cur) => nav.map(l =>
  `<a href="${l.href}"${l.href === cur ? ' aria-current="page"' : ""}>${esc(l.label)}</a>`).join("");

const mobLinks = (cur) => navMobile.map((l, i) =>
  `<a href="${l.href}" class="${l.sub ? "mob__sub" : ""}" style="--i:${i}"${l.href === cur ? ' aria-current="page"' : ""}>${esc(l.label)}</a>`).join("");

const footerCols = () => {
  const c = contact;
  const line = (label, href) => href ? `<a href="${href}">${esc(label)}</a>` : `<span class="ph">${esc(label)}</span>`;
  return `
  <div>
    <h3>Nos solutions</h3>
    <ul>
      ${methodes.map(m => `<li><a href="/${m.slug}/">${esc(m.nom)}</a></li>`).join("")}
      <li><a href="/services/">Toutes nos prestations</a></li>
      <li><a href="/secteurs-dactivite/">Secteurs d'activité</a></li>
    </ul>
  </div>
  <div>
    <h3>L'entreprise</h3>
    <ul>
      <li><a href="/a-propos/">À propos</a></li>
      <li><a href="/realisations/">Nos réalisations</a></li>
      <li><a href="/zones-intervention/">Zones d'intervention</a></li>
      <li><a href="/contact/">Demander un devis</a></li>
    </ul>
  </div>
  <div>
    <h3>Contact</h3>
    <ul>
      <li>${line(c.phoneLabel, c.phoneHref ? `tel:${c.phoneHref}` : null)}</li>
      <li>${line(c.emailLabel, c.emailHref ? `mailto:${c.emailHref}` : null)}</li>
      <li><span class="ph">${c.addressLines.map(esc).join("<br>")}</span></li>
      <li><span class="ph">${esc(c.hoursLabel)}</span></li>
      ${c.social.length ? `<li>${c.social.map(s => `<a href="${s.href}">${esc(s.label)}</a>`).join(" · ")}</li>` : ""}
    </ul>
  </div>`;
};

/* Données structurées : uniquement des faits vérifiables.
   Aucun avis, note, prix, effectif ni certification n'est déclaré.
   Le type LocalBusiness est volontairement écarté tant que la raison
   sociale et l'adresse réelles ne sont pas connues (voir INTEGRATION.md). */
function jsonLd(page) {
  const org = {
    "@type": "Organization",
    "@id": site.origin + "/#organisation",
    name: brand.name,
    url: site.origin + "/",
    description: "Entreprise de nettoyage de vitres et de façades en hauteur : intervention par drone, travaux sur cordes et nacelle, en Normandie et dans toute la France.",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Normandie" },
      { "@type": "Country", name: "France" },
    ],
  };
  const graph = [org, {
    "@type": "WebSite",
    "@id": site.origin + "/#site",
    url: site.origin + "/",
    name: brand.name,
    inLanguage: "fr-FR",
    publisher: { "@id": site.origin + "/#organisation" },
  }];
  if (page.path !== "/") {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: site.origin + "/" },
        { "@type": "ListItem", position: 2, name: page.h1 || page.title, item: site.origin + page.path },
      ],
    });
  }
  if (page.service) {
    graph.push({
      "@type": "Service",
      name: page.service.name,
      serviceType: page.service.type,
      description: page.service.description,
      provider: { "@id": site.origin + "/#organisation" },
      areaServed: [{ "@type": "AdministrativeArea", name: "Normandie" }, { "@type": "Country", name: "France" }],
    });
  }
  if (page.faq && page.faq.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: page.faq.map(f => ({
        "@type": "Question", name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a.join(" ").replace(/<[^>]+>/g, "") },
      })),
    });
  }
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}

export function layout(page) {
  const cur = page.path;
  const canonical = site.origin + cur;
  /* Aperçu social : on retient la largeur disponible la plus proche de 1200 px
     et on publie les dimensions réelles du fichier choisi. */
  const ogName = page.ogImage || "hero-facade-verre";
  const ogDim = DIMS[ogName];
  const ogW = ogDim.widths.reduce((a, b) => (Math.abs(b - 1200) < Math.abs(a - 1200) ? b : a));
  const ogH = Math.round(ogW * ogDim.h / ogDim.w);
  const ogImg = `${site.origin}/assets/img/${ogName}-${ogW}.webp`;
  const darkHeader = page.darkHeader !== false;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="theme-color" content="#050B14">
<meta name="format-detection" content="telephone=no">
<meta property="og:type" content="${cur === "/" ? "website" : "article"}">
<meta property="og:site_name" content="${esc(brand.name)}">
<meta property="og:locale" content="fr_FR">
<meta property="og:title" content="${esc(page.ogTitle || page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="${ogW}">
<meta property="og:image:height" content="${ogH}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.ogTitle || page.title)}">
<meta name="twitter:description" content="${esc(page.description)}">
<meta name="twitter:image" content="${ogImg}">
<link rel="preconnect" href="/" crossorigin>
<link rel="preload" href="/assets/fonts/sora-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
<script>document.documentElement.className+=" js"</script>
<link rel="stylesheet" href="/assets/css/site.css?v=${CSS_V}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<script type="application/ld+json">${jsonLd(page)}</script>
</head>
<body${page.bodyClass ? ` class="${page.bodyClass}"` : ""}>
<a class="skip" href="#principal">Aller au contenu principal</a>

<header class="nav${darkHeader ? "" : " is-solid"}" id="entete" data-dark="${darkHeader}">
  <div class="nav__in">
    ${logo()}
    <nav class="nav__links" aria-label="Navigation principale">${navLinks(cur)}</nav>
    <div class="nav__cta">${btn("Demander un devis", "/contact/")}</div>
    <button class="nav__burger" type="button" aria-expanded="false" aria-controls="menu-mobile" aria-label="Ouvrir le menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<div class="mob" id="menu-mobile" hidden>
  <nav class="mob__links" aria-label="Navigation mobile">${mobLinks(cur)}</nav>
  <div class="mob__foot">
    ${btn("Demander un devis", "/contact/")}
    <div class="mob__meta">
      <span class="ph">${esc(contact.phoneLabel)}</span>
      <span class="ph">${esc(contact.emailLabel)}</span>
    </div>
  </div>
</div>

<main id="principal">
${page.body}
</main>

<footer class="foot">
  <div class="foot__top">
    <div class="foot__brand">
      <div class="foot__logo">${mark()}<span class="nav__word"><b>${esc(brand.name)}</b><span>${esc(brand.baseline)}</span></span></div>
      <p>Nettoyage de vitres et de façades en hauteur par drone, travaux sur cordes et nacelle. Une méthode choisie en fonction de chaque bâtiment, en Normandie et dans toute la France.</p>
      <p style="font-size:var(--t-micro);letter-spacing:.12em;text-transform:uppercase;color:#7F91A8;font-weight:600">Calvados · Eure · Manche · Orne · Seine-Maritime</p>
    </div>
    ${footerCols()}
  </div>
  <div class="foot__legal">
    <div>
      <span>© ${new Date().getFullYear()} <span class="ph">${esc(brand.name)}</span> — Tous droits réservés.</span>
      <nav aria-label="Liens légaux">
        <a href="/mentions-legales/">Mentions légales</a>
        <a href="/politique-de-confidentialite/">Politique de confidentialité</a>
        <a href="/gestion-des-cookies/">Gestion des cookies</a>
        <a href="/plan-du-site/">Plan du site</a>
      </nav>
    </div>
  </div>
</footer>

<div class="mbar" id="barre-mobile">
  ${contact.phoneHref
    ? `<a class="btn btn--on-dark" href="tel:${contact.phoneHref}">Appeler</a>`
    : `<a class="btn btn--on-dark" href="/contact/">Nous écrire</a>`}
  <a class="btn" href="/contact/">Demander un devis</a>
</div>

<aside class="cookies" id="cookies" role="region" aria-live="polite" aria-label="Gestion des cookies" hidden>
  <div>
    <b>Cookies et mesure d'audience</b>
    Ce site ne dépose aucun cookie publicitaire ni traceur tiers. Seul un stockage local conserve votre choix
    d'affichage de ce bandeau. <a href="/gestion-des-cookies/">En savoir plus</a>.
  </div>
  <div class="cookies__act">
    <button class="btn" type="button" data-cookie="ok">J'ai compris${ar()}</button>
    <button class="btn btn--on-dark" type="button" data-cookie="no">Refuser le non-essentiel${ar()}</button>
  </div>
</aside>

<script src="/assets/js/site.js?v=${JS_V}" defer></script>
</body>
</html>`;
}
