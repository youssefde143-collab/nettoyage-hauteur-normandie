import { btn, tlink, img, esc, ar } from "../layout.mjs";
import { icons, faqBlock, finalCta } from "../parts.mjs";
import { contact, formEndpoint, zones } from "../config.mjs";

const faq = [
  { q: "Quels éléments faut-il réunir avant de demander un devis ?",
    a: ["L'adresse du bâtiment, sa hauteur ou son nombre de niveaux, le type de surfaces concernées (vitrages, façade, bardage, verrière), une estimation des surfaces et la fréquence souhaitée.",
        "Quelques photographies extérieures prises depuis plusieurs angles font gagner beaucoup de temps : elles permettent d'apprécier les accès, les abords, la géométrie de la façade et l'état des surfaces. Le formulaire permet de les joindre directement."] },
  { q: "Une visite sur site est-elle nécessaire ?",
    a: ["Pas systématiquement. Pour de nombreux bâtiments, la description et les photographies suffisent à établir une proposition fiable.",
        "Une visite devient nécessaire lorsque la configuration est complexe, lorsque les points d'ancrage doivent être vérifiés, lorsque la portance du sol est en question, ou lorsque le périmètre à traiter doit être précisément délimité. Nous vous le dirons après examen de votre demande."] },
  { q: "Le devis est-il payant ?",
    a: ["Non. L'étude de votre demande et la remise d'une proposition n'entraînent aucun frais.",
        "Si une visite sur site approfondie, un relevé ou une expertise spécifique s'avéraient nécessaires au-delà de l'étude courante, cela vous serait indiqué et validé avec vous au préalable."] },
  { q: "Dans quel délai recevrai-je une réponse ?",
    a: ["Nous ne publions pas d'engagement de délai chiffré sur ce site, pour ne pas annoncer ce que nous ne pourrions pas garantir en toute circonstance.",
        "Concrètement, nous accusons réception de votre demande et revenons vers vous pour les précisions techniques manquantes, puis nous vous indiquons le délai dans lequel la proposition vous parviendra."] },
];

const field = (id, label, input, { hint = "", req = false } = {}) => `
<div class="field">
  <label for="${id}">${esc(label)}${req ? ' <span class="req" aria-hidden="true">*</span>' : ' <span class="opt">(facultatif)</span>'}</label>
  ${input}
  ${hint ? `<p class="field__hint" id="${id}-hint">${hint}</p>` : ""}
  <p class="field__err" id="${id}-err" aria-live="polite"></p>
</div>`;

const body = `
<section class="phero phero--flat">
  <div class="phero__media">${img("contact-visuel-band", "Immeuble de grande hauteur à trame vitrée régulière", { sizes: "100vw", eager: true })}</div>
  <div class="phero__in">
    <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>/</span>Contact et devis</nav>
    <p class="eyebrow">Parlons de votre projet</p>
    <h1>Décrivez-nous votre bâtiment.</h1>
    <p class="phero__sub">Plus votre description est précise, plus notre réponse sera utile. Hauteur, type de surfaces, abords, contraintes d'exploitation : chaque élément compte dans le choix de la méthode.</p>
  </div>
</section>

<section class="sec sec--dark" id="formulaire" aria-labelledby="f-t" style="padding-top:clamp(3rem,6vw,5rem)">
  <div class="wrap">
    <div class="edit edit--7-5 edit--aside" style="align-items:start">

      <div class="rv">
        <h2 id="f-t" style="font-size:var(--t-h3)">Formulaire de demande de devis</h2>
        <p class="lead" style="font-size:var(--t-body);margin-top:1rem;max-width:56ch">Les champs marqués d'un astérisque sont obligatoires. Vous pouvez joindre des photographies : c'est l'information la plus utile pour nous.</p>

        <form class="form" id="form-devis" style="margin-top:2.4rem" novalidate
              ${formEndpoint ? `action="${formEndpoint}" data-endpoint="${formEndpoint}"` : 'data-endpoint=""'}
              method="post" enctype="multipart/form-data">

          <p id="form-status" class="form__status" aria-live="polite"></p>

          <fieldset style="border:0;padding:0;margin:0;display:grid;gap:inherit">
            <legend class="eyebrow" style="margin-bottom:1.2rem">01 — Vous</legend>
            <div class="form__grid form__grid--2">
              ${field("nom", "Nom et prénom", `<input id="nom" name="nom" type="text" autocomplete="name" required aria-describedby="nom-err" placeholder="Camille Durand">`, { req: true })}
              ${field("entreprise", "Entreprise ou organisation", `<input id="entreprise" name="entreprise" type="text" autocomplete="organization" aria-describedby="entreprise-err" placeholder="Raison sociale">`)}
            </div>
            <div class="form__grid form__grid--2">
              ${field("email", "Adresse e-mail", `<input id="email" name="email" type="email" autocomplete="email" required aria-describedby="email-err" placeholder="camille.durand@exemple.fr">`, { req: true })}
              ${field("telephone", "Téléphone", `<input id="telephone" name="telephone" type="tel" autocomplete="tel" required aria-describedby="telephone-err" placeholder="06 00 00 00 00">`, { req: true })}
            </div>
            ${field("typeClient", "Vous êtes", `
              <select id="typeClient" name="type_client" required aria-describedby="typeClient-err">
                <option value="">Sélectionnez…</option>
                <option>Entreprise</option>
                <option>Site industriel</option>
                <option>Immeuble de bureaux</option>
                <option>Propriétaire ou investisseur immobilier</option>
                <option>Syndic ou gestionnaire de copropriété</option>
                <option>Hôtellerie ou hébergement</option>
                <option>Collectivité ou administration</option>
                <option>Bailleur social</option>
                <option>Particulier</option>
                <option>Autre</option>
              </select>`, { req: true })}
          </fieldset>

          <fieldset style="border:0;padding:0;margin:1.4rem 0 0;display:grid;gap:var(--gut-f,1.2rem)">
            <legend class="eyebrow" style="margin-bottom:1.2rem">02 — Le bâtiment</legend>
            ${field("prestation", "Type de prestation souhaitée", `
              <select id="prestation" name="prestation" required aria-describedby="prestation-err">
                <option value="">Sélectionnez…</option>
                <option>Nettoyage par drone</option>
                <option>Travaux sur cordes</option>
                <option>Nettoyage avec nacelle</option>
                <option>Je ne sais pas quelle solution choisir</option>
                <option>Autre</option>
              </select>`, { hint: "Si vous hésitez, choisissez « Je ne sais pas » : c'est précisément notre travail de trancher.", req: true })}
            <div class="form__grid form__grid--2">
              ${field("localisation", "Localisation du bâtiment", `<input id="localisation" name="localisation" type="text" required aria-describedby="localisation-err" placeholder="Ville et code postal">`, { req: true })}
              ${field("departement", "Département", `
                <select id="departement" name="departement" aria-describedby="departement-err">
                  <option value="">Sélectionnez…</option>
                  ${zones.map(z => `<option>${z.nom} (${z.code})</option>`).join("")}
                  <option>Autre département en France</option>
                </select>`)}
            </div>
            <div class="form__grid form__grid--2">
              ${field("typeBatiment", "Type de bâtiment", `
                <select id="typeBatiment" name="type_batiment" required aria-describedby="typeBatiment-err">
                  <option value="">Sélectionnez…</option>
                  <option>Immeuble de bureaux</option>
                  <option>Bâtiment industriel ou atelier</option>
                  <option>Entrepôt ou plateforme logistique</option>
                  <option>Bâtiment commercial ou centre commercial</option>
                  <option>Hôtel ou résidence</option>
                  <option>Copropriété ou immeuble d'habitation</option>
                  <option>Bâtiment public ou équipement</option>
                  <option>Établissement scolaire ou sportif</option>
                  <option>Maison individuelle ou véranda</option>
                  <option>Autre</option>
                </select>`, { req: true })}
              ${field("hauteur", "Hauteur ou nombre de niveaux", `<input id="hauteur" name="hauteur" type="text" aria-describedby="hauteur-err" placeholder="Ex. 6 niveaux, environ 20 m">`)}
            </div>
            ${field("description", "Description de votre projet", `<textarea id="description" name="description" required aria-describedby="description-err" placeholder="Surfaces à traiter (vitrages, façade, bardage, verrière), surface approximative, état des surfaces, abords du bâtiment, contraintes d'accès ou d'exploitation, fréquence souhaitée…"></textarea>`, { req: true })}
            <div class="field">
              <label for="photos">Photographies du bâtiment <span class="opt">(facultatif)</span></label>
              <label class="file" for="photos">
                <input id="photos" name="photos[]" type="file" accept="image/*,.pdf" multiple aria-describedby="photos-hint photos-err">
                <span><b>Déposer vos photographies ici</b>Ou cliquez pour parcourir vos fichiers</span>
              </label>
              <p class="field__hint" id="photos-hint">Jusqu'à 5 fichiers, 8 Mo maximum par fichier. Formats image ou PDF. Des vues prises depuis plusieurs angles sont idéales.</p>
              <p class="field__err" id="photos-err" aria-live="polite"></p>
            </div>
          </fieldset>

          <fieldset style="border:0;padding:0;margin:1.4rem 0 0;display:grid;gap:1.2rem">
            <legend class="eyebrow" style="margin-bottom:1.2rem">03 — Consentement</legend>
            <div>
              <label class="check" for="consentement">
                <input id="consentement" name="consentement" type="checkbox" required aria-describedby="consentement-err">
                <span>J'accepte que les informations transmises soient utilisées pour traiter ma demande et me recontacter. Elles ne sont ni cédées ni revendues à des tiers. <a href="/politique-de-confidentialite/">Politique de confidentialité</a>. <span class="req" aria-hidden="true">*</span></span>
              </label>
              <p class="field__err" id="consentement-err" aria-live="polite"></p>
            </div>
            <button class="btn btn--lg" type="submit" style="justify-content:space-between">Envoyer ma demande${ar()}</button>
            <p class="field__hint">Aucune information n'est transmise avant la validation du formulaire.</p>
          </fieldset>
        </form>
      </div>

      <aside class="rv" style="--i:1">
        <div class="cards" style="margin-top:0">
          <div class="card">
            <h3 style="font-size:var(--t-h4)">Nous joindre directement</h3>
            <dl style="display:grid;gap:1rem;margin:.4rem 0 0">
              <div><dt class="lbl">Téléphone</dt>
                <dd style="margin:.25rem 0 0">${contact.phoneHref ? `<a href="tel:${contact.phoneHref}">${esc(contact.phoneLabel)}</a>` : `<span class="ph">${esc(contact.phoneLabel)}</span>`}</dd></div>
              <div><dt class="lbl">E-mail</dt>
                <dd style="margin:.25rem 0 0">${contact.emailHref ? `<a href="mailto:${contact.emailHref}">${esc(contact.emailLabel)}</a>` : `<span class="ph">${esc(contact.emailLabel)}</span>`}</dd></div>
              <div><dt class="lbl">Adresse</dt>
                <dd style="margin:.25rem 0 0"><span class="ph">${contact.addressLines.map(esc).join("<br>")}</span></dd></div>
              <div><dt class="lbl">Horaires</dt>
                <dd style="margin:.25rem 0 0"><span class="ph">${esc(contact.hoursLabel)}</span></dd></div>
              <div><dt class="lbl">Zone d'intervention</dt>
                <dd style="margin:.25rem 0 0">Normandie · France entière</dd></div>
            </dl>
          </div>
          <div class="card">${icons.study}<h3 style="font-size:var(--t-h4)">Ce qui se passe ensuite</h3>
            <ul>
              <li>Nous accusons réception de votre demande</li>
              <li>Nous revenons vers vous sur les points techniques manquants</li>
              <li>Nous étudions la faisabilité des différentes méthodes</li>
              <li>Une visite est organisée si la configuration l'exige</li>
              <li>Vous recevez une proposition détaillée</li>
            </ul>
          </div>
          <div class="card">${icons.shield}<h3 style="font-size:var(--t-h4)">Vos données</h3>
            <p>Les informations transmises servent uniquement à traiter votre demande. Elles ne sont ni cédées, ni revendues, ni utilisées à des fins publicitaires.</p>
            <div style="margin-top:.5rem">${tlink("Politique de confidentialité", "/politique-de-confidentialite/")}</div>
          </div>
        </div>
      </aside>

    </div>
  </div>
</section>

<section class="sec" aria-labelledby="h-t">
  <div class="wrap">
    <div class="shead rv">
      <div><p class="eyebrow">Avant de nous écrire</p><h2 id="h-t">Trois informations qui changent tout.</h2></div>
      <div class="shead__aside"><p class="lead" style="font-size:var(--t-body)">Si vous ne devez nous transmettre que trois choses, ce sont celles-ci.</p></div>
    </div>
    <div class="cards cards--3">
      <div class="card rv"><h3>La hauteur</h3><p>Le nombre de niveaux ou une hauteur approximative. C'est le premier critère qui écarte ou retient chacune des trois méthodes.</p></div>
      <div class="card rv" style="--i:1"><h3>Les abords</h3><p>Ce qu'il y a au pied du bâtiment : parking, voirie, trottoir, verrière, plantations, dénivelé. Cela détermine la faisabilité de la nacelle et du drone.</p></div>
      <div class="card rv" style="--i:2"><h3>Des photographies</h3><p>Deux ou trois vues extérieures prises depuis des angles différents valent mieux qu'une longue description. Elles montrent la géométrie, l'état des surfaces et les accès.</p></div>
    </div>
  </div>
</section>

${faqBlock(faq, { title: "Questions sur la demande de devis", eyebrow: "FAQ · Devis" })}
`;

export default {
  path: "/contact/",
  title: "Contact et demande de devis | [NOM DE L'ENTREPRISE]",
  description: "Demandez un devis pour le nettoyage de vos vitres ou façades en hauteur : drone, cordes ou nacelle. Formulaire détaillé et dépôt de photographies.",
  ogImage: "contact-visuel-band",
  faq,
  body,
};
