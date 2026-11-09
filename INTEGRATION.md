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
| **Photographies de chantiers** | `scripts/images.txt` | La galerie est explicitement présentée comme illustrative. |
| **Nom de domaine** | `site.origin` | Actuellement l'adresse GitHub Pages. |

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

## 4. Publication

Le site est statique. Après modification :

```bash
node build.mjs && node scripts/build-artifact.mjs && rm -rf docs && cp -R dist-partage docs && git add -A && git commit -m "Mise à jour" && git push
```

GitHub Pages republie en une à deux minutes.

> La version publiée est actuellement en `noindex` (maquette). Pour
> l'ouvrir aux moteurs de recherche, retirer la règle correspondante dans
> `scripts/build-artifact.mjs` et rétablir un `robots.txt` autorisant
> l'exploration.
