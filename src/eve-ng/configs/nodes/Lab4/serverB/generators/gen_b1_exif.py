#!/usr/bin/env python3
"""B1 - EXIF metadata hidden in PNG"""
from PIL import Image
import piexif, struct, zlib, os

FLAG = "H4U{3x1f_m3t4d4t4_h1dd3n}"

# Create a realistic-looking PNG (office photo simulation)
img = Image.new("RGB", (800, 600))
pixels = img.load()
import random
random.seed(42)
# Simulate a blurry office photo with color blocks
for y in range(600):
    for x in range(800):
        r = min(255, int(180 + 30*((x/800)*2-1) + random.randint(-15,15)))
        g = min(255, int(170 + 25*((y/600)*2-1) + random.randint(-15,15)))
        b = min(255, int(160 + 20 + random.randint(-15,15)))
        pixels[x,y] = (r,g,b)

# Add EXIF with flag hidden in Artist and UserComment
exif_dict = {
    "0th": {
        piexif.ImageIFD.Artist: FLAG.encode('utf-8'),
        piexif.ImageIFD.ImageDescription: b"NovaCorp Internal - Sala de Servidores",
        piexif.ImageIFD.Make: b"Canon",
        piexif.ImageIFD.Model: b"EOS 80D",
        piexif.ImageIFD.Software: b"Adobe Photoshop 23.0",
        piexif.ImageIFD.DateTime: b"2026:04:10 03:42:11",
    },
    "Exif": {
        piexif.ExifIFD.UserComment: b"ASCII\x00\x00\x00" + FLAG.encode('utf-8'),
    },
    "1st": {},
    "thumbnail": None,
}
exif_bytes = piexif.dump(exif_dict)

os.makedirs("challenges", exist_ok=True)
img.save("challenges/B1_oficina_novacorp.png", exif=exif_bytes)
print(f"[OK] B1_oficina_novacorp.png generado")
print(f"     Flag en EXIF Artist: {FLAG}")
print(f"     Solucion: exiftool B1_oficina_novacorp.png | grep -E 'Artist|User'")
