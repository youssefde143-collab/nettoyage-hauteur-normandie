/* Générateur de site statique — sans dépendance externe.
   Agrège la configuration, la mise en page et les pages, puis écrit dist/. */
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { layout } from "./src/layout.mjs";
import { site, nav, zones, methodes } from "./src/config.mjs";

const PAGES = [
  "accueil", "services", "drone", "cordes", "nacelle",
  "secteurs", "realisations", "zones", "apropos", "contact",
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

/* ---- favicon (monogramme vectoriel) ---- */
await writeFile("dist/favicon.svg",
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="4" fill="#050B14"/>
  <path d="M8 23V9l16 14V9" stroke="#fff" stroke-width="1.9" stroke-linecap="square" fill="none"/>
  <circle cx="24" cy="23" r="2.6" fill="#1A74F0"/>
</svg>
`);

console.log(`✓ ${pages.length} pages générées`);
console.log(`  ${pages.map(p => p.path).join("  ")}`);
