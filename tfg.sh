#!/bin/bash
# Script launcher principal per TFG
# Ús: ./tfg.sh [comando] [args...]

SCRIPT_DIR="scripts-workflow"

case "$1" in
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
    "setup")
        ./$SCRIPT_DIR/setup-env.sh
        ;;
    "status")
        ./$SCRIPT_DIR/utils.sh status
        ;;
    "stats")
        ./$SCRIPT_DIR/utils.sh stats
        ;;
    "clean")
        ./$SCRIPT_DIR/utils.sh clean
        ;;
    "help"|"--help"|"-h"|"")
        echo "🎓 TFG Scripts Launcher"
        echo "======================"
        echo ""
        echo "Ús: ./tfg.sh [comando] [args...]"
        echo ""
        echo "Comandos disponibles:"
        echo "  sync \"msg\"   - Sincronització completa Git"
        echo "  push \"msg\"   - Push ràpid amb commit"
        echo "  pull          - Pull des de GitHub"
        echo "  backup        - Backup al servidor SMB"
        echo "  setup         - Configurar entorn (obre VSCode)"
        echo "  status        - Estat del repositori"
        echo "  stats         - Estadístiques del projecte"
        echo "  clean         - Netejar arxius temporals"
        echo "  help          - Mostrar aquesta ajuda"
        echo ""
        echo "Exemples:"
        echo "  ./tfg.sh sync \"docs: actualització memòria\""
        echo "  ./tfg.sh push \"feat: nou laboratori\""
        echo "  ./tfg.sh backup"
        echo "  ./tfg.sh setup"
        echo ""
        echo "Per més detalls: cat scripts-workflow/README.md"
        ;;
    *)
        echo "❌ Comando desconegut: $1"
        echo "Ús: ./tfg.sh help per veure comandos disponibles"
        ;;
esac
