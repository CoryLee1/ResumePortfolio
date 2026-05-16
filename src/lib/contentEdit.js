/** One-line preview for sidebar list */
export function contentPreview(content) {
  if (!content) return "";
  switch (content.type) {
    case "text":
      return content.text?.slice(0, 72) || "";
    case "work":
      return `${content.co} · ${content.role}`.slice(0, 72);
    case "proj":
      return `${content.name} (${content.sub})`.slice(0, 72);
    case "edu":
      return `${content.school} · ${content.program}`.slice(0, 72);
    case "pub":
      return content.title?.slice(0, 72) || "";
    case "ln":
      return `${content.l} — ${content.r || ""}`.slice(0, 72);
    case "kv":
      return `${content.k}: ${content.v}`.slice(0, 72);
    default:
      return content.type || "";
  }
}

/** Editable plain-text representation */
export function contentToEditText(content) {
  const c = content;
  switch (c.type) {
    case "text":
      return c.text || "";
    case "work":
      return [
        `[company] ${c.co || ""}`,
        `[role] ${c.role || ""}`,
        `[date] ${c.date || ""}`,
        `[location] ${c.loc || ""}`,
        ...(c.bullets || []).map((b) => `[bullet] ${b}`),
      ].join("\n");
    case "proj":
      return [
        `[name] ${c.name || ""}`,
        `[subtitle] ${c.sub || ""}`,
        `[date] ${c.date || ""}`,
        `[url] ${c.url || ""}`,
        ...(c.bullets || []).map((b) => `[bullet] ${b}`),
      ].join("\n");
    case "edu":
      return [
        `[school] ${c.school || ""}`,
        `[program] ${c.program || ""}`,
        `[date] ${c.date || ""}`,
        `[location] ${c.loc || ""}`,
        ...(c.details || []).map((d) => `[detail] ${d}`),
      ].join("\n");
    case "pub":
      return [
        `[title] ${c.title || ""}`,
        `[venue] ${c.venue || ""}`,
        `[authors] ${c.authors || ""}`,
        `[href] ${c.href || ""}`,
        `[note] ${c.note || ""}`,
      ].join("\n");
    case "ln":
      return `[label] ${c.l || ""}\n[right] ${c.r || ""}\n[url] ${c.url || ""}`;
    case "kv":
      return `[key] ${c.k || ""}\n[value] ${c.v || ""}\n[url] ${c.url || ""}`;
    default:
      return JSON.stringify(c, null, 2);
  }
}

function lineVal(lines, tag) {
  const line = lines.find((l) => l.startsWith(`[${tag}]`));
  return line ? line.slice(line.indexOf("]") + 1).trim() : "";
}

function taggedLines(lines, tag) {
  return lines
    .filter((l) => l.startsWith(`[${tag}]`))
    .map((l) => l.slice(l.indexOf("]") + 1).trim());
}

/** Parse edited text back into content object (keeps type) */
export function editTextToContent(text, original) {
  const type = original?.type || "text";
  const lines = text.split("\n").map((l) => l.trimEnd());

  switch (type) {
    case "text":
      return { type: "text", text: text.trim() };
    case "work":
      return {
        type: "work",
        co: lineVal(lines, "company") || original.co,
        role: lineVal(lines, "role") || original.role,
        date: lineVal(lines, "date") || original.date,
        loc: lineVal(lines, "location") || original.loc,
        links: original.links || [],
        bullets: taggedLines(lines, "bullet").length
          ? taggedLines(lines, "bullet")
          : original.bullets || [],
      };
    case "proj":
      return {
        type: "proj",
        name: lineVal(lines, "name") || original.name,
        sub: lineVal(lines, "subtitle") || original.sub,
        date: lineVal(lines, "date") || original.date,
        url: lineVal(lines, "url") || original.url,
        links: original.links || [],
        bullets: taggedLines(lines, "bullet").length
          ? taggedLines(lines, "bullet")
          : original.bullets || [],
      };
    case "edu":
      return {
        type: "edu",
        school: lineVal(lines, "school") || original.school,
        program: lineVal(lines, "program") || original.program,
        date: lineVal(lines, "date") || original.date,
        loc: lineVal(lines, "location") || original.loc,
        details: taggedLines(lines, "detail").length
          ? taggedLines(lines, "detail")
          : original.details || [],
      };
    case "pub":
      return {
        type: "pub",
        title: lineVal(lines, "title") || original.title,
        venue: lineVal(lines, "venue") || original.venue,
        authors: lineVal(lines, "authors") || original.authors,
        href: lineVal(lines, "href") || original.href,
        note: lineVal(lines, "note") || original.note,
        links: original.links || [],
      };
    case "ln":
      return {
        type: "ln",
        l: lineVal(lines, "label") || original.l,
        r: lineVal(lines, "right") || original.r,
        url: lineVal(lines, "url") || original.url,
      };
    case "kv":
      return {
        type: "kv",
        k: lineVal(lines, "key") || original.k,
        v: lineVal(lines, "value") || original.v,
        url: lineVal(lines, "url") || original.url,
      };
    default:
      try {
        return JSON.parse(text);
      } catch {
        return original;
      }
  }
}
