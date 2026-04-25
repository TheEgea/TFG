# LAB2 – Infrastructure Reference

Complete infrastructure reference for LAB2 SYNAPSE Intelligence Corp. For instructor/lab admin use.

---

## Node inventory

| Node | EVE-NG ID | VNC Port | Image | Status |
|------|-----------|----------|-------|--------|
| Parrot-Attacker | 1 | 32769 | linux-parrot-security-6.4 | Running |
| VyOS-LAB2 | 2 | Telnet 32770 | vyos-2026.02.13-rolling | Running |
| Server-A-SYNAPSE | 3 | 32771 | linux-ubuntu-server-24.04 | Running |
| Server-B-SYNAPSE | 4 | 32772 | linux-ubuntu-server-24.04 | Running |
| pfSense-LAB2 | 5 | 32773 | pfsense-ce | Running |

## Network addressing

| Network | Subnet | Bridge | Host IP |
|---------|--------|--------|---------|
| Net-Attackers | 10.0.40.0/24 | vnet0_1 | 10.0.40.254 |
| Net-DMZ | 192.168.30.0/24 | vnet0_2 | 192.168.30.254 |
| Net-Link (pfSense↔VyOS) | 172.16.1.0/30 | vnet0_3 | — |

## Credentials (full reference)

| System | User | Password | Access |
|--------|------|----------|--------|
| EVE-NG host | root | SSH key id_ed25519_eve-ng | ssh eve-ng |
| pfSense-LAB2 | admin | pfsense | VNC 32773 / SSH 192.168.0.x |
| VyOS-LAB2 | vyos | vyos | Telnet 32770 |
| Server-A OS | ubuntu | S3rv3rA | SSH 192.168.30.x |
| Server-A Portal (admin) | admin | Admin@Synapse2024 | http://192.168.30.x/login |
| Server-A Portal (guest) | guest | guest123 | http://192.168.30.x/login |
| Server-B OS | ubuntu | S3rv3rB | SSH 192.168.30.x |
| Server-B DataVault | operator | D4t4V4ult#2024 | http://192.168.30.x/login |
| Parrot OS | lab2 | L4b2 | SSH 10.0.40.x |

## Deployed applications

### Server-A — SYNAPSE Intelligence Portal

- **Path:** `/opt/synapse/`
- **Stack:** Flask 3.x + SQLite + nginx + Playwright victim bot
- **Command:** `cd /opt/synapse && docker-compose up -d` (docker-compose v1.29.2)
- **Containers:** synapse_flask_1 (port 5000), synapse_nginx_1 (port 80), synapse_victim

```
/opt/synapse/
├── app/
│   ├── app.py           # Flask application (XSS, broken auth, SQLi, admin panel)
│   ├── init_db.py       # DB schema + seed data (flags, credentials)
│   ├── requirements.txt
│   └── templates/
│       ├── login.html
│       ├── portal.html  # main portal (reports)
│       ├── comments.html # XSS sink
│       ├── search.html  # SQLi sink
│       ├── admin.html   # admin panel (FLAG#2 + Server-B creds)
│       └── forbidden.html
├── docker-compose.yml
├── nginx/default.conf
└── victim/victim.py     # Playwright bot (visits /comments every 20s)
```

**Database tables:**

| Table | Contents |
|-------|---------|
| users | admin/Admin@Synapse2024, guest/guest123 (MD5 passwords) |
| reports | 5 dummy intel reports |
| comments | XSS sink — rendered with `\| safe` filter |
| admin_users | FLAG{synapse_sqli_creds_dumped} |
| classified_intel | FLAG{synapse_admin_classified_accessed} + operator/D4t4V4ult#2024 |

### Server-B — SYNAPSE DataVault

- **Path:** `/opt/datavault/`
- **Stack:** Flask + PyYAML 6.x (Docker Compose v2)
- **Command:** `cd /opt/datavault && sudo docker compose up -d`
- **Container:** datavault-flask (port 80→5000)

```
/opt/datavault/
├── app/
│   ├── app.py           # Flask app (YAML UnsafeLoader vuln in /preview)
│   └── templates/
│       ├── login.html
│       ├── index.html
│       └── preview.html
├── data/
│   └── finalData.txt    # FLAG{synapse_nexus_exfil_complete}
├── uploads/             # user upload dir (runtime)
└── docker-compose.yml
```

## Lab startup procedure

```bash
# 1. EVE-NG host — restore bridge IPs after reboot
bash /usr/local/bin/lab2-bridges-up.sh

# 2. Start pfSense (UEFI mode)
/usr/local/bin/pfsense-lab2-start.sh

# 3. Server-A
sshpass -p S3rv3rA ssh ubuntu@192.168.30.x
cd /opt/synapse && docker-compose up -d
docker-compose ps   # flask, nginx, victim all Up

# 4. Server-B
sshpass -p S3rv3rB ssh ubuntu@192.168.30.x
cd /opt/datavault && sudo docker compose up -d
sudo docker compose ps  # datavault-flask Up

# 5. Parrot — apply static IP each session
sudo ip addr add 10.0.40.x/24 dev ens4
sudo ip route add default via 10.0.40.1
```

## Flags summary

| # | Flag | Location | How to reach |
|---|------|---------|-------------|
| 1 | FLAG{synapse_sqli_creds_dumped} | admin_users table | UNION SQLi on /search |
| 2 | FLAG{synapse_admin_classified_accessed} | classified_intel table | /admin with forged admin cookie |
| 3 | FLAG{synapse_nexus_exfil_complete} | /app/data/finalData.txt (Server-B) | YAML deserialization → reverse shell |
