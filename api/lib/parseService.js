import { chatJson } from "./llm.js";
import { decodeUpload, extractFromBuffer } from "./extractFile.js";
import { parseWithArkVision } from "./arkVision.js";

const PARSE_SCHEMA = `Return JSON only:
{
  "sections": [
    {
      "id": "profile|work|projects|education|publications|...",
      "title": "SECTION TITLE",
      "items": [
        {
          "content": { "type": "text|work|proj|edu|pub|ln|kv", ...fields }
        }
      ]
    }
  ],
  "meta": { "contact": { "email": "..." } },
  "summary": "what was extracted"
}

Use the same content shapes as a structured CV. Do not invent employers or dates not in the source.`;

export async function runParse({ base64, fileName, mimeType, cvData, locale = "en" }) {
  const { buffer, ext, mimeType: mt } = decodeUpload({ base64, fileName, mimeType });
  const extracted = await extractFromBuffer({ buffer, ext, mimeType: mt });

  const langNote =
    locale === "zh"
      ? "Write summary in Chinese. Keep CV content in the source document language."
      : "Write summary in English.";

  const system = `You are a CV import assistant. Extract resume/portfolio content from the uploaded material into structured JSON blocks.
${PARSE_SCHEMA}
${langNote}`;

  let user;
  let llm;

  if (extracted.kind === "image") {
    const dataUri = `data:${extracted.mimeType};base64,${extracted.base64}`;
    user = `Extract all resume-relevant content from this image into CV blocks. Existing CV section ids: ${cvData.sections.map((s) => s.id).join(", ")}`;
    llm = await parseWithArkVision({ system, user, imageDataUri: dataUri });
  } else {
    const text = extracted.text?.trim().slice(0, 24000);
    if (!text) throw new Error("No text extracted from file");
    user = `SOURCE DOCUMENT:\n${text}\n\n---\nMap into CV sections. Existing ids: ${cvData.sections.map((s) => s.id).join(", ")}`;
    llm = await chatJson({ system, user, maxTokens: 4096 });
  }

  if (llm.placeholder) {
    const err = new Error("LLM not configured (ARK_API_KEY or Ollama required for import)");
    err.status = 503;
    throw err;
  }

  return {
    parsed: llm.data,
    summary: llm.data?.summary || "",
    provider: llm.provider,
    placeholder: false,
  };
}
