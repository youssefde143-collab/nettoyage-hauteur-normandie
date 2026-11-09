import { esc } from "../layout.mjs";
import { brand, contact, legalEntity, site } from "../config.mjs";
const L = legalEntity;
const ph = (v) => `<span class="ph">${esc(v)}</span>`;

const body = `
<section class="phero phero--flat" style="background:var(--ink)">
  <div class="phero__in" style="padding-bottom:clamp(2.4rem,5vw,4rem)">
    <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>/</span>Mentions légales</nav>
    <h1 style="font-size:clamp(2rem,1.4rem + 2.6vw,3.4rem)">Mentions légales</h1>
    <p class="phero__sub" style="font-size:var(--t-body)">Dernière mise à jour : ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="legal">
      <div class="note" style="margin-top:0;margin-bottom:2.4rem">
        <strong>Document à compléter avant la mise en ligne.</strong> Les éléments encadrés en pointillés sont des
        espaces réservés : aucune information d'immatriculation, d'assurance ou d'hébergement n'a été inventée.
        Ils doivent être renseignés dans <code>src/config.mjs</code> (section <code>legalEntity</code>) avant
        toute publication, conformément aux obligations d'information des articles 6-III et 19 de la loi
        n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique.
      </div>

      <h2>1. Éditeur du site</h2>
      <dl>
        <dt>Dénomination</dt><dd>${ph(brand.name)}</dd>
        <dt>Forme juridique</dt><dd>${ph(L.formeJuridique)}</dd>
        <dt>Capital social</dt><dd>${ph(L.capital)}</dd>
        <dt>Siège social</dt><dd>${ph(L.siege)}</dd>
        <dt>SIREN</dt><dd>${ph(L.siren)}</dd>
        <dt>SIRET</dt><dd>${ph(L.siret)}</dd>
        <dt>RCS</dt><dd>${ph(L.rcs)}</dd>
        <dt>TVA intracommunautaire</dt><dd>${ph(L.tva)}</dd>
        <dt>Téléphone</dt><dd>${ph(contact.phoneLabel)}</dd>
        <dt>Courriel</dt><dd>${ph(contact.emailLabel)}</dd>
        <dt>Responsable de la publication</dt><dd>${ph(L.responsable)}</dd>
      </dl>

      <h2>2. Hébergement</h2>
      <p>Le site est hébergé par : ${ph(L.hebergeur)}</p>

      <h2>3. Activité et assurance professionnelle</h2>
      <p>L'éditeur exerce une activité de nettoyage de vitres, de façades et de surfaces en hauteur, mise en œuvre
      par drone, par travaux d'accès sur cordes et par plateforme élévatrice mobile de personnel.</p>
      <dl><dt>Assurance responsabilité civile professionnelle</dt><dd>${ph(L.assurance)}</dd></dl>
      <p>Les attestations d'assurance et les pièces administratives sont communiquées sur demande, notamment dans le
      cadre d'une consultation ou d'un appel d'offres.</p>

      <h2>4. Propriété intellectuelle</h2>
      <p>L'ensemble des contenus de ce site — structure, textes, mise en page, éléments graphiques, code source — est
      protégé par le droit de la propriété intellectuelle. Toute reproduction, représentation, adaptation ou
      exploitation, totale ou partielle, par quelque procédé que ce soit, sans autorisation écrite préalable de
      l'éditeur, est interdite.</p>
      <h3>Crédits photographiques</h3>
      <p>Les photographies illustrant ce site proviennent de la banque d'images Unsplash et sont utilisées
      conformément à la licence Unsplash. Elles ont une valeur d'illustration des méthodes d'intervention et des
      types de surfaces traitées : <strong>elles ne documentent pas de chantiers réalisés par l'entreprise</strong>.
      Aucune image, aucun logo et aucun texte marketing n'a été repris de sites concurrents.</p>
      <p>Les fichiers de cartographie des départements normands sont dérivés de données géographiques ouvertes
      (contours administratifs français publiés en open data). La police de caractères Sora et la police Inter sont
      utilisées sous licence SIL Open Font License 1.1.</p>

      <h2>5. Liens hypertextes</h2>
      <p>Ce site peut comporter des liens vers des sites tiers. L'éditeur n'exerce aucun contrôle sur ces sites et
      décline toute responsabilité quant à leur contenu, leur disponibilité ou leurs pratiques en matière de
      données personnelles.</p>

      <h2>6. Données personnelles et cookies</h2>
      <p>Les modalités de traitement des données transmises via le formulaire de demande de devis sont décrites dans
      la <a href="/politique-de-confidentialite/">politique de confidentialité</a>. Les informations relatives au
      stockage local utilisé par ce site figurent dans la page <a href="/gestion-des-cookies/">gestion des
      cookies</a>.</p>
      <dl><dt>Contact — protection des données</dt><dd>${ph(L.dpo)}</dd></dl>

      <h2>7. Limitation de responsabilité</h2>
      <p>Les informations techniques présentées sur ce site, notamment celles relatives aux méthodes d'intervention
      et à leurs conditions de mise en œuvre, ont une valeur indicative et générale. Elles ne constituent ni un
      engagement contractuel, ni une garantie de faisabilité pour un bâtiment donné.</p>
      <p>La faisabilité d'une intervention, la méthode retenue et les conditions de réalisation ne peuvent être
      établies qu'après étude du bâtiment concerné et figurent exclusivement dans la proposition commerciale
      remise au client.</p>

      <h2>8. Médiation de la consommation</h2>
      <p>Conformément à l'article L. 612-1 du code de la consommation, le consommateur a la possibilité de recourir
      gratuitement à un médiateur de la consommation en vue de la résolution amiable d'un litige.</p>
      <dl><dt>Médiateur compétent</dt><dd>${ph(L.mediateur)}</dd></dl>

      <h2>9. Droit applicable</h2>
      <p>Les présentes mentions légales sont soumises au droit français. En cas de litige, et après échec de toute
      tentative de résolution amiable, les tribunaux français sont seuls compétents.</p>

      <h2>10. Signaler une erreur</h2>
      <p>Pour toute question relative à ce site ou pour signaler une inexactitude, vous pouvez écrire à
      ${ph(contact.emailLabel)} ou utiliser le <a href="/contact/">formulaire de contact</a>.</p>
    </div>
  </div>
</section>
`;

export default {
  path: "/mentions-legales/",
  title: "Mentions légales | [NOM DE L'ENTREPRISE]",
  description: "Mentions légales du site : éditeur, hébergement, propriété intellectuelle, crédits photographiques, limitation de responsabilité et médiation de la consommation.",
  darkHeader: false,
  body,
};
