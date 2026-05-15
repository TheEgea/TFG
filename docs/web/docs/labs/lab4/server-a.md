# LAB4 — ServerA (Cryptography Module)

ServerA hosts the five cryptography challenges of **Module A**.
Challenge files are in `/home/admin/mensajes/`.

---

## System

| Parameter | Value |
|-----------|-------|
| Hostname | servera |
| OS | Ubuntu Server 24.04 LTS |
| IP | 10.10.1.10/24 |
| Gateway | 10.10.1.1 (VyOS eth1) |

## Network config (`/etc/netplan/01-lab4.yaml`)

```yaml
network:
  version: 2
  ethernets:
    ens3:
      addresses:
        - 10.10.1.10/24
      routes:
        - to: default
          via: 10.10.1.1
```

## Accounts

| Account | Password | Role |
|---------|----------|------|
| admin | `N3xaTech!` | Student entry |
| root | `eve` | Console only |

## Installed tools

| Package | Version | Purpose |
|---------|---------|---------|
| `pycryptodome` | 3.23.0 | AES oracle (A2), RSA (A5) |
| `gmpy2` | 2.1.5 | Integer cube root for RSA (A5) |
| `python3` | system | Challenge scripts |

## Challenge files (`/home/admin/mensajes/`)

| File | Challenge | Technique |
|------|-----------|-----------|
| `A1_mensaje_interceptado.txt` | A1 | ROT13 |
| `A2_oracle.py` | A2 | AES-ECB encryption oracle |
| `A2_admin_cipher.b64` | A2 | Base64-encoded AES-ECB ciphertext |
| `A3_documento_clasificado.txt` | A3 | Vigenère (key: `NEXATECH`) |
| `A4_mensaje_xor.hex` | A4 | XOR repeating key (hex) |
| `A5_rsa_challenge.txt` | A5 | RSA `e=3`, cube root attack |

## Flags

| ID | Flag |
|----|------|
| A1 | `H4U{r0t_c1ph3r_br0k3n}` |
| A2 | `H4U{4es_3cb_bl0ck_4tt4ck}` |
| A3 | `H4U{v1g3n3r3_k4s1sk1_4tt4ck}` |
| A4 | `H4U{x0r_r3p34t1ng_k3y}` |
| A5 | `H4U{rsa_sm4ll_3xp0n3nt}` ← **gate flag** |

!!! danger "A5 is required for ServerC access"
    The MD5 gate uses this flag concatenated with B5.

## Admin verification

```bash
ssh admin@10.10.1.10          # N3xaTech!
ls -la /home/admin/mensajes/
python3 -c "from Crypto.Cipher import AES; import gmpy2; print('tools OK')"
python3 /home/admin/mensajes/A2_oracle.py   # should print encrypted block
```
