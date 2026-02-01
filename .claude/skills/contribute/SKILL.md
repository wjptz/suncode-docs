---
name: contribute
description: |
  Guide for contributing to Trellis documentation. Use when someone wants to:
  - Add a new spec template
  - Add a new skill to the marketplace
  - Add or update documentation pages
  - Submit a PR to this project
---

# Contributing to Trellis Docs

This skill guides you through contributing to the Trellis documentation project.

## Project Structure

```
docs/
├── docs.json              # Navigation config (MUST update for new pages)
├── guides/                # English guide pages
├── zh/guides/             # Chinese guide pages
├── templates/             # English template pages
├── zh/templates/          # Chinese template pages
├── skills-market/         # English skill pages
├── zh/skills-market/      # Chinese skill pages
└── marketplace/           # Downloadable assets
    ├── specs/             # Spec template directories
    └── skills/            # Skill directories (future)
```

## Contributing a Spec Template

### 1. Create template directory

```
marketplace/specs/your-template-name/
├── README.md              # Template overview
├── frontend/
│   ├── index.md
│   └── ...
├── backend/
│   ├── index.md
│   └── ...
└── guides/
    └── index.md
```

### 2. Create documentation pages (both languages)

**English**: `templates/specs-your-template.mdx`
**Chinese**: `zh/templates/specs-your-template.mdx`

Use this frontmatter:

```yaml
---
title: 'Your Template Name'
description: 'Brief description'
---
```

### 3. Update navigation in docs.json

Find the `templates` group and add your page:

```json
{
  "group": "Spec Templates",
  "pages": [
    "templates/specs-index",
    "templates/specs-electron",
    "templates/specs-your-template" // Add here
  ]
}
```

Do the same for Chinese navigation under the `zh` anchor.

### 4. Update the overview page

Add your template to the table in:

- `templates/specs-index.mdx`
- `zh/templates/specs-index.mdx`

## Contributing a Skill

### 1. Create skill directory

```
marketplace/skills/your-skill/
├── SKILL.md               # Skill definition (required)
├── references/            # Reference docs (optional)
└── README.md              # Overview (optional)
```

### 2. Create documentation pages

**English**: `skills-market/your-skill.mdx`
**Chinese**: `zh/skills-market/your-skill.mdx`

### 3. Update navigation in docs.json

Find the `skills-market` group and add your page.

### 4. Update the overview page

Add your skill to the table in:

- `skills-market/index.mdx`
- `zh/skills-market/index.mdx`

## Contributing Documentation

### Adding a new guide

1. Create the page in `guides/your-guide.mdx`
2. Create Chinese version in `zh/guides/your-guide.mdx`
3. Update `docs.json` navigation for both languages

### Updating existing pages

1. Find the file in `guides/` or `zh/guides/`
2. Make your changes
3. Ensure both language versions stay in sync

## Bilingual Requirements

**All user-facing content must have both English and Chinese versions.**

- English: root directories (`guides/`, `templates/`, etc.)
- Chinese: under `zh/` (`zh/guides/`, `zh/templates/`, etc.)

## Navigation (docs.json)

The `docs.json` file controls all navigation. Structure:

```json
{
  "anchors": [...],
  "tabs": [
    {
      "tab": "Guides",
      "groups": [
        {
          "group": "Group Name",
          "pages": ["path/to/page"]
        }
      ]
    }
  ]
}
```

**Important**: Pages won't appear in navigation until added to `docs.json`.

## Submitting a PR

1. Fork the repo
2. Create a branch: `git checkout -b feat/your-contribution`
3. Make changes following this guide
4. Test locally: `mintlify dev`
5. Commit with clear message
6. Push and create PR to `main` branch

## Checklist Before PR

- [ ] Both EN and ZH versions created
- [ ] `docs.json` updated for both languages
- [ ] Overview/index pages updated with new entries
- [ ] Local preview tested (`mintlify dev`)
- [ ] No broken links
- [ ] Code blocks have correct language tags
