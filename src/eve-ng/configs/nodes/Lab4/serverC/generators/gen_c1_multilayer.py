#!/usr/bin/env python3
"""C1 - Multilayer: EXIF clue -> steghide JPEG -> ZIP -> flag (Dificil)"""
import subprocess, os, zipfile, random
from PIL import Image

FLAG = "H4U{mult1l4y3r_st3g0_4es}"
STEG_PASS = "b4ckup2026"  # found in EXIF

import piexif

os.makedirs("challenges", exist_ok=True)

# Create base JPEG - looks like a server room backup tape photo
random.seed(55)
img = Image.new("RGB", (800, 600))
pix = img.load()
for y in range(600):
    for x in range(800):
        r = max(0, min(255, 30 + random.randint(-10,10) + (20 if 200<x<600 and 150<y<450 else 0)))
        g = max(0, min(255, 28 + random.randint(-10,10) + (18 if 200<x<600 and 150<y<450 else 0)))
        b = max(0, min(255, 25 + random.randint(-10,10) + (15 if 200<x<600 and 150<y<450 else 0)))
        pix[x,y] = (r, g, b)

# EXIF with steghide password hint embedded in Comment
exif_dict = {
    "0th": {
        piexif.ImageIFD.Artist: b"NovaCorp IT Security",
        piexif.ImageIFD.ImageDescription: b"Backup tapes - Server Room B",
        piexif.ImageIFD.Make: b"Sony",
        piexif.ImageIFD.Model: b"DSC-RX100",
        piexif.ImageIFD.Software: b"GIMP 2.10",
        piexif.ImageIFD.DateTime: b"2026:04:10 02:11:33",
        piexif.ImageIFD.XPComment: "Backup encryption key: b4ckup2026".encode('utf-16-le'),
    },
    "Exif": {
        piexif.ExifIFD.UserComment: b"ASCII\x00\x00\x00Backup key: b4ckup2026",
    },
    "1st": {},
    "thumbnail": None,
}
exif_bytes = piexif.dump(exif_dict)
jpeg_path = "challenges/C1_backup_tapes.jpg"
img.save(jpeg_path, exif=exif_bytes, quality=85)

# Create ZIP with flag
flag_txt = "challenges/_flag_c1.txt"
with open(flag_txt, "w") as f:
    f.write(f"{FLAG}\n")

zip_path = "challenges/_c1_data.zip"
with zipfile.ZipFile(zip_path, "w") as zf:
    zf.write(flag_txt, "data/recovered_flag.txt")
os.remove(flag_txt)

# Embed ZIP into JPEG with steghide
r = subprocess.run(
    ["steghide", "embed", "-cf", jpeg_path, "-sf", jpeg_path,
     "-ef", zip_path, "-p", STEG_PASS, "-f"],
    capture_output=True
)
os.remove(zip_path)

if r.returncode == 0:
    print(f"[OK] C1_backup_tapes.jpg")
    print(f"     EXIF hint: 'Backup key: b4ckup2026'")
    print(f"     steghide -sf C1_backup_tapes.jpg -p b4ckup2026 -> ZIP -> flag")
    print(f"     Flag: {FLAG}")
else:
    print(f"ERROR steghide: {r.stderr.decode()}")
