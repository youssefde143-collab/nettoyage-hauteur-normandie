import { btn, tlink, img, esc } from "../layout.mjs";
import { icons, faqBlock, finalCta, processus } from "../parts.mjs";
import { brand } from "../config.mjs";

const faq = [
  { q: "Depuis quand l'entreprise existe-t-elle ?",
    a: ["Cette information n'est pas encore renseignée sur le site. Elle le sera dès que les éléments définitifs de présentation de l'entreprise seront arrêtés.",
        "Nous préférons laisser cette page volontairement factuelle plutôt que d'y inscrire une ancienneté, un effectif ou un historique qui ne correspondraient pas à la réalité."] },
  { q: "Quelles sont vos certifications ?",
    a: ["Aucune certification n'est affichée sur ce site, et c'est délibéré : nous ne publions que ce que nous pouvons documenter. Les qualifications de nos intervenants au travail en hauteur, les attestations d'assurance et les éléments administratifs sont communiqués sur demande, dans le cadre d'une consultation ou d'un appel d'offres.",
        "Si vous avez besoin d'un dossier administratif complet pour instruire une candidature, demandez-le : il vous sera transmis tel qu'il est."] },
  { q: "Combien de personnes composent vos équipes ?",
    a: ["Cette information n'est pas publiée pour le moment. La taille des équipes mobilisées dépend de chaque chantier : nature de la méthode, surface à traiter, contraintes de planning.",
        "Le dimensionnement de l'équipe pour votre intervention figure dans la proposition que nous vous remettons."] },
];

const body = `
<section class="phero">
  <div class="phero__media">${img("apropos-1-band", "Intervenant en casque de protection au sommet d'un bâtiment", { sizes: "100vw", eager: true })}</div>
  <div class="phero__in">
    <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>/</span>À propos</nav>
    <p class="eyebrow">L'entreprise</p>
    <h1>Un prestataire technique du nettoyage en hauteur.</h1>
    <p class="phero__sub">Trois méthodes d'accès, une étude préalable systématique et le refus d'annoncer ce que nous ne pouvons pas tenir. C'est à peu près tout ce qu'il y a à savoir — et c'est déjà beaucoup.</p>
  </div>
</section>

<section class="sec" aria-labelledby="a1">
  <div class="wrap">
    <div class="edit edit--7-5">
      <div class="rv">
        <p class="eyebrow">Notre métier</p>
        <h2 id="a1" style="max-width:21ch">Le nettoyage n'est pas le problème. L'accès l'est.</h2>
        <div class="prose" style="margin-top:1.8rem;max-width:58ch">
          <p class="lead">Nettoyer une vitre est un geste simple. Atteindre cette vitre lorsqu'elle se trouve au vingtième niveau d'un mur-rideau, au-dessus d'une verrière ou en surplomb d'une rue circulée est un problème technique à part entière.</p>
          <p>C'est ce problème que nous traitons. Notre activité consiste à déterminer comment accéder à une surface en hauteur — proprement, en sécurité, sans immobiliser le bâtiment et sans endommager le support — puis à réaliser l'intervention.</p>
          <p>Pour cela, nous disposons de <strong>trois méthodes complémentaires</strong> : le nettoyage par drone, les travaux sur cordes et le nettoyage avec nacelle élévatrice. Aucune n'est supérieure aux autres. Chacune répond à une famille de configurations, et c'est le bâtiment qui tranche.</p>
          <p>Cette polyvalence est notre choix de départ. Un prestataire qui ne maîtrise qu'un seul moyen d'accès doit nécessairement convaincre que ce moyen convient à votre bâtiment. Nous n'avons pas ce biais.</p>
        </div>
        <div class="btn-row" style="margin-top:2.2rem">${btn("Nos trois méthodes", "/services/")}${btn("Demander un devis", "/contact/", "btn--ghost")}</div>
      </div>
      <div class="rv" style="--i:1">
        <figure class="edit__fig reveal-img">${img("equipe-casques", "Équipements de protection individuelle portés sur un chantier", { sizes: "(max-width:899px) 100vw, 40vw" })}<figcaption>Travail en hauteur — équipements et procédures</figcaption></figure>
        <figure class="edit__fig reveal-img" style="margin-top:1.4rem">${img("facade-bas", "Contre-plongée sur un immeuble de grande hauteur", { sizes: "(max-width:899px) 100vw, 40vw" })}<figcaption>Immeubles de grande hauteur — l'accès détermine tout</figcaption></figure>
      </div>
    </div>
  </div>
</section>

<section class="sec sec--dark" aria-labelledby="a2">
  <div class="wrap">
    <div class="shead rv">
      <div><p class="eyebrow">Notre manière de travailler</p><h2 id="a2">Quatre principes, tenus.</h2></div>
      <div class="shead__aside"><p class="lead" style="font-size:var(--t-body)">Ce ne sont pas des valeurs d'affichage : ce sont des règles de fonctionnement qui déterminent nos réponses, y compris quand elles nous font perdre une affaire.</p></div>
    </div>
    <ul class="vals" data-stagger>
      <li class="rv"><h3>01 — Le bâtiment décide</h3><p>La méthode est choisie après analyse du bâtiment, jamais avant. Notre parc matériel ne dicte pas notre recommandation.</p></li>
      <li class="rv"><h3>02 — Dire non quand c'est non</h3><p>Si une méthode n'est pas adaptée, nous le disons. Si aucune ne l'est, nous le disons aussi, et nous expliquons pourquoi.</p></li>
      <li class="rv"><h3>03 — Pas de chiffres inventés</h3><p>Aucune statistique, aucun taux de satisfaction, aucune référence client que nous ne pourrions documenter n'apparaît sur ce site.</p></li>
      <li class="rv"><h3>04 — La sécurité avant le planning</h3><p>Une intervention peut être reportée pour des raisons météorologiques ou techniques. Ce n'est pas négociable.</p></li>
    </ul>
  </div>
</section>

<section class="sec sec--paper" aria-labelledby="a3">
  <div class="wrap">
    <div class="shead rv">
      <div><p class="eyebrow">Nos moyens</p><h2 id="a3">Ce dont nous disposons — et ce dont nous ne disposons pas.</h2></div>
      <div class="shead__aside"><p class="lead" style="font-size:var(--t-body)">La seconde liste est aussi importante que la première. Elle évite les malentendus dès le premier échange.</p></div>
    </div>
    <div class="cards cards--2">
      <div class="card rv" style="border-color:rgba(26,116,240,.35)">
        <h3>Nos moyens d'intervention</h3>
        <ul>
          <li>Drones professionnels de nettoyage, pilotés depuis le sol</li>
          <li>Personnels formés au travail en hauteur et à l'accès par cordes</li>
          <li>Nacelles élévatrices — plateformes élévatrices mobiles de personnel</li>
          <li>Matériel de nettoyage professionnel adapté aux supports traités</li>
        </ul>
      </div>
      <div class="card rv" style="--i:1">
        <h3>Ce que nous ne possédons pas</h3>
        <ul>
          <li>Robots de nettoyage autonomes</li>
          <li>Grues de chantier ou grues à tour</li>
          <li>Tout équipement non mentionné dans la liste ci-contre</li>
        </ul>
        <p style="margin-top:.6rem">Nous le précisons parce que ce secteur communique parfois sur des équipements qu'il ne détient pas. Si une prestation exige un moyen dont nous ne disposons pas, nous vous le dirons plutôt que de l'improviser.</p>
      </div>
    </div>
  </div>
</section>

<section class="sec" aria-labelledby="a4">
  <div class="wrap wrap--tight">
    <div class="rv" style="text-align:left">
      <p class="eyebrow">Informations en attente</p>
      <h2 id="a4" style="max-width:24ch">Cette page sera complétée.</h2>
      <div class="prose" style="margin-top:1.6rem;max-width:68ch">
        <p class="lead">Plusieurs éléments de présentation de l'entreprise ne sont pas encore arrêtés. Nous avons choisi de laisser cette page incomplète plutôt que de la remplir de contenu inventé.</p>
        <p>Les éléments suivants seront ajoutés dès qu'ils seront définitifs : la dénomination commerciale, l'identité visuelle, la date de création, la présentation des dirigeants, la composition des équipes, le détail des qualifications et habilitations, les attestations d'assurance et les premières références clients documentées.</p>
      </div>
      <ul class="srv__list" style="margin-top:1.8rem;max-width:68ch">
        <li>Dénomination commerciale et identité visuelle — actuellement affichées sous la forme <span class="ph" style="color:var(--text)">${esc(brand.name)}</span></li>
        <li>Date de création et historique de l'entreprise</li>
        <li>Présentation des dirigeants et de l'organisation</li>
        <li>Composition et effectif des équipes</li>
        <li>Détail des qualifications au travail en hauteur et des habilitations</li>
        <li>Attestations d'assurance et pièces administratives</li>
        <li>Premières références clients, publiées avec l'accord des maîtres d'ouvrage</li>
      </ul>
      <div class="note" style="max-width:68ch">
        Si vous avez besoin de l'un de ces éléments pour instruire une consultation ou un appel d'offres, demandez-le
        directement : il vous sera transmis dans l'état où il se trouve, sans embellissement.
      </div>
      <div class="btn-row" style="margin-top:2rem">${btn("Nous contacter", "/contact/")}${btn("Voir nos zones d'intervention", "/zones-intervention/", "btn--ghost")}</div>
    </div>
  </div>
</section>

${processus()}
${faqBlock(faq, { title: "Questions sur l'entreprise", eyebrow: "FAQ · À propos" })}
${finalCta({ titre: "Parlons de votre bâtiment, pas de nous.", texte: "La meilleure façon de juger un prestataire technique reste de lui soumettre un cas concret. Décrivez-nous le vôtre.", cta: "Décrire mon projet", image: "apropos-1-band" })}
`;

export default {
  path: "/a-propos/",
  title: "À propos de notre entreprise | [NOM DE L'ENTREPRISE]",
  description: "Prestataire technique du nettoyage de vitres et de façades en hauteur : drone, travaux sur cordes et nacelle. Nos moyens, notre méthode et nos principes.",
  ogImage: "apropos-1-band",
  faq,
  body,
};
