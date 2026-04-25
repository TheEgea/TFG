# Server-A-SYNAPSE -- Configuration

## Access
- SSH: sshpass -p ubuntu ssh ubuntu@192.168.30.10 (from EVE-NG host)
- Requires: bridge vnet0_2 with IP 192.168.30.254/24 active

## System
- OS: Ubuntu 24.04.3 LTS
- Hostname: server-a-synapse
- IP: 192.168.30.10/24, GW: 192.168.30.1 (VyOS eth1)
- User: ubuntu (sudo NOPASSWD), synapse (Syn@pse2024)

## SYNAPSE Intelligence Portal
- Path: /opt/synapse/
- Stack: Flask + SQLite + nginx (Docker Compose, 3 containers)
- Public port: 80 (nginx -> flask:5000)

### Containers
| Name            | Image                           | Role                   |
|-----------------|---------------------------------|------------------------|
| synapse_flask_1 | python:3.11-slim                | Flask app (port 5000)  |
| synapse_nginx_1 | nginx:alpine                    | Reverse proxy (80)     |
| synapse_victim  | playwright/python:v1.58.0-noble | Victim bot (every 20s) |

### Start
```bash
cd /opt/synapse && docker compose up -d
```

### App credentials
| User    | Password          | Role                          |
|---------|-------------------|-------------------------------|
| admin   | Admin@Synapse2024 | admin                         |
| guest   | guest123          | guest                         |
| monitor | M0nit0r2024       | SSH creds for Server-B        |

### Implemented vulnerabilities
1. Stored XSS -- /comments renders unsanitized HTML + cookie without HttpOnly
2. Broken auth -- unsigned cookie format ID:ROLE:USERNAME
3. SQL Injection -- /search?q= direct string concatenation with visible SQL error

### Flags
- FLAG{synapse_sqli_creds_dumped} -- admin_users table, flag column

## Pending
- Verify outbound connectivity to internet (NAT via VyOS -> pfSense)
