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

## Intro « nettoyage de vitre » (accueil)

À la première visite d'une session, la page d'accueil s'ouvre derrière une
vitre humide qu'une raclette de vitrier nettoie en va-et-vient : une passe
vers la droite, un virage descendant au bord, une passe vers la gauche, et
ainsi de suite jusqu'en bas. Quatre bandes sur un écran courant, cinq au-delà
de 1 000 px de haut, trois sur petit écran. Environ 2,4 s sur ordinateur,
1,8 s sur téléphone.

Le corps de la raclette traîne derrière la lame : au virage, l'outil
s'aplatit (`scaleX` qui passe par zéro) et se redéploie de l'autre côté,
comme un poignet qui la retourne. La vitesse s'annule au sommet de chaque
virage, à la manière d'un pendule — jamais par un arrêt net.

Ce n'est ni une vidéo ni un fondu : la page réelle est chargée et rendue dès
le départ, et c'est elle que l'on découvre derrière la lame.

| Fichier | Rôle |
| --- | --- |
| `src/squeegee.mjs` | dessin vectoriel de la raclette (lame, rail inox, manche) |
| `public/assets/js/intro.js` | moteur d'animation |
| `public/assets/css/site.css` | bloc `.vt` en fin de feuille |
| `src/layout.mjs` | calque + script de décision, posés si `page.intro === true` |

Trois couches superposées, pilotées par la même géométrie :

1. `.vt__blur` — `backdrop-filter` sur la page réelle, dont le `clip-path`
   ne conserve que la zone non nettoyée ;
2. `canvas.vt__glass` — voile, auréoles et gouttelettes, effacés par la lame
   en `destination-out` ;
3. `canvas.vt__fx` — bourrelet d'eau devant la lame, film résiduel derrière,
   éclaboussures.

**Trois garde-fous**, parce qu'une page invisible est un défaut bien plus grave
qu'une animation manquée :

- le calque reste en `display:none` tant que le script en tête de document n'a
  pas posé `html.vt-on` — donc jamais sans JavaScript, jamais en mouvement
  réduit, jamais deux fois dans la même session (`sessionStorage`) ;
- une animation CSS l'escamote après 4,2 s même si `intro.js` ne se charge pas ;
- molette, touche, clic, défilement ou redimensionnement l'interrompent aussitôt.

Le calque est en `pointer-events:none` : la navigation et les boutons de devis
restent cliquables pendant toute l'animation. Le bandeau cookies attend la fin.

**Pour la désactiver** : retirer `intro: true` de `src/pages/accueil.mjs`.
**Pour l'ajouter ailleurs** : poser `intro: true` sur la page voulue.

## Logo

Le logo officiel vit dans `brand.logo` (`src/config.mjs`) et se décline en
deux fichiers : l'original pour les fonds clairs, sa version inversée pour les
fonds sombres. Les deux sont présents dans le balisage ; le CSS montre celui
qui convient à l'état de l'en-tête, pour que la bascule au défilement soit
instantanée. `scripts/logo-extraction.py` régénère tous les fichiers depuis la
capture d'origine conservée dans `scripts/source-logo/`.

## Emplacements réservés

Quatre zones sont dessinées et volontairement vides : la photographie
d'intervention à la perche, les fiches de chantier, les paires avant/après et
le portrait du dirigeant. Elles portent toutes la même mention
« Emplacement réservé » et ne seront jamais comblées par une image
d'illustration. Voir [INTEGRATION.md](INTEGRATION.md) § 5.

## Parrainage

L'offre tient dans un seul objet, `parrainage` dans `src/config.mjs` :
**20 % pour la personne recommandée, sur sa première intervention ; aucun
avantage pour le parrain.** Le modifier met à jour le bandeau d'en-tête, la
section d'accueil, la page `/parrainage/`, le pied de page et le champ du
formulaire de devis.

Le site **ne peut pas** déclarer un code valide tant que
`parrainage.endpoint` vaut `null` : il n'en contrôle alors que la forme et
annonce une vérification par l'entreprise à réception. Voir
[INTEGRATION.md](INTEGRATION.md) pour le service à raccorder.

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
