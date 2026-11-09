/* ============================================================
   CONFIGURATION CENTRALE — informations de marque et de contact
   ------------------------------------------------------------
   TOUTES les données d'entreprise à remplacer avant la mise en
   ligne sont regroupées ici. Modifier ce seul fichier met à jour
   l'intégralité du site (en-têtes, pieds de page, mentions
   légales, données structurées, métadonnées).
   Les valeurs marquées TODO sont des espaces réservés visibles.
   ============================================================ */

export const brand = {
  // Nom commercial — espace réservé jusqu'à la décision finale.
  name: "[NOM DE L'ENTREPRISE]",
  // Version courte utilisée dans la signature du logo.
  short: "[NOM]",
  tagline: "Nettoyage technique en hauteur",
  baseline: "Drone · Cordes · Nacelle",
  // Laisser `null` tant que le logo définitif n'est pas fourni :
  // le site affiche alors le monogramme vectoriel de substitution.
  logoSrc: null,
  monogram: "N",
};

export const contact = {
  // TODO — à remplacer par les coordonnées réelles.
  phoneLabel: "[TÉLÉPHONE]",
  phoneHref: null,            // ex. "+33200000000"
  emailLabel: "[EMAIL]",
  emailHref: null,            // ex. "contact@exemple.fr"
  addressLines: ["[ADRESSE]", "[CODE POSTAL] [VILLE]", "Normandie, France"],
  hoursLabel: "[HORAIRES D'OUVERTURE]",
  // Réseaux sociaux : ajouter { label, href } quand les comptes existent.
  social: [],
};

export const legalEntity = {
  // TODO — informations légales à compléter (aucune valeur inventée).
  formeJuridique: "[FORME JURIDIQUE]",
  capital: "[CAPITAL SOCIAL]",
  siege: "[ADRESSE DU SIÈGE SOCIAL]",
  siren: "[N° SIREN]",
  siret: "[N° SIRET]",
  rcs: "[VILLE ET N° RCS]",
  tva: "[N° TVA INTRACOMMUNAUTAIRE]",
  responsable: "[NOM DU RESPONSABLE DE LA PUBLICATION]",
  hebergeur: "[NOM, ADRESSE ET TÉLÉPHONE DE L'HÉBERGEUR]",
  assurance: "[ASSUREUR ET N° DE POLICE RESPONSABILITÉ CIVILE]",
  mediateur: "[MÉDIATEUR DE LA CONSOMMATION]",
  dpo: "[CONTACT DÉLÉGUÉ À LA PROTECTION DES DONNÉES]",
};

/* Point de terminaison du formulaire de devis.
   Tant que la valeur est `null`, le formulaire reste entièrement
   fonctionnel côté client (validation, états d'erreur, accessibilité)
   mais n'effectue aucun envoi réseau : il l'indique explicitement à
   l'utilisateur plutôt que de simuler un faux succès.
   Voir INTEGRATION.md pour la configuration.

   En local, le serveur de prévisualisation expose un vrai point de
   réception (`POST /api/devis`) qui valide la demande et l'enregistre
   dans `demandes/`. Il sert à éprouver la chaîne complète ; en
   production, remplacer par l'URL du service retenu. */
export const formEndpoint = "/api/devis";

export const site = {
  // TODO — remplacer par le domaine définitif avant mise en ligne.
  origin: "https://www.exemple-nettoyage-normandie.fr",
  locale: "fr_FR",
  lang: "fr",
};

export const zones = [
  { slug: "seine-maritime", code: "76", nom: "Seine-Maritime",
    villes: ["Rouen", "Le Havre", "Dieppe", "Yvetot", "Elbeuf"],
    resume: "Le département le plus urbanisé de Normandie, avec deux pôles tertiaires et portuaires majeurs." },
  { slug: "calvados", code: "14", nom: "Calvados",
    villes: ["Caen", "Lisieux", "Bayeux", "Hérouville-Saint-Clair", "Vire"],
    resume: "Une activité partagée entre centres administratifs, zones d'activités et littoral touristique." },
  { slug: "eure", code: "27", nom: "Eure",
    villes: ["Évreux", "Vernon", "Louviers", "Val-de-Reuil", "Pont-Audemer"],
    resume: "Un tissu industriel et logistique dense, à l'articulation de la Normandie et de l'Île-de-France." },
  { slug: "manche", code: "50", nom: "Manche",
    villes: ["Cherbourg-en-Cotentin", "Saint-Lô", "Granville", "Avranches", "Coutances"],
    resume: "Un territoire étendu, marqué par les sites industriels, portuaires et l'exposition au climat marin." },
  { slug: "orne", code: "61", nom: "Orne",
    villes: ["Alençon", "Flers", "Argentan", "L'Aigle", "Mortagne-au-Perche"],
    resume: "Un département rural structuré autour de pôles industriels et d'équipements publics." },
];

export const methodes = [
  { slug: "nettoyage-par-drone", nom: "Nettoyage par drone", court: "Drone" },
  { slug: "travaux-sur-cordes", nom: "Travaux sur cordes", court: "Cordes" },
  { slug: "nettoyage-avec-nacelle", nom: "Nettoyage avec nacelle", court: "Nacelle" },
];

export const nav = [
  { href: "/", label: "Accueil" },
  { href: "/services/", label: "Nos services" },
  { href: "/nettoyage-par-drone/", label: "Nettoyage par drone" },
  { href: "/travaux-sur-cordes/", label: "Travaux sur cordes" },
  { href: "/realisations/", label: "Nos réalisations" },
  { href: "/zones-intervention/", label: "Zones d'intervention" },
  { href: "/contact/", label: "Contact" },
];

export const navMobile = [
  ...nav.slice(0, 4),
  { href: "/nettoyage-avec-nacelle/", label: "Nettoyage avec nacelle" },
  { href: "/secteurs-dactivite/", label: "Secteurs d'activité" },
  ...nav.slice(4),
  { href: "/a-propos/", label: "À propos" },
];
