# LAB2 – Web Application Vulnerabilities

LAB2 introduces client-side web vulnerabilities using a deliberately insecure Flask
application called **Synapse**. The lab runs entirely in Docker Compose and sits on
top of the LAB1 network infrastructure.

Students exploit a **Stored XSS** vulnerability to steal the session cookie of a
simulated authenticated victim, then reuse it to log in without a password — a
complete **session hijacking** chain.

---

## Topology

```
[Attacker – Parrot OS]  10.0.40.5
          |
    (EVE-NG management network)
          |
      [nginx]  192.168.30.10:80   <- public entry point
          |
      [flask]  internal           <- vulnerable Synapse app
          |
      [victim] internal           <- Playwright bot (simulated user)
```

All three services run as Docker Compose containers inside a dedicated VM on the EVE-NG topology.

---

## Service summary

| Service  | Image                                               | Role                         | Exposed            |
|----------|-----------------------------------------------------|------------------------------|--------------------|
| `flask`  | `python:3.11-slim`                                  | Vulnerable Synapse web app   | Internal only      |
| `nginx`  | `nginx:alpine`                                      | Reverse proxy                | `192.168.30.10:80` |
| `victim` | `mcr.microsoft.com/playwright/python:v1.58.0-noble` | Simulated authenticated user | Internal only      |

---

## Network segments

| Segment           | Subnet                       | Purpose                       |
|-------------------|------------------------------|-------------------------------|
| Docker internal   | `172.x.x.x` (Compose bridge) | Inter-container communication |
| EVE-NG management | `10.0.40.0/24`               | Attacker <-> Docker host VM   |
| Lab network       | `192.168.30.0/24`            | nginx public IP               |

---

## Docker Compose overview

```yaml
version: '3.8'

services:
  flask:
    image: python:3.11-slim
    working_dir: /app
    volumes:
      - ./app:/app
      - synapse-db:/opt/synapse
    command: >
      sh -c "pip install flask==3.0.0 -q &&
             python init_db.py &&
             python app.py"
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - flask
    restart: unless-stopped

  victim:
    image: mcr.microsoft.com/playwright/python:v1.58.0-noble
    container_name: synapse_victim
    working_dir: /app
    volumes:
      - ./victim:/app
    command: sh -c "pip install --no-cache-dir playwright==1.58.0 && python victim.py"
    depends_on:
      - flask
    restart: unless-stopped

volumes:
  synapse-db:
```

See each component's dedicated page for full details:

- [Flask app](flask.md)
- [nginx proxy](nginx.md)
- [Victim bot](victim.md)

---

## EVE-NG notes

!!! warning "Static IP on the Docker host VM"
    The VM running Docker Compose must have a static IP of `192.168.30.10`
    reachable from the Attacker node. Verify before starting the lab:

    ```bash
    ip addr show
    curl http://192.168.30.10
    ```

!!! tip "Victim cycle time"
    The `victim` container visits `/comments` approximately every **20 seconds**.
    After posting an XSS payload, wait at least one full cycle before concluding
    it failed.

---

## Lab startup checklist

1. Start the Docker host VM in EVE-NG
2. SSH into the VM and bring up the stack:
   ```bash
   cd ~/lab2-synapse
   docker compose up -d
   docker compose ps
   ```
3. Verify reachability from Parrot:
   ```bash
   curl http://192.168.30.10
   ```
4. Start the HTTP listener on Parrot before posting any payload:
   ```bash
   python3 -m http.server 8000
   ```
5. Open `http://192.168.30.10` in Firefox on Parrot and begin the exercise