# LAB4 — Privilege Escalation · CipherStrike

!!! abstract "Lab at a glance"
    | | |
    |---|---|
    | **Difficulty** | ⭐⭐⭐ Hard |
    | **Category** | Privilege Escalation · Ransomware Analysis |
    | **Flags** | 2 |
    | **Est. time** | 90–150 min |
    | **Key skills** | Linux privesc, SUID/sudo misconfigs, file encryption analysis, incident response |
    | **Nodes** | pfSense · VyOS · ServerA · ServerB · ServerC · Defender |

[:simple-github: Lab folder on GitHub](https://github.com/TheEgea/TFG/tree/main/src/eve-ng/configs/nodes/Lab4){ .md-button }
[:material-download: Download topology (.unl)](https://github.com/TheEgea/TFG/raw/main/src/eve-ng/topologies/LAB4-PrivilegeEscalation-CipherStrike.unl){ .md-button .md-button--primary }

---

!!! warning "Work in progress"
    This lab is under active development. Documentation will be completed once the lab scenario is finalised.

## Scenario

**CipherStrike** is an advanced lab combining privilege escalation and ransomware response.
Students start with limited access on a target Linux system and must identify misconfigurations
(SUID binaries, sudo rules, cron jobs) to escalate privileges.
The second phase introduces a ransomware scenario: files have been encrypted and
a **Defender** node provides the analyst perspective to investigate and recover.

## Topology

![LAB4 topology](../../assets/images/labs/lab4-topology.png)
*Screenshot of the EVE-NG canvas — Lab4.*

## Nodes

| Node | Role |
|------|------|
| pfSense | Perimeter firewall · NAT |
| VyOS | Core router |
| ServerA | Primary target — Linux privesc |
| ServerB | Secondary target — lateral movement |
| ServerC | File server — encrypted files |
| Defender | SOC analyst workstation |

## Files

| File | Description |
|------|-------------|
| [`LAB4-PrivilegeEscalation-CipherStrike.unl`](https://github.com/TheEgea/TFG/raw/main/src/eve-ng/topologies/LAB4-PrivilegeEscalation-CipherStrike.unl) | EVE-NG topology — import directly |
