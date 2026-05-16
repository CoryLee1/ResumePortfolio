import { DATA } from "../../src/cvData.js";

export { DATA };

export function withHttps(url) {
  if (!url || typeof url !== "string") return "";
  const u = url.trim();
  if (/^https?:\/\//i.test(u)) return u;
  return `https://${u}`;
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

export function buildReceiptViewModel(data = DATA, now = new Date()) {
  const m = data.meta;
  const profileItem = data.sections.find((s) => s.id === "profile")?.items?.[0]?.content;
  const profile = profileItem?.type === "text" ? profileItem.text : "";

  const eduTop = data.sections.find((s) => s.id === "education")?.items?.[0]?.content;
  const eduLine =
    eduTop?.type === "edu" ? `${eduTop.school} · ${eduTop.program}` : "";

  const webShort = withHttps(m.contact.web).replace(/^https?:\/\//i, "").replace(/\/$/, "");

  const dateStr = `${pad2(now.getMonth() + 1)}/${pad2(now.getDate())}/${now.getFullYear()}`;
  const timeStr = now.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const projItems = data.sections.find((s) => s.id === "projects")?.items ?? [];
  const practiceLines = projItems
    .map((it, idx) => {
      const c = it.content;
      if (c?.type !== "proj") return null;
      const line = `${c.name} — ${c.sub}`.replace(/\s+/g, " ").trim().slice(0, 72);
      return { idx: idx + 1, line };
    })
    .filter(Boolean);

  const skillRows =
    data.sections
      .find((s) => s.id === "skills")
      ?.items?.map((it) => it.content)
      .filter((c) => c?.type === "kv") ?? [];

  const stackLines = skillRows.slice(0, 5).map((c, i) => ({
    idx: i + 1,
    line: `${c.k}: ${c.v}`.replace(/\s+/g, " ").trim().slice(0, 76),
  }));

  const signals = projItems
    .map((it) => {
      const c = it.content;
      if (c?.type !== "proj") return null;
      const hit =
        c.bullets?.find((b) => /★|SIGGRAPH|Best|MUSE|award|NeurIPS|CVPR/i.test(b)) ??
        c.bullets?.[0] ??
        c.sub;
      return `${c.name}: ${hit}`.replace(/\s+/g, " ").trim().slice(0, 78);
    })
    .filter(Boolean)
    .slice(0, 5);

  const contacts = [
    { label: "Email", value: m.contact.email, url: `mailto:${m.contact.email}` },
    { label: "Site", value: webShort, url: withHttps(m.contact.web) },
    { label: "X", value: "@cory958014884", url: m.contact.twitter },
    { label: "IG", value: "@cory_leeeee_", url: m.contact.instagram },
  ];

  return {
    meta: m,
    profile: profile.slice(0, 240) + (profile.length > 240 ? "…" : ""),
    eduLine: (eduLine || "NYU ITP · Donghua BFA").slice(0, 64),
    dateStr,
    timeStr,
    practiceLines,
    stackLines,
    signals,
    contacts,
    refId: `${m.alias.toUpperCase().replace(/\s/g, "")}-CV-01`,
    asciiBlock: [
      " ┌────────────────────────────┐ ",
      " │  YIHUA LI · CREATIVE LAB   │ ",
      " │ AI × REAL-TIME × INTERFACE │ ",
      " └────────────────────────────┘ ",
    ],
  };
}
