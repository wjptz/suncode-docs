#!/bin/bash
# docs-beta-start.sh — seed a new beta cycle by copying root → beta/
#
# Lifecycle stage: T0 → T1 (release-only → release+beta)
#
# What it does:
#   1. Copies versioned content (start/, advanced/, index.mdx) from root → beta/
#   2. Mirrors the copy in zh/beta/
#
# What you still do manually after:
#   1. Edit docs.json: add a "Beta" version block to versions[] pointing to beta/* paths
#      (mirror the existing structure from previous beta cycles via git history)
#   2. Edit docs.json: add a banner about reading beta docs
#   3. Edit beta/* content for the new cycle's features (changelog, install commands, banner refs)
#   4. git add . && git commit + push
#
# Usage: ./scripts/docs-beta-start.sh
set -euo pipefail
cd "$(dirname "$0")/.."

if [ -d "beta" ] || [ -d "rc" ]; then
  echo "✖ Dev subdir already exists (beta/ or rc/). A new beta cycle should start from a release-only state." >&2
  exit 1
fi

DIRS=(start advanced)
FILES=(index.mdx)

mkdir -p beta zh/beta

for DIR in "${DIRS[@]}"; do
  cp -r "$DIR" beta/
  cp -r "zh/$DIR" zh/beta/
done

for FILE in "${FILES[@]}"; do
  [ -f "$FILE" ] && cp "$FILE" beta/
  [ -f "zh/$FILE" ] && cp "zh/$FILE" zh/beta/
done

cat <<'NEXT'
→ Seeded beta/ and zh/beta/ from current stable.
→ Manual followups:
  1. Edit docs.json: add a "Beta" version block to versions[] pointing to beta/* paths
  2. Edit docs.json: add banner ("📦 Reading **Beta** docs ...")
  3. Edit beta/* content for the new cycle (install commands → @beta, changelog refs, etc.)
  4. git add . && git commit + push
NEXT
