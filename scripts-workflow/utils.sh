#!/bin/bash
# Utilidades varias para el TFG

show_help() {
    echo "🎓 TFG Utils - Eloi Egea"
    echo "======================="
    echo ""
    echo "Scripts disponibles:"
    echo "  ./sync.sh \"mensaje\"    - Sincronización completa Git"
    echo "  ./push.sh \"mensaje\"    - Push rápido con commit"
    echo "  ./pull.sh              - Pull desde GitHub"
    echo "  ./backup-smb.sh        - Backup al servidor SMB"
    echo "  ./setup-env.sh         - Configurar entorno"
    echo ""
    echo "Comandos útiles:"
    echo "  ./utils.sh status      - Estado del repositorio"
    echo "  ./utils.sh clean       - Limpiar archivos temporales"
    echo "  ./utils.sh stats       - Estadísticas del proyecto"
    echo ""
}

show_status() {
    echo "📊 Estado del TFG"
    echo "================="
    echo ""
    git status
    echo ""
    echo "📈 Commits recientes:"
    git log --oneline -5
}

clean_temp() {
    echo "🧹 Limpiando archivos temporales..."
    find . -name "*.tmp" -delete
    find . -name "*.log" -delete
    find . -name "~$*" -delete
    echo "✅ Limpieza completada!"
}

show_stats() {
    echo "📈 Estadísticas TFG"
    echo "=================="
    echo ""
    echo "📁 Archivos por tipo:"
    find . -name "*.md" | wc -l | xargs echo "  Markdown:"
    find . -name "*.py" | wc -l | xargs echo "  Python:"
    find . -name "*.sh" | wc -l | xargs echo "  Scripts:"
    find . -name "*.pdf" | wc -l | xargs echo "  PDFs:"
    echo ""
    echo "📊 Líneas de código:"
    find . -name "*.py" -o -name "*.sh" -o -name "*.md" | xargs wc -l | tail -1
}

case "$1" in
    "help"|"-h"|"--help"|"")
        show_help
        ;;
    "status")
        show_status
        ;;
    "clean")
        clean_temp
        ;;
    "stats")
        show_stats
        ;;
    *)
        echo "❌ Comando no reconocido: $1"
        show_help
        ;;
esac
