#!/usr/bin/env python3
"""C2 - Onion layers: b64 -> bz2 -> b64 -> gz -> flag (Dificil)"""
import gzip, bz2, base64, os

FLAG = "H4U{0n10n_l4y3rs_st3g0}"
os.makedirs("challenges", exist_ok=True)

# Build from inside out
layer0 = FLAG.encode()                      # raw flag
layer1 = gzip.compress(layer0)              # gzip
layer2 = base64.b64encode(layer1)           # base64
layer3 = bz2.compress(layer2)              # bzip2
layer4 = base64.b64encode(layer3)          # base64 again

out_path = "challenges/C2_backup_log.b64"
with open(out_path, "wb") as f:
    f.write(layer4)

# Add a header comment to make it look like a log
with open(out_path, "rb") as f:
    content = f.read()
header = b"# NovaCorp Backup Log - Compressed Archive\n# Format: base64(bzip2(base64(gzip(data))))\n"
with open(out_path, "wb") as f:
    f.write(header + content)

# Verify
with open(out_path, "rb") as f:
    data = f.read()
data = [l for l in data.split(b"\n") if not l.startswith(b"#")]
data = b"".join(data)
r1 = base64.b64decode(data)
r2 = bz2.decompress(r1)
r3 = base64.b64decode(r2)
r4 = gzip.decompress(r3)
assert r4.decode() == FLAG, f"Verify failed: {r4}"

size = os.path.getsize(out_path)
print(f"[OK] C2_backup_log.b64 ({size} bytes)")
print(f"     Layers: b64 -> bz2 -> b64 -> gz -> flag")
print(f"     Header hint: Format: base64(bzip2(base64(gzip(data))))")
print(f"     Flag: {FLAG}")
print(f"     Solucion:")
print(f"       import gzip,bz2,base64")
print(f"       d=open('C2_backup_log.b64','rb').read()")
print(f"       d=[l for l in d.split(b'\\n') if not l.startswith(b'#')]")
print(f"       print(gzip.decompress(base64.b64decode(bz2.decompress(base64.b64decode(b''.join(d))))))")
