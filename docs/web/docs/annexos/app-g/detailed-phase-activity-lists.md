## Detailed Phase Activity Lists

### Phase 0: Preparation and Infrastructure (July–November 2025)

- HomeLab infrastructure initialisation (Proxmox, networking, storage)
- Development environment setup (VSCode, LaTeX, Git)
- Security tools installation (Parrot OS Security,
      Metasploit, Burp Suite)
- Technical documentation and baseline establishment

**Deliverables**: Fully operational virtualisation infrastructure; development
environment configuration; baseline documentation of system architecture.

**Duration**: 105 hours **Status**: Completed (100
### Phase 1: Avantprojecte and Conceptual Design (October 2025–January 2026)

- **SMART Objectives Definition** (4h) — Specification of Main Objective (MO):
develop a reusable teaching package. Definition of 4 Specific Objectives (OE1–OE4) with
measurable KPIs. Alignment with institutional GEISI curriculum requirements.

- **State of the Art Analysis** (15h) — Comprehensive review of 7 major
cybersecurity training platforms (HackTheBox, TryHackMe, Cisco Academy, SEED Labs, GOAD,
VulnHub, Hack4u). Identification of pedagogical gaps. Comparative analysis matrix across
multiple dimensions.

- **Functional and Non-Functional Requirements** (10h) — RF1: design and
implement 4 EVE-NG topologies (.unl files). RF2: implement vulnerabilities per
PTES, OWASP, NIST, and
CEH standards. RF3: create structured assessment materials and rubrics.
NFR1–NFR3 covering performance, framework compliance, and institutional sustainability.

- **Pentesting Methodology and Validation Framework** (8h) — Adaptation of PTES
for educational context. Definition of ethical hacking principles (EC-Council CEH).
Mapping of attack phases to lab objectives. Validation criteria for security effectiveness.

- **Design Decisions Justification** (5h) — Rationale for EVE-NG selection vs
alternative platforms. Technology stack justification (Parrot OS Security, Metasploit, Burp,
OWASP ZAP). Pedagogical approach: hands-on labs with automation.

- **Risk Analysis and Mitigation Planning** (15h) — Identification of 12+ project
risks (technical, pedagogical, institutional). Assessment of impact and probability.
Definition of mitigation strategies.

- **Resource Inventory and Allocation** (5h) — Hardware requirements: dual-socket
server with Proxmox. Software stack: EVE-NG Community Edition, Parrot OS Security images,
security tools. Human resources: student ( 820h total), faculty supervisor.
Budget considerations and open-source alternatives.

- **Gantt Chart and Critical Path Analysis** (20h) — Development of detailed
project timeline with 37 tasks. Identification of 13 critical path tasks. CSV export and
interactive web-based visualisation. Progress tracking and milestone definition.

**Deliverables**: Formal project proposal (Avantprojecte); detailed Gantt chart with
critical paths; risk register and mitigation plan; requirements specification (functional
and non-functional).

**Duration**: 82 hours **Status**: Completed **Milestone Deadline**: January 16, 2026

### Phase 2: Implementation and Interim Validation (January–March 2026)

- **Lab 1: Reconnaissance Development** (14h research + 20h dev) —
Scenario: intelligence gathering phase using PTES framework.
Tools: Nmap, passive reconnaissance techniques.
Topology: multi-tier network with passive monitoring capabilities.
Validation: successful execution of reconnaissance workflow.

- **Lab 2: Web Vulnerabilities Development** (14h research + 25h dev) —
Scenario: OWASP Top 10 vulnerability exploitation.
Tools: Burp Suite, OWASP ZAP, manual testing techniques.
Topology: web application server with vulnerable services.
Validation: exploitation success and reporting accuracy.

- **Lab 3: Incident Response Development** (14h research + 25h dev) —
Scenario: log forensics and incident response (NIST SP 800-61 standards).
Tools: Wireshark, tcpdump, network enumeration tools.
Topology: multi-segment network with pre-staged attack artefacts.
Validation: successful timeline reconstruction and flag recovery.

- **Pilot Validation with Users** (20h + 6h revision) —
Informal testing sessions with 4–5 GEISI students conducted as each lab is completed.
Usability observations and timing notes. Post-session survey on satisfaction, difficulty,
and guide clarity. Adjustments applied based on participant feedback.

- **Topology Adjustments and Optimisation** (30h) —
Performance tuning based on pilot feedback.
VM image optimisation and deployment time reduction.
Network configuration refinement for stability.

- **Teaching Material Production** (40h) —
Student lab guide PDF (*enunciado*) per lab: task description, objectives, hints,
and tool reference. Instructor resolution guide PDF (*resolucio*) per lab:
one possible walkthrough, flag values, assessment rubric, and common errors.
Technical configuration reference per lab in the repository.

**Deliverables**: 3 fully functional EVE-NG labs; student and instructor guides;
pilot validation report; technical configuration references.

**Duration**: 188 hours **Status**: Completed **Milestone Deadline**: March 20, 2026

### Phase 3: Completion and Final Validation (March–May 2026)

- **Lab 4: Privilege Escalation Development** (16h research + 30h dev) —
Scenario: post-exploitation and privilege escalation (CEH framework).
Tools: Metasploit, manual exploitation, system enumeration.
Topology: hardened systems with privilege escalation vectors.
Validation: successful privilege elevation and system compromise.

- **Comprehensive Penetration Testing** (30h Round 1 + 25h Round 2) —
Round 1: sequential testing of Labs 1, 2, and 3.
Round 2: integrated testing across all 4 laboratories.
Documentation of all findings and remediation strategies.

- **Automation Scripts Development** (30h) —
Utility scripts (Bash/Python) for recurring lab management tasks:
bridge configuration, ISO upload, and connectivity check scripts.
Scripts documented and tested in the project EVE-NG environment.

- **Final User Validation and Iteration** (18h) —
Final informal validation sessions with the pilot group (4–5 participants).
Collection of post-session survey data and usability notes.
Implementation of final adjustments based on feedback.

- **Bachelor's Thesis Report Writing and Finalisation** (90h) —
Phase I (15h): Introduction, Objectives, Literature Review.
Phase II (40h): Methodology, Requirements, Implementation Results.
Phase III (35h): Validation, Analysis, Conclusions.
Final revision, bibliography integration, and publication preparation (35h).

**Deliverables**: 4 fully functional labs; utility automation scripts; final
bachelor's thesis report; pilot validation report; deployment package ready for
institutional use.

**Duration**: 315 hours **Status**: In progress **Final Milestone Deadline**: May 27, 2026