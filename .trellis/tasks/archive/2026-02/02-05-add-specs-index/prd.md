# 添加 marketplace/specs/index.json 模板索引

## Goal

为 Trellis CLI 的远程模板初始化功能提供模板索引文件，让 `trellis init` 能够发现和列出可用的 spec 模板。

## 关联任务

- Trellis 仓库: `02-05-remote-template-init` - CLI 端实现

## Requirements

- 在 `marketplace/specs/` 目录下添加 `index.json`
- 列出当前可用的模板（目前只有 `electron-fullstack`）
- 遵循约定的 JSON schema

## 文件内容

```json
{
  "version": 1,
  "templates": [
    {
      "id": "electron-fullstack",
      "name": "Electron + React + TypeScript",
      "description": "Full-stack Electron desktop app with React frontend and SQLite backend",
      "path": "marketplace/specs/electron-fullstack",
      "tags": ["electron", "react", "typescript", "sqlite"]
    }
  ]
}
```

## 字段说明

| 字段                      | 类型     | 必填 | 用途                             |
| ------------------------- | -------- | ---- | -------------------------------- |
| `version`                 | number   | ✅   | Schema 版本，便于未来扩展        |
| `templates[].id`          | string   | ✅   | CLI 参数标识符 `--template <id>` |
| `templates[].name`        | string   | ✅   | 交互式列表显示名称               |
| `templates[].description` | string   | ❌   | 简短描述                         |
| `templates[].path`        | string   | ✅   | 相对于仓库根目录的路径           |
| `templates[].tags`        | string[] | ❌   | 分类标签（未来过滤用）           |

## Acceptance Criteria

- [ ] `marketplace/specs/index.json` 文件存在
- [ ] JSON 格式正确，可被解析
- [ ] `electron-fullstack` 模板已列出
- [ ] `path` 字段指向正确的目录

## Out of Scope

- 添加新模板（本任务只添加索引文件）
- 模板内容修改
