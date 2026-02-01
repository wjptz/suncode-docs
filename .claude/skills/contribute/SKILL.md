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
│
├── index.mdx              # English homepage
├── quickstart.mdx         # English quickstart
├── zh/index.mdx           # Chinese homepage
├── zh/quickstart.mdx      # Chinese quickstart
│
├── guides/                # English guide pages
├── zh/guides/             # Chinese guide pages
│
├── templates/             # English template pages
├── zh/templates/          # Chinese template pages
│
├── skills-market/         # English skill marketplace pages
├── zh/skills-market/      # Chinese skill marketplace pages
│
├── blog/                  # English tech blog
├── zh/blog/               # Chinese tech blog
│
├── changelog/             # English changelog
├── zh/changelog/          # Chinese changelog
│
├── contribute/            # English contribution guide
├── zh/contribute/         # Chinese contribution guide
│
├── showcase/              # English showcase
├── zh/showcase/           # Chinese showcase
│
├── plugins/               # Claude Code plugins (one plugin per skill)
│   └── trellis-meta/
│       ├── plugin.json
│       └── skills/trellis-meta/
│           └── SKILL.md
│
└── marketplace/           # Other downloadable assets
    └── specs/             # Spec template directories
```

**Note**: Plugin skills follow Claude Code plugin structure. Content in `marketplace/` is excluded from Mintlify rendering.

## Understanding docs.json

The navigation uses a **language-based structure**:

```json
{
  "navigation": {
    "languages": [
      {
        "language": "en",
        "groups": [
          {
            "group": "Getting started",
            "pages": ["index", "quickstart"]
          },
          {
            "group": "Guides",
            "pages": ["guides/specs", "guides/tasks", ...]
          },
          {
            "group": "Resource Marketplace",
            "pages": [
              {
                "group": "Skills",
                "expanded": false,
                "pages": ["skills-market/index", "skills-market/trellis-meta"]
              },
              {
                "group": "Spec Templates",
                "expanded": false,
                "pages": ["templates/specs-index", "templates/specs-electron"]
              }
            ]
          }
        ]
      },
      {
        "language": "zh",
        "groups": [
          // Same structure with zh/ prefix
        ]
      }
    ]
  }
}
```

**Key points**:

- English pages: no prefix (e.g., `guides/specs`)
- Chinese pages: `zh/` prefix (e.g., `zh/guides/specs`)
- Nested groups supported (e.g., Skills inside Resource Marketplace)
- `expanded: false` keeps groups collapsed by default

## Contributing a Spec Template

### 1. Create template directory

```
marketplace/specs/your-template-name/
├── README.md              # Template overview (required)
├── frontend/              # Frontend guidelines
│   ├── index.md
│   └── ...
├── backend/               # Backend guidelines
│   ├── index.md
│   └── ...
├── guides/                # Thinking guides
│   └── ...
└── shared/                # Cross-cutting concerns (optional)
    └── ...
```

Structure varies by stack. Include directories relevant to your template.

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

Find the `Spec Templates` nested group and add your page:

```json
{
  "group": "Spec Templates",
  "expanded": false,
  "pages": ["templates/specs-index", "templates/specs-electron", "templates/specs-your-template"]
}
```

Do the same for Chinese under `"language": "zh"`:

```json
{
  "group": "Spec Templates",
  "expanded": false,
  "pages": [
    "zh/templates/specs-index",
    "zh/templates/specs-electron",
    "zh/templates/specs-your-template"
  ]
}
```

### 4. Update the overview page

Add your template to the table in:

- `templates/specs-index.mdx`
- `zh/templates/specs-index.mdx`

## Contributing a Skill

### 1. Create plugin directory

```
plugins/your-plugin/
├── plugin.json            # Plugin manifest
└── skills/
    └── your-skill/
        ├── SKILL.md       # Skill definition (required)
        └── references/    # Reference docs (optional)
```

### 2. Create plugin.json

```json
{
  "name": "your-plugin",
  "version": "1.0.0",
  "description": "Your plugin description",
  "author": { "name": "Your Name" },
  "skills": ["./skills/"]
}
```

### 3. Register in marketplace.json

Add your plugin to `.claude-plugin/marketplace.json`:

```json
{
  "plugins": [
    {
      "name": "your-plugin",
      "source": "./plugins/your-plugin",
      "description": "Your plugin description"
    }
  ]
}
```

### 4. Create documentation pages

**English**: `skills-market/your-skill.mdx`
**Chinese**: `zh/skills-market/your-skill.mdx`

### 5. Update navigation in docs.json

Find the `Skills` nested group and add your page to both languages.

### 6. Update the overview page

Add your skill to the table in:

- `skills-market/index.mdx`
- `zh/skills-market/index.mdx`

## Contributing Documentation

### Adding a new guide

1. Create the page in `guides/your-guide.mdx`
2. Create Chinese version in `zh/guides/your-guide.mdx`
3. Update `docs.json` - add to `Guides` group in both languages

### Adding a blog post

1. Create the page in `blog/your-post.mdx`
2. Create Chinese version in `zh/blog/your-post.mdx`
3. Update `docs.json` - add to `Tech Blog` group in both languages

### Updating existing pages

1. Find the file in the appropriate directory
2. Make your changes
3. Ensure both language versions stay in sync

## Bilingual Requirements

**All user-facing content must have both English and Chinese versions.**

| Content Type | English Path          | Chinese Path             |
| ------------ | --------------------- | ------------------------ |
| Homepage     | `index.mdx`           | `zh/index.mdx`           |
| Guides       | `guides/*.mdx`        | `zh/guides/*.mdx`        |
| Templates    | `templates/*.mdx`     | `zh/templates/*.mdx`     |
| Skills       | `skills-market/*.mdx` | `zh/skills-market/*.mdx` |
| Blog         | `blog/*.mdx`          | `zh/blog/*.mdx`          |
| Changelog    | `changelog/*.mdx`     | `zh/changelog/*.mdx`     |

## Development Setup

```bash
# Install dependencies
pnpm install

# Start local dev server
pnpm dev

# Check markdown lint
pnpm lint:md

# Verify docs structure
pnpm verify

# Format files
pnpm format
```

**Pre-commit hooks**: The project uses husky with lint-staged. On commit:

- Markdown files are auto-linted and formatted
- `verify-docs.py` checks docs.json and frontmatter

## MDX Components

Mintlify supports MDX components. Common ones:

```mdx
<Card title="Title" icon="download" href="/path">
  Card content here
</Card>

<CardGroup cols={2}>
  <Card>...</Card>
  <Card>...</Card>
</CardGroup>

<Accordion title="Click to expand">Hidden content</Accordion>

<AccordionGroup>
  <Accordion>...</Accordion>
</AccordionGroup>
```

Inline HTML is allowed (MDX). See [Mintlify docs](https://mintlify.com/docs/components) for all components.

## Submitting a PR

1. Fork the repo on GitHub: `https://github.com/mindfold-ai/docs`
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/docs.git`
3. Install dependencies: `pnpm install`
4. Create a branch: `git checkout -b feat/your-contribution`
5. Make changes following this guide
6. Test locally: `pnpm dev`
7. Commit with conventional message (e.g., `docs: add xxx template`)
8. Push to your fork and create PR to original repo's `main` branch

## Checklist Before PR

- [ ] Both EN and ZH versions created
- [ ] `docs.json` updated for both languages
- [ ] Overview/index pages updated with new entries
- [ ] Local preview tested (`pnpm dev`)
- [ ] No broken links
- [ ] Code blocks have correct language tags
- [ ] Frontmatter includes title and description
- [ ] Images placed in `images/` directory (if any)
