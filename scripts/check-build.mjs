/* Contrôle du site généré : liens, images, ancres, fichiers orphelins. */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = "dist";
const htmlFiles = [];
(function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html")) htmlFiles.push(p);
  }
})(root);

const pages = new Set(htmlFiles.map(f => "/" + f.slice(root.length + 1).replace(/index\.html$/, "")));
const strip = (u) => u.split("?")[0].split("#")[0];
const assetsAll = [];
(function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) walk(p);
    else assetsAll.push("/" + p.slice(root.length + 1));
  }
})(join(root, "assets"));

const problems = { liens: [], images: [], ancres: [] };
const usedAssets = new Set();

for (const f of htmlFiles) {
  const s = readFileSync(f, "utf8");
  const page = "/" + f.slice(root.length + 1).replace(/index\.html$/, "");

  for (const [, href] of s.matchAll(/href="(\/[^"]*)"/g)) {
    const u = strip(href);
    if (!u) continue;
    if (u.startsWith("/assets/") || /^\/(favicon\.(svg|png)|robots\.txt|sitemap\.xml)$/.test(u)) {
      usedAssets.add(u);
      if (!existsSync(root + u)) problems.liens.push(`${page} -> ${u}`);
    } else if (!pages.has(u)) problems.liens.push(`${page} -> ${u}`);
  }

  for (const [, attr] of s.matchAll(/(?:src|srcset)="([^"]+)"/g)) {
    for (const part of attr.split(",")) {
      const u = strip(part.trim().split(" ")[0]);
      if (!u.startsWith("/")) continue;
      usedAssets.add(u);
      if (!existsSync(root + u)) problems.images.push(`${page} -> ${u}`);
    }
  }

  // Les aperçus sociaux sont des URL absolues : on les rattache aussi aux assets utilisés.
  for (const [, u] of s.matchAll(/(?:og:image|twitter:image)" content="[^"]*?(\/assets\/[^"]+)"/g)) {
    usedAssets.add(strip(u));
    if (!existsSync(root + strip(u))) problems.images.push(`${page} (aperçu social) -> ${u}`);
  }
  // Les autres largeurs du même visuel d'aperçu restent légitimement présentes.
  for (const [, u] of s.matchAll(/og:image" content="[^"]*?\/assets\/img\/([a-z0-9-]+)-\d+\.webp"/g)) {
    for (const a of assetsAll) if (a.startsWith(`/assets/img/${u}-`)) usedAssets.add(a);
  }

  const ids = new Set([...s.matchAll(/id="([^"]+)"/g)].map(m => m[1]));
  for (const [, a] of s.matchAll(/href="#([^"]+)"/g)) if (!ids.has(a)) problems.ancres.push(`${page} -> #${a}`);
}

// Fichiers présents mais jamais référencés
const assets = assetsAll;
const orphans = assets.filter(a => !usedAssets.has(a) && !/\.(woff2|css|mjs)$/.test(a));

const totalImg = assets.filter(a => a.endsWith(".webp"));
const mb = (list) => (list.reduce((n, a) => n + statSync(root + a).size, 0) / 1048576).toFixed(1);

console.log(`pages            : ${pages.size}`);
console.log(`liens cassés     : ${problems.liens.length ? problems.liens.join("\n                   ") : "aucun"}`);
console.log(`images cassées   : ${problems.images.length ? problems.images.join("\n                   ") : "aucune"}`);
console.log(`ancres cassées   : ${problems.ancres.length ? problems.ancres.join("\n                   ") : "aucune"}`);
console.log(`images orphelines: ${orphans.length}${orphans.length ? " -> " + orphans.map(o => o.split("/").pop()).join(", ") : ""}`);
console.log(`poids images     : ${mb(totalImg)} Mo`);

const failed = problems.liens.length + problems.images.length + problems.ancres.length;
process.exit(failed ? 1 : 0);
