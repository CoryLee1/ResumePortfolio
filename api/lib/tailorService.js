import { getPersona } from "./personas.js";
import { cvDataToText } from "./cvText.js";
import { chatJson } from "./llm.js";
import { applyTailorPlan } from "./applyTailorPlan.js";

const TAILOR_SCHEMA = `Return JSON only:
{
  "sectionOrder": ["profile","work",...],
  "hiddenSections": ["section ids to hide"],
  "hiddenItems": [{"sectionId":"work","itemId":"w1"}],
  "profileRewrites": [{"sectionId":"profile","itemId":"s1","text":"optional improved profile paragraph"}],
  "summary": "2-3 sentences: how this layout serves the JD and persona",
  "highlights": ["bullet","bullet"]
}`;

/** Rule-based fallback when no API key */
function fallbackPlan(data, persona, jobDescription) {
  const presetOrder = {
    hr: ["profile", "work", "projects", "skills", "education", "awards", "publications", "exhibitions", "talks", "press", "references"],
    curator: ["profile", "exhibitions", "projects", "publications", "awards", "press", "education", "talks", "work", "references"],
    immigration: ["profile", "projects", "awards", "publications", "exhibitions", "press", "education", "talks", "work", "references"],
  };
  const order = presetOrder[persona.id] ?? presetOrder.hr;
  const jd = (jobDescription || "").toLowerCase();
  const hiddenSections = [];
  if (!/research|paper|academic|phd|university/i.test(jd)) {
    if (persona.id === "hr") hiddenSections.push("publications");
  }
  return {
    sectionOrder: order.filter((id) => data.sections.some((s) => s.id === id)),
    hiddenSections,
    hiddenItems: [],
    profileRewrites: [],
    summary: `[Offline] Applied ${persona.label} section order. Set ARK_API_KEY (豆包) or OPENAI_API_KEY for JD-aware refinement.`,
    highlights: ["Connect API key for bullet-level tailoring"],
  };
}

export async function runTailor({ cvData, jobDescription, personaId }) {
  const persona = getPersona(personaId);
  const jd = String(jobDescription ?? "").trim().slice(0, 12000);
  if (!jd) {
    const err = new Error("jobDescription is required");
    err.status = 400;
    throw err;
  }

  const system = `${persona.system}

You will receive a full CV as JSON lines and a job description.
${TAILOR_SCHEMA}

Rules:
- Only use section and item ids that exist in the CV.
- Do not invent employers, dates, or awards.
- profileRewrites: at most one profile text item; keep voice human and concise.`;

  const user = `JOB DESCRIPTION:\n${jd}\n\n---\nCV:\n${cvDataToText(cvData)}`;

  let plan;
  let placeholder = false;

  const llm = await chatJson({ system, user, maxTokens: 1500 });
  if (llm.placeholder) {
    placeholder = true;
    plan = fallbackPlan(cvData, persona, jd);
  } else {
    plan = llm.data;
  }

  const tailoredData = applyTailorPlan(cvData, plan);

  return {
    persona: persona.id,
    personaLabel: persona.label,
    preset: persona.preset,
    plan,
    data: tailoredData,
    placeholder,
  };
}
