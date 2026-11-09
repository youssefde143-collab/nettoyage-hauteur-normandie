# Site — nettoyage de vitres et de façades en hauteur (Normandie)

Site vitrine statique, intégralement en français, pour une entreprise de
nettoyage technique en hauteur intervenant par **drone**, **travaux sur cordes**
et **nacelle élévatrice**.

> **Avant la mise en ligne**, lire [`INTEGRATION.md`](INTEGRATION.md) : il liste
> les informations d'entreprise à fournir et le raccordement du formulaire.

---

## Démarrer

```bash
node build.mjs     # génère dist/
node server.mjs    # sert dist/ sur http://localhost:4173
```

Aucune dépendance à installer : le projet n'utilise que Node (≥ 18) et sa
bibliothèque standard. Il n'y a ni `package.json`, ni `node_modules`, ni étape
de compilation tierce.

Le serveur local expose aussi un vrai point de réception pour le formulaire
de devis (`POST /api/devis`) : les demandes envoyées depuis `/contact/` sont
validées puis écrites dans `demandes/<référence>.json`. Pratique pour éprouver
la chaîne complète ; en production, voir `INTEGRATION.md`.

### Contrôles

```bash
node scripts/check-build.mjs   # liens, images, ancres, fichiers orphelins
```

### Version partageable

```bash
node scripts/build-artifact.mjs   # produit dist-partage/ : chemins relatifs,
                                  # fichiers à plat, formulaire en mode démonstration
```

---

## Structure

```
src/
  config.mjs           Identité, contact, mentions légales, zones — POINT UNIQUE DE CONFIGURATION
  layout.mjs           Gabarit commun : en-tête, pied de page, métadonnées, données structurées
  parts.mjs            Sections réutilisables : FAQ, CTA, processus, secteurs, carte, tableau des méthodes
  normandie-map.svg    Carte vectorielle générée à partir de données géographiques ouvertes
  pages/*.mjs          Une page = un module exportant { path, title, description, body, … }
public/
  assets/css/site.css  Système de design complet (jetons, composants, animations)
  assets/js/site.js    Interactions : navigation, apparitions, FAQ, carte, galerie, formulaire
  assets/fonts/        Sora et Inter auto-hébergées (woff2, sous-ensembles latin)
  assets/img/          Bibliothèque d'images WebP, plusieurs largeurs par visuel
scripts/
  images.txt           Manifeste des visuels (nom | identifiant source | largeurs)
  images-bandeaux.txt  Manifeste des recadrages 16:9 utilisés en bandeau
  image-dims.json      Dimensions réelles relevées sur les fichiers (généré)
  fetch-images.sh      Téléchargement des visuels
  fetch-bands.sh       Téléchargement des recadrages de bandeau
  measure-images.sh    Régénère image-dims.json
  check-build.mjs      Contrôle du site généré
build.mjs              Génère dist/, le sitemap, le robots.txt et le favicon
server.mjs             Serveur de prévisualisation local (URL propres, gzip)
dist/                  Site généré — c'est ce dossier que l'on met en ligne
```

---

## Principes de conception

**Une seule source de vérité pour les données d'entreprise.** Nom, coordonnées,
mentions légales, départements et menus vivent dans `src/config.mjs`. Les
valeurs absentes s'affichent en espaces réservés visibles plutôt qu'en contenu
inventé.

**Les images pilotent leurs propres dimensions.** `img()` lit
`scripts/image-dims.json` et écrit les attributs `width`/`height` réels ainsi
qu'un `srcset` limité aux fichiers existants. Conséquence directe : aucun
décalage de mise en page (CLS mesuré à 0 sur toutes les pages) et aucun lien
d'image cassé possible — une image absente du manifeste fait échouer le build.

**Les bandeaux utilisent des recadrages 16:9 produits à la source** plutôt
qu'un recadrage CSS d'images verticales : la carte aérienne de la Normandie est
ainsi passée de 2,1 Mo à 562 Ko pour un rendu identique.

**Le contraste est géré par jetons, pas au cas par cas.** Les variables
`--c-eyebrow`, `--c-lead`, `--c-prose`, `--c-label`, `--c-ph` sont redéfinies
une seule fois pour l'ensemble des conteneurs sombres. Un bloc placé sur fond
clair ou sombre reste lisible sans ajustement manuel.

**Les animations ne conditionnent jamais la lisibilité.** L'état masqué des
apparitions est porté par `.js` : sans JavaScript, tout le contenu s'affiche.
Trois filets de sécurité se superposent — observateur d'intersection, balayage
au défilement, révélation inconditionnelle après 4 s — car un contenu invisible
est un défaut plus grave qu'une animation manquée.
`prefers-reduced-motion: reduce` désactive l'ensemble des mouvements.

---

## Accessibilité

Niveau visé : **WCAG 2.1 AA**. Audit Lighthouse : **100/100 sur les 11 pages**.

- Lien d'évitement, structure sémantique, hiérarchie de titres sans saut
- Contraste vérifié par calcul sur l'ensemble des textes visibles
- Navigation au clavier complète, focus visible (2 px)
- Formulaire : étiquettes associées, erreurs annoncées, `aria-invalid`
- Cibles tactiles d'au moins 24 px
- Carte vectorielle décrite par `<title>` et `<desc>`
- Respect de `prefers-reduced-motion`
- Champs à 16 px sur mobile (évite le zoom automatique sous iOS)

---

## Référencement

- Titres et descriptions uniques sur chaque page, URL canoniques
- Open Graph et Twitter Card, avec image d'aperçu adaptée par page
- `sitemap.xml` et `robots.txt` générés au build
- Données structurées `Organization`, `WebSite`, `BreadcrumbList`, `Service`,
  `FAQPage` — limitées aux faits vérifiables
- Contenu local original pour les cinq départements normands
- Maillage interne entre méthodes, secteurs et zones

---

## Règle éditoriale

Le site ne contient **aucun fait inventé** : pas de chiffre d'activité, pas
d'ancienneté, pas de taux de satisfaction, pas de certification, pas d'avis
client, pas de référence de chantier. La galerie est explicitement présentée
comme une illustration des méthodes et non comme un portfolio de réalisations.
Les limites de chaque méthode sont exposées aussi clairement que ses avantages.

Merci de préserver cette règle lors des mises à jour.
