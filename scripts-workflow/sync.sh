#!/bin/bash
# ============================================================================
# TFG SYNC.SH — Git Synchronization Script
# ============================================================================
# Sincronización completa: pull + commit + push
# Estructura: docs/memoria/ + docs/avantprojecte/ + scripts-workflow/
# 
# Uso: ./scripts-workflow/sync.sh "Commit message"
# Uso desde Makefile: make sync MSG="tu mensaje"
# ============================================================================

set -e

MSG="${1:-Sincronización TFG}"

echo "🔄 Git Sync: $MSG"
echo ""

# Pull desde remoto
echo "📥 Pull desde GitHub..."
git pull origin main || { echo "❌ Pull fallido"; exit 1; }

# Commit cambios
echo "📝 Commit: $MSG"
git add -A
git commit -m "$MSG" || echo "ℹ️  Nada que commitear"

# Push a remoto
echo "📤 Push a GitHub..."
git push origin main || { echo "❌ Push fallido"; exit 1; }

echo "✅ Sincronización completada"
