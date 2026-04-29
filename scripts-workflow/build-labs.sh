#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# build-labs.sh — Compile enunciado + resolucion PDFs for all labs
#
# Usage:
#   bash scripts-workflow/build-labs.sh [lab1|lab2|lab3|lab4|all]
#
# Output (per lab):
#   src/materials/exercises/labX/build/labX-enunciado.pdf
#   src/materials/exercises/labX/build/labX-resolucion.pdf
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
EXERCISES="$REPO_ROOT/src/materials/exercises"
TARGET="${1:-all}"

build_lab() {
    local LAB="$1"
    local LAB_DIR="$EXERCISES/$LAB"
    local BUILD_DIR="$LAB_DIR/build"

    if [ ! -d "$LAB_DIR" ]; then
        echo "  SKIP $LAB (directory not found)"
        return
    fi

    mkdir -p "$BUILD_DIR"
    echo "--- $LAB ---"

    for SUFFIX in enunciado resolucion; do
        local BASE="$LAB-$SUFFIX"
        local TEX="$LAB_DIR/$BASE.tex"
        if [ ! -f "$TEX" ]; then
            echo "  SKIP $BASE.tex (not found)"
            continue
        fi
        echo "  Compiling $BASE..."
        cd "$LAB_DIR"
        latexmk -xelatex -interaction=nonstopmode \
            -output-directory="$BUILD_DIR" "$BASE.tex" \
            > "$BUILD_DIR/$BASE.log" 2>&1
        if [ -f "$BUILD_DIR/$BASE.pdf" ]; then
            echo "  OK  $BASE.pdf"
        else
            echo "  FAIL $BASE — see $BUILD_DIR/$BASE.log"
            exit 1
        fi
        cd - > /dev/null
    done
}

echo "=== build-labs.sh ==="

for LAB in lab1 lab2 lab3 lab4; do
    if [ "$TARGET" = "all" ] || [ "$TARGET" = "$LAB" ]; then
        build_lab "$LAB"
    fi
done

echo "=== Done ==="
echo "  PDFs in src/materials/exercises/labX/build/"
