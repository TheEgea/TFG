#!/usr/bin/env python3
"""B3 - LSB steganography in red channel"""
from PIL import Image
import os

FLAG = "H4U{lsb_st3g4n0gr4phy_r}"

def hide_lsb(img, message):
    """Hide message in LSB of red channel"""
    pixels = list(img.getdata())
    bits = ''.join(format(b, '08b') for b in (message + '\x00').encode('utf-8'))

    new_pixels = []
    bit_idx = 0
    for r, g, b in pixels:
        if bit_idx < len(bits):
            r = (r & 0xFE) | int(bits[bit_idx])
            bit_idx += 1
        new_pixels.append((r, g, b))

    result = Image.new("RGB", img.size)
    result.putdata(new_pixels)
    return result

# Create base image - looks like a document scan
import random
random.seed(123)
img = Image.new("RGB", (720, 540), (252, 252, 248))
pixels = img.load()

# Add some "text lines" simulation
for y in range(540):
    for x in range(720):
        if 60 < x < 660:
            line_y = y % 30
            if 18 < line_y < 22:
                darkness = random.random()
                if darkness > 0.3:
                    v = int(200 + 52*random.random())
                    pixels[x,y] = (v, v, v-2)

img_stego = hide_lsb(img, FLAG)
os.makedirs("challenges", exist_ok=True)
img_stego.save("challenges/B3_documento_escaneado.png")

size = os.path.getsize("challenges/B3_documento_escaneado.png")
print(f"[OK] B3_documento_escaneado.png ({size} bytes)")
print(f"     Flag en LSB canal rojo: {FLAG}")
print(f"     Solucion:")
print(f"       from PIL import Image")
print(f"       img = Image.open('B3_documento_escaneado.png')")
print(f"       bits = ''.join(str(p[0]&1) for p in img.getdata())")
print(f"       msg = bytes(int(bits[i:i+8],2) for i in range(0,len(bits),8))")
print(f"       print(msg[:msg.index(0)].decode())")
