#!/usr/bin/env bash
# ============================================================================
# build-plantilla.sh - TFG Build Script (Adaptado para estructura nueva)
# ============================================================================
# Descripción: Compila memoria o avantprojecte desde línea de comandos
# Uso: ./scripts-workflow/build-plantilla.sh [memoria|avant]
# ============================================================================

set -euo pipefail

# FUNCIÓN: Mostrar ayuda
show_help() {
  echo ""
  echo "📚 TFG Build Script"
  echo "=================="
  echo ""
  echo "Uso: $0 [memoria|avant|all|clean|help]"
  echo ""
  echo "Comandos:"
  echo "  memoria    → Compila docs/memoria/main.tex → memoria_FINAL.pdf"
  echo "  avant      → Compila docs/avantprojecte/main.tex → avantprojecte_FINAL.pdf"
  echo "  all        → Compila ambos"
  echo "  clean      → Limpia archivos temporales"
  echo "  help       → Muestra esta ayuda"
  echo ""
  echo "Ejemplos:"
  echo "  $0 memoria"
  echo "  $0 avant"
  echo "  $0 all"
  echo ""
}

# FUNCIÓN: Compilar un documento
build_document() {
  local doc_type=$1
  local src_file=""
  local output_name=""
  
  case "$doc_type" in
    "memoria")
      src_file="docs/memoria/main.tex"
      output_name="memoria_FINAL"
      ;;
    "avant")
      src_file="docs/avantprojecte/main.tex"
      output_name="avantprojecte_FINAL"
      ;;
    *)
      echo "❌ Error: Tipo de documento desconocido: $doc_type"
      return 1
      ;;
  esac
  
  # Verificar que el archivo existe
  if [ ! -f "$src_file" ]; then
    echo "❌ Error: No encontré $src_file"
    return 1
  fi
  
  
  # Construir rutas absolutas
  local src_dir_abs=$(cd "$(dirname "$src_file")" && pwd)
  local src_basename=$(basename "$src_file")
  local out_dir="$src_dir_abs/build"
  local aux_dir="$out_dir/aux"
  
  # Crear directorios
  mkdir -p "$out_dir" "$aux_dir"
  
  echo ""
  echo "📖 Compilando: $doc_type"
  echo "   Fuente: $src_file"
  echo "   Salida: $out_dir/$output_name.pdf"
  echo ""
  
  # Compilar con latexmk (XeLaTeX, optimizado para TFG)
  cd "$src_dir_abs"
  latexmk -cd -xelatex -interaction=nonstopmode -file-line-error \
    -outdir="$out_dir" \
    -auxdir="$aux_dir" \
    "$src_basename"
  
  # Copiar PDF a raíz del repo
  if [ -f "$out_dir/${src_basename%.tex}.pdf" ]; then
    cp "$out_dir/${src_basename%.tex}.pdf" "../../$output_name.pdf"
    echo "✅ PDF generado: $output_name.pdf"
    cd - > /dev/null
    return 0
  else
    echo "❌ Error: No se generó el PDF"
    cd - > /dev/null
    return 1
  fi
}

# FUNCIÓN: Limpiar archivos temporales
clean_build() {
  echo "🧹 Limpiando archivos temporales..."
  
  rm -rf docs/memoria/build
  rm -rf docs/avantprojecte/build
  rm -f memoria_FINAL.pdf
  rm -f avantprojecte_FINAL.pdf
  
  echo "✅ Limpieza completa"
}

# MAIN
main() {
  local cmd="${1:-help}"
  
  case "$cmd" in
    "memoria")
      build_document "memoria"
      ;;
    "avant")
      build_document "avant"
      ;;
    "all")
      clean_build
      build_document "memoria" || exit 1
      build_document "avant" || exit 1
      echo ""
      echo "✨ BUILD COMPLETADO"
      ls -lh memoria_FINAL.pdf avantprojecte_FINAL.pdf 2>/dev/null || true
      ;;
    "clean")
      clean_build
      ;;
    "help"|"--help"|"-h"|"")
      show_help
      ;;
    *)
      echo "❌ Comando desconocido: $cmd"
      echo "Usa: $0 help"
      exit 1
      ;;
  esac
}

main "$@"
