---
name: trellis-local
description: |
  Project-specific Trellis customizations for Trellis Documentation Website.
  This skill documents modifications made to the vanilla Trellis system
  in this project. Inherits from trellis-meta for base documentation.
---

# Trellis Local - Trellis Documentation Website

## Project Info

| Item             | Value                                    |
| ---------------- | ---------------------------------------- |
| **Project Type** | Mintlify Documentation Site              |
| **Purpose**      | Online documentation website for Trellis |
| **Framework**    | Mintlify                                 |

## Base Version

- Trellis version: 0.3.0-beta.5 (from trellis-meta)
- Date initialized: 2026-01-31

---

## Customizations

### Spec Category Changed

#### Replaced: `frontend/` and `backend/` with `docs/`

Since this is a documentation project (not a code project), the standard frontend/backend specs were replaced with documentation-specific specs.

**Removed:**

- `.trellis/spec/frontend/` - Not applicable (no frontend code)
- `.trellis/spec/backend/` - Not applicable (no backend code)

**Added:**

- `.trellis/spec/docs/` - Mintlify documentation guidelines

| File                          | Purpose                               |
| ----------------------------- | ------------------------------------- |
| `docs/index.md`               | Documentation guidelines index        |
| `docs/directory-structure.md` | File organization, naming conventions |
| `docs/mdx-guidelines.md`      | MDX syntax, frontmatter, components   |
| `docs/config-guidelines.md`   | docs.json configuration patterns      |
| `docs/style-guide.md`         | Writing style, content standards      |

### Commands Changed

#### Added: `/trellis:before-docs-dev`

- **File**: `.claude/commands/trellis/before-docs-dev.md`
- **Purpose**: Read documentation guidelines before writing
- **Replaces**: `before-frontend-dev.md`, `before-backend-dev.md`

#### Added: `/trellis:check-docs`

- **File**: `.claude/commands/trellis/check-docs.md`
- **Purpose**: Verify documentation against guidelines
- **Replaces**: `check-frontend.md`, `check-backend.md`

#### Modified: `/trellis:finish-work`

- **File**: `.claude/commands/trellis/finish-work.md`
- **Change**: Adapted checklist for documentation projects
- **Replaces**: Code-focused checklist with docs-focused checklist

#### Removed Commands

- `before-frontend-dev.md` - Not applicable
- `before-backend-dev.md` - Not applicable
- `check-frontend.md` - Not applicable
- `check-backend.md` - Not applicable
- `check-cross-layer.md` - Not applicable (no layers in docs)

### Scripts Added

#### `verify-docs.py`

- **File**: `.trellis/scripts/verify-docs.py`
- **Purpose**: Verify documentation quality
- **Checks**:
  1. `docs.json` is valid JSON
  2. All navigation pages exist as `.mdx` files
  3. MDX files have valid frontmatter (title required)

### Configuration Changed

#### `worktree.yaml`

- **Change**: Adapted for documentation project
- **Verify command**: `python3 .trellis/scripts/verify-docs.py`
- **Post-create**: `npm install -g mintlify`

---

## Workflow for This Project

### Documentation Writing Flow

```
1. /trellis:before-docs-dev    # Read guidelines
2. Write/edit MDX files
3. Preview: mintlify dev
4. /trellis:check-docs         # Verify against guidelines
5. /trellis:finish-work        # Pre-commit checklist
6. git commit
7. /trellis:record-session     # Record progress
```

### Key Commands

| Command                    | When to Use                                    |
| -------------------------- | ---------------------------------------------- |
| `/trellis:before-docs-dev` | Before starting any documentation work         |
| `/trellis:check-docs`      | After writing, to verify guidelines compliance |
| `/trellis:finish-work`     | Before committing, final checklist             |

---

## Changelog

### 2026-01-31 - Initial Customization

- Replaced `spec/frontend/` and `spec/backend/` with `spec/docs/`
- Created Mintlify-specific documentation guidelines
- Added `/trellis:before-docs-dev` command
- Added `/trellis:check-docs` command
- Modified `/trellis:finish-work` for documentation projects
- Added `verify-docs.py` script for Ralph Loop
- Updated `worktree.yaml` with documentation-specific config
- Removed inapplicable frontend/backend commands
