# App C — Lab 2: SYNAPSE Portal Instructor Reference

This appendix provides the deployment reference for Lab 2 (Web Application
Vulnerabilities). It is intended for instructors and administrators. The
application source code, Docker Compose files, and interactive walkthrough
are at docs/web/docs/labs/lab2/.

## Credentials and Access

| **System** | **Username** | **Password** | **Role** |
| --- | --- | --- | --- |
| pfSense-LAB2 | admin | pfsense | Firewall management |
| VyOS-LAB2 | vyos | vyos | Router console |
| Server-A OS | ubuntu | `S3rv3rA` | SSH access |
| Server-A Portal | admin | `Admin@Synapse2024` | Web application admin |
| Server-A Portal | guest | guest123 | Web application guest |
| Server-B OS | ubuntu | `S3rv3rB` | SSH access |
| Server-B DataVault | operator | `D4t4V4ult#2024` | API access |
| Parrot-LAB2 | lab2 | L4b2 | Attacker node |

## Vulnerability Chain and Flag Locations

| **Step** | **OWASP** | **Vuln** | **Implementation** | **Flag** |
| --- | --- | --- | --- | --- |
| 1 | A03:2021 | Stored XSS | `|safe` filter in Jinja2 template; `/comments` endpoint | — |
| 2 | A07:2021 | Cookie theft | `HttpOnly=False`; victim bot (Playwright) auto-visits comments | — |
| 3 | A07:2021 | Broken auth | Cookie format `ID:ROLE:USERNAME`; unsigned; forgeable | — |
| 4 | A03:2021 | SQL injection | `/search?q=` uses string concatenation | FLAG 1 |
| 5 | A01:2021 | Admin access | `/admin` panel reveals Server-B credentials | FLAG 2 |
| 6 | A08:2021 | YAML deser. | Server-B `/preview` uses `yaml.UnsafeLoader` | — |
| 7 | A08:2021 | RCE | `!!python/object/apply:os.system` payload via POST | FLAG 3 |

## Lab Startup Procedure

- After EVE-NG host reboot, restore bridge addresses:
- Start the SYNAPSE Portal on Server-A:
- Start the DataVault on Server-B:
- Configure Parrot static IP and verify connectivity:
**Note:** pfSense-LAB2 is installed in UEFI mode. If it fails to boot,
use the start script: `/usr/local/bin/pfsense-lab2-start.sh`. Server-A
uses `docker-compose` (v1, hyphen); Server-B uses `docker compose`
(v2, space).