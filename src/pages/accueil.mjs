import { btn, tlink, img, esc } from "../layout.mjs";
import { icons, faqBlock, finalCta, matriceMethodes, processus, grilleSecteurs, blocZones } from "../parts.mjs";

const faq = [
  { q: "Quels types de bâtiments pouvez-vous nettoyer ?",
    a: ["Nous intervenons sur des bâtiments tertiaires, industriels, commerciaux, hôteliers, publics et résidentiels : immeubles de bureaux, sièges sociaux, sites de production, entrepôts, centres commerciaux, hôtels, copropriétés, bâtiments administratifs, établissements scolaires, ainsi que des maisons individuelles comportant de grandes surfaces vitrées.",
        "Ce qui détermine notre capacité à intervenir n'est pas la catégorie du bâtiment mais sa configuration : hauteur, type de surface, points d'accès disponibles, environnement immédiat et contraintes d'exploitation. C'est ce que nous examinons lors de l'étude préalable."] },
  { q: "Le nettoyage par drone est-il adapté à tous les bâtiments ?",
    a: ["Non, et il est important de le dire clairement. Le drone est une solution pertinente pour certaines configurations — grandes façades vitrées, surfaces difficiles d'accès, abords dégagés — mais il ne remplace pas les autres méthodes dans tous les cas.",
        "Plusieurs éléments conditionnent la faisabilité : la nature et l'état du support, l'environnement immédiat du bâtiment, l'espace disponible au sol et en l'air, les conditions météorologiques le jour de l'intervention et le cadre réglementaire applicable au survol. Lorsque le drone n'est pas la bonne réponse, nous le disons et proposons les travaux sur cordes ou la nacelle."] },
  { q: "Quelle est la différence entre un nettoyage par drone et un nettoyage sur cordes ?",
    a: ["Le nettoyage par drone s'effectue sans contact humain avec la façade : l'appareil est piloté depuis le sol et traite la surface à distance. Cela limite le recours à des moyens d'accès lourds et réduit souvent l'emprise au sol de l'intervention.",
        "Les travaux sur cordes mobilisent des techniciens formés au travail en hauteur, qui descendent le long de la façade depuis des points d'ancrage. Cette méthode permet un travail au contact, donc un traitement plus précis des salissures incrustées, des encadrements et des détails d'une façade, ainsi qu'une adaptation fine aux géométries complexes.",
        "Les deux approches sont complémentaires plutôt que concurrentes. Sur certains chantiers, nous les combinons."] },
  { q: "Intervenez-vous dans toute la Normandie ?",
    a: ["Oui. La Normandie est notre territoire d'intervention principal et nous couvrons ses cinq départements : le Calvados (14), l'Eure (27), la Manche (50), l'Orne (61) et la Seine-Maritime (76).",
        "Nous desservons notamment les agglomérations de Rouen, du Havre, de Caen, de Cherbourg-en-Cotentin, d'Évreux, d'Alençon, de Dieppe, de Lisieux et de Saint-Lô, sans pour autant disposer d'une agence permanente dans chacune de ces villes."] },
  { q: "Pouvez-vous intervenir ailleurs en France ?",
    a: ["Oui. Nous réalisons des interventions sur l'ensemble du territoire français lorsque le projet le justifie : bâtiment de grande surface, site multi-implantations, besoin récurrent ou configuration nécessitant nos méthodes d'accès.",
        "Pour les projets hors Normandie, les frais de déplacement et l'organisation logistique sont intégrés à l'étude et apparaissent clairement dans la proposition."] },
  { q: "Comment se déroule une demande de devis ?",
    a: ["Vous nous décrivez votre bâtiment via le formulaire de devis, par téléphone ou par e-mail. Nous revenons vers vous pour préciser les points techniques manquants, puis nous étudions la faisabilité des différentes méthodes d'accès.",
        "Selon la complexité, une visite sur site peut être nécessaire avant la remise de la proposition. Celle-ci détaille la méthode retenue, le périmètre des surfaces traitées, les modalités d'intervention et le prix."] },
  { q: "Faut-il prévoir une interruption de l'activité du bâtiment ?",
    a: ["Dans la majorité des cas, non. Nos méthodes d'intervention sont choisies, entre autres, pour limiter la gêne occasionnée aux occupants et à l'exploitation du site.",
        "Certaines phases peuvent néanmoins exiger la neutralisation temporaire d'une zone : une portion de parking pour le positionnement d'une nacelle, un périmètre de sécurité au sol, ou la fermeture ponctuelle d'un accès. Ces besoins sont identifiés lors de l'étude et planifiés avec vous, y compris en dehors des heures d'ouverture lorsque c'est préférable."] },
  { q: "Quels éléments faut-il fournir pour obtenir un devis ?",
    a: ["Les plus utiles sont : l'adresse du bâtiment, sa hauteur ou son nombre de niveaux, le type de surfaces à traiter (vitrages, façade, bardage, verrière), une estimation des surfaces concernées et la fréquence souhaitée.",
        "Quelques photographies de l'extérieur du bâtiment, prises depuis plusieurs angles, font gagner beaucoup de temps : elles permettent d'apprécier les accès, les abords et l'état des surfaces. Le formulaire de devis permet de les joindre directement."] },
];

const body = `
<!-- SECTION 1-2 — Hero cinématographique -->
<section class="hero">
  <div class="hero__media">${img("hero-facade-verre", "Façade entièrement vitrée d'un immeuble de grande hauteur éclairée par la lumière rasante du matin", { sizes: "100vw", eager: true })}</div>
  <div class="hero__grid" aria-hidden="true"></div>
  <div class="hero__in">
    <p class="hero__loc"><i aria-hidden="true"></i>Normandie · Intervention dans toute la France</p>
    <h1>Le nettoyage en hauteur,<em>réinventé.</em></h1>
    <p class="hero__sub">Drone, travaux sur cordes et nacelles : des solutions professionnelles pour le nettoyage de vos vitres et façades, en Normandie et partout en France.</p>
    <div class="hero__act">
      ${btn("Demander un devis", "/contact/", "", true)}
      ${btn("Découvrir nos solutions", "#methodes", "btn--on-dark", true)}
    </div>
    <div class="hero__bar">
      <div><b>Nettoyage par drone</b><span>Sans contact, depuis le sol</span></div>
      <div><b>Travaux sur cordes</b><span>Accès technique au contact</span></div>
      <div><b>Nacelle élévatrice</b><span>Plateforme depuis le sol</span></div>
    </div>
  </div>
  <figure class="hero__inset">
    ${img("hero-drone-operation", "Drone professionnel en vol stationnaire, vu de près contre le ciel", { sizes: "340px" })}
    <figcaption><span>Méthode 01</span><b>Drone</b></figcaption>
  </figure>
  <p class="hero__scroll"><i aria-hidden="true"></i>Faire défiler</p>
</section>

<!-- Bandeau d'annotations techniques -->
<div class="ticker" aria-hidden="true">
  <div class="ticker__in">
    <span>Vitres et façades</span><span>Immeubles de grande hauteur</span><span>Surfaces difficiles d'accès</span>
    <span>Bâtiments industriels</span><span>Verrières et bardages</span><span>Étude préalable systématique</span>
    <span>Vitres et façades</span><span>Immeubles de grande hauteur</span><span>Surfaces difficiles d'accès</span>
    <span>Bâtiments industriels</span><span>Verrières et bardages</span><span>Étude préalable systématique</span>
  </div>
</div>

<!-- SECTION 3 — Positionnement éditorial -->
<section class="sec" aria-labelledby="intro-t">
  <div class="wrap">
    <div class="edit edit--7-5">
      <div class="rv">
        <p class="eyebrow">Notre approche</p>
        <h2 id="intro-t" style="max-width:20ch">Une nouvelle approche des interventions en hauteur.</h2>
        <div class="prose" style="margin-top:1.8rem;max-width:58ch">
          <p class="lead">Aucun bâtiment ne se nettoie comme le précédent. Une tour de bureaux entièrement vitrée, un site industriel aux abords dégagés et un immeuble de centre-ville aux voies étroites n'imposent ni les mêmes accès, ni les mêmes moyens.</p>
          <p>Nous ne partons donc pas d'un équipement pour chercher ensuite où l'employer. Nous partons du bâtiment. Le drone, les travaux sur cordes et la nacelle sont trois réponses à un même problème — atteindre une surface en hauteur, proprement et en sécurité — et c'est la configuration du site qui désigne la bonne.</p>
          <p><strong>Ce choix se fait avant l'intervention</strong>, lors d'une étude qui porte sur la configuration du bâtiment, la nature des surfaces, la hauteur, l'accessibilité, les contraintes techniques et vos propres exigences d'exploitation.</p>
        </div>
        <div class="btn-row" style="margin-top:2.2rem">${tlink("Voir nos trois méthodes en détail", "/services/")}</div>
      </div>
      <div class="rv" style="--i:1">
        <figure class="edit__fig reveal-img">
          ${img("facade-detail-3", "Gratte-ciel contemporain à façade de verre en gradins se détachant sur un ciel dégagé", { sizes: "(max-width:899px) 100vw, 40vw" })}
        </figure>
        <figcaption class="lbl" style="margin-top:.9rem;letter-spacing:.1em">Étude préalable — configuration, surfaces, accès</figcaption>
      </div>
    </div>
    ${matriceMethodes()}
  </div>
</section>

<!-- SECTION 4 — Les trois méthodes -->
<section id="methodes" class="sec sec--flush-b" aria-labelledby="meth-t" style="padding-bottom:0">
  <div class="wrap">
    <div class="shead rv">
      <div>
        <p class="eyebrow">Trois méthodes d'intervention</p>
        <h2 id="meth-t">Le bon accès pour la bonne façade.</h2>
      </div>
      <div class="shead__aside">
        <p class="lead" style="font-size:var(--t-body)">Nos trois méthodes sont complémentaires. Elles sont parfois combinées sur un même chantier, lorsque la géométrie du bâtiment l'impose.</p>
      </div>
    </div>
  </div>
  <ul class="meth">
    <li class="meth__it meth__it--lead rv">
      ${img("methode-drone", "Drone professionnel en vol, utilisé pour le nettoyage de surfaces vitrées en hauteur", { sizes: "(max-width:999px) 100vw, 45vw" })}
      <span class="meth__tag">Méthode 01</span>
      <p class="meth__num">01</p>
      ${icons.drone}
      <h3>Nettoyage par drone</h3>
      <p>Une solution innovante pour intervenir sur certaines surfaces vitrées et façades difficiles d'accès.</p>
      ${tlink("Découvrir le nettoyage par drone", "/nettoyage-par-drone/")}
    </li>
    <li class="meth__it rv" style="--i:1">
      ${img("methode-cordes", "Techniciens cordistes suspendus le long d'un immeuble de grande hauteur pour le nettoyage de la façade", { sizes: "(max-width:999px) 100vw, 28vw" })}
      <span class="meth__tag">Méthode 02</span>
      <p class="meth__num">02</p>
      ${icons.cordes}
      <h3>Travaux sur cordes</h3>
      <p>Des interventions techniques réalisées par des professionnels formés au travail en hauteur.</p>
      ${tlink("Découvrir les travaux sur cordes", "/travaux-sur-cordes/")}
    </li>
    <li class="meth__it rv" style="--i:2">
      ${img("methode-nacelle", "Plateformes élévatrices mobiles de personnel déployées en hauteur contre un ciel dégagé", { sizes: "(max-width:999px) 100vw, 28vw" })}
      <span class="meth__tag">Méthode 03</span>
      <p class="meth__num">03</p>
      ${icons.nacelle}
      <h3>Nettoyage avec nacelle</h3>
      <p>Une solution adaptée aux configurations permettant un accès par plateforme élévatrice.</p>
      ${tlink("Découvrir le nettoyage avec nacelle", "/nettoyage-avec-nacelle/")}
    </li>
  </ul>
</section>

<!-- SECTION 5 — Showcase drone -->
<section class="show" aria-labelledby="show-t">
  <div class="show__bg">${img("facade-detail-2-band", "", { sizes: "100vw", cls: "plx" })}</div>
  <div class="show__in">
    <div class="show__head rv">
      <p class="eyebrow">Technologie drone</p>
      <h2 id="show-t">Prenez de la hauteur.<em>Sans compromis sur l'accès.</em></h2>
      <p class="lead" style="margin-top:1.6rem">Le nettoyage par drone déplace le point d'intervention : l'appareil travaille sur la façade, les équipes restent au sol. Sur les bâtiments dont la configuration s'y prête, cela change l'organisation complète du chantier.</p>
    </div>
    <div class="show__body">
      <div class="rv">
        <ul class="spec">
          <li><b>01</b><div><strong>Intervention sans contact</strong><p>L'appareil traite la surface à distance, depuis l'extérieur du bâtiment, sans que personne n'ait à se trouver sur la façade.</p></div></li>
          <li><b>02</b><div><strong>Moins de moyens d'accès lourds</strong><p>Dans les configurations adaptées, le recours à l'échafaudage ou à la plateforme élévatrice peut être réduit, voire évité.</p></div></li>
          <li><b>03</b><div><strong>Zones difficiles d'accès</strong><p>Surplombs, décrochés, parties hautes de verrières, surfaces situées au-dessus d'obstacles au sol : le drone atteint des points où l'accès conventionnel est complexe.</p></div></li>
          <li><b>04</b><div><strong>Moins de gêne pour le site</strong><p>Emprise au sol réduite, installation plus rapide, perturbation limitée de l'activité et de la circulation autour du bâtiment.</p></div></li>
        </ul>
      </div>
      <div class="rv" style="--i:1">
        <figure class="edit__fig reveal-img">
          ${img("drone-pilote", "Opérateur pilotant un drone professionnel à l'aide de sa radiocommande", { sizes: "(max-width:959px) 100vw, 46vw", cls: "of-bas" })}
          <figcaption>Pilotage depuis le sol — les équipes restent en zone sûre</figcaption>
        </figure>
        <div class="note" style="margin-top:1.6rem">
          Le drone n'est pas une réponse universelle. L'environnement du bâtiment, la nature du support, l'espace disponible, la météo du jour et le cadre réglementaire applicable au survol conditionnent sa mise en œuvre. Lorsqu'il n'est pas la bonne méthode, nous vous le disons.
        </div>
        <div class="btn-row" style="margin-top:1.8rem">
          ${btn("Demander une étude technique", "/contact/")}
          ${btn("Tout savoir sur le drone", "/nettoyage-par-drone/", "btn--on-dark")}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SECTION 6 — Pourquoi nous choisir -->
<section class="sec sec--paper" aria-labelledby="val-t">
  <div class="wrap">
    <div class="shead rv">
      <div>
        <p class="eyebrow">Pourquoi nous confier votre bâtiment</p>
        <h2 id="val-t">Six raisons, et aucune promesse que nous ne pourrions tenir.</h2>
      </div>
      <div class="shead__aside">
        <p class="lead" style="font-size:var(--t-body)">Nous ne communiquons ni chiffres d'activité, ni taux de satisfaction, ni références clients que nous ne pourrions documenter. Ce que nous mettons en avant, ce sont nos moyens et notre méthode.</p>
      </div>
    </div>
    <ul class="vals" data-stagger>
      <li class="rv"><h3>Plusieurs méthodes d'intervention</h3><p>Drone, travaux sur cordes et nacelle. Nous ne sommes pas contraints d'adapter votre bâtiment à un seul équipement.</p></li>
      <li class="rv"><h3>Des solutions adaptées à chaque bâtiment</h3><p>La méthode est choisie après analyse, pas avant. C'est la configuration du site qui décide, pas notre parc matériel.</p></li>
      <li class="rv"><h3>Des équipements professionnels</h3><p>Matériel de nettoyage et moyens d'accès professionnels, mis en œuvre par des personnels formés au travail en hauteur.</p></li>
      <li class="rv"><h3>Une approche technique personnalisée</h3><p>Hauteur, type de vitrage, état des surfaces, abords, exploitation du site : chaque paramètre entre dans la proposition.</p></li>
      <li class="rv"><h3>Normandie et France entière</h3><p>Les cinq départements normands constituent notre territoire principal ; nous intervenons ailleurs en France selon les projets.</p></li>
      <li class="rv"><h3>Une étude préalable de chaque projet</h3><p>Aucune intervention n'est engagée sans que la faisabilité technique et les conditions de sécurité aient été établies.</p></li>
    </ul>
  </div>
</section>

${grilleSecteurs()}

${processus()}

${blocZones()}

<!-- SECTION 10 — Réalisations -->
<section class="sec" aria-labelledby="real-t">
  <div class="wrap">
    <div class="shead rv">
      <div>
        <p class="eyebrow">Capacités d'intervention</p>
        <h2 id="real-t">À quoi ressemble une intervention en hauteur.</h2>
      </div>
      <div class="shead__aside">
        <p class="lead" style="font-size:var(--t-body)">Une sélection de visuels illustrant les méthodes, les supports et les configurations que nous traitons.</p>
        ${tlink("Voir toute la galerie", "/realisations/")}
      </div>
    </div>
    <div class="gal rv" data-gal>
      <figure>${img("real-01", "Laveur de vitres descendant en rappel le long de la façade vitrée d'un immeuble", { sizes: "(max-width:520px) 100vw, 33vw" })}<figcaption><span>Travaux sur cordes</span><b>Façade vitrée en grande hauteur</b></figcaption></figure>
      <figure>${img("real-12", "Drone professionnel en vol à la lumière dorée du soir", { sizes: "(max-width:520px) 100vw, 33vw" })}<figcaption><span>Drone</span><b>Pilotage en conditions dégagées</b></figcaption></figure>
      <figure>${img("real-10", "Ensemble de nacelles élévatrices à bras déployées vers le ciel", { sizes: "(max-width:520px) 100vw, 33vw" })}<figcaption><span>Nacelle</span><b>Plateformes élévatrices de personnel</b></figcaption></figure>
    </div>
    <p class="note">Ces visuels illustrent nos méthodes et les types de surfaces concernées. Ils ne documentent pas des chantiers déjà réalisés par l'entreprise : les photographies de nos propres interventions remplaceront cette sélection dès qu'elles seront disponibles.</p>
  </div>
</section>

${faqBlock(faq, { intro: "Les questions que l'on nous pose le plus souvent avant un premier devis. Si la vôtre n'y figure pas, posez-la directement." })}

${finalCta()}
`;

export default {
  path: "/",
  title: "Nettoyage de vitres et façades en hauteur | [NOM DE L'ENTREPRISE]",
  description: "Nettoyage professionnel de vitres et de façades en hauteur : drone, travaux sur cordes et nacelle. Étude de chaque bâtiment, intervention en Normandie et dans toute la France.",
  ogTitle: "Le nettoyage en hauteur, réinventé — drone, cordes et nacelle en Normandie",
  ogImage: "hero-facade-verre-band",
  faq,
  body,
};
