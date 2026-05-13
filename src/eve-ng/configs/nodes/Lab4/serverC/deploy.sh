#!/bin/bash
# deploy_serverC.sh — Despliega archivos de reto en ServerC (Mix Hard)
# Uso: bash deploy.sh
# Prerequisito: SSH accesible a devops@10.10.3.10
# Password ServerC = MD5(A5_flag + B5_flag)[:12] = fa681b59855d

SERVER_C="devops@10.10.3.10"
KEY="~/.ssh/id_ed25519_local"
JUMP=""

REMOTE_DIR="/home/devops/retos"
CHALLENGES_DIR="./challenges"

echo "=== Deploy ServerC — Lab4 CipherStrike (GATED) ==="
echo "Destino: $SERVER_C:$REMOTE_DIR"
echo "Password derivada: MD5(A5_flag+B5_flag)[:12] = fa681b59855d"
echo ""

echo "[1/4] Creando directorio remoto..."
ssh $JUMP -i $KEY $SERVER_C "mkdir -p $REMOTE_DIR && chmod 755 $REMOTE_DIR"

echo "[2/4] Copiando archivos de reto..."
for f in C1_* C2_* C3_* C4_*; do
    if [ -f "$CHALLENGES_DIR/$f" ]; then
        scp $JUMP -i $KEY "$CHALLENGES_DIR/$f" "$SERVER_C:$REMOTE_DIR/"
        echo "  OK $f"
    else
        echo "  SKIP $f (no existe — generar con generators/gen_$(echo $f | cut -c1-2 | tr A-Z a-z)_*.py)"
    fi
done

echo "[3/4] Instalando dependencias Python..."
ssh $JUMP -i $KEY $SERVER_C "sudo apt-get install -y steghide python3-pil 2>/dev/null &&     pip3 install piexif --break-system-packages 2>/dev/null"

echo "[4/4] Instalando hlextend (para C3 — no está en PyPI)..."
ssh $JUMP -i $KEY $SERVER_C "    curl -sL https://raw.githubusercontent.com/stephenbradshaw/hlextend/master/hlextend.py     -o ~/.local/lib/python3.12/site-packages/hlextend.py 2>/dev/null ||     pip3 install --break-system-packages         git+https://github.com/stephenbradshaw/hlextend.git 2>/dev/null"

echo ""
echo "=== Deploy completado ==="
echo "Verificar: ssh $JUMP -i $KEY $SERVER_C 'ls -la $REMOTE_DIR'"
