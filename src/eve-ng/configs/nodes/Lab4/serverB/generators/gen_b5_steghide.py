#!/usr/bin/env python3
"""B5 - Steghide JPEG + password bruteforce
Password: novacorp (aparece en el contexto narrativo)
Flag: H4U{st3gh1d3_p4ssw0rd_cr4ck}
"""
import os, subprocess

FLAG = "H4U{st3gh1d3_p4ssw0rd_cr4ck}"
STEG_PASS = "novacorp"

os.makedirs("challenges", exist_ok=True)

# Create base JPEG using PIL
from PIL import Image
import random
random.seed(99)

img = Image.new("RGB", (640, 480))
pixels = img.load()
# Simulate a surveillance camera photo (dark, grainy)
for y in range(480):
    for x in range(640):
        base = int(40 + 80 * (y/480))
        noise = random.randint(-20, 20)
        v = max(0, min(255, base + noise))
        # Add some lighter elements (server racks simulation)
        if 100 < x < 200 and 100 < y < 380:
            v = max(0, min(255, v + 60))
        elif 440 < x < 540 and 100 < y < 380:
            v = max(0, min(255, v + 60))
        pixels[x,y] = (v, v, max(0,v-10))

base_jpeg = "challenges/B5_camara_seguridad.jpg"
img.save(base_jpeg, "JPEG", quality=85)

# Hide flag with steghide
flag_file = "/tmp/b5_flag.txt"
with open(flag_file, "w") as f:
    f.write(FLAG + "\n")

result = subprocess.run([
    "steghide", "embed",
    "-cf", base_jpeg,
    "-sf", base_jpeg,
    "-p", STEG_PASS,
    "-f"
], input=f"{flag_file}\n".encode(), capture_output=True)

if result.returncode != 0:
    print(f"steghide error: {result.stderr.decode()}")
    print("Generando archivo de nota alternativo...")
    # Si steghide no está disponible, crear nota
    note = f"# B5: Steghide challenge\n# Password: {STEG_PASS}\n# Flag: {FLAG}\n"
    print(note)
else:
    print(f"[OK] B5_camara_seguridad.jpg generado con steghide")
    print(f"     Password steghide: {STEG_PASS}")
    print(f"     Flag: {FLAG}")
    print(f"     Solucion: steghide extract -sf B5_camara_seguridad.jpg -p novacorp")

# Clean up
os.remove(flag_file)
