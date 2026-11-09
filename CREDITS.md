# Crédits et licences

## Photographies

Tous les visuels proviennent de **Unsplash** et sont utilisés conformément à la
[licence Unsplash](https://unsplash.com/license), qui autorise l'usage
commercial sans attribution obligatoire. Les fichiers ont été **téléchargés et
stockés localement** dans `public/assets/img/` : aucun lien direct vers un
serveur tiers n'est utilisé, et aucune image ne peut disparaître du site.

Les identifiants des photographies sources figurent dans
`scripts/images.txt` et `scripts/images-bandeaux.txt`, ce qui permet de
retrouver chaque cliché et son auteur sur Unsplash.

### Sur les images des sites de référence

Les sept sites de référence étudiés ont été analysés pour leur **structure,
leur hiérarchie visuelle et leurs techniques de communication commerciale**.

Leurs photographies, logos et textes marketing **n'ont pas été réutilisés** :
il s'agit de contenus protégés par le droit d'auteur, dont la reprise n'était
pas autorisée. Des visuels professionnels équivalents sous licence libre ont
été sélectionnés à la place. Les textes du site sont originaux.

### Statut des visuels

Les photographies illustrent les **méthodes d'intervention** et les **types de
surfaces traitées**. Elles ne documentent pas de chantiers réalisés par
l'entreprise, ce que la page « Nos réalisations » indique explicitement.
Elles devront être remplacées par des photographies réelles dès que
celles-ci seront disponibles, avec l'accord des maîtres d'ouvrage.

## Polices

- **Sora** — SIL Open Font License 1.1
- **Inter** — SIL Open Font License 1.1

Auto-hébergées au format WOFF2 (sous-ensembles `latin` et `latin-ext`) dans
`public/assets/fonts/`. Aucune requête vers un serveur de polices tiers n'est
effectuée, ce qui évite tout transfert de données vers un tiers.

## Données cartographiques

La carte de la Normandie est générée à partir des **contours administratifs
des départements français publiés en données ouvertes**
(dépôt `france-geojson`, données issues de l'IGN / Etalab, Licence Ouverte).

Le tracé a été reprojeté (projection équirectangulaire corrigée en longitude),
simplifié par l'algorithme de Douglas-Peucker, puis converti en SVG
(`src/normandie-map.svg`, 8 Ko). Les coordonnées des neuf villes affichées sont
leurs coordonnées géographiques réelles.

## Code

Le code du site — gabarits, feuille de style, scripts, générateur — a été écrit
pour ce projet et n'utilise aucune bibliothèque tierce.
