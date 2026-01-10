#!/bin/bash
# build.sh - Multi-project builder

# Array de proyectos a compilar
pathsToBuild=(
  "/home/overleaf/TFG/TFG/docs/main/memory/memory-main.tex"
  #"/home/overleaf/TFG/TFG/docs/main/appendix/avantprojecte-main.tex"
)

# Configuración
VERBOSE=${1:-false}

# Compilar cada proyecto
for PROJECT_PATH in "${pathsToBuild[@]}"; do
    # Extraer directorio y nombre
    PROJECT_DIR=$(dirname "$PROJECT_PATH")
    PROJECT_FILE=$(basename "$PROJECT_PATH")
    PROJECT_NAME="${PROJECT_FILE%-main.tex}"
    
    # Crear carpeta de build
    BUILD_DIR="$PROJECT_DIR/build"
    BUILD_AUX="$BUILD_DIR/aux"
    
    mkdir -p "$BUILD_AUX"
    
    echo "=== Compilando: $PROJECT_NAME ==="
    echo "Directorio: $PROJECT_DIR"
    echo "Build output: $BUILD_DIR"
    
    # Compilar con latexmk
    cd "$PROJECT_DIR"
    latexmk -xelatex \
        -interaction=nonstopmode \
        -file-line-error \
        -output-directory="$BUILD_AUX" \
        "$PROJECT_FILE"
    
    # Copiar PDF al root de build
    if [ -f "$BUILD_AUX/$(basename ${PROJECT_FILE%.tex}.xdv)" ]; then
        echo "✅ Build exitoso: $PROJECT_NAME"
    else
        echo "❌ Build fallido: $PROJECT_NAME"
    fi
    
    cd - > /dev/null
done

echo "=== Build completo ==="
