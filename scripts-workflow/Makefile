# Makefile para TFG - Comandos rápidos
.PHONY: help sync push pull backup clean setup status stats

help:
	@echo "🎓 TFG Makefile - Eloi Egea"
	@echo "=========================="
	@echo ""
	@echo "Comandos disponibles:"
	@echo "  make sync MSG=\"mensaje\"  - Sincronización completa"
	@echo "  make push MSG=\"mensaje\"  - Push rápido"
	@echo "  make pull                 - Pull desde GitHub"
	@echo "  make backup               - Backup al SMB"
	@echo "  make setup                - Configurar entorno"
	@echo "  make status               - Estado del repo"
	@echo "  make clean                - Limpiar temporales"
	@echo "  make stats                - Estadísticas proyecto"

sync:
	@../tfg.sh sync "$(MSG)"

push:
	@../tfg.sh push "$(MSG)"

pull:
	@../tfg.sh pull

backup:
	@../tfg.sh backup

setup:
	@../tfg.sh setup

status:
	@../tfg.sh status

clean:
	@../tfg.sh clean

stats:
	@../tfg.sh stats
