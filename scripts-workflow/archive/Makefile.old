# Makefile — TFG workflow shortcuts
# Run from repo root: make <target>
.PHONY: help build build-memory build-annexos build-labs build-web \
        sync push pull status stats clean setup

help:
	@echo "TFG Makefile"
	@echo "============"
	@echo ""
	@echo "  make build           Build Vol I + Vol II, publish to web"
	@echo "  make build-memory    Build Vol I only"
	@echo "  make build-annexos   Build Vol II only"
	@echo "  make build-labs      Build all lab PDFs (enunciado + resolucion)"
	@echo "  make build-web       Build MkDocs site + PDF locally"
	@echo ""
	@echo "  make push MSG=\"msg\"  Commit + push to GitHub"
	@echo "  make pull            Pull from GitHub"
	@echo "  make status          Git status + last 5 commits"
	@echo "  make stats           File counts + sizes"
	@echo "  make clean           Remove local build artifacts"
	@echo "  make setup           Check tool dependencies"

build:
	@bash scripts-workflow/build.sh all

build-memory:
	@bash scripts-workflow/build.sh memory

build-annexos:
	@bash scripts-workflow/build.sh annexos

build-labs:
	@bash scripts-workflow/build-labs.sh all

build-web:
	@cd docs/web && mkdocs build

push:
	@bash scripts-workflow/push.sh "$(MSG)"

pull:
	@bash scripts-workflow/pull.sh

status:
	@bash scripts-workflow/utils.sh status

stats:
	@bash scripts-workflow/utils.sh stats

clean:
	@bash scripts-workflow/utils.sh clean

setup:
	@bash scripts-workflow/setup-env.sh
