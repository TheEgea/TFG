# Makefile — TFG workflow
# Ejecutar desde la raíz del repo: make <target>
# ─────────────────────────────────────────────────────────────────────────────
.PHONY: help build build-vol1 build-vol2 build-vol3 build-all \
        build-memory build-annexos build-annexes build-viabilitat build-labs \
        build-web serve push pull sync status stats clean setup diagnostic

SHELL := /bin/bash
REPO_ROOT := $(shell pwd)

# ── Ayuda ─────────────────────────────────────────────────────────────────────
help:
	@echo 'TFG — objetivos disponibles'
	@echo '=============================='
	@echo ''
	@echo '  VOLÚMENES (entrega final)'
	@echo '    make build-all          Compila Vol I + Vol II (labs) + Vol III (web)'
	@echo '    make build-vol1         Vol I   — Memoria LaTeX       (memory-main.pdf)'
	@echo '    make build-vol2         Vol II  — PDFs de labs         (8 PDFs + labs-all.pdf)'
	@echo '    make build-vol3         Vol III — Web MkDocs PDF       (lab-documentation.pdf)'
	@echo ''
	@echo '  BUILD (individual)'
	@echo '    make build              Compila Vol I + publica (alias de build-vol1)'
	@echo '    make build-memory       Vol I — Memoria LaTeX          (docs/main/memory/)'
	@echo '    make build-annexes      Vol II — Annexes en inglés     (docs/main/annexes/)'
	@echo '    make build-annexos      Vol II — Annexes (legacy)      (docs/main/annexos/)'
	@echo '    make build-labs         Todos los PDFs de lab (enunciado + resolución)'
	@echo '    make build-labs LAB=lab1  Solo un lab concreto'
	@echo '    make build-web          Construye site MkDocs + PDF Vol III'
	@echo '    make build-viabilitat   Viabilitat económica           (docs/main/viabilitat/)'
	@echo ''
	@echo '  WEB'
	@echo '    make serve              Sirve el site en http://localhost:8000/TFG/'
	@echo ''
	@echo '  GIT'
	@echo '    make push MSG="msg"     Commit + push a GitHub'
	@echo '    make pull               Pull desde GitHub'
	@echo '    make sync MSG="msg"     Pull + commit + push'
	@echo '    make status             Estado git + últimos 5 commits'
	@echo ''
	@echo '  UTILIDADES'
	@echo '    make stats              Conteo de ficheros + tamaño del repo'
	@echo '    make clean              Elimina artefactos de compilación LaTeX'
	@echo '    make setup              Verifica dependencias del entorno'
	@echo '    make diagnostic         Diagnóstico del sistema de build'

# ── Volúmenes (entrega) ───────────────────────────────────────────────────────
build-all:
	@echo '=== Compilando todos los volúmenes ==='
	@bash scripts-workflow/build.sh memory
	@bash scripts-workflow/build-labs.sh all
	@bash scripts-workflow/build.sh vol3
	@echo ''
	@echo '========================================'
	@echo '  BUILD COMPLETO — PDFs de entrega'
	@echo '========================================'
	@echo '  Vol I   (Memoria)  : docs/main/memory/memory-main.pdf'
	@echo '  Vol II  (Labs)     : docs/web/docs/assets/official_Documents/labs-all.pdf'
	@echo '             (split) : src/materials/exercises/lab{1-4}/build/'
	@echo '  Vol III (Web/Apx)  : docs/web/docs/assets/official_Documents/lab-documentation.pdf'
	@echo ''
	@echo '  Todos los volúmenes también en: docs/web/docs/assets/official_Documents/'
	@echo '========================================'

build-vol1: build-memory
	@echo ''
	@echo '  Salida Vol I : docs/main/memory/memory-main.pdf'
	@echo '  Copia en     : docs/web/docs/assets/official_Documents/memory-main.pdf'

build-vol2: build-labs
	@echo ''
	@echo '  Salida Vol II (split) : src/materials/exercises/lab{1-4}/build/'
	@echo '  Salida Vol II (todo)  : docs/web/docs/assets/official_Documents/labs-all.pdf'

build-vol3:
	@bash scripts-workflow/build.sh vol3
	@echo ''
	@echo '  Salida Vol III: docs/web/docs/assets/official_Documents/lab-documentation.pdf'

# ── Build (individual) ────────────────────────────────────────────────────────
build: build-memory

build-memory:
	@bash scripts-workflow/build.sh memory

build-annexes:
	@cd docs/main/annexes && latexmk -xelatex -interaction=nonstopmode annexes-main.tex
	@echo ''
	@echo '  Salida Vol II — Annexes: docs/main/annexes/annexes-main.pdf'

build-annexos:
	@bash scripts-workflow/build.sh annexos

build-viabilitat:
	@bash scripts-workflow/build.sh viabilitat

build-labs:
	@bash scripts-workflow/build-labs.sh $(if $(LAB),$(LAB),all)

build-web:
	@cd docs/web && source .venv/bin/activate && mkdocs build

# ── Web ───────────────────────────────────────────────────────────────────────
serve:
	@cd docs/web && source .venv/bin/activate && mkdocs serve --dev-addr 0.0.0.0:8000

# ── Git ───────────────────────────────────────────────────────────────────────
push:
	@bash scripts-workflow/push.sh "$(MSG)"

pull:
	@bash scripts-workflow/pull.sh

sync:
	@bash scripts-workflow/sync.sh "$(MSG)"

status:
	@bash scripts-workflow/utils.sh status

# ── Utilidades ────────────────────────────────────────────────────────────────
stats:
	@bash scripts-workflow/utils.sh stats

clean:
	@bash scripts-workflow/utils.sh clean

setup:
	@bash scripts-workflow/setup-env.sh

diagnostic:
	@bash diagnostic.sh
