# LAB2 – Web Application Vulnerabilities (SYNAPSE Intelligence Portal)

LAB2 introduces web application security through a deliberately vulnerable Flask application called **SYNAPSE Intelligence Portal**. Students exploit a chain of vulnerabilities to achieve lateral movement from the web application to an internal SSH server.

---

## Topology

```
Homelab LAN (192.168.0.0/24)
        |
[pfSense-LAB2]  WAN: 192.168.0.x (DHCP)
        |
[VyOS-LAB2]
  eth0: 172.16.x.x/30   ← uplink to pfSense
  eth1: 192.168.30.x/24 ← Net-DMZ (servers)
  eth2: 10.0.40.x/24    ← Net-Attackers (Parrot)
        |
  ┌─────┴──────┐
[Server-A]   [Server-B]       [Parrot]
192.168.30.x  192.168.30.x  10.0.40.x
SYNAPSE app    CMDi app       Attacker
(Docker)       (F4 pending)
```

## Node summary

| Node | IP | Role |
|------|----|------|
| VyOS-LAB2 | eth0: 172.16.x.x, eth1: 192.168.30.x, eth2: 10.0.40.x | Router + NAT + DNS |
| Server-A (SYNAPSE) | 192.168.30.x | Flask + nginx + Playwright victim (Docker Compose) |
| Server-B | 192.168.30.x | Ubuntu 24.04 — CMDi target (pending) |
| Parrot-Attacker | 10.0.40.x (static) | Attacker |
| pfSense-LAB2 | WAN: 192.168.0.x | Perimeter firewall |

## Vulnerability chain

```
XSS → Cookie Hijack → Broken Auth → SQLi → SSH Lateral Movement → CMDi → Final Flag
```

| Step | Vulnerability | Location |
|------|--------------|----------|
| 1 | Stored XSS | `/comments` — Jinja2 `| safe` filter |
| 2 | Cookie theft | `HttpOnly=False` session cookie |
| 3 | Broken authentication | Unsigned `ID:ROLE:USERNAME` cookie |
| 4 | UNION SQL Injection | `/search?q=` — raw string concatenation |
| 5 | SSH lateral movement | Credentials from `admin_users` table |
| 6 | Command Injection | Server-B CMDi app (pending F4) |

## Application credentials

| User | Password | Role |
|------|----------|------|
| admin | Admin@Synapse2024 | admin |
| guest | guest123 | guest |
| monitor | M0nit0r2024 | SSH on Server-B |

## Lab startup

```bash
# 1. Run bridge script on EVE-NG host (after reboot):
bash /usr/local/bin/lab2-bridges-up.sh

# 2. Start SYNAPSE app on Server-A:
sshpass -p ubuntu ssh ubuntu@192.168.30.x
cd /opt/synapse && docker compose up -d
docker compose ps  # all 3 containers should be Up

# 3. Verify from Parrot:
curl http://192.168.30.x   # → SYNAPSE portal
```

!!! warning "pfSense-LAB2 UEFI boot"
    pfSense-LAB2 is installed in UEFI mode. EVE-NG's default launcher (SeaBIOS) cannot boot it.
    Use the custom script: `/usr/local/bin/pfsense-lab2-start.sh`

!!! warning "Bridge IPs lost on reboot"
    After each EVE-NG host reboot, run: `bash /usr/local/bin/lab2-bridges-up.sh`
    This restores IPs on vnet0_1, vnet0_2, vnet0_3.
