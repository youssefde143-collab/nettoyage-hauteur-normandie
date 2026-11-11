/* Générateur de site statique — sans dépendance externe.
   Agrège la configuration, la mise en page et les pages, puis écrit dist/. */
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { layout } from "./src/layout.mjs";
import { site, nav, zones, methodes } from "./src/config.mjs";

const PAGES = [
  "accueil", "services", "drone", "cordes",
  "secteurs", "realisations", "zones", "apropos", "parrainage", "contact",
  "mentions-legales", "confidentialite", "cookies", "plan-du-site",
];

const out = (p) => "dist" + (p === "/" ? "/index.html" : p + "index.html");

const pages = [];
for (const name of PAGES) {
  const mod = await import(`./src/pages/${name}.mjs`);
  pages.push(mod.default);
}

/* Contrôle : chaque image d'aperçu social doit exister dans le manifeste. */
const DIMS = JSON.parse(await readFile(new URL("./scripts/image-dims.json", import.meta.url), "utf8"));
const badOg = pages.filter(p => p.ogImage && !DIMS[p.ogImage]).map(p => `${p.path} -> ${p.ogImage}`);
if (badOg.length) throw new Error("Image d'aperçu introuvable :\n  " + badOg.join("\n  "));

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("public", "dist", { recursive: true });

for (const page of pages) {
  const file = out(page.path);
  await mkdir(file.slice(0, file.lastIndexOf("/")), { recursive: true });
  await writeFile(file, layout(page));
}

/* ---- sitemap.xml ---- */
const today = new Date().toISOString().slice(0, 10);
const prio = (p) => p === "/" ? "1.0"
  : ["/contact/", "/services/", "/nettoyage-par-drone/"].includes(p) ? "0.9"
  : p.startsWith("/mentions") || p.startsWith("/politique") || p.startsWith("/gestion") || p.startsWith("/plan") ? "0.2" : "0.7";
await writeFile("dist/sitemap.xml",
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${site.origin}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${prio(p.path)}</priority>
  </url>`).join("\n")}
</urlset>
`);

/* ---- robots.txt ---- */
await writeFile("dist/robots.txt",
`User-agent: *
Allow: /

Sitemap: ${site.origin}/sitemap.xml
`);

/* ---- favicon ----
   Le pictogramme officiel sert d'icône : plus de monogramme inventé.
   Il est déjà publié dans assets/img ; on en place une copie à la racine
   pour les clients qui réclament /favicon.ico ou /favicon.png. */
await cp("public/assets/img/logo-cvs-icone-192.png", "dist/favicon.png");

console.log(`✓ ${pages.length} pages générées`);
console.log(`  ${pages.map(p => p.path).join("  ")}`);
