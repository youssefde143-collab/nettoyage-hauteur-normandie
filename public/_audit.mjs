/* Outil d'audit utilisé uniquement en développement (non référencé par les pages). */
export function audit(doc = document, win = window) {
  const gcs = (el) => win.getComputedStyle(el);
  const out = { url: doc.location.pathname, w: win.innerWidth, overflow: [], contrast: [], tap: [], misc: [] };
  const de = doc.documentElement;
  if (de.scrollWidth > de.clientWidth + 1) {
    out.misc.push(`DEBORDEMENT page: ${de.scrollWidth} > ${de.clientWidth}`);
    for (const el of doc.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && (r.right > de.clientWidth + 2 || r.left < -2)) {
        out.overflow.push(el.tagName + "." + String(el.className || "").slice(0, 48) + ` [${Math.round(r.left)}->${Math.round(r.right)}]`);
        if (out.overflow.length > 8) break;
      }
    }
  }
  const lum = (c) => { const [r, g, b] = c.map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * r + .7152 * g + .0722 * b; };
  const parse = (s) => (String(s).match(/[\d.]+/g) || []).slice(0, 3).map(Number);
  const bgOf = (el) => { let e = el; while (e) { const b = gcs(e).backgroundColor; if (b && !/rgba\(0, 0, 0, 0\)|transparent/.test(b)) return parse(b); e = e.parentElement; } return [255, 255, 255]; };
  const seen = new Set();
  for (const el of doc.querySelectorAll("p,a,li,h1,h2,h3,h4,span,button,label,td,th,em,strong,dd,dt,summary,figcaption,legend,b,i")) {
    if (![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
    const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
    const cs = gcs(el); if (cs.visibility === "hidden" || cs.opacity === "0") continue;
    const L1 = lum(parse(cs.color)), L2 = lum(bgOf(el));
    const ratio = (Math.max(L1, L2) + .05) / (Math.min(L1, L2) + .05);
    const size = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight) >= 700;
    const need = (size >= 24 || (size >= 18.66 && bold)) ? 3 : 4.5;
    if (ratio < need) {
      const k = cs.color + "|" + el.tagName + "|" + el.className;
      if (!seen.has(k)) { seen.add(k); out.contrast.push(`${el.tagName}.${String(el.className || "").slice(0, 30)} ${ratio.toFixed(2)}:1 (min ${need}) "${el.textContent.trim().slice(0, 34)}"`); }
    }
  }
  for (const el of doc.querySelectorAll("a,button,input,select,textarea,summary")) {
    const r = el.getBoundingClientRect();
    if (r.width && r.height && (r.height < 24 || r.width < 24)) out.tap.push(`${el.tagName} ${Math.round(r.width)}x${Math.round(r.height)} "${String(el.textContent || el.name || "").trim().slice(0, 26)}"`);
  }
  doc.querySelectorAll("a").forEach(a => { if (!a.textContent.trim() && !a.getAttribute("aria-label")) out.misc.push("lien sans nom: " + a.getAttribute("href")); });
  doc.querySelectorAll("input,select,textarea").forEach(f => { if (f.type === "hidden") return; const l = (f.labels && f.labels.length) || f.getAttribute("aria-label") || f.getAttribute("aria-labelledby"); if (!l) out.misc.push("champ sans label: " + (f.name || f.id)); });
  const imgs = [...doc.querySelectorAll("img")];
  out.misc.push(`images:${imgs.length} cassees:${imgs.filter(i => i.complete && i.naturalWidth === 0).length}`);
  return out;
}
