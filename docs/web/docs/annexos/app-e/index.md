# App E — Cybersecurity Training Platform Descriptions

This appendix provides detailed descriptions of the seven cybersecurity training platforms
reviewed in Chapter 2 (State of the Art). Each section discusses the platform's pedagogical
approach, deployment model, strengths, and limitations relevant to curriculum-aligned
institutional deployment. A comparative summary is provided in the
[platform comparison table](../#platform-comparison).

---

## HackTheBox

[HackTheBox](https://www.hackthebox.com/) is one of the most widely recognised online platforms
for penetration testing practice, offering a large library of intentionally vulnerable machines
and Capture-the-Flag (CTF) challenges categorised by difficulty. The platform benefits from a
strong community and industry recognition, making it a common supplementary resource for
professional certifications such as OSCP and CEH.

However, its challenges are isolated: there is no network topology connecting systems, no formal
curriculum mapping to specific degree programmes, and the platform cannot be deployed on
institutional infrastructure. This limits customisation, assessment integration, and pedagogical
control for academic use.

**Key limitation for this project**: external hosting, no curriculum alignment, isolated scenarios.

---

## TryHackMe

[TryHackMe](https://tryhackme.com/) adopts a gamified, beginner-friendly approach, combining
structured learning paths with guided interactive labs accessible entirely from a browser.
Its low barrier to entry and progressive structure make it effective for initial skill development,
and it is widely used in introductory cybersecurity courses.

However, the platform is externally managed and subscription-dependent, scenarios are simplified
to ensure completion within short timeframes, and it does not support local institutional
deployment or integration with academic learning management systems.

**Key limitation for this project**: no local deployment, simplified scenarios, external dependency.

---

## Cisco Networking Academy

[Cisco Networking Academy](https://www.netacad.com/) provides institution-backed curriculum aligned
with professional certifications (CCNA, CyberOps) and uses Packet Tracer for network simulation.
Its formal structure and vendor support are strengths for foundational networking education, and
it is widely adopted in academic programmes globally.

However, the programme is primarily defensive and networking-oriented. Packet Tracer does not
support full operating system simulation or security tool integration, and the curriculum is
tightly coupled to Cisco technologies, creating vendor lock-in.

**Key limitation for this project**: vendor lock-in, no OS-level simulation, limited security scope.

---

## SEED Labs

[SEED Labs](https://seedsecuritylabs.org/) is an open-source, research-backed collection of
Docker-based security exercises covering specific concepts such as buffer overflows, SQL injection,
and cryptographic protocols. Developed at Syracuse University, it is one of the most
academically rigorous freely available lab resources.

Its academic rigour and local deployability are significant advantages. Nevertheless, each lab
is conceptually isolated — there is no structured penetration testing workflow spanning multiple
systems — and significant instructor customisation is required to integrate SEED exercises into
a complete curriculum.

**Key limitation for this project**: conceptually isolated labs, no multi-system topology, no automation.

---

## Game of Active Directory (GOAD)

[GOAD](https://github.com/Orange-Cyberdefense/GOAD) provides an Infrastructure-as-Code
vulnerable Active Directory environment designed for realistic Windows domain penetration
testing. Its use of Terraform and Vagrant enables reproducible deployment and the scenarios
reflect real corporate environments.

The platform is, however, narrowly focused on Windows AD: it does not cover reconnaissance,
web application vulnerabilities, or network traffic analysis, and it lacks formal instructor
resources or curriculum structure.

**Key limitation for this project**: Windows AD only, no curriculum structure, no instructor materials.

---

## VulnHub

[VulnHub](https://www.vulnhub.com/) is a community-driven repository of downloadable vulnerable
virtual machines for local deployment. Its open, self-directed nature suits independent learners
well, and the large variety of machines covers diverse difficulty levels and techniques.

However, the absence of structured progression, inconsistent quality across community-contributed
machines, and lack of automation for deployment and reset make institutional integration
impractical without significant instructor effort.

**Key limitation for this project**: no structure, inconsistent quality, no automation.

---

## Hack4u Academy

[Hack4u Academy](https://hack4u.io/) stands out for its emphasis on penetration testing
methodology over tool memorisation, offering structured video-based courses with integrated
practical exercises. Its curriculum is well-designed and the community active, making it
particularly effective for self-paced professional development.

The platform is, however, subscription-based and externally hosted, making local institutional
deployment and automated large-scale assessment impossible.

**Key limitation for this project**: external hosting, subscription model, no institutional deployment.

