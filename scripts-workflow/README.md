# scripts-workflow/ — Build & Workflow Scripts

All commands are run from the **repo root** (`/home/overleaf/TFG/TFG`).

---

## Build scripts

### `build.sh` — Vol I + Vol II LaTeX

```bash
make build              # both volumes
make build-memory       # Vol I only (memory-main.tex)
make build-annexos      # Vol II only (annexos-main.tex)

# or directly:
bash scripts-workflow/build.sh [all|memory|annexos]
```

| Input | Output (local) | Output (web) |
|-------|---------------|--------------|
| `docs/main/memory/memory-main.tex` | `docs/main/memory/memory-main.pdf` | `docs/web/docs/assets/official_Documents/memory-main.pdf` |
| `docs/main/annexos/annexos-main.tex` | `docs/main/annexos/annexos-main.pdf` | `docs/web/docs/assets/official_Documents/annexos-main.pdf` |

After running, commit the updated PDFs in `docs/web/docs/assets/official_Documents/`.

---

### `build-labs.sh` — Lab enunciados + resoluciones

```bash
make build-labs                              # all labs
bash scripts-workflow/build-labs.sh lab1     # single lab
bash scripts-workflow/build-labs.sh [all|lab1|lab2|lab3|lab4]
```

| Input | Output |
|-------|--------|
| `src/materials/exercises/labX/labX-enunciado.tex` | `src/materials/exercises/labX/build/labX-enunciado.pdf` |
| `src/materials/exercises/labX/labX-resolucion.tex` | `src/materials/exercises/labX/build/labX-resolucion.pdf` |

These PDFs are committed to git so instructors can download them directly from the repo.

---

### `build-web-pdf.sh` — DEPRECATED

Superseded by the `mkdocs-with-pdf` plugin. The web PDF is now generated
automatically by GitHub Actions on every push to `main`.

To build locally: `cd docs/web && mkdocs build`
Output: `docs/web/site/pdf/lab-documentation.pdf`
Published at: `https://theegea.github.io/TFG/pdf/lab-documentation.pdf`

---

## Git workflow

```bash
make push MSG="docs: update ch2"   # commit + push
make pull                           # pull latest
make status                         # git status + log
```

> `push.sh` uses `git add -A` — review staged changes with `make status` first.

---

## Utilities

```bash
make clean    # remove *.aux, *.log, *.out, .DS_Store
make stats    # line counts + repo size
make setup    # check xelatex, latexmk, biber are installed
```

---

## PDF summary

| PDF | How created | Where published |
|-----|-------------|-----------------|
| Vol I — Memory | `make build-memory` | `official_Documents/memory-main.pdf` → embedded in web |
| Vol II — Annexos | `make build-annexos` | `official_Documents/annexos-main.pdf` → embedded in web |
| Web docs PDF | GitHub Actions (auto) | `https://theegea.github.io/TFG/pdf/lab-documentation.pdf` |
| Lab enunciados | `make build-labs` | `src/materials/exercises/labX/build/` (in git) |
| Lab resoluciones | `make build-labs` | `src/materials/exercises/labX/build/` (in git) |
| Viabilitat | compiled separately | `official_Documents/viabilitat-main.pdf` → embedded in web |
