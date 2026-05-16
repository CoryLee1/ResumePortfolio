import { setCors, readJsonBody } from "./lib/http.js";
import { runParse } from "./lib/parseService.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  try {
    const body = req.body ?? (await readJsonBody(req));
    const { base64, fileName, mimeType, cvData, locale } = body;
    if (!cvData?.sections) {
      return res.status(400).json({ error: "cvData required" });
    }
    const result = await runParse({ base64, fileName, mimeType, cvData, locale });
    return res.status(200).json(result);
  } catch (err) {
    console.error("[parse]", err);
    return res.status(err.status || 500).json({ error: err.message || "parse failed" });
  }
}
