#!/bin/bash
# ============================================================================
# tfg.sh - TFG Scripts Launcher (Actualizado para estructura nueva)
# ============================================================================
# Descripción: Launcher central para todos los comandos del TFG
# Uso: ./tfg.sh [comando] [args...]
# ============================================================================

SCRIPT_DIR="scripts-workflow"

case "$1" in
  # === BUILD TARGETS ===
  "build")
    shift
    ./$SCRIPT_DIR/build-plantilla.sh "$@"
    ;;
  
  # === GIT WORKFLOW ===
  "sync")
    shift
    ./$SCRIPT_DIR/sync.sh "$@"
    ;;
  "push")
    shift
    ./$SCRIPT_DIR/push.sh "$@"
    ;;
  "pull")
    ./$SCRIPT_DIR/pull.sh
    ;;
  "backup")
    ./$SCRIPT_DIR/backup-smb.sh
    ;;
  
  # === SETUP ===
  "setup")
    ./$SCRIPT_DIR/setup-env.sh
    ;;
  
  # === UTILITIES ===
  "status")
    ./$SCRIPT_DIR/utils.sh status
    ;;
  "stats")
    ./$SCRIPT_DIR/utils.sh stats
    ;;
  "clean")
    ./$SCRIPT_DIR/utils.sh clean
    ;;
  
  # === HELP ===
  "help"|"--help"|"-h"|"")
    echo ""
    echo "🎓 TFG Scripts Launcher - Eloi Egea Rada"
    echo "========================================"
    echo ""
    echo "📚 BUILD (Compilar LaTeX):"
    echo "  ./tfg.sh build memoria    → Compila memoria final"
    echo "  ./tfg.sh build avant      → Compila avantprojecte"
    echo "  ./tfg.sh build all        → Compila ambos"
    echo "  ./tfg.sh build clean      → Limpia temporales"
    echo ""
    echo "🔄 GIT WORKFLOW:"
    echo "  ./tfg.sh sync \"msg\"       → Sincronización completa"
    echo "  ./tfg.sh push \"msg\"       → Push rápido"
    echo "  ./tfg.sh pull             → Pull desde GitHub"
    echo ""
    echo "📊 UTILIDADES:"
    echo "  ./tfg.sh status           → Estado del repositorio"
    echo "  ./tfg.sh stats            → Estadísticas del proyecto"
    echo "  ./tfg.sh clean            → Limpia build/ + PDFs"
    echo ""
    echo "⚙️  SETUP:"
    echo "  ./tfg.sh setup            → Configuración inicial"
    echo ""
    echo "Ejemplos:"
    echo "  ./tfg.sh build memoria"
    echo "  ./tfg.sh sync \"docs: actualización capítulos\""
    echo "  ./tfg.sh push \"fix: correcciones ortografía\""
    echo ""
    ;;
  
  *)
    echo "❌ Comando desconocido: $1"
    echo "Usa: ./tfg.sh help para ver comandos disponibles"
    exit 1
    ;;
esac
