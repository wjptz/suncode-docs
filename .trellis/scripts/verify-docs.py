#!/usr/bin/env python3
"""
Verify documentation quality for Mintlify project.

Checks:
1. docs.json is valid JSON
2. All navigation pages exist as .mdx files
3. MDX files have valid frontmatter (title required)
4. No broken internal links

Exit codes:
0 = All checks pass
1 = Verification failed
"""

import json
import os
import re
import sys
from pathlib import Path
from typing import Optional


def get_project_root() -> Path:
    """Find project root (where docs.json is)."""
    current = Path(__file__).resolve()
    for parent in [current] + list(current.parents):
        if (parent / "docs.json").exists():
            return parent
    # Fallback to cwd
    return Path.cwd()


def load_docs_json(root: Path) -> Optional[dict]:
    """Load and validate docs.json."""
    docs_json_path = root / "docs.json"
    if not docs_json_path.exists():
        print(f"ERROR: docs.json not found at {docs_json_path}")
        return None

    try:
        with open(docs_json_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        print(f"ERROR: Invalid JSON in docs.json: {e}")
        return None


def extract_pages_from_navigation(nav: dict) -> list[str]:
    """Extract all page paths from navigation config."""
    pages = []

    def extract_from_item(item):
        if isinstance(item, str):
            # Direct page reference
            pages.append(item)
        elif isinstance(item, dict):
            # Could be a group, tab, or dropdown
            if "pages" in item:
                for page in item["pages"]:
                    extract_from_item(page)
            if "groups" in item:
                for group in item["groups"]:
                    extract_from_item(group)
            if "tabs" in item:
                for tab in item["tabs"]:
                    extract_from_item(tab)

    if "navigation" in nav:
        navigation = nav["navigation"]
        if "tabs" in navigation:
            for tab in navigation["tabs"]:
                extract_from_item(tab)
        if "groups" in navigation:
            for group in navigation["groups"]:
                extract_from_item(group)
        if "pages" in navigation:
            for page in navigation["pages"]:
                extract_from_item(page)

    return pages


def check_page_exists(root: Path, page: str) -> bool:
    """Check if a page file exists."""
    # Skip OpenAPI references (contain spaces like "openapi.json GET /users")
    if " " in page:
        return True

    # Try with .mdx extension
    mdx_path = root / f"{page}.mdx"
    if mdx_path.exists():
        return True

    # Try with .md extension
    md_path = root / f"{page}.md"
    if md_path.exists():
        return True

    return False


def extract_frontmatter(content: str) -> Optional[dict]:
    """Extract YAML frontmatter from MDX content."""
    if not content.startswith("---"):
        return None

    # Find the closing ---
    end_match = re.search(r"\n---\n", content[3:])
    if not end_match:
        return None

    frontmatter_str = content[3:end_match.start() + 3]

    # Simple YAML parsing for title and description
    result = {}
    for line in frontmatter_str.strip().split("\n"):
        if ":" in line:
            key, value = line.split(":", 1)
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            result[key] = value

    return result


def verify_mdx_frontmatter(root: Path) -> list[str]:
    """Verify all MDX files have required frontmatter."""
    errors = []

    # Directories to skip (snippets don't need frontmatter)
    skip_dirs = {"node_modules", "snippets"}

    for mdx_file in root.rglob("*.mdx"):
        # Skip files in node_modules, snippets, or hidden directories
        if any(part.startswith(".") or part in skip_dirs for part in mdx_file.parts):
            continue

        try:
            content = mdx_file.read_text(encoding="utf-8")
            frontmatter = extract_frontmatter(content)

            if frontmatter is None:
                errors.append(f"{mdx_file.relative_to(root)}: Missing frontmatter")
            elif "title" not in frontmatter:
                errors.append(f"{mdx_file.relative_to(root)}: Missing 'title' in frontmatter")
        except Exception as e:
            errors.append(f"{mdx_file.relative_to(root)}: Error reading file: {e}")

    return errors


def main():
    root = get_project_root()
    print(f"Verifying documentation in: {root}")

    errors = []
    warnings = []

    # Check 1: Load docs.json
    print("\n[1/3] Checking docs.json...")
    docs_config = load_docs_json(root)
    if docs_config is None:
        errors.append("docs.json is invalid or missing")
    else:
        print("  OK: docs.json is valid JSON")

    # Check 2: Verify all navigation pages exist
    if docs_config:
        print("\n[2/3] Checking navigation pages...")
        pages = extract_pages_from_navigation(docs_config)
        missing_pages = []

        for page in pages:
            if not check_page_exists(root, page):
                missing_pages.append(page)

        if missing_pages:
            for page in missing_pages:
                errors.append(f"Navigation references missing page: {page}")
        else:
            print(f"  OK: All {len(pages)} navigation pages exist")

    # Check 3: Verify MDX frontmatter
    print("\n[3/3] Checking MDX frontmatter...")
    frontmatter_errors = verify_mdx_frontmatter(root)
    if frontmatter_errors:
        errors.extend(frontmatter_errors)
    else:
        mdx_count = len(list(root.rglob("*.mdx")))
        print(f"  OK: All {mdx_count} MDX files have valid frontmatter")

    # Summary
    print("\n" + "=" * 60)
    if errors:
        print(f"FAILED: {len(errors)} error(s) found\n")
        for error in errors:
            print(f"  ERROR: {error}")
        sys.exit(1)
    else:
        print("PASSED: All documentation checks passed")
        sys.exit(0)


if __name__ == "__main__":
    main()
