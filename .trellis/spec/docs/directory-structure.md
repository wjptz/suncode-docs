# Directory Structure

> File organization and naming conventions for this Mintlify documentation project.

---

## Project Structure

```
docs/
├── docs.json              # Main configuration
├── index.mdx              # Homepage
├── quickstart.mdx         # Quick start guide
├── development.mdx        # Development setup
│
├── essentials/            # Core documentation
│   ├── settings.mdx
│   ├── navigation.mdx
│   ├── markdown.mdx
│   ├── code.mdx
│   ├── images.mdx
│   └── reusable-snippets.mdx
│
├── api-reference/         # API documentation
│   ├── introduction.mdx
│   ├── openapi.json       # OpenAPI specification
│   └── endpoint/
│       ├── get.mdx
│       ├── create.mdx
│       ├── delete.mdx
│       └── webhook.mdx
│
├── ai-tools/              # AI tools guides
│   ├── cursor.mdx
│   ├── claude-code.mdx
│   └── windsurf.mdx
│
├── snippets/              # Reusable content fragments
│   └── snippet-intro.mdx
│
├── images/                # Image assets
│   └── *.png|jpg|gif
│
└── logo/                  # Brand assets
    ├── light.svg
    └── dark.svg
```

---

## Naming Conventions

### Files

| Type        | Convention       | Example               |
| ----------- | ---------------- | --------------------- |
| MDX pages   | `kebab-case.mdx` | `getting-started.mdx` |
| Directories | `kebab-case/`    | `api-reference/`      |
| Images      | `kebab-case.png` | `hero-image.png`      |
| Snippets    | `kebab-case.mdx` | `api-key-setup.mdx`   |

### Directory Organization

| Directory        | Purpose            | When to Use                             |
| ---------------- | ------------------ | --------------------------------------- |
| Root (`/`)       | Top-level pages    | Homepage, quickstart, main entry points |
| `essentials/`    | Core platform docs | Settings, navigation, markdown syntax   |
| `api-reference/` | API documentation  | Endpoints, OpenAPI specs                |
| `snippets/`      | Reusable content   | Content used in multiple pages          |
| `images/`        | Image assets       | Screenshots, diagrams                   |
| `logo/`          | Brand assets       | Light/dark mode logos                   |

---

## Rules

### DO

- Group related pages in directories
- Use descriptive, SEO-friendly file names
- Keep directory nesting shallow (max 2 levels)
- Place reusable content in `snippets/`

### DON'T

- Use underscores in file names (use hyphens)
- Create deeply nested directories
- Mix different content types in same directory
- Use spaces or special characters in names

---

## Adding New Content

### New Page

1. Create `.mdx` file in appropriate directory
2. Add frontmatter with `title` and `description`
3. Add page to `docs.json` navigation

### New Section

1. Create new directory with descriptive name
2. Add pages inside the directory
3. Create a group in `docs.json` navigation

### New Snippet

1. Create `.mdx` file in `snippets/`
2. Reference with `<Snippet file="filename.mdx" />`
