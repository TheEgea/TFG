# LAB2 -- Web Application Vulnerabilities (SYNAPSE Portal)

Configurations exported from the production EVE-NG lab.

## Nodes

| Folder | Node | IP | Role |
|--------|------|----|------|
| pfsense/ | pfSense CE | WAN + 172.16.1.1/30 LAN | Perimeter firewall, NAT |
| vyos/ | VyOS router | 172.16.1.2, 192.168.30.1, 10.0.40.1 | Internal router, DNS forwarding |
| server-a/ | Ubuntu 24.04 | 192.168.30.10 | SYNAPSE Intelligence Portal (Flask + nginx + SQLite) |
| server-b/ | Ubuntu 24.04 | 192.168.30.20 | DataVault internal service (Flask) |
| parrot/ | Parrot OS 6.4 | 10.0.40.10 (static) | Attacker workstation |

## Network Segments

| Segment | Subnet | Gateway |
|---------|--------|---------|
| Net-Link (pfSense ↔ VyOS) | 172.16.1.0/30 | — |
| Net-DMZ-Servers | 192.168.30.0/24 | 192.168.30.1 (VyOS) |
| Net-Attackers | 10.0.40.0/24 | 10.0.40.1 (VyOS) |

## Student Workflow

1. Browse `http://server-a.lab2.internal` → SYNAPSE Intelligence Portal (Firefox on Parrot)
2. Exploit **SQL injection** on `/search?q=` → dump `admin_users` table → retrieve flag + credentials
3. Exploit **stored XSS** → steal admin session cookie via victim bot (listener on Parrot)
4. Forge **broken authentication cookie** (`ID:ROLE:USERNAME`) → elevate to admin
5. Use leaked `monitor` credentials → SSH lateral movement to Server-B (`192.168.30.20`)
6. Access DataVault on Server-B → retrieve `FLAG{synapse_pivot_server_b}`

## Flags

| ID | Location | Method |
|----|----------|--------|
| F0 | SYNAPSE `/search` | SQL injection → `admin_users.flag` column |
| F1 | SYNAPSE admin panel | Cookie forgery (`admin` role) |
| F2 | SYNAPSE XSS | Stored XSS cookie exfil via victim bot |
| F3 | SYNAPSE admin → monitor creds | Credential leak from admin panel |
| F4 | Server-B DataVault | SSH pivot with monitor credentials |
| F5 | Server-B `/home/monitor/flag.txt` | `FLAG{synapse_pivot_server_b}` |

## Restore EVE-NG host bridges (after reboot)

```bash
bash /usr/local/bin/lab2-bridges-up.sh
```

Or manually:
```bash
ip addr add 192.168.30.254/24 dev vnet0_2
ip addr add 10.0.40.254/24   dev vnet0_3
```

## DNS mappings (via VyOS forwarding)

| Hostname | IP |
|----------|----|
| `server-a.lab2.internal` | 192.168.30.10 |
| `server-b.lab2.internal` | 192.168.30.20 |
| `router.lab2.internal` | 192.168.30.1 |
| `attacker.lab2.internal` | 10.0.40.10 |
