#!/bin/bash
# ============================================================================
# TFG PULL.SH — Pull from Remote
# ============================================================================
# Actualizar repositorio desde GitHub
# 
# Uso: ./scripts-workflow/pull.sh
# Uso desde Makefile: make pull
# ============================================================================

set -e

echo "📥 Git Pull desde GitHub..."
echo ""

git pull origin main || { echo "❌ Pull fallido"; exit 1; }

echo "✅ Pull completado"
