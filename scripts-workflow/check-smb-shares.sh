#!/bin/bash
echo "🔍 Verificando recursos SMB disponibles..."
echo "=========================================="

# Intentar diferentes nombres comunes
shares=("shared" "share" "bulk-storage" "storage" "data" "backup" "public" "files")

for share in "${shares[@]}"; do
    echo "🔍 Probando: \\\\192.168.0.140\\$share"
    if net use "\\\\192.168.0.140\\$share" /user:fileserver TheEgeaRada24130803 2>/dev/null; then
        echo "✅ ENCONTRADO: $share"
        net use
        break
    else
        echo "❌ No disponible: $share"
    fi
done
