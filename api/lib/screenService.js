import { cvDataToText } from "./cvText.js";
import { chatJson } from "./llm.js";
import { prompts } from "./prompts/index.js";

function fallbackScreen() {
  return {
    hookLine: "[Offline] Configure ARK_API_KEY or Ollama for HR screening.",
    hookLineAlt: "",
    atsScore: null,
    atsVerdict: "unknown",
    atsGaps: [],
    machineScreenNotes: "",
    collaborationAngle: "",
    personaReviews: {},
    topFixes: ["Connect LLM API"],
    overallRecommendation: "tailor_more",
    placeholder: true,
  };
}

export async function runScreen({ cvData, jobDescription, locale = "en" }) {
  const onVercel = process.env.VERCEL === "1";
  const jd = String(jobDescription ?? "")
    .trim()
    .slice(0, onVercel ? 4000 : 12000);

  let cvText = cvDataToText(cvData);
  if (onVercel && cvText.length > 8000) {
    cvText = `${cvText.slice(0, 8000)}\n[CV truncated for serverless time limit]`;
  }

  const lang =
    locale === "zh"
      ? "Write hookLine and reviews primarily in Chinese; keep proper nouns in English when needed."
      : "Write in English.";

  const system = `${prompts.screenSystem()}

${prompts.screenSchema()}

${lang}`;

  const user = jd
    ? `JOB DESCRIPTION:\n${jd}\n\n---\nCV:\n${cvText}`
    : `No JD provided — evaluate as a strong creative technologist / product designer general application.\n\n---\nCV:\n${cvText}`;

  const maxTokens = onVercel ? 1800 : 4096;
  const llm = await chatJson({ system, user, maxTokens });
  if (llm.placeholder) {
    return fallbackScreen();
  }

  return { ...llm.data, placeholder: false, provider: llm.provider };
}
