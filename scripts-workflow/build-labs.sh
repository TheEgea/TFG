#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# build-labs.sh — Compile enunciado + resolucion PDFs for all labs (Vol II)
#
# Usage:
#   bash scripts-workflow/build-labs.sh [lab1|lab2|lab3|lab4|all]
#
# Output (per lab):
#   src/materials/exercises/labX/build/labX-enunciado.pdf
#   src/materials/exercises/labX/build/labX-resolucion.pdf
#
# All PDFs also copied → docs/web/docs/assets/official_Documents/
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
EXERCISES="$REPO_ROOT/src/materials/exercises"
WEB_OFFICIAL="$REPO_ROOT/docs/web/docs/assets/official_Documents"
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

echo "=== build-labs.sh (Vol II) ==="

for LAB in lab1 lab2 lab3 lab4; do
    if [ "$TARGET" = "all" ] || [ "$TARGET" = "$LAB" ]; then
        build_lab "$LAB"
    fi
done

echo ""
echo "--- Publishing Vol II PDFs to official_Documents/ ---"
mkdir -p "$WEB_OFFICIAL"
PUBLISHED=0
for LAB in lab1 lab2 lab3 lab4; do
    if [ "$TARGET" = "all" ] || [ "$TARGET" = "$LAB" ]; then
        for SUFFIX in enunciado resolucion; do
            local_pdf="$EXERCISES/$LAB/build/$LAB-$SUFFIX.pdf"
            if [ -f "$local_pdf" ]; then
                cp "$local_pdf" "$WEB_OFFICIAL/$LAB-$SUFFIX.pdf"
                echo "  OK  $LAB-$SUFFIX.pdf -> official_Documents/"
                PUBLISHED=$((PUBLISHED+1))
            fi
        done
    fi
done

echo ""
echo "--- Building labs-all.pdf (cover + TOC + all labs) ---"
COVER_PDF=$(python3 "$REPO_ROOT/scripts-workflow/build-labs-cover.py" "$REPO_ROOT" 2>/tmp/cover-build.log)
if [ $? -ne 0 ] || [ -z "$COVER_PDF" ]; then
    echo "  FAIL  labs-cover.pdf — see /tmp/cover-build.log"
    exit 1
fi
echo "  OK  labs-cover.pdf"
MERGE_INPUTS="$COVER_PDF"
for LAB in lab1 lab2 lab3 lab4; do
    for SUFFIX in enunciado resolucion; do
        PDF="$EXERCISES/$LAB/build/$LAB-$SUFFIX.pdf"
        if [ -f "$PDF" ]; then
            MERGE_INPUTS="$MERGE_INPUTS $PDF"
        fi
    done
done
pdfunite $MERGE_INPUTS "$WEB_OFFICIAL/labs-all.pdf"
echo "  OK  labs-all.pdf ($(du -h "$WEB_OFFICIAL/labs-all.pdf" | cut -f1))"

echo ""
echo "=== Done: $PUBLISHED PDFs published ==="
echo "  Source: src/materials/exercises/labX/build/"
echo "  Published: $WEB_OFFICIAL/"
