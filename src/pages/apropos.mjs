import { btn, tlink, img, esc } from "../layout.mjs";
import { icons, faqBlock, finalCta, processus } from "../parts.mjs";
import { brand } from "../config.mjs";

const faq = [
  { q: "Qui est derrière CleanVitreService ?",
    a: ["L'entreprise est dirigée par Noah Lefebvre. Elle est établie à Bolbec, en Seine-Maritime, et exerce sous le statut de micro-entreprise."] },
  { q: "Quelles sont vos assurances et qualifications ?",
    a: ["L'entreprise dispose d'une assurance de responsabilité civile professionnelle, et les interventions par drone comme les travaux en hauteur relèvent d'autorisations et de qualifications spécifiques.",
        "Leurs intitulés exacts et leurs références ne sont pas publiés ici tant qu'ils n'ont pas été formellement vérifiés. Ils sont communiqués sur demande, notamment dans le cadre d'une consultation."] },
  { q: "Combien de personnes composent l'équipe ?",
    a: ["Cette information n'est pas publiée. Le dimensionnement de l'équipe mobilisée pour votre intervention figure dans le devis."] },
];

const body = `
<section class="phero">
  <div class="phero__media">${img("apropos-1-band", "Intervenant en casque de protection au sommet d'un bâtiment", { sizes: "100vw", eager: true })}</div>
  <div class="phero__in">
    <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>/</span>À propos</nav>
    <p class="eyebrow">L'entreprise</p>
    <h1>Une entreprise normande du nettoyage en hauteur.</h1>
    <p class="phero__sub">CleanVitreService, établie à Bolbec, nettoie les vitres, les façades et les surfaces que l'on n'atteint pas simplement.</p>
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
          <p>Pour cela, nous disposons de <strong>quatre moyens d'accès complémentaires</strong> : le matériel conventionnel de laveur de vitres, la perche télescopique, les travaux sur cordes et le nettoyage par drone. Aucun n'est supérieur aux autres. Chacun répond à une famille de configurations, et c'est le bâtiment qui tranche.</p>
          <p>Cette polyvalence est notre choix de départ. Un prestataire qui ne maîtrise qu'un seul moyen d'accès doit nécessairement convaincre que ce moyen convient à votre bâtiment. Nous n'avons pas ce biais.</p>
        </div>
        <div class="btn-row" style="margin-top:2.2rem">${btn("Nos prestations", "/services/")}${btn("Demander un devis", "/contact/", "btn--ghost")}</div>
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
    <div class="rv">
      <p class="eyebrow">L'entreprise en clair</p>
      <h2 id="a4" style="max-width:22ch">Les faits, et rien de plus.</h2>
      <div class="prose" style="margin-top:var(--s-5)">
        <p class="lead">Nous préférons une page courte et exacte à une page longue et flatteuse.</p>
      </div>
      <dl class="facts">
        <div><dt>Dénomination</dt><dd>CleanVitreService</dd></div>
        <div><dt>Dirigeant</dt><dd>Noah Lefebvre</dd></div>
        <div><dt>Statut</dt><dd>Entreprise individuelle — micro-entreprise</dd></div>
        <div><dt>Siège</dt><dd>4 ruelle de l'Hôtel de Ville, 76210 Bolbec</dd></div>
        <div><dt>SIREN</dt><dd>101 837 474</dd></div>
        <div><dt>SIRET</dt><dd>101 837 474 00010</dd></div>
        <div><dt>Zone</dt><dd>50 km autour de Bolbec, Normandie, France selon projet</dd></div>
      </dl>
      <div class="note" style="max-width:68ch">
        L'entreprise dispose d'une assurance de responsabilité civile professionnelle, et les interventions
        par drone comme les travaux en hauteur relèvent d'autorisations et de qualifications spécifiques.
        Leurs intitulés exacts ne sont pas publiés ici tant qu'ils n'ont pas été vérifiés : ils sont
        communiqués sur demande. Nous ne publions ni ancienneté, ni effectif, ni référence client que nous
        ne pourrions documenter.
      </div>
      <div class="btn-row" style="margin-top:var(--s-6)">${btn("Nous contacter", "/contact/")}${btn("Zones d'intervention", "/zones-intervention/", "btn--ghost")}</div>
    </div>
  </div>
</section>

${processus()}
${faqBlock(faq, { title: "Questions sur l'entreprise", eyebrow: "FAQ · À propos" })}
${finalCta({ titre: "Parlons de votre bâtiment, pas de nous.", texte: "La meilleure façon de juger un prestataire technique reste de lui soumettre un cas concret. Décrivez-nous le vôtre.", cta: "Décrire mon projet", image: "apropos-1-band" })}
`;

export default {
  path: "/a-propos/",
  title: "À propos de notre entreprise | CleanVitreService",
  description: "Prestataire technique du nettoyage de vitres et de façades en hauteur : drone, travaux sur cordes et perche télescopique. Nos moyens, notre méthode et nos principes.",
  ogImage: "apropos-1-band",
  faq,
  body,
};
