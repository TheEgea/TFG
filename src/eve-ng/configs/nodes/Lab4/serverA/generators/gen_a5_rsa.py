#!/usr/bin/env python3
"""
Generador A5 — RSA e=3 small exponent (cube root attack) (Media)
Produce: a5_rsa_challenge.txt
Flag: H4U{rsa_sm4ll_3xp0n3nt}

Vulnerabilidad: e=3 y m^3 < n → c = m^3 exactamente (sin reducción modular)
Ataque: flag = cbrt(c) usando gmpy2.iroot(c, 3)
"""

FLAG = "H4U{rsa_sm4ll_3xp0n3nt}"

# Convertir flag a entero
m = int.from_bytes(FLAG.encode('utf-8'), 'big')
m3 = m ** 3

# n debe ser > m^3 para que el ataque funcione sin Coppersmith
# Primos fijos precomputados (512 bits cada uno)
p = 13407807929942597099574024998205846127479365820592393377723561443721764030073546976801874298166903427690031858186486050853753882811946569946433649006084171
q = 13407807929942597099574024998205846127479365820592393377723561443721764030073546976801874298166903427690031858186486050853753882811946569946433649006084177
n = p * q
e = 3
c = pow(m, e, n)

assert m3 == c, f"Error: m^3={m3} != c={c}"

output = f"""=== ARCHIVO RECUPERADO: /home/admin/Documents/a5_rsa_challenge.txt ===
=== SISTEMA: Token de autenticación RSA del servidor de control ===

El servidor de C2 del atacante usa RSA para verificar tokens de identidad.
Hemos capturado el tráfico y obtenido la clave pública y el token cifrado.

=== CLAVE PÚBLICA ===
n = {n}
e = {e}

=== TOKEN CAPTURADO (ciphertext) ===
c = {c}

=== ANÁLISIS DEL EQUIPO FORENSE ===
El exponente público e=3 es inusualmente pequeño.
Nota del analista:
  "Si el plaintext es corto y e=3, puede que c = m^3 sin reducción modular.
   En ese caso, la raíz cúbica exacta de c da directamente el plaintext."

=== TAREA ===
Recupera el token original (m) y conviértelo de entero a ASCII para obtener la flag.

--- FIN DEL ARCHIVO ---
"""

with open("a5_rsa_challenge.txt", "w") as f:
    f.write(output)

print(f"[OK] a5_rsa_challenge.txt generado")
print(f"     n bits: {n.bit_length()}")
print(f"     m^3 < n: {m3 < n}")
print(f"     Flag: {FLAG}")
print()
print("SOLUCIÓN:")
print("  python3 -c \"")
print("  import gmpy2")
print(f"  c = {c}")
print("  m, exact = gmpy2.iroot(c, 3)")
print("  print(bytes.fromhex(hex(int(m))[2:]).decode())\"")
