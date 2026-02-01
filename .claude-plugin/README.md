# Mindfold Docs Plugin

This directory contains the Claude Code plugin manifest for the Mindfold documentation marketplace.

## Installation

```bash
/plugin marketplace add mindfold-ai/docs
```

## Available Plugins

### trellis-meta

Meta-skill for understanding and customizing Trellis - the AI workflow system for Claude Code and Cursor.

**Features:**

- Complete Trellis architecture documentation
- Customization guides for commands, agents, hooks, and specs
- Platform compatibility matrix (Claude Code vs Cursor)
- Self-iteration protocol for recording modifications

## Plugin Structure

```
.claude-plugin/
├── marketplace.json   # Marketplace manifest
├── plugin.json        # Plugin definition
└── README.md          # This file

marketplace/skills/
└── trellis-meta/      # Skill source
    ├── SKILL.md       # Skill definition
    └── references/    # Reference documentation
```

## Schema Notes

The Claude plugin validator enforces strict constraints:

- `version` field is required in plugin.json
- Component fields (`skills`, `agents`, `commands`) must be arrays
- `agents` must use explicit file paths, not directories
- Do NOT add a `hooks` field - hooks.json is auto-loaded by convention

See [PLUGIN_SCHEMA_NOTES.md](https://github.com/affaan-m/everything-claude-code/blob/main/.claude-plugin/PLUGIN_SCHEMA_NOTES.md) for detailed documentation.
