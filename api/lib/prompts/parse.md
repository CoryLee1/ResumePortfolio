Return JSON only:
{
  "sections": [
    {
      "id": "profile|work|projects|education|publications|...",
      "title": "SECTION TITLE",
      "items": [{ "content": { "type": "text|work|proj|edu|pub|ln|kv", ... } }]
    }
  ],
  "meta": { "contact": { "email": "..." } },
  "summary": "what was extracted"
}

RULES:
- Use the same content shapes as a structured CV.
- Do not invent employers, dates, or awards not in the source.
- Map items to the closest existing section id when possible.
