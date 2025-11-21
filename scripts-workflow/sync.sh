#!/bin/bash
# Script de sincronización rápida Git + Backup SMB
# Uso: ./sync.sh "mensaje de commit"

echo "🚀 Sync TFG - $(date)"
echo "=================="

# Pull últimos cambios
echo "📥 Pulling cambios desde GitHub..."
git pull origin main

# Añadir todos los cambios
echo "📝 Añadiendo cambios..."
git add .

# Commit con mensaje
if [ -n "$1" ]; then
    git commit -m "$1"
else
    echo "💬 Introduce mensaje de commit:"
    read commit_msg
    git commit -m "$commit_msg"
fi

# Push a GitHub
echo "📤 Pushing a GitHub..."
git push origin main

echo "✅ Sincronización completada!"
