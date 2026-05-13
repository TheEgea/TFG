# Ethical Pentesting in Virtualized Environments with EVE-NG

> **Final Degree Project (TFG) — Bachelor in Computer Engineering (GEISI)**
> TecnoCampus University Centre | 2025–2026
>
> **Author:** Eloi Egea Rada
> **Supervisor:** Pere Vidiella i Catalan

---

## Objective

Design and implement a set of practical cybersecurity labs running on EVE-NG, aimed at
students of the *Introduction to Cybersecurity* course. Each lab covers a different
attack/defence scenario and is fully documented across three layers.

**Labs:**

| Lab | Topic | Status |
|-----|-------|--------|
| LAB1 | Network Recon & Enumeration | ✅ Complete |
| LAB2 | Web Application Vulnerabilities (OWASP Top 10) | ✅ Complete |
| LAB3 | Incident Response & Log Forensics | 🚧 In Progress |
| LAB4 | Advanced Threats & Ransomware Defence | 🚧 In Progress |

---

## Documentation layers

| Layer | Format | Location | Purpose |
|-------|--------|----------|---------|
| **Capa 1** | LaTeX → PDF | `docs/main/` | Official academic thesis (Vol I memory + Vol II annexos) |
| **Capa 2** | MkDocs → GitHub Pages | `docs/web/` | Public technical annex — lab guides, config references |
| **Capa 3** | Markdown / LaTeX | `src/` | Operational material — technical references, student exercises |

Live site: [theegea.github.io/TFG](https://theegea.github.io/TFG)

---

## Quick start

### Prerequisites

```bash
# Ubuntu/Debian
sudo apt-get install -y texlive-xetex texlive-latex-extra latexmk biber fonts-opendyslexic

# macOS
brew install --cask mactex && brew install latexmk biber
```

### All commands via `make`

Run from repo root:

```bash
make help               # show all available targets

# Build official documents
make build              # Vol I + Vol II + viabilitat → PDFs published to web
make build-memory       # Vol I only
make build-annexos      # Vol II only
make build-viabilitat   # Viabilitat/feasibility only

# Build lab PDFs (enunciado + resolucion)
make build-labs         # all labs
make build-labs LAB=lab1  # single lab

# Web documentation
make serve              # local preview at http://localhost:8000/TFG/
make build-web          # build site (also auto-built by CI on push to main)

# Git workflow
make push MSG=docs: update chapter 5   # commit + push
make pull                                 # pull latest
make sync MSG=chore: sync              # pull + commit + push
make status                               # git status + recent commits

# Utilities
make setup              # check tool dependencies
make clean              # remove LaTeX build artifacts
make stats              # file counts + repo size
make diagnostic         # run build-system diagnostic
```

---

## Repository structure

```
TFG/
├── Makefile                         ← All workflow commands (start here)
├── diagnostic.sh                    ← Build-system diagnostic tool
│
├── docs/
│   ├── main/
│   │   ├── memory/                  ← Vol I — Official thesis (XeLaTeX)
│   │   │   ├── memory-main.tex
│   │   │   └── build/               ← PDF output (git-ignored)
│   │   ├── annexos/                 ← Vol II — Technical annexes
│   │   │   ├── annexos-main.tex
│   │   │   └── build/
│   │   └── viabilitat/              ← Feasibility study
│   │       ├── viabilitat-main.tex
│   │       └── build/
│   ├── chapters/                    ← Shared LaTeX chapters (01–08 + labs/)
│   ├── resources/
│   │   ├── glossary.tex
│   │   └── references.bib
│   ├── images/                      ← Logos, diagrams, screenshots
│   └── web/                         ← MkDocs site (Capa 2)
│       ├── mkdocs.yml
│       ├── docs/
│       │   ├── assets/official_Documents/  ← Published PDFs (committed)
│       │   ├── guides/
│       │   └── labs/
│       └── .venv/                   ← Python venv (not committed)
│
├── src/
│   ├── eve-ng/configs/              ← Authoritative EVE-NG node configs (Capa 3)
│   ├── materials/exercises/         ← Lab enunciados + resoluciones (LaTeX)
│   │   ├── lab1/
│   │   ├── lab2/
│   │   ├── lab3/
│   │   └── lab4/
│   └── scripts/automation/          ← ISO uploader and helpers
│
└── scripts-workflow/                ← Build + git scripts (called by Makefile)
    ├── build.sh                     ← Compile Vol I / Vol II / viabilitat
    ├── build-labs.sh                ← Compile lab PDFs
    ├── push.sh / pull.sh / sync.sh  ← Git helpers
    ├── utils.sh                     ← Status, stats, clean
    └── setup-env.sh                 ← Dependency check
```

---

## PDF outputs

| PDF | Command | Location |
|-----|---------|----------|
| Vol I — Memory | `make build-memory` | `docs/main/memory/memory-main.pdf` |
| Vol II — Annexos | `make build-annexos` | `docs/main/annexos/annexos-main.pdf` |
| Viabilitat | `make build-viabilitat` | `docs/main/viabilitat/viabilitat-main.pdf` |
| Web docs PDF | CI on push to main | [lab-documentation.pdf](https://theegea.github.io/TFG/pdf/lab-documentation.pdf) |
| Lab enunciados | `make build-labs` | `src/materials/exercises/labX/build/` |
| Lab resoluciones | `make build-labs` | `src/materials/exercises/labX/build/` |

After running `make build`, commit the updated PDFs:

```bash
make push MSG="docs: update official PDFs"
```

---

## Commit convention

`docs:` `feat:` `fix:` `refactor:` `chore:`

---

## License

[CC BY-NC-SA 4.0](./LICENSE) — free to share and adapt for non-commercial purposes with attribution.
