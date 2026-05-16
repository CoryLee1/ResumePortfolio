import { parseJsonFromModel } from "./parseModelJson.js";

const DEFAULT_BASE = "http://127.0.0.1:11434";
const DEFAULT_MODEL = "qwen2.5-coder:1.5b";

export function isOllamaConfigured() {
  if (process.env.LLM_PROVIDER === "ollama") return true;
  if (process.env.OLLAMA_ENABLED === "1" || process.env.OLLAMA_ENABLED === "true") {
    return true;
  }
  return Boolean(process.env.OLLAMA_MODEL || process.env.OLLAMA_BASE_URL);
}

export async function ollamaChatJson({ system, user, maxTokens = 2048 }) {
  if (!isOllamaConfigured()) {
    return { placeholder: true, data: null, provider: "ollama" };
  }

  const base = (process.env.OLLAMA_BASE_URL || DEFAULT_BASE).replace(/\/$/, "");
  const model = process.env.OLLAMA_MODEL || DEFAULT_MODEL;
  const url = `${base}/v1/chat/completions`;

  const body = {
    model,
    temperature: 0.35,
    max_tokens: maxTokens,
    stream: false,
    messages: [
      { role: "system", content: `${system}\n\nYou must reply with valid JSON only, no markdown.` },
      { role: "user", content: user },
    ],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(
      `Ollama ${res.status}: ${err.slice(0, 400)}. Is Ollama running? Try: ollama serve`
    );
  }

  const json = await res.json();
  const raw = json.choices?.[0]?.message?.content;
  if (!raw) throw new Error("Empty Ollama response");

  return {
    placeholder: false,
    data: parseJsonFromModel(raw),
    provider: "ollama",
    model,
  };
}
