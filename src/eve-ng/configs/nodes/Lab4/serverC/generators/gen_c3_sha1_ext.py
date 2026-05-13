#!/usr/bin/env python3
"""C3 - SHA1 Length Extension Attack (Dificil)
Flag: H4U{l3ngth_3xt3ns10n_sh4}
Secret: 16 bytes fijo
MAC = sha1(secret + message)
Estudiante forja message + padding + '&role=admin' con MAC valido
"""
import hashlib, struct, os

FLAG = "H4U{l3ngth_3xt3ns10n_sh4}"
SECRET = b'\x4e\x6f\x76\x61\x43\x6f\x72\x70\x53\x65\x63\x72\x65\x74\x31\x36'  # 16 bytes fijo
SECRET_LEN = 16

os.makedirs("challenges", exist_ok=True)

# Original message and MAC
message = b"user=analyst&access=readonly&expires=2026-12-31"
mac = hashlib.sha1(SECRET + message).hexdigest()

# --- SHA1 padding helper (para el verificador y pista) ---
def sha1_pad(msg_len):
    """Returns the padding that SHA1 adds to a message of msg_len bytes"""
    bit_len = msg_len * 8
    padding = b'\x80'
    padding += b'\x00' * ((55 - msg_len) % 64)
    padding += struct.pack('>Q', bit_len)
    return padding

# The forged message (what we add)
extension = b"&access=admin"

# Compute forged MAC using SHA1 state continuation
# SHA1 internal state after processing (SECRET + message + padding)
# We need to know the SHA1 state from the original mac
def sha1_from_state(state_hex, data, total_processed_len):
    """Continue SHA1 from a known state"""
    # Parse state from hex digest
    state = [int(state_hex[i:i+8], 16) for i in range(0, 40, 8)]
    h0, h1, h2, h3, h4 = state

    # Pure Python SHA1 to continue from state
    import struct

    def _left_rotate(n, b):
        return ((n << b) | (n >> (32 - b))) & 0xffffffff

    def _sha1_chunk(chunk, h0, h1, h2, h3, h4):
        w = list(struct.unpack('>16I', chunk))
        for i in range(16, 80):
            w.append(_left_rotate(w[i-3] ^ w[i-8] ^ w[i-14] ^ w[i-16], 1))
        a, b, c, d, e = h0, h1, h2, h3, h4
        for i in range(80):
            if i < 20:
                f = (b & c) | ((~b) & d); k = 0x5A827999
            elif i < 40:
                f = b ^ c ^ d; k = 0x6ED9EBA1
            elif i < 60:
                f = (b & c) | (b & d) | (c & d); k = 0x8F1BBCDC
            else:
                f = b ^ c ^ d; k = 0xCA62C1D6
            temp = (_left_rotate(a, 5) + f + e + k + w[i]) & 0xffffffff
            e, d, c, b, a = d, c, _left_rotate(b, 30), a, temp
        return (h0+a)&0xffffffff, (h1+b)&0xffffffff, (h2+c)&0xffffffff, (h3+d)&0xffffffff, (h4+e)&0xffffffff

    # Pad data as SHA1 would
    msg_len = total_processed_len + len(data)
    padded = bytearray(data)
    padded.append(0x80)
    while len(padded) % 64 != 56:
        padded.append(0)
    padded += struct.pack('>Q', msg_len * 8)

    for i in range(0, len(padded), 64):
        h0, h1, h2, h3, h4 = _sha1_chunk(bytes(padded[i:i+64]), h0, h1, h2, h3, h4)

    return '%08x%08x%08x%08x%08x' % (h0, h1, h2, h3, h4)

# Total length of (SECRET + message + padding) that SHA1 processed
total_len = SECRET_LEN + len(message) + len(sha1_pad(SECRET_LEN + len(message)))
forged_mac = sha1_from_state(mac, extension, total_len)

# The forged full message (what gets sent)
padding = sha1_pad(SECRET_LEN + len(message))
forged_message = message + padding + extension

# Verify forged mac
verify_mac = hashlib.sha1(SECRET + forged_message).hexdigest()
assert forged_mac == verify_mac, f"FORGED MAC MISMATCH! {forged_mac} != {verify_mac}"

# Write challenge file
challenge_txt = f"""=== NovaCorp API Token Validator ===

El sistema de API de NovaCorp usa MACs para validar tokens.
El MAC se calcula como: SHA1(secret + message)
El secret tiene 16 bytes de longitud (desconocido).

=== TOKEN CAPTURADO ===
message = {message.decode()}
mac     = {mac}

=== OBJETIVO ===
Forja un token valido que contenga "&access=admin" al final del mensaje.
El sistema acepta cualquier mensaje cuyo MAC sea SHA1(secret + forged_message).

Pista: SHA1 es vulnerable a Length Extension Attack.
       Conoces el hash SHA1(secret + message) y len(secret)=16.
       Puedes calcular SHA1(secret + message + padding + extension) sin conocer el secret.

=== VERIFICADOR ===
Ejecuta: python3 C3_verificador.py <forged_message_hex> <forged_mac>
"""

with open("challenges/C3_api_token.txt", "w") as f:
    f.write(challenge_txt)

# Write validator
validator = f'''#!/usr/bin/env python3
"""C3 Token Validator - NovaCorp API"""
import hashlib, sys

SECRET = {SECRET}
FLAG = "{FLAG}"

def verify(message_hex, mac):
    try:
        msg = bytes.fromhex(message_hex)
    except:
        print("ERROR: message must be hex-encoded")
        return
    expected = hashlib.sha1(SECRET + msg).hexdigest()
    if expected == mac and b"&access=admin" in msg and b"access=readonly" in msg:
        print(f"TOKEN VALIDO! Flag: {{FLAG}}")
    elif expected == mac:
        print(f"MAC correcto pero falta &access=admin en el mensaje")
    else:
        print(f"MAC incorrecto. Expected: {{expected}}")

if len(sys.argv) != 3:
    print(f"Uso: python3 C3_verificador.py <message_hex> <mac_hex>")
    print(f"Ejemplo: python3 C3_verificador.py <hex_del_mensaje_forjado> <mac_forjado>")
else:
    verify(sys.argv[1], sys.argv[2])
'''

with open("challenges/C3_verificador.py", "w") as f:
    f.write(validator)

# Write hint file
hint = f"""=== PISTA C3 ===
Herramienta recomendada: hlextend (pip3 install hlextend)

import hlextend
sha = hlextend.new('sha1')
forged_msg, forged_mac = sha.extend(b'&access=admin', b'{message.decode()}', {SECRET_LEN}, '{mac}')
print(forged_msg.hex(), forged_mac)
"""
with open("challenges/C3_pista.txt", "w") as f:
    f.write(hint)

print(f"[OK] C3_api_token.txt + C3_verificador.py + C3_pista.txt")
print(f"     secret_len={SECRET_LEN}, message={message.decode()}")
print(f"     mac={mac}")
print(f"     Flag: {FLAG}")
print(f"     Forged mac (ref): {forged_mac}")
print(f"     Verified: {forged_mac == verify_mac}")
