import { btn, tlink, img, esc } from "../layout.mjs";
import { faqBlock, finalCta, blocZones, normandieMap } from "../parts.mjs";
import { zones } from "../config.mjs";

const detail = {
  "seine-maritime": {
    im: "normandie-rouen", alt: "Cathédrale de Rouen dominant le centre-ville",
    titre: "Seine-Maritime (76) — Rouen, Le Havre, Dieppe",
    texte: ["C'est le département le plus urbanisé de Normandie, et celui qui concentre le plus de bâtiments relevant de nos méthodes. L'agglomération rouennaise aligne immeubles de bureaux, sièges sociaux, bâtiments administratifs et copropriétés récentes ; Le Havre associe un parc tertiaire reconstruit, un patrimoine en béton très exposé et une activité portuaire et industrielle de premier plan.",
            "Deux facteurs y accélèrent l'encrassement des façades : la pollution atmosphérique urbaine et routière, et l'exposition au climat marin sur la frange littorale, du Havre à Dieppe, où les dépôts salins marquent rapidement les vitrages.",
            "En centre-ville de Rouen comme dans le centre reconstruit du Havre, les voiries étroites et le stationnement contraint orientent souvent l'étude vers les travaux sur cordes. Les zones d'activités périphériques et les sites industriels de la vallée de la Seine se prêtent davantage à la nacelle ou au drone."] },
  calvados: {
    im: "normandie-caen", alt: "Bâtiment ancien à tour horloge dans une ville normande",
    titre: "Calvados (14) — Caen, Lisieux, Bayeux",
    texte: ["Le Calvados combine un pôle administratif et universitaire dense autour de Caen, des zones d'activités importantes, et un littoral touristique qui va de Ouistreham à Honfleur en passant par la côte de Nacre et la côte Fleurie.",
            "Cette double nature se traduit par deux types de demandes : d'un côté les bâtiments tertiaires, les équipements publics et les copropriétés de l'agglomération caennaise ; de l'autre les établissements hôteliers, résidences de tourisme et commerces du littoral, pour lesquels la propreté des façades et des vitrages conditionne directement la perception de l'établissement.",
            "L'exposition marine y est forte sur toute la frange côtière, ce qui justifie souvent une fréquence d'entretien plus soutenue qu'à l'intérieur du département."] },
  eure: {
    im: "secteur-logistique", alt: "Quais de chargement d'une plateforme d'activité",
    titre: "Eure (27) — Évreux, Vernon, Louviers, Val-de-Reuil",
    texte: ["L'Eure présente le tissu industriel et logistique le plus dense de Normandie rapporté à sa population, en particulier le long de l'axe Seine et dans les zones d'activités de Val-de-Reuil, Louviers, Vernon et Évreux. La proximité de l'Île-de-France y a attiré de nombreuses plateformes et sites de production.",
            "Ces bâtiments — entrepôts, ateliers, locaux d'activité — présentent de grandes surfaces de bardage, des lanterneaux, des sheds et des châssis vitrés en hauteur. Leurs abords sont généralement dégagés, ce qui place souvent la nacelle et le drone en tête des méthodes envisageables.",
            "Nous intervenons également sur les bâtiments tertiaires et les équipements publics des agglomérations d'Évreux et de Vernon."] },
  manche: {
    im: "normandie-lehavre", alt: "Conteneurs colorés sur une zone portuaire",
    titre: "Manche (50) — Cherbourg-en-Cotentin, Saint-Lô, Granville, Avranches",
    texte: ["La Manche est un département étendu, et c'est une donnée concrète pour l'organisation d'un chantier : les distances entre Cherbourg-en-Cotentin, Saint-Lô et Avranches imposent de regrouper les interventions lorsque c'est possible.",
            "Le département concentre des sites industriels et portuaires significatifs, notamment autour de Cherbourg, ainsi que des équipements publics et des établissements touristiques sur toute la côte ouest, de Granville au Mont-Saint-Michel.",
            "L'exposition au climat marin y est particulièrement marquée : embruns, vents soutenus et dépôts salins encrassent les surfaces vitrées plus rapidement qu'à l'intérieur des terres. Ce même facteur limite aussi les créneaux favorables à une intervention par drone, le vent étant déterminant."] },
  orne: {
    im: "secteur-collectivites", alt: "Bâtiment administratif public de plusieurs niveaux",
    titre: "Orne (61) — Alençon, Flers, Argentan, L'Aigle",
    texte: ["L'Orne est le plus rural des cinq départements normands, structuré autour de pôles industriels et d'équipements publics plutôt que de grandes agglomérations. L'activité s'organise autour d'Alençon, de Flers, d'Argentan et de L'Aigle.",
            "Les bâtiments concernés y sont principalement des sites de production, des locaux d'activité, des bâtiments administratifs, des établissements scolaires et sportifs, ainsi que des copropriétés et des maisons individuelles comportant de grandes surfaces vitrées.",
            "L'habitat moins dense et les abords généralement dégagés rendent souvent possibles la nacelle et le drone, là où un centre urbain contraint aurait imposé les cordes."] },
};

const faq = [
  { q: "Avez-vous une agence dans ma ville ?",
    a: ["Non, et nous préférons l'écrire clairement. Les villes citées sur cette page sont les principaux pôles que nous desservons depuis la Normandie, pas des implantations permanentes.",
        "Cela ne change rien à notre capacité d'intervention : l'organisation d'un chantier de nettoyage en hauteur se prépare à l'avance, et la distance est intégrée au planning comme au devis."] },
  { q: "Les déplacements sont-ils facturés ?",
    a: ["En Normandie, les déplacements sont intégrés à la proposition et n'apparaissent pas comme une ligne séparée dans la très grande majorité des cas.",
        "Pour les interventions hors Normandie, les frais de déplacement et l'organisation logistique sont chiffrés explicitement dans la proposition, afin que vous sachiez exactement ce que vous payez."] },
  { q: "Pouvez-vous regrouper plusieurs bâtiments proches ?",
    a: ["Oui, et c'est généralement avantageux pour les deux parties. Lorsqu'un donneur d'ordre gère plusieurs bâtiments dans un même secteur — un patrimoine communal, plusieurs agences, un ensemble de copropriétés —, le regroupement des interventions réduit les temps de déplacement et d'installation.",
        "Nous construisons alors un planning d'ensemble et une proposition homogène, tout en adaptant la méthode bâtiment par bâtiment."] },
  { q: "Intervenez-vous vraiment partout en France ?",
    a: ["Oui, lorsque le projet le justifie. Un bâtiment de grande surface, un site multi-implantations, un besoin récurrent ou une configuration nécessitant spécifiquement nos méthodes d'accès peuvent rendre un déplacement pertinent, même loin de la Normandie.",
        "Pour une intervention ponctuelle de faible ampleur à l'autre bout du pays, nous vous le dirons franchement : un prestataire local sera plus pertinent, et nous ne vous laisserons pas payer un déplacement qui n'a pas de sens."] },
];

const body = `
<section class="phero">
  <div class="phero__media">${img("normandie-aerien-band", "Vue aérienne d'une ville normande aux toitures serrées", { sizes: "100vw", eager: true })}</div>
  <div class="phero__in">
    <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>/</span>Zones d'intervention</nav>
    <p class="eyebrow">Normandie · France entière</p>
    <h1>La Normandie en territoire principal, la France selon les projets.</h1>
    <p class="phero__sub">Les cinq départements normands — Calvados, Eure, Manche, Orne et Seine-Maritime — constituent notre zone d'intervention courante. Ailleurs en France, nous nous déplaçons lorsque le projet le justifie.</p>
    <div class="btn-row" style="margin-top:2.2rem">${btn("Demander un devis", "/contact/", "", true)}</div>
  </div>
</section>

${blocZones({ full: true })}

<div class="srv">
  <div class="wrap">
    ${zones.map((z, i) => {
      const d = detail[z.slug];
      return `
    <article class="srv__it rv" id="dep-info-${z.slug}">
      <figure class="srv__fig reveal-img">${img(d.im, d.alt, { sizes: "(max-width:899px) 100vw, 42vw" })}</figure>
      <div class="srv__body">
        <p class="eyebrow">Département ${z.code}</p>
        <h2 style="font-size:var(--t-h3)">${esc(d.titre)}</h2>
        ${d.texte.map(p => `<p>${esc(p)}</p>`).join("")}
        <ul class="srv__list">${z.villes.map(v => `<li>${esc(v)}</li>`).join("")}</ul>
        <div style="margin-top:1.6rem">${tlink("Demander un devis pour ce département", "/contact/")}</div>
      </div>
    </article>`;
    }).join("")}
  </div>
</div>

<section class="sec sec--dark" aria-labelledby="fr-t">
  <div class="wrap">
    <div class="edit edit--7-5">
      <div class="rv">
        <p class="eyebrow">Au-delà de la Normandie</p>
        <h2 id="fr-t" style="max-width:22ch">Des interventions dans toute la France, quand elles ont du sens.</h2>
        <div class="prose" style="margin-top:1.8rem;max-width:58ch">
          <p class="lead">Nos méthodes d'accès ne sont pas liées à un territoire. Ce qui l'est, c'est la logistique : déplacer une équipe, du matériel et, selon la méthode, un engin, suppose que le projet le justifie.</p>
          <p>Nous intervenons donc ailleurs en France pour les projets dont l'ampleur, la récurrence ou la technicité le rendent pertinent : bâtiments de grande surface, patrimoines multi-sites, configurations nécessitant spécifiquement l'une de nos méthodes, besoins d'entretien périodique organisés à l'année.</p>
          <p><strong>À l'inverse, nous ne cherchons pas à vendre un déplacement inutile.</strong> Pour une intervention ponctuelle et de faible ampleur très éloignée de la Normandie, nous vous orienterons vers un prestataire local.</p>
        </div>
      </div>
      <div class="rv" style="--i:1">
        <div class="cards" style="margin-top:0">
          <div class="card"><h3>Projets d'ampleur</h3><p>Bâtiments de grande surface vitrée ou ensembles immobiliers justifiant la mobilisation d'une équipe et de moyens d'accès.</p></div>
          <div class="card"><h3>Patrimoines multi-sites</h3><p>Groupes, enseignes et bailleurs gérant plusieurs implantations, avec une organisation et une proposition homogènes.</p></div>
          <div class="card"><h3>Besoins récurrents</h3><p>Entretien périodique planifié à l'année, où la régularité des passages amortit l'organisation logistique.</p></div>
        </div>
      </div>
    </div>
  </div>
</section>

${faqBlock(faq, { title: "Questions sur nos zones d'intervention", eyebrow: "FAQ · Territoires" })}
${finalCta({ titre: "Où se trouve votre bâtiment ?", texte: "Indiquez-nous sa localisation et sa configuration : nous vous dirons si nous intervenons, dans quelles conditions et selon quelle méthode.", cta: "Demander un devis", image: "normandie-caen-band" })}
`;

export default {
  path: "/zones-intervention/",
  title: "Zones d'intervention : Normandie et France | [NOM DE L'ENTREPRISE]",
  description: "Nettoyage de vitres et de façades en hauteur dans les cinq départements normands — Calvados, Eure, Manche, Orne, Seine-Maritime — et dans toute la France selon les projets.",
  ogImage: "normandie-aerien-band",
  faq,
  body,
};
