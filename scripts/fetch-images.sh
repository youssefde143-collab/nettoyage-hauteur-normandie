#!/bin/bash
# Télécharge la bibliothèque d'images (Unsplash, licence Unsplash) en WebP, localement.
OUT="public/assets/img"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15"
ok=0; fail=0
while IFS='|' read -r name id widths; do
  [ -z "$name" ] && continue
  IFS=',' read -ra WS <<< "$widths"
  for w in "${WS[@]}"; do
    f="$OUT/${name}-${w}.webp"
    [ -s "$f" ] && continue
    url="https://images.unsplash.com/${id}?fm=webp&q=70&w=${w}&fit=max&auto=compress"
    code=$(curl -sL --max-time 60 -A "$UA" -o "$f" -w "%{http_code}" "$url")
    sz=$(stat -f%z "$f" 2>/dev/null || echo 0)
    if [ "$code" = "200" ] && [ "$sz" -gt 3000 ]; then ok=$((ok+1));
    else fail=$((fail+1)); echo "FAIL $name $w http=$code size=$sz"; rm -f "$f"; fi
  done
done < scripts/images.txt
echo "DONE ok=$ok fail=$fail"
