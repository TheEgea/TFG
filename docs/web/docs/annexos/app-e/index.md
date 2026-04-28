# App E — Cybersecurity Training Platform Descriptions

This appendix provides detailed descriptions of the seven cybersecurity training platforms
reviewed in Chapter . Each subsection discusses the platform's approach,
strengths, and limitations relevant to curriculum-aligned institutional deployment.
A comparative summary is provided in Table .

## HackTheBox

HackTheBox  is one of the most widely recognised online platforms for
penetration testing practice, offering a large library of intentionally vulnerable machines and
Capture-the-Flag challenges categorised by difficulty. The platform benefits from a strong
community and industry recognition, making it a common supplementary resource for
professional certifications. However, its challenges are isolated: there is no network topology
connecting systems, no formal curriculum mapping to specific degree programmes, and the
platform cannot be deployed on institutional infrastructure, which limits customisation and
assessment integration.

## TryHackMe

TryHackMe  adopts a gamified, beginner-friendly approach, combining structured
learning paths with guided interactive labs accessible entirely from a browser. Its low barrier to
entry and progressive structure make it effective for initial skill development. However, the
platform is externally managed and subscription-dependent, scenarios are simplified to ensure
completion within short timeframes, and it does not support local institutional deployment or
integration with academic learning management systems.

## Cisco Networking Academy

Cisco Networking Academy  provides institution-backed curriculum aligned with
professional certifications (CCNA, CyberOps) and uses Packet Tracer for network simulation.
Its formal structure and vendor support are strengths for foundational networking education.
However, the programme is primarily defensive and networking-oriented, Packet Tracer does not
support full operating system simulation or security tool integration, and the curriculum is
tightly coupled to Cisco technologies.

## SEED Labs

SEED Labs  is an open-source, research-backed collection of Docker-based security
exercises covering specific concepts such as buffer overflows, SQL injection, and cryptographic
protocols. The academic rigour and local deployability are significant advantages. Nevertheless,
each lab is conceptually isolated, there is no structured penetration testing workflow spanning
multiple systems, and significant instructor customisation is required to integrate SEED exercises
into a complete curriculum.

## Game of Active Directory (GOAD)

GOAD  provides an Infrastructure-as-Code vulnerable Active Directory environment
designed for realistic Windows domain penetration testing. Its use of Terraform and Vagrant enables
reproducible deployment and the scenarios reflect real corporate environments. The platform is,
however, narrowly focused on Windows AD: it does not cover reconnaissance, web application
vulnerabilities, or network traffic analysis, and it lacks formal instructor resources or
curriculum structure.

## VulnHub

VulnHub  is a community-driven repository of downloadable vulnerable virtual machines
for local deployment. Its open, self-directed nature suits independent learners well, but the
absence of structured progression, inconsistent quality across community-contributed machines,
and lack of automation for deployment and reset make institutional integration impractical
without significant instructor effort.

## Hack4u Academy

Hack4u Academy  stands out for its emphasis on penetration testing methodology over
tool memorisation, offering structured video-based courses with integrated practical exercises.
Its curriculum is well-designed and the community active. The platform is, however,
subscription-based and externally hosted, making local institutional deployment and automated
large-scale assessment impossible.