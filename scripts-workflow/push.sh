#!/bin/bash
# ============================================================================
# TFG PUSH.SH — Quick Push Script
# ============================================================================
# Push rápido con commit
# 
# Uso: ./scripts-workflow/push.sh "Commit message"
# Uso desde Makefile: make push MSG="tu mensaje"
# ============================================================================

set -e

MSG="${1:-Quick push TFG}"

echo "📤 Git Push: $MSG"
echo ""

git add -A
git commit -m "$MSG" || echo "ℹ️  Nada que commitear"
git push origin main || { echo "❌ Push fallido"; exit 1; }

echo "✅ Push completado"
