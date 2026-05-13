#!/usr/bin/env python3
"""
Generador A2 — AES-ECB Block Repetition (Fácil-Media)
Produce: a2_oracle.py  +  a2_admin_cipher.b64
Flag: H4U{4es_3cb_bl0ck_4tt4ck}

El alumno usa oracle.py para hacer un ataque chosen-plaintext:
  - La API cifra: prefix_secret + input_usuario + suffix_data
  - prefix_secret tiene longitud conocida (16 bytes = 1 bloque AES)
  - Alineando el input, el alumno puede extraer el flag bloque a bloque

Pero en el escenario de lab simplificamos: el alumno encuentra admin_cipher.b64
que tiene un bloque repetido que revela el flag (ECB penguin attack).
"""
import os, base64
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad

# Clave fija (el alumno no la conoce, está en el servidor)
KEY = b'NovaCorp2026Key!'  # 16 bytes

FLAG = "H4U{4es_3cb_bl0ck_4tt4ck}"

# ── Archivo 1: oracle.py ──────────────────────────────────────────────────────
ORACLE_SCRIPT = '''#!/usr/bin/env python3
"""
API de cifrado vulnerable — NovaCorp Internal Encryption Service
VULNERABILIDAD: Usa AES en modo ECB con un prefijo conocido
"""
import sys, base64
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad

KEY = b'NovaCorp2026Key!'  # 16 bytes — expuesto por error en este script

def encrypt(user_input: str) -> str:
    """Cifra: b'user_data::' + user_input.encode() + b'::role=guest'"""
    prefix = b'user_data::'      # 11 bytes
    suffix = b'::role=guest'     # 12 bytes
    plaintext = prefix + user_input.encode('utf-8') + suffix
    cipher = AES.new(KEY, AES.MODE_ECB)
    ct = cipher.encrypt(pad(plaintext, 16))
    return base64.b64encode(ct).decode()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python3 a2_oracle.py <texto_a_cifrar>")
        print("Ejemplo: python3 a2_oracle.py AAAAAAAAAAAAAAAA")
        sys.exit(1)
    result = encrypt(sys.argv[1])
    print(f"Ciphertext (base64): {result}")
    print(f"Bloques (hex):")
    import base64 as b64
    ct_bytes = b64.b64decode(result)
    for i in range(0, len(ct_bytes), 16):
        print(f"  Bloque {i//16}: {ct_bytes[i:i+16].hex()}")
'''

# ── Archivo 2: admin_cipher.b64 ───────────────────────────────────────────────
# Mensaje del admin: contiene el flag repetido para que los bloques ECB coincidan
# Estructura: "ADMIN_MSG::" + flag + "::" + flag + "::VERIFIED"
# El flag repetido hace que los bloques sean idénticos → penguin attack visible

admin_plaintext = (b"ADMIN_MSG::" + FLAG.encode() + b"::" + FLAG.encode() + b"::VERIFIED")
cipher = AES.new(KEY, AES.MODE_ECB)
admin_ct = cipher.encrypt(pad(admin_plaintext, 16))
admin_b64 = base64.b64encode(admin_ct).decode()

# ── Archivo 3: nota_analisis.txt ──────────────────────────────────────────────
# Pista narrativa que encontrará el alumno
NOTA = f"""=== ARCHIVO: /home/admin/Documents/nota_analisis.txt ===

ANALISIS DE SEGURIDAD — SISTEMA DE CIFRADO INTERNO
Fecha: 2026-04-15

He encontrado un problema CRITICO en el sistema de cifrado de NovaCorp.
El servicio usa AES-ECB sin vector de inicialización.

Script vulnerable: /home/admin/Documents/a2_oracle.py
Mensaje cifrado del administrador: /home/admin/Documents/a2_admin_cipher.b64

PISTA: En ECB, bloques de plaintext iguales producen bloques de ciphertext iguales.
Si el mensaje admin_cipher tiene bloques repetidos... algo está oculto dos veces.

Bloques del admin_cipher (referencia):
"""

print("[Generando archivos A2...]")

# Mostrar los bloques para la nota
ct_bytes = base64.b64decode(admin_b64)
blocks_info = []
for i in range(0, len(ct_bytes), 16):
    block = ct_bytes[i:i+16]
    blocks_info.append(f"  Bloque {i//16:2d}: {block.hex()}")
nota_full = NOTA + "\n".join(blocks_info)

# Escribir archivos
with open("a2_oracle.py", "w") as f:
    f.write(ORACLE_SCRIPT)

with open("a2_admin_cipher.b64", "w") as f:
    f.write(admin_b64 + "\n")

with open("a2_nota_analisis.txt", "w") as f:
    f.write(nota_full)

print(f"[OK] a2_oracle.py generado (KEY expuesta intencionalmente en el script)")
print(f"[OK] a2_admin_cipher.b64 generado")
print(f"[OK] a2_nota_analisis.txt generado")
print(f"     Admin plaintext: {admin_plaintext}")
print(f"     Bloques ciphertext: {len(ct_bytes)//16}")
print()
print("SOLUCIÓN ESPERADA DEL ALUMNO:")
print("  1. Leer oracle.py → encontrar KEY expuesta")
print("  2. Descifrar admin_cipher.b64 con la KEY")
print("  3. Ver plaintext → extraer flag")
print(f"     Flag: {FLAG}")

# Verificación
cipher2 = AES.new(KEY, AES.MODE_ECB)
from Crypto.Util.Padding import unpad
decrypted = unpad(cipher2.decrypt(ct_bytes), 16).decode()
print(f"     Verificación decrypt: {decrypted}")
