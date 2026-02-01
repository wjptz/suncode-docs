Read the documentation guidelines before starting your writing task.

---

## ⚠️ Critical Reminder

**Mintlify does NOT auto-discover pages.** When adding new pages:

1. Create the `.mdx` file
2. Create the Chinese version in `zh/` directory
3. **Manually update `docs.json`** - add to BOTH English and Chinese navigation
4. Test with `pnpm dev`

Without step 3, pages won't appear in the sidebar!

### Example: Adding a New Spec Template

When adding a new spec template (e.g., "Next.js"):

1. Create `templates/specs-nextjs.mdx` (English)
2. Create `zh/templates/specs-nextjs.mdx` (Chinese)
3. Update `docs.json` navigation in BOTH languages:

```json
{
  "group": "Spec Templates",
  "expanded": false,
  "pages": [
    "templates/specs-index",
    "templates/specs-electron",
    "templates/specs-nextjs" // ← Add new template here
  ]
}
```

The sidebar will then show:

```
Spec Templates
├── Overview
├── Electron + React + TypeScript
└── Next.js  ← New template appears here
```

---

## Guidelines to Read

Execute these steps:

1. Read `.trellis/spec/docs/index.md` to understand available guidelines
2. Based on your task, read the relevant guideline files:
   - New page → `.trellis/spec/docs/directory-structure.md`
   - MDX content → `.trellis/spec/docs/mdx-guidelines.md`
   - Navigation changes → `.trellis/spec/docs/config-guidelines.md`
   - Writing style → `.trellis/spec/docs/style-guide.md`
3. Understand the documentation standards you need to follow
4. Then proceed with your writing plan

This step is **mandatory** before creating or editing any documentation.
