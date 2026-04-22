# LAB2 – Victim Bot (Playwright)

The `victim` container simulates an **authenticated user** who periodically browses
the Synapse application. It removes the need for a second physical person to act
as the victim — the bot plays that role automatically and deterministically.

---

## Network parameters

| Parameter       | Value                       |
|-----------------|-----------------------------|
| Container name  | `synapse_victim`            |
| Reaches         | `http://nginx` (Docker DNS) |
| Published ports | None — internal only        |

---

## Behaviour cycle

The bot runs `victim.py` in an infinite loop. Each iteration takes ~30 s:

| Step | Action                                                 |
|------|--------------------------------------------------------|
| 1    | Navigate to `http://nginx/login`                       |
| 2    | Fill username `guest` / password `guest123` and submit |
| 3    | Print cookies obtained after login                     |
| 4    | Navigate to `http://nginx/comments`                    |
| 5    | Hold the page open for **8 seconds** — XSS fires here |
| 6    | Sleep 20 seconds, then repeat                          |

---

## Source code

```python
import time
from playwright.sync_api import sync_playwright

BASE = "http://nginx"
USER = "guest"
PASS = "guest123"

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        while True:
            try:
                page.goto(f"{BASE}/login", wait_until="networkidle")
                page.fill('input[name="username"]', USER)
                page.fill('input[name="password"]', PASS)
                page.click('button[type="submit"]')
                page.wait_for_timeout(2000)

                page.goto(f"{BASE}/comments", wait_until="networkidle")
                page.wait_for_timeout(8000)   # XSS payload executes here

            except Exception as e:
                print("victim error:", e)

            time.sleep(20)

if __name__ == "__main__":
    run()
```

---

## Why the victim triggers the XSS

When the bot loads `/comments`, Chromium renders the full page HTML including any
`<script>` tags stored in the comments table. At that moment the browser holds an
active session cookie for `guest`, so `document.cookie` contains the value the
attacker wants to steal.

The 8-second `wait_for_timeout` gives the `fetch()` payload enough time to reach
the attacker's listener before the page is navigated away.

---

## Monitoring

```bash
docker compose logs -f victim
```

Typical output during a normal cycle:

```
[victim] visiting /login
[victim] url after login: http://nginx/comments
[victim] cookies after login: [{'name': 'session', 'value': '2:guest:guest', ...}]
[victim] visiting /comments
[victim] url after comments: http://nginx/comments
[victim] cookies before wait: [{'name': 'session', 'value': '2:guest:guest', ...}]
```

!!! tip "Timing the payload"
    Post the XSS comment first, then wait for the next cycle. The bot visits
    `/comments` every ~20 s. If the listener receives no request after 40 s,
    double-check that port `8000` on `10.0.40.5` is reachable from the Docker
    network and that the payload syntax is correct.

!!! warning "Browser restarts"
    Each iteration reuses the same browser context, so the session cookie persists
    across cycles without re-authenticating every time. If the container restarts,
    a fresh login cycle begins automatically.
