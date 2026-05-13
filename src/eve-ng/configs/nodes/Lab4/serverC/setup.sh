#!/bin/bash
# Setup ServerC dependencies for Lab4 CipherStrike
set -e

PASS="fa681b59855d"

echo "[1] Installing pip..."
curl -sS https://bootstrap.pypa.io/get-pip.py -o /tmp/get-pip.py
python3 /tmp/get-pip.py --break-system-packages 2>&1 | tail -3

echo "[2] Installing Python packages..."
python3 -m pip install hlextend pycryptodome piexif pillow --break-system-packages 2>&1 | tail -5

echo "[3] Installing steghide..."
echo $PASS | sudo -S apt-get install -y steghide 2>&1 | tail -5

echo "[4] Verifying..."
python3 -c 'import hlextend; print("hlextend OK:", hlextend.__version__)'
python3 -c 'from Crypto.Cipher import AES; print("pycryptodome OK")'
python3 -c 'import piexif; print("piexif OK")'
steghide --version 2>&1 | head -1

echo "[DONE] ServerC ready"
