#!/usr/bin/env python3
"""Genera todos los challenges de ServerB localmente (B1-B4)"""
import os, sys

os.chdir(os.path.dirname(os.path.abspath(__file__)))
os.makedirs("challenges", exist_ok=True)

scripts = ["gen_b1_exif.py", "gen_b2_iend.py", "gen_b3_lsb.py", "gen_b4_alpha.py"]

for script in scripts:
    print(f"\n{'='*50}")
    print(f"Ejecutando {script}...")
    ret = os.system(f'py -3 {script}')
    if ret != 0:
        print(f"ERROR en {script}")
        sys.exit(1)

print("\n" + "="*50)
print("Archivos generados:")
for f in sorted(os.listdir("challenges")):
    size = os.path.getsize(f"challenges/{f}")
    print(f"  {f}: {size} bytes")
