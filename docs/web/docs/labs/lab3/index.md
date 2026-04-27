# LAB3 — Incident Response and Log Forensics (HELIX Systems)

LAB3 shifts the student's role from **attacker to defender**. The attack has already occurred. The task is to connect to the affected systems, collect and correlate log evidence, and reconstruct the attacker's complete activity timeline as a SOC analyst.

The scenario centres on **HELIX Systems**, a fictional company with a two-tier internal infrastructure. An unknown threat actor has brute-forced SSH credentials, escalated privileges via a misconfigured `sudoers` entry, established persistence with a backdoor account, and moved laterally to the database server to access sensitive client data.

---

## Topology

```
Homelab LAN (192.168.0.0/24)
        |
[pfSense-LAB3]  WAN: 192.168.0.x (DHCP)  <- student entry (DNAT TCP:22 -> Server-Web)
        |        LAN: 172.16.2.1/30
[VyOS-LAB3]
  eth0: 172.16.2.2/30     <- uplink to pfSense
  eth1: 192.168.50.1/24   <- Net-Servers
  eth2: 192.168.60.1/24   <- Net-Internal
        |              |
[Server-Web]      [Server-DB]
192.168.50.10     192.168.60.10
Primary target    Lateral movement target
(auth.log, bash   (clients.db,
 history, maint)   .exfil_marker)
```

## Node summary

| Node | IP | Role |
|------|----|------|
| pfSense-LAB3 | WAN: 192.168.0.x (DHCP), LAN: 172.16.2.1/30 | Perimeter firewall + DNAT student entry |
| VyOS-LAB3 | 172.16.2.2 / 192.168.50.1 / 192.168.60.1 | Router + SNAT |
| Server-Web | 192.168.50.10/24 | Primary forensic target (helix-web) |
| Server-DB | 192.168.60.10/24 | Lateral movement target (helix-db) |

## Accounts

| System | Username | Password | Role |
|--------|----------|----------|------|
| pfSense-LAB3 | admin | pfsense | Firewall management |
| VyOS-LAB3 | vyos | vyos | Router console |
| Server-Web | analyst | An@lyst2024 | **Student entry account** |
| Server-Web | devops | D3v0ps#2023 | Compromised account |
| Server-Web | maint | — | Backdoor account (attacker-created) |
| Server-DB | analyst | An@lyst2024 | Internal access |
| Server-DB | devops | D3v0ps#2023 | Compromised account (reused password) |

## Attack timeline (pre-staged)

| Time | Host | Event |
|------|------|-------|
| 03:05–03:16 | Server-Web | 25 failed SSH attempts for `devops` from `185.220.101.47` |
| 03:17 | Server-Web | Successful SSH login as `devops` |
| 03:18 | Server-Web | `sudo /usr/bin/find` — privilege escalation to root |
| 03:19 | Server-Web | `useradd maint` — backdoor account + sudoers persistence |
| 03:21 | Server-DB | SSH login as `devops` from `192.168.50.10` (lateral movement) |
| 03:22 | Server-DB | Access to `clients.db` + `.exfil_marker` created |

## Student entry point

```bash
ssh analyst@<pfSense-WAN-IP>
# Password: An@lyst2024
# Lands directly on helix-web (via DNAT)
```

## MITRE ATT&CK coverage

| Tactic | Technique | Evidence |
|--------|-----------|---------|
| Initial Access (TA0001) | Valid Accounts — brute force SSH | auth.log: 25 failures + 1 success |
| Privilege Escalation (TA0004) | Sudo misconfiguration | auth.log: sudo /usr/bin/find |
| Persistence (TA0003) | Create Account | auth.log: useradd maint; /etc/sudoers.d/maint |
| Lateral Movement (TA0008) | SSH with reused credentials | Server-DB auth.log: login from 192.168.50.10 |
| Exfiltration (TA0010) | Data access | /opt/helix/data/.exfil_marker |

## Lab tools (no offensive tools needed)

Students use only standard Unix utilities: `grep`, `awk`, `less`, `cat`, `find`, `journalctl`.
