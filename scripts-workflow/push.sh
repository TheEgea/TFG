#!/bin/bash
# ============================================================================
# TFG PUSH.SH — Quick Push Script
# ============================================================================
# Quick commit + push
# 
# Usage: ./scripts-workflow/push.sh "Commit message"
# Usage from Makefile: make push MSG="your message"
# ============================================================================

set -e

MSG="${1:-Quick push TFG}"

echo "Git Push: $MSG"
echo ""

git add -A
git commit -m "$MSG" || echo "Nothing to commit"
git push origin main || { echo "Push failed"; exit 1; }

echo "Push complete"
