#!/usr/bin/env node
/**
 * docs.json sync linter.
 *
 * When the site has both a Beta and a Release version block, the groups that
 * are NOT version-specific (Use Cases, Resource Marketplace, Community —
 * which contains the Changelog) must list identical pages under each
 * version. Mintlify treats versions as independent navigation trees, so
 * appending a new entry under one block silently leaves the other block
 * stale. This script fails fast when those "shared" groups diverge.
 *
 * Versioned groups (Start Here, Advanced) are NOT compared — they
 * legitimately differ (Beta uses `beta/*` paths, Release uses root paths).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_JSON = path.join(__dirname, '..', 'docs.json');

// Shared group names per language. Keep both EN and ZH labels so the same
// list works regardless of which language the version block is under.
const SHARED_GROUPS = new Set([
  'Use Cases',
  'Resource Marketplace',
  'Community',
  '应用场景',
  '资源市场',
  '社区',
]);

function findVersion(versions, name) {
  return versions.find((v) => v.version === name);
}

function findGroup(groups, name) {
  return groups.find((g) => g.group === name);
}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function main() {
  const docs = JSON.parse(fs.readFileSync(DOCS_JSON, 'utf-8'));
  const errors = [];

  for (const lang of docs.navigation?.languages ?? []) {
    const beta = findVersion(lang.versions, 'Beta');
    const release = findVersion(lang.versions, 'Release');
    if (!beta || !release) continue; // single-version state; nothing to sync

    const sharedNames = lang.versions
      .flatMap((v) => v.groups.map((g) => g.group))
      .filter((n) => SHARED_GROUPS.has(n));

    for (const name of new Set(sharedNames)) {
      const bg = findGroup(beta.groups, name);
      const rg = findGroup(release.groups, name);

      if (!bg && !rg) continue;
      if (!bg || !rg) {
        errors.push(`[${lang.language}] group "${name}" exists only in ${bg ? 'Beta' : 'Release'}`);
        continue;
      }

      if (!deepEqual(bg.pages, rg.pages)) {
        errors.push(`[${lang.language}] group "${name}" pages diverge between Beta and Release`);
      }
    }
  }

  if (errors.length > 0) {
    console.error('\n❌ docs.json shared groups out of sync between Beta and Release:\n');
    for (const e of errors) console.error('  - ' + e);
    console.error(
      "\nFix: copy the diverged group's pages array from one version block\n" +
        'to the other so both list identical entries. Versioned groups\n' +
        '(Start Here, Advanced) are excluded from this check.\n'
    );
    process.exit(1);
  }

  console.log('✓ docs.json Beta/Release shared groups are in sync');
}

main();
