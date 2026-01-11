# Final Degree Project: Ethical Pentesting in Virtualized Environments with EVE-NG
## Projecte Final de Grau: Pentesting Ètic en Entorns Virtualitzats amb EVE-NG

> **Final Degree Project (FDP) | Treball Final de Grau (TFG)**
> 
> Bachelor in Computer Engineering — Management and Information Systems  
> Grau en Enginyeria Informàtica — Gestió i Sistemes d'Informació  
> 
> TecnoCampus University Centre | 2025-2026
> 
> **Author / Autor:** Eloi Egea Rada  
> **Supervisor / Supervisor:** Pere Vidiella i Catalan

---

## 📋 Navigation / Navegació

### 🇬🇧 English
- [Objective](#-objective)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Building Documents](#-building-documents)
- [Git Workflow](#-git-workflow)
- [Directory Structure](#-directory-structure)
- [Requirements](#-requirements)
- [License](#-license)

### 🇪🇸 Català
- [Objectiu](#-objectiu)
- [Estructura del Projecte](#-estructura-del-projecte-1)
- [Inici Ràpid](#-inici-ràpid)
- [Compilar Documentos](#-compilar-documentos)
- [Workflow Git](#-workflow-git-1)
- [Estructura de Directoris](#-estructura-de-directoris-1)
- [Requisits](#-requisits)
- [Llicència](#-llicència)

---

# 🇬🇧 English Version

## Objective

Develop a comprehensive set of practical laboratories in **EVE-NG (Emulated Virtual Environment Next Generation)** that integrate foundational concepts from the Bachelor's degree in Computer Engineering with ethical pentesting techniques and cybersecurity best practices.

**Main Objectives:**
- Network reconnaissance and system enumeration
- Web application vulnerabilities (OWASP Top 10)
- Network traffic analysis and cryptography fundamentals
- Privilege escalation techniques (Unix/Windows)
- Reproducible technical documentation and reporting

---

## Project Structure

```
TFG/
├── Makefile                     ← Build targets (memoria, avant, viabilitat)
├── docs/
│   ├── .latexmkrc                  ← Universal latexmk configuration
│   │
│   ├── main/
│   │   ├── memory/                 ← MEMORY (Full Thesis)
│   │   │   ├── memory-main.tex     ← Main document (93 pages)
│   │   │   └── build/              ← Auto-generated (git-ignored)
│   │   │
│   │   ├── appendix/               ← AVANTPROJECTE (Preliminary Proposal + Appendices)
│   │   │   ├── avantprojecte-main.tex
│   │   │   └── build/              ← Auto-generated (git-ignored)
│   │   │
│   │   └── viabilitat/             ← VIABILITY ANALYSIS
│   │       ├── viabilitat-main.tex
│   │       └── build/              ← Auto-generated (git-ignored)
│   │
│   ├── chapters/                ← SHARED CHAPTERS
│   │   ├── 01_objecte.tex          ← Contextualization & Objectives
│   │   ├── 02_estat_art.tex        ← State of the Art
│   │   ├── 03_objectius.tex        ← Project Goals
│   │   ├── 04_metodologia.tex      ← Methodology
│   │   ├── 05_requeriments.tex     ← Functional Requirements
│   │   ├── 06_viabilitat.tex       ← Feasibility Study (Economic/Technical/Legal)
│   │   ├── 07_bibliografia.tex     ← Bibliography
│   │   └── dedicatoria.tex         ← Dedication
│   │
│   ├── resources/               ← SHARED RESOURCES
│   │   ├── glossary.tex            ← Technical glossary
│   │   ├── appendix_time_log.tex   ← Time tracking & resource allocation
│   │   └── references.bib          ← Bibliography (IEEE format)
│   │
│   ├── images/
│   │   ├── logo-tecnocampus.png
│   │   ├── gantt_planning.png
│   │   └── ...                     ← Diagrams, screenshots
│   │
│   └── plantilla/               ← Template reference (do NOT compile)
│
├── scripts-workflow/            ← AUTOMATION
│   ├── build.sh                    ← Unified build script
│   ├── sync.sh                     ← Git sync (pull + commit + push)
│   ├── push.sh                     ← Quick push
│   ├── pull.sh                     ← Pull updates
│   └── utils.sh                    ← Status, stats, clean
│
├── .gitignore
├── LICENSE
└── README.md                    ← THIS FILE
```

---

## Quick Start

### Prerequisites

**macOS:**
```bash
brew install --cask mactex
brew install latexmk biber
```

**Ubuntu/Debian:**
```bash
sudo apt-get install -y texlive-xetex texlive-latex-extra latexmk biber
sudo apt-get install -y fonts-opendyslexic
```

**Verify installation:**
```bash
xelatex --version
latexmk --version
biber --version
```

### Clone & Initialize

```bash
git clone https://github.com/TheEgea/TFG.git
cd TFG

# Optional: Setup environment
chmod +x scripts-workflow/*.sh
```

---

## 📖 Building Documents

### Using Build Script (Recommended)

```bash
# Build all documents
./scripts-workflow/build.sh all

# Build specific document
./scripts-workflow/build.sh memory      # memory-main.pdf (93 pages)
./scripts-workflow/build.sh avantprojecte
./scripts-workflow/build.sh viabilitat
```

### Build Targets

| Command | Output | Description |
|---------|--------|-------------|
| `./scripts-workflow/build.sh memory` | `memory-main.pdf` | Complete thesis (93 pages) |
| `./scripts-workflow/build.sh avantprojecte` | `avantprojecte-main.pdf` | Preliminary proposal + appendices |
| `./scripts-workflow/build.sh viabilitat` | `viabilitat-main.pdf` | Feasibility study (economic/technical) |
| `./scripts-workflow/build.sh all` | All above | Build everything |
| `./scripts-workflow/build.sh clean` | — | Clean all build artifacts |

### Manual Compilation

```bash
# Compile memory document
cd docs/main/memory
latexmk -xelatex memory-main.tex

# Compile avantprojecte
cd ../appendix
latexmk -xelatex avantprojecte-main.tex

# Compile viability
cd ../viabilitat
latexmk -xelatex viabilitat-main.tex
```

---

## Git Workflow

### Using Scripts

```bash
# Complete sync (pull + commit + push)
./scripts-workflow/sync.sh "docs: update memory chapters"

# Quick push
./scripts-workflow/push.sh "docs: fix typo in chapter 3"

# Pull updates
./scripts-workflow/pull.sh

# Status & statistics
./scripts-workflow/utils.sh status
./scripts-workflow/utils.sh stats
```

### Commit Conventions

Follow **Conventional Commits** format:

```
docs:       Documentation changes
feat:       New feature or functionality
fix:        Bug fixes
refactor:   Code reorganization
test:       Test additions or modifications
chore:      Maintenance tasks
```

Examples:
```
docs: update memory with latest research
feat: add new pentesting lab scenario
fix: correct glossary entries
refactor: reorganize chapter structure
```

---

## 📊 Document Contents

### Memory (memory-main.tex)
**93 pages | Full academic thesis**

| Section | Pages | Content |
|---------|-------|---------|
| Front Matter | 1-4 | Title, TOC, Glossary |
| Chapter 1 | 5-6 | Introduction & Context |
| Chapter 2 | 7-13 | State of the Art |
| Chapter 3 | 14-16 | Objectives & Scope |
| Chapter 4 | 17-19 | Methodology |
| Chapter 5 | 20-47 | Planning & Timeline (with Gantt) |
| Chapter 6 | 48-60 | Functional Requirements |
| Chapter 7 | 61-80 | Feasibility Study (Economic/Technical/Legal) |
| Chapter 8 | 81-82 | Development & Implementation |
| Chapter 9 | 83-86 | Results & Conclusions |
| Bibliography | 87-93 | References (IEEE format) |

### Avantprojecte (avantprojecte-main.tex)
**Preliminary proposal with appendices**

- Chapters 1-4 (Introduction through Methodology)
- Appendix A: Reproducible LaTeX Build Infrastructure
- Appendix B: HomeLab Setup & Network Architecture
- Appendix C: Time Tracking & Resource Allocation (820 hours)

### Viability Analysis (viabilitat-main.tex)
**Comprehensive feasibility study**

- Technical feasibility (infrastructure, tools, timeline)
- Economic feasibility (cost-benefit analysis)
- Legal feasibility (regulatory compliance, ethics)
- Environmental feasibility (sustainability, resource usage)

---

## Requirements

### System Requirements

- **OS:** macOS 10.14+, Ubuntu 18.04+, or Windows 10+ (WSL2)
- **Disk Space:** 2 GB minimum (TeX Live + build artifacts)
- **RAM:** 2 GB minimum (LaTeX compilation)

### Software Requirements

| Package | Minimum Version | Notes |
|---------|-----------------|-------|
| git | 2.25 | Version control |
| XeLaTeX | TeX Live 2023+ | LaTeX engine |
| latexmk | 4.70 | Automated compilation |
| biber | 2.16 | Bibliography processor |
| OpenDyslexic | Latest | Font for accessibility |

### Installation Verification

```bash
# macOS
brew list mactex
fc-list | grep OpenDyslexic

# Ubuntu/Debian
dpkg -l | grep texlive
fc-list | grep OpenDyslexic

# Check versions
xelatex --version
latexmk --version
biber --version
```

---

## License

This project is licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)**.

**You are free to:**
- Share — copy and redistribute the material
- Adapt — remix, transform, and build upon the material

**Under the following terms:**
- **Attribution** — You must give appropriate credit
- **NonCommercial** — You may not use for commercial purposes
- **ShareAlike** — You must distribute under the same license

For full details, see [LICENSE](./LICENSE).

---

# 🇪🇸 Versió en Català

## Objectiu

Desenvolupar un conjunt complet de laboratoris pràctics en **EVE-NG** que integrin conceptes fonamentals del Grau en Enginyeria Informàtica amb tècniques de pentesting ètic i millors pràctiques de ciberseguretat.

**Objectius Principals:**
- Reconeixement de xarxa i enumeració de sistemes
- Vulnerabilitats d'aplicacions web (OWASP Top 10)
- Anàlisi de tràfic de xarxa i criptografia
- Escalada de privilegis (Unix/Windows)
- Documentació tècnica reproductible

---

## Estructura del Projecte

```
TFG/
├── Makefile
├── docs/
│   ├── main/
│   │   ├── memory/                 ← MEMÒRIA (Tesi Completa)
│   │   │   ├── memory-main.tex     ← Document principal (93 pàgines)
│   │   │   └── build/
│   │   ├── appendix/               ← AVANTPROJECTE
│   │   │   ├── avantprojecte-main.tex
│   │   │   └── build/
│   │   └── viabilitat/             ← ANÀLISI DE VIABILITAT
│   │       ├── viabilitat-main.tex
│   │       └── build/
│   ├── chapters/                ← Capítols Compartits
│   ├── resources/               ← Recursos Compartits
│   └── images/
├── scripts-workflow/            ← Automatització
└── README.md
```

---

## Inici Ràpid

### Prerequisits

**macOS:**
```bash
brew install --cask mactex
brew install latexmk biber
```

**Ubuntu/Debian:**
```bash
sudo apt-get install -y texlive-xetex texlive-latex-extra latexmk biber
sudo apt-get install -y fonts-opendyslexic
```

### Clonar i Inicialitzar

```bash
git clone https://github.com/TheEgea/TFG.git
cd TFG
chmod +x scripts-workflow/*.sh
```

---

## Compilar Documentos

### Usar Script de Build (Recomanat)

```bash
# Compilar tots els documents
./scripts-workflow/build.sh all

# Compilar document específic
./scripts-workflow/build.sh memory       # memory-main.pdf (93 pàgines)
./scripts-workflow/build.sh avantprojecte
./scripts-workflow/build.sh viabilitat
```

### Targets Disponibles

| Comando | Output | Descripció |
|---------|--------|-----------|
| `./scripts-workflow/build.sh memory` | `memory-main.pdf` | Tesi completa (93 pàgines) |
| `./scripts-workflow/build.sh avantprojecte` | `avantprojecte-main.pdf` | Proposta + apèndixs |
| `./scripts-workflow/build.sh viabilitat` | `viabilitat-main.pdf` | Anàlisi de viabilitat |
| `./scripts-workflow/build.sh all` | Tots | Compilar tot |
| `./scripts-workflow/build.sh clean` | — | Netejar artefactes |

---

## Workflow Git

### Usar Scripts

```bash
# Sincronització completa (pull + commit + push)
./scripts-workflow/sync.sh "docs: actualització capítols"

# Push ràpid
./scripts-workflow/push.sh "docs: correccions ortogràfiques"

# Pull
./scripts-workflow/pull.sh

# Status
./scripts-workflow/utils.sh status
./scripts-workflow/utils.sh stats
```

### Convencions de Commit

Seguir format **Conventional Commits**:

```
docs:       Canvis de documentació
feat:       Nova funcionalitat
fix:        Correccions d'errors
refactor:   Reorganització de codi
test:       Proves
chore:      Tasques de manteniment
```

---

## Contingut dels Documents

### Memory (memory-main.tex)
**93 pàgines | Tesi acadèmica completa**

| Secció | Pàgines | Contingut |
|--------|---------|----------|
| Front Matter | 1-4 | Portada, TOC, Glossari |
| Capítol 1 | 5-6 | Introducció i Context |
| Capítol 2 | 7-13 | Estat de l'Art |
| Capítol 3 | 14-16 | Objectius i Abast |
| Capítol 4 | 17-19 | Metodologia |
| Capítol 5 | 20-47 | Planificació i Cronograma |
| Capítol 6 | 48-60 | Requeriments Funcionals |
| Capítol 7 | 61-80 | Anàlisi de Viabilitat |
| Capítol 8 | 81-82 | Desenvolupament |
| Capítol 9 | 83-86 | Resultats i Conclusions |
| Bibliografia | 87-93 | Referències (estil IEEE) |

### Avantprojecte (avantprojecte-main.tex)
**Proposta preliminar amb apèndixs**

- Capítols 1-4
- Apèndix A: Infraestructura LaTeX reproductible
- Apèndix B: Configuració del HomeLab
- Apèndix C: Registre de Temps (820 hores)

### Viabilitat (viabilitat-main.tex)
**Anàlisi completa de viabilitat**

- Viabilitat tècnica
- Viabilitat econòmica
- Viabilitat legal
- Viabilitat ambiental

---

## Requisits

### Requisits del Sistema

- **SO:** macOS 10.14+, Ubuntu 18.04+, o Windows 10+ (WSL2)
- **Espai en Disc:** 2 GB mínim
- **RAM:** 2 GB mínim

### Requisits de Software

| Paquet | Versió Mínima | Notes |
|--------|--------------|-------|
| git | 2.25 | Control de versions |
| XeLaTeX | TeX Live 2023+ | Motor LaTeX |
| latexmk | 4.70 | Compilació automàtica |
| biber | 2.16 | Processador de bibliografia |
| OpenDyslexic | Latest | Font accessible |

---

## 📝 Llicència

Aquest projecte està llicenciat sota **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)**.

**Ets lliure de:**
- Compartir — copiar i redistribuir el material
- Adaptar — remesclar, transformar i construir sobre el material

**Sota els següents termes:**
- **Atribució** — Has de donar crèdit apropiat
- **No Comercial** — No pots usar amb propòsits comercials
- **Mateixa Llicència** — Has de distribuir sota la mateixa llicència

Per més detalls, veure [LICENSE](./LICENSE).

---

## Contact & Support

**Author / Autor:** Eloi Egea Rada  
**Supervisor / Supervisor:** Pere Vidiella i Catalan  
**Institution / Institució:** Centre Universitari TecnoCampus

---

**Last Updated / Última Actualització:** January 11, 2026
