# 🔧 scripts-workflow/ — Workflow Automation

## Descripción

Conjunto de scripts bash para automatizar el flujo de trabajo del TFG:
- Git synchronization (sync, push, pull)
- Environment setup
- Utility functions (status, stats, clean)

## Estructura

'''
scripts-workflow/
├── sync.sh # Sincronización completa (pull + commit + push)
├── push.sh # Push rápido
├── pull.sh # Pull desde GitHub
├── utils.sh # Funciones auxiliares
├── setup-env.sh # Configuración del entorno
├── build-plantilla.sh # Referencia (deprecated)
└── README.md # Esta documentación

'''

## Uso Directo

```bash
# Sincronización completa
./scripts-workflow/sync.sh "Commit message"

# Push rápido
./scripts-workflow/push.sh "Commit message"

# Pull desde GitHub
./scripts-workflow/pull.sh

# Usar desde Makefile (RECOMENDADO)
make sync MSG="docs: actualización"
make push MSG="feat: nuevo laboratorio"
make pull
make status
make stats
Dependencias
bash 4.0+

git

xelatex, latexmk, biber (para compilación LaTeX)

Setup
'''
bash
# Configurar entorno
make setup
# o
./scripts-workflow/setup-env.sh
'''
ota sobre Nueva Estructura
Estos scripts ahora funcionan con:

docs/memoria/main.tex (Memoria final)

docs/avantprojecte/avantprojecte.tex (Propuesta inicial)

docs/chapters/ (Capítulos compartidos)

docs/resources/ (Recursos compartidos)

Ver ../Makefile para targets de compilación.

