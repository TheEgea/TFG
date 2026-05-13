# Makefile — TFG workflow
# Run from repo root: make <target>
# ─────────────────────────────────────────────────────────────────────────────
.PHONY: help build build-memory build-annexos build-viabilitat build-labs         build-web serve push pull sync status stats clean setup diagnostic

REPO_ROOT := $(shell pwd)

# ── Help ──────────────────────────────────────────────────────────────────────
help:
	@echo 'TFG — available targets'
	@echo '========================='
	@echo ''
	@echo '  BUILD'
	@echo '    make build              Build Vol I + Vol II + publish PDFs to web'
	@echo '    make build-memory       Build Vol I only  (docs/main/memory/)'
	@echo '    make build-annexos      Build Vol II only (docs/main/annexos/)'
	@echo '    make build-viabilitat   Build viabilitat  (docs/main/viabilitat/)'
	@echo '    make build-labs         Build all lab PDFs (enunciado + resolucion)'
	@echo '    make build-labs LAB=lab1  Build a single lab'
	@echo '    make build-web          Build MkDocs site locally'
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

# ── Build ─────────────────────────────────────────────────────────────────────
build:
	@bash scripts-workflow/build.sh all

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
