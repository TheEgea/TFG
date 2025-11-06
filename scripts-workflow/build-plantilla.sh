#!/usr/bin/env bash
set -euo pipefail

# Posibles rutas al archivo principal .tex (añadir otras según convenga)
POSSIBLE_SRC=(
  # Priorizar la plantilla 'tfg_template' — el usuario indicó que quiere usarla
  "docs/avantprojecte/Template/tfg_template/main.tex"
  "docs/avantprojecte/Template/main.tex"
  "docs/docs/avantprojecte/main.tex"
  "avantprojecte/avantprojecte.tex"
)

# Selecciona la primera ruta existente
SRC=""
for p in "${POSSIBLE_SRC[@]}"; do
  if [ -f "$p" ]; then
    SRC="$p"
    break
  fi
done

if [ -z "$SRC" ]; then
  echo "Error: no se encontró el archivo fuente .tex. Busqué en: ${POSSIBLE_SRC[*]}" >&2
  exit 2
fi

# Construir rutas absolutas para que latexmk -cd no rompa los paths
SRC_DIR_ABS=$(cd "$(dirname "$SRC")" && pwd)
SRC_BASENAME=$(basename "$SRC")
OUT="$SRC_DIR_ABS/build"
AUX="$OUT/aux"

mkdir -p "$OUT" "$AUX"

echo "Usando fuente: $SRC"
echo "Directorio de salida: $OUT"

# -- Usamos -cd y pasamos solo el basename para compilar desde el directorio del .tex
latexmk -cd -pdf -interaction=nonstopmode -file-line-error \
  -outdir="$OUT" \
  -auxdir="$AUX" \
  "$SRC_DIR_ABS/$SRC_BASENAME"

echo "PDF generado en: $OUT/$(basename "$SRC" .tex).pdf"
