#!/bin/bash
# Script de backup automático al servidor SMB (Windows optimizado)
# Uso: ./backup-smb.sh

echo "💾 Backup TFG al SMB - $(date)"
echo "=========================="

# Crear timestamp
timestamp=$(date +%Y%m%d_%H%M%S)

# Conectar al SMB con mejor manejo de errores
echo "🔌 Conectando al servidor SMB..."
if net use Y: "\\192.168.0.140\bulk-storage" /user:fileserver TheEgeaRada24130803 2>/dev/null; then
    echo "✅ Conexión SMB establecida"
elif net use Y: 2>/dev/null | grep -q "192.168.0.140"; then
    echo "✅ SMB ya conectado"
else
    echo "❌ Error conectando al SMB. Intentando sin credenciales..."
    if ! net use Y: "\\192.168.0.140\bulk-storage" 2>/dev/null; then
        echo "❌ No se puede conectar al servidor SMB"
        echo "   Verifica que el servidor esté encendido y accesible"
        exit 1
    fi
fi

# Crear carpeta backup
backup_dir="/y/Egea/Uni/!Cursos/5t Geisi/TFG/backup_$timestamp"
echo "📁 Creando backup en: $backup_dir"

# Crear carpeta (usar mkdir de Windows)
if mkdir -p "$(cygpath -w "$backup_dir")" 2>/dev/null; then
    echo "✅ Carpeta backup creada"
else
    echo "❌ Error creando carpeta backup"
    exit 1
fi

# Copiar archivos usando robocopy (Windows nativo)
echo "📋 Copiando archivos..."
source_dir="$(pwd)"
target_dir="$(cygpath -w "$backup_dir")"

# Usar robocopy que está disponible en Windows
robocopy "$source_dir" "$target_dir" /MIR /XD .git /XF *.log *.tmp /NFL /NDL /NP

# Crear archivo ZIP usando tar (disponible en Git Bash)
echo "🗜️ Creando archivo ZIP..."
cd ..
tar -czf "TFG_backup_$timestamp.tar.gz" --exclude='.git' --exclude='*.log' --exclude='*.tmp' TFG/
mv "TFG_backup_$timestamp.tar.gz" "$(cygpath -w "/y/Egea/Uni/!Cursos/5t Geisi/TFG/")" 2>/dev/null
cd TFG

echo "✅ Backup completado!"
echo "📂 Ubicación: Y:\\Egea\\Uni\\!Cursos\\5t Geisi\\TFG\\backup_$timestamp"
echo "📦 Archivo: TFG_backup_$timestamp.tar.gz"
