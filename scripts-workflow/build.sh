#!/usr/bin/env bash
set -euo pipefail

DOC="${1:-avantprojecte/avantprojecte.tex}"
ROOT="$(dirname "$DOC")"
BASE="$(basename "$DOC" .tex)"

AUX_DIR="$ROOT/build/aux"
OUT_DIR="$ROOT/build/out"
FINAL_DIR="$ROOT/build/final"

mkdir -p "$AUX_DIR" "$OUT_DIR" "$FINAL_DIR"

# Requiere latexmk >= 4.8x para -out2dir; si no la tienes, omite -out2dir.
latexmk -pdf -cd -interaction=nonstopmode \
  -auxdir="$AUX_DIR" \
  -outdir="$OUT_DIR" \
  -out2dir="$FINAL_DIR" \
  "$DOC"

echo "PDF final en: $FINAL_DIR/$BASE.pdf"
