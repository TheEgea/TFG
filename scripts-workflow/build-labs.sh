#!/bin/bash
# build-labs.sh — compile lab PDFs
set -e

LAB_DIR="/home/overleaf/TFG/TFG/src/materials/exercises/lab1"
BUILD_DIR="$LAB_DIR/build"
mkdir -p "$BUILD_DIR"

for TEX in lab1-enunciado lab1-resolucion; do
    echo "=== Compiling $TEX ==="
    cd "$LAB_DIR"
    latexmk -xelatex -interaction=nonstopmode \
        -output-directory="$BUILD_DIR" "$TEX.tex"
    if [ -f "$BUILD_DIR/$TEX.pdf" ]; then
        echo "✅ $TEX.pdf"
    else
        echo "❌ Failed: $TEX"
    fi
done
echo "=== Done ==="
