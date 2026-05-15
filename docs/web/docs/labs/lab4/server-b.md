# LAB4 — ServerB (Steganography Module)

ServerB hosts the five steganography challenges of **Module B**.
Challenge files are in `/srv/public/uploads/`.

---

## System

| Parameter | Value |
|-----------|-------|
| Hostname | serverb |
| OS | Ubuntu Server 24.04 LTS |
| IP | 10.10.2.10/24 |
| Gateway | 10.10.2.1 (VyOS eth2) |

## Network config (`/etc/netplan/01-lab4.yaml`)

```yaml
network:
  version: 2
  ethernets:
    ens3:
      addresses:
        - 10.10.2.10/24
      routes:
        - to: default
          via: 10.10.2.1
```

## Accounts

| Account | Password | Role |
|---------|----------|------|
| sysop | `S3cure24!` | Student entry |
| root | `eve` | Console only |

## Installed tools

| Package | Purpose |
|---------|---------|
| `exiftool` | EXIF metadata (B1) |
| `steghide` | Steghide extraction (B5) |
| `binwalk` | Binary analysis (B2) |
| `python3-pil` (Pillow) | LSB channel extraction (B3, B4) |
| `python3` | Scripts |

## Challenge files (`/srv/public/uploads/`)

| File | Challenge | Technique |
|------|-----------|-----------|
| `B1_oficina_novacorp.png` | B1 | EXIF metadata |
| `B2_network_diagram.png` | B2 | Data after PNG IEND chunk |
| `B3_documento_escaneado.png` | B3 | LSB in red channel |
| `B4_novacorp_logo.png` | B4 | LSB in alpha channel (RGBA) |
| `B5_camara_seguridad.jpg` | B5 | Steghide JPEG (pass: `novacorp`) |

## Flags

| ID | Flag |
|----|------|
| B1 | `H4U{3x1f_m3t4d4t4_h1dd3n}` |
| B2 | `H4U{d4t4_4ft3r_1end_chunk}` |
| B3 | `H4U{lsb_st3g4n0gr4phy_r}` |
| B4 | `H4U{4lph4_ch4nn3l_h1dd3n}` |
| B5 | `H4U{st3gh1d3_p4ssw0rd_cr4ck}` ← **gate flag** |

!!! danger "B5 is required for ServerC access"
    The MD5 gate uses this flag concatenated with A5.

## Admin verification

```bash
ssh sysop@10.10.2.10          # S3cure24!
ls -la /srv/public/uploads/
exiftool /srv/public/uploads/B1_oficina_novacorp.png | grep -i flag
steghide extract -sf /srv/public/uploads/B5_camara_seguridad.jpg -p novacorp -f
```
