#!/bin/bash
# ============================================================================
# TFG SYNC.SH — Git Synchronization Script
# ============================================================================
# Full synchronization: pull + commit + push
# Structure: docs/memoria/ + docs/avantprojecte/ + scripts-workflow/
# 
# Usage: ./scripts-workflow/sync.sh "Commit message"
# Usage from Makefile: make sync MSG="your message"
# ============================================================================

set -e

MSG="${1:-TFG sync}"

echo "Git Sync: $MSG"
echo ""

# Pull from remote
echo "Pull from GitHub..."
git pull origin main || { echo "Pull failed"; exit 1; }

# Commit changes
echo "Commit: $MSG"
git add -A
git commit -m "$MSG" || echo "Nothing to commit"

# Push to remote
echo "Push to GitHub..."
git push origin main || { echo "Push failed"; exit 1; }

echo "Synchronization complete"
