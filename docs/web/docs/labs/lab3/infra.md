# LAB3 — Infrastructure Reference

Complete infrastructure reference for LAB3 HELIX Systems. For instructor/lab admin use.

---

## Node inventory

| Node | EVE-NG ID | Console | Image | Status |
|------|-----------|---------|-------|--------|
| pfSense-LAB3 | 1 | VNC 32769 | pfsense-ce | Operational |
| VyOS-LAB3 | 2 | Telnet 32770 | vyos-rolling | Operational |
| Server-Web | 3 | VNC 32771 | linux-ubuntu-server-24.04 | Operational |
| Server-DB | 4 | VNC 32772 | linux-ubuntu-server-24.04 | Operational |

## Network addressing

| Network | Subnet | Bridge | Host IP |
|---------|--------|--------|---------|
| Net-Servers | 192.168.50.0/24 | vnet0_2 | 192.168.50.254 |
| Net-Internal | 192.168.60.0/24 | vnet0_3 | 192.168.60.254 |
| Net-Link (pfSense↔VyOS) | 172.16.2.0/30 | — | — |

## Credentials (full reference)

| System | User | Password | Access |
|--------|------|----------|--------|
| EVE-NG host | root | SSH key id_ed25519_eve-ng | ssh eve-ng |
| pfSense-LAB3 | admin | pfsense | VNC 32769 |
| VyOS-LAB3 | vyos | vyos | Telnet 32770 |
| Server-Web | ubuntu | ubuntu | VNC 32771 (installer default) |
| Server-Web | analyst | An@lyst2024 | SSH via pfSense DNAT |
| Server-Web | devops | D3v0ps#2023 | Compromised (attacker-used) |
| Server-Web | maint | — | Backdoor account |
| Server-DB | ubuntu | ubuntu | VNC 32772 |
| Server-DB | analyst | An@lyst2024 | SSH from Server-Web |
| Server-DB | devops | D3v0ps#2023 | Compromised (reused password) |

## Pre-staged evidence

### Server-Web (`192.168.50.10`)

| Artefact | Path | Content |
|----------|------|---------|
| SSH brute-force + login | `/var/log/auth.log` | 25 failed + 1 successful login for `devops` from `185.220.101.47` |
| Privilege escalation | `/var/log/auth.log` | `sudo /usr/bin/find` by `devops` at 03:18 |
| Backdoor creation | `/var/log/auth.log` | `useradd maint` at 03:19 |
| Attacker command history | `/home/devops/.bash_history` | Full post-escalation command sequence |
| Backdoor account | `/etc/passwd` + `/etc/sudoers.d/maint` | `maint` user with `NOPASSWD: ALL` |

### Server-DB (`192.168.60.10`)

| Artefact | Path | Content |
|----------|------|---------|
| Lateral movement login | `/var/log/auth.log` | `devops` login from `192.168.50.10` at 03:21 |
| HELIX client database | `/opt/helix/data/clients.db` | SQLite DB with fictional client records |
| Exfiltration marker | `/opt/helix/data/.exfil_marker` | `185.220.101.47 - 2026-04-24 03:22 - data accessed` |

## Lab startup procedure

```bash
# 1. EVE-NG host — restore bridge IPs after reboot
# (udev rule 99-lab3-bridges.rules should auto-apply)
# Verify:
ip addr show vnet0_2  # should have 192.168.50.254/24
ip addr show vnet0_3  # should have 192.168.60.254/24

# 2. Start all EVE-NG nodes (pfSense, VyOS, Server-Web, Server-DB)
# All are pre-configured — just power on from EVE-NG UI

# 3. Verify student entry point
ssh analyst@<pfSense-WAN-IP>
# Should land on helix-web prompt
```

!!! warning "End-to-end verification pending"
    The full student SSH chain (homelab → pfSense DNAT → Server-Web → Server-DB pivot) has not yet been verified end-to-end in a live session (F5 pending).
