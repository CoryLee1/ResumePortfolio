import { setCors } from "./lib/http.js";
import { getViewCount, incrementViewCount, viewsStorageMode } from "./lib/viewStore.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();

  try {
    if (req.method === "GET") {
      const count = await getViewCount();
      return res.status(200).json({ count, storage: viewsStorageMode() });
    }
    if (req.method === "POST") {
      const count = await incrementViewCount();
      return res.status(200).json({ count, storage: viewsStorageMode() });
    }
    return res.status(405).json({ error: "GET or POST" });
  } catch (err) {
    console.error("[views]", err);
    return res.status(500).json({ error: "views failed" });
  }
}
