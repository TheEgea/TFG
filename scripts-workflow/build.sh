#!/bin/bash
# build.sh - Multi-project builder

pathsToBuild=(
  "/home/overleaf/TFG/TFG/docs/main/memory/memory-main.tex"
  #"/home/overleaf/TFG/TFG/docs/main/viabilitat/viabilitat-main.tex"
  #"/home/overleaf/TFG/TFG/docs/main/appendix/avantprojecte-main.tex"
)

for PROJECT_PATH in "${pathsToBuild[@]}"; do
    PROJECT_DIR=$(dirname "$PROJECT_PATH")
    PROJECT_FILE=$(basename "$PROJECT_PATH")
    PROJECT_NAME="${PROJECT_FILE%-main.tex}"
    BUILD_AUX="$PROJECT_DIR/build/aux"

    mkdir -p "$BUILD_AUX"

    echo "=== Compilando: $PROJECT_NAME ==="
    cd "$PROJECT_DIR"

    latexmk -xelatex         -interaction=nonstopmode         -file-line-error         -output-directory="$BUILD_AUX"         "$PROJECT_FILE"

    PDF="$BUILD_AUX/${PROJECT_FILE%.tex}.pdf"
    if [ -f "$PDF" ]; then
        cp "$PDF" "$PROJECT_DIR/${PROJECT_FILE%.tex}.pdf"
        echo "✅ Build exitoso: $PROJECT_NAME"
    else
        echo "❌ Build fallido: $PROJECT_NAME"
    fi

    cd - > /dev/null
done

echo "=== Build completo ==="
