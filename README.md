# Pentesting Ètic en Entorns Virtualitzats amb EVE-NG

**Treball Final de Grau - Enginyeria Informàtica de Gestió i Sistemes d'Informació**

---

## 📋 Informació del Projecte

- **Autor:** Eloi Egea Rada
- **Tutor:** Pere Vidiella i Catalan  
- **Curs Acadèmic:** 2025-2026
- **Institució:** Escola Superior Politècnica - Tecnocampus

## 🎯 Descripció del Projecte

Desenvolupament d'un paquet docent reutilitzable de laboratoris pràctics de ciberseguretat utilitzant EVE-NG per a l'assignatura "Introduction to Cybersecurity". El projecte inclou la creació de topologies de xarxa, escenaris pràctics de pentesting ètic, scripts d'automatització i documentació completa per a alumnes i docents.

## 🎯 Objectius

### Objectiu Principal
Crear un entorn de laboratori pràctic per a l'aprenentatge de conceptes de ciberseguretat mitjançant tècniques de pentesting ètic.

### Objectius Específics
- Dissenyar topologies EVE-NG per diferents escenaris de pentesting
- Desenvolupar scripts d'automatització per al desplegament i reset de laboratoris
- Crear documentació d'usuari per alumnes i guies per docents
- Implementar sistema de validació automàtica d'exercicis
- Generar rúbriques d'avaluació per als laboratoris

## 📁 Estructura del Repositori


TFG/
├── 📄 docs/ # Documentació del TFG
│ ├── memoria/ # Memòria del treball
│ ├── estudi_viabilitat/ # Estudis de viabilitat
│ ├── avantprojecte/ # Avantprojecte i propostes
│ ├── lliuraments/ # Entregues oficials
│ ├── presentacio/ # Materials de presentació
│ └── plantilles/ # Plantilles i documents base
├── 📄 src/ # Codi font i desenvolupament
│ ├── eve-ng/ # Configuracions EVE-NG
│ │ ├── topologies/ # Fitxers .unl de laboratoris
│ │ ├── images/ # Imatges de VMs
│ │ └── configs/ # Configuracions de xarxa
│ ├── scripts/ # Scripts d'automatització
│ │ ├── automation/ # Deploy, reset, validació
│ │ ├── setup/ # Configuració inicial
│ │ └── utils/ # Utilitats diverses
│ └── materials/ # Materials docents
│ ├── manuals/ # Manuals d'usuari
│ ├── rubrics/ # Rúbriques d'avaluació
│ └── exercises/ # Exercicis pràctics
├── 📄 tests/ # Testing i validació
│ ├── unit_tests/ # Tests unitaris
│ ├── integration_tests/ # Tests d'integració
│ └── validation_scripts/ # Scripts de validació
├── 📄 assets/ # Recursos multimèdia
│ ├── images/ # Imatges de documentació
│ └── videos/ # Materials audiovisuals
├── 📄 research/ # Material d'investigació
│ ├── bibliografia/ # Papers, llibres, recursos web
│ ├── interviews/ # Entrevistes i feedback
│ └── surveys/ # Enquestes i estudis
└── 📄 tools/ # Eines de desenvolupament
├── format_checkers/ # Validadors de format
├── build_scripts/ # Scripts de construcció
└── utilities/ # Utilitats auxiliars

## 🧪 Laboratoris Desenvolupats

1. **Reconeixement i Enumeració**
   - Descobriment de xarxes i serveis
   - Tècniques de fingerprinting
   - Eines: Nmap, Masscan, Zmap

2. **Vulnerabilitats Web**
   - Explotació d'aplicacions web (DVWA)
   - Injection attacks, XSS, CSRF
   - Eines: Burp Suite, OWASP ZAP, SQLMap

3. **Anàlisi de Tràfic i Criptografia**
   - Captura i anàlisi de paquets
   - Atacs criptogràfics
   - Eines: Wireshark, Hashcat, John the Ripper

4. **Escalada de Privilegis**
   - Tècniques d'elevació de permisos
   - Explotació de sistemes (Metasploitable)
   - Eines: Metasploit, Empire, PowerSploit

## 🔧 Tecnologies Utilitzades

- **EVE-NG** - Plataforma de virtualització de xarxes
- **Kali Linux** - Distribució per pentesting
- **DVWA** - Damn Vulnerable Web Application
- **Metasploitable** - Sistema objectiu vulnerable
- **pfSense** - Firewall i router
- **Python/Bash** - Scripts d'automatització
- **Docker** - Containerització de serveis
- **Ansible** - Automatització de configuracions

## 📅 Calendari d'Entregues

| Data | Entrega | Estat |
|------|---------|--------|
| **16 Gener 2026** | Avantprojecte | 🔄 En procés |
| **8 Abril 2026** | Memòria intermèdia | ⏳ Pendent |
| **27 Maig 2026** | Lliurament final | ⏳ Pendent |
| **8-19 Juny 2026** | Defensa del TFG | ⏳ Pendent |

## 📊 Estat del Projecte

- [x] Estructura inicial del repositori
- [x] Avantprojecte presentat
- [ ] Primer laboratori funcional
- [ ] Scripts d'automatització base
- [ ] Documentació d'usuari inicial
- [ ] Validació amb usuaris pilot
- [ ] Memòria intermèdia
- [ ] Documentació final
- [ ] Preparació defensa

## 🚀 Quick Start

### Prerequisits
- EVE-NG Community/Professional
- VirtualBox o VMware
- Git amb Git LFS
- Python 3.8+
- Ansible (opcional)

### Instal·lació

Clonar el repositori
git clone https://github.com/TheEgea/TFG.git
cd TFG

Instal·lar dependències Python
pip install -r requirements.txt

Configurar EVE-NG (seguir guia a src/scripts/setup/)
./src/scripts/setup/install_eve_ng.sh

### Ús Bàsic

Desplegar un laboratori
./src/scripts/automation/deploy.sh lab01_reconnaissance

Resetar laboratori
./src/scripts/automation/reset.sh lab01_reconnaissance

Validar exercici
./src/scripts/automation/validate.py lab01_reconnaissance student_id

## 📚 Documentació

La documentació completa es troba a:
- **Memòria del TFG:** [`docs/memoria/`](./docs/memoria/)
- **Guies d'usuari:** [`src/materials/manuals/`](./src/materials/manuals/)
- **Documentació tècnica:** [`docs/`](./docs/)

## 🤝 Contribució

Aquest projecte forma part d'un Treball Final de Grau acadèmic. Per suggeriments o feedback sobre els laboratoris, contactar amb l'autor.

## 📄 Llicència

Aquest projecte està sota llicència [MIT](./LICENSE) per a ús educatiu i acadèmic.

## 📞 Contacte

- **Autor:** Eloi Egea Rada
- **Email:** eartero@edu.tecnocampus.cat
- **Tutor:** Pere Vidiella i Catalan
- **Institució:** Escola Superior Politècnica - Tecnocampus

---

*Escola Superior Politècnica - Tecnocampus | Curs Acadèmic 2025-2026*
