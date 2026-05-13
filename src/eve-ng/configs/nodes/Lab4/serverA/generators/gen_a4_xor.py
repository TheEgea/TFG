#!/usr/bin/env python3
"""
Generador A4 — XOR clave repetida + crib dragging (Media)
Produce: a4_mensaje_xor.hex + a4_pista.txt
Flag: H4U{x0r_r3p34t1ng_k3y}
Clave XOR: "nexus" (5 bytes)
"""

import os

KEY = b"nexus"
FLAG = "H4U{x0r_r3p34t1ng_k3y}"

def xor_encrypt(data: bytes, key: bytes) -> bytes:
    return bytes(b ^ key[i % len(key)] for i, b in enumerate(data))

# Mensaje en inglés (para que el crib dragging funcione con frecuencias inglesas)
PLAINTEXT = (
    "ENCRYPTED CHANNEL MESSAGE — OPERATION CIPHERSTRIKE\n"
    "FROM: Agent Nexus TO: Command Alpha\n"
    "DATE: 2026-04-14 04:17:32 UTC\n\n"
    "Phase one of the operation has been completed successfully. "
    "The target database was accessed and all relevant documents copied. "
    "No alarms were triggered during the initial penetration phase. "
    "The encryption keys used for the exfiltration were derived from the "
    "following verification token which must be reported to command: "
    f"{FLAG} "
    "Awaiting further instructions for phase two of the operation. "
    "Recommend immediate extraction protocol activation. "
    "Network monitoring systems show increased activity suggesting detection risk. "
    "Burn this channel after acknowledgement received from command. END"
)

ct = xor_encrypt(PLAINTEXT.encode('utf-8'), KEY)
ct_hex = ct.hex()

# Pista: el mensaje empieza con "ENCRYPTED" — crib conocido
PISTA = """=== PISTA ANÁLISIS — a4_mensaje_xor.hex ===

El mensaje fue cifrado con XOR de clave repetida.
El sistema de mensajería siempre empieza los mensajes con: "ENCRYPTED"

Para resolver:
  1. Estima la longitud de la clave (usa IC o coincidencias en el hexdump)
  2. Usa "crib dragging": XOR el crib conocido contra el ciphertext
     para recuperar fragmentos de la clave
  3. Reconstruye la clave completa
  4. Descifra el mensaje completo

Herramientas útiles:
  python3 -c "ct=bytes.fromhex(open('a4_mensaje_xor.hex').read().strip()); print(ct[:9])"
  # El resultado XOR con b'ENCRYPTED' da los primeros 9 bytes de clave (repetida)

Longitud del ciphertext: {length} bytes
""".format(length=len(ct))

# Archivo hex del ciphertext (limpio, sin espacios)
with open("a4_mensaje_xor.hex", "w") as f:
    f.write(ct_hex + "\n")

with open("a4_pista.txt", "w") as f:
    f.write(PISTA)

print(f"[OK] a4_mensaje_xor.hex generado ({len(ct)} bytes)")
print(f"[OK] a4_pista.txt generado")
print(f"     Clave XOR: {KEY}")
print(f"     Flag: {FLAG}")
print()
print("SOLUCIÓN ESPERADA DEL ALUMNO:")
print("  1. Leer pista: crib 'ENCRYPTED' (9 bytes)")
print(f"  2. XOR crib: {xor_encrypt(b'ENCRYPTED', KEY[:9%5] + KEY * (9//5) )[:5]} → primeros 5 bytes de clave = b'nexus'")
print("  3. Extender clave y descifrar todo el mensaje")
print(f"     Flag: {FLAG}")

# Verificar
decrypted = xor_encrypt(ct, KEY).decode('utf-8')
assert FLAG in decrypted, "ERROR: Flag no en plaintext"
assert decrypted.startswith("ENCRYPTED"), "ERROR: No empieza con ENCRYPTED"
print(f"[OK] Verificación OK — mensaje empieza con: {decrypted[:15]!r}")
