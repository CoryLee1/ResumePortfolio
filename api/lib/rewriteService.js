import { chatJson } from "./llm.js";

export async function runRewrite({ content, instruction, locale = "en" }) {
  if (!content?.type) {
    const err = new Error("content with type is required");
    err.status = 400;
    throw err;
  }

  const lang =
    locale === "zh"
      ? "Respond in Chinese where appropriate; keep proper nouns."
      : "Respond in English.";

  const system = `You rewrite one CV content block. Return JSON: { "content": { ...same type fields... } }
Rules: keep facts accurate, improve clarity, match professional CV tone. ${lang}
${instruction ? `User instruction: ${instruction}` : ""}`;

  const user = `Block type: ${content.type}\nCurrent:\n${JSON.stringify(content, null, 2)}`;

  const llm = await chatJson({ system, user, maxTokens: 1200 });
  if (llm.placeholder) {
    const err = new Error("LLM not configured");
    err.status = 503;
    throw err;
  }

  const updated = llm.data?.content ?? llm.data;
  if (!updated?.type) throw new Error("Invalid rewrite response");

  return { content: updated, provider: llm.provider };
}
