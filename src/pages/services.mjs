import { btn, tlink, img, esc } from "../layout.mjs";
import { icons, faqBlock, finalCta, processus, blocZones } from "../parts.mjs";
import { prestations, methodes, contact } from "../config.mjs";

const faq = [
  { q: "Pouvez-vous combiner plusieurs méthodes sur un même chantier ?",
    a: ["Oui, c'est fréquent. Une façade peut être traitée à la perche sur ses niveaux bas, en nacelle sur sa partie centrale et sur cordes dans les décrochés. La répartition figure dans le devis, surface par surface."] },
  { q: "Proposez-vous un entretien régulier ?",
    a: ["Oui. Vitrines, bureaux et bâtiments exposés demandent plusieurs passages par an. La fréquence se définit selon l'exposition du bâtiment et votre niveau d'exigence ; un planning annuel permet d'anticiper."] },
  { q: "Intervenez-vous sur les surfaces non vitrées ?",
    a: ["Oui : bardages, panneaux de façade, volets roulants, panneaux publicitaires et panneaux solaires. Chaque support est examiné avant intervention — certains revêtements dégradés demandent une autre approche que le nettoyage."] },
  { q: "Nettoyez-vous l'intérieur des vitrages ?",
    a: ["Oui, l'intérieur comme l'extérieur. Pour les grandes hauteurs intérieures — atriums, verrières — la prestation se précise au devis, car elle suppose un accès aux locaux et une coordination avec votre activité."] },
];

const body = `
<section class="phero">
  <div class="phero__media">${img("facade-reflets-band", "Façade de verre courbe d'un bâtiment contemporain reflétant le ciel", { sizes: "100vw", eager: true })}</div>
  <div class="phero__in">
    <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>/</span>Nos prestations</nav>
    <p class="eyebrow">Prestations</p>
    <h1>Ce que nous nettoyons, et comment nous y accédons.</h1>
    <p class="phero__sub">Vitrerie, extérieur du bâtiment et nettoyage spécialisé — avec cinq moyens d'accès, du matériel conventionnel au drone.</p>
    <div class="btn-row" style="margin-top:var(--s-7)">
      ${btn("Demander un devis gratuit", "/contact/", "", true)}
      <a class="btn btn--on-dark btn--lg" href="tel:${contact.phoneHref}">${esc(contact.phoneLabel)}</a>
    </div>
  </div>
</section>

<div class="ticker" aria-hidden="true"><div class="ticker__in">
  <span>Vitres et baies</span><span>Vérandas et verrières</span><span>Velux</span><span>Vitrines</span><span>Façades et bardages</span><span>Volets roulants</span><span>Panneaux publicitaires</span><span>Panneaux solaires</span>
  <span>Vitres et baies</span><span>Vérandas et verrières</span><span>Velux</span><span>Vitrines</span><span>Façades et bardages</span><span>Volets roulants</span><span>Panneaux publicitaires</span><span>Panneaux solaires</span>
</div></div>

<div class="srv">
  <div class="wrap">
    ${prestations.map((p, n) => `
    <article class="srv__it rv" id="${p.slug}">
      <figure class="srv__fig reveal-img">${img(p.im, p.alt, { sizes: "(max-width:899px) 100vw, 42vw" })}</figure>
      <div class="srv__body">
        <p class="eyebrow">0${n + 1} · ${esc(p.court)}</p>
        <h2 style="font-size:var(--t-h3)">${esc(p.titre)}</h2>
        <p>${esc(p.resume)}</p>
        <ul class="srv__list">${p.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
        <div style="margin-top:var(--s-6)">${tlink("Demander un devis pour cette prestation", "/contact/")}</div>
      </div>
    </article>`).join("")}
  </div>
</div>

<section class="sec sec--dark" aria-labelledby="acc-t">
  <div class="wrap">
    <div class="shead rv">
      <div>
        <p class="eyebrow">Moyens d'accès</p>
        <h2 id="acc-t">Cinq façons d'atteindre la surface.</h2>
      </div>
      <div class="shead__aside">
        <p class="lead">La méthode dépend du bâtiment, des surfaces, des conditions d'accès et de la faisabilité technique — jamais de l'équipement dont nous disposons.</p>
      </div>
    </div>
    <ul class="vals" data-stagger>
      ${methodes.map(m => `
      <li class="rv">
        <h3>${m.n} — ${esc(m.nom)}</h3>
        <p>${esc(m.phrase)}</p>
        ${m.slug ? `<div style="margin-top:.4rem">${tlink("Page dédiée", "/" + m.slug + "/")}</div>` : ""}
      </li>`).join("")}
    </ul>
    <p class="note">Le nettoyage par drone n'est pas adapté à tous les bâtiments : l'environnement, la nature du support, l'espace disponible, les conditions météorologiques et la réglementation du survol conditionnent sa mise en œuvre.</p>
  </div>
</section>

${processus()}
${blocZones()}
${faqBlock(faq, { title: "Questions sur nos prestations" })}
${finalCta({ titre: "Décrivez-nous votre bâtiment.", texte: "Devis gratuit, réponse sous 30 minutes selon disponibilité.", cta: "Demander un devis", image: "facade-detail-1-band" })}
`;

export default {
  path: "/services/",
  title: "Vitrerie, façades, nettoyage spécialisé | CleanVitreService",
  description: "Nettoyage de vitres, vérandas, verrières, vitrines, façades, bardages, volets et panneaux solaires. Cinq moyens d'accès, du matériel conventionnel au drone.",
  ogImage: "facade-reflets-band",
  faq,
  body,
  service: { name: "Nettoyage de vitres, façades et surfaces difficiles d'accès", type: "Nettoyage de bâtiments", description: "Nettoyage de vitrages, vérandas, verrières, vitrines, façades, bardages, volets roulants, panneaux publicitaires et panneaux solaires, par matériel conventionnel, perche télescopique, nacelle, travaux sur cordes ou drone." },
};
