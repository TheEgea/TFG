#!/bin/bash
# ============================================================================
# TFG SETUP-ENV.SH — Dependency Check & Environment Setup
# ============================================================================
# Verifica todas las dependencias necesarias para compilar el TFG.
# Ejecutar en el servidor donde se compila (Overleaf VM u otro Linux con TeX Live).
#
# Uso: ./scripts-workflow/setup-env.sh
# Uso desde Makefile: make setup
#
# Dependencias requeridas:
#   LaTeX:   xelatex, latexmk, biber, xdvipdfmx (TeX Live 2022+)
#   Font:    OpenDyslexic (instalada en el sistema — crítico para XeTeX)
#   Python:  python3, pip, mkdocs, mkdocs-material, mkdocs-with-pdf
#   Git:     git
#
# Para instalar todo en Ubuntu/Debian:
#   sudo apt-get install -y texlive-xetex texlive-latex-extra texlive-bibtex-extra \
#       texlive-fonts-extra latexmk biber git python3 python3-pip python3-venv
#   # OpenDyslexic font:
#   mkdir -p ~/.local/share/fonts && cd /tmp
#   wget https://github.com/antijingoist/opendyslexic/releases/latest/download/OpenDyslexic.zip
#   unzip OpenDyslexic.zip -d ~/.local/share/fonts/OpenDyslexic && fc-cache -fv
#   # Python web deps (inside docs/web venv):
#   cd docs/web && python3 -m venv .venv && source .venv/bin/activate
#   pip install mkdocs mkdocs-material mkdocs-with-pdf
# ============================================================================

set -e

PASS=0
FAIL=0
WARN=0

ok()   { echo "  ✅ $1"; PASS=$((PASS+1)); }
fail() { echo "  ❌ $1"; FAIL=$((FAIL+1)); }
warn() { echo "  ⚠️  $1"; WARN=$((WARN+1)); }

echo ""
echo "======================================================================"
echo "  TFG — Dependency Check"
echo "======================================================================"
echo ""

# ── LaTeX tools ──────────────────────────────────────────────────────────────
echo "LaTeX tools:"
command -v xelatex     &>/dev/null && ok  "xelatex   $(xelatex --version | head -1)" \
                                   || fail "xelatex   NOT FOUND  →  sudo apt-get install texlive-xetex"
command -v latexmk     &>/dev/null && ok  "latexmk   $(latexmk --version 2>&1 | head -1)" \
                                   || fail "latexmk   NOT FOUND  →  sudo apt-get install latexmk"
command -v biber        &>/dev/null && ok  "biber     $(biber --version 2>&1 | head -1)" \
                                   || fail "biber     NOT FOUND  →  sudo apt-get install biber"
command -v xdvipdfmx   &>/dev/null && ok  "xdvipdfmx $(xdvipdfmx --version 2>&1 | head -1 | head -c 60)" \
                                   || fail "xdvipdfmx NOT FOUND  →  part of texlive-xetex"

# ── OpenDyslexic font (CRITICAL — XeTeX will fail silently without it) ───────
echo ""
echo "Font (critical for XeTeX build):"
if fc-list 2>/dev/null | grep -qi "OpenDyslexic"; then
    ok  "OpenDyslexic font installed ($(fc-list | grep -i 'OpenDyslexic' | wc -l) variants)"
else
    fail "OpenDyslexic NOT FOUND — PDF will fall back to a system font and look wrong"
    echo "       Install:"
    echo "         mkdir -p ~/.local/share/fonts"
    echo "         # Download from https://github.com/antijingoist/opendyslexic/releases"
    echo "         unzip OpenDyslexic.zip -d ~/.local/share/fonts/OpenDyslexic"
    echo "         fc-cache -fv"
fi

# ── Python & MkDocs ──────────────────────────────────────────────────────────
echo ""
echo "Python / MkDocs (web build):"
command -v python3 &>/dev/null && ok  "python3  $(python3 --version)" \
                               || fail "python3  NOT FOUND  →  sudo apt-get install python3"

VENV_PYTHON="docs/web/.venv/bin/python"
if [ -f "$VENV_PYTHON" ]; then
    ok "docs/web/.venv exists"
    $VENV_PYTHON -c "import mkdocs"          2>/dev/null && ok  "mkdocs installed" \
                                                          || fail "mkdocs NOT installed  →  cd docs/web && pip install mkdocs"
    $VENV_PYTHON -c "import material"        2>/dev/null && ok  "mkdocs-material installed" \
                                                          || warn "mkdocs-material not found  →  pip install mkdocs-material"
    $VENV_PYTHON -c "import mkdocs_with_pdf" 2>/dev/null && ok  "mkdocs-with-pdf installed" \
                                                          || warn "mkdocs-with-pdf not found  →  pip install mkdocs-with-pdf"
else
    fail "docs/web/.venv NOT FOUND"
    echo "       Create it:"
    echo "         cd docs/web && python3 -m venv .venv && source .venv/bin/activate"
    echo "         pip install mkdocs mkdocs-material mkdocs-with-pdf"
fi

# ── Git ───────────────────────────────────────────────────────────────────────
echo ""
echo "Version control:"
command -v git &>/dev/null && ok  "git  $(git --version)" \
                           || fail "git  NOT FOUND  →  sudo apt-get install git"
if command -v git &>/dev/null; then
    REMOTE=$(git remote get-url origin 2>/dev/null || echo "no remote")
    ok  "remote: $REMOTE"
fi

# ── Summary ───────────────────────────────────────────────────────────────────
echo ""
echo "======================================================================"
echo "  Results: $PASS passed  |  $WARN warnings  |  $FAIL failed"
echo "======================================================================"
echo ""

if [ "$FAIL" -gt 0 ]; then
    echo "  ❌ $FAIL required tool(s) missing — fix before running 'make build'"
    exit 1
elif [ "$WARN" -gt 0 ]; then
    echo "  ⚠️  Some optional tools missing — 'make build' will work, 'make build-web' may not"
else
    echo "  ✅ All dependencies satisfied — ready to build"
fi
echo ""
