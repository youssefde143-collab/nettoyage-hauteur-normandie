import { esc, tlink } from "../layout.mjs";
import { zones, methodesPages } from "../config.mjs";

const groups = [
  ["Pages principales", [
    ["/", "Accueil", "Présentation générale, méthodes d'intervention et territoires"],
    ["/services/", "Nos services", "Prestations détaillées et quatre moyens d'accès"],
    ["/secteurs-dactivite/", "Secteurs d'activité", "Industrie, bureaux, hôtellerie, copropriétés, collectivités, particuliers"],
    ["/realisations/", "Nos réalisations", "Galerie illustrant nos capacités d'intervention"],
    ["/zones-intervention/", "Zones d'intervention", "Les cinq départements normands et la France entière"],
    ["/a-propos/", "À propos", "Notre métier, nos moyens et notre méthode de travail"],
    ["/parrainage/", "Parrainage", "Le bouche-à-oreille récompensé : 20 % pour la personne recommandée"],
    ["/contact/", "Contact et devis", "Formulaire détaillé de demande de devis"],
  ]],
  ["Méthodes d'accès", methodesPages.map(m => [`/${m.slug}/`, m.nom, {
    "nettoyage-par-drone": "Principe, applications, avantages et conditions de faisabilité",
    "travaux-sur-cordes": "Technique d'accès, applications, sécurité et qualifications",
  }[m.slug]])],
  ["Départements couverts", zones.map(z => [`/zones-intervention/#dep-info-${z.slug}`, `${z.nom} (${z.code})`, z.villes.slice(0, 4).join(" · ")])],
  ["Informations légales", [
    ["/mentions-legales/", "Mentions légales", "Éditeur, hébergement, propriété intellectuelle et crédits"],
    ["/politique-de-confidentialite/", "Politique de confidentialité", "Traitement des données du formulaire de devis"],
    ["/gestion-des-cookies/", "Gestion des cookies", "Aucun cookie déposé — détail du stockage local utilisé"],
  ]],
];

const body = `
<section class="phero phero--flat" style="background:var(--ink)">
  <div class="phero__in" style="padding-bottom:clamp(2.4rem,5vw,4rem)">
    <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>/</span>Plan du site</nav>
    <h1 style="font-size:clamp(2rem,1.4rem + 2.6vw,3.4rem)">Plan du site</h1>
    <p class="phero__sub" style="font-size:var(--t-body)">L'ensemble des pages du site, organisées par thème.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    ${groups.map((g, gi) => `
    <div class="rv" style="${gi ? "margin-top:clamp(2.8rem,5vw,4rem);padding-top:clamp(2rem,4vw,3rem);border-top:1px solid var(--line-light)" : ""}">
      <p class="eyebrow">${String(gi + 1).padStart(2, "0")}</p>
      <h2 style="font-size:var(--t-h3)">${esc(g[0])}</h2>
      <ul class="deps" style="margin-top:1.6rem;border-color:var(--line-light)">
        ${g[1].map(([href, label, desc]) => `
        <li style="border-color:var(--line-light)">
          <a href="${href}" style="display:grid;grid-template-columns:1fr auto;gap:1.2rem;align-items:center;padding:1.12rem .25rem">
            <span><strong style="color:var(--text);font-family:var(--f-display);font-weight:600;letter-spacing:-.024em;display:block;font-size:clamp(1.02rem,1.6vw,1.22rem)">${esc(label)}</strong>
            <em style="font-style:normal;display:block;font-size:var(--t-small);color:var(--text-soft);margin-top:.18rem">${esc(desc)}</em></span>
            <i style="font-style:normal;color:var(--c-label)" aria-hidden="true">→</i>
          </a>
        </li>`).join("")}
      </ul>
    </div>`).join("")}
  </div>
</section>
`;

export default {
  path: "/plan-du-site/",
  title: "Plan du site | CleanVitreService",
  description: "Toutes les pages du site : services, méthodes d'intervention, secteurs d'activité, zones d'intervention en Normandie et informations légales.",
  darkHeader: false,
  body,
};
