# App I — Feasibility: Task Lists and Risk Assessment

This appendix complements Chapter  with the full per-phase task
lists (task IDs, estimated hours, critical path flags) and the five-phase NIST SP 800-30
risk assessment that underpins the risk matrix in that chapter.

## Phase Task Lists

### Phase 0: Preparation (July–November 2025)

- Task 0.1: HomeLab Initialisation Setup (64h)
- Task 0.2: VSCode Setup for thesis development (18h)
- Task 0.3: Parrot OS Security Setup and Basic Tools (15h)
- Task 0.4: Home Lab As-Built Documentation (8h)

**Duration**: 105 hours **Status**: Completed (100
### Phase 1: Preliminary Project (October 2025–January 2026)

- Task 1.0: Thesis Development (22h)
- Task 1.1: SMART Objectives Definition (4h)
- Task 1.2: State of the Art: Frameworks and Tools (15h)
- Task 1.3: Functional and Non-Functional Requirements (10h)
- Task 1.4: Pentesting Methodology and Validation (8h) — **CRITICAL**
- Task 1.5: Design Decisions and Justification (5h)
- Task 1.6: Gantt Chart Development (20h)
- Task 1.7: Risk Analysis and Mitigation Plan (15h)
- Task 1.8: Resource Inventory (5h)
- **Milestone 1.10**: Preliminary Project (40h) — **Delivery: January 16, 2026**

**Duration**: 82 hours **Status**: Completed

### Phase 2: Interim Report (January–March 2026)

- Task 2.1: Lab 1 Research — Reconnaissance (14h) — **CRITICAL**
- Task 2.2: Lab 2 Research — Web Vulnerabilities (14h) — **CRITICAL**
- Task 2.3: Lab 3 Research — Network Analysis/IR (14h) — **CRITICAL**
- Task 2.4: Technical Write-ups Labs 1 & 2 (13h)
- Task 2.5: Topology Adjustments (30h)
- Task 2.6: Pre-validation with Pilot Users (20h) — **CRITICAL**
- Task 2.6.1: Pre-validation Revision (6h) — **CRITICAL**
- Task 2.7: Analyse and Write Hackathon Results (17h)
- Task 2.8: Interim Report Formalisation (40h)
- Task 2.9: Set Up Servers, VMs, and EVE-NG (20h)
- Task 2.10: Backup and Documentation of EVE-NG (10h)
- **Milestone 2.11**: Intermediate Thesis (50h) — **Delivery: March 20, 2026**

**Duration**: 212 hours **Status**: Completed

### Phase 3: Final Delivery (March–May 2026)

- Task 3.1: Lab 4 Research — Post-Exploitation (16h) — **CRITICAL**
- Task 3.2: Lab 3 Validation with Users (12h)
- Task 3.3: Technical Write-ups Labs 3 & 4 (19h)
- Task 3.4: Penetration Testing Round 1 (Labs 1–2–3) (30h) — **CRITICAL**
- Task 3.5: Penetration Testing Round 2 (All Labs) (25h) — **CRITICAL**
- Task 3.6: Python Automation Scripts (30h)
- Task 3.7: Final Validation with Pilot Users (18h)
- Task 3.8: Final Review and Project Polishing (25h)
- Task 3.9: Bachelor's Thesis Report Writing I (15h) — **CRITICAL**
- Task 3.10: Bachelor's Thesis Report Writing II (40h) — **CRITICAL**
- Task 3.11: Bachelor's Thesis Report Writing III (35h) — **CRITICAL**
- Task 3.12: Final Revision (15h)
- Task 3.13: Final Report Preparation (20h)
- **Milestone 3.14**: Final Report (5h) — **Delivery: May 27, 2026**

**Duration**: 315 hours **Status**: In progress

## NIST SP 800-30 Five-Phase Risk Assessment

This section details the systematic risk assessment following NIST SP 800-30.
The summary risk matrix is provided in Table  in Chapter .

### Phase 1: Asset Identification and Scope Definition

Critical assets are categorised by CIA triad:

**Hardware Assets**:
- HomeLab server (2× Xeon E5-2680v4, 64 GB RAM) — Availability critical
- Development workstations (laptop + desktop) — Integrity critical
- Network equipment (router, switch) — Availability critical
- External storage (backup) — Confidentiality + Availability critical

**Software Assets**:
- EVE-NG Community Edition — Availability critical
- Parrot OS Security distribution — Integrity critical
- Vulnerable VMs (Metasploitable, DVWA) — Integrity critical
- Development tools (VSCode, Git, LaTeX) — Integrity critical

**Data Assets**:
- Thesis source code and documentation — Confidentiality + Integrity critical
- Lab topology configurations — Integrity + Availability critical
- Student learning materials — Availability critical
- Project research findings — Confidentiality + Integrity critical

**Scope**: Infrastructure and technical risks within the controlled laboratory
environment. Excluded: organisational, regulatory, and external threats beyond the
academic context.

### Phase 2: Threat and Vulnerability Identification

**Threat categories (NIST SP 800-30)**:
- **Hardware Threats**: Disk failures, power supply degradation, CPU overheating,
      memory exhaustion
- **Software/Configuration Threats**: Outdated VM images, incompatible versions,
      configuration drift, EVE-NG crashes
- **Knowledge Gap Threats**: Insufficient expertise in advanced networking,
      virtualisation optimisation, security best practices
- **Resource Constraint Threats**: Limited RAM for simultaneous VM operations,
      storage capacity limits
- **Integration Threats**: EVE-NG network compatibility issues, tool interoperability
- **Data Loss Threats**: Accidental deletion, corruption, hardware failure

**Key vulnerabilities**:
- Aging server components (end-of-life approaching)
- Single point of failure — no infrastructure redundancy
- EVE-NG Community Edition has no commercial support
- Limited RAM capacity for production-scale virtualisation
- Inadequate documentation of network topology state
- Limited backup redundancy (single backup location)

### Phase 3: Impact and Likelihood Analysis

Scales follow NIST SP 800-30: Probability (Low <25
Impact (Low: minor delays, Medium: project delays, High: project jeopardy).

| **Risk Scenario** | **Prob.** | **Impact** | **Level** | **Primary Asset** |
| --- | --- | --- | --- | --- |
| EVE-NG Performance Issues | Medium | High | HIGH | Infrastructure, Labs |
| VM Image Incompatibility | Medium | Medium | MEDIUM | Development, Labs |
| Knowledge Gaps (advanced net.) | Medium | Medium | MEDIUM | Development, Timeline |
| Hardware Degradation / Disk Failure | Low | High | MEDIUM | Infrastructure |
| Data Loss (insufficient backup) | Low | High | MEDIUM | Documentation |
| Configuration Documentation Gaps | Medium | Medium | MEDIUM | Operations |

### Phase 4: Risk Evaluation and Prioritisation

**HIGH Priority**: EVE-NG Performance Issues — infrastructure bottlenecks causing
lab functionality failures. Medium probability, high impact. Requires immediate resource
optimisation and monitoring implementation.

**MEDIUM Priority**:
- VM Incompatibility — disparate image formats causing integration problems
- Knowledge Gaps — experience gaps in advanced networking/virtualisation
- Configuration Documentation — inadequate topology documentation
- Data Loss — insufficient backup redundancy (single point of failure)

**LOW Priority**: Hardware Degradation — aging components manageable through
preventive maintenance.

### Phase 5: Mitigation Strategies

**EVE-NG Performance Issues (REDUCTION)**:
- Hardware dimensioning: 64 GB RAM dedicated to the server running EVE-NG
      (32 GB proved insufficient — additional module acquired,  80 €)
- Resource optimisation: memory tuning, VM suspension when idle
- Documented fallback: VirtualBox as alternative hypervisor if critical failure
- *Result*: Probability reduced from Medium to Low

**VM Incompatibility (PREVENTION)**:
- Early testing: validate all images in target environment before use
- Format standardisation: QCOW2 for EVE-NG compatibility
- Alternative repositories maintained (VulnHub, GitHub)
- *Result*: Probability reduced from Medium to Low

**Knowledge Gaps (PREVENTION + REDUCTION)**:
- Structured learning: Task 1.2 (15h) comprehensive framework research
- Continuous upskilling during lab research phases (Tasks 2.1–3.1)
- Expert consultation with tutor Pere Vidiella i Catalan
- Technical references: NIST, OWASP
- *Result*: Impact reduced from Medium to Low-Medium

**Configuration Documentation (PREVENTION)**:
- Continuous documentation: update topology diagrams during development
- Automated export: EVE-NG built-in topology export
- Version control: all network configs via Git repository
- *Result*: Probability reduced from Medium to Low

**Data Loss (REDUCTION)**:
- Daily automated encrypted backups to external storage
- Version control: full Git history on GitHub
- Off-site cloud backup (student account)
- *Result*: Probability Low, Impact Low

**Hardware Degradation (PREVENTION)**:
- Quarterly hardware diagnostics (disk health, temperature monitoring)
- Automated S.M.A.R.T. alerts for disk errors and CPU temperature thresholds
- Component procurement plan with 6-month horizon for critical parts

**Risk Assessment Conclusion**: All identified risks have been systematically
evaluated and assigned concrete mitigation strategies. No individual risk is
considered project-blocking.

## Detailed Budget Tables

### Software and Licences

| **Resource** | **Licence Type** | **Unit** | **Total** |
| --- | --- | --- | --- |
| EVE-NG Community Edition | Free/Open Source | 0 € | 0 € |
| Parrot OS Security | Free/Open Source | 0 € | 0 € |
| Proxmox VE | Free/Open Source | 0 € | 0 € |
| Metasploitable VMs | Free/Open Source | 0 € | 0 € |
| DVWA | Free/Open Source | 0 € | 0 € |
| Visual Studio Code | Free/Open Source | 0 € | 0 € |
| LaTeX (TeX Live) | Free/Open Source | 0 € | 0 € |
| Git + GitHub (Student) | Free/Student | 0 € | 0 € |
| Burp Suite Community | Free | 0 € | 0 € |
| Wireshark | Free/Open Source | 0 € | 0 € |
| **SUBTOTAL Software** |  |  | **0 €** |

### Other Operational Costs

| **Concept** | **Cost** |
| --- | --- |
| Electricity (820 h × 0.15 kWh × 0.20 €/kWh) | 25 € |
| Internet connectivity (9 months × 40 €/month) | 360 € |
| Documentation printing and binding (3 copies) | 60 € |
| Contingency fund (5
    **TOTAL Other Costs** | **1,**080 € |

**Note**: The total budget summary in Chapter 
(Table ) uses a rounded figure of 1,020 € for other
costs, reflecting the exclusion of the contingency fund from the base estimate.