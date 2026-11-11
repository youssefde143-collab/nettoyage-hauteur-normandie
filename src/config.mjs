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
  name: "CleanVitreService",
  // Découpage du mot-signe : la typographie différencie les trois segments.
  wordmark: ["Clean", "Vitre", "Service"],
  short: "CVS",
  tagline: "Nettoyage de vitres, façades et surfaces difficiles d'accès",
  baseline: "Vitres · Façades · Accès difficiles",
  /* Logo officiel, détourné de la capture fournie par l'entreprise
     (scripts/logo-extraction.py). Deux déclinaisons : l'originale pour les
     fonds clairs, et une version inversée pour les fonds sombres, où le
     bleu marine des lettres serait illisible. Le pictogramme, qui porte sa
     propre plaque marine, est identique dans les deux. */
  logo: {
    clair:  "/assets/img/logo-cvs-560.png",        // lettres marine — fonds clairs
    clair2: "/assets/img/logo-cvs-1100.png",
    sombre: "/assets/img/logo-cvs-clair-560.png",  // lettres blanches — fonds sombres
    sombre2:"/assets/img/logo-cvs-clair-1100.png",
    icone:  "/assets/img/logo-cvs-icone-192.png",
    icone2: "/assets/img/logo-cvs-icone-512.png",
    w: 1100, h: 184,
  },
};

export const contact = {
  phoneLabel: "06 41 01 96 43",
  phoneHref: "+33641019643",
  emailLabel: "cleanvitreservice@gmail.com",
  emailHref: "cleanvitreservice@gmail.com",
  addressLines: ["4 ruelle de l'Hôtel de Ville", "76210 Bolbec", "Seine-Maritime, Normandie"],
  ville: "Bolbec",
  // Engagements communiqués par l'entreprise, repris tels quels.
  devisGratuit: "Devis gratuit",
  delaiReponse: "Réponse à votre demande sous 30 minutes, selon disponibilité.",
  astreintes: "Astreintes possibles sur demande.",
  // Réseaux sociaux : ajouter { label, href } quand les comptes existent.
  social: [],
};

export const legalEntity = {
  denomination: "CleanVitreService",
  dirigeant: "Noah Lefebvre",
  formeJuridique: "Entreprise individuelle (micro-entreprise)",
  siege: "4 ruelle de l'Hôtel de Ville, 76210 Bolbec",
  siren: "101 837 474",
  siret: "101 837 474 00010",
  responsable: "Noah Lefebvre",
  // À compléter lorsque l'entreprise aura transmis les pièces.
  // Rien n'est inventé : ces mentions restent des espaces réservés visibles.
  tva: "[N° TVA INTRACOMMUNAUTAIRE OU MENTION DE FRANCHISE EN BASE]",
  hebergeur: "GitHub Pages — GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis",
  assurance: "[ASSUREUR ET N° DE POLICE RESPONSABILITÉ CIVILE PROFESSIONNELLE]",
  mediateur: "[MÉDIATEUR DE LA CONSOMMATION]",
  dpo: "Noah Lefebvre — cleanvitreservice@gmail.com",
};

/* Point de réception du formulaire de devis.
   `null` tant qu'aucun service d'acheminement n'est raccordé : le
   formulaire bascule alors sur un envoi par le logiciel de messagerie
   du visiteur (pré-rempli, destinataire réel). Aucun faux succès n'est
   jamais affiché. Voir INTEGRATION.md. */
export const formEndpoint = null;

/* ---------- Parrainage ----------
   Offre arrêtée par l'entreprise. Ne pas la modifier sans son accord :
     — le filleul obtient 20 % sur sa PREMIÈRE intervention ;
     — le parrain ne reçoit aucun avantage supplémentaire.
   Un seul endroit à changer, et tout le site suit : bandeau, section
   d'accueil, page dédiée, champ du formulaire.

   `endpoint` est le service de vérification des codes. Tant qu'il vaut
   `null`, AUCUN code ne peut être déclaré valide par le site : la saisie
   n'est contrôlée que sur sa forme, et le visiteur est informé que la
   vérification sera faite par l'entreprise à réception de sa demande.
   Voir INTEGRATION.md pour le dos technique à raccorder. */
export const parrainage = {
  reduction: 20,
  endpoint: null,
  // Forme des codes émis. Le contrôle de saisie, l'exemple affiché et le
  // texte d'aide découlent tous de ces deux valeurs.
  format: "^CVS-[A-Z0-9]{6}$",
  exemple: "CVS-7KD2QX",
};

export const site = {
  // Domaine actuel. À remplacer le jour où un nom de domaine propre est acquis.
  origin: "https://youssefde143-collab.github.io/nettoyage-hauteur-normandie",
  locale: "fr_FR",
  lang: "fr",
};

export const zones = [
  { slug: "seine-maritime", code: "76", nom: "Seine-Maritime",
    villes: ["Bolbec", "Le Havre", "Rouen", "Yvetot", "Lillebonne", "Fécamp", "Dieppe"],
    resume: "Le département du siège. Bolbec se situe entre Le Havre et Rouen, au cœur du pays de Caux." },
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

/* ---------- Prestations : ce que nous nettoyons ---------- */
export const prestations = [
  {
    slug: "vitrerie", titre: "Vitrerie", court: "Vitres et surfaces vitrées",
    resume: "Vitres, baies, vérandas, verrières et vitrines, à l'intérieur comme à l'extérieur.",
    items: ["Vitres intérieures et extérieures", "Baies vitrées", "Vérandas", "Verrières et puits de lumière",
            "Velux et fenêtres de toit", "Vitrines commerciales"],
    im: "vitre-nettoyage", alt: "Intervenants nettoyant les vitrages d'un bâtiment moderne en verre",
  },
  {
    slug: "exterieur", titre: "Extérieur du bâtiment", court: "Façades et surfaces extérieures",
    resume: "Façades, bardages et éléments extérieurs dont l'état du support permet le nettoyage.",
    items: ["Façades de bâtiment", "Bardages", "Surfaces extérieures adaptées",
            "Panneaux publicitaires", "Volets roulants"],
    im: "facade-detail-3", alt: "Gratte-ciel contemporain à façade de verre en gradins",
  },
  {
    slug: "specialise", titre: "Nettoyage spécialisé", court: "Panneaux solaires, accès difficiles",
    resume: "Panneaux solaires et photovoltaïques, et toutes les surfaces que l'on n'atteint pas simplement.",
    items: ["Panneaux solaires et photovoltaïques", "Surfaces difficiles d'accès"],
    im: "real-04", alt: "Intervenant suspendu par cordes sur le flanc d'un bâtiment",
  },
];

/* ---------- Méthodes d'accès : comment nous y accédons ----------
   Quatre méthodes. Les deux dernières disposent d'une page dédiée ;
   les deux premières relèvent de l'intervention courante. */
export const methodes = [
  { n: "01", slug: null, nom: "Nettoyage conventionnel", court: "Matériel professionnel au sol",
    phrase: "Matériel professionnel de laveur de vitres pour les surfaces accessibles depuis le sol.",
    im: "vitre-nettoyage", alt: "Nettoyage de vitrages au matériel professionnel", ico: "gear" },
  { n: "02", slug: null, lien: "/services/#acc-t", vedette: true,
    nom: "Perche télescopique", court: "Jusqu'aux étages hauts depuis le sol",
    phrase: "Eau purifiée et perches pour atteindre les niveaux hauts sans installation lourde.",
    apps: ["Vitrages des premiers niveaux", "Vérandas et verrières", "Vitrines commerciales", "Bâtiments bas aux abords dégagés"],
    /* Aucune photographie disponible ne montre une perche télescopique.
       Plutôt qu'une image de travaux sur cordes qui tromperait sur la
       méthode, l'emplacement reste réservé jusqu'à ce que l'entreprise
       fournisse une photographie d'intervention. */
    im: null, attente: "Intervention à la perche télescopique",
    alt: "", ico: "layers" },
  { n: "03", slug: "travaux-sur-cordes", lien: "/travaux-sur-cordes/", vedette: true,
    nom: "Travaux sur cordes", court: "Accès technique au contact",
    phrase: "La corde suit la façade là où aucun engin ne passe : décrochés, surplombs, centres urbains.",
    apps: ["Immeubles de grande hauteur", "Façades à géométrie complexe", "Décrochés et surplombs", "Cœurs de ville contraints"],
    im: "methode-cordes", pos: "78% 45%", alt: "Techniciens cordistes suspendus le long d'un immeuble", ico: "cordes" },
  { n: "04", slug: "nettoyage-par-drone", lien: "/nettoyage-par-drone/", vedette: true,
    nom: "Nettoyage par drone", court: "Sans contact, depuis le sol",
    phrase: "Pour certaines façades difficiles d'accès, l'appareil travaille et les équipes restent au sol.",
    apps: ["Grandes surfaces de façade", "Bardages industriels", "Surfaces hors de portée depuis le sol", "Sites où l'équipe doit rester au sol"],
    im: "methode-drone", alt: "Drone professionnel en vol utilisé pour le nettoyage de surfaces vitrées", ico: "drone" },
];

/* Les deux méthodes disposant d'une page dédiée. */
export const methodesPages = methodes.filter(m => m.slug);

/* Les trois moyens d'accès mis en avant sur la page d'accueil. Le
   nettoyage conventionnel reste présenté dans la page Services : c'est
   le socle du métier, pas une méthode d'accès en hauteur. */
export const methodesVedettes = methodes.filter(m => m.vedette);

/* ---------- Clientèles ---------- */
export const clienteles = [
  { slug: "particuliers", nom: "Particuliers",
    resume: "Maisons, vérandas, verrières et baies vitrées, y compris aux étages.",
    items: ["Vitres et baies vitrées", "Vérandas et verrières", "Velux et fenêtres de toit", "Panneaux solaires"],
    im: "secteur-particuliers", alt: "Maison contemporaine dotée de grandes baies vitrées et d'une véranda" },
  { slug: "commercants", nom: "Commerçants et professionnels",
    resume: "Vitrines, enseignes et devantures, nettoyées en dehors des heures d'affluence.",
    items: ["Vitrines commerciales", "Devantures et enseignes", "Panneaux publicitaires", "Entretien régulier"],
    im: "secteur-commerce", alt: "Entrée vitrée d'un bâtiment commercial contemporain" },
  { slug: "entreprises", nom: "Entreprises, industries et immobilier",
    resume: "Bureaux, sites de production, entrepôts et patrimoines gérés.",
    items: ["Façades et murs-rideaux", "Bardages industriels", "Verrières et lanterneaux", "Copropriétés et gestion locative"],
    im: "secteur-industrie", alt: "Bâtiment industriel de grande emprise sous un ciel dégagé" },
  { slug: "collectivites", nom: "Collectivités et établissements publics",
    resume: "Mairies, écoles, équipements sportifs et bâtiments administratifs.",
    items: ["Bâtiments administratifs", "Établissements scolaires", "Équipements sportifs", "Patrimoines multi-sites"],
    im: "secteur-collectivites", alt: "Bâtiment administratif public de plusieurs niveaux" },
];

export const nav = [
  { href: "/services/", label: "Nos méthodes" },
  { href: "/secteurs-dactivite/", label: "Secteurs" },
  { href: "/realisations/", label: "Réalisations" },
  { href: "/zones-intervention/", label: "Zones" },
  { href: "/a-propos/", label: "À propos" },
];

/* Menu mobile — arborescence complète, groupée. */
export const navMobile = [
  { href: "/", label: "Accueil" },
  { href: "/services/", label: "Nos méthodes" },
  { href: "/nettoyage-par-drone/", label: "Nettoyage par drone", sub: true },
  { href: "/travaux-sur-cordes/", label: "Travaux sur cordes", sub: true },
  { href: "/secteurs-dactivite/", label: "Secteurs d'activité" },
  { href: "/realisations/", label: "Réalisations" },
  { href: "/zones-intervention/", label: "Zones d'intervention" },
  { href: "/a-propos/", label: "À propos" },
  { href: "/parrainage/", label: "Parrainage" },
  { href: "/contact/", label: "Contact" },
];
