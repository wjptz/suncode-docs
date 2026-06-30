#!/bin/bash
# docs-beta-to-rc.sh — relabel beta → rc when entering RC stage
#
# Lifecycle stage: T1 → T2 (release+beta → release+rc)
#
# What it does:
#   1. git mv beta → rc (and zh/beta → zh/rc)
#   2. Bulk text replace inside rc/* content: @wjptz/suncode@beta → @rc, `@beta` → `@rc`
#
# What you still do manually after:
#   1. Edit docs.json: rename the "Beta" version label → "RC"
#   2. Edit docs.json: update each page entry from beta/* → rc/*
#   3. Edit docs.json: update banner text from "Beta" → "RC"
#   4. Review the @beta scrub diff for false positives (text inside paragraphs etc.)
#   5. git add . && git commit + push
#
# Usage: ./scripts/docs-beta-to-rc.sh
set -euo pipefail
cd "$(dirname "$0")/.."

if [ ! -d "beta" ]; then echo "✖ No beta/ directory" >&2; exit 1; fi
if [ -d "rc" ]; then echo "✖ rc/ already exists" >&2; exit 1; fi

git mv beta rc
[ -d "zh/beta" ] && git mv zh/beta zh/rc

# Bulk text scrub @beta → @rc inside rc/ (use POSIX sed; -i.bak for portability)
find rc zh/rc -type f \( -name "*.mdx" -o -name "*.md" \) \
  -exec sed -i.bak \
    -e 's|@wjptz/suncode@beta|@wjptz/suncode@rc|g' \
    -e 's|`@beta`|`@rc`|g' \
    {} +
find rc zh/rc -type f -name "*.bak" -delete

cat <<'NEXT'
→ Renamed beta/ → rc/. Tag scrub @beta → @rc applied inside rc/* content.
→ Manual followups:
  1. Edit docs.json: rename "Beta" version label → "RC"
  2. Edit docs.json: update each page entry beta/* → rc/*
  3. Edit docs.json: update banner text
  4. Review the @beta scrub diff for false positives
  5. git add . && git commit + push
NEXT
