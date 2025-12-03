#!/bin/bash
# ============================================================================
# TFG UTILS.SH — Utility Functions
# ============================================================================
# Funciones auxiliares: status, stats, clean
# 
# Uso: ./scripts-workflow/utils.sh [status|stats|clean]
# ============================================================================

set -e

case "$1" in
    "status")
        echo "📊 Estado del repositorio"
        echo ""
        git status --short
        echo ""
        git log --oneline -5
        ;;
    "stats")
        echo "📈 Estadísticas del proyecto"
        echo ""
        echo "📝 Archivos LaTeX:"
        find docs -name "*.tex" | wc -l
        echo ""
        echo "📊 Líneas de código (TeX + scripts):"
        find docs -name "*.tex" -o -name "*.sh" | xargs wc -l | tail -1
        echo ""
        echo "📦 Tamaño repositorio:"
        du -sh . | cut -f1
        ;;
    "clean")
        echo "🧹 Limpiando archivos temporales..."
        find . -name "*.aux" -delete
        find . -name "*.log" -delete
        find . -name "*.out" -delete
        find . -name ".DS_Store" -delete
        echo "✅ Limpieza completada"
        ;;
    *)
        echo "❌ Comando desconocido: $1"
        echo "Uso: utils.sh [status|stats|clean]"
        ;;
esac
