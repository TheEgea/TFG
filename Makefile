# Makefile — TFG workflow
# Run from repo root: make <target>
# ─────────────────────────────────────────────────────────────────────────────
.PHONY: help build build-vol1 build-vol2 build-vol3 build-all         build-memory build-annexos build-viabilitat build-labs         build-web serve push pull sync status stats clean setup diagnostic

SHELL := /bin/bash
REPO_ROOT := $(shell pwd)

# ── Help ──────────────────────────────────────────────────────────────────────
help:
	@echo 'TFG — available targets'
	@echo '========================='
	@echo ''
	@echo '  VOLUMES (submission)'
	@echo '    make build-all          Build Vol I + Vol II + Vol III (full submission)'
	@echo '    make build-vol1         Vol I  — Memoria LaTeX (memory-main.pdf)'
	@echo '    make build-vol2         Vol II — Lab PDFs enunciado+resolucion (8 PDFs)'
	@echo '    make build-vol3         Vol III — Web MkDocs PDF (lab-documentation.pdf)'
	@echo ''
	@echo '  BUILD (individual)'
	@echo '    make build              Build Vol I + publish (legacy alias = build-vol1)'
	@echo '    make build-memory       Build Vol I only  (docs/main/memory/)'
	@echo '    make build-annexos      Build Annexos LaTeX (docs/main/annexos/)'
	@echo '    make build-viabilitat   Build Viabilitat   (docs/main/viabilitat/)'
	@echo '    make build-labs         Build all lab PDFs (enunciado + resolucion)'
	@echo '    make build-labs LAB=lab1  Build a single lab'
	@echo '    make build-web          Build MkDocs site + Vol III PDF'
	@echo ''
	@echo '  WEB'
	@echo '    make serve              Serve MkDocs site at http://localhost:8000/TFG/'
	@echo ''
	@echo '  GIT'
	@echo '    make push MSG="msg"    Commit + push to GitHub'
	@echo '    make pull               Pull latest from GitHub'
	@echo '    make sync MSG="msg"    Pull + commit + push'
	@echo '    make status             Git status + last 5 commits'
	@echo ''
	@echo '  MISC'
	@echo '    make stats              File counts + repo size'
	@echo '    make clean              Remove LaTeX build artifacts'
	@echo '    make setup              Check tool dependencies'
	@echo '    make diagnostic         Run build-system diagnostic'

# ── Volumes (submission) ──────────────────────────────────────────────────────
build-all:
	@echo '=== Building all volumes ==='
	@bash scripts-workflow/build.sh memory
	@bash scripts-workflow/build-labs.sh all
	@bash scripts-workflow/build.sh vol3
	@echo ''
	@echo '=== All volumes built ==='
	@echo '  Vol I   : docs/main/memory/memory-main.pdf'
	@echo '  Vol II  : src/materials/exercises/labX/build/ (8 PDFs)'
	@echo '  Vol III : docs/web/site/pdf/lab-documentation.pdf'
	@echo '  Published: docs/web/docs/assets/official_Documents/'

build-vol1: build-memory

build-vol2: build-labs

build-vol3:
	@bash scripts-workflow/build.sh vol3

# ── Build ─────────────────────────────────────────────────────────────────────
build: build-memory

build-memory:
	@bash scripts-workflow/build.sh memory

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

# ── Misc ──────────────────────────────────────────────────────────────────────
stats:
	@bash scripts-workflow/utils.sh stats

clean:
	@bash scripts-workflow/utils.sh clean

setup:
	@bash scripts-workflow/setup-env.sh

diagnostic:
	@bash diagnostic.sh
