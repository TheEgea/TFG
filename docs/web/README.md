# docs/web — MkDocs site (Vol III)

MkDocs Material site published at [theegea.github.io/TFG](https://theegea.github.io/TFG).
This is Vol III of the TFG — detailed lab documentation, configuration references,
appendices web version, and setup guides. Compiles to ~100 pages PDF via WeasyPrint.

---

## Run locally

### Prerequisites

Python 3.10+ required. The virtual environment is already set up in `.venv/`.

```bash
cd docs/web

# Activate the existing venv
source .venv/bin/activate        # Linux/macOS
# .venv\Scripts\activate        # Windows

# Serve with live reload
mkdocs serve --dev-addr 0.0.0.0:8000
```

Open [http://localhost:8000/TFG/](http://localhost:8000/TFG/) in your browser.

> If running on a remote server (e.g. the Overleaf VM at 192.168.0.152),
> the site is accessible from the local network at `http://192.168.0.152:8000/TFG/`.

### First-time setup (if venv is missing)

```bash
cd docs/web
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Build static site (no server)

```bash
source .venv/bin/activate
mkdocs build
# Output -> docs/web/site/
```

### Build PDF (Vol III)

```bash
# From repo root:
make build-vol3
# Output -> docs/web/docs/assets/official_Documents/lab-documentation.pdf
```

### Deploy to GitHub Pages

Automatic via GitHub Actions on push to `main`. Manual deploy:

```bash
source .venv/bin/activate
mkdocs gh-deploy
```

---

## Site structure

```
docs/web/
├── mkdocs.yml                  <- site config, nav, theme, plugins
├── requirements.txt            <- Python deps (mkdocs-material, mkdocs-with-pdf, etc.)
├── pdf_template/               <- WeasyPrint PDF cover + admonition styles
│   ├── cover.html.j2
│   ├── admonitions.lua
│   └── tecnocampus.tex
├── docs/
│   ├── index.md                <- Home page
│   ├── annexos/                <- Appendices A–J (web version)
│   │   ├── app-a/              <- EVE-NG Installation (5 pages)
│   │   ├── app-b/              <- Lab 1 Reference (6 pages)
│   │   ├── app-c/              <- Lab 2 Reference (4 pages)
│   │   ├── app-d/              <- Lab 3 Reference (5 pages)
│   │   ├── app-e/              <- Platform Comparison (8 pages)
│   │   ├── app-f/              <- Objectives & KPIs (3 pages)
│   │   ├── app-g/              <- Methodology (3 pages)
│   │   ├── app-h/              <- Requirements (3 pages)
│   │   ├── app-i/              <- Feasibility (3 pages)
│   │   └── app-j/              <- Lab 4 Reference
│   ├── labs/
│   │   ├── lab1/               <- Reconnaissance (6 pages: index, router, firewall, server, pc1, parrot)
│   │   ├── lab2/               <- Web Vulns (8 pages: index, infra, vyos, server-a, server-b, flask, nginx, victim)
│   │   ├── lab3/               <- Incident Response (7 pages: index, infra, vyos, pfsense, server-web, server-db, walkthrough)
│   │   └── lab4/               <- Crypto & Stego (5 pages: index, infra, server-a, server-b, server-c)
│   ├── guides/
│   │   └── eve_ng_install_proxmox.md
│   ├── deployment/
│   │   └── cloud-init.md
│   ├── assets/
│   │   ├── init_configs/       <- Base configs (ISOs, VyOS, pfSense)
│   │   ├── official_Documents/ <- Published PDFs (all volumes)
│   │   ├── exercises/          <- Lab exercise + solution PDFs (8 files)
│   │   ├── fonts/              <- OpenDyslexic font files (.otf)
│   │   ├── images/labs/        <- Topology diagrams
│   │   ├── screenshots/        <- VM creation screenshots
│   │   ├── javascripts/        <- Chatbot JS
│   │   └── stylesheets/        <- Chatbot CSS
│   └── stylesheets/
│       └── extra.css           <- OpenDyslexic font-face + custom styles
└── .venv/                      <- Python virtual environment (not committed)
```

---

## Theme and config

- Theme: [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- Palette: red (light + dark mode toggle)
- Font: OpenDyslexic (accessibility)
- Features: instant navigation, code copy, search, content tabs, navigation indexes
- Markdown extensions: admonitions, superfences, mermaid diagrams, tabbed content
- PDF plugin: mkdocs-with-pdf (WeasyPrint backend)
