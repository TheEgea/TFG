# App J — Lab 4: CipherStrike Instructor Reference

This appendix provides the deployment and configuration reference for Lab 4
(Cryptography and Steganography CTF). It is intended for instructors and system
administrators responsible for setting up, resetting, and grading the lab.

The student-facing challenge guide is at [EVE-NG Labs → LAB4](../../labs/lab4/index.md).

---

## Credentials and Access

| Node | Username | Password | Access |
|------|----------|----------|--------|
| pfSense-LAB4 | admin | `pfsense` | Web GUI / SSH |
| VyOS-LAB4 | vyos | `vyos` | EVE-NG console |
| ServerA | admin | `N3xaTech!` | SSH 10.10.1.10 |
| ServerB | sysop | `S3cure24!` | SSH 10.10.2.10 |
| ServerC | devops | `fa681b59855d` | SSH 10.10.3.10 (derived — see below) |
| Defender | lab4 | `L4b4` | EVE-NG VNC |

!!! warning "Do not distribute ServerC password to students"
    The ServerC password is derived from flags A5 and B5.
    Students must solve both modules before accessing ServerC.
    The decoy `D3vOps24!` appears in some materials intentionally.

**Derivation:** `md5(A5_flag + B5_flag)[:12] = fa681b59855d`

```python
import hashlib
a5 = "H4U{rsa_sm4ll_3xp0n3nt}"
b5 = "H4U{st3gh1d3_p4ssw0rd_cr4ck}"
password = hashlib.md5((a5 + b5).encode()).hexdigest()[:12]
# -> fa681b59855d
```

---

## Network Segments

| Segment | Subnet | Gateway | Purpose |
|---------|--------|---------|---------|
| WAN | 192.168.0.0/24 | 192.168.0.1 | pfSense WAN (DHCP → 192.168.0.18) |
| Net-Link | 192.168.1.0/24 | 192.168.1.1 | pfSense ↔ VyOS |
| Zone-A | 10.10.1.0/24 | 10.10.1.1 | ServerA — Cryptography |
| Zone-B | 10.10.2.0/24 | 10.10.2.1 | ServerB — Steganography |
| Zone-C | 10.10.3.0/24 | 10.10.3.1 | ServerC — Advanced Mix |
| Zone-Defense | 10.10.4.0/24 | 10.10.4.1 | Defender |

---

## Challenge Inventory

### ServerA — Cryptography (`/home/admin/mensajes/`)

| ID | File | Technique | Flag |
|----|------|-----------|------|
| A1 | `A1_mensaje_interceptado.txt` | ROT13 | `H4U{r0t_c1ph3r_br0k3n}` |
| A2 | `A2_oracle.py` + `A2_admin_cipher.b64` | AES-ECB oracle | `H4U{4es_3cb_bl0ck_4tt4ck}` |
| A3 | `A3_documento_clasificado.txt` | Vigenère + Kasiski (key: NEXATECH) | `H4U{v1g3n3r3_k4s1sk1_4tt4ck}` |
| A4 | `A4_mensaje_xor.hex` | XOR repeating key + crib-dragging | `H4U{x0r_r3p34t1ng_k3y}` |
| A5 ⭐ | `A5_rsa_challenge.txt` | RSA e=3 cube root (`gmpy2.iroot`) | `H4U{rsa_sm4ll_3xp0n3nt}` |

Dependencies: `pycryptodome 3.23.0`, `gmpy2 2.1.5`

### ServerB — Steganography (`/srv/public/uploads/`)

| ID | File | Technique | Flag |
|----|------|-----------|------|
| B1 | `B1_oficina_novacorp.png` | EXIF `Artist` field | `H4U{3x1f_m3t4d4t4_h1dd3n}` |
| B2 | `B2_network_diagram.png` | Data after PNG IEND chunk | `H4U{d4t4_4ft3r_1end_chunk}` |
| B3 | `B3_documento_escaneado.png` | LSB red channel | `H4U{lsb_st3g4n0gr4phy_r}` |
| B4 | `B4_novacorp_logo.png` | LSB alpha channel (RGBA) | `H4U{4lph4_ch4nn3l_h1dd3n}` |
| B5 ⭐ | `B5_camara_seguridad.jpg` | Steghide JPEG (pass: `novacorp`) | `H4U{st3gh1d3_p4ssw0rd_cr4ck}` |

Dependencies: `exiftool`, `steghide`, `python3-pil`

!!! note "B5 extracted filename"
    `steghide extract -sf B5_camara_seguridad.jpg -p novacorp` writes the flag to `b5flag.txt` (name embedded in the JPEG).

### ServerC — Advanced Mix (`/home/devops/retos/`)

!!! danger "Gated access — requires A5 + B5 flags"

| ID | File(s) | Technique | Flag |
|----|---------|-----------|------|
| C1 | `C1_backup_tapes.jpg` | EXIF hint → steghide → ZIP | `H4U{mult1l4y3r_st3g0_4es}` |
| C2 | `C2_backup_log.b64` | Onion: `b64(bz2(b64(gz(flag))))` | `H4U{0n10n_l4y3rs_st3g0}` |
| C3 | `C3_api_token.txt` + `C3_verificador.py` | SHA-1 length extension | `H4U{l3ngth_3xt3ns10n_sh4}` |
| C4 🏆 | `C4_ecdsa_signatures.txt` + `C4_verificador.py` | ECDSA nonce reuse → secp256k1 key | `H4U{3cc_n0nc3_r3us3_pwn3d}` |

Dependencies: `piexif`, `pillow`, `steghide`, `hlextend` (from GitHub), Python stdlib (`hashlib`, `bz2`, `gzip`)

!!! warning "Known issues — verified 2026-05-13"
    **C2:** `bzip2` binary not installed on ServerC. Use Python3 `import bz2`.
    Skip comment lines (`#`) at top of file before base64-decoding:
    ```python
    lines = [l for l in raw.splitlines() if not l.startswith('#')]
    data = ''.join(lines)
    ```

    **C3:** `hlextend v0.2` — `sha.extend()` returns `bytes` (not a tuple).
    Get MAC with `sha.hexdigest()` after the call. See `C3_pista.txt` on ServerC.

---

## Complete Flag List

| ID | Difficulty | Flag | Module |
|----|-----------|------|--------|
| A1 | Easy | `H4U{r0t_c1ph3r_br0k3n}` | Cryptography |
| A2 | Easy–Medium | `H4U{4es_3cb_bl0ck_4tt4ck}` | Cryptography |
| A3 | Medium | `H4U{v1g3n3r3_k4s1sk1_4tt4ck}` | Cryptography |
| A4 | Medium | `H4U{x0r_r3p34t1ng_k3y}` | Cryptography |
| A5 | Medium–Hard | `H4U{rsa_sm4ll_3xp0n3nt}` | Cryptography |
| B1 | Easy | `H4U{3x1f_m3t4d4t4_h1dd3n}` | Steganography |
| B2 | Easy–Medium | `H4U{d4t4_4ft3r_1end_chunk}` | Steganography |
| B3 | Medium | `H4U{lsb_st3g4n0gr4phy_r}` | Steganography |
| B4 | Medium | `H4U{4lph4_ch4nn3l_h1dd3n}` | Steganography |
| B5 | Medium | `H4U{st3gh1d3_p4ssw0rd_cr4ck}` | Steganography |
| C1 | Hard | `H4U{mult1l4y3r_st3g0_4es}` | Advanced Mix |
| C2 | Hard | `H4U{0n10n_l4y3rs_st3g0}` | Advanced Mix |
| C3 | Hard | `H4U{l3ngth_3xt3ns10n_sh4}` | Advanced Mix |
| C4 | Hard | `H4U{3cc_n0nc3_r3us3_pwn3d}` | Advanced Mix |

---

## Lab Startup Checklist

1. Start nodes in order: pfSense → VyOS → ServerA → ServerB → ServerC → Defender
2. Verify VyOS routing: `show ip route` (expect 10.10.1–4.0/24 connected)
3. Ensure the EVE-NG host bridge for Zone-C is active
   (persistent via udev `99-lab4-bridges.rules`; required for direct SSH to ServerC):
   ```bash
   ip addr show vnet0_5   # Should show 10.10.3.253/24
   # If missing:
   ip addr add 10.10.3.253/24 dev vnet0_5
   ```
4. Confirm SSH access to all server nodes
5. Verify challenge files on each server
6. Verify Python deps: `python3 -c "from Crypto.Cipher import AES; import gmpy2; print('OK')"`

---

## Lab Reset

Revert each server to its EVE-NG snapshot, or re-deploy challenges from the repo:

```bash
bash src/eve-ng/configs/nodes/Lab4/serverA/deploy.sh
bash src/eve-ng/configs/nodes/Lab4/serverB/deploy.sh
bash src/eve-ng/configs/nodes/Lab4/serverC/deploy.sh
```

Repository: [`src/eve-ng/configs/nodes/Lab4/`](https://github.com/TheEgea/TFG/tree/main/src/eve-ng/configs/nodes/Lab4)
