# ServerC -- Lab4 Mix Hard Module

## Credentials
- User: `devops`
- Password: `fa681b59855d` (MD5(A5_flag + B5_flag)[:12])
- SSH: `ssh devops@10.10.3.10`
- CTF hint to students: `D3vOps24!` (intentionally wrong -- forces solving A5+B5 first)

## Zone
Zone-C -- 10.10.3.10/24, gateway 10.10.3.1 (VyOS eth3)

## Challenges (/home/devops/retos/)

| File | Challenge | Technique |
|------|-----------|-----------|
| C1_backup_tapes.jpg | C1 | EXIF hint -> steghide (pass=b4ckup2026) -> ZIP |
| C2_backup_log.b64 | C2 | Onion: b64(bz2(b64(gz(flag)))) |
| C3_api_token.txt + C3_verificador.py | C3 | SHA1 Length Extension Attack |
| C4_ecdsa_signatures.txt + C4_verificador.py | C4 MASTER | ECDSA nonce reuse -> recover secp256k1 private key |

## Dependencies
```bash
# hlextend not on PyPI -- install from GitHub:
curl -sL https://raw.githubusercontent.com/stephenbradshaw/hlextend/master/hlextend.py      -o ~/.local/lib/python3.12/site-packages/hlextend.py
pip3 install piexif pillow --break-system-packages
apt install steghide
```

## Technical notes
- C1: steghide strips EXIF on embed -- use piexif.insert() afterwards
- C4 nonce recovery: k=(h1-h2)*modinv(s1-s2,n)%n  then  d=(s1*k-h1)*modinv(r,n)%n

## Flags
- C1: `H4U{mult1l4y3r_st3g0_4es}`
- C2: `H4U{0n10n_l4y3rs_st3g0}`
- C3: `H4U{l3ngth_3xt3ns10n_sh4}`
- C4: `H4U{3cc_n0nc3_r3us3_pwn3d}` -- MASTER FLAG
