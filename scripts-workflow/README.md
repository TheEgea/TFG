# scripts-workflow/ — Build & Git Scripts

These scripts are called by the **root Makefile** — use `make <target>` from the repo root
instead of running them directly.

---

## Scripts

| Script | Called by | Purpose |
|--------|-----------|---------|
| `build.sh` | `make build / build-memory / build-annexos / build-viabilitat` | Compile LaTeX → PDF, publish to web |
| `build-labs.sh` | `make build-labs [LAB=labX]` | Compile lab enunciado + resolucion PDFs |
| `push.sh` | `make push MSG=…` | `git add -A && commit && push` |
| `pull.sh` | `make pull` | `git pull origin main` |
| `sync.sh` | `make sync MSG=…` | pull + commit + push |
| `utils.sh` | `make status / stats / clean` | Git status, file counts, remove artifacts |
| `setup-env.sh` | `make setup` | Check xelatex, latexmk, biber are installed |

---

## Build targets

### `build.sh [memory|annexos|viabilitat|all]`

| Target | Input | Output (local + web) |
|--------|-------|----------------------|
| `memory` | `docs/main/memory/memory-main.tex` | `memory-main.pdf` |
| `annexos` | `docs/main/annexos/annexos-main.tex` | `annexos-main.pdf` |
| `viabilitat` | `docs/main/viabilitat/viabilitat-main.tex` | `viabilitat-main.pdf` |
| `all` | all three above | all three PDFs |

All PDFs are also copied to `docs/web/docs/assets/official_Documents/` for the web site.
Build logs are saved to `docs/main/<doc>/build/build.txt`.

### `build-labs.sh [all|lab1|lab2|lab3|lab4]`

| Input | Output |
|-------|--------|
| `src/materials/exercises/labX/labX-enunciado.tex` | `src/materials/exercises/labX/build/labX-enunciado.pdf` |
| `src/materials/exercises/labX/labX-resolucion.tex` | `src/materials/exercises/labX/build/labX-resolucion.pdf` |

---

## Git workflow

```bash
make status                          # check what changed
make push MSG=docs: update ch2    # commit + push
make pull                            # pull latest
make sync MSG=chore: sync         # pull + commit + push
```

> `push.sh` uses `git add -A` — review staged changes with `make status` first.

---

## Utilities

```bash
make clean      # remove *.aux, *.log, *.out, .DS_Store
make stats      # line counts + repo size
make setup      # check xelatex, latexmk, biber
make diagnostic # run diagnostic.sh (path checks, missing resources)
```

---

## archive/

Deprecated scripts kept for reference:
- `build-web-pdf.sh` — superseded by mkdocs-with-pdf plugin (runs in CI)
- `plantilla-build.sh` — legacy avantprojecte builder, replaced by `build.sh`
- `Makefile.old` — previous Makefile that lived in this directory (now at repo root)
