#!/usr/bin/env python3
"""
build-labs-cover.py — Compile labs-cover.tex (cover page for labs-all.pdf)
Called from build-labs.sh.

Usage: python3 build-labs-cover.py <repo_root>
Output: prints path to labs-cover.pdf on stdout
"""
import subprocess, sys, os

REPO_ROOT = sys.argv[1] if len(sys.argv) > 1 else '/home/overleaf/TFG/TFG'
COVER_DIR = os.path.join(REPO_ROOT, 'src/materials/exercises/labs-cover')
BUILD_DIR = os.path.join(COVER_DIR, 'build')
os.makedirs(BUILD_DIR, exist_ok=True)

result = subprocess.run(
    ['latexmk', '-xelatex', '-interaction=nonstopmode',
     '-output-directory=' + BUILD_DIR, 'labs-cover.tex'],
    cwd=COVER_DIR,
    capture_output=True, text=True
)

pdf_out = os.path.join(BUILD_DIR, 'labs-cover.pdf')
if os.path.exists(pdf_out):
    print(pdf_out)
    sys.exit(0)
else:
    print('ERROR: labs-cover.pdf not generated', file=sys.stderr)
    print(result.stdout[-2000:], file=sys.stderr)
    sys.exit(1)
