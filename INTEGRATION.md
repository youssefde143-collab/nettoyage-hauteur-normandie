# Raccordement et mise en ligne

Ce document liste **tout ce qui doit être renseigné avant la mise en ligne**.
Rien de ce qui suit n'a été inventé : chaque valeur manquante apparaît sur le
site sous la forme d'un espace réservé visible (`[NOM DE L'ENTREPRISE]`,
`[TÉLÉPHONE]`, `[EMAIL]`…), volontairement repérable.

---

## 1. Informations à fournir

Tout se configure dans un seul fichier : **`src/config.mjs`**.

### 1.1 Identité (`brand`)

| Champ | Valeur actuelle | À fournir |
|---|---|---|
| `name` | `[NOM DE L'ENTREPRISE]` | Dénomination commerciale définitive |
| `short` | `[NOM]` | Version courte (signature, favicon) |
| `logoSrc` | `null` | Chemin du logo, ex. `/assets/img/logo.svg`. Tant que la valeur est `null`, le monogramme vectoriel de substitution est affiché. |
| `baseline` | `Drone · Cordes · Nacelle` | Modifiable librement |

### 1.2 Contact (`contact`)

| Champ | À fournir |
|---|---|
| `phoneLabel` / `phoneHref` | Numéro affiché et sa version technique (`+33…`). Renseigner `phoneHref` active le bouton « Appeler » de la barre mobile. |
| `emailLabel` / `emailHref` | Adresse affichée et lien `mailto:` |
| `addressLines` | Adresse postale, ligne par ligne |
| `hoursLabel` | Horaires d'ouverture |
| `social` | Tableau `{ label, href }` — laisser vide tant qu'aucun compte n'existe |

### 1.3 Informations légales (`legalEntity`)

Obligatoires au titre des articles 6-III et 19 de la loi n° 2004-575 du
21 juin 2004 : forme juridique, capital, siège, SIREN, SIRET, RCS, TVA
intracommunautaire, responsable de la publication, hébergeur, assurance
responsabilité civile professionnelle, médiateur de la consommation, contact
protection des données.

### 1.4 Domaine (`site.origin`)

Remplacer `https://www.exemple-nettoyage-normandie.fr` par le domaine réel.
Cette valeur alimente les URL canoniques, les aperçus sociaux, le `sitemap.xml`
et le `robots.txt`.

---

## 2. Formulaire de demande de devis

### État actuel

Le formulaire est **entièrement fonctionnel côté client** : validation par champ,
messages d'erreur en français, états `aria-invalid`, annonce vocale des erreurs,
dépôt de fichiers avec contrôle du nombre et du poids.

Il a trois comportements, selon le contexte :

| Contexte | `formEndpoint` | Comportement |
|---|---|---|
| **Local** (`node server.mjs`) | `/api/devis` | Envoi réel. Le serveur valide, enregistre la demande dans `demandes/<référence>.json` et répond 200. |
| **Maquette partagée** (artefact) | vide + `data-demo="1"` | Validation complète, puis message « maquette de démonstration » indiquant que la demande n'est pas transmise. |
| **Production, non raccordé** | `null` | Message « Envoi non configuré ». Aucun faux succès n'est jamais affiché. |

Le point de terminaison local `/api/devis` (dans `server.mjs`) sert à éprouver
la chaîne complète : il applique les mêmes règles qu'un service de production
(champs obligatoires, format d'adresse, limite de taille) et renvoie 422 ou 200.
**Il n'est pas destiné à la production** — il écrit des fichiers en clair et ne
comporte aucune protection anti-spam.

### Raccordement

```js
// src/config.mjs
export const formEndpoint = "https://…"; // point de terminaison POST du service retenu
```

C'est l'unique ligne à changer : la validation, les états d'erreur et le
message de succès fonctionnent déjà et ont été éprouvés contre un vrai
point de réception.

Le formulaire envoie un `POST` en `multipart/form-data` avec l'en-tête
`Accept: application/json`, et attend une réponse `2xx`. Champs transmis :

`nom`, `entreprise`, `email`, `telephone`, `type_client`, `prestation`,
`localisation`, `departement`, `type_batiment`, `hauteur`, `description`,
`photos[]`, `consentement`.

### Options possibles

| Solution | Pièces jointes | À prévoir |
|---|---|---|
| Service de formulaire hébergé (type Formspree, Tally, Basin) | selon l'offre | création du compte, URL du point de terminaison, destinataire |
| Fonction serverless (Netlify, Vercel, Cloudflare) | oui | clé d'API d'un service d'envoi d'e-mails, adresse expéditrice vérifiée sur le domaine |
| Script PHP sur hébergement mutualisé | oui | `mail()` ou SMTP authentifié, contrôle du type et du poids des fichiers |

### À prévoir dans tous les cas

- **Adresse de réception** des demandes.
- **Protection anti-spam** : champ piège (honeypot), horodatage, ou service de
  vérification. Aucune protection n'est active aujourd'hui.
- **Limite de taille** côté serveur : le client accepte 5 fichiers de 8 Mo
  maximum ; la même limite doit être appliquée côté serveur.
- **Mise à jour de la politique de confidentialité** : la section
  « Destinataires et sous-traitants » doit nommer le service retenu, sa
  localisation et le cadre contractuel applicable.
- **Durée de conservation** des demandes sans suite, à inscrire dans la
  politique de confidentialité.

---

## 3. Données structurées

Le site publie aujourd'hui des données `Organization`, `WebSite`,
`BreadcrumbList`, `Service` et `FAQPage` — **uniquement des éléments
vérifiables**.

Le type `LocalBusiness` n'est volontairement pas déclaré : il exige une raison
sociale et une adresse réelles. Une fois `legalEntity` et `contact` renseignés,
il peut être ajouté dans `jsonLd()` (`src/layout.mjs`), avec `address`,
`telephone`, `openingHours` et `geo`. Ne jamais y déclarer d'avis ou de note
qui n'existeraient pas réellement.

---

## 4. Hébergement

Le site est **entièrement statique** : le dossier `dist/` peut être déposé tel
quel chez n'importe quel hébergeur ou CDN.

Configuration recommandée côté serveur :

- **Compression** `gzip` ou `brotli` sur `.html`, `.css`, `.js`, `.svg`, `.xml`.
  Sans elle, la feuille de style passe de 11 Ko à 47 Ko.
- **Cache** : `Cache-Control: public, max-age=31536000, immutable` pour
  `/assets/img/`, `/assets/fonts/` ; `no-cache` pour les pages HTML.
  Les feuilles de style et scripts portent déjà une empreinte de contenu
  (`?v=…`) régénérée à chaque modification.
- **HTTPS** obligatoire, avec redirection depuis HTTP.
- **URL sans extension** : servir `/<page>/index.html` pour `/<page>/`.
- **Page 404** : prévoir une page d'erreur reprenant la charte.

---

## 5. Avant d'ouvrir le site au public

- [ ] `src/config.mjs` entièrement renseigné (identité, contact, mentions légales, domaine)
- [ ] Logo définitif fourni et `brand.logoSrc` renseigné
- [ ] `formEndpoint` raccordé et testé de bout en bout
- [ ] Protection anti-spam en place
- [ ] Politique de confidentialité complétée (destinataires, durées)
- [ ] Mentions légales complétées (immatriculation, hébergeur, assurance, médiateur)
- [ ] Photographies de chantiers réelles substituées à la galerie d'illustration,
      avec accord écrit des maîtres d'ouvrage
- [ ] `sitemap.xml` soumis à la Search Console
- [ ] Vérification d'un envoi de formulaire en conditions réelles
