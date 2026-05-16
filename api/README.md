# Resume Portfolio API

轻量 Express 后端，供 Web / Expo 调用。AI 密钥只放在服务端环境变量里。

## 本地运行

```bash
cd api
cp .env.example .env
npm install
npm run dev
```

- 健康检查：`GET /health`
- 浏览量：`GET /api/views` · `POST /api/views`（会话去重由前端 `sessionStorage` 处理）
- JD 定制：`POST /api/tailor` — `{ "cvData", "jobDescription", "persona": "hr"|"curator"|"immigration" }`
- 求职信：`POST /api/compose` — `{ "cvData", "jobDescription", "recipientName?", "company?" }`

## 部署到 Railway

1. [railway.app](https://railway.app) → New Project → Deploy from GitHub → 选 `ResumePortfolio`  
2. **Root Directory**：`api`  
3. **Start Command**：`npm start`（或 Railway 自动检测）  
4. Variables（示例）：
   - `PORT` → Railway 会自动注入，一般不必手写  
   - `CORS_ORIGIN` → `https://你的域名.vercel.app`  
   - `ARK_API_KEY` — 豆包 / [火山方舟](https://www.volcengine.com/docs/82379/1541594?lang=zh)（优先）
   - `ARK_MODEL` — 默认 `doubao-seed-2-0-pro-260215`（可换更便宜的接入点模型 ID）
   - `OPENAI_API_KEY` — 未配置 Ark 时的备选
   - `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` — 生产环境真实浏览量（[Upstash](https://upstash.com) 免费档即可）
5. 生成公网 URL，例如 `https://resume-api-production.up.railway.app`

### Vercel 同源 API（推荐）

前端部署在 Vercel 时，可使用仓库内 `api/tailor.js`、`api/compose.js`、`api/views.js` 作为 Serverless Functions（无需 Railway）。在 Vercel 项目环境变量配置 `OPENAI_API_KEY` 与 Upstash 即可。

## 与前端配合

| 前端 | 托管 | 调 API |
|------|------|--------|
| Web (`/`) | Vercel | `fetch(`${import.meta.env.VITE_API_URL}/api/chat`, …)` |
| 小票 Web (`/mobile.html`) | 同上 | 同上 |
| Expo (`native/`) | EAS / Expo Go | 同上，URL 用 Railway 公网地址 |

在 Vercel 项目 Settings → Environment Variables 增加：

- `VITE_API_URL` = Railway 的 HTTPS 地址（不要末尾斜杠）

## 下一步接 AI

在 `server.js` 的 `POST /api/chat` 中，在检测到 `OPENAI_API_KEY` 后调用官方 SDK，并把 `src/cvData.js` 中的 profile 摘要作为 system prompt。
