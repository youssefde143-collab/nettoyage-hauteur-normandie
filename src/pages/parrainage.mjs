import { btn, img, esc, ar } from "../layout.mjs";
import { icons, faqBlock, finalCta } from "../parts.mjs";
import { contact, parrainage } from "../config.mjs";

/* Page du programme de parrainage.
   Une seule règle commerciale, celle arrêtée par l'entreprise : le filleul
   obtient 20 % sur sa première intervention, le parrain ne reçoit aucun
   avantage supplémentaire. Rien d'autre n'est promis — ni durée, ni cumul,
   ni montant — tant que l'entreprise ne l'a pas arrêté. */

const R = parrainage.reduction;

const faq = [
  { q: "Qui bénéficie de la réduction ?",
    a: [`La personne recommandée, sur sa première intervention. Elle indique le code de parrainage dans sa demande de devis, et la réduction de ${R} % apparaît sur la proposition qui lui est remise.`] },
  { q: "Que reçoit la personne qui recommande ?",
    a: ["Le parrainage ne donne pas lieu à un avantage supplémentaire pour la personne qui recommande. L'offre est entièrement destinée au filleul."] },
  { q: "Comment obtenir mon code de parrainage ?",
    a: ["Les codes sont nominatifs et attribués par CleanVitreService. Si vous êtes déjà client, demandez le vôtre par téléphone ou par e-mail : il vous est communiqué directement."] },
  { q: "Où saisir le code ?",
    a: ["Dans le formulaire de devis, à la première étape, au champ « Vous avez un code parrainage ? ». Vous pouvez aussi l'indiquer de vive voix si vous appelez."] },
  { q: "Le code est-il vérifié ?",
    a: ["Oui. Chaque code est rattaché à un client parrain et peut être activé ou désactivé. Un code inconnu, désactivé ou déjà utilisé hors des règles prévues n'ouvre pas droit à la réduction."] },
  { q: `La réduction s'applique-t-elle à plusieurs interventions ?`,
    a: [`Non. Elle porte sur la première intervention du filleul. Les modalités particulières — durée de validité, cumul éventuel avec une autre offre — sont précisées par CleanVitreService lors de l'établissement du devis.`] },
];

const body = `
<section class="phero phero--flat">
  <div class="phero__media">${img("facade-reflets-band", "Façade de verre courbe reflétant le ciel", { sizes: "100vw", eager: true })}</div>
  <div class="phero__in">
    <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>/</span>Parrainage</nav>
    <p class="eyebrow">Parrainage</p>
    <h1>Le bouche-à-oreille récompensé.</h1>
    <p class="phero__sub">Vous connaissez quelqu'un qui a besoin d'un nettoyage professionnel ? Recommandez CleanVitreService et faites-lui profiter de ${R} % de réduction sur sa première intervention.</p>
    <div class="btn-row" style="margin-top:var(--s-7)">
      ${btn("Demander mon devis gratuit", "/contact/", "", true)}
      <a class="btn btn--on-dark btn--lg" href="tel:${contact.phoneHref}">Demander mon code · ${esc(contact.phoneLabel)}${ar()}</a>
    </div>
  </div>
</section>

<!-- L'offre --------------------------------------------------------------- -->
<section class="sec sec--dark" aria-labelledby="off-t">
  <div class="wrap">
    <div class="refer rv">
      <div class="refer__n">
        <p class="refer__v" aria-hidden="true"><span class="refer__num">${R}</span><span class="refer__pc">%</span></p>
        <span class="refer__leg">de réduction pour la personne recommandée, sur sa première intervention</span>
      </div>
      <div class="refer__b">
        <p class="eyebrow">Comment cela fonctionne</p>
        <h2 id="off-t">Trois étapes, et c'est tout.</h2>
        <p class="lead">Un code nominatif, transmis à qui vous voulez. Aucune démarche en ligne, aucun compte à créer.</p>
        <ol class="refer__l">
          <li><b>01</b><span>Vous êtes déjà client : demandez votre code de parrainage par téléphone ou par e-mail. Il vous est attribué nominativement.</span></li>
          <li><b>02</b><span>Vous transmettez ce code à la personne de votre choix — un voisin, un commerçant, un gestionnaire d'immeuble.</span></li>
          <li><b>03</b><span>Elle l'indique dans sa demande de devis. Après vérification du code, la réduction de ${R} % figure sur sa proposition.</span></li>
        </ol>
        <div class="btn-row">
          ${btn("Demander mon devis gratuit", "/contact/", "", true)}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Les conditions --------------------------------------------------------- -->
<section class="sec" aria-labelledby="cond-t">
  <div class="wrap">
    <div class="shead rv">
      <div>
        <p class="eyebrow">Conditions</p>
        <h2 id="cond-t">Ce que recouvre exactement l'offre.</h2>
      </div>
      <div class="shead__aside">
        <p class="lead">Une offre simple se décrit en quelques lignes. Les voici, sans renvoi en bas de page.</p>
      </div>
    </div>
    <div class="cards rv">
      <div class="card">${icons.gear}<h3>Un code par parrain</h3>
        <p>Chaque code est nominatif et rattaché à un client. Il peut être activé ou désactivé par CleanVitreService.</p></div>
      <div class="card">${icons.study}<h3>${R} % pour le filleul</h3>
        <p>La réduction porte sur la première intervention de la personne recommandée. Elle apparaît sur le devis qui lui est remis.</p></div>
      <div class="card">${icons.shield}<h3>Aucun avantage pour le parrain</h3>
        <p>Recommander ne donne droit à aucune remise ni contrepartie supplémentaire. L'offre est destinée à la personne recommandée.</p></div>
      <div class="card">${icons.clock}<h3>Vérification du code</h3>
        <p>Un code inconnu, désactivé ou utilisé hors des règles prévues n'ouvre pas droit à la réduction. Nous le signalons alors clairement.</p></div>
    </div>
    <p class="note">La réduction s'applique sur la première intervention facturée au filleul, après vérification du code. Les modalités particulières sont précisées lors de l'établissement du devis.</p>
  </div>
</section>

${faqBlock(faq, { title: "Questions sur le parrainage", eyebrow: "FAQ · Parrainage" })}

${finalCta({
  titre: "Un code à transmettre, un devis à demander.",
  texte: "Déjà client ? Demandez votre code de parrainage. Recommandé par un proche ? Indiquez son code dans votre demande de devis.",
  cta: "Demander un devis gratuit",
})}
`;

export default {
  path: "/parrainage/",
  title: `Parrainage — ${parrainage.reduction} % pour votre filleul | CleanVitreService`,
  description: `Recommandez CleanVitreService : la personne que vous recommandez bénéficie de ${parrainage.reduction} % de réduction sur sa première intervention de nettoyage. Code nominatif, vérifié.`,
  ogTitle: "Le bouche-à-oreille récompensé — CleanVitreService",
  ogImage: "facade-reflets-band",
  faq,
  body,
};
