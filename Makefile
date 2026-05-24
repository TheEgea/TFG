# Makefile — TFG workflow
# Run from repo root: make <target>
# ─────────────────────────────────────────────────────────────────────────────
.PHONY: help build build-vol1 build-vol2 build-vol3 build-all         build-memory build-annexes build-annexos build-viabilitat build-labs         build-web serve push pull sync status stats clean setup diagnostic

SHELL := /bin/bash
REPO_ROOT := $(shell pwd)

# ── Help ──────────────────────────────────────────────────────────────────────
help:
	@echo 'TFG — available targets'
	@echo '========================='
	@echo ''
	@echo '  VOLUMES (submission)'
	@echo '    make build-all          Build Vol I + II + III + IV (full submission)'
	@echo '    make build-vol1         Vol I  — Memory LaTeX (memory-main.pdf)'
	@echo '    make build-vol2         Vol II — Lab PDFs statement+solution (8 PDFs)'
	@echo '    make build-vol3         Vol III — Web MkDocs PDF (lab-documentation.pdf)'
	@echo '    make build-vol4         Vol IV  -- Annexes English   (annexes-main.pdf)'
	@echo ''
	@echo '  BUILD (individual)'
	@echo '    make build              Build Vol I + publish (legacy alias = build-vol1)'
	@echo '    make build-memory       Build Vol I only  (docs/main/memory/)'
	@echo '    make build-annexes      Build Annexes English (docs/main/annexes/)'
	@echo '    make build-annexos      Build Annexos LaTeX  (docs/main/annexos/)'
	@echo '    make build-viabilitat   Build Viabilitat   (docs/main/viabilitat/)'
	@echo '    make build-labs         Build all lab PDFs (statement + solution)'
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
	@cd docs/main/annexes && latexmk -xelatex -interaction=nonstopmode -quiet annexes-main.tex
	@echo ''
	@echo '========================================'
	@echo '  BUILD COMPLETE — Submission PDFs'
	@echo '========================================'
	@echo '  Vol I   Memory   : docs/main/memory/memory-main.pdf'
	@echo '  Vol II  Labs     : docs/web/docs/assets/official_Documents/labs-all.pdf'
	@echo '  Vol III Web      : docs/web/docs/assets/official_Documents/lab-documentation.pdf'
	@echo '  Vol IV  Annexes  : docs/main/annexes/annexes-main.pdf'
	@echo '========================================'

build-vol1: build-memory
	@echo ''
	@echo '  Vol I output : docs/main/memory/memory-main.pdf'
	@echo '  Copy also in : docs/web/docs/assets/official_Documents/memory-main.pdf'

build-vol2: build-labs
	@echo ''
	@echo '  Vol II output (split) : src/materials/exercises/lab{1-4}/build/'
	@echo '  Vol II output (all)   : docs/web/docs/assets/official_Documents/labs-all.pdf'

build-vol3:
	@bash scripts-workflow/build.sh vol3
	@echo ''
	@echo '  Vol III output: docs/web/docs/assets/official_Documents/lab-documentation.pdf'

build-vol4: build-annexes
	@echo ''
	@echo '  Vol IV output: docs/main/annexes/annexes-main.pdf'

# ── Build ─────────────────────────────────────────────────────────────────────
build: build-memory

build-memory:
	@bash scripts-workflow/build.sh memory

build-annexes:
	@cd docs/main/annexes && latexmk -xelatex -interaction=nonstopmode annexes-main.tex
	@echo ''
	@echo '  Vol IV output: docs/main/annexes/annexes-main.pdf'

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
