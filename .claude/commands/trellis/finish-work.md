# Finish Work - Pre-Commit Checklist

Before submitting or committing, use this checklist to ensure work completeness.

**Timing**: After documentation is written and reviewed, before commit

---

## Checklist

### 1. Documentation Quality

```bash
# Must pass
python3 .trellis/scripts/verify-docs.py
```

- [ ] `verify-docs.py` passes with 0 errors?
- [ ] All MDX files have `title` and `description` frontmatter?
- [ ] Navigation in `docs.json` points to existing pages?
- [ ] No broken internal links?

### 2. Content Review

- [ ] Titles are clear and descriptive?
- [ ] Descriptions are under 160 characters (SEO)?
- [ ] Headings follow hierarchy (H2 > H3)?
- [ ] Code examples are correct and tested?
- [ ] Components used appropriately (Card, Tabs, etc.)?

### 3. Structure Sync

**Spec Docs**:

- [ ] Does `.trellis/spec/docs/` need updates?
  - New patterns, new components used, new conventions

**Key Question**:

> "Did I discover something about Mintlify that should be documented for future reference?"

If YES -> Update the relevant spec doc.

### 4. Navigation Changes

If you modified `docs.json`:

- [ ] Navigation order makes sense (user journey)?
- [ ] Group names are descriptive?
- [ ] No orphaned pages (not in navigation)?
- [ ] Tab structure is logical?

### 5. Visual Check

```bash
# Start local preview
mintlify dev
```

- [ ] Page renders correctly in browser?
- [ ] Components display as expected?
- [ ] Code blocks have syntax highlighting?
- [ ] Images load correctly?

---

## Quick Check Flow

```bash
# 1. Verify documentation
python3 .trellis/scripts/verify-docs.py

# 2. View changes
git status
git diff --name-only

# 3. Preview locally
mintlify dev

# 4. Based on changed files, check relevant items above
```

---

## Common Oversights

| Oversight              | Consequence             | Check                |
| ---------------------- | ----------------------- | -------------------- |
| Missing frontmatter    | Page won't render title | Check all .mdx files |
| Page not in navigation | Users can't find it     | Check docs.json      |
| Broken link            | 404 error               | Run verify-docs.py   |
| Missing description    | Poor SEO                | Check frontmatter    |
| Wrong heading level    | Broken TOC              | Check H2/H3 usage    |

---

## Relationship to Other Commands

```
Documentation Flow:
  Write docs -> Preview -> /trellis:finish-work -> git commit -> /trellis:record-session
                              |                              |
                       Ensure completeness              Record progress
```

- `/trellis:before-docs-dev` - Read guidelines before writing
- `/trellis:check-docs` - Verify against guidelines
- `/trellis:finish-work` - Check work completeness (this command)
- `/trellis:record-session` - Record session and commits

---

## Core Principle

> **Good documentation = Clear content + Valid structure + Proper metadata**

Complete work = Content + Frontmatter + Navigation + Verification
