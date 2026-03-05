# 迁移 index.json 到统一位置

## 背景

Trellis CLI 的远程模板功能设计已更新，需要支持多种模板类型（spec、skill、command、full），因此需要一个统一的索引文件。

## 关联任务

- Trellis 仓库: `02-05-remote-template-init`

## 需要做的事

### 1. 删除旧文件

```
marketplace/specs/index.json  ← 删除
```

### 2. 创建新文件

**位置**: `marketplace/index.json`

**内容**:

```json
{
  "version": 1,
  "templates": [
    {
      "id": "electron-fullstack",
      "type": "spec",
      "name": "Electron + React + TypeScript",
      "description": "Full-stack Electron desktop app with React frontend and SQLite backend",
      "path": "marketplace/specs/electron-fullstack",
      "tags": ["electron", "react", "typescript", "sqlite"]
    }
  ]
}
```

### 变更说明

| 字段      | 说明                                      |
| --------- | ----------------------------------------- |
| `version` | 新增，Schema 版本号                       |
| `type`    | 新增，模板类型（spec/skill/command/full） |
| 其他字段  | 与原来一致                                |

## 为什么要改

1. **扩展性**：未来会有 skill、command、full 等类型模板
2. **统一入口**：CLI 只需请求一个索引文件
3. **自动识别**：根据 `type` 字段决定安装位置

## Acceptance Criteria

- [ ] `marketplace/specs/index.json` 已删除
- [ ] `marketplace/index.json` 已创建
- [ ] JSON 格式正确，包含 `version` 和 `type` 字段
- [ ] `electron-fullstack` 模板的 `type` 为 `"spec"`
