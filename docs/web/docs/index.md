# Ethical Pentesting in Virtualized Environments with EVE-NG

**Bachelor's Thesis - Eloi Egea Rada**  
<!-- This is the documentation file for a Computer Science degree program in Management and Information Systems.
    Located at: /home/overleaf/TFG/TFG/docs/web/docs/index.md
    Degree: Bachelor's Degree in Computer Science for Management and Information Systems -->
*[Degree in Computer Engineering for Management and Information Systems](https://www.tecnocampus.cat/en/grau/grau-en-enginyeria-informatica-de-gestio-i-sistemes-dinformacio)*

[![GitHub Repo](https://img.shields.io/github/stars/TheEgea/TFG?style=social)](https://github.com/TheEgea/TFG)

<!-- ## Documentation PDF

[:material-file-pdf-box: Download Technical Documentation PDF](../pdf/lab-documentation.pdf){ .md-button .md-button--primary }

*Full technical annex including all appendices and lab reference guides.* -->



!!! info "Accessibility note"
    This documentation is typeset in **[OpenDyslexic](https://opendyslexic.org)**, an open-source typeface
    designed by Abelardo González to improve readability for readers with dyslexia.
    The weighted bottom of each letterform anchors characters visually, reducing
    inversion and rotation errors common in dyslexic reading.
    For readers without dyslexia, the typeface presents no legibility penalty ---
    it is a universal design choice that benefits those who need it without
    inconveniencing anyone else.

## Project Overview { .pb-0 }

> **Design and implementation of a virtual labs for cybersecurity training using EVE-NG** covering reconnaissance, web vulnerabilities, privilege escalation, and cryptography labs aligned with *[Introduction to Cybersecurity](https://www.tecnocampus.cat/en/node/18838)* course.

## Key Components

| Component | Description | Technologies |
|-----------|-------------|-------------|
| **EVE-NG** | Network emulation platform | Community Edition |
| **Attack Platform** | Penetration testing distro | Parrot Security OS |
| **Vulnerable Targets** | Training environments | DVWA, Metasploitable 2/3 |
| **Automation** | Deployment scripts | Python/Bash |
| **Integration** | Campus VM infrastructure | Tecnocampus Proxmox |

## Quick Start

```bash

# Clone repo
git clone https://github.com/TheEgea/TFG.git
cd TFG
```


## Installation

- [Official documentation](https://www.eve-ng.net/index.php/documentation/community-cookbook/)
- [Install on Proxmox](guides/eve_ng_install_proxmox.md)

**EVE-NG editions:**

| Edition | Link | Notes |
|---------|------|-------|
| Community | [eve-ng.net](https://www.eve-ng.net/index.php/community/) | Free · used in this project |
| Professional | [eve-ng.net](https://www.eve-ng.net/index.php/eve-ng-pro-is-here/) | Commercial · advanced features |
