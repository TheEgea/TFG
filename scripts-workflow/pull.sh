#!/bin/bash
# ============================================================================
# TFG PULL.SH — Pull from Remote
# ============================================================================
# Update repository from GitHub
# 
# Usage: ./scripts-workflow/pull.sh
# Usage from Makefile: make pull
# ============================================================================

set -e

echo "Git Pull from GitHub..."
echo ""

git pull origin main || { echo "Pull failed"; exit 1; }

echo "Pull complete"
