#!/bin/bash
echo "🔍 Probando SMB sin credenciales..."

# Intentar sin usuario/contraseña
if net use Y: "\\\\192.168.0.140\\bulk-storage" 2>/dev/null; then
    echo "✅ Conectado sin credenciales!"
    dir Y:\
else
    echo "❌ No funciona sin credenciales"
    
    # Probar con diferentes usuarios
    users=("guest" "admin" "administrator" "user")
    for user in "${users[@]}"; do
        echo "🔍 Probando usuario: $user"
        if net use Y: "\\\\192.168.0.140\\bulk-storage" /user:$user 2>/dev/null; then
            echo "✅ Funciona con usuario: $user"
            break
        fi
    done
fi
