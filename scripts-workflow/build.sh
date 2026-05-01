#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# build.sh — Compile LaTeX documents (Vol I + Vol II) and publish to web
#
# Usage:
#   bash scripts-workflow/build.sh [memory|annexos|all]
#
# Output:
#   Vol I  → docs/main/memory/memory-main.pdf
#            docs/web/docs/assets/official_Documents/memory-main.pdf  ← web
#   Vol II → docs/main/annexos/annexos-main.pdf
#            docs/web/docs/assets/official_Documents/annexos-main.pdf ← web
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WEB_OFFICIAL="$REPO_ROOT/docs/web/docs/assets/official_Documents"
TARGET="${1:-all}"

compile_doc() {
    local TEX_PATH="$1"
    local PROJECT_DIR
    PROJECT_DIR="$(dirname "$TEX_PATH")"
    local PROJECT_FILE
    PROJECT_FILE="$(basename "$TEX_PATH")"
    local PROJECT_NAME="${PROJECT_FILE%.tex}"
    local BUILD_AUX="$PROJECT_DIR/build/aux"
    local LOG_FILE="$PROJECT_DIR/build/build.txt"

    mkdir -p "$BUILD_AUX"
    echo "=== Compiling: $PROJECT_NAME ==="
    cd "$PROJECT_DIR"

    {
        echo "=== Build: $PROJECT_NAME ==="
        echo "Date: $(date '+%Y-%m-%d %H:%M:%S')"
        echo ""
        latexmk -xelatex \
            -interaction=nonstopmode \
            -file-line-error \
            -output-directory="$BUILD_AUX" \
            "$PROJECT_FILE"
        echo ""
        echo "=== Done: $(date '+%Y-%m-%d %H:%M:%S') ==="
    } 2>&1 | tee "$LOG_FILE"

    local PDF="$BUILD_AUX/$PROJECT_NAME.pdf"
    if [ -f "$PDF" ]; then
        cp "$PDF" "$PROJECT_DIR/$PROJECT_NAME.pdf"
        cp "$PDF" "$WEB_OFFICIAL/$PROJECT_NAME.pdf"
        echo "OK $PROJECT_NAME.pdf -> $WEB_OFFICIAL/"
        echo "   Log guardado en: build/build.txt"
    else
        echo "FAIL $PROJECT_NAME -- revisar build/build.txt"
        exit 1
    fi
    cd - > /dev/null
}

if [ "$TARGET" = "all" ] || [ "$TARGET" = "memory" ]; then
    compile_doc "$REPO_ROOT/docs/main/memory/memory-main.tex"
fi

if [ "$TARGET" = "all" ] || [ "$TARGET" = "annexos" ]; then
    compile_doc "$REPO_ROOT/docs/main/annexos/annexos-main.tex"
fi

echo ""
echo "=== Build complete ==="
echo "  PDFs published to $WEB_OFFICIAL/"
echo "  Run: git add docs/web/docs/assets/official_Documents/ docs/main/*/memory-main.pdf docs/main/*/annexos-main.pdf"
