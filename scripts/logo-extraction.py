"""Extraction du logo CleanVitreService depuis la capture d'écran.

Le fond blanc de la capture est retiré par remplissage depuis les bords :
les blancs INTÉRIEURS (les deux coups de raclette dans le pictogramme)
sont ainsi préservés, contrairement à un simple seuillage.

Les pixels de bord, mélangés au blanc par l'anticrénelage de la capture,
retrouvent leur couleur d'origine et une transparence partielle.
Aucune couleur de la marque n'est modifiée.
"""
import sys
from collections import deque
from PIL import Image

SRC = sys.argv[1]
OUT = sys.argv[2]
BOITE = (28, 32, 1129, 216)          # logo complet
BOITE_ICONE = (28, 32, 213, 216)     # pictogramme seul
SEP_TEXTE = 319 - BOITE[0]           # début du texte, en coordonnées rognées

NAVY = (10, 26, 43)
CYAN = (34, 200, 240)
BLEU = (27, 111, 196)

def detourer(im):
    w, h = im.size
    px = im.load()
    clair = lambda p: min(p[0], p[1], p[2]) > 228
    fond = [[False] * w for _ in range(h)]
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if clair(px[x, y]) and not fond[y][x]: fond[y][x] = True; q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if clair(px[x, y]) and not fond[y][x]: fond[y][x] = True; q.append((x, y))
    while q:
        x, y = q.popleft()
        for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not fond[ny][nx] and clair(px[nx, ny]):
                fond[ny][nx] = True; q.append((nx, ny))

    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    o = out.load()
    for y in range(h):
        for x in range(w):
            if fond[y][x]: continue
            r, g, b, _ = px[x, y]
            mini = min(r, g, b)
            bord = any(0 <= x+dx < w and 0 <= y+dy < h and fond[y+dy][x+dx]
                       for dx in (-1,0,1) for dy in (-1,0,1))
            if bord and mini > 60:
                # pixel anticrénelé : on retire le blanc sous-jacent
                a = max(0.0, min(1.0, (255 - mini) / 245))
                if a < .02: continue
                c = tuple(max(0, min(255, round((v - 255 * (1 - a)) / a))) for v in (r, g, b))
                o[x, y] = (*c, round(a * 255))
            else:
                o[x, y] = (r, g, b, 255)
    return out

def inverser(im):
    """Déclinaison pour fond sombre : seules les LETTRES changent de teinte.
       Le pictogramme, qui porte déjà sa plaque marine, reste intact.

       Le partage se fait par ligne — « CLEANVITRE » occupe les rangées
       17 à 105, « SERVICE » les rangées 131 à 171 — et non par couleur :
       les pixels de bord, mélangés au fond, ne se distinguent pas de
       manière fiable par leur teinte et laisseraient un liseré sombre.
       La transparence de chaque pixel est conservée telle quelle, donc
       le dessin des lettres n'est pas altéré."""
    LIGNE_PARTAGE = 118
    im = im.copy(); px = im.load(); w, h = im.size
    for y in range(h):
        teinte = (255, 255, 255) if y < LIGNE_PARTAGE else CYAN
        for x in range(SEP_TEXTE, w):
            a = px[x, y][3]
            if a: px[x, y] = (*teinte, a)
    return im

src = Image.open(SRC).convert("RGBA")
plein = detourer(src.crop(BOITE))
clair = inverser(plein)
icone = detourer(src.crop(BOITE_ICONE))

import os
os.makedirs(OUT, exist_ok=True)
for nom, im, larges in (("logo-cvs", plein, (560, 1100)),
                        ("logo-cvs-clair", clair, (560, 1100))):
    for L in larges:
        H = round(im.height * L / im.width)
        im.resize((L, H), Image.LANCZOS).save(f"{OUT}/{nom}-{L}.png", optimize=True)
        print(f"  {nom}-{L}.png  {L}×{H}")
for T in (192, 512):
    icone.resize((T, T), Image.LANCZOS).save(f"{OUT}/logo-cvs-icone-{T}.png", optimize=True)
    print(f"  logo-cvs-icone-{T}.png  {T}×{T}")
print("rapport de forme logo :", round(plein.width / plein.height, 4))
