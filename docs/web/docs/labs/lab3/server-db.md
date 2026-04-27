# LAB3 — Server-DB (helix-db)

Server-DB is the **lateral movement and data exfiltration target**. It holds the HELIX client database and the exfiltration marker that confirms the attacker accessed sensitive data after pivoting from Server-Web.

---

## System

| Parameter | Value |
|-----------|-------|
| Hostname | helix-db |
| OS | Ubuntu Server 24.04 LTS |
| IP | 192.168.60.10/24 |
| Gateway | 192.168.60.1 (VyOS eth2) |
| Segment | Net-Internal (isolated — not directly reachable from homelab) |

## Network config (Netplan)

```yaml
network:
  version: 2
  ethernets:
    ens3:
      addresses:
        - 192.168.60.10/24
      routes:
        - to: default
          via: 192.168.60.1
```

## Accounts

| Account | Password | Role |
|---------|----------|------|
| ubuntu | ubuntu | Default installer account |
| analyst | An@lyst2024 | Internal access (student pivot) |
| devops | D3v0ps#2023 | **Reused password** — same as Server-Web |

## Access from Server-Web

```bash
# From helix-web as analyst:
ssh analyst@192.168.60.10
# Password: An@lyst2024
```

## Pre-staged evidence in auth.log

```
# Lateral movement login (03:21):
Apr 24 03:21:03 helix-db sshd[987]: Accepted password for devops from 192.168.50.10 port 51234 ssh2
```

Source `192.168.50.10` = Server-Web internal IP — confirms pivot from compromised host.

## HELIX data directory

```bash
ls -la /opt/helix/data/
```

```
total 28
drwxr-xr-x 2 root root 4096 Apr 24 03:22 .
drwxr-xr-x 3 root root 4096 Apr 24 03:10 ..
-rw-r--r-- 1 root root 8192 Apr 24 03:10 clients.db
-rw-r--r-- 1 root root   47 Apr 24 03:22 .exfil_marker
```

```bash
cat /opt/helix/data/.exfil_marker
# Output: 185.220.101.47 - 2026-04-24 03:22 - data accessed
```

The `.exfil_marker` timestamp (03:22) is consistent with the lateral movement login (03:21), confirming the attack sequence.

`clients.db` is an SQLite database with fictional HELIX Systems client records. Its presence establishes the data-access motive.

## Key finding

The lateral movement succeeded purely due to **password reuse** — `D3v0ps#2023` was the same on both servers. Network segmentation (Server-DB is on Net-Internal, not directly reachable externally) did **not** prevent the attack once Server-Web was compromised.
