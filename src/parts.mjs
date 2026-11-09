import { btn, tlink, img, esc, ar } from "./layout.mjs";
import { zones, contact } from "./config.mjs";
import { readFileSync } from "node:fs";

export const normandieMap = readFileSync(new URL("./normandie-map.svg", import.meta.url), "utf8");

/* ---------- Pictogrammes (traits fins, pas de décoration superflue) ---------- */
export const icons = {
  drone: `<svg class="meth__ico" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M11 11h10v10H11z"/><path d="M11 11 6 6M21 11l5-5M11 21l-5 5M21 21l5 5"/><circle cx="5" cy="5" r="3.2"/><circle cx="27" cy="5" r="3.2"/><circle cx="5" cy="27" r="3.2"/><circle cx="27" cy="27" r="3.2"/><path d="M14.5 16h3"/></svg>`,
  cordes: `<svg class="meth__ico" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M4 4h24"/><path d="M12 4v12M20 4v8"/><circle cx="12" cy="19" r="3.2"/><path d="M12 22.2V28M9 28h6"/><path d="M20 12c0 4-5 4-5 8"/></svg>`,
  nacelle: `<svg class="meth__ico" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M3 27h26"/><path d="M7 27v-4h8v4"/><path d="M13 23 24 9"/><path d="M20 9h8v6h-8z"/><circle cx="9" cy="27" r="2"/><circle cx="17" cy="27" r="2"/></svg>`,
  shield: `<svg class="card__ico" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M14 2.5 24 6v8c0 6-4.4 9.8-10 11.5C8.4 23.8 4 20 4 14V6l10-3.5Z"/><path d="M9.5 14l3.2 3.2L19 11"/></svg>`,
  study: `<svg class="card__ico" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M5 3h12l6 6v16H5z"/><path d="M17 3v6h6"/><path d="M9 14h10M9 18h7"/></svg>`,
  map: `<svg class="card__ico" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M14 25s8-8.2 8-14A8 8 0 0 0 6 11c0 5.8 8 14 8 14Z"/><circle cx="14" cy="11" r="3"/></svg>`,
  gear: `<svg class="card__ico" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="14" cy="14" r="4"/><path d="M14 2v4M14 22v4M2 14h4M22 14h4M5.5 5.5l2.9 2.9M19.6 19.6l2.9 2.9M22.5 5.5l-2.9 2.9M8.4 19.6l-2.9 2.9"/></svg>`,
  clock: `<svg class="card__ico" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="14" cy="14" r="11"/><path d="M14 7v7.5l5 3"/></svg>`,
  layers: `<svg class="card__ico" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M14 3 25 9l-11 6L3 9l11-6Z"/><path d="M3 14.5l11 6 11-6M3 20l11 6 11-6"/></svg>`,
};

/* ---------- FAQ ---------- */
export function faqBlock(items, { title = "Questions fréquentes", eyebrow = "FAQ", intro = "" } = {}) {
  return `
<section class="sec" aria-labelledby="faq-t">
  <div class="wrap">
    <div class="shead rv">
      <div>
        <p class="eyebrow">${esc(eyebrow)}</p>
        <h2 id="faq-t">${esc(title)}</h2>
      </div>
      ${intro ? `<div class="shead__aside"><p class="lead" style="font-size:var(--t-body)">${intro}</p></div>` : ""}
    </div>
    <div class="faq rv">
      ${items.map((f, i) => `
      <details${i === 0 ? " open" : ""}>
        <summary>${esc(f.q)}<i aria-hidden="true"></i></summary>
        <div class="faq__a">${f.a.map(p => `<p>${p}</p>`).join("")}</div>
      </details>`).join("")}
    </div>
  </div>
</section>`;
}

/* ---------- CTA final ---------- */
export function finalCta({
  titre = "Votre bâtiment mérite une solution adaptée.",
  texte = "Vous avez un projet de nettoyage de vitres ou de façades ? Présentez-nous votre besoin et étudions ensemble la meilleure méthode d'intervention.",
  cta = "Parler de votre projet",
  image = "facade-reflets-band",
} = {}) {
  return `
<section class="fcta" aria-labelledby="fcta-t">
  <div class="fcta__bg">${img(image, "", { sizes: "100vw", cls: "plx" })}</div>
  <div class="fcta__in">
    <div class="rv">
      <p class="eyebrow">Prendre contact</p>
      <h2 id="fcta-t">${esc(titre)}</h2>
      <p>${esc(texte)}</p>
      <div class="btn-row" style="margin-top:2rem">
        ${btn(cta, "/contact/", "", true)}
        ${btn("Voir nos solutions", "/services/", "btn--on-dark", true)}
      </div>
    </div>
    <div class="fcta__side rv" style="--i:1">
      <dl>
        <div><dt>Téléphone</dt><dd class="ph">${esc(contact.phoneLabel)}</dd></div>
        <div><dt>E-mail</dt><dd class="ph">${esc(contact.emailLabel)}</dd></div>
        <div><dt>Territoire</dt><dd>Normandie · France entière</dd></div>
      </dl>
    </div>
  </div>
</section>`;
}

/* ---------- Tableau de correspondance méthode / configuration ---------- */
export function matriceMethodes() {
  const rows = [
    ["Façade entièrement vitrée, immeuble de grande hauteur", "Souvent pertinent", "Pertinent", "Selon le dégagement au sol"],
    ["Bâtiment industriel avec abords dégagés", "Souvent pertinent", "Selon les points d'ancrage", "Souvent pertinent"],
    ["Cœur de ville, voirie étroite, stationnement contraint", "Selon l'environnement et la réglementation locale", "Souvent pertinent", "Rarement adapté"],
    ["Verrière, auvent, surface en surplomb", "Selon la configuration", "Souvent pertinent", "Selon la portée disponible"],
    ["Bâtiment public en activité continue", "Selon l'environnement", "Souvent pertinent", "Selon les horaires d'accès"],
  ];
  return `
<table class="mtx rv">
  <caption>Indications générales — la méthode retenue est toujours déterminée après étude du bâtiment</caption>
  <thead><tr><th scope="col">Configuration du bâtiment</th><th scope="col">Drone</th><th scope="col">Cordes</th><th scope="col">Nacelle</th></tr></thead>
  <tbody>
    ${rows.map(r => `<tr>
      <th scope="row">${esc(r[0])}</th>
      <td data-l="Drone">${esc(r[1])}</td>
      <td data-l="Cordes">${esc(r[2])}</td>
      <td data-l="Nacelle">${esc(r[3])}</td>
    </tr>`).join("")}
  </tbody>
</table>`;
}

/* ---------- Processus en quatre étapes ---------- */
export function processus() {
  const steps = [
    ["Premier contact", "Vous nous présentez votre bâtiment et votre besoin, par téléphone, par e-mail ou via le formulaire de devis. Quelques photographies suffisent souvent à cadrer la demande."],
    ["Analyse du bâtiment et des contraintes", "Nous examinons la nature des surfaces, la hauteur, les accès, l'environnement immédiat, la présence de public et les contraintes d'exploitation du site."],
    ["Choix de la méthode d'intervention", "Drone, cordes ou nacelle : nous retenons la méthode techniquement adaptée, parfois une combinaison, et vous remettons une proposition détaillée."],
    ["Intervention et nettoyage", "L'intervention est planifiée en fonction de votre activité. Les surfaces sont nettoyées, puis contrôlées avant la remise du chantier."],
  ];
  return `
<section class="sec sec--dark" aria-labelledby="proc-t">
  <div class="wrap">
    <div class="shead rv">
      <div>
        <p class="eyebrow">Déroulement</p>
        <h2 id="proc-t">De votre premier appel à la remise du chantier.</h2>
      </div>
      <div class="shead__aside">
        <p class="lead" style="font-size:var(--t-body)">Chaque projet suit le même cadre : comprendre le bâtiment avant de choisir la méthode. C'est cette étape qui détermine la faisabilité, le délai et le coût.</p>
      </div>
    </div>
    <ol class="proc" data-stagger>
      ${steps.map(s => `<li><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p></li>`).join("")}
    </ol>
  </div>
</section>`;
}

/* ---------- Grille des secteurs ---------- */
const secteurs = [
  ["Industrie", "secteur-industrie", "Sites de production, entrepôts et bâtiments techniques", "Bâtiment industriel de grande emprise avec bardage métallique et ouvertures vitrées en hauteur"],
  ["Immobilier commercial", "secteur-commerce", "Centres commerciaux, retail parks, enseignes", "Entrée vitrée d'un bâtiment commercial moderne avec parvis"],
  ["Bureaux", "secteur-bureaux", "Immeubles tertiaires et sièges sociaux", "Immeuble de bureaux contemporain à façade entièrement vitrée"],
  ["Hôtellerie", "secteur-hotellerie", "Hôtels, résidences et établissements recevant du public", "Façade d'un établissement hôtelier avec nombreuses fenêtres et volets"],
  ["Copropriétés", "secteur-copropriete", "Syndics, gestionnaires et conseils syndicaux", "Immeuble d'habitation récent avec balcons vitrés reflétant le ciel"],
  ["Collectivités", "secteur-collectivites", "Communes, intercommunalités et bâtiments publics", "Bâtiment administratif public de plusieurs niveaux en façade claire"],
  ["Logistique", "secteur-logistique", "Plateformes, quais et bâtiments d'exploitation", "Quais de chargement d'une plateforme logistique"],
  ["Particuliers", "secteur-particuliers", "Maisons, vérandas et grandes surfaces vitrées", "Maison contemporaine dotée de grandes baies vitrées et d'une véranda"],
];

export function grilleSecteurs({ dark = false, titre = "Des bâtiments très différents, une même exigence." } = {}) {
  return `
<section class="sec ${dark ? "sec--dark" : ""}" aria-labelledby="sect-t">
  <div class="wrap">
    <div class="shead rv">
      <div>
        <p class="eyebrow">Secteurs d'activité</p>
        <h2 id="sect-t">${esc(titre)}</h2>
      </div>
      <div class="shead__aside">
        <p class="lead" style="font-size:var(--t-body)">Nous intervenons pour des donneurs d'ordre privés comme publics. Les contraintes diffèrent — accès, horaires, public présent, exploitation continue — et la méthode s'y adapte.</p>
        ${tlink("Détail par secteur", "/secteurs-dactivite/")}
      </div>
    </div>
    <ul class="sect rv">
      ${secteurs.map(([nom, im, sous, alt]) => `
      <li>
        ${img(im, alt, { sizes: "(max-width:619px) 100vw, (max-width:999px) 50vw, 33vw" })}
        <a href="/secteurs-dactivite/#${nom.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z]+/g, "-")}">
          <p>${esc(sous)}</p>
          <h3>${esc(nom)}</h3>
        </a>
      </li>`).join("")}
    </ul>
  </div>
</section>`;
}
export { secteurs };

/* ---------- Teaser zones d'intervention + carte ---------- */
export function blocZones({ full = false } = {}) {
  return `
<section class="sec sec--dark" aria-labelledby="zones-t" id="zones">
  <div class="wrap">
    <div class="shead rv">
      <div>
        <p class="eyebrow">Zones d'intervention</p>
        <h2 id="zones-t">Basés en Normandie.<br>Mobiles dans toute la France selon les projets.</h2>
      </div>
      ${full ? "" : `<div class="shead__aside">${tlink("Voir le détail des zones", "/zones-intervention/")}</div>`}
    </div>
    <div class="zones">
      <div class="rv-line">${normandieMap}</div>
      <div class="rv">
        <ul class="deps">
          ${zones.map(z => `
          <li>
            <button type="button" data-dep="${z.slug}" aria-describedby="dep-h-${z.slug}">
              <b>${z.code}</b>
              <span><strong>${esc(z.nom)}</strong><em id="dep-h-${z.slug}">${esc(z.villes.slice(0, 3).join(" · "))}</em></span>
              <i aria-hidden="true">→</i>
            </button>
          </li>`).join("")}
        </ul>
        <p class="note" style="margin-top:var(--s-6)">Ces villes sont les pôles que nous desservons, non des agences permanentes.</p>
      </div>
    </div>
  </div>
</section>`;
}

