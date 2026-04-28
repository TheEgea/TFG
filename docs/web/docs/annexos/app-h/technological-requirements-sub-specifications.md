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