import { btn, tlink, img, esc, arS } from "../layout.mjs";
import { icons, faqBlock, blocZones } from "../parts.mjs";
import { contact } from "../config.mjs";

/* FAQ volontairement réduite à quatre questions.
   Les autres ont été déplacées vers les pages qui les traitent en détail
   (drone, cordes, nacelle, zones, contact) plutôt que dupliquées ici. */
const faq = [
  { q: "Quels bâtiments pouvez-vous traiter ?",
    a: ["Bureaux, sites industriels, commerces, hôtels, copropriétés, bâtiments publics et maisons à grandes surfaces vitrées. Ce qui décide n'est pas la catégorie du bâtiment mais sa configuration : hauteur, surfaces, accès et environnement."] },
  { q: "Drone ou travaux sur cordes : quelle différence ?",
    a: ["Le drone traite la façade à distance, piloté depuis le sol, sans que personne ne se trouve sur le bâtiment. Les cordes permettent un travail au contact, plus précis sur les salissures incrustées et les géométries complexes.",
        "Les deux sont complémentaires. Sur certains chantiers, nous les combinons."] },
  { q: "Faut-il interrompre l'activité du bâtiment ?",
    a: ["Dans la grande majorité des cas, non. Certaines phases demandent de neutraliser une zone au sol ou de garder les fenêtres fermées ; c'est planifié avec vous, au besoin en dehors des heures d'ouverture."] },
  { q: "Le drone convient-il à tous les bâtiments ?",
    a: ["Non. L'environnement, la nature du support, l'espace disponible, la météo du jour et la réglementation du survol conditionnent sa mise en œuvre. Quand ce n'est pas la bonne méthode, nous le disons et proposons les cordes ou la nacelle."] },
];

/* Les trois méthodes : une donnée, trois usages (sélecteur, trio, FAQ). */
const methodes = [
  { n: "01", slug: "nettoyage-par-drone", nom: "Nettoyage par drone",
    court: "Sans contact, depuis le sol",
    phrase: "Une solution innovante pour les surfaces vitrées et les façades difficiles d'accès.",
    im: "methode-drone", alt: "Drone professionnel en vol utilisé pour le nettoyage de surfaces vitrées en hauteur",
    stage: "facade-detail-2-band", ico: "drone" },
  { n: "02", slug: "travaux-sur-cordes", nom: "Travaux sur cordes",
    court: "Accès technique au contact",
    phrase: "Des interventions réalisées par des professionnels formés au travail en hauteur.",
    im: "methode-cordes", alt: "Techniciens cordistes suspendus le long d'un immeuble pour le nettoyage de la façade",
    stage: "cordes-duo-band", ico: "cordes" },
  { n: "03", slug: "nettoyage-avec-nacelle", nom: "Nettoyage avec nacelle",
    court: "Plateforme depuis le sol",
    phrase: "Adapté aux configurations permettant l'accès par plateforme élévatrice.",
    im: "methode-nacelle", alt: "Plateformes élévatrices mobiles de personnel déployées en hauteur",
    stage: "nacelle-hero-band", ico: "nacelle" },
];

const secteurs = [
  ["Industrie et logistique", "secteur-industrie", "Bâtiment industriel de grande emprise sous un ciel dégagé"],
  ["Bureaux", "secteur-bureaux", "Immeuble de bureaux contemporain à façade entièrement vitrée"],
  ["Centres commerciaux", "secteur-commerce", "Entrée vitrée d'un bâtiment commercial contemporain"],
  ["Hôtellerie", "secteur-hotellerie", "Façade d'un établissement hôtelier comportant de nombreuses fenêtres"],
  ["Copropriétés", "secteur-copropriete", "Immeuble d'habitation récent avec balcons vitrés"],
  ["Bâtiments publics", "secteur-collectivites", "Bâtiment administratif public de plusieurs niveaux"],
  ["Plateformes logistiques", "secteur-logistique", "Quais de chargement d'une plateforme logistique"],
  ["Particuliers", "secteur-particuliers", "Maison contemporaine dotée de grandes baies vitrées et d'une véranda"],
];

const body = `
<!-- A · Hero ----------------------------------------------------------- -->
<section class="hero hero--v2" id="hero">
  <div class="hero__media" data-hero-media>
    ${img("hero-facade-verre", "Façade entièrement vitrée d'un immeuble de grande hauteur dans la lumière du matin", { sizes: "100vw", eager: true })}
  </div>
  <div class="hero__grid" aria-hidden="true"></div>
  <div class="hero__in">
    <p class="hero__label">Nettoyage en hauteur · Normandie &amp; France</p>
    <h1>La hauteur change.<em>Pas nos exigences.</em></h1>
    <p class="hero__sub">Drone, cordes ou nacelle. La bonne méthode pour chaque façade.</p>
    <div class="hero__act">
      ${btn("Étudier mon projet", "/contact/", "", true)}
      ${btn("Découvrir nos méthodes", "#methodes", "btn--on-dark", true)}
    </div>
  </div>
  <p class="hero__cue"><i aria-hidden="true"></i>Faire défiler</p>
</section>

<!-- B · Sélecteur de méthodes ------------------------------------------ -->
<section class="pick" id="methodes" aria-labelledby="pick-t">
  ${methodes.map((m, i) => `<div class="pick__stage${i === 0 ? " is-on" : ""}" data-stage="${i}" aria-hidden="true">${img(m.stage, "", { sizes: "100vw" })}</div>`).join("")}
  <div class="pick__in">
    <h2 id="pick-t" class="vh">Nos trois méthodes d'intervention</h2>
    <p class="eyebrow rv">Trois méthodes, une seule logique</p>
    <ul class="pick__list rv" data-pick>
      ${methodes.map((m, i) => `
      <li class="pick__it">
        <a href="/${m.slug}/" data-pick-i="${i}">
          <span class="pick__n">${m.n}</span>
          <span><span class="pick__t">${esc(m.nom)}</span></span>
          <span class="pick__m">${esc(m.court)}</span>
          <span class="pick__go">${arS()}</span>
        </a>
      </li>`).join("")}
    </ul>
  </div>
</section>

<!-- C · Le bon moyen d'accès ------------------------------------------- -->
<section class="sec" aria-labelledby="trio-t">
  <div class="wrap">
    <div class="shead rv">
      <div>
        <p class="eyebrow">Choisir l'accès</p>
        <h2 id="trio-t">Chaque bâtiment a ses contraintes.</h2>
      </div>
      <div class="shead__aside">
        <p class="lead">Nous choisissons le moyen d'accès selon la façade, l'environnement et les conditions d'intervention.</p>
      </div>
    </div>
    <div class="trio rv">
      ${methodes.map((m, i) => `
      <article class="trio__it trio__${"abc"[i]}">
        ${img(m.im, m.alt, { sizes: i === 0 ? "(max-width:959px) 100vw, 56vw" : "(max-width:959px) 100vw, 42vw" })}
        <div class="trio__b">
          <span class="idx">${m.n}</span>
          <h3>${esc(m.nom)}</h3>
          <p>${esc(m.phrase)}</p>
          ${tlink("En savoir plus", `/${m.slug}/`)}
        </div>
      </article>`).join("")}
    </div>
  </div>
</section>

<!-- D · Moment drone ---------------------------------------------------- -->
<section class="show" aria-labelledby="show-t">
  <div class="show__bg">${img("facade-detail-1-band", "", { sizes: "100vw", cls: "plx" })}</div>
  <div class="show__in">
    <div class="show__head rv">
      <p class="eyebrow">Technologie drone</p>
      <h2 id="show-t">Le bon accès.<em>Au bon endroit.</em></h2>
      <p class="lead" style="margin-top:var(--s-5)">L'appareil travaille sur la façade. Les équipes restent au sol.</p>
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

<!-- E · Cordes et nacelle ----------------------------------------------- -->
<section class="sec" aria-labelledby="duo-t">
  <div class="wrap">
    <div class="shead rv">
      <div>
        <p class="eyebrow">Au contact, ou depuis le sol</p>
        <h2 id="duo-t">Là où le drone s'arrête, d'autres méthodes prennent le relais.</h2>
      </div>
    </div>
    <div class="edit edit--7-5">
      <div class="rv">
        <figure class="edit__fig reveal-img">
          ${img("cordes-duo", "Deux techniciens cordistes descendant en rappel la façade vitrée d'une tour", { sizes: "(max-width:899px) 100vw, 56vw" })}
        </figure>
        <h3 style="margin-top:var(--s-5);font-size:var(--t-h3)">Travaux sur cordes</h3>
        <p class="prose" style="margin-top:.6rem;color:var(--c-prose)">La corde suit la façade là où un bras de nacelle est limité : décrochés, surplombs, centres urbains saturés.</p>
        <div style="margin-top:var(--s-4)">${tlink("Travaux sur cordes", "/travaux-sur-cordes/")}</div>
      </div>
      <div class="rv" style="--i:1">
        <figure class="edit__fig reveal-img">
          ${img("nacelle-operateur", "Panier de nacelle élévatrice déployé contre le ciel", { sizes: "(max-width:899px) 100vw, 40vw" })}
        </figure>
        <h3 style="margin-top:var(--s-5);font-size:var(--t-h3)">Nacelle élévatrice</h3>
        <p class="prose" style="margin-top:.6rem;color:var(--c-prose)">La plus directe quand le sol est porteur et les abords dégagés : sites industriels, logistiques et commerciaux.</p>
        <div style="margin-top:var(--s-4)">${tlink("Nettoyage avec nacelle", "/nettoyage-avec-nacelle/")}</div>
      </div>
    </div>
  </div>
</section>

<!-- F · Secteurs --------------------------------------------------------- -->
<section class="sec sec--paper" aria-labelledby="sect-t">
  <div class="wrap">
    <div class="shead rv">
      <div>
        <p class="eyebrow">Secteurs</p>
        <h2 id="sect-t">Pour qui nous intervenons.</h2>
      </div>
      <div class="shead__aside">${tlink("Détail par secteur", "/secteurs-dactivite/")}</div>
    </div>
    <ul class="tiles rv">
      ${secteurs.map(([nom, im, alt]) => `
      <li>
        ${img(im, alt, { sizes: "(max-width:759px) 50vw, 25vw" })}
        <a href="/secteurs-dactivite/#${nom.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "")}"><h3>${esc(nom)}</h3></a>
      </li>`).join("")}
    </ul>
  </div>
</section>

<!-- G · Déroulement ------------------------------------------------------ -->
<section class="sec sec--dark" aria-labelledby="steps-t">
  <div class="wrap">
    <div class="shead rv">
      <div>
        <p class="eyebrow">Déroulement</p>
        <h2 id="steps-t">Quatre étapes, sans zone d'ombre.</h2>
      </div>
    </div>
    <ol class="steps" data-stagger>
      <li><h3>Votre demande</h3><p>Quelques photographies et l'adresse suffisent à cadrer le besoin.</p></li>
      <li><h3>Étude du bâtiment</h3><p>Surfaces, hauteur, accès, environnement et contraintes d'exploitation.</p></li>
      <li><h3>Choix de la méthode</h3><p>Drone, cordes, nacelle — ou une combinaison, selon les zones.</p></li>
      <li><h3>Intervention</h3><p>Planifiée selon votre activité, puis contrôlée avant remise.</p></li>
    </ol>
  </div>
</section>

<!-- H · Normandie -------------------------------------------------------- -->
${blocZones()}

<!-- I · Visuels ---------------------------------------------------------- -->
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
      <figure>${img("real-10", "Nacelles élévatrices à bras déployées vers le ciel", { sizes: "(max-width:899px) 50vw, 17vw" })}<figcaption>Nacelle</figcaption></figure>
      <figure>${img("facade-detail-3", "Gratte-ciel contemporain à façade de verre en gradins", { sizes: "(max-width:899px) 50vw, 34vw" })}<figcaption>Façades vitrées</figcaption></figure>
      <figure>${img("real-06", "Laveur de vitres sur une plateforme le long d'un bâtiment à hautes colonnes", { sizes: "(max-width:899px) 50vw, 66vw" })}<figcaption>Accès par plateforme</figcaption></figure>
    </div>
    <p class="note">Ces visuels illustrent les méthodes et les surfaces que nous traitons. Ils ne documentent pas de chantiers déjà réalisés par l'entreprise.</p>
  </div>
</section>

<!-- J · FAQ -------------------------------------------------------------- -->
${faqBlock(faq, { title: "Questions fréquentes", intro: "" })}

<!-- K · Conclusion ------------------------------------------------------- -->
<section class="close" aria-labelledby="close-t">
  <div class="close__bg">${img("facade-reflets-band", "", { sizes: "100vw", cls: "plx" })}</div>
  <div class="close__in rv">
    <p class="eyebrow eyebrow--center">Parlons-en</p>
    <h2 id="close-t">Un bâtiment à traiter en hauteur ?</h2>
    <p>Présentez-nous votre projet. Nous étudierons la méthode adaptée.</p>
    <div class="btn-row">
      ${btn("Demander un devis", "/contact/", "", true)}
      ${contact.phoneHref
        ? `<a class="btn btn--on-dark btn--lg" href="tel:${contact.phoneHref}">Nous appeler</a>`
        : `<a class="btn btn--on-dark btn--lg" href="/contact/#formulaire">Nous appeler <span class="ph" style="margin-left:.4rem">${esc(contact.phoneLabel)}</span></a>`}
    </div>
  </div>
</section>
`;

export default {
  path: "/",
  title: "Nettoyage de vitres et façades en hauteur | [NOM DE L'ENTREPRISE]",
  description: "Nettoyage professionnel de vitres et de façades en hauteur : drone, travaux sur cordes et nacelle. La méthode est choisie selon le bâtiment. Normandie et France.",
  ogTitle: "La hauteur change. Pas nos exigences.",
  ogImage: "hero-facade-verre-band",
  faq,
  body,
};
