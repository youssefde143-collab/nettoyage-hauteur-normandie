import { btn, tlink, img, esc } from "../layout.mjs";
import { faqBlock, finalCta, finalCta as _f, processus } from "../parts.mjs";

const items = [
  { id: "industrie", nom: "Industrie", im: "secteur-industrie",
    alt: "Bâtiment industriel de grande emprise sous un ciel dégagé",
    chapeau: "Sites de production, ateliers, bâtiments techniques",
    texte: ["Les bâtiments industriels combinent deux difficultés : de grandes surfaces à traiter — bardages, sheds, lanterneaux, châssis vitrés en hauteur — et un encrassement souvent accéléré par l'activité elle-même, les poussières et les rejets atmosphériques.",
            "L'avantage de ces sites est généralement leur dégagement : cours, voies internes et aires de manœuvre permettent souvent le positionnement d'une nacelle ou le vol d'un drone dans de bonnes conditions. L'organisation doit en revanche composer avec la circulation d'engins, les zones à risque et la continuité de la production."],
    points: ["Bardages et parois translucides", "Lanterneaux et sheds", "Châssis vitrés en hauteur", "Intervention sans arrêt de production"] },
  { id: "immobilier-commercial", nom: "Immobilier commercial", im: "secteur-commerce",
    alt: "Entrée vitrée d'un bâtiment commercial contemporain avec parvis",
    chapeau: "Centres commerciaux, retail parks, enseignes",
    texte: ["Pour un commerce, la propreté de la façade vitrée n'est pas un détail d'entretien : c'est la première chose que voit le client. Les entrées, les vitrines et les verrières de galerie se salissent vite et se remarquent immédiatement.",
            "Ces bâtiments imposent une contrainte forte d'horaires : l'intervention doit se dérouler sans gêner l'accès du public ni la livraison des enseignes. Nous planifions donc fréquemment ces chantiers en début de matinée, en soirée ou lors des jours de fermeture."],
    points: ["Vitrines et entrées", "Verrières de galerie", "Enseignes et auvents", "Interventions hors heures d'affluence"] },
  { id: "bureaux", nom: "Bureaux", im: "secteur-bureaux",
    alt: "Immeuble de bureaux contemporain à façade entièrement vitrée",
    chapeau: "Immeubles tertiaires, sièges sociaux, parcs d'affaires",
    texte: ["L'immeuble de bureaux est le terrain type du nettoyage de façade en hauteur : murs-rideaux, grandes trames vitrées régulières, parfois plusieurs dizaines de niveaux. La qualité de la lumière intérieure et le confort visuel des occupants en dépendent directement.",
            "Ce sont également les bâtiments pour lesquels les trois méthodes sont le plus souvent comparables, et où l'étude apporte le plus de valeur : une tour en cœur de ville relèvera des cordes, un immeuble de parc d'affaires aux abords dégagés pourra être traité au drone ou à la nacelle."],
    points: ["Murs-rideaux et grandes trames vitrées", "Immeubles de grande hauteur", "Entretien périodique planifié", "Bâtiments occupés en continu"] },
  { id: "hotellerie", nom: "Hôtellerie", im: "secteur-hotellerie",
    alt: "Façade d'un établissement hôtelier comportant de nombreuses fenêtres",
    chapeau: "Hôtels, résidences, établissements recevant du public",
    texte: ["Dans l'hôtellerie, la vue depuis la chambre fait partie de la prestation vendue. Une vitre encrassée se voit, et se retrouve dans les commentaires des clients. La façade, elle, participe directement à la perception de l'établissement depuis la rue.",
            "La difficulté est opérationnelle : l'établissement ne ferme pas. L'intervention doit être discrète, progresser par zones, respecter le repos des clients et s'accorder avec le planning d'occupation. Les travaux sur cordes, qui n'immobilisent aucun espace au sol, y sont souvent la méthode la plus adaptée."],
    points: ["Vitrages de chambres", "Façades et balcons", "Verrières et volumes communs", "Progression par zones, sans fermeture"] },
  { id: "coproprietes", nom: "Copropriétés", im: "secteur-copropriete",
    alt: "Immeuble d'habitation récent avec balcons vitrés reflétant le ciel",
    chapeau: "Syndics, gestionnaires, conseils syndicaux",
    texte: ["Pour une copropriété, le nettoyage des parties vitrées communes et des façades est une dépense votée, donc discutée. Le gestionnaire a besoin d'une proposition claire : périmètre exact des surfaces traitées, méthode retenue, durée, impact sur le stationnement et l'accès des résidents.",
            "Nous construisons nos propositions dans cette logique, de façon à ce qu'elles puissent être présentées en assemblée générale sans ambiguïté. L'information des résidents en amont de l'intervention fait également partie de la préparation."],
    points: ["Cages d'escalier et parties communes vitrées", "Façades et garde-corps vitrés", "Devis présentable en assemblée générale", "Information des résidents"] },
  { id: "collectivites", nom: "Collectivités", im: "secteur-collectivites",
    alt: "Bâtiment administratif public de plusieurs niveaux en façade claire",
    chapeau: "Communes, intercommunalités, bailleurs publics",
    texte: ["Les collectivités gèrent un patrimoine hétérogène : mairies, écoles, gymnases, médiathèques, centres techniques, logements. Chaque bâtiment a sa propre configuration, et un même marché peut en concerner plusieurs dizaines.",
            "Nous savons travailler sur des patrimoines multiples, en proposant méthode et planning bâtiment par bâtiment. La présence de public — et notamment d'enfants dans les établissements scolaires — impose une attention particulière aux périmètres de sécurité et au choix des créneaux d'intervention, souvent pendant les vacances scolaires."],
    points: ["Patrimoines multi-sites", "Établissements scolaires et sportifs", "Bâtiments administratifs", "Créneaux adaptés à la présence de public"] },
  { id: "batiments-publics", nom: "Bâtiments publics et équipements", im: "secteur-logistique",
    alt: "Quais de chargement d'un bâtiment d'exploitation",
    chapeau: "Équipements recevant du public, plateformes, bâtiments d'exploitation",
    texte: ["Gares, pôles d'échange, salles de spectacle, équipements sportifs, plateformes logistiques : ces bâtiments associent souvent de très grandes surfaces vitrées, des volumes importants et une fréquentation continue.",
            "Les contraintes y sont davantage organisationnelles que techniques : coactivité avec d'autres intervenants, flux de public ou de marchandises à préserver, créneaux d'accès restreints. La préparation du chantier compte alors autant que son exécution."],
    points: ["Grandes verrières et halls", "Coactivité sur site", "Flux de public à préserver", "Créneaux d'accès restreints"] },
  { id: "particuliers", nom: "Particuliers", im: "secteur-particuliers",
    alt: "Maison contemporaine dotée de grandes baies vitrées et d'une véranda",
    chapeau: "Maisons, vérandas, grandes surfaces vitrées",
    texte: ["Nous intervenons aussi chez les particuliers, dès lors que la configuration justifie un moyen d'accès professionnel : véranda, verrière, baies de grande hauteur, pignon vitré, maison d'architecte, surfaces inaccessibles depuis une échelle.",
            "Pour une vitre de rez-de-chaussée, notre intervention n'a pas d'intérêt économique et nous le dirons. En revanche, pour tout ce qui suppose de travailler en hauteur en sécurité, elle a tout son sens — et vaut mieux qu'une échelle instable."],
    points: ["Vérandas et verrières", "Baies de grande hauteur", "Pignons vitrés", "Maisons d'architecte"] },
];

const faq = [
  { q: "Travaillez-vous avec des donneurs d'ordre publics ?",
    a: ["Oui. Nous répondons aux consultations des communes, intercommunalités, bailleurs sociaux et établissements publics, y compris pour des patrimoines comportant plusieurs bâtiments.",
        "Nous pouvons fournir une proposition détaillée bâtiment par bâtiment, précisant pour chacun la méthode retenue, les surfaces concernées et les contraintes d'intervention."] },
  { q: "Pouvez-vous intervenir sur plusieurs sites d'un même groupe ?",
    a: ["Oui. Lorsqu'un donneur d'ordre gère plusieurs implantations — agences, points de vente, sites industriels —, nous construisons un planning d'ensemble et une proposition homogène, tout en adaptant la méthode à chaque bâtiment.",
        "Ce fonctionnement vaut en Normandie comme ailleurs en France, les déplacements étant alors intégrés à l'étude."] },
  { q: "Intervenez-vous en présence de public ?",
    a: ["Oui, c'est le cas sur une grande partie de nos chantiers : commerces, hôtels, bâtiments administratifs, établissements scolaires. Cela impose des périmètres de sécurité au sol, une progression par zones et, souvent, des créneaux d'intervention décalés.",
        "Dans les établissements accueillant des enfants, nous privilégions les périodes de vacances scolaires ou les horaires de fermeture."] },
];

const body = `
<section class="phero phero--flat">
  <div class="phero__media">${img("facade-detail-1-band", "Photographie architecturale de bâtiments de verre", { sizes: "100vw", eager: true })}</div>
  <div class="phero__in">
    <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>/</span>Secteurs d'activité</nav>
    <p class="eyebrow">Pour qui nous intervenons</p>
    <h1>Des contraintes très différentes derrière un même besoin.</h1>
    <p class="phero__sub">Un site industriel, un hôtel en pleine saison et une copropriété de centre-ville ne se nettoient pas de la même manière — ni au même moment, ni avec les mêmes moyens d'accès.</p>
    <div class="btn-row" style="margin-top:2.2rem">${btn("Demander un devis", "/contact/", "", true)}</div>
  </div>
</section>

<nav class="sec sec--paper" style="padding-block:clamp(1.6rem,3vw,2.4rem)" aria-label="Accès rapide aux secteurs">
  <div class="wrap">
    <div class="filters" style="margin-bottom:0">
      ${items.map(i => `<a class="btn btn--ghost" style="padding:.56rem 1.05rem;font-size:var(--t-small);border-radius:100px" href="#${i.id}">${esc(i.nom)}</a>`).join("")}
    </div>
  </div>
</nav>

<div class="srv">
  <div class="wrap">
    ${items.map((it, n) => `
    <article class="srv__it rv" id="${it.id}">
      <figure class="srv__fig reveal-img">${img(it.im, it.alt, { sizes: "(max-width:899px) 100vw, 42vw" })}</figure>
      <div class="srv__body">
        <p class="eyebrow">${String(n + 1).padStart(2, "0")} · ${esc(it.chapeau)}</p>
        <h2 style="font-size:var(--t-h3)">${esc(it.nom)}</h2>
        ${it.texte.map(p => `<p>${esc(p)}</p>`).join("")}
        <ul class="srv__list">${it.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
        <div style="margin-top:1.6rem;display:flex;gap:1.4rem;flex-wrap:wrap">${tlink("Demander un devis pour ce type de bâtiment", "/contact/")}</div>
      </div>
    </article>`).join("")}
  </div>
</div>

${processus()}
${faqBlock(faq, { title: "Questions des donneurs d'ordre", eyebrow: "FAQ · Secteurs" })}
${finalCta({ titre: "Votre secteur n'apparaît pas dans cette liste ?", texte: "Ce n'est pas un problème : ce qui détermine notre intervention, c'est la configuration du bâtiment, pas son usage. Décrivez-nous le vôtre.", cta: "Parler de votre projet", image: "real-14-band" })}
`;

export default {
  path: "/secteurs-dactivite/",
  title: "Secteurs d'activité | [NOM DE L'ENTREPRISE]",
  description: "Nettoyage de vitres et de façades pour l'industrie, les bureaux, l'hôtellerie, les copropriétés, les collectivités et les particuliers, en Normandie.",
  ogImage: "facade-detail-1-band",
  faq,
  body,
};
