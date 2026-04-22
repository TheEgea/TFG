# LAB2 – Flask Application (Synapse)

The `flask` container runs **Synapse**, a minimal Python web application built with
Flask 3.0. It is intentionally vulnerable and acts as the target for the XSS and
session hijacking exercises.

---

## Network parameters

| Parameter         | Value                |
|-------------------|----------------------|
| Internal hostname | `flask` (Docker DNS) |
| Internal port     | `5000`               |
| Exposed via       | nginx on port `80`   |

---

## Key routes

| Route       | Auth required | Description                                         |
|-------------|---------------|-----------------------------------------------------|
| `/`         | No            | Redirects to `/login`                               |
| `/login`    | No            | Login form — POST authenticates the user            |
| `/logout`   | No            | Clears the session cookie                           |
| `/comments` | No            | Public comment wall — **Stored XSS entry point**   |
| `/search`   | Yes           | Internal search — **SQLi entry point** (Lab 2 ext.) |

---

## Session mechanism

Synapse identifies authenticated users with a plain-text cookie:

```
session=<id>:<username>:<role>
```

Example for the `guest` user:

```
session=2:guest:guest
```

The server reads this cookie on every request and trusts it unconditionally.
There is no HMAC signing or server-side session store.

!!! danger "No HttpOnly flag"
    The session cookie is issued **without** the `HttpOnly` attribute.
    Any JavaScript running in the page context can read it via `document.cookie`.
    This is the root cause that makes the XSS -> session hijack chain possible.

---

## Database

Synapse uses a SQLite database stored at `/opt/synapse/synapse.db`, persisted via
the `synapse-db` Docker volume so data survives container restarts.

Seeded users:

| ID | Username | Password   | Role  |
|----|----------|------------|-------|
| 1  | `admin`  | `admin123` | admin |
| 2  | `guest`  | `guest123` | guest |

Comments table schema:

```sql
CREATE TABLE comments (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    author  TEXT,
    content TEXT   -- rendered with |safe in Jinja2, no HTML escaping
);
```

!!! warning "Jinja2 `|safe` filter"
    The comments template renders `content` with the `|safe` filter, which disables
    Jinja2's automatic HTML escaping. Any HTML or JavaScript inserted as a comment
    is rendered verbatim by the browser.

---

## Vulnerability surface

```
POST /comments
  └── content field (no sanitisation)
        └── stored raw in SQLite
              └── rendered with |safe in Jinja2 template
                    └── executed by every browser that loads /comments
```

The victim bot authenticates as `guest` and loads `/comments` every ~20 s,
providing a reliable and repeatable trigger for any stored payload.