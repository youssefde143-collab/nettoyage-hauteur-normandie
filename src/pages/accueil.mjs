import { btn, tlink, img, esc, arS } from "../layout.mjs";
import { icons, faqBlock, blocZones } from "../parts.mjs";
import { contact, prestations, methodes, clienteles, parrainage } from "../config.mjs";

const faq = [
  { q: "Quelles surfaces nettoyez-vous ?",
    a: ["Vitres et baies, vérandas, verrières et Velux, vitrines commerciales, façades et bardages, volets roulants, panneaux publicitaires, panneaux solaires et photovoltaïques."] },
  { q: "Comment choisissez-vous la méthode d'accès ?",
    a: ["Selon le bâtiment, les surfaces, les conditions d'accès et la faisabilité technique. Du matériel conventionnel à la perche télescopique, jusqu'aux travaux sur cordes et au drone quand la configuration s'y prête."] },
  { q: "Le drone convient-il à tous les bâtiments ?",
    a: ["Non. L'environnement, la nature du support, l'espace disponible, la météo et la réglementation du survol conditionnent sa mise en œuvre. Quand ce n'est pas la bonne méthode, nous le disons et proposons une autre voie d'accès."] },
  { q: "Intervenez-vous loin de Bolbec ?",
    a: ["Dans un rayon d'environ 50 km autour du siège et dans toute la Normandie. Des déplacements ailleurs en France restent possibles selon la nature et l'importance du chantier."] },
  { q: "Le devis est-il payant ?",
    a: ["Non, le devis est gratuit. Nous répondons à votre demande sous 30 minutes, selon disponibilité. Des astreintes sont possibles sur demande."] },
];

const body = `
<!-- Hero ---------------------------------------------------------------- -->
<section class="hero hero--v2" id="hero">
  <div class="hero__media" data-hero-media>
    ${img("hero-facade-verre", "Façade entièrement vitrée d'un immeuble de grande hauteur dans la lumière du matin", { sizes: "100vw", eager: true })}
  </div>
  <div class="hero__grid" aria-hidden="true"></div>
  <div class="hero__in">
    <p class="hero__label">Nettoyage en hauteur · Bolbec &amp; Normandie</p>
    <h1>La hauteur change.<em>Pas nos exigences.</em></h1>
    <p class="hero__sub">Vitres, façades et surfaces difficiles d'accès. La bonne méthode pour chaque bâtiment.</p>
    <div class="hero__act">
      ${btn("Demander un devis gratuit", "/contact/", "", true)}
      <a class="btn btn--on-dark btn--lg" href="tel:${contact.phoneHref}">${esc(contact.phoneLabel)}</a>
    </div>
  </div>
  <p class="hero__cue"><i aria-hidden="true"></i>Faire défiler</p>
</section>

<!-- Engagements ---------------------------------------------------------- -->
<div class="promis">
  <div class="wrap">
    <ul>
      <li><b>Devis gratuit</b><span>Sans engagement</span></li>
      <li><b>Réponse sous 30 minutes</b><span>Selon disponibilité</span></li>
      <li><b>Astreintes possibles</b><span>Sur demande</span></li>
    </ul>
  </div>
</div>

<!-- Prestations ---------------------------------------------------------- -->
<section class="sec" aria-labelledby="pres-t">
  <div class="wrap">
    <div class="shead rv">
      <div>
        <p class="eyebrow">Nos prestations</p>
        <h2 id="pres-t">Ce que nous nettoyons.</h2>
      </div>
      <div class="shead__aside">
        <p class="lead">Du vitrage domestique à la façade industrielle, avec le moyen d'accès adapté à chaque configuration.</p>
      </div>
    </div>
    <div class="trio rv">
      ${prestations.map((p, i) => `
      <article class="trio__it trio__${"abc"[i]}" id="${p.slug}">
        ${img(p.im, p.alt, { sizes: i === 0 ? "(max-width:959px) 100vw, 56vw" : "(max-width:959px) 100vw, 42vw" })}
        <div class="trio__b">
          <span class="idx">${String(i + 1).padStart(2, "0")}</span>
          <h3>${esc(p.titre)}</h3>
          <p>${esc(p.resume)}</p>
          ${tlink("Voir le détail", "/services/#" + p.slug)}
        </div>
      </article>`).join("")}
    </div>
  </div>
</section>

<!-- Méthodes d'accès ------------------------------------------------------ -->
<section class="pick" id="methodes" aria-labelledby="pick-t">
  ${methodes.map((m, i) => `<div class="pick__stage${i === 0 ? " is-on" : ""}" data-stage="${i}" aria-hidden="true">${img(m.im, "", { sizes: "100vw" })}</div>`).join("")}
  <div class="pick__in">
    <p class="eyebrow rv">Quatre moyens d'accès</p>
    <h2 id="pick-t" class="rv" style="max-width:17ch;margin-bottom:var(--s-7)">Chaque bâtiment a ses contraintes.</h2>
    <ul class="pick__list rv" data-pick>
      ${methodes.map((m, i) => {
        const inner = `
          <span class="pick__n">${m.n}</span>
          <span><span class="pick__t">${esc(m.nom)}</span></span>
          <span class="pick__m">${esc(m.court)}</span>
          ${m.slug ? `<span class="pick__go">${arS()}</span>` : `<span class="pick__go pick__go--off" aria-hidden="true"></span>`}`;
        return `<li class="pick__it">${m.slug
          ? `<a href="/${m.slug}/" data-pick-i="${i}">${inner}</a>`
          : `<div class="pick__static" data-pick-i="${i}" tabindex="0">${inner}</div>`}</li>`;
      }).join("")}
    </ul>
    <p class="note rv" style="max-width:62ch">Le drone ne convient pas à tous les bâtiments. La méthode dépend du support, de l'environnement, de l'accès et de la faisabilité technique.</p>
  </div>
</section>

<!-- Clientèles ------------------------------------------------------------ -->
<section class="sec sec--paper" aria-labelledby="cli-t">
  <div class="wrap">
    <div class="shead rv">
      <div>
        <p class="eyebrow">Pour qui</p>
        <h2 id="cli-t">Quatre profils, un même interlocuteur.</h2>
      </div>
      <div class="shead__aside">${tlink("Détail par clientèle", "/secteurs-dactivite/")}</div>
    </div>
    <ul class="quad rv">
      ${clienteles.map((c, i) => `
      <li>
        ${img(c.im, c.alt, { sizes: "(max-width:759px) 100vw, 25vw" })}
        <a href="/secteurs-dactivite/#${c.slug}">
          <span class="quad__n">0${i + 1}</span>
          <h3>${esc(c.nom)}</h3>
          <p>${esc(c.resume)}</p>
        </a>
      </li>`).join("")}
    </ul>
  </div>
</section>

<!-- Moment drone ---------------------------------------------------------- -->
<section class="show" aria-labelledby="show-t">
  <div class="show__bg">${img("facade-detail-1-band", "", { sizes: "100vw", cls: "plx" })}</div>
  <div class="show__in">
    <div class="show__head rv">
      <p class="eyebrow">Technologie drone</p>
      <h2 id="show-t">Le bon accès.<em>Au bon endroit.</em></h2>
      <p class="lead" style="margin-top:var(--s-5)">Sur les façades qui s'y prêtent, l'appareil travaille et les équipes restent au sol.</p>
    </div>
    <div class="show__body">
      <div class="rv">
        <ul class="spec">
          <li><b>01</b><div><strong>Sans contact</strong><p>La surface est traitée à distance, depuis l'extérieur du bâtiment.</p></div></li>
          <li><b>02</b><div><strong>Moins d'accès lourds</strong><p>Échafaudage ou plateforme peuvent être réduits, voire évités.</p></div></li>
          <li><b>03</b><div><strong>Zones délicates</strong><p>Surplombs, décrochés et surfaces au-dessus d'obstacles au sol.</p></div></li>
        </ul>
      </div>
      <div class="rv" style="--i:1">
        <figure class="edit__fig reveal-img">
          ${img("drone-pilote", "Opérateur pilotant un drone professionnel à l'aide de sa radiocommande", { sizes: "(max-width:959px) 100vw, 46vw", cls: "of-bas" })}
          <figcaption>Pilotage depuis le sol</figcaption>
        </figure>
        <div class="btn-row" style="margin-top:var(--s-6)">
          ${btn("Tout savoir sur le drone", "/nettoyage-par-drone/", "btn--on-dark")}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Déroulement ----------------------------------------------------------- -->
<section class="sec sec--dark" aria-labelledby="steps-t">
  <div class="wrap">
    <div class="shead rv">
      <div>
        <p class="eyebrow">Déroulement</p>
        <h2 id="steps-t">Quatre étapes, sans zone d'ombre.</h2>
      </div>
    </div>
    <ol class="steps" data-stagger>
      <li><h3>Votre demande</h3><p>Par téléphone ou via le formulaire. Réponse sous 30 minutes, selon disponibilité.</p></li>
      <li><h3>Étude du bâtiment</h3><p>Surfaces, hauteur, accès, environnement et contraintes du site.</p></li>
      <li><h3>Devis gratuit</h3><p>Méthode retenue, périmètre traité et prix, sans engagement.</p></li>
      <li><h3>Intervention</h3><p>Planifiée selon votre activité, puis contrôlée avant remise.</p></li>
    </ol>
  </div>
</section>

<!-- Approche tarifaire ----------------------------------------------------- -->
<section class="sec" aria-labelledby="tarif-t">
  <div class="wrap">
    <div class="tailor rv">
      <div>
        <p class="eyebrow">Notre approche</p>
        <h2 id="tarif-t">Chaque chantier mérite une approche adaptée.</h2>
        <p class="tailor__p">Chaque bâtiment présente ses propres contraintes. Nous étudions votre demande afin de vous proposer une intervention adaptée à vos surfaces, à leur accessibilité et à vos besoins.</p>
        <p class="tailor__f">Surface, hauteur, accessibilité, état des supports, technique retenue, contraintes du site : ces éléments ne se devinent pas depuis une grille tarifaire. C'est pourquoi nous n'en publions pas.</p>
        <div class="btn-row" style="margin-top:var(--s-6)">
          ${btn("Demander mon devis gratuit", "/contact/", "", true)}
        </div>
      </div>
      <ul class="tailor__l">
        <li><i aria-hidden="true"></i><div>Devis gratuit et personnalisé<span>Sans engagement, établi après étude de votre demande.</span></div></li>
        <li><i aria-hidden="true"></i><div>Étude de chaque projet<span>Surfaces, hauteur, accès et contraintes d'exploitation du site.</span></div></li>
        <li><i aria-hidden="true"></i><div>Solution adaptée à vos contraintes<span>La méthode d'accès découle du bâtiment, jamais l'inverse.</span></div></li>
      </ul>
    </div>
  </div>
</section>

${blocZones()}

<!-- Visuels ---------------------------------------------------------------- -->
<section class="sec" aria-labelledby="gal-t">
  <div class="wrap">
    <div class="shead rv">
      <div>
        <p class="eyebrow">En images</p>
        <h2 id="gal-t">Le travail en hauteur, de près.</h2>
      </div>
      <div class="shead__aside">${tlink("Voir la galerie complète", "/realisations/")}</div>
    </div>
    <div class="mosaic rv">
      <figure>${img("real-01", "Laveur de vitres descendant en rappel le long d'une façade vitrée", { sizes: "(max-width:899px) 50vw, 50vw" })}<figcaption>Travaux sur cordes</figcaption></figure>
      <figure>${img("vitre-nettoyage", "Intervenants nettoyant les vitrages d'un bâtiment moderne en verre", { sizes: "(max-width:899px) 50vw, 50vw" })}<figcaption>Vitrages en hauteur</figcaption></figure>
      <figure>${img("real-12", "Drone professionnel en vol à la lumière dorée du soir", { sizes: "(max-width:899px) 50vw, 34vw" })}<figcaption>Drone</figcaption></figure>
      <figure>${img("verre-gouttes", "Surface vitrée couverte de gouttes d'eau après rinçage", { sizes: "(max-width:899px) 50vw, 17vw" })}<figcaption>Vitrerie</figcaption></figure>
      <figure>${img("facade-detail-3", "Gratte-ciel contemporain à façade de verre en gradins", { sizes: "(max-width:899px) 50vw, 34vw" })}<figcaption>Façades vitrées</figcaption></figure>
      <figure>${img("cordes-equipe", "Laveurs de vitres au travail sur un immeuble de grande hauteur", { sizes: "(max-width:899px) 50vw, 66vw" })}<figcaption>Travail au contact</figcaption></figure>
    </div>
    <p class="note">Ces visuels illustrent les méthodes et les surfaces que nous traitons. Ils ne documentent pas de chantiers déjà réalisés par l'entreprise.</p>
  </div>
</section>

<!-- Parrainage -------------------------------------------------------------- -->
<section class="sec sec--dark" id="parrainage" aria-labelledby="par-t">
  <div class="wrap">
    <div class="refer rv">
      <div class="refer__n">
        <p class="refer__v" aria-hidden="true"><span class="refer__num">${parrainage.reduction}</span><span class="refer__pc">%</span></p>
        <span class="refer__leg">de réduction pour la personne recommandée, sur sa première intervention</span>
      </div>
      <div class="refer__b">
        <p class="eyebrow">Parrainage</p>
        <h2 id="par-t">Le bouche-à-oreille récompensé.</h2>
        <p class="lead">Vous connaissez quelqu'un qui a besoin d'un nettoyage professionnel ? Recommandez CleanVitreService et faites-lui profiter de ${parrainage.reduction} % de réduction sur sa première intervention.</p>
        <ol class="refer__l">
          <li><b>01</b><span>Déjà client, vous recevez un code de parrainage nominatif.</span></li>
          <li><b>02</b><span>Vous le transmettez à la personne de votre choix.</span></li>
          <li><b>03</b><span>Elle l'indique dans sa demande de devis et bénéficie de ${parrainage.reduction} % sur sa première intervention.</span></li>
        </ol>
        <div class="btn-row">
          ${btn("Découvrir le parrainage", "/parrainage/", "", true)}
        </div>
      </div>
    </div>
  </div>
</section>

${faqBlock(faq, { title: "Questions fréquentes", intro: "" })}

<!-- Conclusion -------------------------------------------------------------- -->
<section class="close" aria-labelledby="close-t">
  <div class="close__bg">${img("facade-reflets-band", "", { sizes: "100vw", cls: "plx" })}</div>
  <div class="close__in rv">
    <p class="eyebrow eyebrow--center">Parlons-en</p>
    <h2 id="close-t">Un bâtiment à traiter en hauteur ?</h2>
    <p>Présentez-nous votre projet. Nous étudierons la méthode adaptée et vous répondrons sous 30 minutes, selon disponibilité.</p>
    <div class="btn-row">
      ${btn("Demander un devis", "/contact/", "", true)}
      <a class="btn btn--on-dark btn--lg" href="tel:${contact.phoneHref}">Nous appeler · ${esc(contact.phoneLabel)}</a>
    </div>
  </div>
</section>
`;

export default {
  path: "/",
  title: "CleanVitreService — Nettoyage de vitres et façades en Normandie",
  description: "Nettoyage de vitres, façades et surfaces difficiles d'accès à Bolbec et dans toute la Normandie. Perche télescopique, travaux sur cordes et drone. Devis gratuit.",
  ogTitle: "CleanVitreService — La hauteur change. Pas nos exigences.",
  ogImage: "hero-facade-verre-band",
  faq,
  intro: true,
  body,
};
