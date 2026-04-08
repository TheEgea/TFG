# docs/web — MkDocs site

MkDocs Material site published at [theegea.github.io/TFG](https://theegea.github.io/TFG).
This is the technical annex (Capa 2) of the TFG — detailed lab documentation,
configuration references, and setup guides.

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
pip install mkdocs-material
```

### Build static site (no server)

```bash
source .venv/bin/activate
mkdocs build
# Output -> docs/web/site/
```

### Deploy to GitHub Pages

```bash
source .venv/bin/activate
mkdocs gh-deploy
# Pushes built site to the gh-pages branch of the repo
```

---

## Site structure

```
docs/web/
├── mkdocs.yml              <- site config, nav, theme
├── docs/
│   ├── index.md            <- home page
│   ├── assets/
│   │   ├── init_configs/
│   │   │   ├── selected-isos/index.md   <- ISO selection guide
│   │   │   ├── Router.md               <- VyOS full config
│   │   │   └── Firewall.md             <- pfSense full config
│   │   └── official_Documents/
│   ├── guides/
│   │   └── eve_ng_install_proxmox.md
│   └── labs/
│       └── lab1/
│           ├── index.md    <- Lab1 overview + topology
│           ├── router.md
│           ├── firewall.md
│           ├── server.md
│           └── pc1.md
└── .venv/                  <- Python virtual environment (not committed)
```

---

## Theme and config

- Theme: [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- Palette: red (light + dark mode toggle)
- Features: instant navigation, code copy, search, content tabs
- Markdown extensions: admonitions, superfences, mermaid diagrams, tabbed content
