# App H — Requirements Detail

This appendix expands the requirements in Chapter  with the full
sub-requirement specifications for each functional requirement (RF), technological
requirement (TR), and non-functional requirement (NFR).

## Functional Requirements: Sub-Specifications

### RF1: Design and Implement EVE-NG Topologies

- **RF1.2**: Each topology must include:
- Minimum 5–8 virtual machines per lab
- Realistic network architecture (DMZ, internal networks, monitoring zones)
- Vulnerable services configured per OWASP and NIST standards
- Network segmentation with VLANs where appropriate
- **RF1.3**: EVE-NG compatibility requirements:
- .unl file format compatible with EVE-NG Community Edition
- Additional compatibility with EVE-NG Professional Edition
- KVM hypervisor support (Ubuntu 20.04+ LTS)
- Minimum host specification: 16 GB RAM, 200 GB storage
- **RF1.4**: Topology documentation:
- Network diagram for each lab (logical and physical views)
- IP addressing scheme documented
- Service inventory and port mappings
- Attack surface identification and justification

### RF2: Implement Vulnerabilities and Attack Scenarios

- **RF2.5**: Vulnerability implementation standards:
- All vulnerabilities must be fixable by administrators
- No permanently broken or unrecoverable systems
- Clear reset procedure for each vulnerability state
- Automated scanning tools must successfully identify vulnerabilities

### RF3: Create Structured Assessment Materials

- **RF3.3**: Support materials:
- Student lab manuals with step-by-step guidance
- Teacher guides with deployment and customisation instructions
- Expected outcomes and common pitfalls documentation
- Troubleshooting guides for common technical issues
- **RF3.4**: Validation materials:
- Automated validation scripts to verify successful lab completion
- Manual verification procedures for educators
- Documentation of success indicators

## Technological Requirements: Sub-Specifications

### TR1: Virtualisation Infrastructure

- **TR1.2**: Hypervisor:
- Primary: KVM (Kernel-based Virtual Machine)
- Host OS: Ubuntu Server 20.04 LTS or 22.04 LTS
- QEMU integration for VM management
- Nested virtualisation support for advanced scenarios
- **TR1.4**: Network configuration:
- Layer 2 switching capabilities within EVE-NG
- VLAN support for network segmentation scenarios
- IPv4 and IPv6 support

### TR2: Security Tools and Penetration Testing Framework

- **TR2.4**: Compliance and documentation:
- All tools must be freely available or have educational licences
- Open-source preference for long-term sustainability
- Tool version specifications documented
- Legal and ethical use guidelines included

### TR3: Scripting and Automation

- **TR3.3**: Integration points:
- EVE-NG API integration for programmatic lab management
- Webhook support for event-driven automation
- Container orchestration (Docker) for microservices
- Version control integration (Git, GitHub)

## Non-Functional Requirements: Detailed Subsections

### NFR1: Performance and Efficiency

**NFR1.1 – Deployment Performance**:
- Lab deployment time ≤ 2 minutes from topology load to ready state
- VM boot time ≤ 90 seconds per VM (95
- Reset operation ≤ 30 seconds to restore to initial state
- Concurrent lab instances: support minimum 5 simultaneous labs

**NFR1.2 – Resource Optimisation**:
- VM image sizes ≤ 5 GB per image (compressed)
- Memory footprint ≤ 6 GB per lab instance during execution
- Minimal external dependencies (all local simulation)

**NFR1.3 – Scalability**:
- Current infrastructure supports 3–4 concurrent instances on the project HomeLab server
- Architecture horizontally scalable: additional EVE-NG nodes can be added
- EVE-NG Professional Edition supports larger concurrent deployments

### NFR2: Compliance with Security Frameworks

**NFR2.1 – NIST Cybersecurity Framework** :
Core Functions (Identify, Protect, Detect, Respond, Recover) mapped to lab exercises;
assessment procedures aligned with NIST guidelines.

**NFR2.2 – CIS Critical Controls** :
Controls 1–18 incorporated where pedagogically appropriate; assessment rubrics aligned
with CIS benchmarks; remediation procedures follow CIS recommendations.

**NFR2.3 – OWASP Standards** :
OWASP Top 10 fully covered; OWASP Testing Guide methodology integrated;
development practices reflected in lab design.

**NFR2.4 – Penetration Testing Standards** :
PTES phases mapped to labs; CEH curriculum alignment; ethical hacking principles strictly
enforced.

### NFR3: Reliability and Availability

**NFR3.1 – System Reliability**:
- MTBF ≥ 100 hours continuous operation
- MTTR ≤ 5 minutes
- Scenario reproducibility: 100
- Zero critical bugs at release

**NFR3.2 – Data Integrity**:
No unintended data loss during lab operations; snapshot and restore functionality;
backup procedures for sensitive configurations.

**NFR3.3 – Availability**:
Planned maintenance windows weekends only; system availability ≥ 99
instructional periods; graceful degradation if resources become limited.

### NFR4: Security and Ethical Compliance

**NFR4.1 – Educational Sandbox Isolation**:
Complete network isolation from production systems; no outbound internet access from lab
environments; contained attack scenarios (no external targets).

**NFR4.2 – Access Control and Accountability**:
Role-based access control (RBAC) for lab management; audit logs of all student actions
where applicable; clear identification of authorised vs.\ unauthorised activities.

**NFR4.3 – Ethical Guardrails**:
Mandatory ethics training before lab access; written agreements regarding responsible use;
monitoring and escalation procedures for suspicious activities.

### NFR5: Usability and Support

**NFR5.1 – Ease of Use**:
Average faculty deploy time 5–10 minutes; intuitive web interface with clear navigation;
minimal technical prerequisites for students.

**NFR5.2 – Documentation and Support**:
Comprehensive user manuals and quick-start guides; FAQ documentation; responsive support
channel.

**NFR5.3 – Accessibility**:
WCAG 2.1 Level AA compliance for web interfaces; screen reader compatibility; keyboard
navigation support; clear contrast ratios.

### NFR6: Institutional Sustainability

**NFR6.1 – Long-term Maintainability**:
All components open-source or freely available; no vendor lock-in; source code in GitHub
with clear documentation; backward compatibility with older EVE-NG versions where feasible.

**NFR6.2 – Curriculum Alignment**:
Explicit mapping to GEISI degree learning outcomes; integration with existing course
structures; flexible customisation for different instructional contexts.

**NFR6.3 – Scalability for Institutional Adoption**:
Deployable on institutional infrastructure (not SaaS-dependent); support for multiple
faculty deployments simultaneously; resource reservation and scheduling capabilities.