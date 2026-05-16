# Resume Portfolio API

轻量 Express 后端，供 Web / Expo 调用。AI 密钥只放在服务端环境变量里。

## 本地运行

```bash
cd api
cp .env.example .env
npm install
npm run dev
```

- 健康检查：http://localhost:3001/health  
- 占位对话：`POST http://localhost:3001/api/chat`  
  ```json
  { "message": "Tell me about PoeSpin", "context": "optional" }
  ```

## 部署到 Railway

1. [railway.app](https://railway.app) → New Project → Deploy from GitHub → 选 `ResumePortfolio`  
2. **Root Directory**：`api`  
3. **Start Command**：`npm start`（或 Railway 自动检测）  
4. Variables（示例）：
   - `PORT` → Railway 会自动注入，一般不必手写  
   - `CORS_ORIGIN` → `https://你的域名.vercel.app`  
   - 以后：`OPENAI_API_KEY`  
5. 生成公网 URL，例如 `https://resume-api-production.up.railway.app`

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
