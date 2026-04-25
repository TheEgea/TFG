# LAB2 – Web Application Vulnerabilities (SYNAPSE Intelligence Corp)

LAB2 introduces web application security through a chain of five OWASP Top 10 vulnerabilities spanning two deliberately vulnerable Flask applications. Students conduct a full attack chain from external reconnaissance to remote code execution and data exfiltration.

---

## Topology

```
Homelab LAN (192.168.0.0/24)
        |
[pfSense-LAB2]  WAN: 192.168.0.x (DHCP)
        |        LAN: 172.16.x.x/30
[VyOS-LAB2]
  eth0: 172.16.x.x/30   <- uplink to pfSense
  eth1: 192.168.30.x/24 <- Net-DMZ (servers)
  eth2: 10.0.40.x/24    <- Net-Attackers (Parrot)
        |
  +-----+----------------+              |
[Server-A]           [Server-B]      [Parrot]
192.168.30.x         192.168.30.x   10.0.40.x
SYNAPSE Portal        DataVault       Attacker
(Docker Compose)      (Docker)
XSS+BrokenAuth+SQLi   YAML Deserialization
```

## Node summary

| Node | IP | Role |
|------|----|------|
| VyOS-LAB2 | eth0: 172.16.x.x, eth1: 192.168.30.x, eth2: 10.0.40.x | Router + NAT + DNS |
| Server-A (SYNAPSE Portal) | 192.168.30.x | Flask + nginx + Playwright victim bot (Docker Compose) |
| Server-B (SYNAPSE DataVault) | 192.168.30.x | Flask + PyYAML (Docker) — YAML deserialization target |
| Parrot-Attacker | 10.0.40.x (static) | Attacker node |
| pfSense-LAB2 | WAN: 192.168.0.x | Perimeter firewall |

## Vulnerability chain (5 vulnerabilities, 3 flags)

```
XSS -> Cookie Hijack -> Broken Auth -> SQLi -> Admin Panel -> YAML Deserialization -> RCE -> Exfil
```

| Step | Vulnerability | OWASP | Location | Flag |
|------|--------------|-------|----------|------|
| 1 | Stored XSS | A03 | /comments — Jinja2 \| safe filter | — |
| 2 | Cookie theft | A07 | HttpOnly=False session cookie | — |
| 3 | Broken authentication | A07 | Unsigned ID:ROLE:USERNAME cookie | — |
| 4 | UNION SQL Injection | A03 | /search?q= — raw string concatenation | FLAG 1 |
| 5 | Admin panel access | A01 | /admin — classified intel + Server-B creds | FLAG 2 |
| 6 | YAML Insecure Deserialization | A08 | Server-B /preview — yaml.UnsafeLoader | — |
| 7 | RCE via reverse shell | A08 | YAML payload !!python/object/apply:os.system | FLAG 3 |

## Application credentials

| User | Password | System | Role |
|------|----------|--------|------|
| admin | Admin@Synapse2024 | Server-A Portal | admin |
| guest | guest123 | Server-A Portal | guest |
| operator | D4t4V4ult#2024 | Server-B DataVault | operator |

The path from Server-A to Server-B credentials is through the admin panel — reached via SQLi + broken auth.

## Lab startup

```bash
# 1. Run bridge script on EVE-NG host (after reboot):
bash /usr/local/bin/lab2-bridges-up.sh

# 2. Start SYNAPSE Portal on Server-A:
sshpass -p ubuntu ssh ubuntu@192.168.30.x
cd /opt/synapse && docker-compose up -d
docker-compose ps  # 3 containers: flask, nginx, victim

# 3. Start DataVault on Server-B:
sshpass -p ubuntu ssh ubuntu@192.168.30.x  # Server-B IP
cd /opt/datavault && sudo docker compose up -d
sudo docker compose ps  # datavault-flask Up on port 80

# 4. Configure Parrot static IP (10.0.40.x/24, GW 10.0.40.x):
nmcli con mod "Wired connection 1" ipv4.method manual \
  ipv4.addresses 10.0.40.x/24 ipv4.gateway 10.0.40.x \
  ipv4.dns 10.0.40.x ipv4.ignore-auto-dns yes
nmcli con up "Wired connection 1"
```

> **Note (pfSense-LAB2 UEFI boot):** pfSense-LAB2 is installed in UEFI mode. Use `/usr/local/bin/pfsense-lab2-start.sh`

> **Note (Bridge IPs):** After each EVE-NG host reboot: `bash /usr/local/bin/lab2-bridges-up.sh`

> **Note (docker-compose):** Server-A uses docker-compose v1.29.2 (hyphen). Server-B uses Docker Compose v2 (`sudo docker compose` with space).
