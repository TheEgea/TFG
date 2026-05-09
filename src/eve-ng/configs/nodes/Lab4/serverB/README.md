# ServerB -- Lab4 Steganography Module

## Credentials
- User: `sysop` / Password: `S3cure24!`
- SSH: `ssh sysop@10.10.2.10`

## Zone
Zone-B -- 10.10.2.10/24, gateway 10.10.2.1 (VyOS eth2)

## Challenges (/srv/public/uploads/)

| File | Challenge | Technique |
|------|-----------|-----------|
| B1_oficina_novacorp.png | B1 | EXIF Artist field |
| B2_network_diagram.png | B2 | Data after PNG IEND chunk |
| B3_documento_escaneado.png | B3 | LSB red channel |
| B4_novacorp_logo.png | B4 | LSB alpha channel (RGBA) |
| B5_camara_seguridad.jpg | B5 KEY | Steghide JPEG (pass=novacorp) |

## Dependencies
```bash
apt install exiftool steghide python3-pil
```

## Flags
- B1: `H4U{3x1f_m3t4d4t4_h1dd3n}`
- B2: `H4U{d4t4_4ft3r_1end_chunk}`
- B3: `H4U{lsb_st3g4n0gr4phy_r}`
- B4: `H4U{4lph4_ch4nn3l_h1dd3n}`
- B5: `H4U{st3gh1d3_p4ssw0rd_cr4ck}` -- used to derive ServerC password
