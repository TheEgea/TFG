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
attack/defence scenario and is fully documented across four deliverable volumes.

**Labs:**

| Lab | Topic | Status |
|-----|-------|--------|
| LAB1 | Network Recon & Enumeration (PEBCAK Corp) | Complete |
| LAB2 | Web Application Vulnerabilities — SYNAPSE Portal | Complete |
| LAB3 | Incident Response & Log Forensics — HELIX Systems | Complete |
| LAB4 | Cryptography & Steganography CTF — CipherStrike | Complete |

---

## Submission volumes

| Volume | Format | Build command | Output | Pages |
|--------|--------|---------------|--------|-------|
| **Vol I — Memory** | LaTeX | `make build-vol1` | `docs/main/memory/memory-main.pdf` | ~100 |
| **Vol II — Labs** | LaTeX | `make build-vol2` | `docs/web/docs/assets/official_Documents/labs-all.pdf` | ~51 |
| **Vol III — Web** | MkDocs | `make build-vol3` | `docs/web/docs/assets/official_Documents/lab-documentation.pdf` | ~100 |
| **Vol IV — Annexes** | LaTeX | `make build-vol4` | `docs/main/annexes/annexes-main.pdf` | ~210 |

`make build-all` compiles all four volumes in one go.

Pre-built submission PDFs are in `submission/`.

Live web site: [theegea.github.io/TFG](https://theegea.github.io/TFG)

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
make help                 # show all available targets

# Build submission volumes
make build-all            # Vol I + II + III + IV
make build-vol1           # Vol I  — Memory
make build-vol2           # Vol II — Lab exercise + solution PDFs (8 PDFs merged)
make build-vol3           # Vol III — Web MkDocs PDF
make build-vol4           # Vol IV — Annexes (App A–J + lab walkthroughs)

# Build individual components
make build-memory         # Vol I only (alias for build-vol1)
make build-annexes        # Vol IV Annexes
make build-labs           # all lab exercise + solution PDFs
make build-labs LAB=lab1  # single lab

# Web
make serve                # local preview at http://localhost:8000/TFG/
make build-web            # build MkDocs site

# Git
make push MSG="docs: update chapter"
make pull
make status

# Utilities
make setup                # dependency check
make clean                # remove LaTeX artifacts
make stats                # file counts + repo size
make diagnostic           # build-system diagnostic
```

---

## Repository structure

```
TFG/
├── Makefile                           ← All workflow commands (start here)
│
├── docs/
│   ├── chapters/                      ← LaTeX chapter sources for Vol I
│   │   ├── 01_introduction.tex … 09_results.tex
│   │   ├── 09_conclusions.tex
│   │   ├── appendix/                  ← Appendix sources (App A–J)
│   │   │   ├── app_eve_setup.tex      ← App A: EVE-NG on Proxmox
│   │   │   ├── app_lab1_ref.tex … app_lab4_ref.tex  ← App B–D, J
│   │   │   ├── app_platforms.tex      ← App E: platform comparison
│   │   │   └── app_objectives_detail.tex … app_feasibility_detail.tex ← App F–I
│   │   └── labs/                      ← Lab chapters for Vol I
│   │       ├── lab1_recon.tex … lab4_crypto_stego.tex
│   │       └── pilot_validation.tex
│   ├── images/                        ← Topology diagrams + logos
│   ├── main/
│   │   ├── memory/memory-main.tex     ← ROOT Vol I
│   │   ├── annexes/                   ← ROOT Vol IV (18 chapters + embedded lab PDFs)
│   │   │   ├── annexes-main.tex
│   │   │   ├── ch01.tex … ch10.tex   ← App A through App J
│   │   │   └── ch11.tex … ch18.tex   ← ISOs, VyOS, pfSense, Cloud-Init, Lab 1–4
│   │   ├── vol3-cover/               ← LaTeX cover page for Vol III PDF
│   │   └── viabilitat/               ← Feasibility study (standalone build)
│   ├── resources/
│   │   ├── references.bib             ← Bibliography (biber/biblatex IEEE)
│   │   └── glossary.tex
│   └── web/                           ← MkDocs site source (Vol III)
│       ├── mkdocs.yml
│       ├── pdf_template/              ← WeasyPrint cover + admonitions
│       └── docs/
│           ├── annexos/app-a … app-j/ ← Appendices A–J web version
│           ├── labs/lab1 … lab4/      ← Lab guides (index + sub-pages per node)
│           └── assets/
│               ├── official_Documents/ ← Published PDFs (all volumes)
│               ├── exercises/         ← Lab exercise + solution PDFs
│               ├── fonts/             ← OpenDyslexic font files
│               └── images/labs/       ← Topology PNGs
│
├── src/
│   ├── chatbot/backend/               ← RAG chatbot (FastAPI + BM25 + Groq)
│   ├── eve-ng/
│   │   ├── topologies/                ← .unl topology files (4 labs)
│   │   ├── configs/nodes/             ← Per-lab, per-node configs and source code
│   │   │   ├── Lab1/ (pfsense, vyos, server, parrot, pc1)
│   │   │   ├── Lab2/ (server-a app + docker, server-b app, vyos, parrot)
│   │   │   ├── Lab3/ (server-web, server-db, vyos, pfsense)
│   │   │   └── Lab4/ (serverA, serverB, serverC generators + challenges, vyos, defender)
│   │   └── images/                    ← Topology diagrams PNG
│   ├── materials/exercises/           ← Lab exercise + solution LaTeX sources
│   │   ├── lab1/ lab2/ lab3/ lab4/
│   │   └── labs-cover/                ← Cover page for merged labs PDF
│   └── scripts/automation/            ← ISO uploader utility
│
├── submission/                        ← Pre-built PDFs for submission
│   ├── TFG_EgeaRada_Memory.pdf
│   └── TFG_EgeaRada_Documentation.pdf
│
├── scripts-workflow/                  ← Build and git helper scripts
│   ├── build.sh                       ← Compile LaTeX volumes
│   ├── build-labs.sh                  ← Compile lab PDFs
│   ├── setup-env.sh                   ← Dependency checker
│   └── push.sh / pull.sh / sync.sh   ← Git helpers
│
└── .github/workflows/                 ← CI: deploy MkDocs to GitHub Pages
```

---

## Annexes (Vol IV — `docs/main/annexes/`)

Vol IV contains 18 chapters compiled into a single PDF. Chapters 1–10 are the formal
appendices (App A–J); chapters 11–18 are extended configuration references and
per-lab walkthrough documentation with embedded exercise/solution PDFs.

| Ch | App | Source | Content |
|----|-----|--------|---------|
| 1 | A | `app_eve_setup.tex` | EVE-NG installation on Proxmox |
| 2 | B | `app_lab1_ref.tex` | Lab 1 instructor reference (PEBCAK Corp) |
| 3 | C | `app_lab2_ref.tex` | Lab 2 instructor reference (SYNAPSE) |
| 4 | D | `app_lab3_ref.tex` | Lab 3 instructor reference (HELIX Systems) |
| 5 | E | `app_platforms.tex` | Platform comparison (HTB, THM, SEED, etc.) |
| 6 | F | `app_objectives_detail.tex` | Objectives, deliverables & KPIs |
| 7 | G | `app_methodology_detail.tex` | Activity detail & quality assurance |
| 8 | H | `app_requirements_detail.tex` | Requirements detail (RF/TR/NFR) |
| 9 | I | `app_feasibility_detail.tex` | Feasibility tasks, risks & budget |
| 10 | J | `app_lab4_ref.tex` | Lab 4 instructor reference (CipherStrike) |
| 11 | — | `ch11.tex` | Basic configuration — Selected ISOs |
| 12 | — | `ch12.tex` | Basic configuration — VyOS Router |
| 13 | — | `ch13.tex` | Basic configuration — pfSense Firewall |
| 14 | — | `ch14.tex` | Cloud-Init lab provisioning |
| 15 | — | `ch15.tex` | LAB1 walkthrough + exercise/solution PDFs |
| 16 | — | `ch16.tex` | LAB2 walkthrough + exercise/solution PDFs |
| 17 | — | `ch17.tex` | LAB3 walkthrough + exercise/solution PDFs |
| 18 | — | `ch18.tex` | LAB4 walkthrough + exercise/solution PDFs |

The appendix LaTeX sources used by Vol I are in `docs/chapters/appendix/`.

---

## Chatbot

The web documentation includes an AI assistant that answers questions about the labs
using RAG (BM25 retrieval + Groq LLaMA). Source in `src/chatbot/backend/`.
Configure with a free [Groq API key](https://console.groq.com/).

---

## Commit convention

`docs:` `feat:` `fix:` `refactor:` `chore:`

---

## License

[CC BY-NC-SA 4.0](./LICENSE) — free to share and adapt for non-commercial purposes with attribution.
