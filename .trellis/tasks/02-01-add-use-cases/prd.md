# Add Use Cases Category to Docs Navigation

## Goal

Add a new "Use Cases" navigation category in the Mintlify docs site, positioned after the "Guides" section.

## Background

Currently the navigation structure is:

- Getting Started
- **Guides** (Writing specs, Managing tasks, Slash commands, Parallel Sessions, FAQ)
- Resource Marketplace
- Community

We want to add a "Use Cases" section to showcase real-world usage scenarios of Trellis.

## Requirements

### 1. Navigation Configuration

- Add "Use Cases" group in `docs.json` after the "Guides" section
- Support both English (`Use Cases`) and Chinese (`使用场景`) navigation

### 2. Page Structure

Create the following pages:

- `use-cases/index.mdx` - Overview page listing all use cases
- (Future: individual use case pages as content is added)

### 3. Bilingual Support

- English: `use-cases/` directory
- Chinese: `zh/use-cases/` directory

## Technical Notes

### Configuration Location

- File: `docs.json`
- English Guides section: lines 29-38
- Chinese Guides section: lines 91-98

### File Structure

```
docs/
├── use-cases/
│   └── index.mdx          # English overview
└── zh/
    └── use-cases/
        └── index.mdx      # Chinese overview
```

## Acceptance Criteria

- [ ] New "Use Cases" group appears in navigation after "Guides"
- [ ] English navigation shows "Use Cases"
- [ ] Chinese navigation shows "使用场景"
- [ ] Index page exists for both languages
- [ ] `mintlify dev` runs without errors
