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
| LAB1 | Network Recon & Enumeration (PEBCAK Corp) | ✅ Complete |
| LAB2 | Web Application Vulnerabilities — SYNAPSE Portal | ✅ Complete |
| LAB3 | Incident Response & Log Forensics — HELIX Systems | ✅ Complete |
| LAB4 | Cryptography & Steganography CTF — CipherStrike | ✅ Complete |

---

## Documentation layers

| Layer | Format | Location | Purpose |
|-------|--------|----------|---------|
| **Vol I** | LaTeX → PDF | `docs/main/memory/` | Official academic thesis |
| **Vol II** | LaTeX → PDF | `docs/main/annexes/` | Teacher reference appendices (A–J) |
| **Web** | MkDocs → GitHub Pages | `docs/web/` | Public lab guides, config references, chatbot |
| **Materials** | LaTeX / Markdown | `src/materials/` | Student exercise sheets + solution guides |
| **EVE-NG** | `.unl` + configs | `src/eve-ng/` | Topology files and node configurations |

Live site: [theegea.github.io/TFG](https://theegea.github.io/TFG)

---

## Quick start

### Prerequisites

```bash
# Check all dependencies
make setup

# Ubuntu/Debian manual install
sudo apt-get install -y texlive-xetex texlive-latex-extra latexmk biber
sudo mkdir -p /usr/share/fonts/opentype/opendyslexic
# Download OpenDyslexic fonts to that directory and run fc-cache -f
pip install mkdocs mkdocs-material mkdocs-with-pdf
```

### All commands via `make`

```bash
make help               # show all available targets

# Build official PDFs
make build              # Vol I + Vol II → PDFs
make build-memory       # Vol I only
make build-annexes      # Vol II Annexes only
make build-labs         # all lab exercise + solution PDFs
make build-labs LAB=lab1  # single lab

# Web
make serve              # local preview at http://localhost:8000/TFG/
make build-web          # build MkDocs site

# Git
make push MSG="docs: update chapter"
make pull
make status

# Utilities
make setup              # dependency check
make clean              # remove LaTeX artifacts
make stats              # file counts + repo size
make diagnostic         # build-system diagnostic
```

---

## Repository structure

```
TFG/
├── Makefile                         ← All workflow commands (start here)
│
├── docs/
│   ├── chapters/                    ← LaTeX chapters Vol I (01–09) + labs/
│   │   ├── appendix/                ← Appendix source files (App A–J)
│   │   └── labs/                    ← Lab compact chapters (lab1–lab4, pilot)
│   ├── main/
│   │   ├── memory/memory-main.tex   ← ROOT Vol I
│   │   └── annexes/annexes-main.tex ← ROOT Vol II
│   ├── resources/references.bib     ← Bibliography (biber/biblatex IEEE)
│   └── web/                         ← MkDocs site source
│       ├── mkdocs.yml
│       └── docs/
│           ├── annexes/app-a … app-j/   ← Appendices A–J web version
│           ├── labs/lab1 … lab4/        ← Lab guides (index + sub-pages per node)
│           └── assets/official_Documents/ ← Published PDFs
│
├── src/
│   ├── chatbot/backend/main.py      ← RAG chatbot (FastAPI + BM25 + Groq)
│   ├── eve-ng/
│   │   ├── topologies/              ← .unl files (import directly in EVE-NG)
│   │   ├── configs/                 ← Node configs (VyOS, pfSense, Ubuntu)
│   │   └── images/                  ← Topology diagrams PNG
│   └── materials/exercises/         ← Lab exercises + solutions (LaTeX)
│       ├── lab1/ lab2/ lab3/ lab4/
│
└── scripts-workflow/
    ├── build.sh                     ← Compile Vol I / Vol II
    ├── build-labs.sh                ← Compile lab PDFs
    ├── setup-env.sh                 ← Dependency checker
    └── push.sh / pull.sh / sync.sh  ← Git helpers
```

---

## Appendices (Vol II — `docs/chapters/appendix/`)

| App | File | Content |
|-----|------|---------|
| A | `app_eve_setup.tex` | EVE-NG installation on Proxmox |
| B | `app_lab1_ref.tex` | Lab1 teacher reference (PEBCAK Corp) |
| C | `app_lab2_ref.tex` | Lab2 teacher reference (SYNAPSE) |
| D | `app_lab3_ref.tex` | Lab3 teacher reference (HELIX Systems) |
| E | `app_platforms.tex` | External platform analysis (HTB, THM, SEED…) |
| F | `app_objectives_detail.tex` | Objectives, deliverables & KPIs |
| G | `app_methodology_detail.tex` | Methodology activity detail & QA |
| H | `app_requirements_detail.tex` | Requirements detail (RF/TR/NFR) |
| I | `app_feasibility_detail.tex` | Feasibility tasks, risks & budget |
| J | `app_lab4_ref.tex` | Lab4 teacher reference (CipherStrike) |

---

## Chatbot

The web documentation includes an AI assistant that answers questions about the labs
using RAG (BM25 retrieval + Groq LLaMA). Source in `src/chatbot/backend/`.
Configure with a free [Groq API key](https://console.groq.com/).

---

## PDF outputs

| PDF | Command | Path |
|-----|---------|------|
| Vol I Memory | `make build-memory` | `docs/main/memory/memory-main.pdf` |
| Vol II Annexes | `make build-annexes` | `docs/main/annexes/annexes-main.pdf` |
| Vol II Annexes (legacy) | `make build-annexos` | `docs/main/annexos/annexos-main.pdf` |
| Lab sheets | `make build-labs` | `src/materials/exercises/labX/build/` |

---

## Commit convention

`docs:` `feat:` `fix:` `refactor:` `chore:`

---

## License

[CC BY-NC-SA 4.0](./LICENSE) — free to share and adapt for non-commercial purposes with attribution.
