# 📚 TFG: Pentesting Ètic en Entorns Virtualitzats amb EVE-NG

> **Treball Final de Grau | Final Degree Project**
> 
> Grau en Enginyeria Informàtica — Gestió i Sistemes d'Informació  
> Bachelor in Computer Engineering — Management and Information Systems
> 
> Centre Universitari TecnoCampus | 2025-2026
> 
> **Autor / Author:** Eloi Egea Rada  
> **Tutor / Supervisor:** Pere Vidiella i Catalan

---

## 📋 Contingut / Contents

### En Català / In Catalan

1. [🎯 Objectiu](#-objectiu)
2. [📁 Estructura del Projecte](#-estructura-del-projecte)
3. [🚀 Inici Ràpid](#-inici-ràpid)
4. [📖 Compilar la Memòria](#-compilar-la-memòria)
5. [🔧 Workflow Git](#-workflow-git)
6. [📊 Estructura de Directoris](#-estructura-de-directoris)
7. [⚙️ Requisits](#️-requisits)
8. [📝 Llicència](#-llicència)

### In English

1. [🎯 Objective](#-objective)
2. [📁 Project Structure](#-project-structure)
3. [🚀 Quick Start](#-quick-start)
4. [📖 Compile the Report](#-compile-the-report)
5. [🔧 Git Workflow](#-git-workflow)
6. [📊 Directory Structure](#-directory-structure)
7. [⚙️ Requirements](#️-requirements)
8. [📝 License](#-license)

---

## 🎯 Objectiu

Desenvolupar un conjunt de laboratoris pràctics en **EVE-NG (Emulated Virtual Environment Next Generation)** que integrin conceptes fonamentals del Grau en Enginyeria Informàtica amb tècniques de pentesting ètic.

**Objectius Principals:**
- 🔍 Reconeixement i enumeració de sistemes
- 🌐 Vulnerabilitats d'aplicacions web (OWASP Top 10)
- 📡 Anàlisi de tràfic de xarxa i criptografia
- 🔐 Escalada de privilegis (Unix/Windows)
- 📚 Documentació tècnica reproductible

---

## 📁 Estructura del Projecte

```
TFG/
├── 📄 Makefile                    ← Targets de compilació (memoria, avant, clean)
├── 🔧 tfg.sh                      ← Launcher principal dels scripts
│
├── 📚 docs/
│   ├── .latexmkrc                 ← Configuració universal de latexmk
│   ├── .latexmkrc                 ← Build configuration
│   │
│   ├── 📖 memoria/                ← MEMÒRIA FINAL
│   │   ├── main.tex               ← Document principal
│   │   └── build/                 ← Auto-generat (ignorat per Git)
│   │
│   ├── 📝 avantprojecte/          ← AVANTPROJECTE INICIAL
│   │   ├── avantprojecte.tex      ← Proposta inicial (caps 1-6)
│   │   └── build/                 ← Auto-generat (ignorat per Git)
│   │
│   ├── 📑 chapters/               ← CAPÍTOLS COMPARTITS
│   │   ├── 01_objecte.tex
│   │   ├── 02_estat_art.tex
│   │   ├── 03_objectius.tex
│   │   ├── 04_metodologia.tex
│   │   ├── 05_requeriments.tex
│   │   ├── 06_viabilitat.tex
│   │   └── dedicatoria.tex
│   │
│   ├── 📚 resources/              ← RECURSOS COMPARTITS
│   │   ├── 00_frontmatter.tex
│   │   ├── appendix_time_log.tex
│   │   ├── glossary.tex
│   │   └── references.bib
│   │
│   ├── 🖼️ images/                 ← IMATGES
│   │   ├── diagrams/
│   │   ├── screenshots/
│   │   ├── graphs/
│   │   ├── logo-tecnocampus.png
│   │   └── gantt_planning.png
│   │
│   └── 📋 plantilla/              ← Template de referència (no compilar)
│
├── 🔄 scripts-workflow/           ← AUTOMATITZACIÓ
│   ├── sync.sh                    ← Pull + Commit + Push
│   ├── push.sh                    ← Push ràpid
│   ├── pull.sh                    ← Pull
│   ├── utils.sh                   ← Status, stats, clean
│   ├── setup-env.sh               ← Setup entorn
│   └── README.md                  ← Documentació scripts
│
├── 📄 .gitignore
├── 📜 LICENSE
└── 📖 README.md                   ← AQUEST FITXER

```

---

## 🚀 Inici Ràpid

### Prerequisites

```bash
# macOS
brew install --cask mactex latexmk biber git

# Ubuntu/Debian
sudo apt-get install texlive-xetex texlive-latex-extra latexmk biber git

# Verificar instal·lació
xelatex --version
latexmk --version
biber --version
```

### Clone & Setup

```bash
# Clonar repositori
git clone https://github.com/TheEgea/TFG.git
cd TFG

# Setup entorn
make setup

# o manualment
./scripts-workflow/setup-env.sh
```

### Compilar

```bash
# Compilar memòria final
make memoria
# Genera: memoria_FINAL.pdf

# Compilar avantprojecte
make avant
# Genera: avantprojecte_FINAL.pdf

# Compilar ambdós
make all

# Netejar temporals
make clean
```

---

## 📖 Compilar la Memòria

### Targets Disponibles

| Comando | Descripció | Output |
|---------|-----------|--------|
| `make memoria` | Compila memoria final | `memoria_FINAL.pdf` |
| `make avant` | Compila avantprojecte | `avantprojecte_FINAL.pdf` |
| `make all` | Compila ambdós | Ambdós PDFs |
| `make clean` | Neteja build/ + PDFs | — |
| `make help` | Mostra aquesta ajuda | — |

### Exemple Complet

```bash
# Netejar + compilar
make clean
make memoria

# Verificar output
ls -lh memoria_FINAL.pdf

# Obrir PDF
open memoria_FINAL.pdf              # macOS
xdg-open memoria_FINAL.pdf          # Linux
```

### Troubleshooting

| Problema | Solució |
|----------|---------|
| `XeLaTeX not found` | Instal·la TeX Live (vegeu Prerequisites) |
| `glossaries error` | Executa `makeglossaries` dins `docs/memoria/` |
| `biber error` | Verifica que `references.bib` és vàlid |
| `font not found` | Verifica que OpenDyslexic està instal·lat |

---

## 🔧 Workflow Git

### Usar des de Makefile (RECOMANAT)

```bash
# Sincronització completa (pull + commit + push)
make sync MSG="docs: actualització capítols"

# Push ràpid
make push MSG="feat: nou laboratori"

# Pull
make pull

# Veure estatus
make status

# Estadístiques
make stats
```

### Usar directament els scripts

```bash
# Sincronització completa
./scripts-workflow/sync.sh "Commit message"

# Push
./scripts-workflow/push.sh "Commit message"

# Pull
./scripts-workflow/pull.sh

# Status
./scripts-workflow/utils.sh status

# Stats
./scripts-workflow/utils.sh stats
```

### Convencions de Commit

Seguir format **Conventional Commits**:

```
docs: actualització memòria
feat: nou laboratori de xarxes
fix: corregir ortografia capítol 3
refactor: reorganitzar scripts
test: validar compilació LaTeX
```

---

## 📊 Estructura de Directoris

### `docs/memoria/`
- **main.tex** — Document principal de la memòria
- **chapters/** — Capítols (01-07 + dedicatoria)
- **resources/** — Apèndixs, glossari, bibliografia
- **images/** — Imatges de la memòria
- **build/** — Output LaTeX (generat automàticament)

### `docs/avantprojecte/`
- **avantprojecte.tex** — Proposta inicial (capítols 1-6)
- **build/** — Output LaTeX
- Referencia a `chapters/` i `resources/` compartits

### `docs/chapters/` (Compartit)
Tots els capítols en `.tex`:
- 01_objecte.tex
- 02_estat_art.tex
- 03_objectius.tex
- 04_metodologia.tex
- 05_requeriments.tex
- 06_viabilitat.tex
- dedicatoria.tex

### `docs/resources/` (Compartit)
- 00_frontmatter.tex
- appendix_time_log.tex
- glossary.tex
- references.bib

---

## ⚙️ Requisits

### Sistema Operatiu

- macOS 10.14+
- Ubuntu 18.04+ / Debian 9+
- Windows 10+ (amb WSL2)

### Software Obligatori

```
✓ git >= 2.25
✓ XeLaTeX (TeX Live 2023+)
✓ latexmk >= 4.70
✓ biber >= 2.16
✓ OpenDyslexic fonts
```

### Software Optional

```
□ Visual Studio Code (per editar)
□ PDF reader (Skim, Adobe Reader, etc.)
□ Make >= 4.0
```

### Instal·lació de Dependències

**macOS:**
```bash
brew install --cask mactex
brew install latexmk biber
# OpenDyslexic se descarga automàticament en compilació
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install -y texlive-xetex texlive-latex-extra texlive-fonts-recommended
sudo apt-get install -y latexmk biber
sudo apt-get install -y fonts-opendyslexic
```

**Verificar Instal·lació:**
```bash
xelatex --version
latexmk --version
biber --version
fc-list | grep OpenDyslexic
```

---

## 📝 Llicència

Aquest projecte està llicenciat sota **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)**.

Per més detalls, veure [LICENSE](./LICENSE).

---

## 🌍 English Version

### Objective

Develop a set of practical laboratories in **EVE-NG** that integrate foundational concepts of the Bachelor's degree in Computer Engineering with ethical pentesting techniques.

**Main Objectives:**
- 🔍 Reconnaissance and system enumeration
- 🌐 Web application vulnerabilities (OWASP Top 10)
- 📡 Network traffic analysis and cryptography
- 🔐 Privilege escalation (Unix/Windows)
- 📚 Reproducible technical documentation

### Quick Start

```bash
git clone https://github.com/TheEgea/TFG.git
cd TFG
make setup
make memoria
```

### Compile the Report

```bash
make memoria    # Generate memoria_FINAL.pdf
make avant      # Generate avantprojecte_FINAL.pdf
make all        # Compile both
make clean      # Clean build artifacts
```

### Git Workflow

```bash
make sync MSG="commit message"       # Full sync
make push MSG="commit message"       # Quick push
make pull                            # Pull updates
make status                          # Repository status
make stats                           # Project statistics
```

### Requirements

- macOS 10.14+ / Ubuntu 18.04+ / Windows 10+ (WSL2)
- git, XeLaTeX, latexmk, biber
- OpenDyslexic fonts (recommended)

### License

Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0).

---

## 📞 Support & Contact

**Author:** Eloi Egea Rada  
**Supervisor:** Pere Vidiella i Catalan  
**Institution:** Centre Universitari TecnoCampus

---

**Última actualització / Last updated:** 3 de Desembre de 2025