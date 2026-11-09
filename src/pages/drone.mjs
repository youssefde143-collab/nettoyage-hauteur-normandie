import { btn, tlink, img } from "../layout.mjs";
import { icons, faqBlock, finalCta, blocZones } from "../parts.mjs";

const faq = [
  { q: "Comment un drone nettoie-t-il une façade ?",
    a: ["L'appareil est équipé d'un système de projection d'eau et d'un dispositif de nettoyage adapté au support. Il est piloté depuis le sol par un opérateur qui le positionne le long de la surface et progresse par passes successives, en contrôlant visuellement le résultat.",
        "Le principe est celui d'un nettoyage sans contact humain avec la façade : personne n'a besoin de se trouver sur le bâtiment pendant l'intervention. L'alimentation en eau se fait depuis le sol."] },
  { q: "Sur quelles surfaces le drone est-il adapté ?",
    a: ["Il donne les meilleurs résultats sur les grandes surfaces vitrées régulières et peu accidentées : murs-rideaux, façades entièrement vitrées, allèges, parties hautes de verrières. Les bardages et panneaux de façade en bon état peuvent également être traités, après vérification du support.",
        "À l'inverse, les géométries très découpées, les encadrements profonds, les angles rentrants et les salissures fortement incrustées sont mieux traités au contact, donc sur cordes. C'est la raison pour laquelle nous combinons parfois les deux méthodes sur un même bâtiment."] },
  { q: "Quelles conditions doivent être réunies pour une intervention par drone ?",
    a: ["Plusieurs familles de conditions entrent en jeu. Côté bâtiment : la nature et l'état du support, la géométrie de la façade, la présence d'éléments fragiles ou d'ouvrants. Côté environnement : l'espace disponible au sol pour l'opérateur et le matériel, le dégagement aérien, la proximité d'autres bâtiments, de la voirie ou de lignes aériennes.",
        "S'y ajoutent les conditions du jour — le vent et la pluie, en particulier — et le cadre réglementaire applicable au survol de la zone concernée. L'ensemble de ces points est vérifié pendant l'étude, avant tout engagement."] },
  { q: "L'intervention est-elle bruyante ou gênante pour les occupants ?",
    a: ["Un drone de cette catégorie produit un bruit perceptible pendant ses passages, comparable à celui d'un équipement de chantier léger. Il reste généralement plus court et plus localisé qu'un chantier d'échafaudage.",
        "L'avantage principal pour les occupants est l'absence d'installation lourde : pas d'échafaudage à monter, emprise au sol réduite, durée de présence limitée sur le site. Les fenêtres doivent en revanche rester fermées pendant les passes, ce qui est signalé en amont."] },
  { q: "Le drone remplace-t-il les travaux sur cordes et la nacelle ?",
    a: ["Non. C'est une méthode supplémentaire, pas une méthode de remplacement. Elle élargit le champ de ce que nous pouvons traiter et, dans les configurations qui s'y prêtent, simplifie l'organisation du chantier.",
        "Un grand nombre de bâtiments continuent à relever des travaux sur cordes ou de la nacelle, soit parce que l'environnement ne permet pas le vol, soit parce que le travail au contact est nécessaire pour obtenir le résultat attendu."] },
  { q: "Peut-on nettoyer par drone un bâtiment en centre-ville ?",
    a: ["Cela dépend entièrement du contexte. Un bâtiment dense, entouré de voirie circulée, de terrasses ou d'autres immeubles proches, laisse peu de dégagement et peut relever d'un cadre réglementaire plus contraignant pour le survol.",
        "Nous examinons ces aspects au cas par cas. Lorsque le drone n'est pas déployable dans de bonnes conditions, les travaux sur cordes constituent généralement la réponse adaptée en milieu urbain dense."] },
];

const body = `
<section class="phero">
  <div class="phero__media">${img("drone-detail-band", "Drone quadrirotor professionnel vu de près", { sizes: "100vw", eager: true })}</div>
  <div class="phero__in">
    <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>/</span><a href="/services/">Nos services</a><span>/</span>Nettoyage par drone</nav>
    <p class="eyebrow">Méthode 01 · Sans contact</p>
    <h1>Nettoyage de vitres et de façades par drone.</h1>
    <p class="phero__sub">Une solution innovante pour intervenir sur certaines surfaces vitrées et façades difficiles d'accès — sans que personne n'ait à se trouver sur le bâtiment.</p>
    <div class="btn-row" style="margin-top:2.2rem">${btn("Demander une étude technique", "/contact/", "", true)}${btn("Comparer les méthodes", "/services/", "btn--on-dark", true)}</div>
  </div>
</section>

<div class="ticker" aria-hidden="true"><div class="ticker__in">
  <span>Sans contact avec la façade</span><span>Pilotage depuis le sol</span><span>Emprise au sol réduite</span><span>Surfaces difficiles d'accès</span><span>Faisabilité étudiée au cas par cas</span>
  <span>Sans contact avec la façade</span><span>Pilotage depuis le sol</span><span>Emprise au sol réduite</span><span>Surfaces difficiles d'accès</span><span>Faisabilité étudiée au cas par cas</span>
</div></div>

<section class="sec" aria-labelledby="d1">
  <div class="wrap">
    <div class="edit edit--7-5 edit--sticky">
      <div class="rv">
        <p class="eyebrow">Principe de fonctionnement</p>
        <h2 id="d1" style="max-width:20ch">L'appareil travaille sur la façade. Les équipes restent au sol.</h2>
        <div class="prose" style="margin-top:1.8rem;max-width:58ch">
          <p class="lead">C'est tout le déplacement qu'opère cette méthode. Au lieu d'amener un opérateur jusqu'à la surface — par échafaudage, nacelle ou corde —, on envoie l'outil et l'on garde l'humain en zone sûre.</p>
          <p>Le drone est équipé d'un dispositif de nettoyage et alimenté en eau depuis le sol. L'opérateur le positionne le long de la façade et progresse par passes successives, en contrôlant le résultat à vue. La surface est traitée sans contact mécanique lourd et sans que le bâtiment ait à supporter de charge d'accès.</p>
          <p><strong>Cette méthode n'invente pas un nettoyage universel.</strong> Elle ajoute une possibilité d'accès là où l'accès conventionnel est long, coûteux ou techniquement délicat à mettre en œuvre.</p>
        </div>
      </div>
      <div class="rv" style="--i:1">
        <figure class="edit__fig reveal-img">${img("drone-detail", "Vue rapprochée d'un drone quadrirotor professionnel", { sizes: "(max-width:899px) 100vw, 40vw" })}<figcaption>Appareil professionnel, piloté à vue depuis le sol</figcaption></figure>
        <figure class="edit__fig reveal-img" style="margin-top:1.4rem">${img("drone-controller", "Mains tenant une radiocommande de drone professionnel", { sizes: "(max-width:899px) 100vw, 40vw" })}<figcaption>Poste de pilotage — l'opérateur reste en zone sûre</figcaption></figure>
      </div>
    </div>
  </div>
</section>

<section class="sec sec--dark" aria-labelledby="d2">
  <div class="wrap">
    <div class="shead rv">
      <div><p class="eyebrow">Applications</p><h2 id="d2">Là où le drone fait la différence.</h2></div>
      <div class="shead__aside"><p class="lead" style="font-size:var(--t-body)">Les configurations ci-dessous sont celles pour lesquelles cette méthode est le plus souvent retenue à l'issue de l'étude.</p></div>
    </div>
    <ul class="vals" data-stagger>
      <li class="rv"><h3>Grandes façades vitrées</h3><p>Murs-rideaux et surfaces vitrées régulières de grande étendue, où la progression par passes est efficace.</p></li>
      <li class="rv"><h3>Immeubles de grande hauteur</h3><p>Parties hautes dont l'accès par moyen conventionnel suppose une installation longue ou coûteuse.</p></li>
      <li class="rv"><h3>Surfaces difficiles d'accès</h3><p>Zones situées au-dessus d'un obstacle au sol, surplombs, décrochés, parties hautes de verrières.</p></li>
      <li class="rv"><h3>Bâtiments industriels</h3><p>Sites de production et entrepôts aux abords dégagés, souvent dotés de grandes surfaces translucides.</p></li>
      <li class="rv"><h3>Bâtiments en activité</h3><p>Sites dont l'exploitation ne peut pas supporter l'immobilisation liée à un chantier d'échafaudage.</p></li>
      <li class="rv"><h3>Interventions répétées</h3><p>Bâtiments nécessitant plusieurs passages par an, où la rapidité d'installation compte à chaque intervention.</p></li>
    </ul>
  </div>
</section>

<section class="show" aria-labelledby="d3">
  <div class="show__bg">${img("facade-detail-1-band", "", { sizes: "100vw", cls: "plx" })}</div>
  <div class="show__in">
    <div class="show__head rv">
      <p class="eyebrow">Avantages</p>
      <h2 id="d3">Ce que cette méthode change<em>concrètement.</em></h2>
    </div>
    <div class="show__body">
      <div class="rv">
        <ul class="spec">
          <li><b>01</b><div><strong>Moins de moyens d'accès lourds</strong><p>Dans les configurations adaptées, le recours à l'échafaudage ou à la plateforme élévatrice peut être réduit, voire évité.</p></div></li>
          <li><b>02</b><div><strong>Accès aux zones délicates</strong><p>Des points difficiles à atteindre autrement deviennent traitables sans installation spécifique.</p></div></li>
          <li><b>03</b><div><strong>Temps d'intervention souvent réduit</strong><p>L'installation est rapide : pas de montage, pas de calage, pas de cheminement à préparer au sol.</p></div></li>
          <li><b>04</b><div><strong>Moins de gêne pour les occupants</strong><p>Emprise au sol limitée, circulation préservée, activité du bâtiment peu perturbée.</p></div></li>
          <li><b>05</b><div><strong>Une approche moderne, assumée</strong><p>Une méthode qui s'inscrit dans l'évolution des métiers du bâtiment et de la maintenance d'enveloppe.</p></div></li>
        </ul>
      </div>
      <div class="rv" style="--i:1">
        <figure class="edit__fig reveal-img">${img("real-12", "Drone professionnel en vol à la lumière dorée du soir", { sizes: "(max-width:959px) 100vw, 46vw" })}</figure>
        <div class="note" style="margin-top:1.6rem">Nous ne communiquons volontairement aucune donnée de performance chiffrée — vitesse, surface traitée par heure, hauteur maximale, modèle d'appareil. Ces valeurs dépendent du bâtiment et du contexte ; les annoncer hors étude n'aurait pas de sens.</div>
      </div>
    </div>
  </div>
</section>

<section class="sec" aria-labelledby="d4">
  <div class="wrap">
    <div class="shead rv">
      <div><p class="eyebrow">Faisabilité technique</p><h2 id="d4">Les limites, dites clairement.</h2></div>
      <div class="shead__aside"><p class="lead" style="font-size:var(--t-body)">Un prestataire qui vous annonce que tout est nettoyable par drone ne vous rend pas service. Voici ce qui conditionne réellement une intervention.</p></div>
    </div>
    <div class="cards cards--2">
      <div class="card rv"><h3>Le bâtiment</h3><p>Nature et état du support, géométrie de la façade, présence d'éléments fragiles, d'ouvrants ou de dispositifs extérieurs. Un support dégradé peut interdire le nettoyage, quelle que soit la méthode.</p></div>
      <div class="card rv" style="--i:1"><h3>L'environnement</h3><p>Espace disponible au sol pour l'opérateur, dégagement aérien, proximité de la voirie, d'autres bâtiments, de lignes aériennes, de zones recevant du public.</p></div>
      <div class="card rv" style="--i:2"><h3>Les conditions du jour</h3><p>Le vent et la pluie sont déterminants. Une intervention peut être reportée pour des raisons météorologiques : c'est une condition de sécurité, pas un aléa d'organisation.</p></div>
      <div class="card rv" style="--i:3"><h3>Le cadre réglementaire</h3><p>Le survol par aéronef télépiloté est encadré. Les règles applicables dépendent de la zone et du contexte ; leur vérification fait partie de la préparation de l'intervention.</p></div>
    </div>
    <div class="cards cards--2" style="margin-top:1.4rem">
      <div class="card rv" style="background:var(--paper)">${icons.shield}<h3>Sécurité et préparation</h3><p>Chaque intervention par drone fait l'objet d'une préparation : repérage du site, définition de la zone de travail au sol, identification des points sensibles, information des occupants lorsque c'est nécessaire.</p><p>Un périmètre est matérialisé au sol pendant les phases de vol. L'opérateur conserve le contrôle visuel de l'appareil tout au long de l'intervention.</p></div>
      <div class="card rv" style="--i:1;background:var(--paper)">${icons.gear}<h3>Et si le drone n'est pas la solution ?</h3><p>Nous le disons, et nous proposons autre chose. C'est l'intérêt de disposer de trois méthodes : l'étude peut conclure aux travaux sur cordes, à la nacelle, ou à une combinaison de méthodes selon les zones du bâtiment.</p><div style="margin-top:.4rem;display:flex;gap:1.4rem;flex-wrap:wrap">${tlink("Travaux sur cordes", "/travaux-sur-cordes/")}${tlink("Nettoyage avec nacelle", "/nettoyage-avec-nacelle/")}</div></div>
    </div>
  </div>
</section>

${blocZones()}
${faqBlock(faq, { title: "Questions sur le nettoyage par drone", eyebrow: "FAQ · Drone" })}
${finalCta({ titre: "Votre bâtiment est-il éligible au nettoyage par drone ?", texte: "Envoyez-nous quelques photographies et l'adresse du bâtiment : nous vous dirons franchement si le drone est la bonne méthode, ou laquelle le serait.", cta: "Demander une étude", image: "real-12-band" })}
`;

export default {
  path: "/nettoyage-par-drone/",
  title: "Nettoyage de façades par drone | [NOM DE L'ENTREPRISE]",
  description: "Nettoyage par drone de façades vitrées et de surfaces difficiles d'accès : principe, applications, avantages et conditions de faisabilité. Normandie et France entière.",
  ogImage: "drone-detail-band",
  faq,
  body,
  service: { name: "Nettoyage de façades par drone", type: "Nettoyage de façades par aéronef télépiloté", description: "Nettoyage sans contact de façades vitrées et de surfaces en hauteur difficiles d'accès au moyen d'un drone professionnel piloté depuis le sol." },
};
