# Raccordement et éléments restants — CleanVitreService

Les informations d'entreprise sont désormais intégrées. Ce document liste
ce qui reste à fournir et comment raccorder le formulaire de devis.

Tout se configure dans un seul fichier : **`src/config.mjs`**.

---

## 1. Informations intégrées

| Donnée | Valeur en ligne |
|---|---|
| Dénomination | CleanVitreService |
| Dirigeant | Noah Lefebvre |
| Statut | Entreprise individuelle (micro-entreprise) |
| Siège | 4 ruelle de l'Hôtel de Ville, 76210 Bolbec |
| SIREN | 101 837 474 |
| SIRET | 101 837 474 00010 |
| Téléphone | 06 41 01 96 43 (liens `tel:` actifs) |
| E-mail | cleanvitreservice@gmail.com (liens `mailto:` actifs) |
| Zone | 50 km autour de Bolbec · Normandie · France selon projet |
| Engagements | Devis gratuit · réponse sous 30 min selon disponibilité · astreintes sur demande |

Ces valeurs alimentent l'en-tête, le pied de page, la page contact, les
mentions légales et les données structurées `LocalBusiness`.

---

## 2. Ce qui reste à fournir

| Élément | Où | Pourquoi il n'est pas publié |
|---|---|---|
| **TVA** | `legalEntity.tva` | Numéro intracommunautaire, ou mention « TVA non applicable, art. 293 B du CGI » si franchise en base. |
| **Assurance RC pro** | `legalEntity.assurance` | L'existence de l'assurance est mentionnée ; l'assureur et le numéro de police restent à transmettre. |
| **Médiateur de la consommation** | `legalEntity.mediateur` | Obligatoire pour une activité auprès de particuliers (art. L. 612-1 du code de la consommation). Adhésion à souscrire. |
| **Autorisations drone et qualifications hauteur** | non publié | Intitulés exacts non vérifiés. La page « À propos » et les mentions légales indiquent qu'ils sont communiqués sur demande. |
| **Logo** | `brand.logoSrc` | Un mot-signe typographique est composé en attendant. Renseigner le chemin d'une image le remplace partout. |
| **Photographies de chantiers** | voir § 5 | Emplacements réservés en place, jamais remplis par une image d'illustration. |
| **Nom de domaine** | `site.origin` | Actuellement l'adresse GitHub Pages. |
| **Service de vérification des codes de parrainage** | `parrainage.endpoint` | Voir la section 4 ci-dessous. Sans lui, aucun code ne peut être déclaré valide par le site. |
| **Règles de l'offre de parrainage** | — | Durée de validité d'un code, cumul éventuel avec une autre offre, nombre de filleuls par parrain. Non publiées faute d'arbitrage. |

---

## 3. Formulaire de devis — état réel

Le formulaire comporte six étapes, valide chaque étape avant de passer à
la suivante, et fonctionne au clavier comme au toucher.

### Comportement actuel : envoi par le logiciel de messagerie

`formEndpoint` vaut `null`. À la validation finale, le site compose un
e-mail **pré-rempli vers cleanvitreservice@gmail.com** contenant toutes les
réponses, et l'ouvre dans le logiciel de messagerie du visiteur.

C'est un envoi réel, mais **le visiteur doit cliquer sur « Envoyer »** dans
sa messagerie. Le site le dit explicitement et n'affiche jamais « message
envoyé ». Limites assumées :

- les pièces jointes ne peuvent pas être transportées : le message invite à les ajouter ;
- une description très longue est abrégée, ce qui est signalé au visiteur ;
- un visiteur sans logiciel de messagerie configuré doit copier l'adresse (affichée dans le message).

### Passage à un envoi automatique

Une seule ligne à changer, une fois le service choisi :

```js
// src/config.mjs
export const formEndpoint = "https://…";
```

Le formulaire enverra alors un `POST` en `multipart/form-data` (en-tête
`Accept: application/json`), attendra une réponse `2xx`, réinitialisera le
formulaire et affichera une confirmation. En cas d'échec, il le dira.

**Ce qu'il faut obtenir :** un compte chez un service de réception de
formulaires (Formspree, Tally, Basin, Formsubmit…) ou une fonction
serverless, configuré pour livrer à cleanvitreservice@gmail.com. Je ne peux
pas créer ce compte à votre place.

**À prévoir en plus :**

- une protection anti-spam (champ piège, horodatage ou vérification) — aucune n'est active ;
- une limite de taille côté serveur : le client accepte 5 fichiers de 8 Mo ;
- la mise à jour de la section « Destinataires » de la politique de confidentialité, qui indique aujourd'hui qu'aucune donnée ne transite par un serveur.

Champs transmis : `nom`, `telephone`, `email`, `type_client`,
`prestations[]`, `adresse`, `departement`, `quantite`, `hauteur`,
`niveaux`, `acces`, `obstacles`, `etat`, `methode`, `date`, `urgence`,
`frequence`, `description`, `photos[]`, `eau_electricite`,
`stationnement`, `consentement`.

---

## 4. Parrainage — ce qui fonctionne, ce qui reste à raccorder

L'offre est définie en un seul endroit, `parrainage` dans `src/config.mjs` :
20 % pour la personne recommandée, sur sa première intervention ; aucun
avantage pour le parrain. Modifier ce bloc met à jour le bandeau, la section
d'accueil, la page `/parrainage/` et le champ du formulaire.

### Ce qui fonctionne déjà, sans rien raccorder

- Le bandeau, la section d'accueil, la page dédiée et le lien de pied de page.
- Le champ « Vous avez un code parrainage ? » à la première étape du devis.
- La normalisation de la saisie (majuscules, espaces retirés).
- Le contrôle de **forme** du code, sur `parrainage.format`.
- La transmission du code avec la demande — par e-mail pré-rempli
  aujourd'hui, dans le corps du message, assortie de la consigne
  « à vérifier avant d'appliquer la réduction ».

### Ce qui ne fonctionne pas encore, et pourquoi

**Le site ne peut pas dire qu'un code est valide.** Il n'a aucun moyen de le
savoir : il ne dispose ni de la liste des codes émis, ni de leur état. Tant
que `parrainage.endpoint` vaut `null`, le formulaire se contente donc
d'afficher « Code enregistré — il sera vérifié par CleanVitreService à
réception de votre demande ». Aucun code n'est accepté d'office, aucune
réduction n'est annoncée comme acquise, et un code mal formé est refusé.

Une vérification faite entièrement dans le navigateur serait de toute façon
sans valeur : la liste des codes serait lisible par n'importe quel visiteur,
qui pourrait en inventer un.

### Le service à mettre en place

Un point d'accès HTTP qui, interrogé avec un code, répond si celui-ci ouvre
droit à la réduction.

```
GET  <endpoint><CODE>          →  { "valide": true }   ou  { "valide": false }
```

Renseigner ensuite son adresse dans `src/config.mjs` :

```js
export const parrainage = {
  reduction: 20,
  endpoint: "https://api.exemple.fr/parrainage/verifier?code=",
  format: "^CVS-[A-Z0-9]{6}$",
  exemple: "CVS-7KD2QX",
};
```

Le formulaire bascule alors seul sur la vérification réelle : code accepté →
confirmation explicite de la réduction ; code refusé → message d'erreur et
étape bloquée ; service injoignable → le code part quand même avec la
demande, sans qu'aucune validité ne soit affirmée.

Ce service doit tenir, côté entreprise :

| Besoin | Détail |
|---|---|
| Création des codes | Un code nominatif par client parrain. |
| Association | Chaque code rattaché à son parrain. |
| Activation / désactivation | Pouvoir couper un code sans le supprimer. |
| Validation | Réponse `valide: true/false` à l'interrogation ci-dessus. |
| Identification dans la demande | Le code figure déjà dans le message reçu. |
| Usage unique ou limité | Marquer un code comme consommé selon la règle retenue. |

Une feuille de calcul partagée suffit à tenir la liste ; c'est l'exposition
en HTTP qui demande un hébergement (une fonction sans serveur, par exemple).
Tant que ce service n'existe pas, la vérification se fait à la main, à
réception de la demande : le code y figure, nommément.

---

## 5. Photographies attendues

Quatre emplacements sont **dessinés, visibles et vides**. Ils ne contiennent
aucune image d'illustration : une photographie d'agence présentée comme un
chantier de l'entreprise serait un mensonge, et le site n'en fait pas.

| Emplacement | Page | Ce qu'il faut |
|---|---|---|
| **Perche télescopique** | accueil, section « Moyens d'accès » | Une intervention réelle à la perche. Aucune photo disponible ne montre cette méthode : toutes les images d'opérateurs du projet sont des travaux sur cordes. Format paysage, 1600 px de large minimum. |
| **Fiche de chantier** | `/realisations/` | Une photographie par chantier, prise sur l'intervention, avec l'accord du maître d'ouvrage. Format 4/3, 1600 px minimum. |
| **Avant / après** | `/realisations/` | Des **paires** prises au même cadrage, avant puis après. Sans cadrage identique, le comparateur n'a aucune valeur de preuve. Format 16/9. |
| **Portrait du dirigeant** | `/a-propos/` | Noah Lefebvre, en portrait ou en intervention. Format 4/5, 1200 px minimum. |

Une fois les fichiers déposés dans le projet, leur intégration consiste à
renseigner le nom de l'image dans `src/config.mjs` (méthodes) ou dans la page
concernée, et à lancer `scripts/measure-images.sh`. Les emplacements réservés
disparaissent d'eux-mêmes.

**Ce qui est en place et n'attend rien** : le comparateur avant/après est
opérationnel (souris, tactile, clavier), la mise en page des fiches est
terminée, le portrait a son cadre. Seules les images manquent.

---

## 6. Logo

Le logo officiel a été détouré de la capture fournie
(`scripts/source-logo/logo-capture.png`, 1184 × 258) par
`scripts/logo-extraction.py`. Le fond blanc est retiré par remplissage depuis
les bords, ce qui préserve les blancs **intérieurs** du pictogramme — les deux
coups de raclette. Aucune couleur n'est modifiée.

| Fichier | Usage |
|---|---|
| `logo-cvs-560.png` / `-1100.png` | Fonds clairs : en-tête défilé |
| `logo-cvs-clair-560.png` / `-1100.png` | Fonds sombres : en-tête sur le héros, pied de page, menu mobile |
| `logo-cvs-icone-192.png` / `-512.png` | Favicon, icône d'application, pictogramme seul |

La déclinaison « claire » ne change que la **teinte des lettres** :
« CLEANVITRE » passe en blanc, « SERVICE » prend le cyan du pictogramme —
une couleur du logo lui-même, pas une couleur inventée. Le pictogramme est
rigoureusement identique dans les deux fichiers. Sans cette déclinaison, le
bleu marine des lettres serait illisible sur le héros et le pied de page.

La capture fournie suffisait largement : le logo y occupe 1101 × 184 px, soit
plus de cinq fois la taille d'affichage dans l'en-tête. **Un fichier vectoriel
(SVG ou AI) resterait préférable** pour l'impression et les très grands
formats ; si vous en disposez, il remplacera ces PNG sans autre changement
que les chemins dans `brand.logo`.

---

## 7. Publication

Le site est statique. Après modification :

```bash
node build.mjs && node scripts/build-artifact.mjs && rm -rf docs && cp -R dist-partage docs && git add -A && git commit -m "Mise à jour" && git push
```

GitHub Pages republie en une à deux minutes.

> La version publiée est actuellement en `noindex` (maquette). Pour
> l'ouvrir aux moteurs de recherche, retirer la règle correspondante dans
> `scripts/build-artifact.mjs` et rétablir un `robots.txt` autorisant
> l'exploration.
