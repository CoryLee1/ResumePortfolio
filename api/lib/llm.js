import { arkChatJson } from "./ark.js";

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

/**
 * Prefer Volcengine Ark (豆包) when ARK_API_KEY is set; else OpenAI.
 */
export async function chatJson(opts) {
  if (process.env.ARK_API_KEY) {
    return arkChatJson(opts);
  }
  if (process.env.OPENAI_API_KEY) {
    return openaiChatJson(opts);
  }
  return { placeholder: true, data: null, provider: "none" };
}

export function llmProviderLabel() {
  if (process.env.ARK_API_KEY) {
    return `豆包 · ${process.env.ARK_MODEL || "doubao-seed-2-0-pro-260215"}`;
  }
  if (process.env.OPENAI_API_KEY) return `OpenAI · ${OPENAI_MODEL}`;
  return null;
}
