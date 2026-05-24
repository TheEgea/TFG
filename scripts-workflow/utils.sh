#!/bin/bash
# ============================================================================
# TFG UTILS.SH — Utility Functions
# ============================================================================
# Helper functions: status, stats, clean
# 
# Usage: ./scripts-workflow/utils.sh [status|stats|clean]
# ============================================================================

set -e

case "$1" in
    "status")
        echo "Repository status"
        echo ""
        git status --short
        echo ""
        git log --oneline -5
        ;;
    "stats")
        echo "Project statistics"
        echo ""
        echo "LaTeX files:"
        find docs -name "*.tex" | wc -l
        echo ""
        echo "Lines of code (TeX + scripts):"
        find docs -name "*.tex" -o -name "*.sh" | xargs wc -l | tail -1
        echo ""
        echo "Repository size:"
        du -sh . | cut -f1
        ;;
    "clean")
        echo "Cleaning temporary files..."
        find . -name "*.aux" -delete
        find . -name "*.log" -delete
        find . -name "*.out" -delete
        find . -name ".DS_Store" -delete
        echo "Cleanup complete"
        ;;
    *)
        echo "Unknown command: $1"
        echo "Usage: utils.sh [status|stats|clean]"
        ;;
esac
