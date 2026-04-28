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