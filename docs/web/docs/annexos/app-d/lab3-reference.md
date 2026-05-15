# App D — Lab 3: HELIX Systems Instructor Reference

This appendix provides the deployment and pre-staging reference for Lab 3 (Incident
Response and Log Forensics). It documents all accounts, the pre-staged attack timeline,
and the evidence artefacts that students are expected to find. The step-by-step
investigation walkthrough is at docs/web/docs/labs/lab3/walkthrough/.

## Accounts

| **System** | **Username** | **Password** | **Role** |
| --- | --- | --- | --- |
| pfSense-LAB3 | admin | pfsense | Firewall management |
| VyOS-LAB3 | vyos | vyos | Router console |
| Server-Web | analyst | `An@lyst2024` | **Student entry account** |
| Server-Web | devops | `D3v0ps#2023` | Compromised account (brute-forced) |
| Server-Web | maint | — | Backdoor account (attacker-created) |
| Server-DB | analyst | `An@lyst2024` | Internal access |
| Server-DB | devops | `D3v0ps#2023` | Compromised (password reuse) |
| Server-Web | ubuntu | `ubuntu` | Admin (direct SSH, teacher only) |
| Server-DB | ubuntu | `ubuntu` | Admin (direct SSH, teacher only) |

## Pre-Staged Attack Timeline

| **Time** | **Host** | **Event** |
| --- | --- | --- |
| 03:05–03:16 | Server-Web | 25 failed SSH attempts for `devops` from `185.220.101.47` |
| 03:17 | Server-Web | Successful SSH login as `devops` |
| 03:18 | Server-Web | `sudo /usr/bin/find` — privilege escalation to root via GTFOBins |
| 03:19 | Server-Web | `useradd maint` + `/etc/sudoers.d/maint` — backdoor + persistence |
| 03:21 | Server-DB | SSH login as `devops` from `192.168.50.10` (lateral movement) |
| 03:22 | Server-DB | Access to `clients.db`; `.exfil_marker` created |

## Evidence Artefact Locations

| **Artefact** | **Path** | **Host** |
| --- | --- | --- |
| SSH brute-force log | `/var/log/auth.log` | Server-Web |
| Privilege escalation | `/var/log/auth.log` (sudo entry) | Server-Web |
| Backdoor account | `/etc/passwd`, `/etc/sudoers.d/maint` | Server-Web |
| Sudoers misconfiguration | `/etc/sudoers.d/devops` | Server-Web |
| Bash history | `/home/devops/.bash_history` | Server-Web |
| Lateral movement log | `/var/log/auth.log` | Server-DB |
| Exfiltration marker | `/opt/helix/data/.exfil_marker` | Server-DB |
| Sensitive data | `/opt/helix/data/clients.db` | Server-DB |

## Lab Startup Checklist

1. Start all nodes in order: **pfSense** → **VyOS** → **Server-Web** → **Server-DB**
2. Verify the EVE-NG host bridge interfaces are active
   (persistent via udev rule `99-lab3-bridges.rules`):
   ```bash
   ip addr show vnet0_2   # Should show 192.168.50.254/24
   ip addr show vnet0_3   # Should show 192.168.60.254/24
   ```
3. If bridges are missing (e.g. after EVE-NG host reboot), restore manually:
   ```bash
   ip addr add 192.168.50.254/24 dev vnet0_2
   ip addr add 192.168.60.254/24 dev vnet0_3
   ```
4. Verify evidence artefacts via teacher accounts:
   ```bash
   # Server-Web
   ssh ubuntu@192.168.50.10   # password: ubuntu
   grep "185.220.101.47" /var/log/auth.log | wc -l  # expect 25+
   grep "maint" /etc/passwd                          # expect maint entry
   # Server-DB
   ssh ubuntu@192.168.60.10   # password: ubuntu
   ls /opt/helix/data/        # expect clients.db + .exfil_marker
   ```

!!! warning "Bridge conflict with Lab 1"
    If Lab 1 is also deployed, `99-lab1-bridges.rules` and `99-lab3-bridges.rules`
    assign overlapping interface names (`vnet0_2`/`vnet0_3`).
    Do not run Lab 1 and Lab 3 simultaneously on the same EVE-NG host.

## Student Entry Point

Students connect via SSH to pfSense's WAN IP; pfSense DNAT forwards TCP 22 directly to
Server-Web:

No offensive tools are required. Students use only standard Unix utilities:
`grep`, `awk`, `less`, `cat`, `find`,
`journalctl`.

## Lab Reset Procedure

To restore the lab to its initial forensic state after a student session:

Alternatively, revert both Server-Web and Server-DB QCOW2 images from
the pre-staged backup stored at /opt/unetlab/addons/qemu/lab3-backups/.