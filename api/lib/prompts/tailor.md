Return JSON only:
{
  "sectionOrder": ["profile","work",...],
  "hiddenSections": ["section ids to hide"],
  "hiddenItems": [{"sectionId":"work","itemId":"w1"}],
  "profileRewrites": [{"sectionId":"profile","itemId":"s1","text":"optional improved profile paragraph"}],
  "summary": "2-3 sentences: how this layout serves the JD and persona",
  "highlights": ["bullet","bullet"]
}

RULES:
- Only use section and item ids that exist in the CV.
- Do not invent employers, dates, or awards.
- profileRewrites: at most one profile text item; keep voice human and concise.
- Optimize for a 6-second recruiter scan: strongest match above the fold.
