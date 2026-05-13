#!/usr/bin/env python3
"""C4 ECDSA Validator"""
import hashlib, sys

p  = 115792089237316195423570985008687907853269984665640564039457584007908834671663
n  = 115792089237316195423570985008687907852837564279074904382605163141518161494337
Gx = 55066263022277343669578718895168534326250603453777594175500187360389116729240
Gy = 32670510020758816978083085130507043184471273380659243275938904335757337482424
Qx = 26117204008591453261908182406124442183404681077063606199667251352844421764429
Qy = 47762399671551349948754012503205493589048408988426804198529512505447727012531
FLAG = "H4U{3cc_n0nc3_r3us3_pwn3d}"
CHALLENGE = b"NOVACORP_C2_IDENTITY_VERIFICATION"

def modinv(a, m):
    def egcd(a, b):
        if a==0: return b,0,1
        g,x,y = egcd(b%a,a); return g,y-(b//a)*x,x
    return egcd(a%m, m)[1]%m

def point_add(P, Q, p=p, a=0):
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
    print(f"FLAG: {FLAG}")
else:
    print("Firma invalida. Revisa tu calculo de d.")
