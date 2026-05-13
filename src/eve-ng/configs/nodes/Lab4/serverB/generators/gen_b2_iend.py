#!/usr/bin/env python3
"""B2 - Data appended after PNG IEND chunk"""
from PIL import Image
import os, struct, zlib

FLAG = "H4U{d4t4_4ft3r_1end_chunk}"

# Create image - looks like a network diagram screenshot
img = Image.new("RGB", (640, 480), (240, 240, 240))
pixels = img.load()

# Draw some fake network diagram elements
for y in range(480):
    for x in range(640):
        if 50 < x < 200 and 100 < y < 180:
            pixels[x,y] = (200, 220, 255)  # box 1
        elif 440 < x < 590 and 100 < y < 180:
            pixels[x,y] = (200, 255, 200)  # box 2
        elif 200 <= x <= 440 and 139 < y < 141:
            pixels[x,y] = (80, 80, 80)     # line
        elif 50 < x < 200 and 280 < y < 360:
            pixels[x,y] = (255, 220, 200)  # box 3
        elif 125 <= x <= 127 and 180 <= y <= 280:
            pixels[x,y] = (80, 80, 80)     # vertical line

os.makedirs("challenges", exist_ok=True)
tmp_path = "challenges/B2_network_diagram.png"
img.save(tmp_path)

# Read the PNG and append data after IEND
with open(tmp_path, "rb") as f:
    png_data = f.read()

# Verify IEND is at the end
assert png_data[-8:-4] == b"IEND", f"IEND not found, last 16: {png_data[-16:].hex()}"

# Append flag as a comment after IEND
hidden = b"\n# NovaCorp Internal Network Topology v2.1\n"
hidden += b"# EXFIL LOG: " + FLAG.encode() + b"\n"
hidden += b"# Timestamp: 2026-04-10T03:47:22Z\n"

with open(tmp_path, "wb") as f:
    f.write(png_data + hidden)

size = os.path.getsize(tmp_path)
print(f"[OK] B2_network_diagram.png generado ({size} bytes)")
print(f"     Flag oculta tras IEND: {FLAG}")
print(f"     Solucion: strings B2_network_diagram.png | tail -5")
print(f"              o: python3 -c \"d=open('B2_network_diagram.png','rb').read(); print(d[d.rfind(b'IEND')+8:].decode())\"")
