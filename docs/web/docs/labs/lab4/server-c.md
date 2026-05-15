# LAB4 — ServerC (Advanced Mix — Gated)

ServerC hosts four advanced challenges combining cryptography and steganography.
Access is **gated** — students must derive the SSH password from flags A5 and B5.

---

## Gate mechanism

```
password = md5(flag_A5 + flag_B5)[:12]
         = md5("H4U{rsa_sm4ll_3xp0n3nt}H4U{st3gh1d3_p4ssw0rd_cr4ck}")[:12]
         = fa681b59855d
```

The decoy password `D3vOps24!` is planted in challenge materials. It is intentionally wrong.

---

## System

| Parameter | Value |
|-----------|-------|
| Hostname | serverc |
| OS | Ubuntu Server 24.04 LTS |
| IP | 10.10.3.10/24 |
| Gateway | 10.10.3.1 (VyOS eth3) |

## Network config (`/etc/netplan/01-lab4.yaml`)

```yaml
network:
  version: 2
  ethernets:
    ens3:
      addresses:
        - 10.10.3.10/24
      routes:
        - to: default
          via: 10.10.3.1
```

## Accounts

| Account | Password | Role |
|---------|----------|------|
| devops | `fa681b59855d` | Student entry (derived) |
| root | `eve` | Console only |

## Installed tools

| Package | Purpose |
|---------|---------|
| `exiftool` | EXIF hint extraction (C1) |
| `steghide` | Payload extraction (C1) |
| `python3-pil` (Pillow) | EXIF re-insertion after steghide (C1) |
| `hlextend` 0.2 | SHA-1 length extension attack (C3) |
| `unzip` | ZIP payload inside C1 |
| `python3` | All verifier scripts |

!!! warning "C1: steghide strips EXIF"
    `steghide` removes EXIF when embedding. The challenge file was reconstructed with
    `piexif.insert()` after embedding. If regenerating C1, apply this step or students
    will not find the steghide passphrase from EXIF.

!!! info "bzip2 CLI not available"
    For C2, students must use Python's `bz2` module — the `bzip2` CLI is absent:
    ```python
    python3 -c "import bz2, gzip, base64; ..."
    ```

## Challenge files (`/home/devops/retos/`)

| File | Challenge | Technique |
|------|-----------|-----------|
| `C1_backup_tapes.jpg` | C1 | EXIF → steghide → ZIP |
| `C2_backup_log.b64` | C2 | Onion: base64 → gzip → base64 → bzip2 |
| `C3_api_token.txt` | C3 | SHA-1 length extension (HMAC bypass) |
| `C3_verificador.py` | C3 | Verifier script |
| `C4_ecdsa_signatures.txt` | C4 | ECDSA nonce reuse — recover private key |
| `C4_verificador.py` | C4 | Verifier script |

## Flags

| ID | Flag |
|----|------|
| C1 | `H4U{mult1l4y3r_st3g0_4es}` |
| C2 | `H4U{0n10n_l4y3rs_st3g0}` |
| C3 | `H4U{l3ngth_3xt3ns10n_sh4}` |
| C4 | `H4U{3cc_n0nc3_r3us3_pwn3d}` |

## hlextend API

```python
import hlextend
sha = hlextend.new('sha1')
forged_msg = sha.extend(additional_data, known_message, secret_len, known_mac)
forged_mac  = sha.hexdigest()
# Note: extend() returns only forged_msg, not a tuple
```

## Admin verification

```bash
# Set bridge first (on EVE-NG host)
ip addr add 10.10.3.253/24 dev vnet0_5

ssh devops@10.10.3.10          # fa681b59855d
ls -la /home/devops/retos/
python3 -c "import hlextend; print('hlextend OK')"
exiftool /home/devops/retos/C1_backup_tapes.jpg | grep -i comment
python3 /home/devops/retos/C3_verificador.py
python3 /home/devops/retos/C4_verificador.py
```
