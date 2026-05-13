#!/usr/bin/env python3
"""C4 - ECDSA nonce reuse (secp256k1) - FLAG MAESTRA
Flag: H4U{3cc_n0nc3_r3us3_pwn3d}
"""
import hashlib, os

FLAG = "H4U{3cc_n0nc3_r3us3_pwn3d}"
os.makedirs("challenges", exist_ok=True)

# secp256k1 parameters
p  = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F
a  = 0
b  = 7
Gx = 0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798
Gy = 0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8
n  = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141

def modinv(a, m):
    g, x, _ = extended_gcd(a % m, m)
    assert g == 1
    return x % m

def extended_gcd(a, b):
    if a == 0: return b, 0, 1
    g, x, y = extended_gcd(b % a, a)
    return g, y - (b // a) * x, x

def point_add(P, Q):
    if P is None: return Q
    if Q is None: return P
    if P[0] == Q[0]:
        if P[1] != Q[1]: return None
        m = (3 * P[0]**2 + a) * modinv(2 * P[1], p) % p
    else:
        m = (Q[1] - P[1]) * modinv(Q[0] - P[0], p) % p
    x = (m**2 - P[0] - Q[0]) % p
    y = (m * (P[0] - x) - P[1]) % p
    return (x, y)

def scalar_mult(k, P):
    R = None
    Q = P
    while k:
        if k & 1: R = point_add(R, Q)
        Q = point_add(Q, Q)
        k >>= 1
    return R

G = (Gx, Gy)

# Fixed private key and nonce (attacker's mistake: reused k)
d = 0x4b0a4f8e2c3d7a1b9e5f6c2d8a3b7e1f4c9d2a5b8e3f6c1d4a7b2e5f8c3d6a1b  # private key
k = 0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b  # SAME k used twice!

# Two messages
msg1 = b"Login request 1: admin@novacorp.com 2026-04-10T03:00:00Z"
msg2 = b"Login request 2: system@novacorp.com 2026-04-10T03:01:47Z"

h1 = int(hashlib.sha256(msg1).hexdigest(), 16)
h2 = int(hashlib.sha256(msg2).hexdigest(), 16)

# Compute signatures (r, s) = (kG.x mod n, k^-1*(h + r*d) mod n)
R = scalar_mult(k, G)
r = R[0] % n
k_inv = modinv(k, n)
s1 = k_inv * (h1 + r * d) % n
s2 = k_inv * (h2 + r * d) % n

# Public key
Q = scalar_mult(d, G)

# Verify: s = k^-1*(h + r*d) mod n => k = (h + r*d) * s^-1 mod n
# Nonce recovery: from two sigs with same k,r:
# s1 = k^-1*(h1 + r*d), s2 = k^-1*(h2 + r*d)
# s1-s2 = k^-1*(h1-h2) => k = (h1-h2)*(s1-s2)^-1 mod n
k_recovered = (h1 - h2) * modinv(s1 - s2, n) % n
d_recovered = (s1 * k_recovered - h1) * modinv(r, n) % n
assert k_recovered == k, "k recovery failed"
assert d_recovered == d, "d recovery failed"

# Challenge: sign this message with d to get flag
challenge_msg = b"NOVACORP_C2_IDENTITY_VERIFICATION"
h_ch = int(hashlib.sha256(challenge_msg).hexdigest(), 16)
# Use different k for challenge signature (derived deterministically)
k_ch = int(hashlib.sha256(d.to_bytes(32,'big') + challenge_msg).hexdigest(), 16) % n
R_ch = scalar_mult(k_ch, G)
r_ch = R_ch[0] % n
s_ch = modinv(k_ch, n) * (h_ch + r_ch * d) % n

challenge_txt = f"""=== ARCHIVO RECUPERADO: /root/attacker_data/C4_ecdsa_signatures.txt ===
=== Sistema de autenticacion ECDSA del servidor C2 del atacante ===

El servidor C2 usa ECDSA (secp256k1) para verificar la identidad del atacante.
Se han capturado dos firmas del trafico de red. El atacante cometio un error critico:
uso el mismo nonce k para ambas firmas.

=== PARAMETROS DE CURVA (secp256k1) ===
p = {p}
n = {n}
Gx = {Gx}
Gy = {Gy}

=== CLAVE PUBLICA DEL ATACANTE ===
Qx = {Q[0]}
Qy = {Q[1]}

=== FIRMA 1 ===
msg1 = {msg1.decode()}
h1   = {h1}  (SHA256 del mensaje)
r    = {r}
s1   = {s1}

=== FIRMA 2 ===
msg2 = {msg2.decode()}
h2   = {h2}  (SHA256 del mensaje)
r    = {r}    (MISMO r que firma 1 -> mismo k!)
s2   = {s2}

=== NOTA DEL ANALISTA ===
"r es identico en ambas firmas. Esto significa que se uso el mismo nonce k.
 Con dos firmas y el mismo k:
   k = (h1 - h2) * modinv(s1 - s2, n) mod n
   d = (s1*k - h1) * modinv(r, n) mod n"

=== RETO ===
Recupera la clave privada d y firmala con el mensaje:
  '{challenge_msg.decode()}'

Ejecuta: python3 C4_verificador.py <r_hex> <s_hex>
"""

with open("challenges/C4_ecdsa_signatures.txt", "w") as f:
    f.write(challenge_txt)

# Validator
validator = f'''#!/usr/bin/env python3
"""C4 ECDSA Validator"""
import hashlib, sys

p  = {p}
n  = {n}
Gx = {Gx}
Gy = {Gy}
Qx = {Q[0]}
Qy = {Q[1]}
FLAG = "{FLAG}"
CHALLENGE = b"{challenge_msg.decode()}"

def modinv(a, m):
    def egcd(a, b):
        if a==0: return b,0,1
        g,x,y = egcd(b%a,a); return g,y-(b//a)*x,x
    return egcd(a%m, m)[1]%m

def point_add(P, Q, p=p, a={a}):
    if P is None: return Q
    if Q is None: return P
    if P[0]==Q[0]:
        if P[1]!=Q[1]: return None
        m=(3*P[0]**2+a)*modinv(2*P[1],p)%p
    else: m=(Q[1]-P[1])*modinv(Q[0]-P[0],p)%p
    x=(m**2-P[0]-Q[0])%p; y=(m*(P[0]-x)-P[1])%p
    return (x,y)

def scalar_mult(k, P):
    R=None; Q=P
    while k:
        if k&1: R=point_add(R,Q)
        Q=point_add(Q,Q); k>>=1
    return R

G = (Gx, Gy)
Q_pub = (Qx, Qy)

def verify_ecdsa(msg, r, s):
    h = int(hashlib.sha256(msg).hexdigest(), 16)
    w = modinv(s, n)
    u1 = h*w%n; u2 = r*w%n
    P = point_add(scalar_mult(u1,G), scalar_mult(u2,Q_pub))
    return P is not None and P[0]%n == r

if len(sys.argv) != 3:
    print("Uso: python3 C4_verificador.py <r_hex> <s_hex>")
    sys.exit(1)

try:
    r_in = int(sys.argv[1], 16)
    s_in = int(sys.argv[2], 16)
except:
    print("ERROR: r y s deben ser enteros hexadecimales")
    sys.exit(1)

if verify_ecdsa(CHALLENGE, r_in, s_in):
    print(f"FIRMA VALIDA! Has recuperado la clave privada del atacante.")
    print(f"FLAG: {{FLAG}}")
else:
    print("Firma invalida. Revisa tu calculo de d.")
'''

with open("challenges/C4_verificador.py", "w") as f:
    f.write(validator)

print(f"[OK] C4_ecdsa_signatures.txt + C4_verificador.py")
print(f"     r (same)={hex(r)[:16]}...")
print(f"     s1={hex(s1)[:16]}... s2={hex(s2)[:16]}...")
print(f"     k_recovered OK: {k_recovered==k}")
print(f"     d_recovered OK: {d_recovered==d}")
print(f"     Challenge sig: r={hex(r_ch)[:16]}... s={hex(s_ch)[:16]}...")
print(f"     Flag: {FLAG}")
