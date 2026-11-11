import { btn, tlink, img, esc } from "../layout.mjs";
import { finalCta } from "../parts.mjs";

/* Galerie de capacités d'intervention.
   Aucun visuel n'est présenté comme un chantier réalisé par l'entreprise :
   la section est explicitement libellée comme une illustration des méthodes. */
const shots = [
  ["real-01", "cordes vitres hauteur", "Travaux sur cordes", "Descente le long d'une façade vitrée", "Laveur de vitres descendant en rappel le long de la façade vitrée d'un immeuble", true],
  ["real-12", "drone hauteur", "Drone", "Appareil en vol, conditions dégagées", "Drone professionnel en vol à la lumière dorée du soir", false],
  ["cordes-duo", "cordes vitres hauteur", "Travaux sur cordes", "Binôme sur immeuble de verre", "Deux techniciens cordistes descendant le long d'un bâtiment moderne en verre", false],
  ["facade-detail-3", "facades batiments", "Façades", "Mur-rideau en gradins", "Gratte-ciel contemporain à façade de verre en gradins", true],
  ["real-02", "cordes facades hauteur", "Travaux sur cordes", "Façade exposée au climat marin", "Techniciens descendant en rappel la façade d'un bâtiment proche de l'océan", false],
  ["vitre-nettoyage", "vitres cordes", "Vitres", "Nettoyage de vitrages en hauteur", "Intervenants nettoyant les vitrages d'un bâtiment moderne en verre", false],
  ["real-04", "cordes hauteur", "Travaux en hauteur", "Progression depuis la toiture", "Intervenant suspendu par cordes sur le flanc d'un bâtiment", false],
  ["facade-reflets", "facades batiments", "Façades", "Façade courbe et réflexions", "Façade de verre courbe d'un bâtiment contemporain reflétant le ciel", true],
  ["real-11", "drone", "Drone", "Vol stationnaire en approche", "Drone quadrirotor en vol stationnaire", false],
  ["secteur-industrie", "batiments", "Bâtiments professionnels", "Site industriel de grande emprise", "Bâtiment industriel de grande emprise sous un ciel dégagé", false],
  ["real-07", "facades hauteur", "Façades", "Reprise d'une façade depuis un échafaudage", "Intervenants travaillant sur un échafaudage en façade", false],
  ["drone-pilote", "drone", "Drone", "Pilotage depuis le sol", "Opérateur pilotant un drone professionnel à l'aide de sa radiocommande", false],
  ["real-05", "vitres facades", "Vitres", "Traitement d'une façade claire", "Intervenant nettoyant la façade claire d'un bâtiment", false],
  ["secteur-bureaux", "batiments facades", "Bâtiments professionnels", "Immeuble tertiaire entièrement vitré", "Immeuble de bureaux contemporain à façade entièrement vitrée", true],
  ["real-03", "cordes hauteur", "Travaux en hauteur", "Intervention sur structure élevée", "Intervenants suspendus par cordes sur une structure de grande hauteur", false],
  ["facade-detail-4", "facades batiments", "Façades", "Volume vitré sous ciel dégagé", "Bâtiment de verre se détachant sur un ciel bleu", false],
  ["cordes-equipe", "cordes vitres", "Travaux sur cordes", "Travail au contact sur vitrages", "Laveurs de vitres au travail sur un immeuble de grande hauteur", false],
  ["real-13", "facades batiments", "Façades", "Contre-plongée sur mur-rideau", "Vue en contre-plongée d'un immeuble de grande hauteur", false],
  ["verre-gouttes", "vitres", "Vitres", "Détail — surface vitrée après passage de l'eau", "Gouttelettes d'eau sur une surface vitrée", false],
  ["real-08", "cordes hauteur", "Travaux en hauteur", "Descente sur structure de grande dimension", "Intervenant descendant en rappel une grande structure claire", false],
  ["real-15", "facades batiments", "Façades", "Détail de mur-rideau vitré", "Vue rapprochée de la façade vitrée d'un gratte-ciel", false],
  ["secteur-copropriete", "batiments facades", "Bâtiments professionnels", "Copropriété à balcons vitrés", "Immeuble d'habitation récent avec balcons vitrés reflétant le ciel", false],
  ["secteur-hotellerie", "batiments", "Bâtiments professionnels", "Établissement hôtelier", "Façade d'un établissement hôtelier comportant de nombreuses fenêtres", false],
];

const cats = [
  ["tout", "Tout"], ["drone", "Drone"], ["facades", "Façades"], ["vitres", "Vitres"],
  ["hauteur", "Travaux en hauteur"], ["cordes", "Cordes"], ["batiments", "Bâtiments professionnels"],
];

const body = `
<section class="phero phero--flat">
  <div class="phero__media">${img("vitre-grattoir-band", "Intervenant nettoyant les vitres d'un immeuble de grande hauteur", { sizes: "100vw", eager: true })}</div>
  <div class="phero__in">
    <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>/</span>Nos réalisations</nav>
    <p class="eyebrow">Capacités d'intervention</p>
    <h1>Nos méthodes, nos supports, nos configurations.</h1>
    <p class="phero__sub">Une galerie organisée par méthode et par type de surface, destinée à montrer concrètement ce que recouvre le nettoyage technique en hauteur.</p>
  </div>
</section>

<!-- Fiche de chantier : structure prête, contenu à venir ------------------ -->
<section class="sec" aria-labelledby="fiche-t">
  <div class="wrap">
    <div class="shead rv">
      <div>
        <p class="eyebrow">Nos chantiers</p>
        <h2 id="fiche-t">Chaque intervention aura sa fiche.</h2>
      </div>
      <div class="shead__aside">
        <p class="lead">La mise en page est prête. Elle attend les photographies et l'accord des maîtres d'ouvrage, pas une rédaction flatteuse.</p>
      </div>
    </div>
    <article class="proj rv">
      <div class="proj__im">
        <span class="proj__ph"><b>Emplacement réservé</b>Photographie du chantier, prise sur l'intervention. Aucune image d'illustration ne prendra cette place.</span>
      </div>
      <div class="proj__b">
        <p class="eyebrow">Modèle de fiche</p>
        <h3>Ce que chacune présentera.</h3>
        <dl class="proj__d">
          <div><dt>Type de bâtiment</dt><dd class="ph">immeuble, local commercial, maison, équipement public…</dd></div>
          <div><dt>Prestation réalisée</dt><dd class="ph">vitrerie, façade, panneaux solaires…</dd></div>
          <div><dt>Méthode d'accès</dt><dd class="ph">perche télescopique, travaux sur cordes, drone</dd></div>
          <div><dt>Commune</dt><dd class="ph">commune d'intervention</dd></div>
          <div><dt>Description</dt><dd class="ph">quelques lignes : la contrainte rencontrée, la réponse apportée</dd></div>
        </dl>
        <p class="proj__n">Rien ne sera publié qui n'ait été fait. Tant qu'une fiche n'est pas renseignée, elle n'apparaît pas : vous ne verrez jamais ici de chantier inventé ni de photographie d'agence présentée comme la nôtre.</p>
      </div>
    </article>
  </div>
</section>

<!-- Comparateur avant / après --------------------------------------------- -->
<section class="sec sec--navy" aria-labelledby="ba-t">
  <div class="wrap">
    <div class="shead rv">
      <div>
        <p class="eyebrow">Avant / après</p>
        <h2 id="ba-t">Le résultat se regarde, il ne se raconte pas.</h2>
      </div>
      <div class="shead__aside">
        <p class="lead">Faites glisser le curseur. Le comparateur fonctionne à la souris, au doigt et au clavier.</p>
      </div>
    </div>
    <figure class="ba rv" data-ba>
      <div class="ba__st">
        <div class="ba__l ba__l--av"><span>Avant</span><em>photographie à fournir</em></div>
        <div class="ba__l ba__l--ap"><span>Après</span><em>photographie à fournir</em></div>
        <div class="ba__h" aria-hidden="true"><i></i></div>
        <input class="ba__r" type="range" min="0" max="100" value="50" step="0.5" aria-label="Comparer l'avant et l'après">
      </div>
      <figcaption>Le comparateur est en place et opérationnel. Les deux volets restent volontairement neutres : il s'activera avec de véritables paires de photographies, prises au même cadrage avant et après intervention. Monter un « avant/après » à partir de deux images sans rapport serait une mise en scène, pas une preuve.</figcaption>
    </figure>
  </div>
</section>

<section class="sec sec--dark" aria-labelledby="gal-t">
  <div class="wrap">
    <div class="shead rv">
      <div>
        <p class="eyebrow">Galerie</p>
        <h2 id="gal-t">Illustration de nos capacités d'intervention.</h2>
      </div>
      <div class="shead__aside">
        <p class="lead" style="font-size:var(--t-body)">Filtrez par méthode ou par type de surface pour voir les configurations qui ressemblent le plus à votre bâtiment.</p>
      </div>
    </div>

    <div class="note rv" style="margin-top:0;margin-bottom:2.4rem">
      <strong style="color:#fff">Une précision d'honnêteté.</strong> Cette galerie illustre les méthodes, les supports et les
      configurations que nous traitons. Elle ne documente pas des chantiers déjà réalisés par l'entreprise et ne constitue
      donc pas un portfolio de références clients. Les photographies de nos propres interventions remplaceront
      progressivement cette sélection, avec l'accord des maîtres d'ouvrage concernés.
    </div>

    <div class="filters rv" role="group" aria-label="Filtrer la galerie">
      ${cats.map(([k, l], i) => `<button type="button" data-filter="${k}" aria-pressed="${i === 0}">${esc(l)}</button>`).join("")}
    </div>
    <p class="vh" id="gal-live" role="status" aria-live="polite"></p>
    <div class="gal rv" data-gal>
      ${shots.map(([im, cat, tag, titre, alt, tall]) => `
      <figure data-cat="${cat}"${tall ? ' class="is-tall"' : ""}>
        ${img(im, alt, { sizes: "(max-width:520px) 100vw, (max-width:900px) 50vw, 33vw" })}
        <figcaption><span>${esc(tag)}</span><b>${esc(titre)}</b></figcaption>
      </figure>`).join("")}
    </div>
  </div>
</section>

<section class="sec" aria-labelledby="ap-t">
  <div class="wrap">
    <div class="edit edit--7-5">
      <div class="rv">
        <p class="eyebrow">Ce que nous pouvons documenter</p>
        <h2 id="ap-t" style="max-width:22ch">Des références viendront. Nous ne les inventerons pas.</h2>
        <div class="prose" style="margin-top:1.8rem;max-width:58ch">
          <p class="lead">Beaucoup de sites de notre secteur affichent des témoignages flatteurs et des chantiers prestigieux dont rien ne permet de vérifier l'origine. Nous avons choisi de ne pas le faire.</p>
          <p>Tant que nous ne pouvons pas présenter de véritables photographies de chantiers, prises sur nos interventions et publiées avec l'accord des maîtres d'ouvrage, cette page reste ce qu'elle est : une illustration technique de nos méthodes et des surfaces que nous traitons.</p>
          <p><strong>Ce que nous pouvons démontrer en revanche</strong>, c'est notre raisonnement : expliquez-nous votre bâtiment, et nous vous dirons précisément quelle méthode nous retiendrions, pourquoi, et quelles sont les limites de chacune dans votre cas.</p>
        </div>
        <div class="btn-row" style="margin-top:2.2rem">${btn("Soumettre votre bâtiment", "/contact/")}${btn("Voir nos méthodes", "/services/", "btn--ghost")}</div>
      </div>
      <div class="rv" style="--i:1">
        <figure class="edit__fig reveal-img">${img("equipe-chantier", "Intervenant en équipement de protection sur un chantier", { sizes: "(max-width:899px) 100vw, 40vw" })}<figcaption>Préparation et équipement de protection individuelle</figcaption></figure>
      </div>
    </div>
  </div>
</section>

${finalCta({ titre: "Et votre bâtiment, à quoi ressemble-t-il ?", cta: "Envoyer vos photographies", image: "verre-gouttes-band" })}
`;

export default {
  path: "/realisations/",
  title: "Nos réalisations | CleanVitreService",
  description: "Galerie illustrant nos capacités d'intervention en nettoyage de vitres et de façades : drone, travaux sur cordes, bâtiments professionnels et surfaces vitrées.",
  ogImage: "vitre-grattoir-band",
  body,
};
