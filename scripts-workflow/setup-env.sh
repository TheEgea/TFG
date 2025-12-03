#!/bin/bash
# ============================================================================
# TFG SETUP-ENV.SH — Environment Setup
# ============================================================================
# Configurar entorno: instalar dependencias, abrir VS Code
# 
# Uso: ./scripts-workflow/setup-env.sh
# Uso desde Makefile: make setup
# ============================================================================

set -e

echo ⚙️  Configurando entorno TFG..."
echo ""

# Verificar dependencias
echo "✓ Verificando dependencias..."

if ! command -v xelatex &> /dev/null; then
    echo "❌ XeLaTeX no instalado. Instala TeX Live:"
    echo "   Ubuntu/Debian: sudo apt-get install texlive-xetex texlive-latex-extra"
    echo "   macOS: brew install --cask mactex"
    exit 1
fi

if ! command -v latexmk &> /dev/null; then
    echo "❌ latexmk no instalado. Instálalo:"
    echo "   Ubuntu/Debian: sudo apt-get install latexmk"
    echo "   macOS: brew install latexmk"
    exit 1
fi

if ! command -v biber &> /dev/null; then
    echo "❌ biber no instalado. Instálalo:"
    echo "   Ubuntu/Debian: sudo apt-get install biber"
    echo "   macOS: brew install biber"
    exit 1
fi

echo "✅ Todas las dependencias están instaladas"
echo ""

# Abrir en VS Code si está disponible
if command -v code &> /dev/null; then
    echo "📂 Abriendo en VS Code..."
    code .
else
    echo "ℹ️  VS Code no encontrado (opcional)"
fi

echo "✅ Entorno configurado"
