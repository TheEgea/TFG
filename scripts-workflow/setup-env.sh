#!/bin/bash
# Setup inicial del entorno de desarrollo TFG

echo "🛠️ Setup Entorno TFG"
echo "==================="

# Instalar dependencias si existe requirements.txt
if [ -f "requirements.txt" ]; then
    echo "📦 Instalando dependencias Python..."
    pip install -r requirements.txt
fi

# Configurar Git si no está configurado
git config --get user.name > /dev/null || {
    echo "⚙️ Configurando Git..."
    git config user.name "Eloi Egea"
    git config user.email "eartero@edu.tecnocampus.cat"
}

# Abrir VSCode si está disponible
if command -v code &> /dev/null; then
    echo "🖥️ Abriendo VSCode..."
    code .
fi

echo "✅ Entorno configurado!"
