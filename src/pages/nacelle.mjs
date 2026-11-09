import { btn, tlink, img } from "../layout.mjs";
import { icons, faqBlock, finalCta, blocZones } from "../parts.mjs";

const faq = [
  { q: "Qu'est-ce qu'une nacelle élévatrice ?",
    a: ["Le terme désigne une plateforme élévatrice mobile de personnel : un engin qui élève un ou plusieurs opérateurs, ainsi que leur matériel, jusqu'au niveau de travail. Il en existe plusieurs familles — à ciseaux, à bras articulé, à mât vertical, sur porteur — dont les portées et les conditions d'emploi diffèrent.",
        "Pour un chantier de nettoyage, l'intérêt principal est de pouvoir amener l'opérateur et son matériel directement au poste de travail, de façon stable, avec une liberté de mouvement confortable."] },
  { q: "Dans quelles configurations la nacelle est-elle la bonne méthode ?",
    a: ["Elle est souvent la solution la plus rapide et la plus économique sur les bâtiments de faible et moyenne hauteur dont les abords sont dégagés : sites industriels, plateformes logistiques, bâtiments commerciaux, locaux d'activité, établissements scolaires de plain-pied.",
        "Elle est également pertinente lorsque le bâtiment ne dispose pas de points d'ancrage utilisables en toiture, ce qui écarte les travaux sur cordes, et lorsque l'environnement ne permet pas un vol de drone dans de bonnes conditions."] },
  { q: "Quelles sont les limites de cette méthode ?",
    a: ["Elles sont essentiellement liées au sol et à l'espace. La nacelle exige une surface de stationnement, une portance suffisante, un sol stable et un cheminement praticable jusqu'au pied du bâtiment. Un parking en sous-œuvre, une dalle non vérifiée, un terrain meuble ou en pente peuvent l'interdire.",
        "S'y ajoutent la portée de l'engin, qui limite la hauteur et le déport accessibles, et l'encombrement : en centre-ville ou sur un site saturé, le positionnement peut être impossible. La présence d'obstacles au sol — verrières, auvents, toitures basses, plantations — restreint aussi l'approche de la façade."] },
  { q: "Faut-il neutraliser une partie du site pendant l'intervention ?",
    a: ["Oui, c'est généralement nécessaire. L'engin occupe une surface au sol, et une zone de sécurité est matérialisée autour de lui pendant les phases de travail. Cela peut concerner quelques places de stationnement, une portion de voie de circulation interne ou un accès piéton.",
        "Ces besoins sont identifiés lors de l'étude et planifiés avec vous. Lorsque l'activité du site le justifie, l'intervention peut être programmée en dehors des heures d'ouverture."] },
  { q: "La nacelle peut-elle être utilisée sur la voie publique ?",
    a: ["Cela dépend de la commune et de la configuration. L'occupation temporaire du domaine public, le stationnement d'un engin et la neutralisation d'une portion de voirie relèvent d'autorisations délivrées par la collectivité, à solliciter en amont.",
        "Lorsque ces démarches s'avèrent longues, incertaines ou incompatibles avec votre calendrier, les travaux sur cordes constituent souvent une alternative plus simple à mettre en œuvre."] },
];

const body = `
<section class="phero">
  <div class="phero__media">${img("nacelle-hero-band", "Nacelle élévatrice à bras articulé avec sa plateforme de travail", { sizes: "100vw", eager: true })}</div>
  <div class="phero__in">
    <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>/</span><a href="/services/">Nos services</a><span>/</span>Nettoyage avec nacelle</nav>
    <p class="eyebrow">Méthode 03 · Depuis le sol</p>
    <h1>Nettoyage avec nacelle élévatrice.</h1>
    <p class="phero__sub">Une solution adaptée aux configurations permettant un accès par plateforme élévatrice : sol porteur, abords dégagés, hauteur compatible avec la portée de l'engin.</p>
    <div class="btn-row" style="margin-top:2.2rem">${btn("Demander un devis", "/contact/", "", true)}${btn("Comparer les méthodes", "/services/", "btn--on-dark", true)}</div>
  </div>
</section>

<div class="ticker" aria-hidden="true"><div class="ticker__in">
  <span>Plateforme élévatrice mobile de personnel</span><span>Bâtiments de faible et moyenne hauteur</span><span>Sites industriels et logistiques</span><span>Matériel au poste de travail</span>
  <span>Plateforme élévatrice mobile de personnel</span><span>Bâtiments de faible et moyenne hauteur</span><span>Sites industriels et logistiques</span><span>Matériel au poste de travail</span>
</div></div>

<section class="sec" aria-labelledby="n1">
  <div class="wrap">
    <div class="edit edit--7-5 edit--sticky">
      <div class="rv">
        <p class="eyebrow">Principe</p>
        <h2 id="n1" style="max-width:21ch">Amener l'opérateur et son matériel au bon niveau.</h2>
        <div class="prose" style="margin-top:1.8rem;max-width:58ch">
          <p class="lead">C'est la méthode la plus directe, et souvent la plus efficace lorsque le site s'y prête. La plateforme élève le technicien jusqu'à la surface à traiter, avec son matériel, et lui offre une position de travail stable et confortable.</p>
          <p>L'avantage est double : la liberté de mouvement sur la plateforme permet de travailler vite sur de grandes surfaces continues, et la possibilité d'emporter l'équipement au poste de travail évite les allers-retours qui ralentissent d'autres méthodes.</p>
          <p>Cette méthode convient particulièrement aux <strong>bâtiments de faible et moyenne hauteur disposant d'abords dégagés</strong> : sites industriels, plateformes logistiques, locaux d'activité, bâtiments commerciaux et équipements publics de plain-pied.</p>
        </div>
      </div>
      <div class="rv" style="--i:1">
        <figure class="edit__fig reveal-img">${img("nacelle-operateur", "Panier de nacelle élévatrice déployé contre le ciel", { sizes: "(max-width:899px) 100vw, 40vw" })}<figcaption>Poste de travail stable au niveau de la surface</figcaption></figure>
        <figure class="edit__fig reveal-img" style="margin-top:1.4rem">${img("nacelle-ciel", "Nacelle élévatrice orange déployée vers un ciel dégagé", { sizes: "(max-width:899px) 100vw, 40vw" })}<figcaption>Portée et déport déterminent la hauteur accessible</figcaption></figure>
      </div>
    </div>
  </div>
</section>

<section class="sec sec--dark" aria-labelledby="n2">
  <div class="wrap">
    <div class="shead rv">
      <div><p class="eyebrow">Avantages et limites</p><h2 id="n2">Les deux faces de la méthode.</h2></div>
      <div class="shead__aside"><p class="lead" style="font-size:var(--t-body)">Présenter les limites d'une méthode fait partie du conseil. Voici celles de la nacelle, sans détour.</p></div>
    </div>
    <div class="cards cards--2">
      <div class="card rv">
        <h3>Ce que la nacelle apporte</h3>
        <ul>
          <li>Rapidité d'exécution sur les grandes surfaces continues</li>
          <li>Position de travail stable, liberté de mouvement</li>
          <li>Matériel transporté directement au poste de travail</li>
          <li>Aucun besoin de points d'ancrage en toiture</li>
          <li>Mise en œuvre simple sur les sites dégagés</li>
          <li>Permet de traiter dans le même mouvement les parties basses</li>
        </ul>
      </div>
      <div class="card rv" style="--i:1">
        <h3>Ce qui peut l'écarter</h3>
        <ul>
          <li>Sol insuffisamment porteur, meuble, en pente ou non vérifié</li>
          <li>Absence de surface de stationnement ou de cheminement</li>
          <li>Hauteur ou déport supérieurs à la portée de l'engin</li>
          <li>Obstacles au sol : verrières, auvents, toitures basses, plantations</li>
          <li>Milieu urbain dense, voirie étroite, site saturé</li>
          <li>Autorisations d'occupation du domaine public longues à obtenir</li>
        </ul>
      </div>
    </div>
    <p class="note">Lorsque l'une de ces conditions n'est pas réunie, l'étude s'orientera vers les ${tlink("travaux sur cordes", "/travaux-sur-cordes/")} ou, selon l'environnement, vers le ${tlink("nettoyage par drone", "/nettoyage-par-drone/")}.</p>
  </div>
</section>

<section class="sec" aria-labelledby="n3">
  <div class="wrap">
    <div class="shead rv">
      <div><p class="eyebrow">Applications</p><h2 id="n3">Les sites où la nacelle s'impose naturellement.</h2></div>
    </div>
    <ul class="vals" data-stagger>
      <li class="rv"><h3>Bâtiments industriels</h3><p>Ateliers, sites de production et bâtiments techniques aux abords larges et au sol généralement porteur.</p></li>
      <li class="rv"><h3>Plateformes logistiques</h3><p>Entrepôts, quais et bâtiments d'exploitation : grandes surfaces continues, circulation aisée pour l'engin.</p></li>
      <li class="rv"><h3>Immobilier commercial</h3><p>Retail parks, concessions, surfaces de vente : façades vitrées étendues avec parkings adjacents.</p></li>
      <li class="rv"><h3>Locaux d'activité</h3><p>Bâtiments de bureaux de faible hauteur, pépinières d'entreprises, zones d'activités.</p></li>
      <li class="rv"><h3>Équipements publics</h3><p>Gymnases, écoles, salles polyvalentes et bâtiments administratifs disposant d'espaces extérieurs.</p></li>
      <li class="rv"><h3>Verrières accessibles</h3><p>Surfaces translucides et couvertures légères approchables depuis une plateforme, sans charge sur le support.</p></li>
    </ul>
    <div class="cards cards--2" style="margin-top:1.6rem">
      <div class="card rv" style="background:var(--paper)">${icons.shield}<h3>Sécurité et conformité</h3><p>L'engin est vérifié avant mise en service, le sol et le cheminement sont contrôlés, une zone de sécurité est matérialisée autour de la plateforme pendant les phases de travail.</p><p style="margin-top:.6rem">Les intervenants sont formés à la conduite en sécurité des plateformes élévatrices mobiles de personnel et au travail en hauteur.</p></div>
      <div class="card rv" style="--i:1;background:var(--paper)">${icons.map}<h3>Autorisations</h3><p>Lorsque l'engin doit être positionné sur le domaine public, une autorisation d'occupation temporaire est nécessaire. Nous identifions ce besoin lors de l'étude et vous indiquons les démarches à engager, ainsi que les délais à prévoir.</p></div>
    </div>
  </div>
</section>

${blocZones()}
${faqBlock(faq, { title: "Questions sur le nettoyage avec nacelle", eyebrow: "FAQ · Nacelle" })}
${finalCta({ titre: "Site industriel, logistique ou commercial ?", texte: "Ce sont les configurations pour lesquelles la nacelle donne généralement les meilleurs résultats. Décrivez-nous votre bâtiment et ses abords.", cta: "Demander un devis", image: "nacelle-hero-band" })}
`;

export default {
  path: "/nettoyage-avec-nacelle/",
  title: "Nettoyage de vitres avec nacelle | [NOM DE L'ENTREPRISE]",
  description: "Nettoyage de vitres et de façades avec nacelle élévatrice : configurations adaptées, bâtiments industriels et commerciaux, avantages et limites de la méthode.",
  ogImage: "nacelle-hero-band",
  faq,
  body,
  service: { name: "Nettoyage de façades avec nacelle élévatrice", type: "Nettoyage par plateforme élévatrice mobile de personnel", description: "Nettoyage de vitres et de façades au moyen d'une plateforme élévatrice mobile de personnel, sur les sites dont le sol et les abords permettent le positionnement d'un engin." },
};
