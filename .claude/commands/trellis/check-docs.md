Check if the documentation you just wrote follows the documentation guidelines.

Execute these steps:

1. Run `git status` to see modified files
2. Read `.trellis/spec/docs/index.md` to understand which guidelines apply
3. Based on what you changed, read the relevant guideline files:
   - New/moved files → `.trellis/spec/docs/directory-structure.md`
   - MDX content → `.trellis/spec/docs/mdx-guidelines.md`
   - docs.json changes → `.trellis/spec/docs/config-guidelines.md`
   - Any content → `.trellis/spec/docs/style-guide.md`
4. Review your changes against the guidelines
5. Run verification: `python3 .trellis/scripts/verify-docs.py`
6. Report any violations and fix them if found
