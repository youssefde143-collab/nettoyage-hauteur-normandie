#!/bin/bash
# Relève les dimensions réelles des images et régénère scripts/image-dims.json.
cd "$(dirname "$0")/.." || exit 1
tmp=$(mktemp)
for f in public/assets/img/*.webp; do
  sips -g pixelWidth -g pixelHeight "$f" 2>/dev/null \
    | awk -v n="$(basename "$f")" '/pixelWidth/{w=$2}/pixelHeight/{h=$2}END{print n, w"x"h}'
done > "$tmp"
python3 -I - "$tmp" <<'PY'
import re, json, sys
dims = {}
for line in open(sys.argv[1]):
    f, d = line.split()
    name = re.sub(r'-\d+\.webp$', '', f)
    w, h = map(int, d.split('x'))
    dims.setdefault(name, {})[w] = h
out = {n: {"w": max(v), "h": v[max(v)], "widths": sorted(v)} for n, v in sorted(dims.items())}
open('scripts/image-dims.json', 'w').write(json.dumps(out, indent=1) + "\n")
print(f"{len(out)} images mesurées")
PY
rm -f "$tmp"
