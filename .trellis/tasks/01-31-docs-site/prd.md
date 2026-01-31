# Build Trellis Documentation Site

## Goal

完成 Trellis 文档站的内容，包括使用教程、模板文档、FAQ 等。

---

## Roadmap Reference (v0 第4项)

- [x] 项目结构搭建（Mintlify）
- [x] marketplace 目录配置
- [ ] a. how to use trellis
- [ ] b. Q & A
- [ ] c. contribute 指南
- [ ] d. cool project
- [ ] e. template
  - [ ] i. spec
  - [ ] ii. slash command
  - [ ] iii. skill
  - [ ] iv. 魔改 trellis 模板

---

## Documentation Structure

```
docs/
├── index.mdx                    # 首页
├── quickstart.mdx               # 快速开始
├── concepts/                    # 核心概念
│   ├── overview.mdx
│   ├── workflow.mdx
│   ├── workspace.mdx
│   ├── tasks.mdx
│   ├── specs.mdx
│   └── hooks.mdx
├── guides/                      # 使用指南
│   ├── daily-workflow.mdx
│   ├── multi-agent.mdx
│   ├── cursor-usage.mdx
│   └── customization.mdx
├── templates/                   # 模板文档
│   ├── index.mdx
│   ├── spec.mdx
│   ├── slash-command.mdx
│   ├── skill.mdx
│   └── agent.mdx
├── showcase.mdx                 # Cool Projects
├── faq.mdx                      # Q & A
└── contributing.mdx             # 贡献指南
```

---

## Tasks Breakdown

### Phase 1: Core Content

1. 重写 `index.mdx` - Trellis 介绍
2. 重写 `quickstart.mdx` - 快速开始指南
3. 创建 `concepts/` 核心概念文档

### Phase 2: Guides

4. 创建 `guides/` 使用指南

### Phase 3: Templates

5. 创建 `templates/` 模板文档
6. 填充 `marketplace/` 可下载模板

### Phase 4: Community

7. 创建 `faq.mdx`
8. 创建 `contributing.mdx`
9. 创建 `showcase.mdx`

### Phase 5: Polish

10. 更新 `docs.json` 导航配置
11. 清理 Mintlify 模板残留内容

---

## Acceptance Criteria

- [ ] 文档覆盖 Trellis 核心功能
- [ ] marketplace/ 有可下载的模板
- [ ] 本地 `pnpm dev` 无报错
- [ ] 导航结构清晰
