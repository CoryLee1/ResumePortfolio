import { setCors, readJsonBody } from "./lib/http.js";
import { runCompose } from "./lib/composeService.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  try {
    const body = req.body ?? (await readJsonBody(req));
    const { cvData, jobDescription, recipientName, company } = body;
    if (!cvData?.sections) {
      return res.status(400).json({ error: "cvData with sections is required" });
    }
    const result = await runCompose({ cvData, jobDescription, recipientName, company });
    return res.status(200).json(result);
  } catch (err) {
    console.error("[compose]", err);
    const status = err.status || 500;
    return res.status(status).json({ error: err.message || "compose failed" });
  }
}
