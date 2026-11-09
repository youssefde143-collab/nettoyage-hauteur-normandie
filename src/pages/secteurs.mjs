import { btn, tlink, img, esc } from "../layout.mjs";
import { faqBlock, finalCta } from "../parts.mjs";
import { clienteles, contact } from "../config.mjs";

const detail = {
  particuliers: ["Une véranda, une verrière, un pignon vitré ou des Velux ne se nettoient pas depuis une échelle. Nous intervenons avec le matériel adapté, de la perche télescopique à la nacelle selon la hauteur.",
    "Pour une simple vitre de plain-pied, notre intervention n'a pas d'intérêt économique et nous le dirons."],
  commercants: ["La vitrine est la première chose que voit le client. Elle se salit vite et cela se remarque immédiatement.",
    "Nous planifions ces interventions en dehors des heures d'affluence — tôt le matin, en soirée ou les jours de fermeture — pour ne gêner ni votre activité ni vos clients."],
  entreprises: ["Bureaux, sites de production, entrepôts et patrimoines gérés : grandes surfaces vitrées, bardages, verrières et lanterneaux, souvent en hauteur et en site occupé.",
    "Pour les gestionnaires et syndics, le devis détaille le périmètre exact des surfaces traitées, la méthode retenue et l'impact sur le stationnement et les accès — de quoi être présenté sans ambiguïté."],
  collectivites: ["Mairies, écoles, gymnases, médiathèques et centres techniques : un patrimoine hétérogène, parfois réparti sur plusieurs sites.",
    "La présence de public, et notamment d'enfants, impose une attention particulière aux périmètres de sécurité et au choix des créneaux — souvent pendant les vacances scolaires."],
};

const faq = [
  { q: "Travaillez-vous avec des donneurs d'ordre publics ?",
    a: ["Oui. Nous répondons aux consultations des communes, intercommunalités et établissements publics, y compris pour des patrimoines comportant plusieurs bâtiments, avec une proposition détaillée bâtiment par bâtiment."] },
  { q: "Pouvez-vous intervenir sur plusieurs sites ?",
    a: ["Oui. Lorsqu'un donneur d'ordre gère plusieurs implantations, nous construisons un planning d'ensemble et une proposition homogène, tout en adaptant la méthode à chaque bâtiment."] },
  { q: "Intervenez-vous en présence de public ?",
    a: ["Oui, c'est le cas sur une grande partie des chantiers : commerces, bâtiments administratifs, établissements scolaires. Cela impose des périmètres de sécurité au sol et, souvent, des créneaux décalés."] },
];

const body = `
<section class="phero phero--flat">
  <div class="phero__media">${img("facade-detail-1-band", "Photographie architecturale de bâtiments de verre", { sizes: "100vw", eager: true })}</div>
  <div class="phero__in">
    <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>/</span>Pour qui nous intervenons</nav>
    <p class="eyebrow">Clientèles</p>
    <h1>Quatre profils, des contraintes très différentes.</h1>
    <p class="phero__sub">Un particulier, un commerçant, un gestionnaire de patrimoine et une collectivité n'attendent ni le même devis, ni le même créneau.</p>
    <div class="btn-row" style="margin-top:var(--s-7)">${btn("Demander un devis gratuit", "/contact/", "", true)}</div>
  </div>
</section>

<nav class="sec sec--paper" style="padding-block:var(--s-6)" aria-label="Accès rapide par clientèle">
  <div class="wrap">
    <div class="filters" style="margin-bottom:0">
      ${clienteles.map(c => `<a class="btn btn--ghost" style="padding:.56rem 1.05rem;font-size:var(--t-small);border-radius:100px" href="#${c.slug}">${esc(c.nom)}</a>`).join("")}
    </div>
  </div>
</nav>

<div class="srv">
  <div class="wrap">
    ${clienteles.map((c, n) => `
    <article class="srv__it rv" id="${c.slug}">
      <figure class="srv__fig reveal-img">${img(c.im, c.alt, { sizes: "(max-width:899px) 100vw, 42vw" })}</figure>
      <div class="srv__body">
        <p class="eyebrow">0${n + 1}</p>
        <h2 style="font-size:var(--t-h3)">${esc(c.nom)}</h2>
        ${detail[c.slug].map(p => `<p>${esc(p)}</p>`).join("")}
        <ul class="srv__list">${c.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
        <div style="margin-top:var(--s-6)">${tlink("Demander un devis", "/contact/")}</div>
      </div>
    </article>`).join("")}
  </div>
</div>

${faqBlock(faq, { title: "Questions des donneurs d'ordre", eyebrow: "FAQ · Clientèles" })}
${finalCta({ titre: "Votre situation n'entre dans aucune case ?", texte: "Ce qui compte, c'est la configuration du bâtiment, pas la catégorie du client. Décrivez-nous le vôtre.", cta: "Parler de votre projet", image: "real-14-band" })}
`;

export default {
  path: "/secteurs-dactivite/",
  title: "Particuliers, pros, entreprises, collectivités | CleanVitreService",
  description: "Nettoyage de vitres et de façades pour les particuliers, les commerçants, les entreprises et les collectivités, à Bolbec et dans toute la Normandie.",
  ogImage: "facade-detail-1-band",
  faq,
  body,
};
