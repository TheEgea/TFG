#!/bin/bash
# build-labs.sh — compile enunciado + resolucion PDFs for all labs
# Usage: bash build-labs.sh [lab1|lab2|lab3|all]

set -e

EXERCISES="/home/overleaf/TFG/TFG/src/materials/exercises"
TARGET="${1:-all}"

build_lab() {
    local LAB="$1"
    local LAB_DIR="$EXERCISES/$LAB"
    local BUILD_DIR="$LAB_DIR/build"
    mkdir -p "$BUILD_DIR"

    for TEX in "$LAB_DIR/$LAB"-enunciado "$LAB_DIR/$LAB"-resolucion; do
        local BASE=$(basename "$TEX")
        if [ ! -f "$TEX.tex" ]; then
            echo "  SKIP $BASE.tex (not found)"
            continue
        fi
        echo "  Compiling $BASE..."
        cd "$LAB_DIR"
        latexmk -xelatex -interaction=nonstopmode \
            -output-directory="$BUILD_DIR" "$BASE.tex" \
            > "$BUILD_DIR/$BASE.log" 2>&1
        if [ -f "$BUILD_DIR/$BASE.pdf" ]; then
            echo "  OK $BASE.pdf"
        else
            echo "  FAIL $BASE — see $BUILD_DIR/$BASE.log"
        fi
        cd - > /dev/null
    done
}

echo "=== build-labs.sh ==="

if [ "$TARGET" = "all" ] || [ "$TARGET" = "lab1" ]; then
    echo "--- LAB1 ---"
    build_lab "lab1"
fi

if [ "$TARGET" = "all" ] || [ "$TARGET" = "lab2" ]; then
    echo "--- LAB2 ---"
    build_lab "lab2"
fi

if [ "$TARGET" = "all" ] || [ "$TARGET" = "lab3" ]; then
    echo "--- LAB3 ---"
    build_lab "lab3"
fi

echo "=== Done ==="
