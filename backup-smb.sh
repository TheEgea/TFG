#!/bin/bash
# Script de backup automático al servidor SMB
# Uso: ./backup-smb.sh

echo "💾 Backup TFG al SMB - $(date)"
echo "=========================="

# Conectar al SMB
echo "🔌 Conectando al servidor SMB..."
net use Y: "\\192.168.0.140\bulk-storage" /user:fileserver TheEgeaRada24130803

# Crear carpeta backup con timestamp
timestamp=$(date +%Y%m%d_%H%M%S)
backup_dir="Y:\\Egea\\Uni\\!Cursos\\5t Geisi\\TFG\\backup_$timestamp"

echo "📁 Creando backup en: $backup_dir"
mkdir -p "$backup_dir"

# Copiar proyecto completo (excluyendo .git para velocidad)
echo "📋 Copiando archivos..."
rsync -av --progress --exclude='.git' ./ "/y/Egea/Uni/!Cursos/5t Geisi/TFG/backup_$timestamp/"

# Crear ZIP de backup
echo "🗜️ Creando archivo ZIP..."
zip -r "TFG_backup_$timestamp.zip" . -x "*.git*"
mv "TFG_backup_$timestamp.zip" "/y/Egea/Uni/!Cursos/5t Geisi/TFG/"

echo "✅ Backup completado!"
echo "📂 Ubicación: $backup_dir"
