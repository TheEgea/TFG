#!/bin/bash
################################################################################
#                                                                              #
#  DIAGNOSTIC + FIX SCRIPT                                                    #
#  TFG Build System - Find and fix broken paths                               #
#                                                                              #
#  Detecta:                                                                    #
#    • Paths rotos en .tex files                                              #
#    • Missing resources                                                      #
#    • Inconsistent directory structures                                      #
#                                                                              #
################################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Paths
TFG_ROOT="/home/overleaf/TFG/TFG"
DOCS_DIR="$TFG_ROOT/docs"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}TFG Build System - Diagnostic${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# ============================================================================
# STEP 1: Show current structure
# ============================================================================

echo -e "${YELLOW}1. Current Directory Structure:${NC}"
echo ""

if [ -d "$DOCS_DIR" ]; then
    cd "$DOCS_DIR"
    echo "📁 $DOCS_DIR"
    ls -laR | head -100
    echo ""
else
    echo -e "${RED}ERROR: $DOCS_DIR not found${NC}"
    exit 1
fi

# ============================================================================
# STEP 2: Find all .tex files with \input or \include commands
# ============================================================================

echo -e "${YELLOW}2. Scanning for resource references in .tex files:${NC}"
echo ""

find . -name "*.tex" -type f | while read TEX_FILE; do
    echo "📄 $TEX_FILE"
    
    # Look for \input and \include commands
    if grep -E '\\input\{|\\include\{' "$TEX_FILE" 2>/dev/null | head -5; then
        echo ""
    else
        echo "   (no references)"
        echo ""
    fi
done

# ============================================================================
# STEP 3: Find glossary.tex locations
# ============================================================================

echo -e "${YELLOW}3. Glossary.tex locations:${NC}"
echo ""

find . -name "glossary.tex" -type f | while read FILE; do
    echo -e "${GREEN}✓${NC} Found: $FILE"
done

if [ -z "$(find . -name "glossary.tex" -type f)" ]; then
    echo -e "${RED}✗ glossary.tex NOT FOUND${NC}"
fi

echo ""

# ============================================================================
# STEP 4: Find references.bib locations
# ============================================================================

echo -e "${YELLOW}4. References.bib locations:${NC}"
echo ""

find . -name "references.bib" -type f | while read FILE; do
    echo -e "${GREEN}✓${NC} Found: $FILE"
done

if [ -z "$(find . -name "references.bib" -type f)" ]; then
    echo -e "${RED}✗ references.bib NOT FOUND${NC}"
fi

echo ""

# ============================================================================
# STEP 5: Check broken paths
# ============================================================================

echo -e "${YELLOW}5. Checking for broken paths:${NC}"
echo ""

BROKEN_FOUND=false

find . -name "*-main.tex" -type f | while read MAIN_FILE; do
    PROJECT_DIR=$(dirname "$MAIN_FILE")
    cd "$DOCS_DIR/$PROJECT_DIR"
    
    echo "Project: $MAIN_FILE"
    
    # Check for ../resources/ references
    if grep -q "../../resources" "$MAIN_FILE" 2>/dev/null; then
        echo -e "  ${BLUE}→ Uses ../../resources/ (likely correct for nested structure)${NC}"
    fi
    
    if grep -q "../resources" "$MAIN_FILE" 2>/dev/null; then
        if [ ! -d "../resources" ]; then
            echo -e "  ${RED}✗ References ../resources/ but NOT FOUND${NC}"
            BROKEN_FOUND=true
        else
            echo -e "  ${GREEN}✓ ../resources/ exists${NC}"
        fi
    fi
    
    if grep -q "\\\\input{./resources" "$MAIN_FILE" 2>/dev/null; then
        if [ ! -d "./resources" ]; then
            echo -e "  ${RED}✗ References ./resources/ but NOT FOUND${NC}"
            BROKEN_FOUND=true
        else
            echo -e "  ${GREEN}✓ ./resources/ exists${NC}"
        fi
    fi
    
    if grep -q "\\\\input{resources" "$MAIN_FILE" 2>/dev/null; then
        if [ ! -d "./resources" ]; then
            echo -e "  ${RED}✗ References resources/ but NOT FOUND${NC}"
            BROKEN_FOUND=true
        else
            echo -e "  ${GREEN}✓ ./resources/ exists${NC}"
        fi
    fi
    
    echo ""
done

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ "$BROKEN_FOUND" = true ]; then
    echo -e "${RED}Issues detected. See FIXES below.${NC}"
else
    echo -e "${GREEN}✓ No obvious issues found${NC}"
fi

echo ""
