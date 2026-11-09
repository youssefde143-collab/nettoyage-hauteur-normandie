import { esc } from "../layout.mjs";
import { brand, contact, legalEntity } from "../config.mjs";
const ph = (v) => `<span class="ph">${esc(v)}</span>`;

const body = `
<section class="phero phero--flat" style="background:var(--ink)">
  <div class="phero__in" style="padding-bottom:clamp(2.4rem,5vw,4rem)">
    <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>/</span>Politique de confidentialité</nav>
    <h1 style="font-size:clamp(2rem,1.4rem + 2.6vw,3.4rem)">Politique de confidentialité</h1>
    <p class="phero__sub" style="font-size:var(--t-body)">Dernière mise à jour : ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="legal">
      <div class="note" style="margin-top:0;margin-bottom:2.4rem">
        <strong>Document à compléter avant la mise en ligne.</strong> L'identité du responsable de traitement, ses
        coordonnées et la durée de conservation définitive doivent être renseignées dans
        <code>src/config.mjs</code>. Le raccordement du formulaire à un service de réception de messages
        (voir <code>INTEGRATION.md</code>) devra être reflété dans la section « Destinataires et sous-traitants ».
      </div>

      <h2>1. Responsable du traitement</h2>
      <p>Les données collectées via ce site sont traitées par ${ph(brand.name)}, dont les coordonnées figurent dans
      les <a href="/mentions-legales/">mentions légales</a>.</p>
      <dl><dt>Contact — protection des données</dt><dd>${ph(legalEntity.dpo)}</dd>
          <dt>Courriel</dt><dd>${ph(contact.emailLabel)}</dd></dl>

      <h2>2. Données collectées</h2>
      <p>Ce site ne collecte aucune donnée à votre insu. Il n'utilise ni outil de mesure d'audience, ni traceur
      publicitaire, ni réseau social embarqué, ni service tiers de profilage.</p>
      <p>Les seules données collectées sont celles que vous saisissez volontairement dans le formulaire de demande
      de devis :</p>
      <ul>
        <li>Nom et prénom</li>
        <li>Entreprise ou organisation, le cas échéant</li>
        <li>Adresse électronique</li>
        <li>Numéro de téléphone</li>
        <li>Catégorie de client et type de prestation souhaitée</li>
        <li>Localisation, département, type et hauteur du bâtiment</li>
        <li>Description du projet</li>
        <li>Photographies ou documents que vous choisissez de joindre</li>
      </ul>
      <p>Aucune donnée sensible au sens de l'article 9 du règlement général sur la protection des données n'est
      demandée. Merci de ne pas en transmettre dans le champ de description libre.</p>

      <h2>3. Finalités et bases légales</h2>
      <dl>
        <dt>Finalité</dt><dd>Traiter votre demande, vous recontacter, étudier la faisabilité technique de
        l'intervention et établir une proposition commerciale.</dd>
        <dt>Base légale</dt><dd>Votre consentement, recueilli par la case à cocher du formulaire (article 6.1.a du
        RGPD), ainsi que, le cas échéant, l'exécution de mesures précontractuelles prises à votre demande
        (article 6.1.b).</dd>
      </dl>
      <p>Vos données ne sont utilisées à aucune autre fin. Elles ne servent pas à de la prospection commerciale non
      sollicitée et ne font l'objet d'aucune décision automatisée ni d'aucun profilage.</p>

      <h2>4. Destinataires et sous-traitants</h2>
      <p>Vos données sont destinées aux seules personnes de l'entreprise chargées du traitement des demandes
      commerciales et de l'étude technique des projets.</p>
      <p><strong>Elles ne sont ni cédées, ni louées, ni revendues à des tiers.</strong></p>
      <p>Le site fait appel aux prestataires techniques suivants : l'hébergeur du site, identifié dans les mentions
      légales, et — une fois le formulaire raccordé — le service assurant l'acheminement des messages, qui sera
      mentionné ici avec sa localisation et son cadre contractuel.</p>

      <h2>5. Durée de conservation</h2>
      <p>Les demandes n'ayant pas donné suite sont conservées le temps nécessaire à leur traitement et à un
      éventuel échange de suivi, puis supprimées. Les demandes ayant abouti à une relation contractuelle suivent
      les durées de conservation applicables aux documents commerciaux et comptables.</p>
      <p>La durée précise applicable aux demandes sans suite sera indiquée ici : ${ph("[DURÉE DE CONSERVATION À DÉFINIR]")}.</p>

      <h2>6. Transferts hors de l'Union européenne</h2>
      <p>En l'état actuel, le site ne met en œuvre aucun transfert de données personnelles hors de l'Union
      européenne. Si le service d'acheminement du formulaire retenu impliquait un tel transfert, cette section
      préciserait le pays concerné et le mécanisme d'encadrement applicable.</p>

      <h2>7. Sécurité</h2>
      <p>Le site est diffusé via une connexion chiffrée. L'accès aux demandes reçues est restreint aux personnes
      habilitées. Les pièces jointes sont limitées en nombre et en taille, et les formats acceptés sont restreints
      aux images et aux documents PDF.</p>

      <h2>8. Vos droits</h2>
      <p>Conformément au règlement général sur la protection des données et à la loi n° 78-17 du 6 janvier 1978
      modifiée, vous disposez des droits suivants sur vos données :</p>
      <ul>
        <li>Droit d'accès et droit d'obtenir une copie de vos données</li>
        <li>Droit de rectification des données inexactes ou incomplètes</li>
        <li>Droit à l'effacement</li>
        <li>Droit à la limitation du traitement</li>
        <li>Droit d'opposition</li>
        <li>Droit à la portabilité</li>
        <li>Droit de retirer votre consentement à tout moment</li>
      </ul>
      <p>Pour exercer ces droits, écrivez à ${ph(contact.emailLabel)}. Une réponse vous sera apportée dans un délai
      d'un mois à compter de la réception de votre demande. Une pièce justificative d'identité peut être demandée
      en cas de doute raisonnable sur l'identité du demandeur.</p>

      <h2>9. Réclamation</h2>
      <p>Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une
      réclamation à la Commission nationale de l'informatique et des libertés (CNIL), 3 place de Fontenoy,
      TSA 80715, 75334 Paris Cedex 07, ou en ligne sur son site officiel.</p>

      <h2>10. Évolution de cette politique</h2>
      <p>Cette politique peut être modifiée pour tenir compte d'évolutions techniques, réglementaires ou
      organisationnelles. La date de dernière mise à jour figure en haut de la page.</p>
    </div>
  </div>
</section>
`;

export default {
  path: "/politique-de-confidentialite/",
  title: "Politique de confidentialité | [NOM DE L'ENTREPRISE]",
  description: "Traitement des données personnelles transmises via le formulaire de devis : finalités, base légale, destinataires, durée de conservation et exercice de vos droits.",
  darkHeader: false,
  body,
};
