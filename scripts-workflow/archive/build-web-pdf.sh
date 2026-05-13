#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# build-web-pdf.sh — DEPRECATED
#
# This script used Pandoc + XeLaTeX to generate the web documentation PDF.
# It has been superseded by the mkdocs-with-pdf plugin which runs automatically
# during GitHub Actions (docs.yml) and outputs site/pdf/lab-documentation.pdf.
#
# The Pandoc template (pdf_template/tecnocampus.tex) and Lua filter
# (pdf_template/admonitions.lua) are kept for reference.
#
# To manually trigger the web PDF build, run:
#   cd docs/web && mkdocs build
#
# ─────────────────────────────────────────────────────────────────────────────
echo "DEPRECATED: use mkdocs build instead (or push to main to trigger CI)"
echo "See docs/web/mkdocs.yml — plugins.with-pdf"
exit 0

# ──── original script preserved below ────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────
# build-web-pdf.sh — Convert MkDocs web docs to PDF via Pandoc + XeLaTeX
# Reads nav order from mkdocs.yml, concatenates MD files, produces PDF.
#
# Usage:
#   cd /home/overleaf/TFG/TFG
#   bash scripts-workflow/build-web-pdf.sh
#
# Output: docs/web/pdf/lab-documentation.pdf
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WEB_DIR="$REPO_ROOT/docs/web"
DOCS_DIR="$WEB_DIR/docs"
TEMPLATE="$WEB_DIR/pdf_template/tecnocampus.tex"
LUA_FILTER="$WEB_DIR/pdf_template/admonitions.lua"
OUTPUT_DIR="$WEB_DIR/pdf"
OUTPUT_PDF="$OUTPUT_DIR/lab-documentation.pdf"
MKDOCS_YML="$WEB_DIR/mkdocs.yml"
TMP_COMBINED="/tmp/tfg_web_combined.md"

mkdir -p "$OUTPUT_DIR"

# ── Extract ordered file list from mkdocs.yml nav ────────────────────────────
echo "→ Parsing nav from mkdocs.yml..."
python3 - "$MKDOCS_YML" "$DOCS_DIR" > /tmp/tfg_nav_files.txt << 'PYEOF'
import sys, re, os

yml_path = sys.argv[1]
docs_dir = sys.argv[2]

with open(yml_path) as f:
    content = f.read()

# Extract all "path.md" entries from nav (skip lines starting with #)
files = []
for line in content.splitlines():
    line = line.strip()
    if line.startswith('#'):
        continue
    # Match lines like:   - Title: some/path.md
    m = re.search(r':\s+([^\s#]+\.md)', line)
    if m:
        rel = m.group(1)
        full = os.path.join(docs_dir, rel)
        if os.path.isfile(full) and full not in files:
            files.append(full)

for f in files:
    print(f)
PYEOF

mapfile -t MD_FILES < /tmp/tfg_nav_files.txt

echo "→ Found ${#MD_FILES[@]} markdown files in nav order:"
for f in "${MD_FILES[@]}"; do
    echo "    $(basename "$(dirname "$f")")/$(basename "$f")"
done

# ── Pre-process and combine markdown files ───────────────────────────────────
echo "→ Combining markdown files..."
> "$TMP_COMBINED"

for f in "${MD_FILES[@]}"; do
    # Add a page break comment before each file (except first)
    if [ -s "$TMP_COMBINED" ]; then
        echo -e "\n\n---\n" >> "$TMP_COMBINED"
    fi
    
    # Pre-process: convert MkDocs admonition syntax to something Pandoc handles
    # MkDocs:  !!! type "Title"
    #              content
    # Pandoc div syntax:
    # ::: {.admonition .type}
    # **Title**
    # content
    # :::
    python3 - "$f" >> "$TMP_COMBINED" << 'PYEOF'
import sys, re

with open(sys.argv[1]) as fh:
    text = fh.read()

lines = text.splitlines()
out = []
i = 0
while i < len(lines):
    line = lines[i]
    # Match !!! type "title" or ??? type "title"
    m = re.match(r'^([!?]{3})\s+(\w+)\s*(?:"([^"]*)")?', line)
    if m:
        admon_type = m.group(2).lower()
        title = m.group(3) or admon_type.capitalize()
        out.append(f'::: {{.admonition .{admon_type}}}')
        out.append(title)
        out.append('')
        i += 1
        # Collect indented body (4 spaces)
        while i < len(lines) and (lines[i].startswith('    ') or lines[i].strip() == ''):
            body_line = lines[i][4:] if lines[i].startswith('    ') else lines[i]
            out.append(body_line)
            i += 1
        out.append(':::')
        out.append('')
    else:
        out.append(line)
        i += 1

print('\n'.join(out))
PYEOF
done

echo "→ Combined: $(wc -l < "$TMP_COMBINED") lines"

# ── Run Pandoc ────────────────────────────────────────────────────────────────
echo "→ Running Pandoc → XeLaTeX → PDF..."
pandoc "$TMP_COMBINED" \
    --pdf-engine=xelatex \
    --template="$TEMPLATE" \
    --lua-filter="$LUA_FILTER" \
    --variable title="Ethical Pentesting with EVE-NG" \
    --variable subtitle="Bachelor's Thesis Technical Annex" \
    --variable author="Eloi Egea Rada" \
    --variable imgdir="$REPO_ROOT/docs/images" \
    --toc \
    --toc-depth=3 \
    --highlight-style=tango \
    --number-sections \
    -o "$OUTPUT_PDF" \
    2>&1

echo ""
echo "✓ PDF generated: $OUTPUT_PDF"
echo "  Size: $(du -h "$OUTPUT_PDF" | cut -f1)"
