const ARK_BASE =
  process.env.ARK_BASE_URL?.replace(/\/$/, "") ||
  "https://ark.cn-beijing.volces.com/api/v3";
const DEFAULT_MODEL = process.env.ARK_MODEL || "doubao-seed-2-0-pro-260215";

function extractArkText(json) {
  if (typeof json.output_text === "string") return json.output_text;

  for (const item of json.output ?? []) {
    if (item.type === "message" && Array.isArray(item.content)) {
      for (const c of item.content) {
        if ((c.type === "output_text" || c.type === "text") && c.text) {
          return c.text;
        }
      }
    }
    if (item.type === "output_text" && item.text) return item.text;
  }

  const chat = json.choices?.[0]?.message?.content;
  if (typeof chat === "string") return chat;

  throw new Error("No text in Ark response");
}

function parseJsonFromModel(raw) {
  const trimmed = raw.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const body = fenced ? fenced[1].trim() : trimmed;
  return JSON.parse(body);
}

/** @see https://www.volcengine.com/docs/82379/1569618 */
async function arkResponsesJson({ system, user, maxTokens, apiKey, model }) {
  const body = {
    model,
    input: [
      {
        role: "system",
        content: [{ type: "input_text", text: system }],
      },
      {
        role: "user",
        content: [{ type: "input_text", text: user }],
      },
    ],
    max_output_tokens: maxTokens,
  };

  if (process.env.ARK_JSON_MODE !== "0") {
    body.text = { format: { type: "json_object" } };
  }

  const res = await fetch(`${ARK_BASE}/responses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    const e = new Error(`Ark Responses ${res.status}: ${err.slice(0, 400)}`);
    e.fallbackChat = true;
    throw e;
  }

  const json = await res.json();
  return parseJsonFromModel(extractArkText(json));
}

/** OpenAI-compatible Chat API on Ark */
async function arkChatCompletionsJson({ system, user, maxTokens, apiKey, model }) {
  const res = await fetch(`${ARK_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.35,
      max_tokens: maxTokens,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Ark Chat ${res.status}: ${err.slice(0, 400)}`);
  }

  const json = await res.json();
  const raw = json.choices?.[0]?.message?.content ?? "{}";
  return parseJsonFromModel(typeof raw === "string" ? raw : JSON.stringify(raw));
}

export async function arkChatJson({ system, user, maxTokens = 2048 }) {
  const apiKey = process.env.ARK_API_KEY;
  if (!apiKey) return { placeholder: true, data: null, provider: "ark" };

  const model = process.env.ARK_MODEL || DEFAULT_MODEL;

  try {
    const data = await arkResponsesJson({ system, user, maxTokens, apiKey, model });
    return { placeholder: false, data, provider: "ark", model };
  } catch (err) {
    if (err.fallbackChat) {
      const data = await arkChatCompletionsJson({
        system,
        user,
        maxTokens,
        apiKey,
        model,
      });
      return { placeholder: false, data, provider: "ark-chat", model };
    }
    throw err;
  }
}
