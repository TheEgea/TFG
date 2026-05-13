#!/bin/bash
# deploy_serverB.sh — Despliega archivos de reto en ServerB (Steganography)
# Uso: bash deploy.sh
# Prerequisito: SSH accesible a sysop@10.10.2.10 (directo o via jump host)

SERVER_B="sysop@10.10.2.10"
KEY="~/.ssh/id_ed25519_local"
JUMP=""  # Si hay jump host: JUMP="-J user@HOST"

REMOTE_DIR="/srv/public/uploads"
CHALLENGES_DIR="./challenges"

echo "=== Deploy ServerB — Lab4 CipherStrike ==="
echo "Destino: $SERVER_B:$REMOTE_DIR"
echo ""

echo "[1/3] Creando directorio remoto..."
ssh $JUMP -i $KEY $SERVER_B "sudo mkdir -p $REMOTE_DIR && sudo chmod 755 $REMOTE_DIR && sudo chown sysop:sysop $REMOTE_DIR"

echo "[2/3] Copiando archivos de reto..."
for f in B1_* B2_* B3_* B4_* B5_*; do
    if [ -f "$CHALLENGES_DIR/$f" ]; then
        scp $JUMP -i $KEY "$CHALLENGES_DIR/$f" "$SERVER_B:$REMOTE_DIR/"
        echo "  OK $f"
    else
        echo "  SKIP $f (no existe — generar con generators/gen_b5_steghide.py)"
    fi
done

echo "[3/3] Instalando dependencias..."
ssh $JUMP -i $KEY $SERVER_B "sudo apt-get install -y exiftool steghide python3-pil 2>/dev/null"

echo ""
echo "=== Deploy completado ==="
echo "Verificar: ssh $JUMP -i $KEY $SERVER_B 'ls -la $REMOTE_DIR'"
