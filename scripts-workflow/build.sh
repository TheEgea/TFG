#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# build.sh — Compile LaTeX documents and publish PDFs to web
#
# Usage:
#   bash scripts-workflow/build.sh [memory|annexos|viabilitat|vol3|all]
#
# Output:
#   Vol I       → docs/main/memory/memory-main.pdf
#   Vol II      → src/materials/exercises/labX/build/ (via build-labs.sh)
#   Vol III     → docs/web/site/pdf/lab-documentation.pdf
#   Viabilitat  → docs/main/viabilitat/viabilitat-main.pdf
#   All PDFs also copied → docs/web/docs/assets/official_Documents/
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WEB_OFFICIAL="$REPO_ROOT/docs/web/docs/assets/official_Documents"
TARGET="${1:-all}"

compile_doc() {
    local TEX_PATH="$1"
    local PROJECT_DIR; PROJECT_DIR="$(dirname "$TEX_PATH")"
    local PROJECT_FILE; PROJECT_FILE="$(basename "$TEX_PATH")"
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
        latexmk -xelatex             -interaction=nonstopmode             -file-line-error             -output-directory="$BUILD_AUX"             "$PROJECT_FILE"
        echo ""
        echo "=== Done: $(date '+%Y-%m-%d %H:%M:%S') ==="
    } 2>&1 | tee "$LOG_FILE"

    local PDF="$BUILD_AUX/$PROJECT_NAME.pdf"
    if [ -f "$PDF" ]; then
        cp "$PDF" "$PROJECT_DIR/$PROJECT_NAME.pdf"
        cp "$PDF" "$WEB_OFFICIAL/$PROJECT_NAME.pdf"
        echo "OK  $PROJECT_NAME.pdf -> $WEB_OFFICIAL/"
        echo "    Log: build/build.txt"
    else
        echo "FAIL $PROJECT_NAME — revisar build/build.txt"
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

if [ "$TARGET" = "viabilitat" ]; then
    compile_doc "$REPO_ROOT/docs/main/viabilitat/viabilitat-main.tex"
fi

if [ "$TARGET" = "all" ] || [ "$TARGET" = "vol3" ]; then
    echo "=== Building Vol III (web PDF) ==="
    WEB_DIR="$REPO_ROOT/docs/web"
    cd "$WEB_DIR"
    source .venv/bin/activate
    mkdocs build 2>&1 | tail -5
    deactivate 2>/dev/null || true
    cd "$REPO_ROOT"
    WEB_PDF="$WEB_DIR/site/pdf/lab-documentation.pdf"
    if [ ! -f "$WEB_PDF" ]; then
        echo "FAIL lab-documentation.pdf not found after mkdocs build"
        exit 1
    fi
    # Compile Vol III cover and prepend
    COVER_DIR="$REPO_ROOT/docs/main/vol3-cover"
    latexmk -cd -xelatex -interaction=nonstopmode -output-directory="$COVER_DIR/build" "$COVER_DIR/vol3-cover.tex" > /tmp/vol3-cover-build.log 2>&1
    COVER_PDF="$COVER_DIR/build/vol3-cover.pdf"
    if [ -f "$COVER_PDF" ]; then
        pdfunite "$COVER_PDF" "$WEB_PDF" "$WEB_OFFICIAL/lab-documentation.pdf"
        echo "OK  lab-documentation.pdf (cover+web) -> $WEB_OFFICIAL/"
    else
        cp "$WEB_PDF" "$WEB_OFFICIAL/lab-documentation.pdf"
        echo "WARN vol3-cover failed, publishing without cover"
    fi
fi


# Ensure memory-main.pdf is always in official_Documents (even when latexmk skips)
if [ "$TARGET" = "all" ] || [ "$TARGET" = "memory" ]; then
    MEM_PDF="$REPO_ROOT/docs/main/memory/build/aux/memory-main.pdf"
    if [ -f "$MEM_PDF" ]; then
        cp "$MEM_PDF" "$WEB_OFFICIAL/memory-main.pdf"
    fi
fi

echo ""
echo "=== Build complete ==="
echo "  PDFs published to $WEB_OFFICIAL/"
echo "  Next: git add docs/web/docs/assets/official_Documents/ && make push MSG=\"docs: update PDFs\""
