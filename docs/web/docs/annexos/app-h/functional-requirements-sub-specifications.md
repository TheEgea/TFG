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