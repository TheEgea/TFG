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

**Labs planned:**

| Lab | Topic | Status |
|-----|-------|--------|
| LAB1 | Network Recon & Enumeration | ✅ Operational |
| LAB2 | Web Application Vulnerabilities (OWASP Top 10) | Planned |
| LAB3 | Network Traffic Analysis | Planned |
| LAB4 | Privilege Escalation | Planned |

---

## Documentation layers

| Layer | Format | Location | Purpose |
|-------|--------|----------|---------|
| **Capa 1** | LaTeX → PDF | `docs/` | Official academic thesis (memory + feasibility) |
| **Capa 2** | MkDocs → GitHub Pages | `docs/web/` | Public technical annex — lab guides, config references |
| **Capa 3** | Markdown / LaTeX | `src/` | Operational material — technical references, student exercises, automation scripts |

Live site: [theegea.github.io/TFG](https://theegea.github.io/TFG)

---

## Repository structure

```
TFG/
├── docs/
│   ├── main/
│   │   ├── memory/                  ← Official thesis (XeLaTeX, OpenDyslexic)
│   │   │   ├── memory-main.tex
│   │   │   └── build/               ← PDF output (git-ignored)
│   │   └── viabilitat/              ← Feasibility study
│   │       ├── viabilitat-main.tex
│   │       └── build/
│   ├── chapters/                    ← Shared chapters (01–08 + labs/)
│   ├── resources/
│   │   ├── glossary.tex
│   │   └── references.bib
│   ├── images/                      ← Logos, diagrams, screenshots
│   └── web/                         ← MkDocs site (Capa 2)
│       ├── mkdocs.yml
│       ├── docs/
│       │   ├── index.md
│       │   ├── assets/init_configs/ ← VyOS, pfSense, ISO selection
│       │   ├── guides/              ← EVE-NG on Proxmox install guide
│       │   └── labs/lab1/           ← Lab1 node config pages
│       └── .venv/                   ← Python venv (not committed)
│
├── src/
│   ├── eve-ng/
│   │   └── configs/
│   │       ├── LAB1-technical-reference.md  ← Authoritative Lab1 config
│   │       ├── LAB1-setup-session1.md       ← Historical build notes
│   │       ├── LAB1-setup-session2.md
│   │       └── LAB1-setup-session3.md
│   ├── materials/
│   │   └── exercises/lab1/
│   │       ├── lab1-enunciado.tex           ← Student assignment (PDF)
│   │       ├── lab1-resolucion.tex          ← Instructor solution guide (PDF)
│   │       └── build/                       ← Compiled PDFs
│   └── scripts/
│       └── automation/
│           ├── Iso_uploader.py              ← GUI tool to add ISOs to EVE-NG
│           ├── .env.example
│           └── requirements.txt
│
├── scripts-workflow/
│   ├── build.sh                     ← Build LaTeX docs
│   ├── build-labs.sh                ← Build lab PDFs
│   ├── sync.sh / push.sh / pull.sh  ← Git helpers
│   └── utils.sh                     ← Status, stats, clean
│
├── .gitignore
├── LICENSE                          ← CC BY-NC-SA 4.0
└── README.md
```

---

## Quick start

### Prerequisites

```bash
# Ubuntu/Debian
sudo apt-get install -y texlive-xetex texlive-latex-extra latexmk biber fonts-opendyslexic

# macOS
brew install --cask mactex && brew install latexmk biber
```

### Build official documents

```bash
./scripts-workflow/build.sh memory       # docs/main/memory/build/memory-main.pdf
./scripts-workflow/build.sh viabilitat   # docs/main/viabilitat/build/viabilitat-main.pdf
./scripts-workflow/build.sh all          # build everything
```

### Build lab PDFs

```bash
./scripts-workflow/build-labs.sh         # src/materials/exercises/lab1/build/*.pdf
```

### Run documentation site locally

```bash
cd docs/web
source .venv/bin/activate
mkdocs serve --dev-addr 0.0.0.0:8000
# open http://localhost:8000/TFG/
```

### Deploy site to GitHub Pages

```bash
cd docs/web
source .venv/bin/activate
mkdocs gh-deploy
```

---

## Git workflow

```bash
./scripts-workflow/sync.sh "docs: update chapter 5"   # pull + commit + push
./scripts-workflow/push.sh "fix: correct typo"         # quick push
./scripts-workflow/utils.sh status                     # git status + stats
```

Commit convention: `docs:` `feat:` `fix:` `refactor:` `chore:`

---

## License

[CC BY-NC-SA 4.0](./LICENSE) — free to share and adapt for non-commercial purposes with attribution.
