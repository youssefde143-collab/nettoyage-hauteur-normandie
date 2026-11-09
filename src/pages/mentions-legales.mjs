import { esc } from "../layout.mjs";
import { brand, contact, legalEntity, site } from "../config.mjs";
const L = legalEntity;
const ph = (v) => `<span class="ph">${esc(v)}</span>`;
const val = (v) => esc(v);

const body = `
<section class="phero phero--flat" style="background:var(--ink)">
  <div class="phero__in" style="padding-bottom:var(--s-8)">
    <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>/</span>Mentions légales</nav>
    <h1 style="font-size:clamp(2rem,1.4rem + 2.6vw,3.4rem)">Mentions légales</h1>
    <p class="phero__sub" style="font-size:var(--t-body)">Dernière mise à jour : ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="legal">
      <h2>1. Éditeur du site</h2>
      <dl>
        <dt>Dénomination</dt><dd>${val(L.denomination)}</dd>
        <dt>Forme juridique</dt><dd>${val(L.formeJuridique)}</dd>
        <dt>Dirigeant</dt><dd>${val(L.dirigeant)}</dd>
        <dt>Siège social</dt><dd>${val(L.siege)}</dd>
        <dt>SIREN</dt><dd>${val(L.siren)}</dd>
        <dt>SIRET</dt><dd>${val(L.siret)}</dd>
        <dt>TVA</dt><dd>${ph(L.tva)}</dd>
        <dt>Téléphone</dt><dd><a href="tel:${contact.phoneHref}">${val(contact.phoneLabel)}</a></dd>
        <dt>Courriel</dt><dd><a href="mailto:${contact.emailHref}">${val(contact.emailLabel)}</a></dd>
        <dt>Responsable de la publication</dt><dd>${val(L.responsable)}</dd>
      </dl>
      <p>En tant que micro-entreprise, ${val(L.denomination)} n'est pas immatriculée au registre du commerce
      et des sociétés en qualité de société et ne dispose pas de capital social : ces mentions sont donc
      sans objet.</p>

      <h2>2. Hébergement</h2>
      <p>${val(L.hebergeur)}</p>

      <h2>3. Activité</h2>
      <p>${val(L.denomination)} exerce une activité de nettoyage de vitres, de façades et de surfaces
      difficiles d'accès. Les interventions sont réalisées au moyen de matériel professionnel de laveur de
      vitres, de perches télescopiques, de plateformes élévatrices mobiles de personnel, de techniques
      d'accès sur cordes et de solutions de nettoyage par drone, selon la configuration du bâtiment et la
      faisabilité technique.</p>

      <h2>4. Assurance professionnelle</h2>
      <p>L'entreprise dispose d'une assurance de responsabilité civile professionnelle. Les coordonnées de
      l'assureur et le numéro de police seront publiés ici dès leur transmission :</p>
      <dl><dt>Assureur et n° de police</dt><dd>${ph(L.assurance)}</dd></dl>
      <p>L'attestation d'assurance est communiquée sur demande.</p>

      <h2>5. Autorisations et qualifications</h2>
      <p>Les interventions par drone et les travaux d'accès en hauteur relèvent d'autorisations et de
      qualifications spécifiques. Leur intitulé exact et leurs références ne sont pas publiés sur ce site
      tant qu'ils n'ont pas été formellement vérifiés ; ils sont communiqués sur demande, notamment dans le
      cadre d'une consultation ou d'un appel d'offres.</p>

      <h2>6. Propriété intellectuelle</h2>
      <p>L'ensemble des contenus de ce site — structure, textes, mise en page, éléments graphiques, code
      source — est protégé par le droit de la propriété intellectuelle. Toute reproduction ou exploitation,
      totale ou partielle, sans autorisation écrite préalable, est interdite.</p>
      <h3>Crédits photographiques</h3>
      <p>Les photographies illustrant ce site proviennent de la banque d'images Unsplash et sont utilisées
      conformément à la licence Unsplash. Elles ont une valeur d'illustration des méthodes d'intervention et
      des types de surfaces traitées : <strong>elles ne documentent pas de chantiers réalisés par
      l'entreprise</strong>.</p>
      <p>La carte des départements normands est dérivée de données géographiques ouvertes (contours
      administratifs français publiés en open data). Les polices Sora et Inter sont utilisées sous licence
      SIL Open Font License 1.1.</p>

      <h2>7. Liens hypertextes</h2>
      <p>Ce site peut comporter des liens vers des sites tiers. L'éditeur n'exerce aucun contrôle sur ces
      sites et décline toute responsabilité quant à leur contenu ou à leurs pratiques en matière de données
      personnelles.</p>

      <h2>8. Données personnelles et cookies</h2>
      <p>Les modalités de traitement des données transmises via le formulaire de devis sont décrites dans la
      <a href="/politique-de-confidentialite/">politique de confidentialité</a>. Les informations relatives
      au stockage local figurent dans la page <a href="/gestion-des-cookies/">gestion des cookies</a>.</p>
      <dl><dt>Contact — protection des données</dt><dd>${val(L.dpo)}</dd></dl>

      <h2>9. Limitation de responsabilité</h2>
      <p>Les informations techniques présentées sur ce site, notamment celles relatives aux méthodes
      d'intervention, ont une valeur indicative. Elles ne constituent ni un engagement contractuel, ni une
      garantie de faisabilité pour un bâtiment donné. La faisabilité, la méthode retenue et les conditions
      de réalisation ne peuvent être établies qu'après étude du bâtiment et figurent exclusivement dans le
      devis remis au client.</p>
      <p>Le délai de réponse indiqué sur ce site — trente minutes — constitue un objectif, apprécié selon la
      disponibilité de l'entreprise, et non un engagement contractuel.</p>

      <h2>10. Médiation de la consommation</h2>
      <p>Conformément à l'article L. 612-1 du code de la consommation, le consommateur peut recourir
      gratuitement à un médiateur de la consommation en vue de la résolution amiable d'un litige.</p>
      <dl><dt>Médiateur compétent</dt><dd>${ph(L.mediateur)}</dd></dl>

      <h2>11. Droit applicable</h2>
      <p>Les présentes mentions légales sont soumises au droit français. En cas de litige, et après échec de
      toute tentative de résolution amiable, les tribunaux français sont seuls compétents.</p>

      <h2>12. Signaler une erreur</h2>
      <p>Pour toute question relative à ce site ou pour signaler une inexactitude, écrivez à
      <a href="mailto:${contact.emailHref}">${val(contact.emailLabel)}</a> ou appelez le
      <a href="tel:${contact.phoneHref}">${val(contact.phoneLabel)}</a>.</p>
    </div>
  </div>
</section>
`;

export default {
  path: "/mentions-legales/",
  title: "Mentions légales | CleanVitreService",
  description: "Mentions légales de CleanVitreService, micro-entreprise établie à Bolbec : éditeur, SIREN, SIRET, hébergement, propriété intellectuelle et médiation.",
  darkHeader: false,
  body,
};
