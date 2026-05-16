# AI Prompts（给 Claude / 人工优化用）

所有线上 AI 文案集中在此目录，改 `.md` 后重启本地 `api` 或重新 Deploy Vercel。

| 文件 | 用途 |
|------|------|
| `personas-hr.md` | JD 定制 · HR 视角人设 |
| `personas-curator.md` | JD 定制 · 策展人视角 |
| `personas-immigration.md` | JD 定制 · 移民/EB-1 视角 |
| `tailor-schema.md` | 定制输出 JSON 结构 |
| `tailor-rules.md` | 定制通用规则 |
| `compose.md` | 求职信 system prompt |
| `parse-schema.md` | 上传解析 JSON 结构 |
| `parse-system.md` | 上传解析 system 说明 |
| `rewrite.md` | 单块重写 |
| `screen-system.md` | **HR 初筛检视**（ATS + 三视角 + 一句话 hook） |
| `screen-schema.md` | 初筛输出 JSON 结构 |

加载逻辑：`api/lib/prompts/loadPrompt.js`
