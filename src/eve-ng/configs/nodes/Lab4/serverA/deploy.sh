#!/bin/bash
# deploy_serverA.sh — Despliega todos los archivos de reto en ServerA
# Uso: bash deploy.sh
# Prerequisito: SSH accesible a admin@10.10.1.10 (directo o via jump host)

SERVER_A="admin@10.10.1.10"
KEY="~/.ssh/id_ed25519_local"
JUMP=""  # Si hay jump host: JUMP="-J admin@PFSENSE_IP"

REMOTE_DIR="/home/admin/mensajes"
CHALLENGES_DIR="./challenges"

echo "=== Deploy ServerA — Lab4 CipherStrike ==="
echo "Destino: $SERVER_A:$REMOTE_DIR"
echo ""

# 1. Crear directorio remoto
echo "[1/3] Creando directorio remoto..."
ssh $JUMP -i $KEY $SERVER_A "mkdir -p $REMOTE_DIR && chmod 755 $REMOTE_DIR"

# 2. Copiar archivos de reto
echo "[2/3] Copiando archivos de reto..."
scp $JUMP -i $KEY $CHALLENGES_DIR/A1_* $SERVER_A:$REMOTE_DIR/
scp $JUMP -i $KEY $CHALLENGES_DIR/A2_* $SERVER_A:$REMOTE_DIR/
scp $JUMP -i $KEY $CHALLENGES_DIR/A3_* $SERVER_A:$REMOTE_DIR/
scp $JUMP -i $KEY $CHALLENGES_DIR/A4_* $SERVER_A:$REMOTE_DIR/
scp $JUMP -i $KEY $CHALLENGES_DIR/A5_* $SERVER_A:$REMOTE_DIR/

# 3. Copiar README
echo "[3/3] Copiando README..."
scp $JUMP -i $KEY ./README.md $SERVER_A:/home/admin/README.md

# 4. Instalar dependencias Python en ServerA
echo "[4/4] Instalando dependencias Python..."
ssh $JUMP -i $KEY $SERVER_A "pip3 install pycryptodome gmpy2 2>/dev/null || \
    sudo apt-get install -y python3-gmpy2 python3-pycryptodome 2>/dev/null"

echo ""
echo "=== Deploy completado ==="
echo "Verificar: ssh $JUMP -i $KEY $SERVER_A 'ls -la $REMOTE_DIR'"
