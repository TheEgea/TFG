#!/usr/bin/env python3
"""
Generador A1 — ROT13 (Fácil)
Produce: a1_mensaje_interceptado.txt
Flag: H4U{r0t_c1ph3r_br0k3n}
"""

FLAG = "H4U{r0t_c1ph3r_br0k3n}"

def rot13(text):
    result = []
    for c in text:
        if c.isalpha():
            base = ord('A') if c.isupper() else ord('a')
            result.append(chr((ord(c) - base + 13) % 26 + base))
        else:
            result.append(c)
    return ''.join(result)

# Plaintext del mensaje del atacante
plaintext = f"""COMUNICADO INTERNO — OPERACION CIPHERSTRIKE
CLASIFICADO: ALTO SECRETO

De: Agente Nexus
Para: Contacto Zeta

Mision completada. He conseguido acceso a los sistemas de NovaCorp.
La documentacion confidencial ha sido copiada y exfiltrada con exito.

Adjunto la clave de verificacion para confirmar la exfiltracion:
CLAVE: {FLAG}

El servidor de staging esta listo para recibir el siguiente paquete.
Esperando confirmacion antes de proceder con la fase dos.

Destruir este mensaje tras leer.
— Nexus
"""

ciphertext = rot13(plaintext)

output = f"""=== ARCHIVO RECUPERADO: /tmp/.cache_sync ===
=== TIMESTAMP: 2026-04-17 03:42:18 UTC ===
=== HASH MD5: a3f8c2d1e9b4f7a0 ===

{ciphertext}

--- FIN DEL ARCHIVO ---
"""

with open("a1_mensaje_interceptado.txt", "w") as f:
    f.write(output)

print(f"[OK] a1_mensaje_interceptado.txt generado")
print(f"     Plaintext contiene: {FLAG}")
print(f"     Ciphertext: {rot13(FLAG)}")
print(f"     Técnica: ROT13 — descifrar con: tr 'A-Za-z' 'N-ZA-Mn-za-m'")
