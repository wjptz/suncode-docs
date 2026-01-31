# Configuration Guidelines

> docs.json configuration patterns and conventions.

---

## File Location

Main configuration file: `docs.json` (project root)

---

## Schema Reference

```json
{
  "$schema": "https://mintlify.com/docs.json"
}
```

Always include the schema for editor autocomplete.

---

## Core Configuration

### Theme and Branding

```json
{
  "theme": "mint",
  "name": "Project Name",
  "colors": {
    "primary": "#16A34A",
    "light": "#07C983",
    "dark": "#15803D"
  },
  "favicon": "/favicon.svg",
  "logo": {
    "light": "/logo/light.svg",
    "dark": "/logo/dark.svg"
  }
}
```

### Color Guidelines

| Color     | Purpose           | Format                |
| --------- | ----------------- | --------------------- |
| `primary` | Main brand color  | Hex (e.g., `#16A34A`) |
| `light`   | Light mode accent | Hex                   |
| `dark`    | Dark mode accent  | Hex                   |

---

## Navigation

### Tab-Based Navigation

```json
{
  "navigation": {
    "tabs": [
      {
        "tab": "Guides",
        "groups": [
          {
            "group": "Getting Started",
            "pages": ["index", "quickstart", "development"]
          }
        ]
      },
      {
        "tab": "API Reference",
        "groups": [
          {
            "group": "Endpoints",
            "pages": ["api-reference/introduction"]
          }
        ]
      }
    ]
  }
}
```

### Group-Based Navigation

```json
{
  "navigation": {
    "groups": [
      {
        "group": "Getting Started",
        "pages": ["index", "quickstart"]
      },
      {
        "group": "Guides",
        "pages": ["essentials/settings", "essentials/navigation"]
      }
    ]
  }
}
```

### Page References

| Format           | Example                     |
| ---------------- | --------------------------- |
| Root page        | `"index"`                   |
| Nested page      | `"essentials/settings"`     |
| OpenAPI endpoint | `"openapi.json GET /users"` |

---

## Global Elements

### Anchors (Sidebar Links)

```json
{
  "navigation": {
    "global": {
      "anchors": [
        {
          "anchor": "Documentation",
          "href": "https://example.com/docs",
          "icon": "book-open-cover"
        },
        {
          "anchor": "GitHub",
          "href": "https://github.com/example",
          "icon": "github"
        }
      ]
    }
  }
}
```

### Navbar

```json
{
  "navbar": {
    "links": [
      {
        "label": "Support",
        "href": "mailto:support@example.com"
      }
    ],
    "primary": {
      "type": "button",
      "label": "Dashboard",
      "href": "https://dashboard.example.com"
    }
  }
}
```

### Footer

```json
{
  "footer": {
    "socials": {
      "x": "https://x.com/example",
      "github": "https://github.com/example",
      "linkedin": "https://linkedin.com/company/example"
    }
  }
}
```

---

## API Documentation

### OpenAPI Integration

```json
{
  "navigation": {
    "tabs": [
      {
        "tab": "API Reference",
        "groups": [
          {
            "group": "Endpoints",
            "openapi": "api-reference/openapi.json"
          }
        ]
      }
    ]
  }
}
```

---

## Contextual Options

Code block right-click menu options:

```json
{
  "contextual": {
    "options": ["copy", "view", "chatgpt", "claude", "perplexity", "mcp", "cursor", "vscode"]
  }
}
```

---

## Internationalization (i18n)

### Language-Based Navigation

For multi-language support, use `navigation.languages` instead of `navigation.tabs`:

```json
{
  "navigation": {
    "languages": [
      {
        "language": "en",
        "tabs": [
          {
            "tab": "Guides",
            "groups": [
              {
                "group": "Getting Started",
                "pages": ["index", "quickstart"]
              }
            ]
          }
        ]
      },
      {
        "language": "zh",
        "tabs": [
          {
            "tab": "指南",
            "groups": [
              {
                "group": "开始使用",
                "pages": ["zh/index", "zh/quickstart"]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### i18n File Structure

```
docs/
├── index.mdx           # English homepage
├── quickstart.mdx      # English quickstart
├── zh/
│   ├── index.mdx       # Chinese homepage
│   └── quickstart.mdx  # Chinese quickstart
└── docs.json           # Both languages configured
```

> **Important**: Each language needs its own complete navigation structure. Pages in `zh/` must be referenced as `"zh/pagename"` in the navigation.

---

## Custom Styling

### Override Default Styles

Create `styles.css` in project root to customize Mintlify appearance:

```css
/* Example: Hide language switcher flag icons */
img[src*='cloudfront.net/flags'] {
  display: none !important;
}

/* Example: Customize button styles */
button[aria-haspopup='menu'] > div:first-child {
  display: none !important;
}
```

> **Tip**: Use browser DevTools to inspect Mintlify elements and find the right selectors.

---

## Best Practices

### DO

- Include `$schema` for autocomplete
- Organize navigation logically (user journey)
- Use descriptive group names
- Keep tab count reasonable (2-4 tabs)

### DON'T

- Create deeply nested navigation
- Use inconsistent naming between pages and nav
- Forget to add new pages to navigation
- Mix different navigation patterns unnecessarily

---

## Checklist: Adding New Content

1. [ ] Create the `.mdx` file
2. [ ] Add frontmatter with title and description
3. [ ] Add page to appropriate group in `docs.json`
4. [ ] Verify navigation order makes sense
5. [ ] Test locally with `mintlify dev`
