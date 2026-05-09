# ServerA -- Lab4 Cryptography Module

## Credentials
- User: `admin` / Password: `N3xaTech!`
- SSH: `ssh admin@10.10.1.10`

## Zone
Zone-A -- 10.10.1.10/24, gateway 10.10.1.1 (VyOS eth1)

## Challenges (/home/admin/mensajes/)

| File | Challenge | Technique |
|------|-----------|-----------|
| A1_mensaje_interceptado.txt | A1 | ROT13 |
| A2_oracle.py + A2_admin_cipher.b64 | A2 | AES-ECB oracle (key in script) |
| A3_documento_clasificado.txt | A3 | Vigenere + Kasiski (key=NEXATECH) |
| A4_mensaje_xor.hex | A4 | XOR repeating key (crib=ENCRYPTED, key=nexus) |
| A5_rsa_challenge.txt | A5 KEY | RSA e=3 cube root via gmpy2.iroot |

## Dependencies
```bash
pip3 install pycryptodome gmpy2 --break-system-packages
```

## Flags
- A1: `H4U{r0t_c1ph3r_br0k3n}`
- A2: `H4U{4es_3cb_bl0ck_4tt4ck}`
- A3: `H4U{v1g3n3r3_k4s1sk1_4tt4ck}`
- A4: `H4U{x0r_r3p34t1ng_k3y}`
- A5: `H4U{rsa_sm4ll_3xp0n3nt}` -- used to derive ServerC password
