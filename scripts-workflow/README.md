# scripts-workflow/ — Build & Git Scripts

These scripts are called by the **root Makefile** — use `make <target>` from the repo root
instead of running them directly.

---

## Scripts

| Script | Called by | Purpose |
|--------|-----------|---------|
| `build.sh` | `make build-memory / build-annexes / build-annexos / build-vol3 / build-viabilitat` | Compile LaTeX → PDF, publish to `official_Documents/` |
| `build-labs.sh` | `make build-labs [LAB=labX]` | Compile lab exercise + solution PDFs for all 4 labs |
| `build-labs-cover.py` | `build-labs.sh` (internal) | Generate cover page for consolidated labs PDF |
| `push.sh` | `make push MSG=…` | `git add -A && commit && push` |
| `pull.sh` | `make pull` | `git pull origin main` |
| `sync.sh` | `make sync MSG=…` | pull + commit + push |
| `utils.sh` | `make status / stats / clean` | Git status, file counts, remove artifacts |
| `setup-env.sh` | `make setup` | Check xelatex, latexmk, biber are installed |

---

## Build targets

### `build.sh [memory|annexes|annexos|viabilitat|vol3|all]`

| Target | Input | Output (local + `official_Documents/`) |
|--------|-------|----------------------------------------|
| `memory` | `docs/main/memory/memory-main.tex` | `memory-main.pdf` (Vol I, ~98 pp) |
| `annexes` | `docs/main/annexes/annexes-main.tex` | `annexes-main.pdf` (Vol II — Annexes, English) |
| `annexos` | `docs/main/annexos/annexos-main.tex` | `annexos-main.pdf` (Vol II — Annexes, legacy) |
| `viabilitat` | `docs/main/viabilitat/viabilitat-main.tex` | `viabilitat-main.pdf` (feasibility study) |
| `vol3` | `docs/web/mkdocs.yml` | `lab-documentation.pdf` (Vol III — Web PDF, ~95 pp) |
| `all` | memory + annexos + vol3 | all three PDFs |

All PDFs are also copied to `docs/web/docs/assets/official_Documents/` for the web site.
Build logs are saved to `docs/main/<doc>/build/build.txt`.

### `build-labs.sh [all|lab1|lab2|lab3|lab4]`

Compiles exercise (`-enunciado`) and solution (`-resolucion`) PDFs for each lab.

| Input | Output |
|-------|--------|
| `src/materials/exercises/labX/labX-enunciado.tex` | `src/materials/exercises/labX/build/labX-enunciado.pdf` |
| `src/materials/exercises/labX/labX-resolucion.tex` | `src/materials/exercises/labX/build/labX-resolucion.pdf` |

After compiling all labs, `build-labs-cover.py` generates a cover page and all 8 PDFs are
merged into `docs/web/docs/assets/official_Documents/labs-all.pdf`.

Individual PDFs are also copied to `official_Documents/` (`lab1-enunciado.pdf`, etc.).

---

## Git workflow

```bash
make status                          # check what changed
make push MSG="docs: update ch2"     # commit + push
make pull                            # pull latest
make sync MSG="chore: sync"          # pull + commit + push
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
