/* Serveur de prévisualisation local — sert dist/ avec des URL propres. */
import { createServer } from "node:http";
import { createGzip } from "node:zlib";
import { Readable } from "node:stream";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const PORT = Number(process.env.PORT || 4173);
const ROOT = fileURLToPath(new URL("./dist/", import.meta.url));
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8", ".webp": "image/webp", ".svg": "image/svg+xml",
  ".woff2": "font/woff2", ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".ico": "image/x-icon",
};

/* ------------------------------------------------------------------
   Réception des demandes de devis.
   Point de terminaison réel : valide la demande, l'enregistre sur le
   disque dans demandes/, et répond 200. Permet d'éprouver la chaîne
   complète en local, exactement comme le fera le service retenu en
   production (voir INTEGRATION.md).
   ------------------------------------------------------------------ */
/* Mêmes noms de champs que le formulaire en six étapes de /contact/. */
const OBLIGATOIRES = ["nom", "email", "telephone", "type_client", "prestations",
                      "adresse", "consentement"];

async function recevoirDemande(req, res) {
  const chunks = [];
  let taille = 0;
  for await (const c of req) {
    taille += c.length;
    if (taille > 45 * 1024 * 1024) { // 5 fichiers de 8 Mo + marge
      res.writeHead(413, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ erreur: "Demande trop volumineuse." }));
    }
    chunks.push(c);
  }
  const brut = Buffer.concat(chunks);

  // Analyse sommaire du multipart : on extrait les champs texte et compte les fichiers.
  const type = req.headers["content-type"] || "";
  const limite = /boundary=(?:"([^"]+)"|([^;]+))/.exec(type);
  const champs = {};
  let fichiers = 0;
  if (limite) {
    const sep = "--" + (limite[1] || limite[2]).trim();
    for (const part of brut.toString("binary").split(sep)) {
      const nom = /name="([^"]*)"/.exec(part);
      if (!nom) continue;
      if (/filename="[^"]+"/.test(part)) { fichiers++; continue; }
      const corps = part.split("\r\n\r\n").slice(1).join("\r\n\r\n");
      const valeur = Buffer.from(corps.replace(/\r\n$/, ""), "binary").toString("utf8").trim();
      if (valeur || !nom[1].endsWith("[]")) champs[nom[1]] = valeur;
    }
  }

  const manquants = OBLIGATOIRES.filter(c => !champs[c]);
  if (manquants.length) {
    res.writeHead(422, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ erreur: "Champs obligatoires manquants.", champs: manquants }));
  }
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(champs.email)) {
    res.writeHead(422, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ erreur: "Adresse e-mail invalide." }));
  }

  const horodatage = new Date().toISOString();
  const ref = "DEV-" + horodatage.slice(0, 10).replace(/-/g, "") + "-" +
              Math.random().toString(36).slice(2, 7).toUpperCase();
  await mkdir("demandes", { recursive: true });
  await writeFile(`demandes/${ref}.json`,
    JSON.stringify({ reference: ref, recue_le: horodatage, pieces_jointes: fichiers, ...champs }, null, 2));

  console.log(`→ demande reçue ${ref} — ${champs.nom} (${champs.adresse})`
    + (champs.parrainage ? `, parrainage ${champs.parrainage}` : "")
    + `, ${fichiers} pièce(s) jointe(s)`);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ ok: true, reference: ref }));
}

createServer(async (req, res) => {
  try {
    if (req.method === "POST" && new URL(req.url, "http://x").pathname === "/api/devis") {
      return await recevoirDemande(req, res);
    }
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    p = normalize(p).replace(/^(\.\.[/\\])+/, "");
    let file = join(ROOT, p);
    try {
      if ((await stat(file)).isDirectory()) file = join(file, "index.html");
    } catch { if (!extname(file)) file = join(ROOT, p, "index.html"); }
    const buf = await readFile(file);
    const ext = extname(file).toLowerCase();
    // Compression des ressources texte, comme le ferait un hébergeur en production.
    const compressible = [".html", ".css", ".js", ".mjs", ".svg", ".xml", ".txt", ".json"].includes(ext);
    const accepts = /\bgzip\b/.test(req.headers["accept-encoding"] || "");
    const gzip = compressible && accepts && buf.length > 512;
    res.writeHead(200, {
      ...(gzip ? { "Content-Encoding": "gzip", Vary: "Accept-Encoding" } : {}),
      "Content-Type": TYPES[ext] || "application/octet-stream",
      // En prévisualisation, le balisage, les styles et les scripts ne sont pas mis en cache ;
      // les images et les polices, dont le nom est stable, le sont longuement.
      "Cache-Control": [".html", ".css", ".js", ".mjs", ".xml", ".txt"].includes(ext)
        ? "no-store" : "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    });
    if (gzip) Readable.from(buf).pipe(createGzip()).pipe(res);
    else res.end(buf);
  } catch {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end('<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><title>Page introuvable</title></head><body style="font-family:system-ui;padding:3rem"><h1>404 — Page introuvable</h1><p><a href="/">Retour à l\'accueil</a></p></body></html>');
  }
}).listen(PORT, () => console.log(`Serveur prêt sur http://localhost:${PORT}`));
