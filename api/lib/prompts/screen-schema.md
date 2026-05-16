Return JSON only — no prose, no markdown fences. Every field below is required.

{
  "hookLine": "ONE sentence (≤28 words) that makes a busy recruiter want to reply: leads with the most JD-relevant proof, names a concrete detail from the CV, peer-to-peer tone, zero clichés",
  "hookLineAlt": "a second variant taking a different angle on the same true facts (empty string if none is honestly strong)",
  "atsScore": 0-100,
  "atsVerdict": "low | medium | high — likelihood of passing a typical ATS filter AND a human skim",
  "atsGaps": ["specific missing JD keyword or concrete format risk, e.g. 'JD requires \"Kubernetes\" — absent verbatim'", "..."],
  "machineScreenNotes": "2-3 sentences on how automated filters would score this and why",
  "collaborationAngle": "1-2 sentences: the genuine reason this person reads as a partner to build with, not just a hire — grounded in their actual work",
  "personaReviews": {
    "hr": {
      "score": 0-100,
      "verdict": "pass | borderline | reject — for THIS JD",
      "strengths": ["JD-relevant, evidence-backed strength", "..."],
      "risks": ["honest gap or red flag against the JD", "..."],
      "oneLineTake": "the recruiter's blunt inner monologue, one sentence"
    },
    "curator": {
      "score": 0-100,
      "verdict": "pass | borderline | reject",
      "strengths": ["distinctiveness / narrative coherence, evidence-backed", "..."],
      "risks": ["weak through-line, generic signal, or missing critical reception", "..."],
      "oneLineTake": "the curator's blunt take, one sentence"
    },
    "immigration": {
      "score": 0-100,
      "verdict": "pass | borderline | reject",
      "strengths": ["concrete evidentiary item: award, judging, press, leading role", "..."],
      "risks": ["broken or thin evidentiary chain", "..."],
      "oneLineTake": "the attorney's blunt take; note here if this was a light-touch check"
    }
  },
  "topFixes": ["highest-leverage, truthful change #1 — what to do and why it lifts match or ATS", "#2", "#3"],
  "overallRecommendation": "apply | tailor_more | major_rewrite"
}

Constraints:
- The three persona scores measure different lenses and should rarely land within 5 points of each other.
- Every strength and risk must trace to a specific line in the CV. No invented facts.
- topFixes must be actionable and never suggest claiming a skill the CV does not support.
