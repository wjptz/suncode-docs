#!/bin/bash
# docs-promote.sh — promote dev tree (rc/ or beta/) to stable (root)
#
# Lifecycle stage: T2 → T3 (release+rc → release-only)
# Also valid for T1 → T3 if shipping a beta straight to GA without RC.
#
# What it does:
#   1. Detects which dev subdir exists (rc/ preferred over beta/)
#   2. Overwrites root versioned content with dev content (start/, advanced/, index.mdx)
#   3. Mirrors the swap in zh/
#   4. Removes the dev subdir + its zh mirror
#
# What you still do manually after:
#   1. Edit docs.json: drop the dev version block from the versions array
#      (or, if collapsing to single-version layout, remove versions wrapping entirely)
#   2. Edit docs.json: drop or update the banner
#   3. Edit docs.json navbar changelog href to /changelog/v<NEW_GA>
#   4. Scrub any @beta / @rc references that leaked into now-stable content
#   5. git add . && git commit + push
#
# Usage: ./scripts/docs-promote.sh
set -euo pipefail
cd "$(dirname "$0")/.."

if [ -d "rc" ]; then
  DEV="rc"
elif [ -d "beta" ]; then
  DEV="beta"
else
  echo "✖ No dev subdir found (expected rc/ or beta/)" >&2
  exit 1
fi

echo "→ Promoting $DEV/ → root"

DIRS=(start advanced)
FILES=(index.mdx)

for DIR in "${DIRS[@]}"; do
  if [ -d "$DEV/$DIR" ]; then
    rm -rf "$DIR"
    cp -r "$DEV/$DIR" .
  fi
  if [ -d "zh/$DEV/$DIR" ]; then
    rm -rf "zh/$DIR"
    cp -r "zh/$DEV/$DIR" "zh/"
  fi
done

for FILE in "${FILES[@]}"; do
  [ -f "$DEV/$FILE" ] && cp "$DEV/$FILE" .
  [ -f "zh/$DEV/$FILE" ] && cp "zh/$DEV/$FILE" "zh/"
done

# Wipe dev tree
git rm -rf "$DEV/" "zh/$DEV/" 2>/dev/null || rm -rf "$DEV/" "zh/$DEV/"

cat <<'NEXT'
→ Done. Manual followups:
  1. Edit docs.json: drop the dev (Beta/RC) version block from versions[]
  2. Edit docs.json: drop/update the banner
  3. Edit docs.json: update navbar changelog href to /changelog/v<NEW_GA>
  4. Scrub @beta/@rc references in promoted content
  5. git add . && git commit + push
NEXT
