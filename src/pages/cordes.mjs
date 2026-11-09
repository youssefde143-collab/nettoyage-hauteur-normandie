import { btn, tlink, img } from "../layout.mjs";
import { icons, faqBlock, finalCta, blocZones } from "../parts.mjs";

const faq = [
  { q: "En quoi consistent les travaux sur cordes ?",
    a: ["Il s'agit d'une technique d'accès : le technicien se déplace le long d'une façade au moyen de cordes fixées à des points d'ancrage, généralement situés en toiture ou sur la structure du bâtiment. Il descend progressivement et nettoie la surface au contact, sur toute la largeur accessible depuis son axe de descente.",
        "C'est historiquement la méthode de référence pour les façades que ni la nacelle ni l'échafaudage ne peuvent atteindre dans de bonnes conditions, et elle reste la plus souple face aux formes de bâtiments complexes."] },
  { q: "Quels sont les avantages par rapport à une nacelle ?",
    a: ["L'absence d'emprise au sol est le premier. Un chantier sur cordes ne nécessite ni surface de stationnement pour un engin, ni sol porteur, ni cheminement d'accès : il suffit de pouvoir atteindre la toiture et de disposer d'une zone de sécurité réduite au pied du bâtiment.",
        "Vient ensuite l'adaptabilité. Décrochés, redans, angles rentrants, surplombs, éléments architecturaux saillants : la corde suit la façade là où un bras de nacelle est limité par sa portée et ses angles de travail.",
        "Enfin, le travail au contact permet un traitement plus précis des salissures incrustées, des encadrements, des joints et des détails."] },
  { q: "Quelles qualifications vos intervenants possèdent-ils ?",
    a: ["Les interventions sur cordes sont réalisées par des personnels formés au travail en hauteur et à l'accès par cordes. Cette formation porte sur les techniques de progression, l'utilisation des équipements de protection individuelle, les procédures de sécurité et les situations d'urgence.",
        "Nous ne publions pas sur ce site la liste détaillée des qualifications, numéros d'habilitation ou organismes de formation : ces informations seront communiquées telles qu'elles sont, sur demande et dans le cadre d'une consultation, plutôt qu'affichées de façon approximative."] },
  { q: "Comment la sécurité est-elle assurée ?",
    a: ["La préparation est la partie la plus importante du chantier. Avant toute intervention : vérification des points d'ancrage existants ou définition des dispositifs à mettre en place, contrôle des équipements, repérage des risques propres au site, définition de la zone de sécurité au sol et des accès à neutraliser.",
        "Pendant l'intervention, le travail sur cordes repose sur le principe de la redondance : les dispositifs de progression et de sécurité sont indépendants. Un périmètre est matérialisé au sol sous la zone de travail."] },
  { q: "Faut-il des points d'ancrage sur le bâtiment ?",
    a: ["Oui, c'est la condition première. Certains bâtiments disposent déjà de dispositifs d'ancrage prévus pour la maintenance de façade ; leur présence, leur état et leur conformité sont vérifiés avant utilisation.",
        "En leur absence, d'autres solutions de reprise existent selon la structure et la configuration de la toiture. Cet examen fait partie de l'étude préalable, et il conditionne la faisabilité de la méthode."] },
  { q: "Les occupants doivent-ils quitter les lieux ?",
    a: ["Non, dans la très grande majorité des cas. Le bâtiment reste en activité : c'est précisément l'un des intérêts de cette méthode par rapport à un chantier d'échafaudage.",
        "Il est demandé de garder les fenêtres fermées pendant le passage des techniciens au niveau concerné, et une zone au pied du bâtiment est neutralisée le temps de l'intervention. Ces éléments sont planifiés avec vous et communiqués aux occupants en amont."] },
];

const body = `
<section class="phero">
  <div class="phero__media">${img("cordes-duo-band", "Deux techniciens cordistes descendant en rappel la façade vitrée d'une tour, équipés de raclettes et de seaux", { sizes: "100vw", eager: true })}</div>
  <div class="phero__in">
    <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>/</span><a href="/services/">Nos services</a><span>/</span>Travaux sur cordes</nav>
    <p class="eyebrow">Méthode 02 · Au contact</p>
    <h1>Travaux sur cordes : l'accès technique, là où rien d'autre ne passe.</h1>
    <p class="phero__sub">Des interventions réalisées par des professionnels formés au travail en hauteur, sur les façades que les moyens d'accès conventionnels ne peuvent pas atteindre.</p>
    <div class="btn-row" style="margin-top:2.2rem">${btn("Demander un devis", "/contact/", "", true)}${btn("Comparer les méthodes", "/services/", "btn--on-dark", true)}</div>
  </div>
</section>

<div class="ticker" aria-hidden="true"><div class="ticker__in">
  <span>Aucune emprise au sol</span><span>Géométries complexes</span><span>Travail au contact</span><span>Personnels formés au travail en hauteur</span><span>Milieu urbain dense</span>
  <span>Aucune emprise au sol</span><span>Géométries complexes</span><span>Travail au contact</span><span>Personnels formés au travail en hauteur</span><span>Milieu urbain dense</span>
</div></div>

<section class="sec" aria-labelledby="c1">
  <div class="wrap">
    <div class="edit edit--5-7">
      <div class="rv">
        <figure class="edit__fig reveal-img">${img("cordes-detail", "Technicien nettoyant une grande surface vitrée au contact", { sizes: "(max-width:899px) 100vw, 40vw" })}<figcaption>Le travail au contact permet un traitement précis des détails</figcaption></figure>
      </div>
      <div class="rv" style="--i:1">
        <p class="eyebrow">La technique</p>
        <h2 id="c1" style="max-width:22ch">Suivre la façade, et non l'inverse.</h2>
        <div class="prose" style="margin-top:1.8rem;max-width:58ch">
          <p class="lead">Une nacelle impose sa géométrie au chantier : il lui faut un sol porteur, un dégagement, une portée compatible. Une corde, elle, suit le bâtiment.</p>
          <p>Le technicien descend le long de la façade depuis des points d'ancrage et traite la surface au contact. Il atteint ainsi les décrochés, les redans, les angles rentrants, les surplombs et les éléments architecturaux saillants — autant de configurations où un bras articulé est limité.</p>
          <p>Cette méthode est également celle qui convient le mieux aux <strong>centres urbains denses</strong>, où le stationnement d'un engin de levage est difficile ou impossible, et aux bâtiments dont l'activité ne peut pas supporter l'installation d'un échafaudage.</p>
          <p>Elle offre enfin la meilleure qualité de finition sur les salissures incrustées, les encadrements, les joints et les parties basses de vitrage, parce que l'opérateur voit et touche la surface qu'il traite.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec--dark" aria-labelledby="c2">
  <div class="wrap">
    <div class="shead rv">
      <div><p class="eyebrow">Applications</p><h2 id="c2">Les bâtiments qui relèvent des cordes.</h2></div>
      <div class="shead__aside"><p class="lead" style="font-size:var(--t-body)">Lorsque l'étude conclut à cette méthode, c'est généralement pour l'une des raisons suivantes.</p></div>
    </div>
    <ul class="vals" data-stagger>
      <li class="rv"><h3>Façades à géométrie complexe</h3><p>Décrochés, redans, loggias, surplombs, bandeaux et éléments saillants qui limitent la portée d'une nacelle.</p></li>
      <li class="rv"><h3>Centres-villes contraints</h3><p>Voirie étroite, stationnement impossible, mobilier urbain, terrasses : aucun engin ne peut être positionné.</p></li>
      <li class="rv"><h3>Immeubles de grande hauteur</h3><p>Niveaux hors de portée des plateformes élévatrices, accessibles depuis la toiture.</p></li>
      <li class="rv"><h3>Salissures incrustées</h3><p>Dépôts anciens, traces de calcaire, pollution urbaine : un traitement au contact est nécessaire.</p></li>
      <li class="rv"><h3>Sites en exploitation continue</h3><p>Hôtels, bureaux, établissements de santé et commerces qui ne peuvent pas interrompre leur activité.</p></li>
      <li class="rv"><h3>Zones au-dessus d'obstacles</h3><p>Verrières, auvents, toitures intermédiaires et volumes bas interdisant l'approche par le sol.</p></li>
    </ul>
  </div>
</section>

<section class="sec" aria-labelledby="c3">
  <div class="wrap">
    <div class="shead rv">
      <div><p class="eyebrow">Sécurité et compétences</p><h2 id="c3">Le travail en hauteur ne s'improvise pas.</h2></div>
      <div class="shead__aside"><p class="lead" style="font-size:var(--t-body)">La sécurité d'un chantier sur cordes se construit avant la première descente, pas pendant.</p></div>
    </div>
    <div class="cards cards--3">
      <div class="card rv">${icons.study}<h3>Préparation du chantier</h3><ul><li>Vérification des points d'ancrage existants ou définition des dispositifs à installer</li><li>Repérage des risques propres au site</li><li>Définition de la zone de sécurité au sol</li><li>Identification des accès à neutraliser</li></ul></div>
      <div class="card rv" style="--i:1">${icons.shield}<h3>Pendant l'intervention</h3><ul><li>Dispositifs de progression et de sécurité indépendants</li><li>Contrôle des équipements de protection individuelle</li><li>Périmètre matérialisé sous la zone de travail</li><li>Communication maintenue entre les intervenants</li></ul></div>
      <div class="card rv" style="--i:2">${icons.gear}<h3>Compétences des intervenants</h3><p>Les interventions sont réalisées par des personnels formés au travail en hauteur et à l'accès par cordes.</p><p style="margin-top:.6rem">Le détail des qualifications et des organismes de formation est communiqué sur demande, dans le cadre d'une consultation — plutôt qu'affiché ici de façon approximative.</p></div>
    </div>
  </div>
</section>

<section class="sec sec--paper sec--flush-b" aria-labelledby="c4" style="padding-bottom:0">
  <div class="wrap">
    <div class="shead rv"><div><p class="eyebrow">En images</p><h2 id="c4">L'intervention sur cordes.</h2></div></div>
  </div>
  <div class="wrap">
    <div class="gal rv" data-gal style="padding-bottom:var(--sec-y)">
      <figure>${img("cordes-duo", "Deux cordistes descendant le long d'un bâtiment moderne en verre", { sizes: "(max-width:520px) 100vw, 33vw" })}<figcaption><span>Descente en binôme</span><b>Façade vitrée contemporaine</b></figcaption></figure>
      <figure>${img("cordes-ville", "Intervenants travaillant sur le flanc d'un immeuble de grande hauteur", { sizes: "(max-width:520px) 100vw, 33vw" })}<figcaption><span>Grande hauteur</span><b>Progression depuis la toiture</b></figcaption></figure>
      <figure>${img("cordes-equipe", "Laveurs de vitres au travail sur un immeuble de grande hauteur", { sizes: "(max-width:520px) 100vw, 33vw" })}<figcaption><span>Travail au contact</span><b>Traitement des vitrages</b></figcaption></figure>
    </div>
  </div>
</section>

${blocZones()}
${faqBlock(faq, { title: "Questions sur les travaux sur cordes", eyebrow: "FAQ · Cordes" })}
${finalCta({ titre: "Une façade que personne ne veut nettoyer ?", texte: "Décrochés, grande hauteur, centre-ville saturé : ce sont précisément les configurations pour lesquelles cette méthode existe. Décrivez-nous le bâtiment.", cta: "Demander un devis", image: "cordes-equipe-band" })}
`;

export default {
  path: "/travaux-sur-cordes/",
  title: "Travaux sur cordes : vitres et façades | [NOM DE L'ENTREPRISE]",
  description: "Nettoyage de vitres et de façades par travaux sur cordes : technique d'accès, applications, sécurité et qualifications. Intervention en Normandie et dans toute la France.",
  ogImage: "cordes-duo-band",
  faq,
  body,
  service: { name: "Nettoyage de façades par travaux sur cordes", type: "Travaux d'accès sur cordes", description: "Nettoyage au contact de vitres et de façades en hauteur par techniciens cordistes, sur les bâtiments dont les moyens d'accès conventionnels sont inadaptés." },
};
