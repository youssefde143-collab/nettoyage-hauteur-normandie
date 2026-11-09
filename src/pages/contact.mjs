import { btn, tlink, img, esc, ar } from "../layout.mjs";
import { icons, faqBlock } from "../parts.mjs";
import { contact, formEndpoint, zones } from "../config.mjs";

const faq = [
  { q: "Le devis est-il payant ?",
    a: ["Non. L'étude de votre demande et la remise d'une proposition sont gratuites et sans engagement."] },
  { q: "Sous quel délai aurai-je une réponse ?",
    a: ["Nous visons une réponse sous 30 minutes, selon disponibilité. Si votre demande appelle une visite sur site, nous vous le disons dès ce premier échange."] },
  { q: "Quels éléments faut-il réunir ?",
    a: ["L'adresse du chantier, la hauteur ou le nombre de niveaux, le type de surfaces et une estimation des quantités. Deux ou trois photographies prises depuis des angles différents valent mieux qu'une longue description."] },
  { q: "Intervenez-vous en urgence ?",
    a: ["Des astreintes sont possibles sur demande. Précisez-le dans le formulaire ou appelez directement : c'est le moyen le plus rapide."] },
];

/* ---------- Petits assistants de champ ---------- */
const field = (id, label, input, { hint = "", req = false, half = false } = {}) => `
<div class="field${half ? " field--half" : ""}">
  <label for="${id}">${esc(label)}${req ? ' <span class="req" aria-hidden="true">*</span>' : ' <span class="opt">(facultatif)</span>'}</label>
  ${input}
  ${hint ? `<p class="field__hint">${hint}</p>` : ""}
  <p class="field__err" id="${id}-err" aria-live="polite"></p>
</div>`;

const text = (id, name, ph = "", type = "text", req = false, auto = "") =>
  `<input id="${id}" name="${name}" type="${type}" ${auto ? `autocomplete="${auto}"` : ""} ${req ? "required" : ""} aria-describedby="${id}-err" placeholder="${esc(ph)}">`;

const select = (id, name, options, req = false) =>
  `<select id="${id}" name="${name}" ${req ? "required" : ""} aria-describedby="${id}-err">
    <option value="">Sélectionnez…</option>
    ${options.map(o => `<option>${esc(o)}</option>`).join("")}
  </select>`;

const checks = (name, options) => `
<div class="chips">
  ${options.map((o, i) => `
  <label class="chip">
    <input type="checkbox" name="${name}" value="${esc(o)}" id="${name}-${i}">
    <span>${esc(o)}</span>
  </label>`).join("")}
</div>`;

const radios = (name, options, req = false) => `
<div class="chips" role="radiogroup" aria-labelledby="${name}-lg">
  ${options.map((o, i) => `
  <label class="chip">
    <input type="radio" name="${name}" value="${esc(o)}" id="${name}-${i}" ${req && i === 0 ? "" : ""}>
    <span>${esc(o)}</span>
  </label>`).join("")}
</div>`;

/* ---------- Les six étapes ---------- */
const steps = [
  {
    t: "Vous", s: "Pour vous recontacter",
    html: `
      <div class="form__grid form__grid--2">
        ${field("nom", "Nom et prénom, ou raison sociale", text("nom", "nom", "Noah Lefebvre, ou Durand SAS", "text", true, "name"), { req: true })}
        ${field("telephone", "Téléphone", text("telephone", "telephone", "06 00 00 00 00", "tel", true, "tel"), { req: true })}
      </div>
      <div class="form__grid form__grid--2">
        ${field("email", "Adresse e-mail", text("email", "email", "vous@exemple.fr", "email", true, "email"), { req: true })}
        ${field("typeClient", "Vous êtes", select("typeClient", "type_client", ["Particulier", "Commerçant ou professionnel", "Entreprise, industrie ou immobilier", "Collectivité ou établissement public"], true), { req: true })}
      </div>`,
  },
  {
    t: "Prestation", s: "Ce qu'il y a à nettoyer",
    html: `
      <div class="field">
        <label id="prestations-lg">Surfaces concernées <span class="req" aria-hidden="true">*</span></label>
        <p class="field__hint">Plusieurs choix possibles.</p>
        ${checks("prestations", ["Vitres et baies vitrées", "Vérandas et verrières", "Façades et bardages", "Panneaux solaires", "Vitrines commerciales", "Volets roulants", "Panneaux publicitaires", "Autre"])}
        <p class="field__err" id="prestations-err" aria-live="polite"></p>
      </div>`,
  },
  {
    t: "Le site", s: "Où et dans quel état",
    html: `
      ${field("adresse", "Adresse complète du chantier", text("adresse", "adresse", "Rue, code postal, commune", "text", true, "street-address"), { req: true })}
      <div class="form__grid form__grid--2">
        ${field("departement", "Département", select("departement", "departement", [...zones.map(z => `${z.nom} (${z.code})`), "Autre département en France"]))}
        ${field("quantite", "Nombre de vitres ou surface approximative", text("quantite", "quantite", "Ex. 25 fenêtres, ou 180 m²"))}
      </div>
      <div class="form__grid form__grid--2">
        ${field("hauteur", "Hauteur du bâtiment", text("hauteur", "hauteur", "Ex. environ 12 m"))}
        ${field("niveaux", "Nombre de niveaux", text("niveaux", "niveaux", "Ex. 4"))}
      </div>
      ${field("acces", "Accessibilité du site", select("acces", "acces", ["Abords dégagés, accès facile", "Accès partiellement contraint", "Accès difficile", "Je ne sais pas"]))}
      ${field("obstacles", "Obstacles éventuels", text("obstacles", "obstacles", "Verrière, auvent, végétation, ligne électrique…"))}
      ${field("etat", "État général des surfaces", select("etat", "etat", ["Entretien courant", "Salissures marquées", "Encrassement ancien ou incrusté", "Après travaux", "Je ne sais pas"]))}`,
  },
  {
    t: "Accès", s: "Comment atteindre la surface",
    html: `
      <div class="field">
        <label id="methode-lg">Méthode envisagée</label>
        <p class="field__hint">Si vous hésitez, choisissez « Conseil souhaité » : c'est notre travail de trancher.</p>
        ${radios("methode", ["Nettoyage conventionnel", "Nacelle élévatrice", "Travaux sur cordes", "Drone", "Conseil souhaité"])}
        <p class="field__err" id="methode-err" aria-live="polite"></p>
      </div>`,
  },
  {
    t: "Planning", s: "Quand et à quelle fréquence",
    html: `
      <div class="form__grid form__grid--2">
        ${field("date", "Date d'intervention souhaitée", `<input id="date" name="date" type="date" aria-describedby="date-err">`)}
        ${field("urgence", "Degré d'urgence", select("urgence", "urgence", ["Pas d'urgence particulière", "Dans le mois", "Dans la semaine", "Urgent — astreinte"]))}
      </div>
      <div class="field">
        <label id="frequence-lg">Type d'intervention</label>
        ${radios("frequence", ["Intervention ponctuelle", "Entretien récurrent"])}
      </div>`,
  },
  {
    t: "Précisions", s: "Tout ce qui nous fera gagner du temps",
    html: `
      ${field("description", "Description du projet", `<textarea id="description" name="description" required maxlength="1200" aria-describedby="description-err" placeholder="Décrivez le bâtiment, les surfaces et ce que vous attendez de l'intervention."></textarea>`, { req: true })}
      <div class="field">
        <label for="photos">Photographies ou documents</label>
        <label class="file" for="photos">
          <input id="photos" name="photos[]" type="file" accept="image/*,video/*,.pdf" multiple aria-describedby="photos-hint photos-err">
          <span><b>Déposer vos fichiers ici</b>Photos, vidéos, plans ou cahier des charges</span>
        </label>
        <p class="field__hint" id="photos-hint">Jusqu'à 5 fichiers, 8 Mo maximum chacun.</p>
        <p class="field__err" id="photos-err" aria-live="polite"></p>
      </div>
      <div class="form__grid form__grid--2">
        ${field("eauElec", "Eau et électricité disponibles sur place", select("eauElec", "eau_electricite", ["Oui, les deux", "Eau uniquement", "Électricité uniquement", "Ni l'un ni l'autre", "Je ne sais pas"]))}
        ${field("stationnement", "Stationnement et restrictions d'accès", text("stationnement", "stationnement", "Parking privé, voirie, horaires imposés…"))}
      </div>
      <div>
        <label class="check" for="consentement">
          <input id="consentement" name="consentement" type="checkbox" required aria-describedby="consentement-err">
          <span>J'accepte que ces informations soient utilisées pour traiter ma demande et me recontacter. <a href="/politique-de-confidentialite/">Politique de confidentialité</a>. <span class="req" aria-hidden="true">*</span></span>
        </label>
        <p class="field__err" id="consentement-err" aria-live="polite"></p>
      </div>`,
  },
];

const body = `
<section class="phero phero--flat">
  <div class="phero__media">${img("contact-visuel-band", "Immeuble de grande hauteur à trame vitrée régulière", { sizes: "100vw", eager: true })}</div>
  <div class="phero__in">
    <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>/</span>Devis gratuit</nav>
    <p class="eyebrow">Parlons de votre projet</p>
    <h1>Décrivez-nous votre bâtiment.</h1>
    <p class="phero__sub">Devis gratuit. Réponse sous 30 minutes, selon disponibilité.</p>
    <div class="btn-row" style="margin-top:var(--s-7)">
      <a class="btn btn--lg" href="tel:${contact.phoneHref}">Appeler le ${esc(contact.phoneLabel)}${ar()}</a>
      <a class="btn btn--on-dark btn--lg" href="mailto:${contact.emailHref}">Écrire un e-mail${ar()}</a>
    </div>
  </div>
</section>

<section class="sec sec--dark" id="formulaire" aria-labelledby="f-t" style="padding-top:var(--s-9)">
  <div class="wrap">
    <div class="edit edit--7-5 edit--aside" style="align-items:start">
      <div class="rv">
        <h2 id="f-t" style="font-size:var(--t-h3)">Demande de devis</h2>
        <p class="lead" style="font-size:var(--t-body);margin-top:var(--s-4)">Six étapes courtes. Plus votre description est précise, plus notre réponse sera utile.</p>

        <form class="form form--steps" id="form-devis" style="margin-top:var(--s-7)" novalidate
              ${formEndpoint ? `action="${formEndpoint}" data-endpoint="${formEndpoint}"` : 'data-endpoint=""'}
              data-mailto="${contact.emailHref}" data-tel="${contact.phoneLabel}" method="post" enctype="multipart/form-data">

          <p id="form-status" class="form__status" aria-live="polite"></p>

          <ol class="stepper" data-stepper aria-label="Progression" hidden>
            ${steps.map((s, i) => `<li${i === 0 ? ' aria-current="step"' : ""}><span>${i + 1}</span><em>${esc(s.t)}</em></li>`).join("")}
          </ol>

          ${steps.map((s, i) => `
          <fieldset class="step" data-step="${i}">
            <legend><span class="step__n">Étape ${i + 1} sur ${steps.length}</span><span class="step__t">${esc(s.t)}</span><span class="step__s">${esc(s.s)}</span></legend>
            ${s.html}
          </fieldset>`).join("")}

          <div class="step__nav">
            <button type="button" class="btn btn--on-dark" data-prev hidden>Précédent</button>
            <button type="button" class="btn" data-next hidden>Continuer${ar()}</button>
            <button type="submit" class="btn btn--lg" data-send>Envoyer ma demande${ar()}</button>
          </div>
          <p class="field__hint">Aucune information n'est transmise avant la dernière étape.</p>
        </form>
      </div>

      <aside class="rv" style="--i:1">
        <div class="cards" style="margin-top:0">
          <div class="card">
            <h3 style="font-size:var(--t-h4)">Nous joindre directement</h3>
            <dl style="display:grid;gap:1rem;margin:.4rem 0 0">
              <div><dt class="lbl">Téléphone</dt><dd style="margin:.25rem 0 0"><a href="tel:${contact.phoneHref}">${esc(contact.phoneLabel)}</a></dd></div>
              <div><dt class="lbl">E-mail</dt><dd style="margin:.25rem 0 0"><a href="mailto:${contact.emailHref}">${esc(contact.emailLabel)}</a></dd></div>
              <div><dt class="lbl">Adresse</dt><dd style="margin:.25rem 0 0">${contact.addressLines.map(esc).join("<br>")}</dd></div>
              <div><dt class="lbl">Zone</dt><dd style="margin:.25rem 0 0">50 km autour de Bolbec · Normandie · France selon projet</dd></div>
            </dl>
          </div>
          <div class="card">${icons.clock}<h3 style="font-size:var(--t-h4)">Nos engagements</h3>
            <ul>
              <li>Devis gratuit et sans engagement</li>
              <li>Réponse sous 30 minutes, selon disponibilité</li>
              <li>Astreintes possibles sur demande</li>
            </ul>
          </div>
          <div class="card">${icons.shield}<h3 style="font-size:var(--t-h4)">Vos données</h3>
            <p>Les informations transmises servent uniquement à traiter votre demande. Elles ne sont ni cédées, ni revendues.</p>
            <div style="margin-top:.5rem">${tlink("Politique de confidentialité", "/politique-de-confidentialite/")}</div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</section>

${faqBlock(faq, { title: "Questions sur le devis", eyebrow: "FAQ · Devis" })}
`;

export default {
  path: "/contact/",
  title: "Devis gratuit — vitres et façades | CleanVitreService",
  description: "Demandez un devis gratuit pour le nettoyage de vos vitres, façades ou panneaux solaires. Réponse sous 30 minutes selon disponibilité. Bolbec et Normandie.",
  ogImage: "contact-visuel-band",
  faq,
  body,
};
