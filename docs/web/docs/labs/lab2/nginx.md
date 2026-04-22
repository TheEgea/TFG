# LAB2 – nginx Reverse Proxy

The `nginx` container is the only service with a port published to the host network.
It receives all inbound HTTP traffic from the Attacker and forwards it to the Flask
application using Docker's internal DNS.

---

## Network parameters

| Parameter        | Value                  |
|------------------|------------------------|
| Public IP        | `192.168.30.10`        |
| Published port   | `80`                   |
| Upstream         | `http://flask:5000`    |
| Config file path | `./nginx/default.conf` |

---

## Configuration

```nginx
server {
    listen 80;

    location / {
        proxy_pass         http://flask:5000;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
    }
}
```

All requests are forwarded transparently to the `flask` container. No TLS is
configured — intentional for the lab environment.

---

## Connectivity verification

From the Attacker (Parrot):

```bash
curl -v http://192.168.30.10/login
# Expected: HTTP 200 with Synapse login page HTML
```

From inside the Docker host:

```bash
curl -v http://localhost/login
```

!!! tip "Live traffic"
    Watch nginx access logs while running the exercise to confirm the victim bot
    is hitting `/comments` on schedule:

    ```bash
    docker compose logs -f nginx
    ```

