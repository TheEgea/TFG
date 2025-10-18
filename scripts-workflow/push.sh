#!/bin/bash
# Push rápido con mensaje
if [ -n "$1" ]; then
    git add .
    git commit -m "$1"
    git push origin main
    echo "✅ Push completado: $1"
else
    echo "❌ Uso: ./push.sh \"mensaje de commit\""
fi
