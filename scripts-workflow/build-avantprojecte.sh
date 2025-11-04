#!/usr/bin/env bash
set -euo pipefail

SRC="avantprojecte/avantprojecte.tex"
OUT="docs/avantprojecte/build"
AUX="$OUT/aux"

mkdir -p "$OUT" "$AUX"

latexmk -pdf -interaction=nonstopmode -file-line-error \
  -outdir="$OUT" \
  -auxdir="$AUX" \
  "$SRC"

echo "PDF generado en: $OUT/$(basename "$SRC" .tex).pdf"
