#!/usr/bin/env python3
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
