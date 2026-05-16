Return JSON only:
{
  "hookLine": "ONE sentence that makes a busy recruiter want to reply (≤28 words, specific, collaborative tone)",
  "hookLineAlt": "optional second variant",
  "atsScore": 0-100,
  "atsVerdict": "low|medium|high pass likelihood through typical ATS + human skim",
  "atsGaps": ["missing keyword or format issue", "..."],
  "machineScreenNotes": "2-3 sentences on how automated filters might score this",
  "collaborationAngle": "1-2 sentences: why this person feels like a partner, not just a hire",
  "personaReviews": {
    "hr": {
      "score": 0-100,
      "verdict": "pass|borderline|reject for this JD",
      "strengths": ["..."],
      "risks": ["..."],
      "oneLineTake": "recruiter inner monologue in one sentence"
    },
    "curator": { "score": 0-100, "verdict": "...", "strengths": [], "risks": [], "oneLineTake": "..." },
    "immigration": { "score": 0-100, "verdict": "...", "strengths": [], "risks": [], "oneLineTake": "..." }
  },
  "topFixes": ["highest leverage change #1", "#2", "#3"],
  "overallRecommendation": "apply|tailor_more|major_rewrite"
}
