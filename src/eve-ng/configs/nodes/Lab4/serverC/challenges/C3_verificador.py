#!/usr/bin/env python3
"""C3 Token Validator - NovaCorp API"""
import hashlib, sys

SECRET = b'NovaCorpSecret16'
FLAG = "H4U{l3ngth_3xt3ns10n_sh4}"

def verify(message_hex, mac):
    try:
        msg = bytes.fromhex(message_hex)
    except:
        print("ERROR: message must be hex-encoded")
        return
    expected = hashlib.sha1(SECRET + msg).hexdigest()
    if expected == mac and b"&access=admin" in msg and b"access=readonly" in msg:
        print(f"TOKEN VALIDO! Flag: {FLAG}")
    elif expected == mac:
        print(f"MAC correcto pero falta &access=admin en el mensaje")
    else:
        print(f"MAC incorrecto. Expected: {expected}")

if len(sys.argv) != 3:
    print(f"Uso: python3 C3_verificador.py <message_hex> <mac_hex>")
    print(f"Ejemplo: python3 C3_verificador.py <hex_del_mensaje_forjado> <mac_forjado>")
else:
    verify(sys.argv[1], sys.argv[2])
