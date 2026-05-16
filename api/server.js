import "dotenv/config";
import cors from "cors";
import express from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((s) => s.trim()).filter(Boolean)
  : true;

app.use(cors({ origin: corsOrigins }));
app.use(express.json({ limit: "32kb" }));

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "resume-portfolio-api",
    time: new Date().toISOString(),
  });
});

/**
 * Placeholder chat endpoint — wire OPENAI_API_KEY (or other provider) here later.
 * Body: { "message": string, "context"?: string }
 */
app.post("/api/chat", async (req, res) => {
  try {
    const { message, context } = req.body ?? {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "message is required (string)" });
    }

    const trimmed = message.trim().slice(0, 4000);
    if (!trimmed) {
      return res.status(400).json({ error: "message cannot be empty" });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.json({
        reply:
          `[dev] API is running. Message received (${trimmed.length} chars). ` +
          `Set OPENAI_API_KEY on the server to enable real AI replies.`,
        placeholder: true,
        contextReceived: Boolean(context),
      });
    }

    // TODO: call OpenAI / Gemini with resume context from cvData or RAG
    return res.json({
      reply:
        `[stub] OPENAI_API_KEY is set but LLM call is not implemented yet. ` +
        `You said: "${trimmed.slice(0, 120)}${trimmed.length > 120 ? "…" : ""}"`,
      placeholder: true,
    });
  } catch (err) {
    console.error("[/api/chat]", err);
    return res.status(500).json({ error: "internal server error" });
  }
});

app.use((_req, res) => {
  res.status(404).json({ error: "not found" });
});

app.listen(PORT, () => {
  console.log(`Resume API listening on http://localhost:${PORT}`);
  console.log(`  GET  /health`);
  console.log(`  POST /api/chat`);
});
