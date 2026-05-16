import { arkChatJson } from "./ark.js";
import { ollamaChatJson, isOllamaConfigured } from "./ollama.js";

const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

async function openaiChatJson({ system, user, maxTokens = 2048 }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return { placeholder: true, data: null, provider: "openai" };

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      temperature: 0.35,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      max_tokens: maxTokens,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI ${res.status}: ${err.slice(0, 400)}`);
  }

  const json = await res.json();
  const raw = json.choices?.[0]?.message?.content ?? "{}";
  return {
    placeholder: false,
    data: JSON.parse(raw),
    provider: "openai",
    model: OPENAI_MODEL,
  };
}

function resolveProvider() {
  const forced = (process.env.LLM_PROVIDER || "").toLowerCase();
  if (forced === "ollama") return "ollama";
  if (forced === "ark") return "ark";
  if (forced === "openai") return "openai";
  if (isOllamaConfigured()) return "ollama";
  if (process.env.ARK_API_KEY) return "ark";
  if (process.env.OPENAI_API_KEY) return "openai";
  return "none";
}

/**
 * Local: Ollama → Ark (豆包) → OpenAI
 * Set LLM_PROVIDER=ollama|ark|openai to force one backend.
 */
export async function chatJson(opts) {
  const provider = resolveProvider();
  if (provider === "ollama") return ollamaChatJson(opts);
  if (provider === "ark") return arkChatJson(opts);
  if (provider === "openai") return openaiChatJson(opts);
  return { placeholder: true, data: null, provider: "none" };
}

export function llmProviderLabel() {
  const p = resolveProvider();
  if (p === "ollama") {
    return `Ollama · ${process.env.OLLAMA_MODEL || "qwen2.5-coder:1.5b"}`;
  }
  if (p === "ark") {
    return `豆包 · ${process.env.ARK_MODEL || "doubao-seed-2-0-pro-260215"}`;
  }
  if (p === "openai") return `OpenAI · ${OPENAI_MODEL}`;
  return null;
}
