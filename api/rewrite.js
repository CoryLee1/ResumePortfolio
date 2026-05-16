import { setCors, readJsonBody } from "./lib/http.js";
import { runRewrite } from "./lib/rewriteService.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  try {
    const body = req.body ?? (await readJsonBody(req));
    const { content, instruction, locale } = body;
    if (!content?.type) {
      return res.status(400).json({ error: "content with type required" });
    }
    const result = await runRewrite({ content, instruction, locale });
    return res.status(200).json(result);
  } catch (err) {
    console.error("[rewrite]", err);
    return res.status(err.status || 500).json({ error: err.message || "rewrite failed" });
  }
}
