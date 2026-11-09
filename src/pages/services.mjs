import { btn, tlink, img, esc } from "../layout.mjs";
import { icons, faqBlock, finalCta, matriceMethodes, processus, blocZones } from "../parts.mjs";

const faq = [
  { q: "Pouvez-vous combiner plusieurs méthodes sur un même chantier ?",
    a: ["Oui, et c'est fréquent sur les bâtiments complexes. Une tour peut être traitée au drone sur ses grandes surfaces vitrées régulières, puis reprise sur cordes dans les décrochés, les angles rentrants et les parties basses où la précision du travail au contact est nécessaire.",
        "La répartition entre méthodes fait partie de l'étude et apparaît dans la proposition, surface par surface."] },
  { q: "Proposez-vous des contrats d'entretien récurrents ?",
    a: ["Oui. Beaucoup de bâtiments tertiaires, commerciaux et hôteliers nécessitent plusieurs passages par an pour conserver un aspect satisfaisant, en particulier en zone urbaine ou en bord de mer où l'encrassement est plus rapide.",
        "La fréquence est définie avec vous en fonction de l'exposition du bâtiment, de son usage et de votre niveau d'exigence. Un planning annuel permet d'anticiper les interventions et d'optimiser l'organisation."] },
  { q: "Intervenez-vous aussi sur les surfaces non vitrées ?",
    a: ["Oui, dans la limite de ce que nos méthodes et nos équipements permettent de traiter sans risque pour le support : bardages, panneaux de façade, éléments de couverture translucides, garde-corps, auvents et verrières.",
        "Chaque support est examiné avant intervention. Certains revêtements fragiles, dégradés ou anciens nécessitent des précautions particulières, voire une autre approche que le nettoyage : nous vous le signalons lors de l'étude."] },
  { q: "Intervenez-vous à l'intérieur des bâtiments ?",
    a: ["Notre spécialité est l'intervention en extérieur et en hauteur. Le nettoyage des vitrages par l'intérieur peut être intégré à une prestation lorsque cela a du sens pour le bâtiment — grandes hauteurs intérieures, atriums, verrières —, en complément du traitement extérieur.",
        "Cette partie de la demande est à préciser lors du devis, car elle suppose un accès aux locaux et une coordination avec votre exploitation."] },
];

const body = `
<section class="phero">
  <div class="phero__media">${img("facade-reflets-band", "Façade de verre courbe d'un bâtiment contemporain reflétant le ciel", { sizes: "100vw", eager: true })}</div>
  <div class="phero__in">
    <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>/</span>Nos services</nav>
    <p class="eyebrow">Nos prestations</p>
    <h1>Trois méthodes d'accès. Une seule logique : celle du bâtiment.</h1>
    <p class="phero__sub">Nettoyage de vitres, de façades vitrées, de bardages et de verrières en hauteur. Le drone, les travaux sur cordes et la nacelle ne s'opposent pas : ils couvrent, ensemble, l'essentiel des configurations rencontrées.</p>
    <div class="btn-row" style="margin-top:2.2rem">${btn("Demander un devis", "/contact/", "", true)}${btn("Décrire mon bâtiment", "/contact/#formulaire", "btn--on-dark", true)}</div>
  </div>
</section>

<section class="sec" aria-labelledby="ov-t">
  <div class="wrap">
    <div class="edit edit--7-5">
      <div class="rv">
        <p class="eyebrow">Vue d'ensemble</p>
        <h2 id="ov-t" style="max-width:22ch">Ce que nous nettoyons, et comment nous y accédons.</h2>
        <div class="prose" style="margin-top:1.8rem;max-width:58ch">
          <p class="lead">Notre activité porte sur les surfaces extérieures en hauteur : vitrages, murs-rideaux, façades vitrées, bardages, verrières et éléments de couverture translucides.</p>
          <p>La difficulté d'un chantier de nettoyage en hauteur n'est presque jamais le nettoyage lui-même. C'est l'accès. Comment atteindre la surface, de façon sûre, sans immobiliser le bâtiment et sans endommager le support ? Les trois méthodes présentées ci-dessous répondent chacune à une famille de situations.</p>
          <p><strong>Le choix n'est pas commercial, il est technique.</strong> Nous privilégions la méthode qui convient au bâtiment, et non celle qui nous arrangerait.</p>
        </div>
      </div>
      <div class="rv" style="--i:1">
        <ul class="vals" style="margin-top:0;grid-template-columns:1fr">
          <li><h3>Surfaces traitées</h3><p>Vitrages et murs-rideaux, façades vitrées, bardages, verrières, auvents, garde-corps et éléments translucides.</p></li>
          <li><h3>Hauteurs concernées</h3><p>Du rez-de-chaussée en surplomb jusqu'aux immeubles de grande hauteur, dans la limite de la faisabilité technique établie à l'étude.</p></li>
          <li><h3>Interlocuteurs</h3><p>Entreprises, industriels, bailleurs, syndics, gestionnaires, hôteliers, collectivités et particuliers.</p></li>
        </ul>
      </div>
    </div>
  </div>
</section>

<div class="srv">
  <div class="wrap">
    <article class="srv__it rv" id="drone">
      <figure class="srv__fig reveal-img">${img("methode-drone", "Drone professionnel en vol utilisé pour le nettoyage de surfaces vitrées", { sizes: "(max-width:899px) 100vw, 42vw" })}</figure>
      <div class="srv__body">
        <p class="eyebrow">Méthode 01 · Sans contact</p>
        <h3>Nettoyage par drone</h3>
        <p>L'appareil est piloté depuis le sol et traite la surface à distance. Pertinent sur les grandes façades vitrées régulières, les parties hautes difficiles d'accès et les bâtiments dont les abords sont dégagés.</p>
        <ul class="srv__list">
          <li>Grandes façades vitrées et murs-rideaux</li>
          <li>Surfaces situées au-dessus d'obstacles au sol</li>
          <li>Bâtiments industriels et commerciaux aux abords dégagés</li>
          <li>Emprise au sol réduite, installation rapide</li>
        </ul>
        <p style="margin-top:1.2rem;font-size:var(--t-small)"><strong>À savoir :</strong> la faisabilité dépend de l'environnement du bâtiment, de la nature du support, de l'espace disponible, des conditions météorologiques et du cadre réglementaire applicable au survol.</p>
        ${tlink("Page dédiée : nettoyage par drone", "/nettoyage-par-drone/")}
      </div>
    </article>

    <article class="srv__it rv" id="cordes">
      <figure class="srv__fig reveal-img">${img("cordes-duo", "Deux techniciens cordistes descendant en rappel le long d'un bâtiment moderne en verre", { sizes: "(max-width:899px) 100vw, 42vw" })}</figure>
      <div class="srv__body">
        <p class="eyebrow">Méthode 02 · Au contact</p>
        <h3>Travaux sur cordes</h3>
        <p>Des techniciens formés au travail en hauteur descendent le long de la façade depuis des points d'ancrage. La méthode la plus souple face aux géométries complexes et la plus précise sur les salissures incrustées.</p>
        <ul class="srv__list">
          <li>Façades à géométrie complexe, décrochés, surplombs</li>
          <li>Centres urbains où l'accès au sol est contraint</li>
          <li>Traitement précis des encadrements et détails</li>
          <li>Aucune emprise au sol significative</li>
        </ul>
        <p style="margin-top:1.2rem;font-size:var(--t-small)"><strong>À savoir :</strong> la méthode suppose des points d'ancrage utilisables ou installables en toiture, vérifiés avant toute intervention.</p>
        ${tlink("Page dédiée : travaux sur cordes", "/travaux-sur-cordes/")}
      </div>
    </article>

    <article class="srv__it rv" id="nacelle">
      <figure class="srv__fig reveal-img">${img("nacelle-ciseaux", "Nacelle élévatrice à ciseaux stationnée devant un bâtiment", { sizes: "(max-width:899px) 100vw, 42vw" })}</figure>
      <div class="srv__body">
        <p class="eyebrow">Méthode 03 · Depuis le sol</p>
        <h3>Nettoyage avec nacelle</h3>
        <p>Une plateforme élévatrice mobile de personnel amène les techniciens au niveau de la surface à traiter. Efficace et rapide lorsque le sol est porteur, stable et suffisamment dégagé.</p>
        <ul class="srv__list">
          <li>Bâtiments de faible et moyenne hauteur</li>
          <li>Sites industriels, logistiques et commerciaux</li>
          <li>Abords dégagés, sol porteur et stable</li>
          <li>Permet de transporter le matériel au poste de travail</li>
        </ul>
        <p style="margin-top:1.2rem;font-size:var(--t-small)"><strong>À savoir :</strong> la nacelle exige un dégagement au sol, une portance suffisante et un cheminement praticable. Ces conditions ne sont pas réunies partout.</p>
        ${tlink("Page dédiée : nettoyage avec nacelle", "/nettoyage-avec-nacelle/")}
      </div>
    </article>
  </div>
</div>

<section class="sec sec--dark" aria-labelledby="mtx-t">
  <div class="wrap">
    <div class="shead rv">
      <div>
        <p class="eyebrow">Choisir la méthode</p>
        <h2 id="mtx-t">Quelle méthode pour quelle configuration ?</h2>
      </div>
      <div class="shead__aside"><p class="lead" style="font-size:var(--t-body)">Ce tableau donne des tendances générales. Il ne remplace pas l'étude du bâtiment, qui seule permet de conclure.</p></div>
    </div>
    ${matriceMethodes()}
    <div class="cards cards--3">
      <div class="card rv">${icons.study}<h3>Étude préalable</h3><p>Analyse de la configuration, des surfaces, des accès et des contraintes d'exploitation avant toute proposition chiffrée.</p></div>
      <div class="card rv" style="--i:1">${icons.layers}<h3>Méthodes combinables</h3><p>Sur un même bâtiment, plusieurs méthodes peuvent être employées selon les zones à traiter.</p></div>
      <div class="card rv" style="--i:2">${icons.clock}<h3>Planification</h3><p>Interventions organisées selon votre activité, y compris en dehors des heures d'ouverture quand c'est préférable.</p></div>
    </div>
  </div>
</section>

${processus()}
${blocZones()}
${faqBlock(faq, { title: "Questions sur nos prestations" })}
${finalCta({ titre: "Décrivez-nous votre bâtiment.", cta: "Demander un devis", image: "facade-detail-1-band" })}
`;

export default {
  path: "/services/",
  title: "Nos services de nettoyage en hauteur | [NOM DE L'ENTREPRISE]",
  description: "Nettoyage de vitres, façades vitrées, bardages et verrières en hauteur : intervention par drone, travaux sur cordes ou nacelle élévatrice, selon la configuration du bâtiment.",
  ogImage: "facade-reflets-band",
  faq,
  body,
  service: { name: "Nettoyage de vitres et de façades en hauteur", type: "Nettoyage de bâtiments", description: "Nettoyage professionnel de surfaces vitrées, façades, bardages et verrières en hauteur par drone, travaux sur cordes ou nacelle élévatrice." },
};
