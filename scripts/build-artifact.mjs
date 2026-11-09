/* Variante « partage » du site : mêmes pages, mais chemins relatifs et noms de
   fichiers à plat, pour un hébergement qui ne sert pas /dossier/index.html.
   Produit dist-partage/ à partir de dist/. */
import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const SRC = "dist", OUT = "dist-partage";

// /services/ -> services.html ; / -> index.html
const pageFile = (p) => (p === "/" ? "index.html" : p.replace(/^\/|\/$/g, "") + ".html");

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await cp(join(SRC, "assets"), join(OUT, "assets"), { recursive: true });
await cp(join(SRC, "favicon.svg"), join(OUT, "favicon.svg")).catch(() => {});
// Pas de sitemap sur la maquette, et un robots.txt qui ferme la porte.
await writeFile(join(OUT, "robots.txt"), "User-agent: *\nDisallow: /\n");
// Désactive le traitement Jekyll sur GitHub Pages (sert les fichiers tels quels).
await writeFile(join(OUT, ".nojekyll"), "");

// Recense les pages de dist/
const pages = [];
async function walk(dir, base = "/") {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.isDirectory()) await walk(join(dir, e.name), base + e.name + "/");
    else if (e.name === "index.html") pages.push(base);
  }
}
await walk(SRC);

let rewrites = 0;
for (const p of pages) {
  const file = join(SRC, p === "/" ? "index.html" : p.slice(1) + "index.html");
  let html = await readFile(file, "utf8");

  // Liens internes : href="/..." -> fichier plat relatif (on épargne les URL absolues http(s)).
  html = html.replace(/(href|src)="(\/[^"]*)"/g, (m, attr, url) => {
    rewrites++;
    if (url.startsWith("/assets/")) return `${attr}="${url.slice(1)}"`;
    if (url === "/favicon.svg" || url === "/robots.txt" || url === "/sitemap.xml") return `${attr}="${url.slice(1)}"`;
    const [path, hash = ""] = url.split("#");
    const withHash = (f) => `${attr}="${f}${hash ? "#" + hash : ""}"`;
    if (path === "/" || path === "") return withHash("index.html");
    return withHash(pageFile(path.endsWith("/") ? path : path + "/"));
  });

  /* Maquette de présentation : on interdit l'indexation, pour qu'elle
     n'apparaisse jamais dans les résultats de recherche ni ne concurrence
     le futur site définitif. */
  html = html.replace(/<meta name="robots" content="[^"]*">/,
    '<meta name="robots" content="noindex,nofollow">');

  /* Pas de serveur derrière la variante partagée : on retire le point de
     terminaison local et on signale la maquette, pour que le formulaire
     annonce une démonstration au lieu d'un échec d'envoi. */
  html = html.replace(/data-endpoint="[^"]*"/g, 'data-endpoint="" data-demo="1"');
  html = html.replace(/\saction="\/api\/devis"/g, "");

  // srcset : chaque candidat porte aussi un chemin absolu.
  html = html.replace(/srcset="([^"]+)"/g, (m, set) =>
    `srcset="${set.split(",").map(c => c.trim().replace(/^\/assets\//, "assets/")).join(", ")}"`);

  await writeFile(join(OUT, pageFile(p)), html);
}

console.log(`✓ ${pages.length} pages écrites dans ${OUT}/ (${rewrites} chemins réécrits)`);
console.log("  " + pages.map(pageFile).join("  "));
