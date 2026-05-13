#!/usr/bin/env python3
"""B4 - Alpha channel steganography (RGBA values slightly off 255)"""
from PIL import Image
import os

FLAG = "H4U{4lph4_ch4nn3l_h1dd3n}"

def hide_alpha(img, message):
    """Hide message bits in alpha channel LSB"""
    img = img.convert("RGBA")
    pixels = list(img.getdata())
    bits = ''.join(format(b, '08b') for b in (message + '\x00').encode('utf-8'))

    new_pixels = []
    bit_idx = 0
    for r, g, b, a in pixels:
        if bit_idx < len(bits):
            a = (a & 0xFE) | int(bits[bit_idx])
            bit_idx += 1
        new_pixels.append((r, g, b, a))

    result = Image.new("RGBA", img.size)
    result.putdata(new_pixels)
    return result

# Create base image - looks like a logo/screenshot
import random
random.seed(77)
img = Image.new("RGBA", (512, 512), (255, 255, 255, 255))
pixels = img.load()

# NovaCorp fake logo
for y in range(512):
    for x in range(512):
        cx, cy = x - 256, y - 256
        r2 = cx*cx + cy*cy
        if 14400 < r2 < 22500:   # ring
            pixels[x,y] = (30, 80, 180, 255)
        elif r2 <= 14400:         # inner circle gradient
            intensity = int(200 + 55 * (1 - r2/14400))
            pixels[x,y] = (intensity, intensity, 255, 255)
        # Add text-like elements
        if 200 < x < 320 and 240 < y < 280:
            pixels[x,y] = (255, 255, 255, 255)

img_stego = hide_alpha(img, FLAG)
os.makedirs("challenges", exist_ok=True)
img_stego.save("challenges/B4_novacorp_logo.png")

# Verify
img_check = Image.open("challenges/B4_novacorp_logo.png").convert("RGBA")
pix = list(img_check.getdata())
bits = ''.join(str(p[3] & 1) for p in pix)
msg_bytes = bytes(int(bits[i:i+8], 2) for i in range(0, len(bits), 8))
null_pos = msg_bytes.index(0)
recovered = msg_bytes[:null_pos].decode('utf-8')
assert recovered == FLAG, f"Verify failed: {recovered}"

size = os.path.getsize("challenges/B4_novacorp_logo.png")
print(f"[OK] B4_novacorp_logo.png ({size} bytes)")
print(f"     Flag en LSB canal alpha: {FLAG}")
print(f"     Verificado: {recovered}")
print(f"     Solucion:")
print(f"       from PIL import Image")
print(f"       img = Image.open('B4_novacorp_logo.png').convert('RGBA')")
print(f"       bits = ''.join(str(p[3]&1) for p in img.getdata())")
print(f"       msg = bytes(int(bits[i:i+8],2) for i in range(0,len(bits),8))")
print(f"       print(msg[:msg.index(0)].decode())")
